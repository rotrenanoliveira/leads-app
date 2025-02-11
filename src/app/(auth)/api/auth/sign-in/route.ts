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
    console.log('token or email not found')
    redirect('/login-failed')
  }

  const [user, getUserError] = await getUser(email)

  if (getUserError) {
    console.log('get user error', getUserError)
    redirect('/login-failed')
  }

  if (!user) {
    console.log('user not found')
    redirect('/login-failed')
  }

  const [tokenResult, getTokenError] = await getToken(token, user.email)

  if (getTokenError) {
    console.log('get token error', getTokenError)
    redirect('/login-failed')
  }

  if (!tokenResult) {
    console.log('token not found')
    redirect('/login-failed')
  }

  const tokenExpiresAt = new Date(tokenResult.createdAt.getTime() + 15 * 60 * 1000)
  const isTokenExpired = tokenExpiresAt < new Date()

  if (isTokenExpired) {
    console.log('token expired')
    redirect('/login-failed')
  }

  const deleteTokensResult = await deleteTokens(user.email)

  if (deleteTokensResult[0] === null) {
    console.log('delete tokens error', deleteTokensResult[1])
    redirect('/login-failed')
  }

  const cookieStore = await cookies()

  cookieStore.set('leads:user', user.id, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  return redirect('/')
}
