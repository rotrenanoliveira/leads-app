import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError } from '@/utils/types'

export async function updateCampaignStatus(
  campaignId: string,
  userId: string,
  status: boolean,
): Promise<[null, null] | [null, ResponseError]> {
  const [_, queryError] = await handle(
    prisma.campaign.update({
      where: { id: campaignId, userId },
      data: { active: status },
    }),
  )

  return [null, queryError]
}
