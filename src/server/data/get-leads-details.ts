'use server'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import { type LeadsDetails, type ResponseError, leadsDetailsSchema } from '@/utils/types'

export async function getLeadsDetails(userId: string): Promise<[LeadsDetails[], null] | [null, ResponseError]> {
  const [result, queryError] = await handle(
    prisma.lead.findMany({
      where: { userId },
      select: {
        id: true,
        createdAt: true,
        campaign: {
          select: { name: true, id: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    }),
  )

  if (queryError) {
    return [null, queryError]
  }

  const leads = result.map((lead) =>
    leadsDetailsSchema.parse({
      id: lead.id,
      campaignId: lead.campaign.id,
      campaignName: lead.campaign.name,
      createdAt: lead.createdAt,
    }),
  )

  return [leads, null]
}
