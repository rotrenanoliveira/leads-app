import 'server-only'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'

export async function deleteTokens(token: string, user: string) {
  const result = await handle(
    prisma.token.delete({
      where: { token_user: { user, token } },
    }),
  )

  return result
}
