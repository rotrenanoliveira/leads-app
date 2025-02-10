import { generateNanoId } from '@/lib/nanoid'
import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { CampaignCreateInput, ResponseError } from '@/utils/types'
import type { Campaign as PrismaCampaign } from '@prisma/client'

export async function createCampaign(
  data: CampaignCreateInput,
): Promise<[PrismaCampaign, null] | [null, ResponseError]> {
  const campaignId = generateNanoId()
  const campaignUrl = new URL(campaignId, 'https://app.linkdiario.com/campaigns/')

  const result = await handle(
    prisma.campaign.create({
      data: {
        id: campaignId,
        userId: data.userId,
        name: data.name,
        title: data.title,
        subtitle: data.subtitle,
        description: data.description,
        callToAction: data.callToAction,
        accentColor: data.accentColor,
        fields: JSON.stringify(data.fields),
        onSuccess: JSON.stringify(data.onSuccess),
        imageUrl: data.imageUrl,
        campaignUrl: campaignUrl.toString(),
        active: true,
      },
    }),
  )

  return result
}
