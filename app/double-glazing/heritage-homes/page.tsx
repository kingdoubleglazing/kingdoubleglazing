import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { Layers, ShieldCheck, FileText, TrendingDown, Zap, Tag } from 'lucide-react'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { testimonials } from '@/data/testimonials'
import { heritageFaq } from '@/data/heritage-faq'

export const metadata: Metadata = buildMetadata({
  title: 'Heritage Double Glazing Melbourne | Period & Character Homes',
  description:
    'Double glazing for heritage and period homes in Melbourne. Preserve the look of your timber windows while adding modern comfort. From $495/m².',
  path: '/double-glazing/heritage-homes/',
})

const heritageBenefits = [
  {
    icon: Layers,
    heading: 'Original Frames Preserved',
    text: "The retrofit method replaces only the glass. Your existing timber sashes, frames, glazing bars, and reveals stay exactly as they are. The street elevation of your home is unchanged — which is the point.",
  },
  {
    icon: ShieldCheck,
    heading: 'Heritage Overlay Compatible',
    text: "A glass-only retrofit is classified as maintenance under Victorian Planning Provisions Clause 43.01-2. No planning permit required for the vast majority of Heritage Overlay properties in Melbourne.",
  },
  {
    icon: FileText,
    heading: 'Written Statement of Works',
    text: "We provide a written statement of works with every heritage job — confirming the scope, glass specification, and that no frame alteration occurred. Sufficient for most council enquiries.",
  },
  {
    icon: TrendingDown,
    heading: 'Full Performance Upgrade',
    text: "Keeping the frame doesn't mean compromising on glass. The double-glazed units installed in your heritage sashes are factory-made to the same specification as any new window — identical U-values and Rw ratings.",
  },
  {
    icon: Zap,
    heading: 'One Day. Sashes Re-hung.',
    text: "Double-hung sash windows are removed, re-glazed, counterweights re-balanced for the new glass weight, and re-hung — all in a single visit. No multi-day scaffold, no disruption to the household.",
  },
  {
    icon: Tag,
    heading: 'No Heritage Premium',
    text: "Heritage homes are charged at the same rate as standard properties — from $495/m². The only cost additions are joinery repair (if frames need remediation first) or scaffolding for upper-storey windows without balcony access.",
  },
] as const

const heritageMetrics = [
  {
    label: 'Planning permit required',
    before: 'Required',
    after: 'Not required',
    note: 'Glass-only retrofit is permit-exempt under Clause 43.01-2',
  },
  {
    label: 'Installation time',
    before: '3–7 days',
    after: '1 day',
    note: 'Full replacement vs retrofit — same end result',
  },
  {
    label: 'Inner pane temp (winter morning)',
    before: '6',
    after: '15',
    unit: '°C',
    note: 'Eliminates condensation and radiant cold',
  },
  {
    label: 'Quarterly heating cost (4-bed Victorian terrace)',
    before: '$690',
    after: '$405',
    note: '−41% on gas bills, first full winter',
  },
] as const

const heritageSteps = [
  {
    title: 'Address Check',
    body: "Share your address and we confirm Heritage Overlay status, identify any Victorian Heritage Register listings, and advise whether a planning permit is required — it almost never is for a glass-only retrofit.",
  },
  {
    title: 'Frame & Rebate Assessment',
    body: "A King technician inspects each sash on-site: rebate depth, frame condition, counterweight mechanism, and any timber defects. If repair is needed before glazing, we tell you upfront — no surprises on the day.",
  },
  {
    title: 'Glass Specified & Ordered',
    body: "Units are factory-made to the exact sash dimensions. Heritage homes often have non-standard sizing — every unit is measured and made to order, not cut from stock. Lead time is typically 5–7 working days.",
  },
  {
    title: 'One-Day Installation',
    body: "Sashes are removed, re-glazed with the new double-glazed unit, counterweights re-balanced, and re-hung. Statement of works issued on completion. The house looks identical from the street.",
  },
] as const

const heritageTestimonials = testimonials.filter((t) => t.tag === 'heritage')

export default function HeritageHomesPage() {
  return (
    <>
      <HeroSection
        compact
        badge="Heritage Glazing Specialists"
        headlineWhite="Period Character."
        headlineYellow="Modern Comfort."
        subtext="Retrofit double glazing for Victorian and Edwardian homes — permit-free, frame-preserving, one day. From $495/m²."
        primaryCta={{ label: 'Check My Property', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Victorian heritage terrace in Melbourne with original timber sash windows"
      />
      <TrustBar />
      <BenefitsGrid
        eyebrow="Heritage Homes"
        heading={"What Makes\nRetrofit Different"}
        items={heritageBenefits}
      />
      <BeforeAfter
        heading="Heritage Homes. Real Numbers."
        subheading="Measured results from Melbourne period properties on the Heritage Overlay."
        metrics={heritageMetrics}
      />
      <ProcessSteps
        heading="The Heritage Process"
        subheading="Address check to installation — four steps designed around council compliance."
        cta={{ label: 'Check My Property', href: '/instant-estimate/' }}
        steps={heritageSteps}
      />
      <Testimonials
        heading={"Period Homes.\nActual Owners."}
        subheading="Melbourne heritage homeowners who retrofitted without permits, consultants, or council headaches."
        items={heritageTestimonials}
      />
      <FAQ
        heading="Heritage Questions"
        subheading="Council overlays, sash mechanics, frame conditions — answered straight."
        items={heritageFaq}
      />
      <CtaBanner
        heading={"Preserve the Look.\nLose the Draught."}
        subtext="Permit-free retrofit double glazing for Melbourne heritage homes. From $495/m². Check your property address in 60 seconds."
        primaryCta={{ label: 'Check My Property', href: '/instant-estimate/' }}
      />
    </>
  )
}
