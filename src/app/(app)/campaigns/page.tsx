import { Breadcrumb } from '@/components/breadcrumb'
import { CampaignsTable } from '@/components/campaigns/campaign-table'
import { Separator } from '@/components/ui/separator'
import { Fragment, Suspense } from 'react'

const breadcrumbItems = [{ url: '/', label: 'Home' }, { label: 'Campanhas' }]

export default function Campaigns() {
  return (
    <Fragment>
      {/* breadcrumbs */}
      <div className="h-20 max-h-20 flex p-6 items-center border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* main content */}
      <div className="flex-1 p-6 overflow-scroll border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        {/* page title */}
        <div>
          <div className="inline-flex items-center gap-1">
            <h1 className="text-2xl font-medium">Campanhas</h1>
            <span className="text-2xl font-light text-muted-foreground">: lista de campanhas</span>
          </div>
          <p className="text-sm text-muted-foreground">São a forma de se comunicar com seus clientes e gerar leads.</p>
          <Separator className="my-4 bg-zinc-300 dark:bg-zinc-600" />

          <Suspense>
            <CampaignsTable />
          </Suspense>
        </div>
      </div>
    </Fragment>
  )
}
