'use client'

import Link from 'next/link'
import { Phone } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { HeroSection } from '@/components/sections/HeroSection'
import { TrustBar } from '@/components/sections/TrustBar'
import { WhyRetrofit } from '@/components/sections/WhyRetrofit'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FAQ } from '@/components/sections/FAQ'
import { PaymentTerms } from '@/components/PaymentTerms'
import { AdaptorDisclosure } from '@/components/AdaptorDisclosure'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'
import type { HomePageQuery, HomePageQueryVariables } from '@/tina/__generated__/types'
import type { EmbeddedProcessStep, EmbeddedFaq } from '@/lib/types'

type TinaHomeResult = { data: HomePageQuery; query: string; variables: HomePageQueryVariables }

export function HomePageClient({
  tinaHome,
  steps,
  faqs,
  phone,
  phoneHref,
}: {
  tinaHome: TinaHomeResult
  steps: EmbeddedProcessStep[]
  faqs: EmbeddedFaq[]
  phone: string
  phoneHref: string
}) {
  const { data } = useTina(tinaHome)
  const page = data.homePage

  const tf = (obj: object, field: string) => {
    try { return tinaField(obj, field) || undefined } catch { return undefined }
  }

  const stepItems = steps.map((s, i) => ({
    id: String(i),
    title: s.title,
    body: s.body,
    callout: s.callout,
    imageSrc: s.imageSrc,
    imageAlt: s.imageAlt,
    order: i,
  }))

  return (
    <>
      <HeroSection
        badge={page.badge ?? "Stop. Don't Overpay. · 10-Year Warranty · Beat Any Quote 30%"}
        headlineWhite={page.headlineWhite ?? 'Quieter Home. Lower Bills.'}
        headlineYellow={page.headlineYellow ?? 'Without Replacing Your Windows.'}
        subtext={page.subtext ?? 'We add a second pane to your existing windows. No ripping out, no mess. Up to 70% quieter.'}
        adaptorCaption={page.adaptorCaption ?? 'Our standard adapters are engineered to suit a wide range of window configurations.'}
        primaryCta={{ label: page.primaryCtaLabel ?? 'Generate My Quote →', href: '/instant-estimate/' }}
        secondaryCta={{ label: `Or call ${phone}`, href: phoneHref }}
        imageSrc="/hero/hero-double-glazing.webp"
        imageAlt="Double glazing upgrade on an existing window in a Melbourne home"
        showWarrantyBadge
        tina={{
          badge: tf(page, 'badge'),
          headlineWhite: tf(page, 'headlineWhite'),
          headlineYellow: tf(page, 'headlineYellow'),
          subtext: tf(page, 'subtext'),
          adaptorCaption: tf(page, 'adaptorCaption'),
        }}
      />

      <TrustBar />
      <WhyRetrofit />
      <AdaptorDisclosure />

      <ProcessSteps steps={stepItems} />

      <PaymentTerms />

      <EstimateCTABlock
        headline={page.estimateCtaHeadline ?? 'Get Your Price.\nIn Minutes Online.'}
        subtext={page.estimateCtaSubtext ?? "We beat any genuine quote by 30%. That's a promise in writing."}
        buttonLabel={page.estimateCtaButtonLabel ?? 'Start My Quote →'}
        caption={page.estimateCtaCaption ?? 'Enter your window sizes · See your price instantly'}
        tina={{
          headline: tf(page, 'estimateCtaHeadline'),
          subtext: tf(page, 'estimateCtaSubtext'),
          buttonLabel: tf(page, 'estimateCtaButtonLabel'),
          caption: tf(page, 'estimateCtaCaption'),
        }}
      />

      <FAQ
        heading={page.faqHeading ?? 'Common Questions'}
        subheading={page.faqSubheading ?? 'Plain answers, no jargon.'}
        items={faqs}
        tinaHeading={tf(page, 'faqHeading')}
        tinaSubheading={tf(page, 'faqSubheading')}
      />

      <FreeAdviceBlock />
      <WhatElseStrip />
      <EmergencyStrip phone={phone} phoneHref={phoneHref} />
    </>
  )
}

function EstimateCTABlock({
  headline,
  subtext,
  buttonLabel,
  caption,
  tina,
}: {
  headline: string
  subtext: string
  buttonLabel: string
  caption: string
  tina?: { headline?: string; subtext?: string; buttonLabel?: string; caption?: string }
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
          data-tina-field={tina?.headline || undefined}
          className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-4"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          {line1}
          {line2 && <><br />{line2}</>}
        </h2>
        <p
          data-tina-field={tina?.subtext || undefined}
          className="font-sans text-base text-on-primary-fixed mb-8 max-w-lg mx-auto leading-relaxed"
        >
          {subtext}
        </p>
        <Link
          href="/instant-estimate/"
          className="inline-flex items-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-10 py-5 hover:bg-on-primary-fixed/80 transition-colors duration-150"
        >
          <span data-tina-field={tina?.buttonLabel || undefined}>{buttonLabel}</span>
        </Link>
        <p
          data-tina-field={tina?.caption || undefined}
          className="mt-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed/80"
        >
          {caption}
        </p>
      </div>
    </section>
  )
}

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
