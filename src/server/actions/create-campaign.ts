'use server'

import { formatZodError, handle } from '@/utils/functions'
import { type CampaignFormDataInput, type ResponseError, campaignFieldsSchema, campaignInfoSchema } from '@/utils/types'
import type { Campaign as PrismaCampaign } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { CacheRepository } from '../cache/redis-cache-repository'
import { createCampaign } from '../data/create-campaign'
import { getCurrentUserId } from '../data/get-current-user'
import { uploadCampaignImage } from '../storage/campaign-image'

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

const actionCreateCampaignSchema = z
  .object({
    name: z.string().min(1, { message: 'Nome da campanha é obrigatório' }),
    title: z.string().min(1, { message: 'Título da campanha é obrigatório' }),
    subtitle: z.string().min(1, { message: 'Subtítulo da campanha é obrigatório' }),
    description: z.string().min(1, { message: 'Descrição da campanha é obrigatório' }),
    callToAction: z.string().min(1, { message: 'Call to Action é obrigatório' }),
    accentColor: z.string(),
    campaignImage: z
      .any()
      .refine((file) => !!file, 'Por favor, insira uma imagem para o carrossel.')
      .refine((file) => file.size <= MAX_FILE_SIZE, 'O tamanho do arquivo deve ser menor que 2MB.')
      .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), '.jpg, .jpeg, .png and .webp images são permitidas.')
      .transform((file) => {
        return {
          file: file.name,
          type: file.type,
          url: URL.createObjectURL(file),
        }
      }),
    fields: z.array(campaignFieldsSchema),
    onSuccess: z.object({
      type: z.union([z.literal('message'), z.literal('redirect'), z.literal('whatsapp')]),
      data: z.string().min(1, { message: 'Conteúdo do sucesso é obrigatório' }),
    }),
  })
  .refine((data) => data.fields.length > 0, { message: 'Campos não podem ser vazios' })

type ActionCreateCampaignOnSuccess = z.infer<typeof actionCreateCampaignSchema>['onSuccess']

function refineOnSuccess(data: ActionCreateCampaignOnSuccess) {
  if (data.type === 'message') {
    return z.string().min(1, { message: 'Conteúdo do sucesso é obrigatório' })
  }

  if (data.type === 'redirect') {
    return z.string().min(1, { message: 'URL de redirecionamento é obrigatório' }).url({ message: 'URL inválida' })
  }

  const phoneRegex = new RegExp(/^\(?\d{2}\)?\s?(?:9\d{4}|\d{4})-?\d{4}$/)

  return z.string().regex(phoneRegex, { message: 'Número de WhatsApp inválido' })
}

type SuccessResponse = {
  success: true
  message: string
  data: PrismaCampaign
}

export async function actionCreateCampaign(
  data: CampaignFormDataInput,
): Promise<[SuccessResponse, null] | [null, ResponseError]> {
  const formResult = actionCreateCampaignSchema.safeParse(data)

  if (formResult.success === false) {
    const zodErrors = formatZodError(formResult.error)
    const validationErrors = { error: [`Validation Error at ${zodErrors[0].field} - ${zodErrors[0].message}`] }
    const message = validationErrors.error.join('. ')

    return [null, { success: false, message }]
  }

  const refineForm = refineOnSuccess(formResult.data.onSuccess)

  const refineResult = refineForm.safeParse(formResult.data.onSuccess.data)

  if (refineResult.success === false) {
    const zodErrors = formatZodError(refineResult.error)
    const validationErrors = { error: [`Validation Error at ${zodErrors[0].field} - ${zodErrors[0].message}`] }
    const message = validationErrors.error.join('. ')

    return [null, { success: false, message }]
  }

  // Validate if campaign image is provided
  const file = data.campaignImage
  if (!file) {
    return [null, { success: false, message: 'Por favor insira uma imagem para a campanha.' }]
  }

  const [uploadResult, uploadError] = await handle(uploadCampaignImage(file as File))

  if (uploadError) {
    return [null, uploadError]
  }

  const userId = await getCurrentUserId()

  if (!userId) {
    return [null, { success: false, message: 'Failed to validate user.' }]
  }

  const [campaign, error] = await createCampaign({
    ...formResult.data,
    imageUrl: uploadResult.url,
    userId: userId.value,
  })

  if (error) {
    return [null, error]
  }

  await handle(
    CacheRepository.set(
      campaign.id,
      JSON.stringify(
        campaignInfoSchema.parse({
          id: campaign.id,
          name: campaign.name,
          title: campaign.title,
          subtitle: campaign.subtitle,
          description: campaign.description,
          callToAction: campaign.callToAction,
          accentColor: campaign.accentColor,
          fields: formResult.data.fields,
          onSuccess: formResult.data.onSuccess,
          imageUrl: campaign.imageUrl,
          active: campaign.active,
        }),
      ),
      60 * 60 * 24 * 7, // 1 week
    ),
  )

  revalidatePath('/campaigns', 'layout')

  return [{ success: true, message: `Campanha ${campaign.name} criada com sucesso`, data: campaign }, null]
}
