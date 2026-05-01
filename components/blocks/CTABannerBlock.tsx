import { CtaBanner } from '@/components/sections/CtaBanner'
import { getSiteSettings } from '@/lib/site-settings'

export interface CTABannerBlockData {
  __typename?: string
  heading?: string | null
  subtext?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  tina?: {
    heading?: string
    subtext?: string
    primaryCta?: { label?: string; href?: string }
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
      secondaryCta={{ label: settings.phone, href: settings.phoneHref }}
      tina={block.tina}
    />
  )
}
