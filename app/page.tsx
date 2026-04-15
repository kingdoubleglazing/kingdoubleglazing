import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FounderStory } from '@/components/sections/FounderStory'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { homepageFaq } from '@/data/homepage-faq'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: "Stop Overpaying for Double Glazing Melbourne | From $595/m² | King Double Glazing",
  description:
    "We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer. Half the price of full replacement. We beat any genuine quote by 30%.",
  path: '/',
})

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        badge="Stop. Don't Overpay."
        headlineWhite="Stop Overpaying for"
        headlineYellow="Double Glazing."
        subtext="We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer in winter. Half the price of full replacement."
        primaryCta={{ label: 'Get My Instant Price →', href: '/instant-estimate/' }}
        secondaryCta={{ label: `Or call ${siteConfig.phone}`, href: siteConfig.phoneHref }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Retrofit double glazing installation — existing timber window being upgraded"
        showWarrantyBadge
      />

      {/* 2. Trust bar */}
      <TrustBar />

      {/* 3. Problem + Fix combined */}
      <ProblemFixSection />

      {/* 5. Comparison table — the centrepiece */}
      <ComparisonTable />

      {/* 6. Why us — 6 benefit cards */}
      <BenefitsGrid />

      {/* 7. Instant Estimate CTA block */}
      <EstimateCTABlock />

      {/* 8. Process — 3 steps */}
      <ProcessSteps />

      {/* 9. Founder story strip */}
      <FounderStory />

      {/* 10. Testimonials */}
      <Testimonials />

      {/* 11. Upload your quote — secondary conversion */}
      <UploadQuoteSection />

      {/* 12. FAQ — 5 questions */}
      <FAQ
        heading="Common Questions"
        subheading="Everything Melbourne homeowners ask before booking."
        items={homepageFaq}
      />

      {/* 13. Final CTA block */}
      <CtaBanner
        heading={"Ready to Stop\nOverpaying?"}
        subtext="Get your free estimate in 60 seconds. No email needed to see your number."
        primaryCta={{ label: 'Start My Free Estimate →', href: '/instant-estimate/' }}
        secondaryCta={{ label: `Or call Tas: ${siteConfig.phone}`, href: siteConfig.phoneHref }}
      />

      {/* 14. Emergency strip */}
      <EmergencyStrip />
    </>
  )
}

// ── Fix section ──────────────────────────────────────────────────────────────

// ── Combined Problem + Fix section ──────────────────────────────────────────

const problemFixRows = [
  {
    problem: { label: 'Loud.', detail: 'Traffic, trams, neighbours — standard glass lets it all in.' },
    fix:     { label: 'Up to 70% quieter.', detail: 'Acoustic laminated glass cuts noise at the source.' },
  },
  {
    problem: { label: 'Cold in winter, hot in summer.', detail: 'Up to 40% of your heating escapes through old windows.' },
    fix:     { label: 'Up to 50% warmer.', detail: 'Low-E glass keeps heat in winter and blocks it in summer.' },
  },
  {
    problem: { label: 'Expensive to fix.', detail: 'Full window replacement costs $15,000+.' },
    fix:     { label: 'From $595/m². Done in a day.', detail: 'Keep your frames. We replace the glass only.' },
  },
]

function ProblemFixSection() {
  return (
    <section className="bg-surface py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* column headers — desktop only */}
        <div className="hidden md:grid md:grid-cols-2 gap-0 mb-6 border-b border-on-surface/10 pb-4">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/80 pl-7">
            The Problem
          </p>
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary pl-7">
            The Fix
          </p>
        </div>

        <div className="divide-y divide-on-surface/10">
          {problemFixRows.map(({ problem, fix }, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-2">
              {/* Problem */}
              <div className="p-5 md:p-7 border-r-0 md:border-r border-on-surface/10">
                <p className="font-headline text-sm md:text-base font-semibold uppercase tracking-wide text-on-surface/70 mb-1">
                  {problem.label}
                </p>
                <p className="font-sans text-xs md:text-sm text-on-surface/60 leading-relaxed hidden md:block">
                  {problem.detail}
                </p>
              </div>
              {/* Fix */}
              <div className="px-5 pb-5 pt-0 md:p-7 bg-surface-container-low md:bg-surface">
                <p className="font-headline text-sm md:text-base font-semibold uppercase tracking-wide text-on-surface mb-1">
                  {fix.label}
                </p>
                <p className="font-sans text-xs md:text-sm text-on-surface/75 leading-relaxed hidden md:block">
                  {fix.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Estimate CTA block ───────────────────────────────────────────────────────

function EstimateCTABlock() {
  return (
    <section className="bg-primary-container py-16 md:py-20 overflow-hidden relative">
      <span
        className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display uppercase leading-none text-on-primary-fixed/[0.06]"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
        aria-hidden="true"
      >
        PRICE
      </span>
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <h2
          className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-4"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          Get Your Price in 60 Seconds.
          <br />
          <span className="text-on-primary-fixed/60">No Email Needed to See Your Number.</span>
        </h2>
        <p className="font-sans text-base text-on-primary-fixed/70 mb-8 max-w-lg mx-auto leading-relaxed">
          We&apos;ll beat any genuine quote by 30%. That&apos;s a promise in writing.
        </p>
        <Link
          href="/instant-estimate/"
          className="inline-flex items-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-10 py-5 hover:bg-on-primary-fixed/80 transition-colors duration-150"
        >
          Start My Free Estimate →
        </Link>
        <p className="mt-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed/50">
          4 quick questions · Takes 60 seconds · See your range instantly
        </p>
      </div>
    </section>
  )
}

// ── Upload your quote section ────────────────────────────────────────────────

function UploadQuoteSection() {
  return (
    <section className="bg-inverse-surface py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="font-display uppercase leading-[0.88] text-inverse-on-surface mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Already Got a Quote?
              <br />
              <span className="text-primary-container">Upload It. We&apos;ll Beat It by 30%.</span>
            </h2>
            <p className="font-sans text-base text-inverse-on-surface/85 leading-relaxed max-w-md mb-8">
              Send us your competitor&apos;s quote. If it&apos;s genuine, we&apos;ll come in 30% cheaper —
              guaranteed in writing, with the same 10-year warranty.
            </p>
          </div>
          <div className="bg-surface p-8">
            <form className="flex flex-col gap-5" action="/contact/" method="GET">
              <input
                type="text"
                placeholder="Your name"
                className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
              />
              <input
                type="tel"
                placeholder="Phone number"
                className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
              />
              <input
                type="email"
                placeholder="Email address"
                className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
              />
              <p className="font-sans text-xs text-on-surface/80 -mt-2">
                Upload your quote via the contact form — we&apos;ll respond within one business day.
              </p>
              <Link
                href="/contact/"
                className="w-full inline-flex items-center justify-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150"
              >
                Send My Quote — Get My 30% Beat →
              </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Emergency strip ──────────────────────────────────────────────────────────

function EmergencyStrip() {
  return (
    <section className="bg-inverse-surface border-t border-white/10 py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-sm text-inverse-on-surface/85 leading-relaxed">
          <strong className="text-inverse-on-surface">Broken window right now?</strong>{' '}
          We do emergency glass repair across Melbourne.
        </p>
        <a
          href={siteConfig.phoneHref}
          className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-wide text-primary-container hover:text-primary-fixed-dim transition-colors duration-150"
        >
          <Phone size={15} aria-hidden="true" />
          Call {siteConfig.phone}
        </a>
      </div>
    </section>
  )
}
