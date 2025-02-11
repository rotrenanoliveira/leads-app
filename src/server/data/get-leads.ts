import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import { type CampaignFields, type ResponseError, campaignFieldsSchema } from '@/utils/types'
import { z } from 'zod'

type Leads = { id: string; data: string; createdAt: Date }
type Campaign = { id: string; name: string; fields: CampaignFields[] }
export type CampaignLeadsResponse = { leads: Leads[]; campaign: Campaign }

const fieldsSchema = z.array(campaignFieldsSchema)

export async function getLeads(campaignId: string): Promise<[CampaignLeadsResponse, null] | [null, ResponseError]> {
  const [result, getLeadsError] = await handle(
    prisma.lead.findMany({
      where: { campaignId },
      select: {
        id: true,
        data: true,
        createdAt: true,
      },
      orderBy: { createdAt: 'desc' },
    }),
  )

  if (getLeadsError) {
    return [null, getLeadsError]
  }

  const [campaign, getCampaignError] = await handle(
    prisma.campaign.findUnique({
      where: { id: campaignId },
      select: {
        id: true,
        name: true,
        fields: true,
      },
    }),
  )

  if (getCampaignError) {
    return [null, getCampaignError]
  }

  if (!campaign) {
    return [null, { success: false, message: 'Campanha não encontrada.' }]
  }

  const campaignFields = JSON.parse(campaign.fields)
  const fields = fieldsSchema.parse(campaignFields)

  return [{ leads: result, campaign: { ...campaign, fields } }, null]
}
