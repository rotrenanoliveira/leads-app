'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from '@/hooks/use-form-state'
import { cn } from '@/lib/utils'
import { actionLogin } from '@/server/actions/login'
import { ArrowRight, AtSign, Loader2Icon, Mail } from 'lucide-react'

export function LoginForm() {
  const [_, handleSubmit, isPending] = useFormState(actionLogin)

  console.log(_)

  return (
    <form className="w-full max-w-60 space-y-2 mt-6" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <Label className="sr-only" htmlFor="email">
          Insira seu email
        </Label>
        <div className="relative">
          <Input id="email" name="email" className="peer ps-9" placeholder="exemplo@email.com" type="email" />
          <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
            <AtSign size={16} strokeWidth={2} aria-hidden="true" />
          </div>
        </div>
      </div>

      <Button className="w-full group font-medium" variant="default">
        <Mail className="-ms-1 me-2 opacity-60" size={16} strokeWidth={2} aria-hidden="true" />
        Acessar
        <ArrowRight
          className={cn(
            '-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5',
            isPending && 'hidden',
          )}
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
        {isPending && <Loader2Icon strokeWidth={1.25} className="size-5 animate-spin" />}
      </Button>
    </form>
  )
}
