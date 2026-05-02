import { TrustBar, type TrustBarBlockData } from '@/components/sections/TrustBar'
import { AdaptorDisclosure, type AdaptorDisclosureBlockData } from '@/components/AdaptorDisclosure'
import { PaymentTerms, type PaymentTermsBlockData } from '@/components/PaymentTerms'
import { FreeAdviceBlock, type FreeAdviceBlockData } from '@/components/FreeAdviceBlock'
import { HeroBlock, type HeroBlockData } from './HeroBlock'
import { WhyRetrofitBlock, type WhyRetrofitBlockData } from './WhyRetrofitBlock'
import { ProcessStepsBlock, type ProcessStepsBlockData } from './ProcessStepsBlock'
import { EstimateCTABlock, type EstimateCTABlockData } from './EstimateCTABlock'
import { FAQBlock, type FAQBlockData } from './FAQBlock'
import { ServiceSectionBlock, type ServiceSectionBlockData } from './ServiceSectionBlock'
import { StoryWithStatsBlock, type StoryWithStatsBlockData } from './StoryWithStatsBlock'
import { WarrantyCoverageBlock, type WarrantyCoverageBlockData } from './WarrantyCoverageBlock'
import { ContactCardsBlock, type ContactCardsBlockData } from './ContactCardsBlock'
import { ContactFormBlock, type ContactFormBlockData } from './ContactFormBlock'
import { CTABannerBlock, type CTABannerBlockData } from './CTABannerBlock'
import { GlassComparisonBlock, type GlassComparisonBlockData } from './GlassComparisonBlock'
import { GlassTechSpecsBlock, type GlassTechSpecsBlockData } from './GlassTechSpecsBlock'
import type { PricingOption } from '@/lib/types'
import { WhatElseStripBlock, type WhatElseStripBlockData } from './WhatElseStripBlock'
import { EmergencyStripBlock, type EmergencyStripBlockData } from './EmergencyStripBlock'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyBlock = { __typename?: string; _template?: string; [key: string]: any }

function resolveTypename(block: AnyBlock): string {
  if (block.__typename) return block.__typename
  // Map _template (static JSON) → __typename (TinaCMS runtime)
  const t = block._template ?? ''
  return `PageBlocks${t.charAt(0).toUpperCase()}${t.slice(1)}`
}

export function BlockRenderer({ blocks, pricingOptions = [] }: { blocks: AnyBlock[]; pricingOptions?: PricingOption[] }) {
  return (
    <>
      {(blocks ?? []).map((block, i) => {
        if (!block) return null
        const typename = resolveTypename(block)
        const key = `${typename}-${i}`

        switch (typename) {
          case 'PageBlocksHero':
            return <HeroBlock key={key} block={{ ...block, __typename: typename } as HeroBlockData} />

          case 'PageBlocksTrustBar':
            return <TrustBar key={key} block={block as TrustBarBlockData} />

          case 'PageBlocksWhyRetrofit':
            return <WhyRetrofitBlock key={key} block={block as WhyRetrofitBlockData} />

          case 'PageBlocksProcessSteps':
            return <ProcessStepsBlock key={key} block={block as ProcessStepsBlockData} />

          case 'PageBlocksEstimateCta':
            return <EstimateCTABlock key={key} block={block as EstimateCTABlockData} />

          case 'PageBlocksFaq':
            return <FAQBlock key={key} block={block as FAQBlockData} />

          case 'PageBlocksServiceSection':
            return <ServiceSectionBlock key={key} block={block as ServiceSectionBlockData} />

          case 'PageBlocksStoryWithStats':
            return <StoryWithStatsBlock key={key} block={block as StoryWithStatsBlockData} />

          case 'PageBlocksWarrantyCoverage':
            return <WarrantyCoverageBlock key={key} block={block as WarrantyCoverageBlockData} />

          case 'PageBlocksContactCards':
            return <ContactCardsBlock key={key} block={block as ContactCardsBlockData} />

          case 'PageBlocksContactForm':
            return <ContactFormBlock key={key} block={block as ContactFormBlockData} />

          case 'PageBlocksCtaBanner':
            return <CTABannerBlock key={key} block={block as CTABannerBlockData} />

          case 'PageBlocksGlassComparison':
            return <GlassComparisonBlock key={key} block={block as GlassComparisonBlockData} pricingOptions={pricingOptions} />

          case 'PageBlocksGlassTechSpecs':
            return <GlassTechSpecsBlock key={key} block={block as GlassTechSpecsBlockData} pricingOptions={pricingOptions} />

          case 'PageBlocksAdaptorDisclosure':
            return <AdaptorDisclosure key={key} block={block as AdaptorDisclosureBlockData} />

          case 'PageBlocksPaymentTerms':
            return <PaymentTerms key={key} block={block as PaymentTermsBlockData} />

          case 'PageBlocksFreeAdvice':
            return <FreeAdviceBlock key={key} block={block as FreeAdviceBlockData} />

          case 'PageBlocksWhatElseStrip':
            return <WhatElseStripBlock key={key} block={block as WhatElseStripBlockData} />

          case 'PageBlocksEmergencyStrip':
            return <EmergencyStripBlock key={key} block={block as EmergencyStripBlockData} />

          default:
            return null
        }
      })}
    </>
  )
}
