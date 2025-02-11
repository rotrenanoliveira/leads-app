import { generateNanoId } from '@/lib/nanoid'
import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { LeadCreateInput, ResponseError } from '@/utils/types'
import type { Lead as PrismaLead } from '@prisma/client'

export async function saveLead(data: LeadCreateInput): Promise<[PrismaLead, null] | [null, ResponseError]> {
  return await handle(
    prisma.lead.create({
      data: {
        id: generateNanoId(),
        campaignId: data.campaignId,
        userId: data.userId,
        data: data.data,
      },
    }),
  )
}
