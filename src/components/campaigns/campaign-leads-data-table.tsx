'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { CampaignLeadsResponse } from '@/server/data/get-leads'
import { CampaignLeadsExport } from './campaign-leads-export'

interface CampaignLeadsDataTableProps {
  data: CampaignLeadsResponse['leads']
  campaign: CampaignLeadsResponse['campaign']
}

export function CampaignLeadsDataTable({ data, campaign }: CampaignLeadsDataTableProps) {
  const items = data.map((lead) => {
    const items = JSON.parse(lead.data)
    return { id: lead.id, createdAt: lead.createdAt, ...items }
  })

  const columns = Object.keys(items[0])

  return (
    <div className="overflow-x-auto">
      <div className="flex justify-between items-center py-4">
        <div />

        <CampaignLeadsExport data={items} campaign={campaign.name} />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="text-nowrap">
              {columns.map((column) => {
                return (
                  <TableHead key={column} className="capitalize">
                    {campaign.fields.find((field) => field.slug === column)?.name ?? column}
                  </TableHead>
                )
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.id}>
                {columns.map((column) => {
                  return (
                    <TableCell key={column} className="text-nowrap">
                      {item[column].toLocaleString('pt-BR')}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
