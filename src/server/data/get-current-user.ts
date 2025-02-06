'use server'

import { cookies } from 'next/headers'

export async function getCurrentUserId() {
  const cookiesStore = await cookies()

  const userId = cookiesStore.get('leads:user')

  if (!userId) {
    return null
  }

  return userId
}
