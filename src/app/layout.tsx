import './globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Leads Info',
  description: 'Crie formulários para captação de leads e gerencie suas informações de forma simples e rápida.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className="light">
      <body className="md:overflow-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
