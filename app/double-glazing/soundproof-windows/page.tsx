import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { VolumeX, Layers, Zap, MapPin, Tag, ShieldCheck } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { AcousticComparisonTable } from '@/components/sections/AcousticComparisonTable'
import { GlassOptions } from '@/components/blocks/GlassOptions'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { testimonials } from '@/data/testimonials'
import { soundproofFaq } from '@/data/soundproof-faq'

export const metadata: Metadata = buildMetadata({
  title: 'Soundproof Windows Melbourne | Acoustic Double Glazing',
  description:
    'Reduce traffic and neighbourhood noise with acoustic double glazing in Melbourne. Laminated glass, high Rw ratings. Get a quote from $495/m².',
  path: '/double-glazing/soundproof-windows/',
})

const acousticBenefits = [
  {
    icon: VolumeX,
    heading: 'Half the Perceived Loudness',
    text: 'Acoustic laminated glass achieves Rw 42 — a 16 dB improvement over single glazing. Every 10 dB halves what your ear registers. The tram line becomes background. The freeway becomes manageable.',
  },
  {
    icon: Layers,
    heading: 'PVB Interlayer Blocks the Rest',
    text: 'Standard double glazing has a resonant frequency weakness at 2,000–4,000 Hz where noise actually spikes through. The laminated PVB interlayer damps that resonance — particularly effective on voices, traffic rumble, and public transport.',
  },
  {
    icon: Zap,
    heading: 'Fitted in One Day',
    text: 'Acoustic units install directly into your existing frames. No structural work, no replastering. A standard Melbourne home is done start-to-finish in a single visit.',
  },
  {
    icon: MapPin,
    heading: 'Traffic, Planes & Neighbours',
    text: 'Specified for arterial roads, tram corridors, flight paths, and party walls. We can specify asymmetric pane thicknesses for extreme low-frequency environments — freight rail, nightclub walls.',
  },
  {
    icon: Tag,
    heading: 'From $645/m² Acoustic Grade',
    text: 'Acoustic laminated glazing at $645/m² installed — roughly $150/m² more than standard double. For a bedroom with two windows, that\'s around $300 extra for a night\'s sleep back.',
  },
  {
    icon: ShieldCheck,
    heading: '10-Year Warranty on Seal',
    text: 'The acoustic performance of the unit depends on a perfect factory seal. We guarantee that seal in writing for 10 years — if the unit fogs or loses integrity, we replace it at no cost.',
  },
] as const

const noiseTestimonials = testimonials.filter((t) => t.tag === 'noise')

export default function SoundproofWindowsPage() {
  return (
    <>
      <HeroSection
        compact
        badge="Acoustic Glazing Specialists"
        headlineWhite="Silence Is"
        headlineYellow="The Upgrade"
        subtext="Acoustic laminated double glazing — Rw 42. Traffic, trams, and flight paths. One day, from $645/m²."
        primaryCta={{ label: 'Get Acoustic Estimate', href: '/instant-estimate/?glass=acoustic-laminated' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/stock/double-glazed-2000px.webp"
        imageAlt="Melbourne home with acoustic double glazing on a busy arterial road"
      />
      <TrustBar />
      <BenefitsGrid
        eyebrow="Why Acoustic Glazing"
        heading={"What Acoustic\nGlass Actually Does"}
        items={acousticBenefits}
      />
      <AcousticComparisonTable />
      <GlassOptions
        variant="full"
        heading="All Glass Options"
        subheading="Every tier includes Rw ratings. Acoustic Laminated is the recommended spec for noise — but compare all four."
      />
      <ProcessSteps
        heading="How It Works"
        subheading="From noise problem to quiet room — four steps, one day."
        cta={{ label: 'Get Acoustic Estimate', href: '/instant-estimate/?glass=acoustic-laminated' }}
      />
      <Testimonials
        heading={"From Tram Lines\nTo Quiet."}
        subheading="Melbourne customers who installed acoustic glazing for noise reduction."
        items={noiseTestimonials}
      />
      <FAQ
        heading="Noise Questions"
        subheading="Straight answers on acoustic glazing performance."
        items={soundproofFaq}
      />
      <CtaBanner
        heading={"Stop Adapting\nTo The Noise"}
        subtext="Acoustic laminated double glazing from $645/m². Get a transparent, itemised estimate in 60 seconds — no sales call, no site visit."
        primaryCta={{ label: 'Get Acoustic Estimate', href: '/instant-estimate/?glass=acoustic-laminated' }}
      />
    </>
  )
}
