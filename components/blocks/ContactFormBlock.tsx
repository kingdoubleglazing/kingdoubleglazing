'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { ContactForm } from '@/components/sections/ContactForm'
import { getSiteSettings } from '@/lib/site-settings'

export interface ContactFormBlockData {
  __typename?: string
  heading?: string | null
}

function ContactFormInner({ heading }: { heading: string }) {
  const params = useSearchParams()
  const isUploadFlow = params.get('upload') === '1'
  const settings = getSiteSettings()

  return (
    <>
      {isUploadFlow && <UploadQuoteSection />}
      <section className="bg-surface py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          {heading && (
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface mb-10"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              {heading}
            </h2>
          )}
          <ContactForm
            phone={settings.phone}
            phoneHref={settings.phoneHref}
            email={settings.email}
          />
        </div>
      </section>
    </>
  )
}

export function ContactFormBlock({ block }: { block: ContactFormBlockData }) {
  const heading = block.heading ?? 'Send Us a Message'
  return (
    <Suspense fallback={<div className="bg-surface h-96" />}>
      <ContactFormInner heading={heading} />
    </Suspense>
  )
}

function UploadQuoteSection() {
  return (
    <section className="bg-inverse-surface py-16 md:py-20">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3">
              Already Got a Quote?
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-inverse-on-surface mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Send It In.
              <br />
              <span className="text-primary-container">We&apos;ll Beat It By 30%.</span>
            </h2>
            <p className="font-sans text-base text-inverse-on-surface leading-relaxed max-w-md">
              If it&apos;s a real quote from a real Melbourne glazier, we come in 30% cheaper — in writing, same 10-year warranty. Attach a photo or PDF in the message field.
            </p>
          </div>
          <div className="lg:justify-self-end">
            <ul className="space-y-3">
              {['Photo or PDF of the competitor quote', 'Your suburb', 'A good time to call'].map(item => (
                <li key={item} className="flex items-start gap-3 font-sans text-base text-inverse-on-surface">
                  <span className="text-primary-container font-bold mt-1 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-headline text-xs font-semibold uppercase tracking-wide text-inverse-on-surface">
              One business day. No call centres. No high-pressure sales.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
