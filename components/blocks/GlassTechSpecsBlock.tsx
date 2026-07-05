import { GlassTechSpecs } from '@/components/sections/GlassTechSpecs'
import type { PricingOption } from '@/lib/types'
import { tf } from '@/lib/tina'

export interface GlassTechSpecsBlockData {
  __typename?: string
  eyebrow?: string | null
  heading?: string | null
  description?: string | null
}

export function GlassTechSpecsBlock({ pricingOptions = [], block }: { pricingOptions?: PricingOption[]; block?: GlassTechSpecsBlockData }) {
  return (
    <GlassTechSpecs
      options={pricingOptions}
      eyebrow={block?.eyebrow}
      heading={block?.heading}
      description={block?.description}
      tinaSelf={tf(block)}
      tinaEyebrow={tf(block, 'eyebrow')}
      tinaHeading={tf(block, 'heading')}
      tinaDescription={tf(block, 'description')}
    />
  )
}
