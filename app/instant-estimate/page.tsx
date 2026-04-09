import type { Metadata } from 'next'
import { Suspense } from 'react'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { TrustBar } from '@/components/sections/TrustBar'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { EstimateForm } from '@/components/sections/EstimateForm'
import { GlassPickerGuide } from '@/components/sections/GlassPickerGuide'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { estimateFaq, estimateProcessSteps } from '@/data/estimate-faq'
import { siteConfig } from '@/data/site'
import { Calculator, Eye, ShieldCheck, PhoneOff, Clock } from 'lucide-react'

// ── Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: 'Instant Double Glazing Estimate Melbourne | See Your Price First',
  description:
    'Get an instant double glazing estimate in 60 seconds. Accurate within 10%. No email required to see your number. Real pricing from $495/m² — no gating, no sales theatre.',
  path: '/instant-estimate/',
})

// ── JSON-LD schemas ─────────────────────────────────────────────
const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'King Double Glazing Instant Estimate Tool',
  url: `${siteConfig.domain}/instant-estimate/`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
    description: 'Free instant double glazing estimate — no email required',
  },
  provider: {
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: siteConfig.phoneTel,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: estimateFaq.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

// ── Trust bar items (estimate-specific) ────────────────────────
const estimateTrustItems = [
  { icon: Calculator,  label: 'Accurate within ±10%'     },
  { icon: Eye,         label: 'See your price first'     },
  { icon: PhoneOff,    label: 'No sales calls'           },
  { icon: ShieldCheck, label: '10-Year Warranty'         },
  { icon: Clock,       label: 'Result in 90 seconds'     },
]

// ── Page ────────────────────────────────────────────────────────
export default function InstantEstimatePage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Compact hero — tool is the star ── */}
      <section className="bg-primary-container py-16 md:py-20 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-4 -right-6 font-display uppercase leading-none text-on-primary-fixed/6"
          style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
          aria-hidden="true"
        >
          PRICE
        </span>
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-5 max-w-3xl">
            {/* Eyebrow badge */}
            <span className="inline-block w-fit bg-on-primary-fixed text-primary-container font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1">
              Instant Estimate Tool
            </span>

            {/* H1 */}
            <h1
              className="font-display uppercase leading-none text-on-primary-fixed"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
            >
              See Your Price
              <br />
              <span className="bg-on-primary-fixed text-primary-container px-2 inline-block leading-tight">Before You Call</span>
            </h1>

            {/* Value prop */}
            <p className="font-sans text-base text-on-primary-fixed/70 max-w-lg leading-relaxed">
              Accurate within 10%. No email required to see your number. Most
              lead-capture tools gate the value behind a form — we don&apos;t.
            </p>

            {/* Trust chips */}
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              {[
                'Accurate within ±10%',
                'No email required',
                'Takes 90 seconds',
                'From $495/m²',
              ].map(item => (
                <li
                  key={item}
                  className="font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed"
                >
                  ✓ {item}
                </li>
              ))}
            </ul>

            {/* Jump CTA */}
            <div className="flex flex-col sm:flex-row gap-3 mt-3">
              <a
                href="#calculator"
                className="inline-flex items-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-primary-fixed/80 transition-colors duration-150 w-fit"
              >
                Get My Estimate
                <span aria-hidden="true">↓</span>
              </a>
              <Link
                href="/double-glazing/cost/"
                className="inline-flex items-center gap-3 bg-transparent text-on-primary-fixed/70 font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-on-primary-fixed/30 hover:bg-on-primary-fixed/10 transition-colors duration-150 w-fit"
              >
                Cost guide instead
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust bar ── */}
      <TrustBar items={estimateTrustItems} />

      {/* ── How it works ── */}
      <ProcessSteps
        heading="How It Works"
        subheading="Three steps. Under 2 minutes. No obligation at any stage."
        steps={estimateProcessSteps}
        cta={{ label: 'Jump to calculator', href: '#calculator' }}
      />

      {/* ── Glass picker guide ── */}
      <GlassPickerGuide />

      {/* ── The calculator ── */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section heading */}
          <div className="mb-10 md:mb-14 max-w-xl">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              The Tool
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Your Instant
              <br />
              <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">Double Glazing Estimate</span>
            </h2>
          </div>

          {/* EstimateForm — wrapped in Suspense because it uses useSearchParams */}
          <Suspense fallback={<div className="bg-surface-container ghost-border p-12 max-w-3xl mx-auto font-headline text-sm uppercase tracking-widest text-on-surface/40">Loading calculator…</div>}>
            <EstimateForm />
          </Suspense>

          {/* Reassurance footnote */}
          <p className="mt-8 max-w-3xl mx-auto text-center font-sans text-xs text-on-surface/35 leading-relaxed">
            Estimate is indicative only. Free on-site measure confirms exact dimensions and final price before any work begins.
            See{' '}
            <Link href="/double-glazing/cost/" className="underline hover:text-on-surface/60 transition-colors">
              cost guide
            </Link>{' '}
            and{' '}
            <Link href="/double-glazing/glass-types/" className="underline hover:text-on-surface/60 transition-colors">
              glass types
            </Link>{' '}
            for more detail.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <FAQ
        heading="Estimate FAQ"
        subheading="Common questions about the tool and how it works."
        items={estimateFaq}
      />

      {/* ── Soft CTA ── */}
      <CtaBanner
        heading={"Ready for the\nFormal Quote?"}
        subtext="Once you have an estimate you're happy with, book a free on-site assessment. A King technician measures precisely and issues a contractual quote — price locked, no surprises."
        primaryCta={{ label: 'Book Free Assessment', href: '/contact/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
