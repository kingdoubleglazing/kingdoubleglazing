'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { TrustBar } from '@/components/sections/TrustBar'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { AdaptorDisclosure } from '@/components/AdaptorDisclosure'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'
import type { ServicesPageQuery, ServicesPageQueryVariables } from '@/tina/__generated__/types'
import type { EmbeddedFaq } from '@/lib/types'

type TinaServicesResult = { data: ServicesPageQuery; query: string; variables: ServicesPageQueryVariables }

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

export function ServicesPageClient({
  tinaServices,
  faqs,
  phone,
  phoneHref,
}: {
  tinaServices: TinaServicesResult
  faqs: EmbeddedFaq[]
  phone: string
  phoneHref: string
}) {
  const { data } = useTina(tinaServices)
  const page = data.servicesPage

  const tf = (obj: object, field: string) => {
    try { return tinaField(obj, field) || undefined } catch { return undefined }
  }

  return (
    <>
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
              const raw = page?.heroHeading ?? 'One Team.\nEvery Job.'
              const [line1, line2] = raw.split('\n')
              return (
                <span data-tina-field={tf(page, 'heroHeading') || undefined}>
                  {line1}{line2 && <><br /><span className="text-primary-container">{line2}</span></>}
                </span>
              )
            })()}
          </h1>
          <p
            data-tina-field={tf(page, 'heroSubtext') || undefined}
            className="font-sans text-base text-white max-w-lg leading-relaxed"
          >
            {page?.heroSubtext ?? 'Retrofit double glazing is our main business — we add a second pane to your existing windows. We also do emergency repairs, shower screens, splashbacks, mirrors, and commercial glazing. 10-year warranty on every job.'}
          </p>
        </div>
      </section>

      <TrustBar />

      {(page?.serviceSections ?? []).map((section, idx) => {
        if (!section) return null
        const visual = SECTION_VISUAL[section.id ?? ''] ?? {}
        const onDark = visual.danger || visual.dark
        const textClass = visual.danger ? 'text-white' : onDark ? 'text-inverse-on-surface' : 'text-on-surface'
        const checkClass = visual.danger ? 'text-white' : 'text-primary-container'
        const isEmergency = section.id === 'emergency'
        const isMirrors = section.id === 'mirrors'

        return (
          <div key={section.id ?? idx}>
            <ServiceSection
              id={section.id ?? ''}
              eyebrow={section.eyebrow ?? ''}
              heading={section.heading ?? ''}
              featured={visual.featured}
              dark={visual.dark}
              danger={visual.danger}
              image={visual.image}
              imageAlt={visual.imageAlt}
              tinaEyebrow={tf(section, 'eyebrow')}
              tinaHeading={tf(section, 'heading')}
            >
              <p
                data-tina-field={tf(section, 'bodyText') || undefined}
                className={`font-sans text-base ${textClass} leading-relaxed mb-6`}
              >
                {section.bodyText}
              </p>
              <ul className="space-y-3 mb-8">
                {(section.bullets ?? []).map((b, bi) => (
                  <li
                    key={bi}
                    data-tina-field={tf(section, 'bullets') || undefined}
                    className={`flex items-start gap-3 font-sans text-sm ${textClass}`}
                  >
                    <span className={`${checkClass} font-bold mt-0.5 shrink-0`}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              {isEmergency ? (
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-2 bg-black text-white font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-black/80 transition-colors duration-150"
                >
                  <Phone size={16} aria-hidden="true" />
                  Call {phone} Now
                </a>
              ) : isMirrors ? (
                <Link
                  href={section.primaryCta?.href ?? '/contact/'}
                  className="inline-flex items-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-surface/80 transition-colors duration-150"
                >
                  <span data-tina-field={section.primaryCta ? tf(section.primaryCta, 'label') : undefined}>
                    {section.primaryCta?.label ?? 'Get a Quote →'}
                  </span>
                </Link>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {section.primaryCta && (
                    <Link
                      href={section.primaryCta.href ?? '/contact/'}
                      className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
                    >
                      <span data-tina-field={tf(section.primaryCta, 'label') || undefined}>
                        {section.primaryCta.label}
                      </span>
                    </Link>
                  )}
                  {section.secondaryCta && (
                    <Link
                      href={section.secondaryCta.href ?? '/contact/'}
                      className="inline-flex items-center gap-3 bg-transparent text-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-on-surface/30 hover:bg-on-surface/10 transition-colors duration-150"
                    >
                      <span data-tina-field={tf(section.secondaryCta, 'label') || undefined}>
                        {section.secondaryCta.label}
                      </span>
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
        heading={page?.faqHeading ?? 'Service Questions'}
        subheading={page?.faqSubheading ?? 'Common questions about what we do.'}
        items={faqs}
        tinaHeading={tf(page, 'faqHeading')}
        tinaSubheading={tf(page, 'faqSubheading')}
      />

      <FreeAdviceBlock />

      <CtaBanner
        heading={"Ready to Get\nStarted?"}
        subtext="Generate your own quote in minutes, or call us directly for any service."
        primaryCta={{ label: 'Generate My Quote', href: '/instant-estimate/' }}
        secondaryCta={{ label: phone, href: phoneHref }}
      />
    </>
  )
}

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
  tinaEyebrow,
  tinaHeading,
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
  tinaEyebrow?: string
  tinaHeading?: string
}) {
  const bg = danger ? 'bg-danger' : dark ? 'bg-inverse-surface' : featured ? 'bg-surface' : 'bg-surface-container-lowest'
  const border = featured ? 'border-l-4 border-primary-container' : ''
  const onDark = dark || danger

  return (
    <section id={id} className={`${bg} py-16 md:py-20 scroll-mt-20`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className={`grid grid-cols-1 ${image ? 'lg:grid-cols-2 gap-12 lg:gap-20 items-center' : ''}`}>
          <div className={`${border} ${border ? 'pl-8' : ''}`}>
            <p
              data-tina-field={tinaEyebrow || undefined}
              className={`font-headline text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${onDark ? 'text-white/80' : 'text-primary'}`}
            >
              {eyebrow}
            </p>
            <h2
              data-tina-field={tinaHeading || undefined}
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
