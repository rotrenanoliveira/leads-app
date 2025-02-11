import { getCurrentUserId } from '@/server/data/get-current-user'
import { getLeadsDetails } from '@/server/data/get-leads-details'
import { LeadsDetailsTable as LeadsTable } from './leads-data-table'
import { leadsDetailsTableColumns } from './leads-table-columns'

export async function LeadsDetailsTable() {
  const userId = await getCurrentUserId()

  if (!userId) {
    return null
  }

  const [leads, queryError] = await getLeadsDetails(userId.value)

  if (queryError) {
    return null
  }

  const campaigns = leads
    .map((lead) => ({
      label: lead.campaignName,
      value: lead.campaignId,
    }))
    .reduce(
      (acc, campaign) => {
        if (!acc.find((item) => item.value === campaign.value)) {
          acc.push(campaign)
        }

        return acc
      },
      [] as { label: string; value: string }[],
    )

  return (
    <div className="mx-auto">
      <LeadsTable columns={leadsDetailsTableColumns} data={leads} campaigns={campaigns} />
    </div>
  )
}
