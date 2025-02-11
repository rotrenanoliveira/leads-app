import { getLeads } from '@/server/data/get-leads'
import { CampaignLeadsDataTable } from './campaign-leads-data-table'

interface CampaignsLeadsProps {
  campaignId: string
}

export async function CampaignsLeads({ campaignId }: CampaignsLeadsProps) {
  const [result, getLeadsError] = await getLeads(campaignId)

  if (getLeadsError) {
    return null
  }

  const { leads, campaign } = result

  if (leads.length === 0) {
    return <div className="text-center">Nenhum lead encontrado.</div>
  }

  return (
    <div className="mx-auto">
      <CampaignLeadsDataTable data={leads} campaign={campaign} />
    </div>
  )
}
