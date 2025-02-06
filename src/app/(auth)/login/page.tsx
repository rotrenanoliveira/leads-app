import { Text } from 'lucide-react'

import { Geist } from 'next/font/google'
import { cn } from '@/lib/utils'
import { LoginForm } from './login-form'
import Link from 'next/link'
import { getCurrentUserId } from '@/server/data/get-current-user'
import { redirect } from 'next/navigation'

const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export default async function Login() {
  const user = await getCurrentUserId()

  if (user) {
    redirect('/')
  }

  return (
    <main className={cn('flex flex-col w-screen h-dvh items-center justify-center space-y-2', geist.className)}>
      <div className="w-80 max-w-80 rounded-xl bg-zinc-100 dark:bg-zinc-900 py-12 px-6 text-center flex flex-col items-center">
        <Text className="text-zinc-900 dark:text-zinc-50 text-4xl size-8" />
        <h1 className="font-semibold mt-8 mb-2 text-xl">Bem-vindo ao Leads Info!</h1>
        <span className="font-light text-sm">Faça login para acessar sua conta.</span>

        <LoginForm />
      </div>

      <div className="w-72 max-w-80 text-center font-light text-sm">
        <span>Ao clicar em "Acessar" você concorda com os </span>
        <Link href="/terms" className="text-zinc-900 dark:text-zinc-50 text-sm">
          <span className="underline">Termos de uso</span>
        </Link>
        <span> e </span>
        <Link href="/policy" className="text-zinc-900 dark:text-zinc-50 text-sm">
          <span className="underline">Política de Privacidade</span>
        </Link>
        <span>.</span>
      </div>
    </main>
  )
}
