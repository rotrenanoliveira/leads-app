'use server'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'
import type { ResponseError, Token } from '@/utils/types'

export async function getToken(token: string, user: string): Promise<[Token | null, null] | [null, ResponseError]> {
  const result = await handle(
    prisma.token.findUnique({
      where: { token_user: { token, user } },
    }),
  )

  return result
}
