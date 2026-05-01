import { WhyRetrofit } from '@/components/sections/WhyRetrofit'

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
  tina?: {
    eyebrow?: string
    heading1?: string
    heading2?: string
    items?: Array<{ headline?: string; sub?: string } | undefined>
  }
}

export function WhyRetrofitBlock({ block }: { block: WhyRetrofitBlockData }) {
  const items = block.items
    ?.filter(Boolean)
    .map((item, i) => ({
      iconKey: item!.iconKey ?? 'hammer',
      headline: item!.headline ?? '',
      sub: item!.sub ?? '',
      tina: block.tina?.items?.[i],
    })) ?? undefined

  return (
    <WhyRetrofit
      eyebrow={block.eyebrow ?? undefined}
      heading1={block.heading1 ?? undefined}
      heading2={block.heading2 ?? undefined}
      items={items}
      tina={block.tina}
    />
  )
}
