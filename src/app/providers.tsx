'use client'

import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from 'next-themes'
import type { ReactNode } from 'react'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
      {children}
      <Toaster richColors />
    </ThemeProvider>
  )
}
