import 'server-only'

import { prisma } from '@/lib/prisma'
import { handle } from '@/utils/functions'

export async function deleteTokens(user: string) {
  const result = await handle(
    prisma.token.deleteMany({
      where: { user },
    }),
  )

  return result
}
