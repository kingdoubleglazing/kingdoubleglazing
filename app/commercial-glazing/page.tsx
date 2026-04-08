import type { Metadata } from 'next'
import {
  Building2,
  FileText,
  ShieldCheck,
  Tag,
  Zap,
  MapPin,
  Crown,
  Users,
  ClipboardList,
} from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { testimonials } from '@/data/testimonials'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Commercial Glazing Melbourne | Offices, Retail & Strata | King',
  description:
    'Commercial glazing across Melbourne — shopfronts, office partitions, balustrades, double glazing retrofits for strata and developers. Itemised quotes, predictable scheduling.',
  path: '/commercial-glazing/',
})

// ── FAQ data (defined before faqSchema) ──────────────────────────────────────

const commercialFaq = [
  {
    q: 'What commercial glazing services do you offer?',
    a: 'We cover the full scope of commercial glass work: shopfront glazing, office partitions and internal glass walls, frameless glass balustrades, double glazing retrofits for commercial buildings, strata glazing programs, and emergency glass repair. All work is carried out by licensed glaziers with current insurance certificates available on request.',
  },
  {
    q: 'Can you manage glazing across multiple sites or tenancies?',
    a: 'Yes. We work with strata managers, property developers, and facilities managers who need consistent pricing and scheduling across multiple buildings. We offer preferred-supplier arrangements with agreed rates, priority scheduling, and consolidated invoicing.',
  },
  {
    q: 'Do you provide insurance certificates and compliance documentation?',
    a: 'Yes. Public liability insurance certificates, workers compensation certificates, and Safe Work Method Statements (SWMS) are available for all commercial jobs. We are accustomed to contractor induction requirements and can supply all standard compliance documentation.',
  },
  {
    q: 'Can you work out of hours or on weekends to avoid disruption?',
    a: 'Yes. Out-of-hours and weekend installations are available for projects where business continuity requires it. We price these jobs at the project stage so there are no surprise surcharges.',
  },
  {
    q: 'Do you handle double glazing retrofits for commercial buildings?',
    a: 'Yes. Commercial double glazing retrofits are a core part of our work. Offices with high heating and cooling costs, strata buildings seeking energy rating improvements, and NABERS-rated properties all benefit. We provide before/after U-value documentation and can assist with energy reporting requirements.',
  },
  {
    q: 'How are commercial projects priced?',
    a: 'Commercial projects are quoted on scope — we review drawings or conduct a site measure, then provide a fully itemised quote broken down by glass type, panel count, and installation. No lump-sum figures. You see exactly what you are paying for before committing.',
  },
  {
    q: 'What is your lead time for commercial projects?',
    a: 'Standard commercial glass is typically available in 5–10 business days. Larger custom orders, structural glass, or specialist coatings may take longer. We confirm lead times at quoting stage and build them into the project schedule.',
  },
  {
    q: 'Are you able to provide references from commercial clients?',
    a: 'Yes. References from strata managers, developers, and fitout contractors are available on request. We are happy to put you in direct contact with clients who have worked with us on comparable projects.',
  },
] as const

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const serviceSchema = buildServiceSchema({
  name: 'Commercial Glazing Melbourne',
  description:
    'Commercial glazing for offices, retail, strata, and developers across Melbourne. Shopfronts, partitions, balustrades, and double glazing retrofits.',
  url: `${siteConfig.domain}/commercial-glazing/`,
  priceRange: 'Project-based — contact for quote',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Commercial Glazing', href: '/commercial-glazing/' },
])

const faqSchema = buildFaqSchema(
  commercialFaq.map(({ q, a }) => ({ question: q, answer: a }))
)

// ── Section data ──────────────────────────────────────────────────────────────

const trustItems = [
  { icon: ShieldCheck, label: 'Licensed Glazier' },
  { icon: FileText,    label: 'Insurance Certs on Request' },
  { icon: Building2,   label: 'Strata & Developer Ready' },
  { icon: Crown,       label: 'Melbourne Owned' },
  { icon: MapPin,      label: 'Melbourne-Wide Coverage' },
]

const benefits = [
  {
    icon: Building2,
    heading: 'Full Commercial Scope',
    text: 'Shopfronts, internal glass partitions, frameless balustrades, double glazing retrofits, strata maintenance programs. One licensed glazier for the full scope — no subcontracting coordination.',
  },
  {
    icon: FileText,
    heading: 'Compliance Documentation',
    text: 'Public liability certificates, workers compensation, and SWMS available for every job. We are accustomed to contractor induction requirements and never delay a project over paperwork.',
  },
  {
    icon: Tag,
    heading: 'Itemised Quotes — No Lump Sums',
    text: 'Every commercial quote is broken down by glass specification, panel count, and installation. You see exactly what you are paying for. No surprises at invoice.',
  },
  {
    icon: Users,
    heading: 'Preferred Supplier Arrangements',
    text: 'Strata managers and facilities teams can engage us on agreed rates with priority scheduling and consolidated invoicing across multiple buildings. Ask about our commercial accounts.',
  },
  {
    icon: Zap,
    heading: 'Out-of-Hours Availability',
    text: 'Weekend and after-hours installations available where business continuity requires it. Out-of-hours pricing confirmed at quote stage — no surprise surcharges on the invoice.',
  },
  {
    icon: ClipboardList,
    heading: 'Energy & NABERS Documentation',
    text: 'Commercial double glazing retrofits come with before/after U-value documentation to support energy reporting, NABERS ratings, and sustainability disclosure requirements.',
  },
] as const

const processSteps = [
  {
    title: 'Scope Review',
    body: 'Send us drawings, a scope of works, or arrange a site inspection. We review the brief and confirm what documentation (insurance certs, SWMS, induction requirements) is needed before we mobilise.',
  },
  {
    title: 'Itemised Quote',
    body: 'You receive a fully itemised quote broken down by glass specification, panel count, and installation line items. No lump sums. Pricing is fixed at quote — no variations unless scope changes.',
  },
  {
    title: 'Scheduled & Confirmed',
    body: 'Installation dates confirmed in writing. Out-of-hours or staged delivery scheduled to your operational requirements. Glass ordered to project timeline.',
  },
  {
    title: 'Installed & Certified',
    body: 'Licensed glaziers on site with all compliance documentation. Defects inspected and signed off before we leave. Tax invoice matching the quote issued on completion.',
  },
] as const

const commercialTestimonials = testimonials.filter((t) => t.tag === 'commercial')

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CommercialGlazingPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <HeroSection
        compact
        badge="Commercial Glazing"
        headlineWhite="Glass for Business."
        headlineYellow="Done Properly."
        subtext="Shopfronts, partitions, balustrades, strata programs. Itemised quotes, compliance documentation, predictable scheduling."
        primaryCta={{ label: 'Discuss Your Project', href: '/contact/' }}
        secondaryCta={{ label: 'Call Now', href: siteConfig.phoneHref }}
        imageSrc="/hero/hero-commercial-glazing.webp"
        imageAlt="Commercial glazing installation — glass partitions in a Melbourne office"
      />

      <TrustBar items={trustItems} />

      <BenefitsGrid
        eyebrow="Commercial Glazing"
        heading={"What Sets Us\nApart"}
        items={benefits}
      />

      <ProcessSteps
        heading="How a Project Works"
        subheading="From scope review to signed-off installation."
        cta={{ label: 'Discuss Your Project', href: '/contact/' }}
        steps={processSteps}
      />

      <Testimonials
        heading={"Commercial Clients.\nReal Feedback."}
        subheading="Strata managers, developers, and fitout contractors on working with King."
        items={commercialTestimonials}
      />

      <FAQ
        heading="Commercial Glazing Questions"
        subheading="Answers for facilities managers, strata managers, and developers."
        items={commercialFaq}
      />

      <CtaBanner
        heading={"Discuss Your\nProject"}
        subtext="Send us a scope of works or arrange a site inspection. Itemised quote, fixed pricing, compliance documentation included."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
