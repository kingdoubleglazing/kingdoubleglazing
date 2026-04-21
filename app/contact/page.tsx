import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { SchemaScript } from '@/components/SchemaScript'
import { TrustBar } from '@/components/sections/TrustBar'
import { ContactForm } from '@/components/sections/ContactForm'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { PaymentTerms } from '@/components/PaymentTerms'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'
import { contactFaq } from '@/data/contact-faq'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact King Double Glazing | Double Glazing Quote Melbourne',
  description:
    'Get your double glazing estimate online in 60 seconds. Call or send a message when you\'re ready to book. We beat any genuine quote by 30%. 10-year warranty.',
  path: '/contact/',
})

const contactPageSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${BASE_URL}/contact/#webpage`,
    url: `${siteConfig.domain}/contact/`,
    name: 'Contact King Double Glazing | Double Glazing Quote Melbourne',
    description: 'Get your double glazing estimate online in 60 seconds. Call or send a message when you\'re ready to book. We beat any genuine competitor quote by 30%.',
    isPartOf: { '@id': `${siteConfig.domain}/#website` },
    about: { '@id': `${siteConfig.domain}/#business` },
  },
]

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const isUploadFlow = params.upload === '1'
  const isShowerDiy = params.service === 'shower-diy'
  const isShowerVisit = params.service === 'shower-visit'
  return (
    <>
      <SchemaScript schemas={contactPageSchemas} />

      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden bg-[#111318]">
        <Image
          src="/hero/hero-home.webp"
          alt="Contact King Double Glazing Melbourne"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.45) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 pb-14 md:pb-20 pt-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div className="flex flex-col gap-5">
              <span className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1">
                Get in Touch
              </span>
              <h1
                className="font-display uppercase leading-none text-white"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
              >
                Get a Quote.
                <br />
                <span className="text-primary-container">No Pressure.</span>
              </h1>
              <p className="font-sans text-base text-white max-w-md leading-relaxed">
                Price yourself online first. Call us when you&apos;d like to proceed.
              </p>
            </div>

            {/* Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <ContactCard
                icon={<Phone size={16} aria-hidden="true" />}
                label="Call Us"
                value={siteConfig.phone}
                href={siteConfig.phoneHref}
                sublabel="Mon–Fri 8am–5pm"
              />
              <ContactCard
                icon={<Mail size={16} aria-hidden="true" />}
                label="Email"
                value={siteConfig.email}
                href={`mailto:${siteConfig.email}`}
                sublabel="Reply within 1 business day"
              />
              <ContactCard
                icon={<Clock size={16} aria-hidden="true" />}
                label="Emergency Glass"
                value="Same-day response"
                href={siteConfig.phoneHref}
                sublabel="Call for immediate dispatch"
              />
              <ContactCard
                icon={<MapPin size={16} aria-hidden="true" />}
                label="Service Area"
                value="Melbourne-wide"
                sublabel="Metro & inner suburbs"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      <UploadQuoteHero />

      {/* Contact form */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          {isUploadFlow && (
            <div className="mb-8 max-w-2xl bg-primary-container/20 border-l-4 border-primary-container px-5 py-4">
              <p className="font-sans text-base text-on-surface leading-relaxed">
                <strong>Sending us a competitor quote?</strong> Mention it in the message field and attach a photo or PDF — we&apos;ll beat it by 30% in writing.
              </p>
            </div>
          )}
          {isShowerDiy && (
            <div className="mb-8 max-w-2xl bg-primary-container/20 border-l-4 border-primary-container px-5 py-4">
              <p className="font-sans text-base text-on-surface leading-relaxed">
                <strong>Sending us shower screen measurements?</strong> Drop the dimensions in the message field. We&apos;ll quote within one business day, accurate within 10% if you measure carefully.
              </p>
            </div>
          )}
          {isShowerVisit && (
            <div className="mb-8 max-w-2xl bg-primary-container/20 border-l-4 border-primary-container px-5 py-4">
              <p className="font-sans text-base text-on-surface leading-relaxed">
                <strong>Booking a shower screen measure?</strong> Tell us your suburb and a good time. Tas will be in touch within one business day.
              </p>
            </div>
          )}
          <div className="mb-10 md:mb-14 max-w-xl">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Enquiry Form
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Send Us a Message
            </h2>
            <p className="font-sans text-base text-on-surface mt-4 max-w-md leading-relaxed">
              No obligation. No follow-up calls unless you ask.
            </p>
          </div>
          <ContactForm />
          <p className="mt-6 text-center font-sans text-xs text-on-surface max-w-xl mx-auto leading-relaxed">
            Prefer to skip the form?{' '}
            <Link href="/instant-estimate/" className="underline hover:text-primary">
              Get an instant estimate
            </Link>{' '}
            — no email required.
          </p>
        </div>
      </section>

      {/* C2: Payment terms — below form, before FAQ */}
      <PaymentTerms />

      {/* 3 FAQs max */}
      <FAQ
        heading="Common Questions"
        subheading="Quick answers before you get in touch."
        items={contactFaq}
      />

      <FreeAdviceBlock />

      <CtaBanner
        heading={"Want the\nNumber First?"}
        subtext="Use the Quote Generator — see your price in 60 seconds, no email required. Then contact us when you're ready."
        primaryCta={{ label: 'Generate My Quote', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}

function UploadQuoteHero() {
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
              {[
                'Photo or PDF of the competitor quote',
                'Your suburb',
                'A good time to call',
              ].map(item => (
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

function ContactCard({
  icon,
  label,
  value,
  href,
  sublabel,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href?: string
  sublabel: string
}) {
  const inner = (
    <div className="bg-white/10 p-5 flex flex-col gap-2 h-full border border-white/20">
      <div className="flex items-center gap-2 text-white">
        {icon}
        <span className="font-headline text-xs font-semibold uppercase tracking-widest text-white/90">
          {label}
        </span>
      </div>
      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-white leading-tight">
        {value}
      </p>
      <p className="font-sans text-xs text-white/80 leading-snug">
        {sublabel}
      </p>
    </div>
  )

  if (href) {
    return (
      <a href={href} className="hover:opacity-80 transition-opacity duration-150">
        {inner}
      </a>
    )
  }
  return <div>{inner}</div>
}
