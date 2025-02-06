import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import { type ResponseError, type User, type UserInfo, userInfoSchema } from '@/utils/types'

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

export async function getUserById(userId: string): Promise<[UserInfo | null, null] | [null, ResponseError]> {
  const [user, queryError] = await handle(
    prisma.user.findUnique({
      where: {
        id: userId,
      },
    }),
  )

  if (queryError) return [null, queryError]

  if (!user) return [null, null]

  const userInfo = userInfoSchema.parse(user)

  return [userInfo, null]
}
