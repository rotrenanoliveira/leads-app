import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { getCurrentUserId } from '@/server/data/get-current-user'
import { LogInIcon, ShieldX } from 'lucide-react'
import { Geist } from 'next/font/google'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export default async function LoginFailedPage() {
  const user = await getCurrentUserId()

  if (user) {
    redirect('/')
  }

  return (
    <main className={cn('flex flex-col w-screen h-dvh items-center justify-center space-y-2', geist.className)}>
      <div className="w-96 max-w-80 rounded-xl bg-zinc-100 dark:bg-zinc-900 py-12 px-8 text-center flex flex-col items-center">
        <ShieldX strokeWidth={1.15} className="text-red-500 text-4xl size-10" />
        <h1 className="font-semibold mt-8 mb-4 text-xl">Falha ao realizar login!</h1>
        <span className="font-light text-sm">Houve um erro ao realizar o login, por favor, tente novamente.</span>

        <Button variant="outline" className="group mt-6" asChild>
          <Link href="/login" className="text-zinc-900 dark:text-zinc-50 text-sm inline-flex items-center gap-2">
            Login
            <LogInIcon
              strokeWidth={1.25}
              className="ml-2 -mr-1 opacity-60 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </Button>
      </div>
    </main>
  )
}
