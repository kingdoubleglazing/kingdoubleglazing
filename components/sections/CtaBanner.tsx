import Link from 'next/link'
import { getSiteSettings } from '@/lib/site-settings'

interface CtaBannerProps {
  heading?: string
  subtext?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export function CtaBanner({
  heading = "Stop.\nDon't Overpay.",
  subtext = 'Get a transparent, itemised estimate in minutes. No sales calls.',
  primaryCta = { label: 'Get Instant Estimate', href: '/instant-estimate/' },
  secondaryCta,
}: CtaBannerProps) {
  if (!secondaryCta) {
    const settings = getSiteSettings()
    secondaryCta = { label: settings.phone, href: settings.phoneHref }
  }
  return (
    <section className="bg-primary-container py-16 md:py-24 overflow-hidden relative">

      {/* Oversized background stamp — structural texture */}
      <span
        className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display uppercase leading-none text-on-primary-fixed/[0.06]"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
        aria-hidden="true"
      >
        KING
      </span>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Headline block */}
          <div>
            <h2
              className="font-display uppercase leading-[0.88] text-on-primary-fixed"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              {heading.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="font-sans text-base text-on-primary-fixed mt-5 max-w-md leading-relaxed mx-auto">
              {subtext}
            </p>
          </div>

          {/* CTA cluster */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={primaryCta.href}
              className="inline-flex items-center justify-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-surface/80 transition-colors duration-150"
            >
              {primaryCta.label}
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href={secondaryCta.href}
              className="inline-flex items-center justify-center gap-3 bg-transparent text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 ghost-border hover:bg-on-primary-fixed/10 transition-colors duration-150"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M3 1h3l1.5 3.5-1.5 1a8.5 8.5 0 004.5 4.5l1-1.5L15 10v3a1 1 0 01-1 1A13 13 0 012 2a1 1 0 011-1z" fill="currentColor"/>
              </svg>
              {secondaryCta.label}
            </Link>
          </div>

          {/* Trust footnote */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              'Price locked at quote',
              '10-year warranty',
              'We beat any quote by 30%',
            ].map((item) => (
              <p
                key={item}
                className="font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/80"
              >
                ✓ {item}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
