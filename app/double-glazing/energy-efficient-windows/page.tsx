import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { TrendingDown, Sun, Zap, BadgeDollarSign, ShieldCheck, Layers } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ThermalComparisonTable } from '@/components/sections/ThermalComparisonTable'
import { GlassOptions } from '@/components/blocks/GlassOptions'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { testimonials } from '@/data/testimonials'
import { energyFaq } from '@/data/energy-faq'

export const metadata: Metadata = buildMetadata({
  title: 'Energy Efficient Windows Melbourne | Low-E Double Glazing',
  description:
    'Cut heating and cooling costs with energy efficient double glazing in Melbourne. Low-E glass, argon gas fill. From $495/m². Get your instant estimate.',
  path: '/double-glazing/energy-efficient-windows/',
})

const thermalBenefits = [
  {
    icon: TrendingDown,
    heading: 'Up to 83% Less Heat Loss',
    text: 'Triple glazing (U 1.0) reduces heat loss through glass by 83% versus single pane (U 5.8). Low-E double glazing delivers 69% at roughly half the price — the optimal trade-off for most Melbourne homes.',
  },
  {
    icon: Sun,
    heading: 'Low-E Coating Reflects Solar Heat',
    text: 'A microscopically thin metallic oxide coating on the inner pane face reflects infrared radiation back into the room in winter and back outside in summer. Invisible to the eye. No reduction in natural light.',
  },
  {
    icon: Zap,
    heading: 'Eliminates Cold Spots & Drafts',
    text: "Single-pane glass in Melbourne winter reaches 4–6°C — cold enough to create a convection draft across the floor. Low-E double glazing keeps the inner pane at 14–18°C, ending the radiative cold that makes rooms feel colder than the thermostat reads.",
  },
  {
    icon: BadgeDollarSign,
    heading: 'VEU Rebate Applied at Invoice',
    text: "Tinted Low-E and Triple Glazed both qualify for the Victorian Energy Upgrades program. We lodge the paperwork — your invoice arrives already reduced by $300–$900 depending on your home's heating zone.",
  },
  {
    icon: Layers,
    heading: 'Argon Fill as Standard',
    text: 'All our double-glazed units include argon gas fill between the panes as default. Argon is denser than air and conducts heat more slowly, contributing to the rated U-value. No upcharge, no upgrade required.',
  },
  {
    icon: ShieldCheck,
    heading: 'Pays for Itself in 5–7 Years',
    text: 'Melbourne customers report $150–$200 per quarter in energy savings after a full home retrofit. Net of the VEU rebate, payback is typically 5–7 years — and every year after that is pure saving.',
  },
] as const

const energyTestimonials = testimonials.filter((t) => t.tag === 'energy')

export default function EnergyEfficientWindowsPage() {
  return (
    <>
      <HeroSection
        compact
        badge="Low-E Glazing Specialists"
        headlineWhite="Heat Stays In."
        headlineYellow="Bills Go Down."
        subtext="Low-E double glazing from $595/m² — 69% less heat loss. VEU rebate applied at invoice."
        primaryCta={{ label: 'Get Energy Estimate', href: '/instant-estimate/?glass=tinted-low-e' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/stock/double-glazed-2000px.webp"
        imageAlt="Melbourne home with energy efficient Low-E double glazing installed"
      />
      <TrustBar />
      <BenefitsGrid
        eyebrow="Thermal Performance"
        heading={"What Low-E Glass\nActually Does"}
        items={thermalBenefits}
      />
      <ThermalComparisonTable />
      <GlassOptions
        variant="full"
        heading="All Glass Options"
        subheading="Tinted Low-E is the recommended spec for Melbourne energy performance — compare all four tiers and their U-values."
      />
      <ProcessSteps
        heading="How It Works"
        subheading="From energy problem to efficient home — four steps, one day."
        cta={{ label: 'Get Energy Estimate', href: '/instant-estimate/?glass=tinted-low-e' }}
      />
      <Testimonials
        heading={"Lower Bills.\nReal Homes."}
        subheading="Melbourne customers who installed energy efficient glazing for thermal comfort and cost reduction."
        items={energyTestimonials}
      />
      <FAQ
        heading="Energy Questions"
        subheading="Straight answers on U-values, Low-E coatings, and Melbourne energy savings."
        items={energyFaq}
      />
      <CtaBanner
        heading={"Stop Heating\nThe Street"}
        subtext="Low-E double glazing from $595/m². VEU rebate applied at invoice. Transparent, itemised estimate in 60 seconds."
        primaryCta={{ label: 'Get Energy Estimate', href: '/instant-estimate/?glass=tinted-low-e' }}
      />
    </>
  )
}
