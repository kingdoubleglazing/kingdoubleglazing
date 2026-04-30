'use client'

import { Suspense } from 'react'
import Image from 'next/image'
import { useTina, tinaField } from 'tinacms/dist/react'
import { Eye, ShieldCheck, PhoneOff, Clock, Calculator } from 'lucide-react'
import { TrustBar } from '@/components/sections/TrustBar'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { PaymentTerms } from '@/components/PaymentTerms'
import { ClientFitNote } from '@/components/ClientFitNote'
import { AdaptorDisclosure } from '@/components/AdaptorDisclosure'
import { GlassComparisonTable } from '@/components/sections/GlassComparisonTable'
import { GlassTechSpecs } from '@/components/sections/GlassTechSpecs'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'
import type { EstimatePageQuery, EstimatePageQueryVariables } from '@/tina/__generated__/types'
import type { PricingOption, EmbeddedFaq } from '@/lib/types'

type TinaEstimateResult = { data: EstimatePageQuery; query: string; variables: EstimatePageQueryVariables }

const estimateTrustItems = [
  { icon: Eye,         label: 'See Your Price First'  },
  { icon: PhoneOff,    label: 'No Sales Calls'        },
  { icon: Calculator,  label: 'Accurate Within ±10%'  },
  { icon: ShieldCheck, label: '10-Year Warranty'      },
  { icon: Clock,       label: 'Takes Minutes'         },
]

export function EstimatePageClient({
  tinaEstimate,
  pricingOptions,
  faqs,
  phone,
  phoneHref,
}: {
  tinaEstimate: TinaEstimateResult
  pricingOptions: PricingOption[]
  faqs: EmbeddedFaq[]
  phone: string
  phoneHref: string
}) {
  const { data } = useTina(tinaEstimate)
  const page = data.estimatePage

  const tf = (obj: object, field: string) => {
    try { return tinaField(obj, field) || undefined } catch { return undefined }
  }

  return (
    <>
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
              <span data-tina-field={tf(page, 'heroHeadline') || undefined}>
                {page?.heroHeadline ?? 'Generate Your Own Quote.'}
              </span>
              <br />
              <span className="text-primary-container">See Your Price in Minutes.</span>
            </h1>
            <p
              data-tina-field={tf(page, 'heroSubtext') || undefined}
              className="font-sans text-sm font-medium text-white border-l-2 border-primary-container pl-3 max-w-xl leading-snug"
            >
              {page?.heroSubtext ?? 'Price yourself online first. Call us when you\'d like to proceed.'}
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

      <Suspense fallback={<div className="bg-surface-container-low h-96" />}>
        <GlassComparisonTable
          options={pricingOptions}
          secondStoreySurcharge={page?.secondStoreySurcharge ?? 0}
          phone={phone}
          phoneHref={phoneHref}
        />
      </Suspense>

      <GlassTechSpecs options={pricingOptions} />

      <PaymentTerms />
      <ClientFitNote />
      <AdaptorDisclosure />

      <div className="max-w-4xl mx-auto px-6 md:px-10 py-4">
        <p className="font-sans text-sm text-on-surface leading-relaxed">
          <strong>Commercial glazing?</strong>{' '}
          The calculator is built for homes. For offices, retail, and commercial jobs, call us directly on{' '}
          <a href={phoneHref} className="underline hover:text-primary transition-colors duration-150">
            {phone}
          </a>.
        </p>
      </div>

      <FAQ
        heading="Quote Generator FAQ"
        subheading="Common questions about the tool and how it works."
        items={faqs}
        emitSchema={false}
      />

      <FreeAdviceBlock />

      <CtaBanner
        heading={"Ready for the\nFormal Quote?"}
        subtext="Once you have an estimate, call us to confirm and book the installation."
        primaryCta={{ label: 'Contact Us', href: '/contact/' }}
        secondaryCta={{ label: phone, href: phoneHref }}
      />
    </>
  )
}
