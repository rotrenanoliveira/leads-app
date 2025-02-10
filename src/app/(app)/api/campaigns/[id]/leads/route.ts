import { getCampaign } from '@/server/data/get-campaign'
import { saveLead } from '@/server/data/save-lead'

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const campaignId = (await params).id

  const getCampaignResult = await getCampaign(campaignId)
  const getCampaignError = getCampaignResult[1]

  if (getCampaignError) {
    return new Response(JSON.stringify(getCampaignError), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const body = await request.json()

  const [_, queryError] = await saveLead({
    campaignId,
    data: JSON.stringify(body),
  })

  if (queryError) {
    return new Response(JSON.stringify(queryError), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  return new Response(JSON.stringify({ message: 'Lead added successfully' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  })
}
