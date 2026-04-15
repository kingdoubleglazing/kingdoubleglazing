import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { retrofitFaqs, emergencyFaqs } from '@/data/faqs'
import { SchemaScript } from '@/components/SchemaScript'
import { TrustBar } from '@/components/sections/TrustBar'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Services Melbourne | Retrofit, Emergency Glass, Shower Screens | King Double Glazing',
  description:
    `Retrofit double glazing from ${siteConfig.pricing.retrofitFromDisplay}, emergency glass repair, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne. 10-year warranty.`,
  path: '/services/',
})

const servicesPageSchemas = [
  buildWebPageSchema({
    url: `${BASE_URL}/services/`,
    name: 'Double Glazing Services Melbourne | Retrofit, Emergency Glass, Shower Screens | King Double Glazing',
    description: `Retrofit double glazing from ${siteConfig.pricing.retrofitFromDisplay}, emergency glass repair, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne. 10-year warranty.`,
    breadcrumb: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Services', url: `${BASE_URL}/services/` },
    ],
  }),
  buildServiceSchema({
    name: 'Retrofit Double Glazing Melbourne',
    description: 'We add a second layer of glass to your existing windows. Works on timber, aluminium, and steel frames. Installed in one day. Up to 70% quieter, up to 50% warmer. From $595/m².',
    url: `${BASE_URL}/services/#retrofit`,
    priceRange: siteConfig.pricing.retrofitFromDisplay,
  }),
  buildServiceSchema({
    name: 'Emergency Glass Repair Melbourne',
    description: 'Same-day emergency glass repair across Melbourne. Broken windows, shopfronts, sliding doors, skylights. Temporary boarding available. Insurance reports on request.',
    url: `${BASE_URL}/services/#emergency`,
  }),
  buildFaqSchema([...retrofitFaqs, ...emergencyFaqs]),
]

const servicesFaqItems = [
  {
    q: 'Do you do all these services or just double glazing?',
    a: 'All of them. King Double Glazing handles retrofit double glazing, shower screens, splashbacks, mirrors, emergency repairs, and commercial jobs. One team, one price promise, one warranty.',
  },
  {
    q: 'What\'s the fastest service you offer?',
    a: 'Emergency glass repair — we aim to be on site within 2–4 hours in metropolitan Melbourne. Call us directly for fastest response.',
  },
  {
    q: 'Do shower screens and splashbacks include installation?',
    a: 'Yes. Every job includes supply, installation, and cleanup. We leave the site in the same condition we found it.',
  },
]

export default function ServicesPage() {
  return (
    <>
      <SchemaScript schemas={servicesPageSchemas} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-[#111318]">
        <Image
          src="/hero/hero-services.webp"
          alt="Double glazing services Melbourne"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.4) 100%)' }}
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-5xl mx-auto w-full px-4 pb-14 md:pb-20 pt-32">
          <span className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5">
            All Services
          </span>
          <h1
            className="font-display uppercase leading-none text-white mb-5"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
          >
            One Team.
            <br />
            <span className="text-primary-container">Every Job.</span>
          </h1>
          <p className="font-sans text-base text-white/85 max-w-lg leading-relaxed">
            Retrofit double glazing — adding a second layer of glass to the windows you already have — is our main business.
            We also do emergency repairs, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne.
            10-year warranty on every job.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* ── #retrofit ── */}
      <ServiceSection
        id="retrofit"
        eyebrow="Hero Service"
        heading="Retrofit Double Glazing"
        featured
        image="/stock/double-glazed-2000px.webp"
        imageAlt="Double glazed window close-up — retrofit installation Melbourne"
      >
        <p className="font-sans text-base text-on-surface/70 leading-relaxed mb-6">
          We add a second layer of glass to the windows you already have.
          Same frames. Same look. Up to 70% quieter. Up to 50% warmer in winter.
          Half the price of full replacement.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            'Works on timber, aluminium, and steel frames',
            'Installed in one day — most Melbourne homes',
            `${siteConfig.pricing.retrofitFromDisplay} — we beat any genuine quote by 30%`,
            '10-year warranty on glass and workmanship',
            'No council approval required in most cases',
          ].map(b => (
            <li key={b} className="flex items-start gap-3 font-sans text-sm text-on-surface/70">
              <span className="text-primary-container font-bold mt-0.5 shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          href="/instant-estimate/"
          className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
        >
          Get My Instant Price →
        </Link>
      </ServiceSection>

      {/* ── #emergency ── */}
      <ServiceSection
        id="emergency"
        eyebrow="Rapid Response"
        heading="Emergency Glass Repair"
        danger
        image="/stock/AdobeStock_323273938.webp"
        imageAlt="Emergency glass repair — glazier on site in Melbourne"
      >
        <p className="font-sans text-base text-white/85 leading-relaxed mb-6">
          Broken window right now? We do same-day emergency glass repair across Melbourne.
          Shopfronts, residential, sliding doors, skylights.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            'Same-day response in metropolitan Melbourne',
            'Temporary boarding while glass is ordered',
            'All glass types — safety, toughened, laminated',
            'Insurance reports available on request',
          ].map(b => (
            <li key={b} className="flex items-start gap-3 font-sans text-sm text-white/85">
              <span className="text-white font-bold mt-0.5 shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <a
          href={siteConfig.phoneHref}
          className="inline-flex items-center gap-2 bg-black text-white font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-black/80 transition-colors duration-150"
        >
          <Phone size={16} aria-hidden="true" />
          Call {siteConfig.phone} Now
        </a>
      </ServiceSection>

      {/* ── #shower-screens ── */}
      <ServiceSection
        id="shower-screens"
        eyebrow="Bathroom"
        heading="Shower Screens"
        image="/stock/shower-pane-1000x667-1.webp"
        imageAlt="Semi-frameless shower screen installation Melbourne"
      >
        <p className="font-sans text-base text-on-surface/70 leading-relaxed mb-6">
          Frameless, semi-frameless, and framed shower screens.
          Toughened safety glass. One-day installation.
          We supply and fit across Melbourne.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            'Frameless — no metal frame, looks like a single sheet of glass',
            'Semi-frameless — cleaner look, lower cost',
            'Framed — most affordable, very durable',
            'Custom sizes cut to your exact dimensions',
            'Measure-it-yourself quote available — accurate within 10% if you measure carefully',
            '10-year warranty on every screen',
          ].map(b => (
            <li key={b} className="flex items-start gap-3 font-sans text-sm text-on-surface/70">
              <span className="text-primary-container font-bold mt-0.5 shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact/?service=shower-diy"
            className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            Send My Measurements →
          </Link>
          <Link
            href="/contact/?service=shower-visit"
            className="inline-flex items-center gap-3 bg-transparent text-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-on-surface/30 hover:bg-on-surface/10 transition-colors duration-150"
          >
            Or Book a Free Measure →
          </Link>
        </div>
      </ServiceSection>

      {/* ── #splashbacks ── */}
      <ServiceSection
        id="splashbacks"
        eyebrow="Kitchen & Bathroom"
        heading="Kitchen Glass Splashbacks"
        dark
        image="/stock/splashback-2.webp"
        imageAlt="Kitchen glass splashback installation Melbourne"
      >
        <p className="font-sans text-base text-inverse-on-surface/85 leading-relaxed mb-6">
          Custom-cut glass splashbacks in any colour. Easy to clean.
          Heat-resistant. We measure, cut, and install.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            'Any colour — match your kitchen exactly',
            'Heat and steam resistant',
            'Hygienic — no grout to clean',
            'Custom sizes, no standard-size limitations',
          ].map(b => (
            <li key={b} className="flex items-start gap-3 font-sans text-sm text-inverse-on-surface/85">
              <span className="text-primary-container font-bold mt-0.5 shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          href="/contact/"
          className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
        >
          Get a Quote →
        </Link>
      </ServiceSection>

      {/* ── #mirrors ── */}
      <ServiceSection
        id="mirrors"
        eyebrow="Custom"
        heading="Custom Mirrors"
      >
        <p className="font-sans text-base text-on-surface/70 leading-relaxed mb-6">
          Bespoke mirrors cut to any size. Bathrooms, gyms, hallways, studios.
          We supply and install across Melbourne.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            'Cut to exact dimensions',
            'Bevelled edge or straight cut',
            'Wall-mounted or free-standing',
            'Commercial and residential',
          ].map(b => (
            <li key={b} className="flex items-start gap-3 font-sans text-sm text-on-surface/70">
              <span className="text-primary-container font-bold mt-0.5 shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          href="/contact/"
          className="inline-flex items-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-surface/80 transition-colors duration-150"
        >
          Get a Quote →
        </Link>
      </ServiceSection>

      {/* ── #commercial ── */}
      <ServiceSection
        id="commercial"
        eyebrow="Commercial"
        heading="Commercial Glazing"
        dark
        image="/hero/hero-commercial-glazing.webp"
        imageAlt="Commercial glazing — shopfront and office glass Melbourne"
      >
        <p className="font-sans text-base text-inverse-on-surface/85 leading-relaxed mb-6">
          Offices, retail, shopfronts, strata — we handle commercial glazing jobs of all sizes
          across Melbourne. Same transparent pricing, same 10-year warranty.
        </p>
        <ul className="space-y-3 mb-8">
          {[
            'Retrofit double glazing for offices and apartments',
            'Shopfront glass supply and installation',
            'Office partitions and internal glazing',
            'Strata and body corporate work',
            'All project sizes — call to discuss yours',
          ].map(b => (
            <li key={b} className="flex items-start gap-3 font-sans text-base text-inverse-on-surface/85">
              <span className="text-primary-container font-bold mt-0.5 shrink-0">✓</span>
              {b}
            </li>
          ))}
        </ul>
        <Link
          href="/contact/"
          className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
        >
          Get a Quote →
        </Link>
      </ServiceSection>

      <FAQ
        heading="Service Questions"
        subheading="Common questions about what we do."
        items={servicesFaqItems}
      />

      <CtaBanner
        heading={"Ready to Get\nStarted?"}
        subtext="Get your free estimate in 60 seconds, or call Tas directly for any service."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}

// ── ServiceSection helper ──────────────────────────────────────────────────────

function ServiceSection({
  id,
  eyebrow,
  heading,
  featured,
  dark,
  danger,
  image,
  imageAlt,
  children,
}: {
  id: string
  eyebrow: string
  heading: string
  featured?: boolean
  dark?: boolean
  danger?: boolean
  image?: string
  imageAlt?: string
  children: React.ReactNode
}) {
  const bg = danger ? 'bg-danger' : dark ? 'bg-inverse-surface' : featured ? 'bg-surface' : 'bg-surface-container-lowest'
  const border = featured ? 'border-l-4 border-primary-container' : ''
  const onDark = dark || danger

  return (
    <section id={id} className={`${bg} py-16 md:py-20 scroll-mt-20`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className={`grid grid-cols-1 ${image ? 'lg:grid-cols-2 gap-12 lg:gap-20 items-center' : ''}`}>
          <div className={`${border} ${border ? 'pl-8' : ''}`}>
            <p className={`font-headline text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${onDark ? 'text-white/60' : 'text-primary'}`}>
              {eyebrow}
            </p>
            <h2
              className={`font-display uppercase leading-none mb-8 ${onDark ? 'text-white' : 'text-on-surface'}`}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heading}
            </h2>
            {children}
          </div>
          {image && imageAlt && (
            <div className="relative min-h-[280px] md:min-h-[400px] overflow-hidden">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
