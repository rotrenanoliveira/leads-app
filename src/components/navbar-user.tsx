import { DropdownMenu, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronsUpDown, Settings2Icon } from 'lucide-react'
import { NavbarUserDropdown } from './navbar-user-dropdown'
import { getUserById } from '@/server/data/get-user'
import { getCurrentUserId } from '@/server/data/get-current-user'
import { redirect } from 'next/navigation'

export async function NavbarUser() {
  const userId = await getCurrentUserId()
  if (!userId) return null

  const userResult = await getUserById(userId.value)
  if (userResult[0] === null) redirect('/api/auth/sign-out')

  const user = userResult[0]

  const username = user.email.split('@')[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="w-full md:w-fit lg:w-full flex items-center gap-3 justify-evenly p-2 rounded-lg hover:bg-sidebar-accent"
        >
          <div className="size-6">
            <Settings2Icon strokeWidth={1.15} className="size-6" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight md:hidden lg:block">
            <span className="truncate font-medium">{username}</span>
          </div>
          <ChevronsUpDown className="ml-auto size-4" />
        </button>
      </DropdownMenuTrigger>
      {/* nav user dropdown */}
      <NavbarUserDropdown user={user} />
    </DropdownMenu>
  )
}
