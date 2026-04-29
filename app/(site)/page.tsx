import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { WhyRetrofit } from '@/components/sections/WhyRetrofit'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FAQ } from '@/components/sections/FAQ'
import { PaymentTerms } from '@/components/PaymentTerms'
import { AdaptorDisclosure } from '@/components/AdaptorDisclosure'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'
import { sanityFetch } from '@/sanity/lib/fetch'
import {
  SITE_SETTINGS_QUERY,
  HOME_PAGE_QUERY,
  PROCESS_STEPS_QUERY,
  FAQS_QUERY,
} from '@/sanity/lib/queries'
import type { SiteSettings, HomePage, ProcessStep, FaqItem } from '@/sanity/types'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] })
  return buildMetadata({
    title: `Stop Overpaying for Double Glazing Melbourne | ${settings.pricing.retrofitFromDisplay} | King Double Glazing`,
    description:
      'We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 70% less heat loss. We beat any genuine quote by 30%.',
    path: '/',
  })
}

export default async function HomePage() {
  const [settings, homePage, steps, faqs] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] }),
    sanityFetch<HomePage>({ query: HOME_PAGE_QUERY, tags: ['homePage'] }),
    sanityFetch<ProcessStep[]>({ query: PROCESS_STEPS_QUERY, tags: ['processStep'] }),
    sanityFetch<FaqItem[]>({ query: FAQS_QUERY, params: { group: 'homepage' }, tags: ['faqItem'] }),
  ])

  const homePageSchema = buildWebPageSchema({
    url: `${BASE_URL}/`,
    name: `Stop Overpaying for Double Glazing Melbourne | ${settings.pricing.retrofitFromDisplay} | King Double Glazing`,
    description: 'We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 70% less heat loss. We beat any genuine quote by 30%.',
    breadcrumb: [{ name: 'Home', url: `${BASE_URL}/` }],
  })

  return (
    <>
      <SchemaScript schemas={[homePageSchema]} />
      {/* 1. Hero */}
      <HeroSection
        badge={homePage?.badge ?? "Stop. Don't Overpay. · 10-Year Warranty · Beat Any Quote 30%"}
        headlineWhite={homePage?.headlineWhite ?? 'Quieter Home. Lower Bills.'}
        headlineYellow={homePage?.headlineYellow ?? 'Without Replacing Your Windows.'}
        subtext={homePage?.subtext ?? 'We add a second pane to your existing windows. No ripping out, no mess. Up to 70% quieter.'}
        adaptorCaption={homePage?.adaptorCaption ?? 'Our standard adapters are engineered to suit a wide range of window configurations.'}
        primaryCta={{ label: homePage?.primaryCtaLabel ?? 'Generate My Quote →', href: '/instant-estimate/' }}
        secondaryCta={{ label: `Or call ${settings.phone}`, href: settings.phoneHref }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Double glazing upgrade on an existing window in a Melbourne home"
        showWarrantyBadge
      />

      {/* 2. Trust bar */}
      <TrustBar />

      {/* 3. Stop Don't Overpay */}
      <WhyRetrofit />

      {/* D2.1: Adaptor disclosure — after WhyRetrofit */}
      <AdaptorDisclosure />

      {/* 6. How it works — 3 steps */}
      <ProcessSteps steps={steps} />

      {/* C2: Payment terms — after 3-step process, before final CTA */}
      <PaymentTerms />

      {/* 7. Big CTA — the minute estimate push */}
      <EstimateCTABlock
        headline={homePage?.estimateCtaHeadline ?? 'Get Your Price.\nIn Minutes Online.'}
        subtext={homePage?.estimateCtaSubtext ?? "We beat any genuine quote by 30%. That's a promise in writing."}
        buttonLabel={homePage?.estimateCtaButtonLabel ?? 'Start My Quote →'}
        caption={homePage?.estimateCtaCaption ?? 'Enter your window sizes · See your price instantly'}
      />

      {/* 9. FAQ */}
      <FAQ
        heading={homePage?.faqHeading ?? 'Common Questions'}
        subheading={homePage?.faqSubheading ?? 'Plain answers, no jargon.'}
        items={faqs.map(f => ({ q: f.q, a: f.a }))}
      />

      {/* Free advice block */}
      <FreeAdviceBlock />

      {/* 10. What else we do — mini-strip */}
      <WhatElseStrip />

      {/* 11. Emergency strip */}
      <EmergencyStrip phone={settings.phone} phoneHref={settings.phoneHref} />
    </>
  )
}

// ── Estimate CTA block ───────────────────────────────────────────────────────

function EstimateCTABlock({
  headline,
  subtext,
  buttonLabel,
  caption,
}: {
  headline: string
  subtext: string
  buttonLabel: string
  caption: string
}) {
  const [line1, line2] = headline.split('\n')
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
          {line1}
          {line2 && <><br />{line2}</>}
        </h2>
        <p className="font-sans text-base text-on-primary-fixed mb-8 max-w-lg mx-auto leading-relaxed">
          {subtext}
        </p>
        <Link
          href="/instant-estimate/"
          className="inline-flex items-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-10 py-5 hover:bg-on-primary-fixed/80 transition-colors duration-150"
        >
          {buttonLabel}
        </Link>
        <p className="mt-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed/80">
          {caption}
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
                className="font-sans text-base text-on-surface hover:text-primary underline underline-offset-4 decoration-on-surface/40 hover:decoration-primary"
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

function EmergencyStrip({ phone, phoneHref }: { phone: string; phoneHref: string }) {
  return (
    <section className="bg-danger py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-sm text-white leading-relaxed">
          <strong>Broken window right now?</strong>{' '}
          We do emergency glass repair across Melbourne.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <Link
            href="/services/#emergency"
            className="font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150 underline underline-offset-4"
          >
            See emergency services →
          </Link>
          <a
            href={phoneHref}
            className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150"
          >
            <Phone size={15} aria-hidden="true" />
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  )
}
