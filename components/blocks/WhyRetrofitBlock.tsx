import { WhyRetrofit } from '@/components/sections/WhyRetrofit'
import { tinaField } from 'tinacms/dist/react'

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
  const items = block.items
    ?.filter(Boolean)
    .map(item => ({
      iconKey: item!.iconKey ?? 'hammer',
      headline: item!.headline ?? '',
      sub: item!.sub ?? '',
    })) ?? undefined

  return (
    <WhyRetrofit
      eyebrow={block.eyebrow ?? undefined}
      heading1={block.heading1 ?? undefined}
      heading2={block.heading2 ?? undefined}
      items={items}
    />
  )
}
