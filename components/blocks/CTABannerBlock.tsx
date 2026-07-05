import { CtaBanner } from '@/components/sections/CtaBanner'
import { getSiteSettings } from '@/lib/site-settings'
import { tf } from '@/lib/tina'

export interface CTABannerBlockData {
  __typename?: string
  heading?: string | null
  subtext?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  trustItems?: (string | null)[] | null
}

export function CTABannerBlock({ block }: { block: CTABannerBlockData }) {
  const settings = getSiteSettings()

  const trustItems = (block.trustItems ?? [])
    .map((value, i) => ({ value, tinaField: tf(block, 'trustItems', i) }))
    .filter((item) => Boolean(item.value))
    .map((item) => ({ value: item.value as string, tinaField: item.tinaField }))

  return (
    <CtaBanner
      tinaSelf={tf(block)}
      heading={block.heading ?? undefined}
      tinaHeading={tf(block, 'heading')}
      subtext={block.subtext ?? undefined}
      tinaSubtext={tf(block, 'subtext')}
      primaryCta={
        block.primaryCta?.label
          ? { label: block.primaryCta.label, href: block.primaryCta.href ?? '/instant-estimate/' }
          : undefined
      }
      tinaPrimaryLabel={tf(block.primaryCta, 'label')}
      secondaryCta={
        block.secondaryCta?.label
          ? { label: block.secondaryCta.label, href: block.secondaryCta.href ?? settings.phoneHref }
          : { label: settings.phone, href: settings.phoneHref }
      }
      tinaSecondaryLabel={tf(block.secondaryCta, 'label')}
      trustItems={trustItems}
    />
  )
}
