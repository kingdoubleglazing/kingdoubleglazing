import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export interface ServiceSectionBlockData {
  __typename?: string
  id?: string | null
  eyebrow?: string | null
  heading?: string | null
  bodyText?: string | null
  bullets?: (string | null)[] | null
  variant?: string | null
  imageSrc?: string | null
  imageAlt?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  tina?: {
    eyebrow?: string
    heading?: string
    bodyText?: string
    bullets?: string
  }
}

export function ServiceSectionBlock({ block }: { block: ServiceSectionBlockData }) {
  const settings = getSiteSettings()
  const variant = block.variant ?? 'default'
  const isDanger = variant === 'danger'
  const isDark = variant === 'dark'
  const isFeatured = variant === 'featured'
  const onDark = isDanger || isDark

  const bg = isDanger
    ? 'bg-danger'
    : isDark
    ? 'bg-inverse-surface'
    : isFeatured
    ? 'bg-surface'
    : 'bg-surface-container-lowest'

  const textClass = isDanger ? 'text-white' : onDark ? 'text-inverse-on-surface' : 'text-on-surface'
  const checkClass = isDanger ? 'text-white' : 'text-primary-container'
  const eyebrowClass = onDark ? 'text-white/80' : 'text-primary'
  const headingClass = onDark ? 'text-white' : 'text-on-surface'
  const border = isFeatured ? 'border-l-4 border-primary-container pl-8' : ''
  const isEmergency = block.id === 'emergency'
  const isMirrors = block.id === 'mirrors'

  return (
    <section id={block.id ?? undefined} className={`${bg} py-16 md:py-20 scroll-mt-20`}>
      <div className="max-w-5xl mx-auto px-4">
        <div className={`grid grid-cols-1 ${block.imageSrc ? 'lg:grid-cols-2 gap-12 lg:gap-20 items-center' : ''}`}>
          <div className={border}>
            <p
              data-tina-field={block.tina?.eyebrow}
              className={`font-headline text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${eyebrowClass}`}
            >
              {block.eyebrow}
            </p>
            <h2
              data-tina-field={block.tina?.heading}
              className={`font-display uppercase leading-none mb-8 ${headingClass}`}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {block.heading}
            </h2>
            <p
              data-tina-field={block.tina?.bodyText}
              className={`font-sans text-base ${textClass} leading-relaxed mb-6`}
            >
              {block.bodyText}
            </p>
            {(block.bullets ?? []).filter(Boolean).length > 0 && (
              <ul className="space-y-3 mb-8">
                {(block.bullets ?? []).filter(Boolean).map((b, i) => (
                  <li
                    key={i}
                    data-tina-field={block.tina?.bullets}
                    className={`flex items-start gap-3 font-sans text-sm ${textClass}`}
                  >
                    <span className={`${checkClass} font-bold mt-0.5 shrink-0`}>✓</span>
                    {b}
                  </li>
                ))}
              </ul>
            )}
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
                href={block.primaryCta?.href ?? '/contact/'}
                className="inline-flex items-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-surface/80 transition-colors duration-150"
              >
                {block.primaryCta?.label ?? 'Get a Quote →'}
              </Link>
            ) : (
              <div className="flex flex-wrap gap-3">
                {block.primaryCta?.label && (
                  <Link
                    href={block.primaryCta.href ?? '/contact/'}
                    className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
                  >
                    {block.primaryCta.label}
                  </Link>
                )}
                {block.secondaryCta?.label && (
                  <Link
                    href={block.secondaryCta.href ?? '/contact/'}
                    className="inline-flex items-center gap-3 bg-transparent text-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-on-surface/30 hover:bg-on-surface/10 transition-colors duration-150"
                  >
                    {block.secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>
          {block.imageSrc && (
            <div className="relative min-h-[280px] md:min-h-[400px] overflow-hidden">
              <Image
                src={block.imageSrc}
                alt={block.imageAlt ?? ''}
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
