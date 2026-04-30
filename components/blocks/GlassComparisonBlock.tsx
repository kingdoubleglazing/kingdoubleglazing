import { Suspense } from 'react'
import { GlassComparisonTable } from '@/components/sections/GlassComparisonTable'
import { getSiteSettings } from '@/lib/site-settings'
import type { PricingOption } from '@/lib/types'

export interface GlassComparisonBlockData {
  __typename?: string
  pricingOptions?: PricingOption[]
}

export function GlassComparisonBlock({ pricingOptions = [] }: { pricingOptions?: PricingOption[] }) {
  const settings = getSiteSettings()

  return (
    <Suspense fallback={<div className="bg-surface-container-low h-96" />}>
      <GlassComparisonTable
        options={pricingOptions}
        secondStoreySurcharge={150}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </Suspense>
  )
}
