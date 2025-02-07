import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import { type CampaignBasicInfo, type ResponseError, campaignBasicInfoSchema } from '@/utils/types'

export async function getCampaigns(userId: string): Promise<[CampaignBasicInfo[], null] | [null, ResponseError]> {
  const [result, queryError] = await handle(
    prisma.campaign.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    }),
  )

  if (queryError) {
    return [null, queryError]
  }

  const campaigns = result.map((campaign) => {
    return campaignBasicInfoSchema.parse({
      ...campaign,
      fields: JSON.parse(campaign.fields),
      onSuccess: JSON.parse(campaign.onSuccess),
    })
  })

  return [campaigns, null]
}
