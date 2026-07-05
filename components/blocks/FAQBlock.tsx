import { FAQ } from '@/components/sections/FAQ'
import { tf } from '@/lib/tina'

export interface FAQBlockData {
  __typename?: string
  heading?: string | null
  subheading?: string | null
  faqs?: Array<{
    __typename?: string
    q?: string | null
    a?: string | null
  } | null> | null
}

export function FAQBlock({ block }: { block: FAQBlockData }) {
  const rawFaqs = (block.faqs ?? []).filter(Boolean)
  const items = rawFaqs.map(f => ({ q: f!.q ?? '', a: f!.a ?? '' }))
  const tinaFields = rawFaqs.map(f => ({ q: tf(f, 'q'), a: tf(f, 'a') }))

  return (
    <FAQ
      heading={block.heading ?? undefined}
      subheading={block.subheading ?? undefined}
      items={items}
      tinaSelf={tf(block)}
      tinaHeading={tf(block, 'heading')}
      tinaSubheading={tf(block, 'subheading')}
      tinaFields={tinaFields}
    />
  )
}
