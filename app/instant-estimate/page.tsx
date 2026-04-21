import { Suspense } from 'react'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { TrustBar } from '@/components/sections/TrustBar'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { PaymentTerms } from '@/components/PaymentTerms'
import { ClientFitNote } from '@/components/ClientFitNote'
import { AdaptorDisclosure } from '@/components/AdaptorDisclosure'
import { estimateFaq } from '@/data/estimate-faq'
import { siteConfig } from '@/data/site'
import Image from 'next/image'
import { Eye, ShieldCheck, PhoneOff, Clock, Calculator } from 'lucide-react'
import { GlassComparisonTable } from '@/components/sections/GlassComparisonTable'
import { GlassTechSpecs } from '@/components/sections/GlassTechSpecs'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'

export const metadata: Metadata = buildMetadata({
  title: 'Instant Double Glazing Estimate Melbourne | See Your Price First',
  description:
    'Get an instant double glazing estimate in 60 seconds. No email required to see your number. We beat any genuine quote by 30%. 10-year warranty on every job.',
  path: '/instant-estimate/',
})

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
    description: 'Free instant double glazing estimate — no email required to see your number',
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

const estimateTrustItems = [
  { icon: Eye,         label: 'See Your Price First'  },
  { icon: PhoneOff,    label: 'No Sales Calls'        },
  { icon: Calculator,  label: 'Accurate Within ±10%'  },
  { icon: ShieldCheck, label: '10-Year Warranty'      },
  { icon: Clock,       label: 'Takes 60 Seconds'      },
]

export default function InstantEstimatePage() {
  return (
    <>
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

      {/* Hero */}
      <section className="relative flex flex-col overflow-hidden bg-[#111318] min-h-[50vh]">
        <Image
          src="/hero/hero-double-glazing.webp"
          alt="Double glazing upgrade in progress on a Melbourne home"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.30) 100%)',
          }}
          aria-hidden="true"
        />
        <div className="relative z-10 flex flex-col justify-end flex-1 max-w-5xl mx-auto w-full px-4 pb-14 md:pb-18 pt-30">
          <div className="flex flex-col gap-5 max-w-3xl">
            <span className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1">
              Quote Generator
            </span>
            <h1
              className="font-display uppercase leading-none text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              Generate Your Own Quote.
              <br />
              <span className="text-primary-container">See Your Price in 60 Seconds.</span>
            </h1>
            <p className="font-sans text-sm font-medium text-white border-l-2 border-primary-container pl-3 max-w-xl leading-snug">
              Price yourself online first. Call us when you&apos;d like to proceed.
            </p>
            <p className="font-sans text-lg md:text-xl text-white max-w-xl leading-relaxed">
              We&apos;ll beat any genuine quote by 30%. That&apos;s a promise in writing.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              {[
                'Enter your window sizes',
                'See your price instantly',
                'No email needed',
                '10-year warranty',
              ].map(item => (
                <li key={item} className="font-headline text-xs font-semibold uppercase tracking-widest text-white">
                  ✓ {item}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <a
                href="#estimate-form"
                className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 w-fit"
              >
                Generate My Quote →
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar items={estimateTrustItems} />

      {/* Option cards + inline calculator (gray section) */}
      <Suspense fallback={<div className="bg-surface-container-low h-96" />}>
        <GlassComparisonTable />
      </Suspense>

      <GlassTechSpecs />

      {/* C2: Payment terms */}
      <PaymentTerms />

      {/* G1: Anti-time-waster disclaimer */}
      <ClientFitNote />

      {/* D2.2: Adaptor disclosure in FAQ area */}
      <AdaptorDisclosure />

      {/* Commercial note */}
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-4">
        <p className="font-sans text-sm text-on-surface leading-relaxed">
          <strong>Commercial glazing?</strong>{' '}
          The calculator is built for homes. For offices, retail, and commercial jobs, call Tas directly on{' '}
          <a href="tel:+61406470595" className="underline hover:text-primary transition-colors duration-150">
            0406 470 595
          </a>.
        </p>
      </div>

      <FAQ
        heading="Quote Generator FAQ"
        subheading="Common questions about the tool and how it works."
        items={estimateFaq}
        emitSchema={false}
      />

      <FreeAdviceBlock />

      <CtaBanner
        heading={"Ready for the\nFormal Quote?"}
        subtext="Once you have an estimate, call Tas to confirm and book the install."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
