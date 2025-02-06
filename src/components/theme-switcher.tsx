import { Button } from '@/components/ui/button'
import { MoonIcon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSwitcher() {
  const { setTheme } = useTheme()

  return (
    <div>
      <Button variant="ghost" size="icon" className="w-full justify-start gap-1 px-2" onClick={() => setTheme('light')}>
        <Sun className="size-4" />
        Claro
        <span className="sr-only">Tema Claro</span>
      </Button>

      <Button variant="ghost" size="icon" className="w-full justify-start gap-1 px-2" onClick={() => setTheme('dark')}>
        <MoonIcon className="size-4" />
        Escuro
        <span className="sr-only">Tema Claro</span>
      </Button>
    </div>
  )
}
