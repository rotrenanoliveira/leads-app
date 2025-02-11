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

/** campaign fields type */
export const campaignFieldsTypesSchema = z.union([
  z.literal('text'),
  z.literal('email'),
  z.literal('phone'),
  z.literal('number'),
])

/** campaign fields */
export const campaignFieldsSchema = z.object({
  name: z.string(),
  slug: z.string(),
  type: campaignFieldsTypesSchema,
})

export const campaignOnSuccess = z.object({
  type: z.union([z.literal('message'), z.literal('redirect'), z.literal('whatsapp')]),
  data: z.string(),
})

/** campaign */
export const campaignSchema = z.object({
  id: z.string(),
  name: z.string(),
  title: z.string(),
  subtitle: z.string(),
  description: z.string(),
  callToAction: z.string(),
  accentColor: z.string().default('#FACC15'),
  userId: z.string(),
  fields: z.array(campaignFieldsSchema),
  onSuccess: campaignOnSuccess,
  imageUrl: z.string().url().optional(),
  campaignUrl: z.string().url(),
  active: z.coerce.boolean().default(true),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

/** create campaign input */
export const campaignCreateInputSchema = campaignSchema.omit({
  id: true,
  campaignUrl: true,
  active: true,
  createdAt: true,
  updatedAt: true,
})

/** campaign form data input */
export const campaignFormDataInputSchema = campaignSchema
  .omit({
    id: true,
    userId: true,
    campaignUrl: true,
    active: true,
    createdAt: true,
    updatedAt: true,
  })
  .extend({
    campaignImage: z.any().optional(),
  })

/** campaign info */
export const campaignInfoSchema = campaignSchema.omit({
  campaignUrl: true,
  createdAt: true,
  updatedAt: true,
  userId: true,
})

/** campaign basic info */
export const campaignBasicInfoSchema = campaignSchema.pick({
  id: true,
  name: true,
  campaignUrl: true,
  active: true,
  createdAt: true,
})

/** lead create input */
export const leadCreateInputSchema = z.object({
  campaignId: z.string(),
  userId: z.string(),
  data: z.string(),
})

/** lead */
export const leadSchema = z.object({
  id: z.string(),
  campaignId: z.string(),
  data: z.string(),
  createdAt: z.coerce.date(),
})

/** leads details */
export const leadsDetailsSchema = z.object({
  id: z.string(),
  campaignId: z.string(),
  campaignName: z.string(),
  createdAt: z.coerce.date(),
})

/** campaign */
export type Campaign = z.infer<typeof campaignSchema>
/** campaign basic info */
export type CampaignBasicInfo = z.infer<typeof campaignBasicInfoSchema>
/** create campaign input */
export type CampaignCreateInput = z.infer<typeof campaignCreateInputSchema>
/** campaign form data input */
export type CampaignFormDataInput = z.infer<typeof campaignFormDataInputSchema>
/** campaign fields type */
export type CampaignFieldsTypes = z.infer<typeof campaignFieldsTypesSchema>
/** campaign fields */
export type CampaignFields = z.infer<typeof campaignFieldsSchema>
/** campaign image represents an image file and its URL for use in a carousel display. */
export type CampaignImage = { file: string; url: string }
/** campaign info */
export type CampaignInfo = z.infer<typeof campaignInfoSchema>
/** lead create input */
export type LeadCreateInput = z.infer<typeof leadCreateInputSchema>
/** leads details */
export type LeadsDetails = z.infer<typeof leadsDetailsSchema>
/** lead */
export type Lead = z.infer<typeof leadSchema>
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
