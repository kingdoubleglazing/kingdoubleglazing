import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { TrustBar } from '@/components/sections/TrustBar'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Our Services | Retrofit Double Glazing, Shower Screens & More | King Double Glazing',
  description:
    'Retrofit double glazing, emergency glass repair, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne. From $595/m². 10-year warranty.',
  path: '/services/',
})

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

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'King Double Glazing Services',
  provider: { '@type': 'LocalBusiness', name: siteConfig.legalName, url: siteConfig.domain },
  areaServed: 'Melbourne, Victoria',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Glazing Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retrofit Double Glazing' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Glass Repair' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shower Screens' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Kitchen Glass Splashbacks' } },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Mirrors' } },
    ],
  },
}

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden bg-[#111318]">
        <Image
          src="/hero/hero-double-glazing.webp"
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
            Retrofit double glazing is our main business. We also do emergency repairs,
            shower screens, splashbacks, mirrors, and commercial glazing across Melbourne.
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
            'From $595/m² — we beat any genuine quote by 30%',
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
            'Frameless — clean, minimal, modern',
            'Semi-frameless — cost-effective with a clean look',
            'Framed — budget-friendly, durable',
            'Custom sizes cut to your exact dimensions',
            '10-year warranty on every screen',
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
      <section id="commercial" className="bg-surface-container-low py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="border-l-4 border-primary-container pl-8 max-w-2xl">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Commercial
            </p>
            <h2
              className="font-display uppercase leading-none text-on-surface mb-4"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Commercial Glazing
            </h2>
            <p className="font-sans text-base text-on-surface/70 leading-relaxed mb-6">
              We do commercial retrofit double glazing, shopfront glass, office partitions,
              and strata glazing across Melbourne. Contact us to discuss your project.
            </p>
            <Link
              href="/contact/"
              className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-widest text-on-surface/70 hover:text-on-surface transition-colors duration-150"
            >
              Contact Us →
            </Link>
          </div>
        </div>
      </section>

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
