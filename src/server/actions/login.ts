'use server'

import { generateNanoId } from '@/lib/nanoid'
import { formatZodError, handle } from '@/utils/functions'
import { tokenCreateInputSchema, userCreateInputSchema } from '@/utils/types'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createToken } from '../data/create-token'
import { createUser } from '../data/create-user'
import { getUser } from '../data/get-user'

const actionLoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
})

export async function actionLogin(data: FormData) {
  const formResult = actionLoginSchema.safeParse(Object.fromEntries(data))

  if (formResult.success === false) {
    const zodErrors = formatZodError(formResult.error)
    const validationErrors = { error: [`Validation Error at ${zodErrors[0].field} - ${zodErrors[0].message}`] }
    const message = validationErrors.error.join('. ')

    return { success: false, message }
  }

  const token = generateNanoId()

  const saveTokenResult = await createToken(
    tokenCreateInputSchema.parse({
      token,
      user: formResult.data.email,
    }),
  )

  if (saveTokenResult[0] === null) {
    return { success: false, message: saveTokenResult[1].message }
  }

  const mailResult = await handle(
    axios.post('https://hermodr.vercel.app/api/send-mail', {
      mailto: formResult.data.email,
      accessCode: `https://leadsinfo.vercel.app/api/auth?token=${token}&email=${formResult.data.email}`,
      app: 'leads',
    }),
  )

  if (mailResult[0] === null) {
    return { success: false, message: mailResult[1].message }
  }

  const [userResult, queryError] = await getUser(formResult.data.email)

  if (queryError) {
    return { success: false, message: queryError.message }
  }

  if (userResult) {
    redirect('/check-email')
  }

  const registerUserResult = await createUser(userCreateInputSchema.parse(formResult.data))

  if (registerUserResult[0] === null) {
    return { success: false, message: registerUserResult[1].message }
  }

  redirect('/check-email')
}
