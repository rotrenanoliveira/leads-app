import { getCampaigns } from '@/server/data/get-campaigns'
import { getCurrentUserId } from '@/server/data/get-current-user'
import { CampaignsDataTable } from './campaign-data-table'
import { campaignsTableColumns } from './campaign-table-columns'

export async function CampaignsTable() {
  const userId = await getCurrentUserId()

  if (!userId) {
    return null
  }

  const [campaigns, queryError] = await getCampaigns(userId.value)

  if (queryError) {
    return null
  }

  return (
    <div>
      <CampaignsDataTable columns={campaignsTableColumns} data={campaigns} />
    </div>
  )
}
