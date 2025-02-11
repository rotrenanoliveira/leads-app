'use client'

import Link from 'next/link'
import { ArrowUpDownIcon } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import type { LeadsDetails } from '@/utils/types'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'

export const leadsDetailsTableColumns: ColumnDef<LeadsDetails>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'campaignName',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Campanha
        <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'campaignId',
    header: 'Campanha',
    cell: (info) => <Badge variant="secondary">{info.getValue<string>()}</Badge>,
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: 'leads',
    header: 'Leads',
    cell: ({ row }) => (
      <Button variant="secondary" asChild>
        <Link href={`/campaigns/${row.original.campaignId}/leads`}>Ver todos os leads</Link>
      </Button>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Registrado em
        <ArrowUpDownIcon className="ml-2 size-4" />
      </Button>
    ),
    cell: (info) =>
      Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(info.getValue<Date>()),
  },
]
