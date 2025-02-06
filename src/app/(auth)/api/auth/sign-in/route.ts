import { deleteTokens } from '@/server/data/delete-tokens'
import { getToken } from '@/server/data/get-token'
import { getUser } from '@/server/data/get-user'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')
  const email = searchParams.get('email')

  if (!token || !email) {
    redirect('/login-failed')
  }

  const [user, queryError] = await getUser(email)

  if (queryError) {
    redirect('/login-failed')
  }

  if (!user) {
    redirect('/login-failed')
  }

  const [tokenResult, tokenError] = await getToken(token, user.email)

  if (tokenError) {
    redirect('/login-failed')
  }

  if (!tokenResult) {
    redirect('/login-failed')
  }

  const tokenExpiresAt = new Date(tokenResult.createdAt).getTime() + 15 * 60 * 1000
  const isTokenExpired = tokenExpiresAt < Date.now()

  if (isTokenExpired) {
    redirect('/login-failed')
  }

  const deleteTokensResult = await deleteTokens(user.email)

  if (deleteTokensResult[0] === null) {
    redirect('/login-failed')
  }

  const cookieStore = await cookies()

  cookieStore.set('leads:user', user.id, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return redirect('/')
}
