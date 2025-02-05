import { generateNanoId } from '@/lib/nanoid'
import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError, User, UserCreateInput } from '@/utils/types'

export async function createUser(data: UserCreateInput): Promise<[User, null] | [null, ResponseError]> {
  const result = await handle(
    prisma.user.create({
      data: {
        id: generateNanoId(),
        email: data.email,
        name: data.name,
      },
    }),
  )

  return result
}
