import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { Tag, ShieldCheck, Zap, TrendingDown, BadgeDollarSign, FileText } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { CostRangeCards } from '@/components/sections/CostRangeCards'
import { GlassCostTable } from '@/components/sections/GlassCostTable'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { costRanges } from '@/data/cost-ranges'
import { costFaq } from '@/data/cost-faq'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Cost Melbourne | Transparent Pricing from $495/m²',
  description:
    'How much does double glazing cost in Melbourne? Honest price breakdown from $495/m². Use our instant estimate tool — no sales calls, no surprises.',
  path: '/double-glazing/cost/',
})

const valueBenefits = [
  {
    icon: Tag,
    heading: 'Price Locked at Quote',
    text: 'The written quote is the invoice. No variations, no surprises — the number you see is the number you pay.',
  },
  {
    icon: ShieldCheck,
    heading: 'Half the Cost of Replacement',
    text: 'Retrofit removes frames from the equation. You save $500–$800 per m² versus full window replacement with identical glass performance.',
  },
  {
    icon: BadgeDollarSign,
    heading: 'VEU Rebate Handled for You',
    text: 'Most Melbourne retrofit jobs qualify for Victorian Energy Upgrades rebates. We lodge the paperwork — your invoice arrives already reduced.',
  },
  {
    icon: Zap,
    heading: 'No Hidden Charges',
    text: 'Price per m² includes measure, glass, installation, old glass disposal, and cleanup. No labour line. No rubbish fee. No callout surcharge.',
  },
  {
    icon: TrendingDown,
    heading: '5–8 Year Payback',
    text: 'Energy savings alone typically repay the investment in 5–8 years. Heritage-area resale premiums often make it faster.',
  },
  {
    icon: FileText,
    heading: '10-Year Written Warranty',
    text: 'Not a verbal promise — a written warranty on glass seal integrity and workmanship, transferable to the next owner if you sell.',
  },
] as const

const quotingSteps = [
  {
    title: 'Measure Your Windows',
    body: 'Enter width and height for each window into the Instant Estimate Tool. Takes 3 minutes. No measuring tape expertise required — we walk you through it.',
  },
  {
    title: 'Get an Itemised Price',
    body: 'The tool outputs a transparent, per-window cost breakdown for each glass tier. No range. No "from". An actual number you can budget against.',
  },
  {
    title: 'We Confirm Within 24 Hours',
    body: 'A King technician reviews your submission and issues a written quote. If anything looks off, we call — you don\'t get a surprise at installation.',
  },
  {
    title: 'Lock It In. One Day Install.',
    body: 'Written quote locks the price for 30 days. When you\'re ready, we book the install — one day, no structural work, no mess.',
  },
] as const

export default function DoubleGlazingCostPage() {
  const serviceSchema = buildServiceSchema({
    name: 'Double Glazing Cost Melbourne',
    description:
      'Transparent double glazing pricing for Melbourne homes. Retrofit from $495/m² — itemised quote with no hidden charges.',
    url: `${BASE_URL}/double-glazing/cost/`,
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Retrofit Double Glazing', href: '/double-glazing/' },
    { name: 'Cost', href: '/double-glazing/cost/' },
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
        badge="Transparent Pricing"
        headlineWhite="No Hidden Costs."
        headlineYellow="Real Numbers."
        subtext="From $495/m² — see your exact price in 60 seconds. No sales call required."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/hero-main.webp"
        imageAlt="Melbourne home windows showing double glazing retrofit installation"
      />
      <TrustBar />
      <CostRangeCards
        heading="Cost by Project Size"
        subheading="Real price ranges for Melbourne homes. Pick your scenario."
        lastUpdated="Apr 2026"
        cards={costRanges}
        variant="pricing"
      />
      <GlassCostTable />
      <BenefitsGrid
        eyebrow="Value"
        heading={"What You Get\nFor The Price"}
        items={valueBenefits}
      />
      <ProcessSteps
        heading="How Quoting Works"
        subheading="A real price in 60 seconds. No sales call, no site visit, no pressure."
        cta={{ label: 'Start My Estimate', href: '/instant-estimate/' }}
        steps={quotingSteps}
      />
      <FAQ
        heading="Cost Questions"
        subheading="Straight answers on Melbourne double glazing pricing."
        items={costFaq}
      />
      <CtaBanner
        heading={"Know Your Price\nBefore You Call"}
        subtext="Instant Estimate gives you a locked, itemised quote in 60 seconds. The price you see is the price you pay."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
      />
    </>
  )
}
