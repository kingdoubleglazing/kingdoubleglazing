import { GlassTechSpecs } from '@/components/sections/GlassTechSpecs'
import type { PricingOption } from '@/lib/types'

export interface GlassTechSpecsBlockData {
  __typename?: string
}

export function GlassTechSpecsBlock({ pricingOptions = [] }: { pricingOptions?: PricingOption[] }) {
  return <GlassTechSpecs options={pricingOptions} />
}
