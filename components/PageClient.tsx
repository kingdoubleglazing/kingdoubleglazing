'use client'

import { useTina } from 'tinacms/dist/react'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import type { PricingOption } from '@/lib/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TinaPageResult = { data: any; query: string; variables: any }

export function PageClient({
  tinaPage,
  pricingOptions,
}: {
  tinaPage: TinaPageResult
  pricingOptions?: PricingOption[]
}) {
  const { data } = useTina(tinaPage)
  const blocks = data?.page?.blocks ?? []
  return <BlockRenderer blocks={blocks} pricingOptions={pricingOptions} />
}
