import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Droplets, Minimize2, Sparkles, Tag, ShieldCheck, Ruler } from 'lucide-react'
import { MapPin, Zap, Crown } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { testimonials } from '@/data/testimonials'
import { showerScreensFaq } from '@/data/shower-screens-faq'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Shower Screens Melbourne | Frameless & Semi-Frameless | King',
  description:
    'Custom shower screens in Melbourne — frameless and semi-frameless, cut to measure, installed in hours. Toughened safety glass from a licensed glazier. Get a transparent quote.',
  path: '/shower-screens/',
})

// ── JSON-LD schemas ──────────────────────────────────────────────────────────

const serviceSchema = buildServiceSchema({
  name: 'Shower Screen Installation Melbourne',
  description:
    'Custom frameless and semi-frameless shower screens in Melbourne. 10 mm toughened safety glass, cut to measure, installed by a licensed glazier.',
  url: `${siteConfig.domain}/shower-screens/`,
  priceRange: 'From $900',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Shower Screens', href: '/shower-screens/' },
])

const faqSchema = buildFaqSchema(
  showerScreensFaq.map(({ q, a }) => ({ question: q, answer: a }))
)

// ── Section data ─────────────────────────────────────────────────────────────

const trustItems = [
  { icon: MapPin,      label: 'Melbourne Owned' },
  { icon: ShieldCheck, label: 'Licensed Glazier' },
  { icon: Tag,         label: 'Transparent Pricing' },
  { icon: Crown,       label: 'Free Measure & Quote' },
  { icon: Zap,         label: 'Installed in Hours' },
]

const showerBenefits = [
  {
    icon: Minimize2,
    heading: 'Clean, Minimal Look',
    text: 'Frameless screens eliminate bulky aluminium framing. The result is a bathroom that feels larger, lighter, and noticeably more premium without an expensive renovation.',
  },
  {
    icon: Droplets,
    heading: 'Easy to Keep Clean',
    text: 'No metal tracks to scrub. A daily squeegee and occasional vinegar rinse keeps the glass spotless. Far less maintenance than framed alternatives.',
  },
  {
    icon: Sparkles,
    heading: '10 mm Toughened Safety Glass',
    text: 'Frameless screens use AS/NZS 2208-compliant 10 mm safety glass — thick, rigid, and certifiably safe. Semi-frameless configurations use 6–8 mm toughened glass.',
  },
  {
    icon: Ruler,
    heading: 'Cut to Any Dimension',
    text: 'Every screen is manufactured to your exact measurements. Sloped ceilings, non-standard alcoves, and return panels are all accommodated at no extra cost.',
  },
  {
    icon: ShieldCheck,
    heading: 'Leak-Free Installation',
    text: 'Full-height door seals and properly siliconed base channels eliminate leaks when installed correctly. We guarantee our installations in writing.',
  },
  {
    icon: Tag,
    heading: 'Transparent Pricing',
    text: 'No "call for price" and no surprise charges on the day. Use our Instant Estimate Tool to get an itemised price before anyone visits your home.',
  },
] as const

const showerSteps = [
  {
    title: 'Measure Online or On-Site',
    body: 'Enter your recess dimensions into our Instant Estimate Tool for a ballpark price, or book a free on-site measure. Complex layouts benefit from a site visit — it is free and obligation-free.',
  },
  {
    title: 'Choose Your Style',
    body: 'Select frameless or semi-frameless, door swing direction, panel configuration, and hardware finish. We walk you through the options — no pressure, no upsell.',
  },
  {
    title: 'Glass Manufactured',
    body: 'Your panels are precision-cut and toughened to your exact dimensions. Lead time is typically 5–7 business days. We confirm your installation date before manufacture begins.',
  },
  {
    title: 'Installed in Hours',
    body: 'A licensed King glazier fits the screen, seals the base, adjusts the door, and cleans up. Most installations are complete in 2–3 hours. Same-day use is possible once silicone has cured.',
  },
] as const

const showerMetrics = [
  {
    label: 'Metal frame visible',
    before: 'Full surround',
    after: 'None',
    note: 'Frameless uses minimal hinges & handle only',
  },
  {
    label: 'Glass thickness',
    before: '4 mm',
    after: '10 mm',
    note: 'Toughened to AS/NZS 2208 safety standard',
  },
  {
    label: 'Cleaning effort',
    before: 'High',
    after: 'Low',
    note: 'No tracks or frame joints to scrub',
  },
  {
    label: 'Installation time',
    before: 'Multi-day',
    after: '2–3 hrs',
    note: 'No retiling required for most configurations',
  },
] as const

const serviceCards = [
  {
    href: '/shower-screens/frameless/',
    label: 'Frameless',
    heading: 'Frameless Shower Screens',
    description:
      '10 mm toughened safety glass, minimal hardware, zero visible framing. The premium choice for contemporary and reno bathrooms.',
    detail: 'Most popular · From $900',
  },
  {
    href: '/shower-screens/semi-frameless/',
    label: 'Semi-Frameless',
    heading: 'Semi-Frameless Shower Screens',
    description:
      '6–8 mm toughened glass with a slim channel frame. Better tolerance for uneven walls — the cleanest mid-range option available.',
    detail: 'Great value · From $700',
  },
] as const

// ── Page ─────────────────────────────────────────────────────────────────────

export default function ShowerScreensPage() {
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
        badge="Custom Shower Screens"
        headlineWhite="Frameless Screens"
        headlineYellow="Cut to Measure"
        subtext="Toughened safety glass. Installed in hours. Transparent pricing before anyone visits your home."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: siteConfig.phoneHref }}
        imageSrc="/hero/hero-shower-screens.webp"
        imageAlt="Frameless shower screen installed in a Melbourne bathroom"
      />

      <TrustBar items={trustItems} />

      {/* Service Cards — hub links to sub-service pages */}
      <section
        className="bg-surface-container-lowest py-16 md:py-24"
        aria-labelledby="service-types-heading"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 md:mb-16">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Choose Your Style
            </p>
            <h2
              id="service-types-heading"
              className="font-display uppercase leading-none text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Two Options.
              <br />
              One Standard.
            </h2>
            <p className="font-sans text-base text-on-surface/55 mt-4 max-w-xl leading-relaxed">
              Both frameless and semi-frameless screens use toughened safety glass and come with a written installation warranty.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 ghost-border">
            {serviceCards.map((card, i) => (
              <Link
                key={card.href}
                href={card.href}
                aria-label={`Learn more about ${card.heading}`}
                className={`group relative flex flex-col ghost-border p-8 md:p-10 transition-colors duration-150 ${
                  i % 2 === 0
                    ? 'bg-surface hover:bg-surface-container-low'
                    : 'bg-surface-container-low hover:bg-surface-container'
                }`}
              >
                <span className="inline-block mb-6 self-start bg-primary-container px-3 py-1 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed">
                  {card.label}
                </span>

                <h3
                  className="font-display uppercase leading-none text-on-surface mb-4 group-hover:text-primary transition-colors duration-150"
                  style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)' }}
                >
                  {card.heading}
                </h3>

                <p className="font-sans text-base text-on-surface/60 leading-relaxed flex-1 mb-6">
                  {card.description}
                </p>

                <div className="flex items-center justify-between mt-auto">
                  <span className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                    {card.detail}
                  </span>
                  <ArrowRight
                    size={20}
                    aria-hidden="true"
                    className="text-on-surface/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-150"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BenefitsGrid
        eyebrow="Why Frameless Glass"
        heading={"What You\nActually Get"}
        items={showerBenefits}
      />

      <ProcessSteps
        heading="How It Works"
        subheading="From measuring your recess to stepping in for the first time."
        cta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        steps={showerSteps}
      />

      <BeforeAfter
        heading="Old Screen vs New"
        subheading="What changes when you replace a dated framed screen with toughened frameless glass."
        metrics={showerMetrics}
      />

      <Testimonials
        heading={"Melbourne Homes.\nReal Feedback."}
        subheading="Verified reviews from King Double Glazing customers."
        items={testimonials}
      />

      <FAQ
        heading="Shower Screen Questions"
        subheading="Everything you want to know before booking a measure."
        items={showerScreensFaq}
      />

      <CtaBanner
        heading={"Get Your\nTransparent Quote"}
        subtext="Enter your recess dimensions and get an itemised price in 60 seconds. No site visit required. No sales call."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
