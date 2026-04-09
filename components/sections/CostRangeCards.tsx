import Link from 'next/link'
import { Check } from 'lucide-react'
import type { CostRangeCard } from '@/data/cost-ranges'

export type { CostRangeCard }

export interface CostRangeCardsProps {
  heading?: string
  subheading?: string
  lastUpdated?: string
  cards: CostRangeCard[]
  variant?: 'home' | 'pricing'
  className?: string
}

const fmt = new Intl.NumberFormat('en-AU', {
  style: 'currency',
  currency: 'AUD',
  maximumFractionDigits: 0,
})

export function CostRangeCards({
  heading = 'Instant Cost Benchmarks',
  subheading,
  lastUpdated,
  cards,
  variant = 'home',
  className = '',
}: CostRangeCardsProps) {
  const lgCols = 'lg:grid-cols-3'
  const isPricing = variant === 'pricing'

  return (
    <section className={`bg-surface py-16 md:py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-4">

        {/* Section header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-12 md:mb-16">
          <div>
            <h2
              className="font-display uppercase leading-none text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heading}
            </h2>
            {subheading && (
              <p className="font-sans text-base text-on-surface/55 mt-3 max-w-xl">
                {subheading}
              </p>
            )}
          </div>
          {lastUpdated && (
            <p className="font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-on-surface/40 shrink-0">
              Pricing updated: {lastUpdated}
            </p>
          )}
        </div>

        {/* Card grid — outer border + 2px gap creates the internal dividers */}
        <div
          className={`border-2 border-on-surface bg-on-surface grid grid-cols-1 sm:grid-cols-2 ${lgCols} gap-[2px]`}
        >
          {cards.map((card) => {
            const {
              id,
              eyebrow,
              title,
              subtitle,
              priceFrom,
              priceTo,
              perUnitLabel,
              inclusions,
              footnote,
              cta,
              highlighted,
            } = card

            const cardBg = highlighted ? 'bg-primary-container' : 'bg-surface'
            const textPrimary = highlighted ? 'text-on-primary-fixed' : 'text-on-surface'
            const textMuted = highlighted ? 'text-on-primary-fixed/60' : 'text-on-surface/50'
            const checkColor = highlighted ? 'text-on-primary-fixed' : 'text-primary'
            const cardPad = isPricing ? 'p-8 md:p-10' : 'p-7 md:p-8'

            return (
              <article
                key={id}
                aria-labelledby={`crc-title-${id}`}
                className={`relative flex flex-col ${cardBg} ${cardPad}`}
              >
                {/* Highlighted eyebrow strip — sits at top, bleeds to card edges */}
                {highlighted && eyebrow && (
                  <div
                    aria-label={eyebrow}
                    className="bg-inverse-surface text-inverse-on-surface font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] px-3 py-2 text-center -mx-7 -mt-7 md:-mx-8 md:-mt-8 mb-7 md:mb-8"
                  >
                    {eyebrow}
                  </div>
                )}

                {/* Non-highlighted eyebrow — inline small cap */}
                {!highlighted && eyebrow && (
                  <p className={`font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] ${textMuted} mb-3`}>
                    {eyebrow}
                  </p>
                )}

                {/* Scenario title */}
                <h3
                  id={`crc-title-${id}`}
                  className={`font-headline text-base font-semibold uppercase tracking-wide ${textPrimary} leading-snug mb-1`}
                >
                  {title}
                </h3>

                {/* Subtitle */}
                <p className={`font-sans text-sm ${textMuted} mb-6`}>
                  {subtitle}
                </p>

                {/* Price range — the hero of the card */}
                <div className="mb-2">
                  <p className={`font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] ${textMuted} mb-1`}>
                    From
                  </p>
                  <div
                    className={`font-display uppercase leading-[0.9] ${textPrimary}`}
                    style={{ fontSize: 'clamp(2.5rem, 5vw, 3.75rem)' }}
                    aria-label={`From ${fmt.format(priceFrom)} to ${fmt.format(priceTo)}`}
                  >
                    <span className="block">{fmt.format(priceFrom)} –</span>
                    <span className="block">{fmt.format(priceTo)}</span>
                  </div>
                </div>

                {/* Per-unit anchor */}
                {perUnitLabel && (
                  <p className={`font-sans text-sm font-semibold ${textMuted} mb-6`}>
                    {perUnitLabel}
                  </p>
                )}

                {/* Inclusions list */}
                <ul className="flex flex-col gap-2.5 flex-1 mb-6" aria-label="What's included">
                  {inclusions.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        aria-hidden="true"
                        className={`${checkColor} mt-0.5 shrink-0`}
                      />
                      <span className={`font-headline text-sm font-semibold uppercase tracking-wide ${textPrimary}`}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Footnote — pricing variant only */}
                {isPricing && footnote && (
                  <p className={`font-sans text-xs ${textMuted} mb-6 leading-relaxed`}>
                    {footnote}
                  </p>
                )}

                {/* CTA */}
                <Link
                  href={cta.href}
                  className={[
                    'block w-full text-center font-headline text-sm font-semibold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors duration-150',
                    highlighted
                      ? 'bg-inverse-surface text-inverse-on-surface hover:bg-on-surface/80'
                      : 'border-2 border-on-surface text-on-surface hover:bg-inverse-surface hover:text-inverse-on-surface',
                  ].join(' ')}
                >
                  <span aria-hidden="true">{cta.label}</span>
                  <span className="sr-only">{cta.label} for {title}</span>
                </Link>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
