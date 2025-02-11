'use client'

import type { Table } from '@tanstack/react-table'
import { Search, X } from 'lucide-react'

import { DataTableFacetedFilter } from '@/components/data-table-faceted-filter'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  campaigns: Array<{ label: string; value: string }>
}

export function LeadsTableToolbar<TData>({ table, campaigns }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  // useEffect(() => table.getColumn('campaignId')?.toggleVisibility(false), [])

  return (
    <div className="flex flex-col items-center justify-between gap-2 md:flex-row md:gap-0">
      <div className="flex w-full items-center justify-between gap-1 md:h-8 md:w-fit md:gap-2">
        <div className="flex h-8 items-center gap-1 md:h-full md:gap-2">
          <div className="hidden h-full w-10 items-center justify-center rounded-md border lg:flex">
            <Search className="size-5 text-muted-foreground" />
          </div>

          <Input
            placeholder="Buscar por campanha"
            value={(table.getColumn('campaignName')?.getFilterValue() as string) ?? ''}
            onChange={(event) => table.getColumn('campaignName')?.setFilterValue(event.target.value)}
            className="h-full w-fit max-w-md py-0 md:w-40"
          />
        </div>

        <div className="flex flex-wrap gap-1">
          {table.getColumn('campaignId') && (
            <DataTableFacetedFilter column={table.getColumn('campaignId')} title="Campanhas" options={campaigns} />
          )}

          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 border border-dashed border-destructive/25 md:px-2 lg:border-transparent lg:px-3"
            >
              <span className="sr-only">Limpar</span>
              <span className="hidden lg:inline">Limpar</span>
              <X className="h-4 w-4 text-destructive lg:ml-2 lg:text-foreground" />
            </Button>
          )}
        </div>
      </div>

      <Badge variant="outline" className="hidden md:block">
        {table.getRowModel().rows.length} leads
      </Badge>
    </div>
  )
}
