import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError } from '@/utils/types'

export async function removeCampaign(
  campaignId: string,
  userId: string,
): Promise<[null, null] | [null, ResponseError]> {
  const [_, queryError] = await handle(
    prisma.campaign.delete({
      where: { id: campaignId, userId },
    }),
  )

  return [null, queryError]
}
