import Link from 'next/link'

import { Space_Mono, Space_Grotesk } from 'next/font/google'
import { cn } from '@/lib/utils'
import { KanbanIcon, MegaphoneIcon, NotebookTextIcon, TextIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NavbarUser } from '@/components/navbar-user'

const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400'] })
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={cn(spaceGrotesk.className, 'flex flex-col-reverse md:flex-col lg:flex-row w-screen h-dvh gap-4 p-4')}
    >
      <aside className="w-full lg:max-w-60 flex flex-col md:flex-row lg:flex-col lg:max-h-svh gap-4">
        <div className="w-full md:max-w-60 max-h-20 border border-border p-6 md:p-3 lg:p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900">
          <Link
            href="/"
            className={cn(
              spaceMono.className,
              'inline-flex justify-center items-center gap-2 text-xl hover:opacity-85',
            )}
          >
            <TextIcon className="text-leads-blue size-5" />
            leads.gratis
          </Link>
        </div>

        <div className="w-full h-full flex-1 flex gap-4 flex-col md:flex-row lg:flex-col justify-between border border-border p-6 md:p-2 lg:p-6 rounded-lg bg-zinc-50 dark:bg-zinc-900">
          {/* navbar */}
          <div className="md:flex md:flex-row md:items-center md:justify-center lg:block w-full space-y-4 md:space-y-0 lg:space-y-4">
            <Button
              variant="link"
              className="w-full justify-start p-0 m-0 opacity-85 hover:opacity-100 hover:no-underline"
              asChild
            >
              <Link href="/" className="font-extralight capitalize">
                <KanbanIcon strokeWidth={1.15} className="size-6" />
                dashboard
              </Link>
            </Button>
            <Button
              variant="link"
              className="w-full justify-start p-0 m-0 opacity-85 hover:opacity-100 hover:no-underline"
              asChild
            >
              <Link href="/campaigns" className="font-extralight capitalize">
                <MegaphoneIcon strokeWidth={1.15} className="size-6" />
                campanha
              </Link>
            </Button>
            <Button
              variant="link"
              className="w-full justify-start p-0 m-0 opacity-85 hover:opacity-100 hover:no-underline"
              asChild
            >
              <Link href="/leads" className="font-extralight capitalize">
                <NotebookTextIcon strokeWidth={1.15} className="size-6" />
                leads
              </Link>
            </Button>
          </div>
          {/* account info */}
          <NavbarUser />
        </div>
      </aside>

      <main className="flex-1 h-[calc(100dvh-32px)] flex flex-col gap-4">{children}</main>
    </div>
  )
}
