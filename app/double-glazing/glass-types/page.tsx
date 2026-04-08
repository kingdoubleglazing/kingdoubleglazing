import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { Square, Sun, VolumeX, Layers } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { GlassOptions } from '@/components/blocks/GlassOptions'
import { GlassFeatureMatrix } from '@/components/sections/GlassFeatureMatrix'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { TrustBar } from '@/components/sections/TrustBar'
import { glassTypesFaq } from '@/data/glass-types-faq'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Glass Types | Which Glass is Right for You?',
  description:
    'Low-E, acoustic laminated, argon-filled — compare double glazing glass types for Melbourne homes. Honest guide with no upsell.',
  path: '/double-glazing/glass-types/',
})

const decisionGuide = [
  {
    icon: Square,
    heading: 'Choose Standard Clear If…',
    text: 'Your primary goal is thermal improvement on a tight budget. South-facing rooms with no direct sun and no serious noise issue. A good all-rounder from $495/m² that outperforms single glazing on every metric.',
  },
  {
    icon: Sun,
    heading: 'Choose Tinted Low-E If…',
    text: 'Energy bills are the main problem. West or north-facing rooms that overheat in summer. Any home targeting VEU rebate eligibility. The most cost-effective specification for Melbourne\'s climate — our most specified glass at $595/m².',
  },
  {
    icon: VolumeX,
    heading: 'Choose Acoustic Laminated If…',
    text: 'Noise is the primary issue — tram corridors, arterial roads, flight paths, or party walls. Rw 42 outperforms every other option for noise including triple glazed. Solid thermal performance as a bonus, from $645/m².',
  },
  {
    icon: Layers,
    heading: 'Choose Triple Glazed If…',
    text: 'You are targeting a 7+ NatHERS star rating, live in the Dandenong Ranges or Yarra Valley, or have a very large glass area on a cold elevation. The highest U-value (1.0) in our range. Best ROI at $795/m² when heating loads are extreme.',
  },
] as const

export default function GlassTypesPage() {
  return (
    <>
      <HeroSection
        compact
        badge="Glass Type Guide"
        headlineWhite="Four Glasses."
        headlineYellow="One Right Choice."
        subtext="Standard clear, Tinted Low-E, Acoustic Laminated, Triple Glazed — compared honestly. No upsell."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Four double glazing glass types compared for Melbourne homes"
      />
      <TrustBar />
      <GlassOptions
        variant="full"
        heading="The Four Options"
        subheading="Every glass type we install — specs, pricing, and what each one is built for."
      />
      <GlassFeatureMatrix />
      <BenefitsGrid
        eyebrow="Decision Guide"
        heading={"Which Glass\nFor Your Home"}
        items={decisionGuide}
      />
      <FAQ
        heading="Glass Type Questions"
        subheading="How to choose, what specs mean, and when the expensive option is worth it."
        items={glassTypesFaq}
      />
      <CtaBanner
        heading={"Know Your Glass.\nKnow Your Price."}
        subtext="Select your glass type in the Instant Estimate tool and get a transparent, itemised quote in 60 seconds."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
      />
    </>
  )
}
