import React from 'react'
import {
  Breadcrumb as BaseBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from './ui/breadcrumb'

interface BreadcrumbProps {
  items: {
    label: string
    url?: string
  }[]
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <BaseBreadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => {
          return (
            <React.Fragment key={item.label}>
              <BreadcrumbItem className="text-md">
                {item.url ? (
                  <BreadcrumbLink href={item.url}>{item.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                )}
              </BreadcrumbItem>
              {index + 1 !== items.length && <BreadcrumbSeparator />}
            </React.Fragment>
          )
        })}
      </BreadcrumbList>
    </BaseBreadcrumb>
  )
}
