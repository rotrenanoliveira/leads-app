import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      {/* breadcrumbs */}
      <div className="h-20 max-h-20 flex p-6 items-center border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        leads.gratis
      </div>
      {/* main content */}
      <div className="flex-1 p-6 overflow-scroll border rounded-lg bg-zinc-50 dark:bg-zinc-900">main content</div>
    </Fragment>
  )
}
