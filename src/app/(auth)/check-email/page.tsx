import { cn } from '@/lib/utils'
import { Text } from 'lucide-react'
import { Geist } from 'next/font/google'
import Link from 'next/link'

const geist = Geist({ subsets: ['latin'], weight: ['300', '400', '500', '600'] })

export default function CheckEmailPage() {
  return (
    <main className={cn('flex flex-col w-screen h-dvh items-center justify-center space-y-2', geist.className)}>
      <div className="w-96 max-w-80 md:max-w-96 rounded-xl bg-zinc-100 dark:bg-zinc-900 py-12 px-6 text-center flex flex-col items-center">
        <Text className="text-leads-blue text-4xl size-8" />
        <h1 className="font-semibold mt-8 mb-4 text-xl">Verifique seu e-mail!</h1>
        <span className="font-light text-sm">Um link de acesso foi enviado para seu e-mail.</span>
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
