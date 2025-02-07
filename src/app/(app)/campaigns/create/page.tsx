import { Breadcrumb } from '@/components/breadcrumb'
import { CreateCampaignForm } from '@/components/campaigns/create-campaign-form'
import { Separator } from '@/components/ui/separator'
import { Fragment } from 'react'

const breadcrumbItems = [
  { url: '/', label: 'Home' },
  { label: 'Campanhas', url: '/campaigns' },
  { label: 'Nova Campanha' },
]

export default function CreateCampaigns() {
  return (
    <Fragment>
      {/* breadcrumbs */}
      <div className="h-20 max-h-20 flex p-6 items-center border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <Breadcrumb items={breadcrumbItems} />
      </div>
      {/* main content */}
      <div className="flex-1 p-6 overflow-y-scroll border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        {/* page title */}
        <div>
          <div className="inline-flex items-center gap-1">
            <h1 className="text-2xl font-medium">Nova campanha</h1>
            <span className="text-2xl font-light text-muted-foreground">: crie e divulgue sua campanha</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Crie uma campanha atrativa e divulgue-a para seus clientes. O leads.gratis ajuda você a captar os leads e
            aumentar sua conversão.
          </p>
          <Separator className="my-4 bg-zinc-300 dark:bg-zinc-600" />
        </div>
        {/* form */}
        <CreateCampaignForm />
      </div>
    </Fragment>
  )
}
