import { CacheRepository } from '@/server/cache/redis-cache-repository'
import { getCampaign } from '@/server/data/get-campaign'
import { handle } from '@/utils/functions'
import { campaignInfoSchema } from '@/utils/types'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const campaignId = (await params).id

  const [campaign, resultError] = await getCampaign(campaignId)

  if (resultError) {
    return new Response(JSON.stringify(resultError), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const campaignInfo = campaignInfoSchema.parse(campaign)

  await handle(
    CacheRepository.set(
      campaign.id,
      JSON.stringify(campaignInfo),
      60 * 60 * 24 * 7, // 1 week
    ),
  )

  return new Response(JSON.stringify(campaignInfo), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
