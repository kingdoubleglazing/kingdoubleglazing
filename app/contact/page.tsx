import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { TrustBar } from '@/components/sections/TrustBar'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ContactForm } from '@/components/sections/ContactForm'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { contactFaq } from '@/data/contact-faq'
import { siteConfig } from '@/data/site'

// ── Metadata ────────────────────────────────────────────────────
export const metadata: Metadata = buildMetadata({
  title: 'Contact King Double Glazing | Free Quote Melbourne',
  description:
    'Get a free double glazing quote in Melbourne. Call, email, or send a message — we respond within one business day. Transparent pricing from $495/m². No pressure.',
  path: '/contact/',
})

// ── JSON-LD schemas ─────────────────────────────────────────────
const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact King Double Glazing',
  url: `${siteConfig.domain}/contact/`,
  description: 'Contact page for King Double Glazing — free quotes and enquiries for retrofit double glazing in Melbourne.',
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: siteConfig.legalName,
  url: siteConfig.domain,
  telephone: siteConfig.phoneTel,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    addressLocality: siteConfig.address.suburb,
    addressRegion: siteConfig.address.state,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '08:00',
      closes: '17:00',
    },
  ],
  priceRange: '$$',
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: contactFaq.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const contactProcessSteps = [
  {
    title: 'Send Your Enquiry',
    body: 'Use the form, call, or email. Describe your project in as much or as little detail as you have — we can work with "I have some windows that need upgrading".',
  },
  {
    title: 'We Respond Fast',
    body: 'Within one business day by email. Phone calls answered same day during business hours. Emergency glass? Call directly for immediate dispatch.',
  },
  {
    title: 'Free Measure & Quote',
    body: 'A King technician visits, measures precisely, and provides a binding written quote at no cost. No obligation to proceed.',
  },
] as const

// ── Page ────────────────────────────────────────────────────────
export default function ContactPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Compact hero ── */}
      <section className="bg-inverse-surface py-16 md:py-20 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-4 -right-6 font-display uppercase leading-none text-inverse-on-surface/4"
          style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
          aria-hidden="true"
        >
          CONTACT
        </span>

        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* Left — headline + value prop */}
            <div className="flex flex-col gap-5">
              <span className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1">
                Free Quote
              </span>
              <h1
                className="font-display uppercase leading-none text-inverse-on-surface"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
              >
                Get a Quote.
                <br />
                <span className="text-primary-container">No Pressure.</span>
              </h1>
              <p className="font-sans text-base text-inverse-on-surface/60 max-w-md leading-relaxed">
                Tell us about your project and we&apos;ll respond within one business day.
                Or use the{' '}
                <Link href="/instant-estimate/" className="text-primary-container underline underline-offset-2 hover:no-underline">
                  Instant Estimate Tool
                </Link>{' '}
                to see a ballpark price right now.
              </p>
            </div>

            {/* Right — contact detail cards */}
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

      {/* ── Trust bar ── */}
      <TrustBar />

      {/* ── Contact form section ── */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
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
            <p className="font-sans text-base text-on-surface/55 mt-4 max-w-md leading-relaxed">
              No obligation. No follow-up calls unless you ask. Just honest answers and transparent pricing.
            </p>
          </div>

          <ContactForm />

          <p className="mt-6 text-center font-sans text-xs text-on-surface/30 max-w-xl mx-auto leading-relaxed">
            Prefer to skip the form?{' '}
            <Link href="/instant-estimate/" className="underline hover:text-on-surface/50">
              Get an instant estimate
            </Link>{' '}
            online — no email required to see your number.
          </p>
        </div>
      </section>

      {/* ── How it works ── */}
      <ProcessSteps
        heading="What Happens Next"
        subheading="Three steps from enquiry to installed windows."
        steps={contactProcessSteps}
        cta={{ label: 'Instant Estimate instead', href: '/instant-estimate/' }}
      />

      {/* ── FAQ ── */}
      <FAQ
        heading="Common Questions"
        subheading="Everything homeowners ask before making contact."
        items={contactFaq}
      />

      {/* ── Soft CTA ── */}
      <CtaBanner
        heading={"Want the\nNumber First?"}
        subtext="Use the Instant Estimate Tool — see your price in 60 seconds, no email required. Then contact us when you're ready."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}

// ── Sub-components ──────────────────────────────────────────────
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
    <div className="bg-inverse-on-surface/5 p-5 flex flex-col gap-2 h-full ghost-border">
      <div className="flex items-center gap-2 text-primary-container">
        {icon}
        <span className="font-headline text-xs font-semibold uppercase tracking-widest text-primary-container">
          {label}
        </span>
      </div>
      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-inverse-on-surface leading-tight">
        {value}
      </p>
      <p className="font-sans text-xs text-inverse-on-surface/40 leading-snug">
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
