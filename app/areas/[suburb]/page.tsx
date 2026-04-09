import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Layers,
  Volume2,
  Zap,
  ShieldCheck,
  Droplets,
  Wrench,
} from 'lucide-react'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { suburbs, suburbBySlug } from '@/data/suburbs'
import { testimonials } from '@/data/testimonials'
import { buildSuburbFaq } from '@/data/suburb-faq'
import { siteConfig } from '@/data/site'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { HeroSection } from '@/components/sections/HeroSection'
import { BenefitsGrid } from '@/components/sections/BenefitsGrid'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'

export async function generateStaticParams() {
  return suburbs.map(({ slug }) => ({ suburb: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ suburb: string }>
}): Promise<Metadata> {
  const { suburb } = await params
  const data = suburbBySlug[suburb]
  if (!data) return {}
  return buildMetadata({
    title: `Double Glazing ${data.name} | Retrofit Windows ${data.postcode} | King`,
    description: `Retrofit double glazing in ${data.name} ${data.postcode}. Local Melbourne glazier — transparent pricing from $495/m². Heritage-safe, installed in one day. Get your instant estimate.`,
    path: `/areas/${suburb}/`,
  })
}

const services = [
  {
    icon: Layers,
    label: 'Retrofit Double Glazing',
    desc: 'Keep your frames. Replace only the glass. From $495/m².',
    href: '/double-glazing/',
  },
  {
    icon: Volume2,
    label: 'Soundproof Windows',
    desc: 'Acoustic laminated glass — cut tram and road noise by half.',
    href: '/double-glazing/soundproof-windows/',
  },
  {
    icon: Zap,
    label: 'Energy Efficient Windows',
    desc: 'Low-E glass reduces heating bills up to 40%.',
    href: '/double-glazing/energy-efficient-windows/',
  },
  {
    icon: Droplets,
    label: 'Shower Screens',
    desc: 'Frameless and semi-frameless in any bathroom configuration.',
    href: '/shower-screens/',
  },
  {
    icon: ShieldCheck,
    label: 'Emergency Glass Repair',
    desc: 'Same-day response across Melbourne.',
    href: '/emergency-glass/',
  },
  {
    icon: Wrench,
    label: 'Commercial Glazing',
    desc: 'Shopfronts, strata, office retrofits. Itemised quoting.',
    href: '/commercial-glazing/',
  },
]

export default async function SuburbPage({
  params,
}: {
  params: Promise<{ suburb: string }>
}) {
  const { suburb } = await params
  const data = suburbBySlug[suburb]
  if (!data) notFound()

  // Suburb-filtered testimonials — fall back to first 6 if no exact match
  const suburbTestimonials = testimonials.filter((t) =>
    t.suburb.toLowerCase().includes(data.name.toLowerCase()),
  )
  const displayTestimonials =
    suburbTestimonials.length >= 2 ? suburbTestimonials : testimonials.slice(0, 6)

  const faqItems = buildSuburbFaq(data)

  // Schema
  const serviceSchema = buildServiceSchema({
    name: `Retrofit Double Glazing ${data.name}`,
    description: `King Double Glazing provides retrofit double glazing, shower screens and emergency glass services in ${data.name} ${data.postcode}. Transparent pricing from $495/m².`,
    url: `${BASE_URL}/areas/${suburb}/`,
    areaServed: `${data.name}, Victoria, Australia`,
  })

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${BASE_URL}/#business`,
    name: siteConfig.name,
    url: `${BASE_URL}/areas/${suburb}/`,
    telephone: siteConfig.phoneTel,
    email: siteConfig.email,
    areaServed: {
      '@type': 'Place',
      name: `${data.name}, Victoria, Australia`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: data.name,
        addressRegion: 'VIC',
        postalCode: data.postcode,
        addressCountry: 'AU',
      },
    },
    priceRange: 'From $495/m²',
  }

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Service Areas', href: '/areas/' },
    { name: `Double Glazing ${data.name}`, href: `/areas/${suburb}/` },
  ])

  const faqSchema = buildFaqSchema(
    faqItems.map(({ q, a }) => ({ question: q, answer: a })),
  )

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <HeroSection
        compact
        badge={`${data.region} · VIC ${data.postcode}`}
        headlineWhite={`Double Glazing`}
        headlineYellow={data.name}
        subtext={`Retrofit specialists for ${data.name} homes. From $495/m² — transparent pricing, installed in one day.`}
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
        imageSrc="/stock/AdobeStock_323273938.webp"
        imageAlt={`Double glazed windows installed in a ${data.name} home`}
      />

      {/* ── Suburb intro ─────────────────────────────────────────────── */}
      <section className="bg-surface py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">

          {/* Breadcrumb */}
          <Breadcrumb
            items={[
              { name: 'Home', href: '/' },
              { name: 'Service Areas', href: '/areas/' },
              { name: `Double Glazing ${data.name}`, href: `/areas/${suburb}/` },
            ]}
            emitSchema={false}
            className="mb-8"
          />

          <div className="grid lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-start">

            {/* Copy */}
            <div className="max-w-2xl">
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                {data.region} · {data.postcode}
              </p>
              <h1
                className="font-display uppercase leading-[0.9] text-on-surface mb-6"
                style={{ fontSize: 'clamp(2.25rem, 5vw, 4rem)' }}
              >
                Double Glazing<br />{data.name}
              </h1>
              <p className="font-sans text-base text-on-surface/65 leading-relaxed mb-8">
                {data.intro}
              </p>

              {/* Local landmark tag */}
              <p className="font-headline text-xs font-semibold uppercase tracking-widest text-on-surface/35">
                Local area · {data.landmark}
              </p>
            </div>

            {/* Price anchor — Value Ledger style */}
            <div className="shrink-0 w-full lg:w-72 border-l-4 border-primary-container bg-surface-container-lowest px-6 py-6">
              <p className="font-headline text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-on-surface/40 mb-4">
                {data.name} pricing guide
              </p>
              {[
                { tier: 'Standard DG', from: '$495', unit: '/m²' },
                { tier: 'Low-E Double Glaze', from: '$695', unit: '/m²' },
                { tier: 'Acoustic Laminate', from: '$890', unit: '/m²' },
                { tier: 'Triple Glazing', from: '$1,190', unit: '/m²' },
              ].map(({ tier, from, unit }) => (
                <div
                  key={tier}
                  className="flex items-baseline justify-between gap-4 py-2.5 border-b border-surface-container last:border-0"
                >
                  <span className="font-headline text-xs font-semibold uppercase tracking-wide text-on-surface/60">
                    {tier}
                  </span>
                  <span className="font-display text-xl leading-none text-on-surface">
                    {from}
                    <span className="font-sans text-xs text-on-surface/40">{unit}</span>
                  </span>
                </div>
              ))}
              <Link
                href="/instant-estimate/"
                className="mt-5 flex items-center justify-center gap-2 bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-[0.15em] px-4 py-3 hover:bg-primary-fixed-dim transition-colors duration-150"
              >
                Get exact price
                <span aria-hidden="true">→</span>
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services we offer in this suburb ─────────────────────────── */}
      <section className="bg-surface-container-low py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Services in {data.name}
          </p>
          <h2
            className="font-display uppercase leading-[0.9] text-on-surface mb-10"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
          >
            What We Do<br />
            <span className="text-primary-container bg-inverse-surface px-2 inline-block leading-tight">
              Here
            </span>
          </h2>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {services.map(({ icon: Icon, label, desc, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex gap-5 items-start bg-surface-container-lowest ghost-border p-6 hover:bg-white transition-colors duration-150 h-full"
                >
                  <span className="shrink-0 w-10 h-10 bg-primary-container flex items-center justify-center">
                    <Icon
                      size={18}
                      className="text-on-primary-fixed"
                      aria-hidden="true"
                    />
                  </span>
                  <div>
                    <p className="font-headline font-bold uppercase tracking-wide text-on-surface text-sm leading-snug mb-1">
                      {label}
                    </p>
                    <p className="font-sans text-xs text-on-surface/55 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <span
                    className="ml-auto shrink-0 text-primary font-headline leading-none group-hover:translate-x-0.5 transition-transform duration-150"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Benefits ─────────────────────────────────────────────────── */}
      <BenefitsGrid
        eyebrow={`Why ${data.name} Homeowners Choose King`}
        heading={"What You\nActually Get"}
      />

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      <Testimonials
        heading={
          suburbTestimonials.length >= 2
            ? `${data.name}\nReviews`
            : 'Real Homes.\nReal Results.'
        }
        subheading={
          suburbTestimonials.length >= 2
            ? `Verified ${data.name} customers — every word of it real.`
            : `What Melbourne homeowners say — including your ${data.region} neighbours.`
        }
        items={displayTestimonials}
      />

      {/* ── FAQ ──────────────────────────────────────────────────────── */}
      <FAQ
        heading={`${data.name} Questions`}
        subheading={`Common questions from ${data.name} homeowners before booking.`}
        items={faqItems}
        emitSchema={false}
      />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <CtaBanner
        heading={`${data.name}.\nTransparent Price.`}
        subtext={`Get a firm, itemised estimate for your ${data.name} home in 60 seconds. No sales calls, no site visit required.`}
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
