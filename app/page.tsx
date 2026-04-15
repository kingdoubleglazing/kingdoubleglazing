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
import { WhyRetrofit } from '@/components/sections/WhyRetrofit'
import { GlassComparisonTable } from '@/components/sections/GlassComparisonTable'
import { ServicesSection } from '@/components/sections/ServicesSection'
import { homepageFaq } from '@/data/homepage-faq'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: `Stop Overpaying for Double Glazing Melbourne | ${siteConfig.pricing.retrofitFromDisplay} | King Double Glazing`,
  description:
    "We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer. Half the price of full replacement. We beat any genuine quote by 30%.",
  path: '/',
})

export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection
        badge="10-Year Warranty · Beat Any Quote 30%"
        headlineWhite="Stop Overpaying for"
        headlineYellow="Double Glazing."
        subtext="We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 50% warmer. Half the price of full replacement. Custom adaptors fit timber, aluminium, and steel frames."
        primaryCta={{ label: 'Get My Instant Price →', href: '/instant-estimate/' }}
        secondaryCta={{ label: `Or call ${siteConfig.phone}`, href: siteConfig.phoneHref }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Retrofit double glazing installation — existing timber window being upgraded"
        showWarrantyBadge
      />

      {/* 2. Trust bar */}
      <TrustBar />

      {/* 3. Problem/fix anchor strip */}
      <ProblemAnchorStrip />

      {/* 5. Comparison table — the centrepiece */}
      <ComparisonTable />

      {/* 6. Why us — 6 benefit cards */}
      <BenefitsGrid />

      {/* 6a. Why retrofit — 6 point form reasons */}
      <WhyRetrofit />

      {/* 6b. Glass comparison table */}
      <GlassComparisonTable />

      {/* 6c. All services */}
      <ServicesSection />

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

// ── Problem/fix anchor strip ─────────────────────────────────────────────────

function ProblemAnchorStrip() {
  return (
    <div className="bg-black py-8 md:py-10">
      <div className="max-w-175 mx-auto px-4 text-center space-y-3">
        <p className="font-sans text-base md:text-lg text-white/75 leading-snug">
          If your windows are just one layer of glass, they leak heat, let traffic noise in, and full replacement costs{' '}
          <span className="text-primary-container font-semibold">$15,000+</span>.
        </p>
        <p className="font-sans text-base md:text-lg text-white leading-snug">
          We add a second layer of glass to the windows you already have —{' '}
          up to <span className="text-primary-container font-semibold">70% quieter</span>,{' '}
          up to <span className="text-primary-container font-semibold">50% warmer</span>,{' '}
          a fraction of the price.
        </p>
      </div>
    </div>
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
          3 quick questions · Takes 60 seconds · See your range instantly
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
          <div className="bg-surface p-8 flex flex-col gap-5">
            <p className="font-sans text-base text-on-surface/80 leading-relaxed">
              Send Tas your competitor&apos;s quote on the contact form. If it&apos;s a real quote from a
              real Melbourne glazier, we&apos;ll come in 30% cheaper — in writing, with the same 10-year warranty.
            </p>
            <Link
              href="/contact/?upload=1"
              className="w-full inline-flex items-center justify-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150"
            >
              Send My Quote →
            </Link>
            <p className="font-sans text-xs text-on-surface/75 text-center">
              One business day. No call centres. No high-pressure sales.
            </p>
          </div>
        </div>
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
