import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { GlassOptions } from '@/components/blocks/GlassOptions'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { testimonials } from '@/data/testimonials'

export const metadata: Metadata = buildMetadata({
  title: 'Retrofit Double Glazing Melbourne | Upgrade Existing Windows',
  description:
    'Retrofit double glazing for Melbourne homes — upgrade existing timber or aluminium windows without full replacement. From $495/m². Get your instant estimate.',
  path: '/double-glazing/',
})

export default function RetrofitDoubleGlazingPage() {
  const serviceSchema = buildServiceSchema({
    name: 'Retrofit Double Glazing Melbourne',
    description:
      'Retrofit double glazing for Melbourne homes — upgrade existing timber or aluminium windows without full replacement. From $495/m².',
    url: `${BASE_URL}/double-glazing/`,
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Retrofit Double Glazing', href: '/double-glazing/' },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <HeroSection
        compact
        badge="Retrofit Specialists"
        headlineWhite="Upgrade Your Windows"
        headlineYellow="Not Your Frames"
        subtext="From $495/m² — Keep your existing timber or aluminium. Double the performance."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Retrofit double glazing installed in Melbourne home timber window frames"
      />
      <TrustBar />
      <BenefitsGrid
        eyebrow="Why Retrofit"
        heading={"6 Reasons to\nRetrofit"}
      />
      <GlassOptions
        variant="full"
        heading="Choose Your Glass"
        subheading="Four performance tiers. Every budget. Transparent pricing — no surprises at invoice."
      />
      <ProcessSteps
        heading="How It Works"
        subheading="Four steps from enquiry to a warmer, quieter home."
        cta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
      />
      <ComparisonTable />
      <BeforeAfter />
      <Testimonials
        heading={"Melbourne Homes.\nReal Feedback."}
        subheading="Every review is from a verified retrofit customer."
        items={testimonials}
      />
      <FAQ />
      <CtaBanner
        heading={"Get Your\nInstant Estimate"}
        subtext="Enter your window dimensions and get a transparent, itemised price in 60 seconds. No sales calls. No site visit required."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
      />
    </>
  )
}
