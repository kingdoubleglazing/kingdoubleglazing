import { GlassTechSpecs } from '@/components/sections/GlassTechSpecs'
import type { PricingOption } from '@/lib/types'

export interface GlassTechSpecsBlockData {
  __typename?: string
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
  tina?: {
    eyebrow?: string
    heading?: string
    description?: string
  }
}

export function GlassTechSpecsBlock({ pricingOptions = [], block }: { pricingOptions?: PricingOption[]; block?: GlassTechSpecsBlockData }) {
  return (
    <GlassTechSpecs
      options={pricingOptions}
      eyebrow={block?.eyebrow}
      heading={block?.heading}
      description={block?.description}
      tinaEyebrow={block?.tina?.eyebrow}
      tinaHeading={block?.tina?.heading}
      tinaDescription={block?.tina?.description}
    />
  )
}
