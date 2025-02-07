'use server'

import { handle } from '@/utils/functions'
import type { ResponseError } from '@/utils/types'
import { revalidatePath } from 'next/cache'
import { CacheRepository } from '../cache/redis-cache-repository'
import { getCurrentUserId } from '../data/get-current-user'
import { removeCampaign } from '../data/remove-campaign'
import { updateCampaignStatus } from '../data/update-campaign-status'

export async function actionDisableCampaign(
  campaignId: string,
): Promise<[{ success: true; message: string }, null] | [null, ResponseError]> {
  const userId = await getCurrentUserId()

  if (!userId) {
    return [null, { success: false, message: 'Não foi possível encontrar o usuário atual.' }]
  }

  const [_, queryError] = await updateCampaignStatus(campaignId, userId.value, false)

  if (queryError) {
    return [null, queryError]
  }

  await handle(CacheRepository.delete(campaignId))

  revalidatePath('/campaigns')

  return [{ success: true, message: 'Campanha desativada com sucesso.' }, null]
}

export async function actionEnableCampaign(
  campaignId: string,
): Promise<[{ success: true; message: string }, null] | [null, ResponseError]> {
  const userId = await getCurrentUserId()

  if (!userId) {
    return [null, { success: false, message: 'Não foi possível encontrar o usuário atual.' }]
  }

  const [_, queryError] = await updateCampaignStatus(campaignId, userId.value, true)

  if (queryError) {
    return [null, queryError]
  }

  await handle(CacheRepository.delete(campaignId))

  revalidatePath('/campaigns')

  return [{ success: true, message: 'Campanha habilitada com sucesso.' }, null]
}

export async function actionRemoveCampaign(
  campaignId: string,
): Promise<[{ success: true; message: string }, null] | [null, ResponseError]> {
  const userId = await getCurrentUserId()

  if (!userId) {
    return [null, { success: false, message: 'Não foi possível encontrar o usuário atual.' }]
  }

  const [_, queryError] = await removeCampaign(campaignId, userId.value)

  if (queryError) {
    return [null, queryError]
  }

  await handle(CacheRepository.delete(campaignId))

  revalidatePath('/campaigns')

  return [{ success: true, message: 'Campanha removida com sucesso.' }, null]
}
