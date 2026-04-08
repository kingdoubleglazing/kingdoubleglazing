import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { suburbs } from '@/data/suburbs'
import { HeroSection } from '@/components/sections/HeroSection'
import { CtaBanner } from '@/components/sections/CtaBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Service Areas Melbourne | Suburbs We Serve',
  description:
    "King Double Glazing serves Melbourne's inner and outer eastern suburbs. Retrofit double glazing, shower screens and glass from $495/m². Find your suburb.",
  path: '/areas/',
})

const collectionPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Double Glazing Melbourne Service Areas',
  description:
    "King Double Glazing's Melbourne service area index — retrofit double glazing, shower screens and glass services across inner and outer eastern Melbourne suburbs.",
  url: `${BASE_URL}/areas/`,
  mainEntity: {
    '@type': 'ItemList',
    numberOfItems: suburbs.length,
    itemListElement: suburbs.map(({ name, slug }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: `Double Glazing ${name}`,
      url: `${BASE_URL}/areas/${slug}/`,
    })),
  },
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Service Areas', href: '/areas/' },
])

export default function AreasPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection
        compact
        badge="Melbourne Service Areas"
        headlineWhite="Double Glazing"
        headlineYellow="Near You"
        subtext={`Retrofit double glazing, shower screens and glass services across ${suburbs.length} Melbourne suburbs. Transparent pricing from $495/m².`}
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: 'Call Now', href: 'tel:+61406470595' }}
        imageSrc="/hero/hero-home.webp"
        imageAlt="Double glazed windows installed in a Melbourne home"
      />

      {/* Suburb grid */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section header */}
          <div className="mb-10 md:mb-14">
            <p className="font-headline font-semibold uppercase tracking-widest text-xs text-primary mb-3">
              {suburbs.length} suburbs covered
            </p>
            <h2
              className="font-display uppercase leading-[0.9] text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              Find Your<br />Suburb
            </h2>
            <p className="font-sans text-on-surface/60 mt-4 max-w-xl text-base leading-relaxed">
              Select your suburb for local pricing, availability and service details. Can&apos;t
              see yours?{' '}
              <Link href="/contact/" className="text-primary underline underline-offset-2 hover:text-primary-fixed-dim transition-colors duration-150">
                Get in touch
              </Link>{' '}
              — we cover all of Melbourne.
            </p>
          </div>

          {/* Grid */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {suburbs.map(({ name, slug, postcode, region }) => (
              <li key={slug}>
                <Link
                  href={`/areas/${slug}/`}
                  className="group flex items-center justify-between bg-surface-container-lowest ghost-border border-l-4 border-primary p-5 hover:bg-white transition-colors duration-150"
                >
                  <div>
                    <p className="font-headline uppercase tracking-widest text-[0.65rem] text-on-surface/40 mb-1">
                      {region}
                    </p>
                    <p className="font-headline font-bold uppercase tracking-wide text-on-surface text-base leading-tight">
                      {name}
                    </p>
                    <p className="font-sans text-xs text-on-surface/50 mt-0.5">
                      VIC {postcode}
                    </p>
                  </div>
                  <span
                    className="text-primary font-headline text-xl leading-none group-hover:translate-x-1 transition-transform duration-150 shrink-0 ml-4"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Internal links strip */}
          <nav
            className="mt-14 pt-10 border-t border-surface-container"
            aria-label="Related services"
          >
            <p className="font-headline uppercase tracking-widest text-xs text-on-surface/40 mb-5">
              Our services
            </p>
            <ul className="flex flex-wrap gap-3">
              {[
                { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
                { label: 'Shower Screens', href: '/shower-screens/' },
                { label: 'Glass Splashbacks', href: '/glass-splashbacks/' },
                { label: 'Custom Mirrors', href: '/custom-mirrors/' },
                { label: 'Emergency Glass', href: '/emergency-glass/' },
                { label: 'Commercial Glazing', href: '/commercial-glazing/' },
              ].map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="inline-block font-headline text-xs font-semibold uppercase tracking-widest px-4 py-2 bg-surface-container ghost-border text-on-surface/70 hover:bg-surface-container-highest hover:text-on-surface transition-colors duration-150"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

        </div>
      </section>

      <CtaBanner
        heading={"Your Suburb.\nTransparent Price."}
        subtext="Get a firm, itemised estimate for your suburb in 60 seconds. No sales calls, no site visit required."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
      />
    </>
  )
}
