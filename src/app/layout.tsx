import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
