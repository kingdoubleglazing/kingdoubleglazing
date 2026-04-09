import type { Metadata } from 'next'
import { Palette, Sparkles, Droplets, Ruler, ShieldCheck, Tag } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { HeroSection } from '@/components/sections/HeroSection'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Glass Splashbacks Melbourne | Custom Kitchen & Bathroom | King',
  description:
    'Custom toughened glass splashbacks for Melbourne kitchens and bathrooms. Any colour, cut to size, installed by a licensed glazier. Grout-free. Get a transparent quote.',
  path: '/glass-splashbacks/',
})

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const serviceSchema = buildServiceSchema({
  name: 'Glass Splashback Installation Melbourne',
  description:
    'Custom toughened glass splashbacks for kitchens and bathrooms across Melbourne. Any colour, cut to size, installed by a licensed glazier.',
  url: `${siteConfig.domain}/glass-splashbacks/`,
  priceRange: 'From $350/m²',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Glass Splashbacks', href: '/glass-splashbacks/' },
])

// ── FAQ data (must be defined before faqSchema) ───────────────────────────────

const splashbackFaq = [
  {
    q: 'How much does a glass splashback cost in Melbourne?',
    a: 'Glass splashbacks start from around $350/m² supply and install for standard coloured toughened glass. Digital print, low-iron glass, or special finishes cost more. Use our Instant Estimate Tool for a transparent itemised quote based on your dimensions — no site visit needed.',
  },
  {
    q: 'Can glass splashbacks be used behind a gas cooktop?',
    a: 'Yes, with the correct glass specification. Australian Standard AS/NZS 4666 sets minimum distances between the cooktop and the glass. We assess each job and specify heat-resistant toughened glass where required. We will not install glass that does not meet the code.',
  },
  {
    q: 'What colours are available?',
    a: 'Any colour. We can back-paint to any Dulux or custom colour, or digitally print a pattern or image onto the glass. If you can describe it or provide a colour code, we can match it.',
  },
  {
    q: 'How is the glass fixed to the wall?',
    a: 'Panels are bonded to the wall surface with a high-strength silicone adhesive system. The method is clean, invisible from the front, and creates a waterproof seal at wall junctions. No visible fixings.',
  },
  {
    q: 'Can I keep my existing tiles underneath the splashback?',
    a: 'Usually yes. We can install directly over existing tiles in most cases, which avoids the cost and mess of tile removal. We assess the substrate at measure stage and advise if direct-fix is suitable for your wall.',
  },
  {
    q: 'How long does installation take?',
    a: 'Glass is manufactured in 5–7 business days after measure confirmation. Installation itself takes 1–3 hours depending on panel count and cut-outs. The kitchen can be used again once the silicone has cured — typically 24 hours.',
  },
  {
    q: 'Do you cut around power points and outlets?',
    a: 'Yes. Cut-outs for power points, USB outlets, and rangehood brackets are included in the price. We take precise measurements at the site visit to ensure every cut-out aligns exactly.',
  },
  {
    q: 'Is glass splashback better than tiles?',
    a: 'For kitchens and wet areas, glass outperforms tiles on maintenance (no grout to clean or reseal), longevity (does not stain or fade), and design (seamless colour, no joints). The upfront cost is comparable to a quality tiling job once labour is included — and ongoing maintenance costs are near zero.',
  },
] as const

const faqSchema = buildFaqSchema(
  splashbackFaq.map(({ q, a }) => ({ question: q, answer: a }))
)

// ── Section data ──────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: Palette,
    heading: 'Any Colour, Matched Exactly',
    text: "Choose any Dulux or custom colour and we digitally print or back-paint the glass to match. A single uninterrupted panel means no grout lines breaking up your colour — just a clean, continuous surface.",
  },
  {
    icon: Sparkles,
    heading: 'Looks Better for Longer',
    text: 'Toughened glass does not stain, fade, or discolour. The surface your kitchen has on day one is the surface it has in ten years. Tiles and painted walls cannot make that claim.',
  },
  {
    icon: Droplets,
    heading: 'Easiest Surface to Clean',
    text: 'A single wipe with a damp cloth removes splatter, grease, and steam marks in seconds. No grout lines to scrub, no sealer to reapply, no mould to treat.',
  },
  {
    icon: Ruler,
    heading: 'Cut to Any Size or Shape',
    text: 'Every panel is manufactured to your exact dimensions — standard kitchen runs, around rangehoods, curved walls, or full bathroom wet areas. Cut-outs for power points included.',
  },
  {
    icon: ShieldCheck,
    heading: 'Toughened to Australian Standard',
    text: 'All splashbacks are toughened to AS/NZS 2208 and rated for use behind gas cooktops (where required). Heat-resistant and safe in the event of breakage.',
  },
  {
    icon: Tag,
    heading: 'Transparent Pricing',
    text: "Quote based on your dimensions before any site visit. From $350/m² — no surprises on the invoice. Cheaper than most tiling projects once labour and ongoing maintenance are included.",
  },
] as const

const metrics = [
  {
    label: 'Grout lines',
    before: 'Every 100–300 mm',
    after: 'Zero',
    note: 'Single uninterrupted glass panel',
  },
  {
    label: 'Cleaning time per week',
    before: '20–30 min',
    after: '1–2 min',
    note: 'One wipe vs scrubbing grout',
  },
  {
    label: 'Surface appearance after 5 years',
    before: 'Stained grout, faded tiles',
    after: 'Same as day one',
    note: 'Glass does not stain or discolour',
  },
  {
    label: 'Colour options',
    before: 'Limited tile range',
    after: 'Unlimited',
    note: 'Any Dulux colour or custom match',
  },
] as const

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GlassSplashbacksPage() {
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
        badge="Glass Splashbacks"
        headlineWhite="Any Colour."
        headlineYellow="Zero Grout."
        subtext="Custom toughened glass splashbacks for Melbourne kitchens and bathrooms. Cut to size, installed in hours. Transparent pricing."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: siteConfig.phoneHref }}
        imageSrc="/stock/splashback-2.webp"
        imageAlt="Custom coloured toughened glass splashback installed in a Melbourne kitchen"
      />

      <BenefitsGrid
        eyebrow="Glass Splashbacks"
        heading={"What You\nActually Get"}
        items={benefits}
      />

      <BeforeAfter
        heading="Tiles vs Glass"
        subheading="Why Melbourne kitchens are switching from tiled splashbacks to toughened glass."
        metrics={metrics}
      />

      <FAQ
        heading="Glass Splashback Questions"
        subheading="Everything you want to know before booking a measure."
        items={splashbackFaq}
      />

      <CtaBanner
        heading={"Get Your\nTransparent Quote"}
        subtext="Enter your dimensions and get an itemised price in 60 seconds. No site visit required. No sales call."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
