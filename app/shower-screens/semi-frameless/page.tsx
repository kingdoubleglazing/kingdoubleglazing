import type { Metadata } from 'next'
import { Check, X, Minus } from 'lucide-react'
import {
  Minimize2,
  Droplets,
  Sparkles,
  Ruler,
  ShieldCheck,
  Tag,
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
  title: 'Semi-Frameless Shower Screens Melbourne | Slim Frame, Toughened Glass | King',
  description:
    'Semi-frameless shower screens in Melbourne — 6–8 mm toughened safety glass, slim channel frame, custom cut and installed by a licensed glazier. Transparent pricing. Free measure.',
  path: '/shower-screens/semi-frameless/',
})

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const serviceSchema = buildServiceSchema({
  name: 'Semi-Frameless Shower Screen Installation Melbourne',
  description:
    '6–8 mm toughened semi-frameless shower screens, custom cut and installed across Melbourne by a licensed glazier.',
  url: `${siteConfig.domain}/shower-screens/semi-frameless/`,
  priceRange: 'From $700',
})

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Shower Screens', href: '/shower-screens/' },
  { name: 'Semi-Frameless', href: '/shower-screens/semi-frameless/' },
])

const faqSchema = buildFaqSchema(
  showerScreensFaq.map(({ q, a }) => ({ question: q, answer: a }))
)

// ── Section data ──────────────────────────────────────────────────────────────

const benefits = [
  {
    icon: Minimize2,
    heading: 'Slim Frame, Minimal Look',
    text: 'A narrow aluminium channel along the top and sides keeps the screen rigid without the visual bulk of a full frame. The glass is the feature — not the hardware.',
  },
  {
    icon: Sparkles,
    heading: '6–8 mm Toughened Safety Glass',
    text: 'AS/NZS 2208-compliant toughened glass — certifiably safe, strong, and clear. Thicker and tougher than the 3–4 mm found in standard framed screens.',
  },
  {
    icon: Droplets,
    heading: 'Much Easier to Clean Than Framed',
    text: 'The slim channel has far fewer crevices than a full frame. No bottom track to trap soap scum. A weekly wipe keeps it looking new.',
  },
  {
    icon: Ruler,
    heading: 'Tolerates Out-of-Square Walls',
    text: 'The channel frame adjusts to minor wall irregularities that would require expensive remediation before a frameless screen could be fitted. Ideal for older Melbourne bathrooms.',
  },
  {
    icon: ShieldCheck,
    heading: 'Guaranteed Leak-Free',
    text: 'Full-height door seals and correctly siliconed base channels prevent leaks. We guarantee our installations in writing — same standard as our frameless work.',
  },
  {
    icon: Tag,
    heading: 'Great Value Without Compromise',
    text: 'Semi-frameless gives you toughened glass and a clean look at a lower price point than fully frameless. No hidden costs — the quoted price is the invoice price.',
  },
] as const

const metrics = [
  {
    label: 'Visible aluminium framing',
    before: 'Full surround + bottom track',
    after: 'Slim top & side channel only',
    note: 'No bottom track to harbour grime',
  },
  {
    label: 'Glass thickness',
    before: '3–4 mm',
    after: '6–8 mm',
    note: 'AS/NZS 2208 toughened safety glass',
  },
  {
    label: 'Wall tolerance',
    before: 'Rigidly square only',
    after: 'Minor variation covered',
    note: 'Channel adjusts to slight out-of-square',
  },
  {
    label: 'Cleaning effort',
    before: 'High — full frame + track',
    after: 'Low — minimal crevices',
    note: 'Far fewer joints than full-frame screens',
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
  semiFrameless: Cell
  frameless: Cell
  framed: Cell
}

const compRows: CompRow[] = [
  {
    feature: 'Glass thickness',
    semiFrameless: { type: 'highlight', value: '6–8 mm' },
    frameless:     { type: 'text',      value: '10 mm' },
    framed:        { type: 'text',      value: '3–4 mm' },
  },
  {
    feature: 'Typical installed price',
    semiFrameless: { type: 'highlight', value: 'From $700' },
    frameless:     { type: 'text',      value: 'From $900' },
    framed:        { type: 'text',      value: 'From $450' },
  },
  {
    feature: 'Visible frame',
    semiFrameless: { type: 'highlight', value: 'Slim channel' },
    frameless:     { type: 'text',      value: 'None' },
    framed:        { type: 'text',      value: 'Full surround' },
  },
  {
    feature: 'Tolerates uneven walls',
    semiFrameless: { type: 'check' },
    frameless:     { type: 'cross' },
    framed:        { type: 'check' },
  },
  {
    feature: 'Ease of cleaning',
    semiFrameless: { type: 'highlight', value: 'Good' },
    frameless:     { type: 'text',      value: 'Excellent' },
    framed:        { type: 'text',      value: 'Poor' },
  },
  {
    feature: 'Safety glass standard',
    semiFrameless: { type: 'check' },
    frameless:     { type: 'check' },
    framed:        { type: 'dash' },
  },
  {
    feature: 'Custom sizes included',
    semiFrameless: { type: 'check' },
    frameless:     { type: 'check' },
    framed:        { type: 'dash' },
  },
  {
    feature: 'Written installation warranty',
    semiFrameless: { type: 'check' },
    frameless:     { type: 'check' },
    framed:        { type: 'cross' },
  },
]

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SemiFramelessShowerScreensPage() {
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
        badge="Semi-Frameless Shower Screens"
        headlineWhite="Slim Frame."
        headlineYellow="Toughened Glass."
        subtext="6–8 mm safety glass, slim channel frame, custom cut to your recess. Licensed glazier. Transparent pricing."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: siteConfig.phoneHref }}
        imageSrc="/hero-main.webp"
        imageAlt="Semi-frameless toughened glass shower screen installed in a Melbourne bathroom"
      />

      <BenefitsGrid
        eyebrow="Semi-Frameless Screens"
        heading={"What You\nActually Get"}
        items={benefits}
      />

      <BeforeAfter
        heading="Framed vs Semi-Frameless"
        subheading="What changes when a dated full-frame screen is replaced with slim-channel toughened glass."
        metrics={metrics}
      />

      {/* Comparison table — semi-frameless vs frameless vs framed */}
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
              Semi-frameless is the practical mid-range choice — toughened glass, cleaner finish than framed, lower cost than fully frameless.
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
                  {/* Semi-Frameless — highlighted */}
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
                      Semi-Frameless
                    </span>
                  </th>
                  <th
                    scope="col"
                    className="bg-surface-container text-center font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-surface/50 px-6 py-4 ghost-border min-w-40"
                  >
                    Frameless
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
                      <CompCell value={row.semiFrameless} isKing />
                    </td>
                    <td className="text-center px-6 py-4 ghost-border">
                      <CompCell value={row.frameless} />
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
        heading="Semi-Frameless Shower Screen Questions"
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
