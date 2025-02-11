import { Suspense } from 'react'
import { Breadcrumb } from '@/components/breadcrumb'
import { CampaignsLeads } from '@/components/campaigns/campaign-leads'
import { CampaignLeadsLoader } from '@/components/campaigns/campaign-leads-loader'
import { Separator } from '@/components/ui/separator'
import { getCampaign } from '@/server/data/get-campaign'

export default async function CampaignLeads({ params }: { params: Promise<{ campaign: string }> }) {
  const campaignId = (await params).campaign

  const [result, resultError] = await getCampaign(campaignId)

  if (resultError) {
    return null
  }

  const { name: campaignName } = result

  const breadcrumbItems = [
    { url: '/', label: 'Home' },
    { url: '/campaigns', label: 'Campanhas' },
    { label: campaignName },
    { label: 'Leads' },
  ]

  return (
    <div className="h-[calc(100dvh-32px)] flex flex-col gap-4">
      {/* breadcrumbs */}
      <div className="h-20 max-h-20 flex p-6 items-center border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* main content */}
      <div className="flex-1 p-6 overflow-y-auto border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        {/* page title */}
        <div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-1">
            <h1 className="text-lg md:text-2xl font-medium">Campanha - {campaignName}</h1>
            <span className="text-lg md:text-2xl font-light text-muted-foreground">: lista de leads da campanhas</span>
          </div>

          <Separator className="my-4 bg-zinc-300 dark:bg-zinc-600" />

          <Suspense fallback={<CampaignLeadsLoader />}>
            <CampaignsLeads campaignId={campaignId} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
