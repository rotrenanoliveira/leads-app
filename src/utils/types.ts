import { z } from 'zod'

/**
 * Make some property optional on type
 *
 * @example
 * ```typescript
 * type Post {
 *  id: string;
 *  name: string;
 *  email: string;
 * }
 *
 * Optional<Post, 'id' | 'email'>
 * ```
 **/

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>

/** standard response error */
export const responseError = z.object({
  success: z.literal(false),
  message: z.string(),
})

/** access token */
export const tokenSchema = z.object({
  token: z.string(),
  user: z.string().email(),
  createdAt: z.coerce.date(),
})

/** create access token input */
export const tokenCreateInputSchema = tokenSchema.extend({
  createdAt: z.coerce.date().default(new Date()),
})

/** user */
export const userSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string().nullish(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

/** create user input */
export const userCreateInputSchema = z.object({
  id: z.string().optional(),
  email: z.string().email(),
  name: z.string().nullish(),
})

/** user info */
export const userInfoSchema = userSchema.omit({
  createdAt: true,
  updatedAt: true,
})

/** user */
export type User = z.infer<typeof userSchema>
/** create user input */
export type UserCreateInput = z.infer<typeof userCreateInputSchema>
/** user info */
export type UserInfo = z.infer<typeof userInfoSchema>
/** access token */
export type Token = z.infer<typeof tokenSchema>
/** create access token input */
export type TokenCreateInput = z.infer<typeof tokenCreateInputSchema>
/** standard response error */
export type ResponseError = z.infer<typeof responseError>
