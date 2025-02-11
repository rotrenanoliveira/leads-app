'use client'

import { Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '../ui/button'

export function CampaignLeadsLoader() {
  return (
    <div>
      <div className="flex justify-between items-center py-4">
        <div />

        <Button variant="outline" className="w-fit max-w-40" asChild>
          <Link
            href="/campaigns/create"
            className="w-full justify-start p-0 m-0 capitalize hover:opacity-100 hover:no-underline"
          >
            Exportar CSV
          </Link>
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow />
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                <Loader2Icon className="animate-spin size-5 text-muted-foreground" />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
