import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { SchemaScript } from '@/components/SchemaScript'
import { TrustBar } from '@/components/sections/TrustBar'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { AdaptorDisclosure } from '@/components/AdaptorDisclosure'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SITE_SETTINGS_QUERY, FAQS_QUERY, SERVICES_PAGE_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings, FaqItem, ServicesPage } from '@/sanity/types'

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] })
  return buildMetadata({
    title: 'Double Glazing Services Melbourne | Retrofit, Emergency Glass, Shower Screens | King Double Glazing',
    description:
      `Retrofit double glazing from ${settings.pricing.retrofitFromDisplay}, emergency glass repair, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne. 10-year warranty.`,
    path: '/services/',
  })
}

const SECTION_VISUAL: Record<string, {
  featured?: boolean
  dark?: boolean
  danger?: boolean
  image?: string
  imageAlt?: string
}> = {
  retrofit: { featured: true, image: '/stock/double-glazed-2000px.webp', imageAlt: 'Double glazed window close-up — retrofit installation Melbourne' },
  emergency: { danger: true, image: '/stock/AdobeStock_323273938.webp', imageAlt: 'Emergency glass repair — glazier on site in Melbourne' },
  'shower-screens': { image: '/stock/shower-pane-1000x667-1.webp', imageAlt: 'Semi-frameless shower screen installation Melbourne' },
  splashbacks: { dark: true, image: '/stock/splashback-2.webp', imageAlt: 'Kitchen glass splashback installation Melbourne' },
  mirrors: {},
  commercial: { dark: true, image: '/hero/hero-commercial-glazing.webp', imageAlt: 'Commercial glazing — shopfront and office glass Melbourne' },
}

export default async function ServicesPage() {
  const [settings, servicesPage, retrofitFaqs, emergencyFaqs, servicesFaqs] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] }),
    sanityFetch<ServicesPage>({ query: SERVICES_PAGE_QUERY, tags: ['servicesPage'] }),
    sanityFetch<FaqItem[]>({ query: FAQS_QUERY, params: { group: 'retrofit' }, tags: ['faqItem'] }),
    sanityFetch<FaqItem[]>({ query: FAQS_QUERY, params: { group: 'emergency' }, tags: ['faqItem'] }),
    sanityFetch<FaqItem[]>({ query: FAQS_QUERY, params: { group: 'services' }, tags: ['faqItem'] }),
  ])

  const servicesPageSchemas = [
    buildWebPageSchema({
      url: `${BASE_URL}/services/`,
      name: 'Double Glazing Services Melbourne | Retrofit, Emergency Glass, Shower Screens | King Double Glazing',
      description: `Retrofit double glazing from ${settings.pricing.retrofitFromDisplay}, emergency glass repair, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne. 10-year warranty.`,
      breadcrumb: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'Services', url: `${BASE_URL}/services/` },
      ],
    }),
    buildServiceSchema({
      name: 'Retrofit Double Glazing Melbourne',
      description: 'We add a second layer of glass to your existing windows. Works on timber, aluminium, and steel frames. Installed in one day. Up to 70% quieter, up to 70% less heat loss. From $595/m².',
      url: `${BASE_URL}/services/#retrofit`,
      priceRange: settings.pricing.retrofitFromDisplay,
    }),
    buildServiceSchema({
      name: 'Emergency Glass Repair Melbourne',
      description: 'Same-day emergency glass repair across Melbourne. Broken windows, shopfronts, sliding doors, skylights. Temporary boarding available. Insurance reports on request.',
      url: `${BASE_URL}/services/#emergency`,
    }),
    buildFaqSchema([
      ...retrofitFaqs.map(f => ({ question: f.q, answer: f.a })),
      ...emergencyFaqs.map(f => ({ question: f.q, answer: f.a })),
    ]),
  ]
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
            {(() => {
              const [line1, line2] = (servicesPage?.heroHeading ?? 'One Team.\nEvery Job.').split('\n')
              return <>{line1}{line2 && <><br /><span className="text-primary-container">{line2}</span></>}</>
            })()}
          </h1>
          <p className="font-sans text-base text-white max-w-lg leading-relaxed">
            {servicesPage?.heroSubtext ?? 'Retrofit double glazing is our main business — we add a second pane to your existing windows. We also do emergency repairs, shower screens, splashbacks, mirrors, and commercial glazing. 10-year warranty on every job.'}
          </p>
        </div>
      </section>

      <TrustBar />

      {(servicesPage?.serviceSections ?? []).map((section, idx) => {
        const visual = SECTION_VISUAL[section.id] ?? {}
        const onDark = visual.danger || visual.dark
        const textClass = visual.danger ? 'text-white' : onDark ? 'text-inverse-on-surface' : 'text-on-surface'
        const checkClass = visual.danger ? 'text-white' : 'text-primary-container'
        const isEmergency = section.id === 'emergency'
        const isMirrors = section.id === 'mirrors'

        return (
          <div key={section.id}>
            <ServiceSection
              id={section.id}
              eyebrow={section.eyebrow}
              heading={section.heading}
              featured={visual.featured}
              dark={visual.dark}
              danger={visual.danger}
              image={visual.image}
              imageAlt={visual.imageAlt}
            >
              <p className={`font-sans text-base ${textClass} leading-relaxed mb-6`}>
                {section.bodyText}
              </p>
              <ul className="space-y-3 mb-8">
                {(section.bullets ?? []).map(b => (
                  <li key={b} className={`flex items-start gap-3 font-sans text-sm ${textClass}`}>
                    <span className={`${checkClass} font-bold mt-0.5 shrink-0`}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              {isEmergency ? (
                <a
                  href={settings.phoneHref}
                  className="inline-flex items-center gap-2 bg-black text-white font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-black/80 transition-colors duration-150"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call {settings.phone} Now
                </a>
              ) : isMirrors ? (
                <Link
                  href={section.primaryCta?.href ?? '/contact/'}
                  className="inline-flex items-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-surface/80 transition-colors duration-150"
                >
                  {section.primaryCta?.label ?? 'Get a Quote →'}
                </Link>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {section.primaryCta && (
                    <Link
                      href={section.primaryCta.href}
                      className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
                    >
                      {section.primaryCta.label}
                    </Link>
                  )}
                  {section.secondaryCta && (
                    <Link
                      href={section.secondaryCta.href}
                      className="inline-flex items-center gap-3 bg-transparent text-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-on-surface/30 hover:bg-on-surface/10 transition-colors duration-150"
                    >
                      {section.secondaryCta.label}
                    </Link>
                  )}
                </div>
              )}
            </ServiceSection>
            {idx === 0 && <AdaptorDisclosure />}
          </div>
        )
      })}

      <FAQ
        heading={servicesPage?.faqHeading ?? 'Service Questions'}
        subheading={servicesPage?.faqSubheading ?? 'Common questions about what we do.'}
        items={servicesFaqs.map(f => ({ q: f.q, a: f.a }))}
      />

      <FreeAdviceBlock />

      <CtaBanner
        heading={"Ready to Get\nStarted?"}
        subtext="Generate your own quote in minutes, or call us directly for any service."
        primaryCta={{ label: 'Generate My Quote', href: '/instant-estimate/' }}
        secondaryCta={{ label: settings.phone, href: settings.phoneHref }}
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
            <p className={`font-headline text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${onDark ? 'text-white/80' : 'text-primary'}`}>
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
