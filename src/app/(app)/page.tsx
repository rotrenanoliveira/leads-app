import { ConstructionIcon } from 'lucide-react'

export default function Home() {
  return (
    <div className="h-[calc(100dvh-32px)] flex flex-col gap-4">
      {/* breadcrumbs */}
      <div className="hidden h-20 max-h-20 lg:flex p-6 items-center border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        leads.gratis
      </div>
      {/* main content */}
      <div className="flex-1 p-6 overflow-scroll flex flex-col gap-4 items-center justify-center border rounded-lg bg-zinc-50 dark:bg-zinc-900">
        <ConstructionIcon strokeWidth={1.25} className="size-20 text-yellow-600 opacity-85" />
        <p className="text-lg">Página em construção...</p>
      </div>
    </div>
  )
}
