'use client'

import { useEffect } from 'react'
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

  // Blocks come straight from useTina, so every node still carries Tina's
  // `_content_source` metadata. Each block component derives its own inline-edit
  // identifiers with `tf()` at the render site — no central field map to keep in
  // sync — which is why every field (and any field added later) stays editable.
  const blocks = data?.page?.blocks ?? []

  // TinaCMS race condition fix: the admin sends "quickEditEnabled" on sidebar open,
  // but the iframe may not be loaded yet. After React commits to the DOM (so
  // data-tina-field attributes exist), proactively send "quick-edit" to the admin,
  // which causes it to reply with "quickEditEnabled: true" and enable hover outlines.
  useEffect(() => {
    if (typeof window === 'undefined' || window === window.parent) return
    if (document.querySelector('[data-tina-field]')) {
      window.parent.postMessage({ type: 'quick-edit', value: true }, window.location.origin)
    }
  }, [blocks])

  return <BlockRenderer blocks={blocks} pricingOptions={pricingOptions} />
}
