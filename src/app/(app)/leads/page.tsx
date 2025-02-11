import { Loader2Icon } from 'lucide-react'
import { Suspense } from 'react'

import { Breadcrumb } from '@/components/breadcrumb'
import { Separator } from '@/components/ui/separator'
import { LeadsDetailsTable } from '@/components/leads/leads-table'

const breadcrumbItems = [{ url: '/', label: 'Home' }, { label: 'Leads' }]

export const metadata = {
  title: 'Leads - leads.gratis',
  description: 'Lista de leads',
}

export default function Leads() {
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
          <div className="inline-flex items-center gap-1">
            <h1 className="text-2xl font-medium">Leads</h1>
            <span className="text-2xl font-light text-muted-foreground">: lista de leads</span>
          </div>

          <Separator className="my-4 bg-zinc-300 dark:bg-zinc-600" />

          <Suspense fallback={<Loader2Icon className="size-5 animate-spin" />}>
            <LeadsDetailsTable />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
