import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET() {
  const cookieStore = await cookies()

  cookieStore.delete('leads:user')

  return redirect('/login') // TODO: redirect to home page "https://leads.gratis"
}
