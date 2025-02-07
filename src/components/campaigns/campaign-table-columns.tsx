'use client'

import type { CampaignBasicInfo } from '@/utils/types'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { ArrowUpDown, ClipboardIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { toast } from 'sonner'

function handleCopyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  toast.success('URL copiada para a área de transferência.')
}

export const campaignsTableColumns: ColumnDef<CampaignBasicInfo>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Criado em
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: (info) =>
      Intl.DateTimeFormat('pt-BR', { dateStyle: 'medium', timeStyle: 'short' }).format(info.getValue<Date>()),
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Nome da campanha
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
  },
  {
    accessorKey: 'active',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        Status
        <ArrowUpDown className="ml-2 size-4" />
      </Button>
    ),
    cell: (info) => (
      <Badge variant="outline" className="rounded-xl">
        {info.getValue<boolean>() ? 'Ativo' : 'Desabilitado'}
      </Badge>
    ),
  },
  {
    accessorKey: 'campaignUrl',
    header: 'URL da Campanha',
    cell: (info) => (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge
              variant="outline"
              className="p-2 cursor-pointer w-52"
              onClick={() => handleCopyToClipboard(info.getValue<string>())}
            >
              <ClipboardIcon className="mr-2 size-4" />
              {info.getValue<string>().split('.com')[1]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clique para copiar a URL</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
]
