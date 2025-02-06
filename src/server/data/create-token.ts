import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError, Token, TokenCreateInput } from '@/utils/types'

export async function createToken(data: TokenCreateInput): Promise<[Token, null] | [null, ResponseError]> {
  const result = await handle(
    prisma.token.create({
      data: {
        token: data.token,
        user: data.user,
        createdAt: data.createdAt,
      },
    }),
  )

  return result
}
