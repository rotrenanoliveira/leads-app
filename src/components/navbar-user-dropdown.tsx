'use client'

import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'

import Avatar from 'boring-avatars'
import { Sparkles, LogOut } from 'lucide-react'
import { ThemeSwitcher } from './theme-switcher'

interface NavbarUserDropdownProps {
  user: {
    email: string
  }
}

export function NavbarUserDropdown({ user }: NavbarUserDropdownProps) {
  return (
    <DropdownMenuContent
      className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
      align="center"
      sideOffset={4}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <div className="size-8">
            <Avatar name={user.email} variant="beam" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-xs">{user.email}</span>
          </div>
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem disabled>
          <Sparkles />
          Faça o upgrade
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <ThemeSwitcher />
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut />
        Log out
      </DropdownMenuItem>
    </DropdownMenuContent>
  )
}
