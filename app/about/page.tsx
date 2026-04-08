import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { FounderStory } from '@/components/sections/FounderStory'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { CtaBanner } from '@/components/sections/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers",
  description:
    'Meet Cas — 40+ years in glazing, founded King Double Glazing to cut costs by 30%. Transparent pricing, no middlemen, no upsells. Melbourne-wide.',
  path: '/about/',
})

export default function AboutPage() {
  return (
    <>
      <HeroSection
        badge="Melbourne's Anti-Ripoff Glaziers"
        headlineWhite="About King"
        headlineYellow="Double Glazing"
        subtext="Transparent pricing. No middlemen. No upsells. No surprises."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/hero/hero-home.webp"
        imageAlt="King Double Glazing workshop — Melbourne glaziers"
        compact
      />
      <TrustBar />
      <FounderStory />
      <BenefitsGrid
        eyebrow="Why Choose King"
        heading={"What You\nActually Get"}
      />
      <ProcessSteps
        heading="Our Approach"
        subheading="How a 40-year career shaped a better glazing process."
      />
      <Testimonials />
      <ServicesSection heading="Our Services" />
      <CtaBanner
        heading={"Ready to\nGet Started?"}
        subtext="Talk directly to Cas — no call centres, no pushy salespeople. Just honest advice and transparent pricing."
      />
    </>
  )
}
