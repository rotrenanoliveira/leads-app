'use client'

import { Button } from '../ui/button'

interface CampaignLeadsExportProps<TData> {
  data: TData[]
  campaign: string
}

export function CampaignLeadsExport<TData>({ data, campaign }: CampaignLeadsExportProps<TData[]>) {
  function genCSV() {
    const keys = Object.keys(data[0])

    const leads = []
    leads.push(keys)

    for (const item of data) {
      leads.push(Object.values(item))
    }

    let csv = ''

    for (const row of leads) {
      const csvRow = row.join(',')
      csv += `${csvRow}\r\n`
    }

    return csv
  }

  function downloadCSV() {
    const csv = genCSV()
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `leads-${campaign}-${new Date().toISOString()}.csv`
    link.click()
  }

  return (
    <Button variant="outline" className="w-fit max-w-40" onClick={downloadCSV}>
      Exportar CSV
    </Button>
  )
}
