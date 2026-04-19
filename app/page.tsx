import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { ComparisonTable } from '@/components/sections/ComparisonTable'
import { WhyRetrofit } from '@/components/sections/WhyRetrofit'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { PaymentTerms } from '@/components/PaymentTerms'
import { AdaptorDisclosure } from '@/components/AdaptorDisclosure'
import { homepageFaq } from '@/data/homepage-faq'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: `Stop Overpaying for Double Glazing Melbourne | ${siteConfig.pricing.retrofitFromDisplay} | King Double Glazing`,
  description:
    "We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer. Half the price of full replacement. We beat any genuine quote by 30%.",
  path: '/',
})

const homePageSchema = buildWebPageSchema({
  url: `${BASE_URL}/`,
  name: `Stop Overpaying for Double Glazing Melbourne | ${siteConfig.pricing.retrofitFromDisplay} | King Double Glazing`,
  description: 'We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer. Half the price of full replacement. We beat any genuine quote by 30%.',
  breadcrumb: [{ name: 'Home', url: `${BASE_URL}/` }],
})

export default function HomePage() {
  return (
    <>
      <SchemaScript schemas={[homePageSchema]} />
      {/* 1. Hero */}
      <HeroSection
        badge="Stop. Don't Overpay. · 10-Year Warranty · Beat Any Quote 30%"
        headlineWhite="Quieter Home. Lower Bills."
        headlineYellow="Without Replacing Your Windows."
        subtext="We add a second layer of glass to the windows you already have — no ripping them out, no scaffolding, no mess. Your home gets up to 70% quieter and up to 50% warmer, at half the cost of full window replacement. It works on timber, aluminium, and steel frames."
        filterMessage="Price yourself online first. Call us when you'd like to proceed — not before."
        primaryCta={{ label: 'Get My Instant Price →', href: '/instant-estimate/' }}
        secondaryCta={{ label: `Or call ${siteConfig.phone}`, href: siteConfig.phoneHref }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Double glazing upgrade on an existing window in a Melbourne home"
        showWarrantyBadge
      />

      {/* 2. Trust bar */}
      <TrustBar />

      {/* 3. Problem framing */}
      <ProblemAnchorStrip />

      {/* 4. The proof — comparison table */}
      <ComparisonTable />

      {/* 5. Why retrofit — 6 best reasons (merged grid) */}
      <WhyRetrofit />

      {/* D2.1: Adaptor disclosure — after WhyRetrofit */}
      <AdaptorDisclosure />

      {/* 6. How it works — 3 steps */}
      <ProcessSteps />

      {/* C2: Payment terms — after 3-step process, before final CTA */}
      <PaymentTerms />

      {/* 7. Big CTA — the 60-second estimate push */}
      <EstimateCTABlock />

      {/* 8. Social proof */}
      <Testimonials />

      {/* 9. FAQ */}
      <FAQ
        heading="Common Questions"
        subheading="Everything Melbourne homeowners ask before booking."
        items={homepageFaq}
      />

      {/* 10. What else we do — mini-strip */}
      <WhatElseStrip />

      {/* 11. Emergency strip */}
      <EmergencyStrip />
    </>
  )
}

// ── Problem/fix anchor strip ─────────────────────────────────────────────────

function ProblemAnchorStrip() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <span
          className="font-display leading-none text-primary block mb-2"
          style={{ fontSize: 'clamp(4rem, 8vw, 6rem)' }}
          aria-hidden="true"
        >
          &ldquo;
        </span>
        <p className="font-sans text-lg md:text-xl text-on-surface/60 leading-relaxed mb-5">
          If your windows are just one layer of glass, they leak heat, let traffic noise in, and full replacement costs $15,000+.
        </p>
        <p className="font-sans text-lg md:text-xl text-on-surface leading-relaxed">
          We add a second layer of glass to the windows you already have —{' '}
          up to <span className="text-primary font-semibold">70% quieter</span>,{' '}
          up to <span className="text-primary font-semibold">50% warmer</span>,{' '}
          a fraction of the price.
        </p>
      </div>
    </section>
  )
}

// ── Estimate CTA block ───────────────────────────────────────────────────────

function EstimateCTABlock() {
  return (
    <section className="bg-primary-container py-16 md:py-20 overflow-hidden relative">
      <span
        className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display uppercase leading-none text-on-primary-fixed/6"
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
          3 quick questions · Takes 60 seconds · See your range instantly
        </p>
      </div>
    </section>
  )
}

// ── What else we do mini-strip ───────────────────────────────────────────────

function WhatElseStrip() {
  const services = [
    { label: 'Emergency repairs',  href: '/services/#emergency' },
    { label: 'Shower screens',     href: '/services/#shower-screens' },
    { label: 'Splashbacks',        href: '/services/#splashbacks' },
    { label: 'Custom mirrors',     href: '/services/#mirrors' },
    { label: 'Commercial glazing', href: '/services/#commercial' },
  ]

  return (
    <section className="bg-surface-container-low py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              What Else We Do
            </p>
            <h2 className="font-headline text-lg md:text-xl font-semibold uppercase tracking-wide text-on-surface">
              We&apos;re glaziers. We do the lot.
            </h2>
          </div>
          <Link
            href="/services/"
            className="inline-flex items-center gap-2 bg-on-surface text-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-150 shrink-0"
          >
            See All Services →
          </Link>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {services.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-sans text-base text-on-surface/80 hover:text-primary underline underline-offset-4 decoration-on-surface/20 hover:decoration-primary"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

// ── Emergency strip ──────────────────────────────────────────────────────────

function EmergencyStrip() {
  return (
    <section className="bg-danger py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-sm text-white/90 leading-relaxed">
          <strong className="text-white">Broken window right now?</strong>{' '}
          We do emergency glass repair across Melbourne.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <Link
            href="/services/#emergency"
            className="font-headline text-sm font-semibold uppercase tracking-wide text-white/70 hover:text-white transition-colors duration-150 underline underline-offset-4"
          >
            See emergency services →
          </Link>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150"
          >
            <Phone size={15} aria-hidden="true" />
            Call {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
