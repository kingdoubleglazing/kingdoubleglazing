import type { Metadata } from 'next'
import { Check, X, Minus } from 'lucide-react'
import {
  Minimize2,
  Droplets,
  Sparkles,
  Ruler,
  ShieldCheck,
  Tag,
  MapPin,
  Zap,
  Crown,
} from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { HeroSection } from '@/components/sections/HeroSection'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { BeforeAfter } from '@/components/sections/BeforeAfter'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { showerScreensFaq } from '@/data/shower-screens-faq'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Frameless Shower Screens Melbourne | 10mm Toughened Glass | King',
  description:
    'Frameless shower screens in Melbourne — 10 mm toughened safety glass, cut to measure, installed in hours by a licensed glazier. Transparent pricing. Free measure & quote.',
  path: '/shower-screens/frameless/',
})

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const serviceSchema = buildServiceSchema({
  name: 'Frameless Shower Screen Installation Melbourne',
  description:
    '10 mm toughened frameless shower screens, custom cut and installed across Melbourne by a licensed glazier.',
  url: `${siteConfig.domain}/shower-screens/frameless/`,
  priceRange: 'From $900',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Shower Screens', href: '/shower-screens/' },
  { name: 'Frameless', href: '/shower-screens/frameless/' },
])

const faqSchema = buildFaqSchema(
  showerScreensFaq.map(({ q, a }) => ({ question: q, answer: a }))
)

// ── Section data ──────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: Minimize2,
    heading: 'Zero Visible Framing',
    text: 'Nothing but glass and minimal hinges. No aluminium border, no bulk — the screen disappears into the bathroom and makes the space feel larger and more expensive.',
  },
  {
    icon: Sparkles,
    heading: '10 mm Toughened Safety Glass',
    text: 'AS/NZS 2208-compliant toughened glass. Thick, rigid, and safe — it deflects and holds its shape under impact rather than shattering into shards.',
  },
  {
    icon: Droplets,
    heading: 'Easiest Screen to Keep Clean',
    text: 'No frame channels, no grouting lines, no metal tracks to harbour soap scum. A daily squeegee and diluted vinegar rinse is all it takes to keep the glass spotless.',
  },
  {
    icon: Ruler,
    heading: 'Custom Cut to Your Recess',
    text: "Every panel is manufactured to your exact measurements — standard alcoves, return panels, walk-in configurations, sloped ceilings. Custom sizing costs nothing extra.",
  },
  {
    icon: ShieldCheck,
    heading: 'Guaranteed Leak-Free',
    text: 'Full-height door seals, correctly siliconed base channels, and precise panel alignment prevent leaks. We guarantee the installation in writing.',
  },
  {
    icon: Tag,
    heading: 'Transparent Quote Before You Commit',
    text: 'Get an itemised price from our Instant Estimate Tool before anyone visits your home. The price we quote is the price on the invoice — no extras on the day.',
  },
] as const

const metrics = [
  {
    label: 'Visible aluminium framing',
    before: 'Full surround',
    after: 'None',
    note: 'Hinges and handle only',
  },
  {
    label: 'Glass thickness',
    before: '3–4 mm',
    after: '10 mm',
    note: 'AS/NZS 2208 safety standard',
  },
  {
    label: 'Cleaning time per week',
    before: '15–20 min',
    after: '2–3 min',
    note: 'No tracks or joints to scrub',
  },
  {
    label: 'Perceived bathroom size',
    before: 'Reduced',
    after: 'Maximised',
    note: 'Uninterrupted sightlines',
  },
] as const

// ── Comparison table data ─────────────────────────────────────────────────────

type Cell =
  | { type: 'check' }
  | { type: 'cross' }
  | { type: 'dash' }
  | { type: 'highlight'; value: string }
  | { type: 'text'; value: string }

interface CompRow {
  feature: string
  frameless: Cell
  semiFrameless: Cell
  framed: Cell
}

const compRows: CompRow[] = [
  {
    feature: 'Glass thickness',
    frameless:      { type: 'highlight', value: '10 mm' },
    semiFrameless:  { type: 'text',      value: '6–8 mm' },
    framed:         { type: 'text',      value: '3–4 mm' },
  },
  {
    feature: 'Typical installed price',
    frameless:      { type: 'highlight', value: 'From $900' },
    semiFrameless:  { type: 'text',      value: 'From $700' },
    framed:         { type: 'text',      value: 'From $450' },
  },
  {
    feature: 'Visible frame',
    frameless:      { type: 'highlight', value: 'None' },
    semiFrameless:  { type: 'text',      value: 'Slim channel' },
    framed:         { type: 'text',      value: 'Full surround' },
  },
  {
    feature: 'Tolerates uneven walls',
    frameless:      { type: 'cross' },
    semiFrameless:  { type: 'check' },
    framed:         { type: 'check' },
  },
  {
    feature: 'Ease of cleaning',
    frameless:      { type: 'highlight', value: 'Excellent' },
    semiFrameless:  { type: 'text',      value: 'Good' },
    framed:         { type: 'text',      value: 'Poor' },
  },
  {
    feature: 'Safety glass standard',
    frameless:      { type: 'check' },
    semiFrameless:  { type: 'check' },
    framed:         { type: 'dash' },
  },
  {
    feature: 'Custom sizes included',
    frameless:      { type: 'check' },
    semiFrameless:  { type: 'check' },
    framed:         { type: 'dash' },
  },
  {
    feature: 'Written installation warranty',
    frameless:      { type: 'check' },
    semiFrameless:  { type: 'check' },
    framed:         { type: 'cross' },
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function FramelessShowerScreensPage() {
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
        badge="Frameless Shower Screens"
        headlineWhite="No Frame."
        headlineYellow="No Compromise."
        subtext="10 mm toughened safety glass, cut to your exact recess, installed in hours. Licensed glazier. Transparent pricing."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: siteConfig.phoneHref }}
        imageSrc="/stock/shower-pane-1000x667-1.webp"
        imageAlt="Frameless 10 mm toughened glass shower screen in a Melbourne bathroom"
      />

      <BenefitsGrid
        eyebrow="Frameless Screens"
        heading={"What You\nActually Get"}
        items={benefits}
      />

      <BeforeAfter
        heading="Framed vs Frameless"
        subheading="What changes when your old framed screen is replaced with 10 mm frameless glass."
        metrics={metrics}
      />

      {/* Comparison table — frameless vs semi-frameless vs framed */}
      <section
        className="bg-surface-container-low py-16 md:py-24"
        aria-labelledby="comparison-heading"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12 md:mb-16">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Your Options
            </p>
            <h2
              id="comparison-heading"
              className="font-display uppercase leading-[0.88] text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              How We Compare
            </h2>
            <p className="font-sans text-base text-on-surface/55 mt-4 max-w-xl leading-relaxed">
              Frameless is the premium finish. Semi-frameless suits tighter budgets or out-of-square walls. Framed is entry-level only.
            </p>
          </div>

          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full min-w-150 ghost-border border-collapse">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="bg-surface-container text-left font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-surface/40 px-6 py-4 ghost-border"
                  >
                    Feature
                  </th>
                  {/* Frameless — highlighted */}
                  <th
                    scope="col"
                    className="bg-primary-container text-center px-6 py-4 ghost-border min-w-40"
                  >
                    <span className="font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/60 block mb-1">
                      King
                    </span>
                    <span
                      className="font-display uppercase text-on-primary-fixed leading-none block"
                      style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                    >
                      Frameless
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-container text-center font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-surface/50 px-6 py-4 ghost-border min-w-40"
                  >
                    Semi-<br />Frameless
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-container text-center font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-surface/50 px-6 py-4 ghost-border min-w-35"
                  >
                    Framed
                  </th>
                </tr>
              </thead>
              <tbody>
                {compRows.map((row, i) => (
                  <tr
                    key={row.feature}
                    className={i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'}
                  >
                    <td className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface px-6 py-4 ghost-border">
                      {row.feature}
                    </td>
                    <td className="bg-primary-container/10 text-center px-6 py-4 ghost-border border-l-2 border-primary-container">
                      <CompCell value={row.frameless} isKing />
                    </td>
                    <td className="text-center px-6 py-4 ghost-border">
                      <CompCell value={row.semiFrameless} />
                    </td>
                    <td className="text-center px-6 py-4 ghost-border">
                      <CompCell value={row.framed} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-on-surface/35">
            * Prices are indicative. King prices guaranteed at time of written quote.
          </p>
        </div>
      </section>

      <FAQ
        heading="Frameless Shower Screen Questions"
        subheading="Answers before you book a measure."
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

// ── Cell renderer ─────────────────────────────────────────────────────────────

function CompCell({ value, isKing = false }: { value: Cell; isKing?: boolean }) {
  if (value.type === 'check') {
    return (
      <Check
        size={18}
        strokeWidth={2.5}
        aria-label="Yes"
        className={isKing ? 'text-primary mx-auto' : 'text-on-surface/60 mx-auto'}
      />
    )
  }
  if (value.type === 'cross') {
    return (
      <X
        size={18}
        strokeWidth={2.5}
        aria-label="No"
        className="text-on-surface/30 mx-auto"
      />
    )
  }
  if (value.type === 'dash') {
    return (
      <Minus
        size={18}
        strokeWidth={2}
        aria-label="Varies"
        className="text-on-surface/20 mx-auto"
      />
    )
  }
  if (value.type === 'highlight') {
    return (
      <span className="font-headline text-sm font-bold uppercase tracking-wide text-on-surface">
        {value.value}
      </span>
    )
  }
  return (
    <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface/50">
      {value.value}
    </span>
  )
}
