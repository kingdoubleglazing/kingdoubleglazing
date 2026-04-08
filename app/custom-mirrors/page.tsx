import type { Metadata } from 'next'
import { Ruler, Sparkles, Layers, ShieldCheck, Tag, Zap } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { HeroSection } from '@/components/sections/HeroSection'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Mirrors Melbourne | Cut to Size, Bevelled, Installed | King',
  description:
    'Custom-cut mirrors for Melbourne bathrooms, gyms, and feature walls. Any shape or size, bevelled edges available, installed by a licensed glazier. Transparent pricing.',
  path: '/custom-mirrors/',
})

// ── FAQ data ──────────────────────────────────────────────────────────────────

const mirrorFaq = [
  {
    q: 'How much do custom mirrors cost in Melbourne?',
    a: 'Custom mirrors are priced by square metre based on glass thickness, edge finish (flat polish, bevelled, or pencil edge), and any cut-outs. Standard bathroom vanity mirrors start from around $180–$250/m² supply and install. Use our Instant Estimate Tool for a transparent quote based on your dimensions.',
  },
  {
    q: 'What sizes and shapes can you cut?',
    a: 'Any size, any rectangular or square shape. We also cut circles, ovals, and custom geometric shapes. Arched tops for heritage-style vanities are available. If you can draw it, we can cut it.',
  },
  {
    q: 'Can you bevel the edges?',
    a: 'Yes. Bevelled edges — typically 25 mm or 50 mm wide — give a mirror a premium frame-like finish without a physical frame. Flat polished and pencil-round edges are also available at different price points.',
  },
  {
    q: 'How is the mirror fixed to the wall?',
    a: 'We use a mirror-safe adhesive system (not standard silicone, which can cause silvering damage over time) combined with concealed J-channel or clips depending on the weight and finish required. The method is invisible from the front.',
  },
  {
    q: 'Can you install mirrors in bathrooms and wet areas?',
    a: 'Yes. We use moisture-resistant backing to prevent black edge spots and silvering deterioration in humid environments. Standard mirror glass will eventually degrade in bathrooms — specifying the correct backing at install prevents this.',
  },
  {
    q: 'Do you supply gym wall mirrors?',
    a: 'Yes. Gym wall mirrors are typically 4–6 mm clear float glass in large panels, cut and polished to your wall dimensions. We measure, supply, and install. Heavy panels are fixed with channel and clip systems for safety.',
  },
  {
    q: 'How long does a custom mirror take?',
    a: 'Standard shapes are manufactured in 3–5 business days. Complex cuts or large gym panels may take 5–7 days. Installation is booked once the glass is ready — most installs take 1–2 hours.',
  },
  {
    q: 'Can you remove and dispose of an old mirror?',
    a: 'Yes. Old mirror removal and disposal can be added to any installation booking. We handle it safely — mirror glass requires careful handling to avoid silvering dust and sharp edge hazards.',
  },
] as const

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const serviceSchema = buildServiceSchema({
  name: 'Custom Mirror Supply and Installation Melbourne',
  description:
    'Custom-cut mirrors for bathrooms, gyms, and feature walls across Melbourne. Any size, bevelled edges available, installed by a licensed glazier.',
  url: `${siteConfig.domain}/custom-mirrors/`,
  priceRange: 'From $180/m²',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Custom Mirrors', href: '/custom-mirrors/' },
])

const faqSchema = buildFaqSchema(
  mirrorFaq.map(({ q, a }) => ({ question: q, answer: a }))
)

// ── Section data ──────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: Ruler,
    heading: 'Any Size, Any Shape',
    text: 'Rectangular, square, circular, oval, arched — every mirror is cut to your exact specification. Standard sizes cost nothing extra versus catalogue sizes because we cut to order as standard.',
  },
  {
    icon: Sparkles,
    heading: 'Bevelled, Polished, or Pencil Edge',
    text: 'A bevelled edge gives your mirror a premium frame-like finish without a physical frame. Flat polished and pencil-round edges are also available. The edge finish is quoted upfront.',
  },
  {
    icon: Layers,
    heading: 'Moisture-Resistant Backing',
    text: 'Bathrooms degrade standard mirror glass over time — black spots and edge deterioration are symptoms of wrong backing. We specify moisture-resistant backing on all bathroom installs as standard.',
  },
  {
    icon: ShieldCheck,
    heading: 'Safe Adhesive System',
    text: 'Standard silicone corrodes mirror silvering within a few years. We use mirror-safe adhesive — the correct product for the job. Concealed fixings or J-channel for heavier panels.',
  },
  {
    icon: Tag,
    heading: 'Transparent Pricing',
    text: 'Priced by m² based on thickness and edge finish. No "call for price" guessing games. Get an itemised quote from our Instant Estimate Tool before anyone visits your home.',
  },
  {
    icon: Zap,
    heading: 'Installed in Hours',
    text: 'Most bathroom vanity and feature mirror installations are complete in 1–2 hours. Gym wall panels may take half a day depending on linear run. Same-day use once adhesive sets.',
  },
] as const

const processSteps = [
  {
    title: 'Measure & Quote',
    body: 'Enter your dimensions into our Instant Estimate Tool or book a free on-site measure. You receive an itemised quote including glass thickness, edge finish, and installation. No site visit required for standard shapes.',
  },
  {
    title: 'Glass Cut to Order',
    body: 'Your mirror is precision-cut and edged to your exact dimensions. We specify moisture-resistant backing for bathrooms and wet areas. Lead time is typically 3–5 business days.',
  },
  {
    title: 'Installation Booked',
    body: 'Once glass is ready we confirm your installation date. A licensed King glazier arrives with all fixings — adhesive, clips, or channel — appropriate for the weight and location.',
  },
  {
    title: 'Fitted & Done',
    body: 'Mirror fixed, level checked, adhesive applied with the correct product. Old mirror removed and disposed of if included in your booking. Site left clean. Adhesive cured and ready within 24 hours.',
  },
] as const

// ── Page ──────────────────────────────────────────────────────────────────────

export default function CustomMirrorsPage() {
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
        badge="Custom Mirrors"
        headlineWhite="Any Shape."
        headlineYellow="Any Size."
        subtext="Custom-cut mirrors for Melbourne bathrooms, gyms, and feature walls. Bevelled edges, moisture-resistant backing, installed in hours."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: siteConfig.phoneHref }}
        imageSrc="/hero/hero-custom-mirros.webp"
        imageAlt="Custom bevelled mirror installed above a Melbourne bathroom vanity"
      />

      <BenefitsGrid
        eyebrow="Custom Mirrors"
        heading={"What You\nActually Get"}
        items={benefits}
      />

      <ProcessSteps
        heading="How It Works"
        subheading="From your dimensions to a perfectly fitted mirror."
        cta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        steps={processSteps}
      />

      <FAQ
        heading="Custom Mirror Questions"
        subheading="Everything you want to know before booking a measure."
        items={mirrorFaq}
      />

      <CtaBanner
        heading={"Get Your\nTransparent Quote"}
        subtext="Enter your dimensions and get an itemised price instantly. No site visit required. No sales call."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
