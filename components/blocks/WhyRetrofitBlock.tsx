import { WhyRetrofit } from '@/components/sections/WhyRetrofit'
import { tf } from '@/lib/tina'

export interface WhyRetrofitBlockData {
  __typename?: string
  eyebrow?: string | null
  heading1?: string | null
  heading2?: string | null
  items?: Array<{
    __typename?: string
    iconKey?: string | null
    headline?: string | null
    sub?: string | null
  } | null> | null
}

export function WhyRetrofitBlock({ block }: { block: WhyRetrofitBlockData }) {
  const items = (block.items ?? [])
    .filter(Boolean)
    .map((item) => ({
      iconKey: item!.iconKey ?? 'hammer',
      headline: item!.headline ?? undefined,
      sub: item!.sub ?? undefined,
      tinaHeadline: tf(item, 'headline'),
      tinaSub: tf(item, 'sub'),
    }))

  return (
    <WhyRetrofit
      tinaSelf={tf(block)}
      eyebrow={block.eyebrow ?? undefined}
      heading1={block.heading1 ?? undefined}
      heading2={block.heading2 ?? undefined}
      items={items}
      tinaEyebrow={tf(block, 'eyebrow')}
      tinaHeading1={tf(block, 'heading1')}
      tinaHeading2={tf(block, 'heading2')}
    />
  )
}
