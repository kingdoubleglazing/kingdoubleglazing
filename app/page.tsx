import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { CostRangeCards } from '@/components/sections/CostRangeCards'
import { costRanges } from '@/data/cost-ranges'
import { GlassOptions } from '@/components/blocks/GlassOptions'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { CtaBanner } from '@/components/sections/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: "Retrofit Double Glazing Melbourne | From $495/m² | King Double Glazing",
  description:
    "Stop. Don't Overpay. Melbourne's retrofit double glazing specialists upgrade your existing windows from $495/m². Get your instant estimate online — no sales calls.",
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <HeroSection
        badge="Stop. Don't Overpay."
        headlineWhite="Melbourne's Honest"
        headlineYellow="Retrofit Specialists"
        subtext="From $495/m² — No hidden costs, no sales pressure."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/hero-main.webp"
        imageAlt="Double glazed windows overlooking Melbourne skyline at dusk"
      />
      <TrustBar />
      <ProblemSolutionSection />
      <ServicesSection />
      <BenefitsGrid />
      <ProcessSteps />
      <GlassOptions
        variant="preview"
        heading="Glass That Fits Your Home"
        subheading="Four options. Transparent pricing. No upsells."
      />
      <CostRangeCards
        cards={costRanges.slice(0, 3)}
        variant="home"
        lastUpdated="Apr 2026"
      />
      <Testimonials />
      <CtaBanner />
    </>
  )
}
