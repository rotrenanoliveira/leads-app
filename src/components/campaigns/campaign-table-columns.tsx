'use client'

import type { CampaignBasicInfo } from '@/utils/types'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '../ui/button'
import { ArrowUpDown, CheckCheckIcon, CircleOffIcon, ClipboardIcon, MoreHorizontal, Trash2Icon } from 'lucide-react'
import { Badge } from '../ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { actionDisableCampaign, actionEnableCampaign, actionRemoveCampaign } from '@/server/actions/update-campaign'

function handleCopyToClipboard(text: string) {
  navigator.clipboard.writeText(text)
  toast.success('URL copiada para a área de transferência.')
}

async function handleEnableCampaign(campaignId: string) {
  const [result, queryError] = await actionEnableCampaign(campaignId)

  if (result === null) {
    toast.error(queryError.message)
    return
  }

  toast.success(result.message)
  location.reload()
}

async function handleDisableCampaign(campaignId: string) {
  const [result, queryError] = await actionDisableCampaign(campaignId)

  if (result === null) {
    toast.error(queryError.message)
    return
  }

  toast.success(result.message)
  location.reload()
}

async function handleRemoveCampaign(campaignId: string) {
  const [result, queryError] = await actionRemoveCampaign(campaignId)

  if (result === null) {
    toast.error(queryError.message)
    return
  }

  toast.success(result.message)
  location.reload()
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
              {/* TODO: this maybe change if the domain name changes */}
              {info.getValue<string>().split('.app')[1]}
            </Badge>
          </TooltipTrigger>
          <TooltipContent>
            <p>Clique para copiar a URL</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const campaign = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="flex flex-col gap-1">
            {!campaign.active && (
              <DropdownMenuItem
                className="inline-flex justify-between items-center cursor-pointer"
                onClick={() => handleEnableCampaign(campaign.id)}
              >
                Habilitar
                <CheckCheckIcon className="ml-2 size-4" />
              </DropdownMenuItem>
            )}

            {campaign.active && (
              <DropdownMenuItem
                className="inline-flex justify-between items-center cursor-pointer"
                onClick={() => handleDisableCampaign(campaign.id)}
              >
                Desabilitar
                <CircleOffIcon className="ml-2 size-4" />
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              className="inline-flex justify-between items-center cursor-pointer"
              onClick={() => handleRemoveCampaign(campaign.id)}
            >
              Remover
              <Trash2Icon className="ml-2 size-4" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
