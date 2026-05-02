import { CtaBanner } from '@/components/sections/CtaBanner'
import { getSiteSettings } from '@/lib/site-settings'

export interface CTABannerBlockData {
  __typename?: string
  heading?: string | null
  subtext?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  trustItems?: (string | null)[] | null
  tina?: {
    heading?: string
    subtext?: string
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
    trustItems?: string
  }
}

export function CTABannerBlock({ block }: { block: CTABannerBlockData }) {
  const settings = getSiteSettings()

  return (
    <CtaBanner
      heading={block.heading ?? undefined}
      subtext={block.subtext ?? undefined}
      primaryCta={
        block.primaryCta?.label
          ? { label: block.primaryCta.label, href: block.primaryCta.href ?? '/instant-estimate/' }
          : undefined
      }
      secondaryCta={
        block.secondaryCta?.label
          ? { label: block.secondaryCta.label, href: block.secondaryCta.href ?? settings.phoneHref }
          : { label: settings.phone, href: settings.phoneHref }
      }
      trustItems={block.trustItems ?? undefined}
      tina={block.tina}
    />
  )
}
