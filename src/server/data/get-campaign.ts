import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import { type Campaign, type ResponseError, campaignSchema } from '@/utils/types'

export async function getCampaign(campaignId: string): Promise<[Campaign, null] | [null, ResponseError]> {
  const [result, queryError] = await handle(
    prisma.campaign.findUnique({
      where: { id: campaignId },
    }),
  )

  if (queryError) {
    return [null, queryError]
  }

  if (!result) {
    return [null, { success: false, message: 'Campanha não encontrada.' }]
  }

  const campaign = campaignSchema.parse({
    ...result,
    fields: JSON.parse(result.fields),
    onSuccess: JSON.parse(result.onSuccess),
  })

  return [campaign, null]
}
