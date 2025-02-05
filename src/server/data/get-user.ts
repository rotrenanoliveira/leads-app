import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError, User } from '@/utils/types'

export async function getUser(email: string): Promise<[User | null, null] | [null, ResponseError]> {
  const result = await handle(
    prisma.user.findUnique({
      where: {
        email,
      },
    }),
  )

  return result
}
