import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { TrustBar } from '@/components/sections/TrustBar'
import { ContactForm } from '@/components/sections/ContactForm'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { contactFaq } from '@/data/contact-faq'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contact King Double Glazing | Free Quote Melbourne',
  description:
    'Get a free double glazing quote in Melbourne. Call, email, or send a message — we respond within one business day. We beat any genuine quote by 30%. 10-year warranty.',
  path: '/contact/',
})

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact King Double Glazing',
  url: `${siteConfig.domain}/contact/`,
  description: 'Contact page for King Double Glazing — free quotes and enquiries for retrofit double glazing in Melbourne.',
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

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
                Free Quote
              </span>
              <h1
                className="font-display uppercase leading-none text-white"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
              >
                Get a Quote.
                <br />
                <span className="text-primary-container">No Pressure.</span>
              </h1>
              <p className="font-sans text-base text-white/85 max-w-md leading-relaxed">
                Fill in the form, call, or email. We respond within one business day.
                Or use the{' '}
                <Link href="/instant-estimate/" className="text-primary-container underline underline-offset-2 hover:no-underline">
                  Instant Estimate Tool
                </Link>{' '}
                to see your price right now.
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

      {/* Contact form */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
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
            <p className="font-sans text-base text-on-surface/75 mt-4 max-w-md leading-relaxed">
              No obligation. No follow-up calls unless you ask. Honest answers and transparent pricing.
            </p>
          </div>
          <ContactForm />
          <p className="mt-6 text-center font-sans text-xs text-on-surface/55 max-w-xl mx-auto leading-relaxed">
            Prefer to skip the form?{' '}
            <Link href="/instant-estimate/" className="underline hover:text-on-surface/70">
              Get an instant estimate
            </Link>{' '}
            — no email required to see your number.
          </p>
        </div>
      </section>

      {/* 3 FAQs max */}
      <FAQ
        heading="Common Questions"
        subheading="Quick answers before you get in touch."
        items={contactFaq}
      />

      <CtaBanner
        heading={"Want the\nNumber First?"}
        subtext="Use the Instant Estimate Tool — see your price in 60 seconds, no email required. Then contact us when you're ready."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
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
        <span className="font-headline text-xs font-semibold uppercase tracking-widest text-white/70">
          {label}
        </span>
      </div>
      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-white leading-tight">
        {value}
      </p>
      <p className="font-sans text-xs text-white/65 leading-snug">
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
