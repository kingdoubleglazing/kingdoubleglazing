import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { Square, Sun, VolumeX, Layers } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { GlassOptions } from '@/components/blocks/GlassOptions'
import { GlassTypeDetail } from '@/components/sections/GlassTypeDetail'
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
        imageSrc="/stock/double-glazed-2000px.webp"
        imageAlt="Four double glazing glass types compared for Melbourne homes"
      />
      <TrustBar />
      <GlassOptions
        variant="full"
        heading="The Four Options"
        subheading="Every glass type we install — specs, pricing, and what each one is built for."
      />

      <GlassTypeDetail
        id="standard-clear"
        eyebrow="Option 01 — From $495/m²"
        name="Standard Clear Double Glazing"
        body="Two panes of clear float glass separated by a sealed air gap — typically 12mm. The gap acts as a thermal buffer, cutting heat transfer roughly in half compared to single glazing. No coatings, no tints: what you see through is exactly what you see outside. It's the most cost-effective entry point into double glazing and performs well across every Melbourne orientation. If your windows face south or east and your primary concern is winter warmth rather than summer solar gain, this is the specification we recommend."
        specs={[
          { label: 'U-Value', value: '2.7 W/m²K' },
          { label: 'Rw Rating', value: '35 dB' },
          { label: 'Heat Reduction', value: '50%' },
          { label: 'From', value: '$495/m²' },
        ]}
        imageSrc="/glass-types/double-glazing.webp"
        imageAlt="Standard clear double glazing cross-section showing air gap between two glass panes"
      />

      <GlassTypeDetail
        id="tinted-low-e"
        eyebrow="Option 02 — From $595/m²"
        name="Tinted Low-E"
        body="Low-emissivity (Low-E) glass has a microscopically thin metallic oxide coating — invisible to the eye — that reflects long-wave infrared radiation back to its source. In winter, heat generated inside is reflected back in. In summer, solar heat outside is reflected away before it enters. The tint layer further reduces solar heat gain coefficient (SHGC), targeting the high solar loads common on Melbourne's north and west elevations. The result is a 78% reduction in heat transfer — the best thermal performance in our retrofit range without moving to triple glazing."
        specs={[
          { label: 'U-Value', value: '1.8 W/m²K' },
          { label: 'Rw Rating', value: '36 dB' },
          { label: 'Heat Reduction', value: '78%' },
          { label: 'From', value: '$595/m²' },
        ]}
        imageSrc="/glass-types/low-e.webp"
        imageAlt="Tinted Low-E glass diagram showing infrared reflection coating on double glazing"
        imageLeft
      />

      <GlassTypeDetail
        id="acoustic-laminated"
        eyebrow="Option 03 — From $645/m²"
        name="Acoustic Laminated"
        body="Acoustic laminated glass bonds two panes together with a PVB (polyvinyl butyral) interlayer — typically 0.76mm thick — that acts as a damping membrane. When sound waves hit the outer pane, the PVB converts vibrational energy into heat rather than transmitting it to the inner pane. The result is an Rw 42 dB rating, which outperforms standard double glazing by 7 dB — a perceptible halving of noise. It also outperforms most triple glazed configurations on acoustic performance alone. If you live within 200 metres of a tram corridor, arterial road, or flight path, this is the specification that will materially change your quality of life."
        specs={[
          { label: 'U-Value', value: '2.4 W/m²K' },
          { label: 'Rw Rating', value: '42 dB' },
          { label: 'Heat Reduction', value: '45%' },
          { label: 'From', value: '$645/m²' },
        ]}
        imageSrc="/glass-types/acoustic-laminated.webp"
        imageAlt="Acoustic laminated glass PVB interlayer cross-section showing sound dampening"
      />

      <GlassTypeDetail
        id="triple-glazed"
        eyebrow="Option 04 — From $795/m²"
        name="Triple Glazed"
        body="Three panes, two sealed cavities, one U-value of 1.0 W/m²K. Triple glazing adds a third pane of glass and a second air gap, typically filled with argon gas to further slow convective heat transfer. The additional mass and damping also improves acoustic performance. The ROI case for triple glazing is strongest when heating loads are extreme — alpine suburbs, large glass areas on cold south-west elevations, or homes targeting a 7-star NatHERS rating. It is not always the right choice for inner Melbourne: for solar-heavy orientations, Tinted Low-E will outperform on energy bills at lower cost."
        specs={[
          { label: 'U-Value', value: '1.0 W/m²K' },
          { label: 'Rw Rating', value: '40 dB' },
          { label: 'Heat Reduction', value: '85%' },
          { label: 'From', value: '$795/m²' },
        ]}
        imageSrc="/glass-types/triple-glazed.webp"
        imageAlt="Triple glazed window cross-section with three panes and two argon gas cavities"
        imageLeft
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
