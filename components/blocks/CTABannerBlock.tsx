import { CtaBanner } from '@/components/sections/CtaBanner'
import { getSiteSettings } from '@/lib/site-settings'

export interface CTABannerBlockData {
  __typename?: string
  heading?: string | null
  subtext?: string | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  tina?: {
    heading?: string
    subtext?: string
    primaryCtaLabel?: string
  }
}

export function CTABannerBlock({ block }: { block: CTABannerBlockData }) {
  const settings = getSiteSettings()

  return (
    <CtaBanner
      heading={block.heading ?? undefined}
      subtext={block.subtext ?? undefined}
      primaryCta={
        block.primaryCtaLabel
          ? { label: block.primaryCtaLabel, href: block.primaryCtaHref ?? '/instant-estimate/' }
          : undefined
      }
      secondaryCta={{ label: settings.phone, href: settings.phoneHref }}
      tina={block.tina}
    />
  )
}
