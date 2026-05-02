import { FAQ } from '@/components/sections/FAQ'

export interface FAQBlockData {
  __typename?: string
  heading?: string | null
  subheading?: string | null
  faqs?: Array<{
    __typename?: string
    q?: string | null
    a?: string | null
  } | null> | null
  tina?: {
    heading?: string
    subheading?: string
    faqs?: Array<{ q?: string; a?: string } | undefined>
  }
}

export function FAQBlock({ block }: { block: FAQBlockData }) {
  const items = (block.faqs ?? [])
    .filter(Boolean)
    .map(f => ({ q: f!.q ?? '', a: f!.a ?? '' }))

  return (
    <FAQ
      heading={block.heading ?? 'Common Questions'}
      subheading={block.subheading ?? 'Plain answers, no jargon.'}
      items={items}
      tinaHeading={block.tina?.heading}
      tinaSubheading={block.tina?.subheading}
      tinaFields={block.tina?.faqs}
    />
  )
}
