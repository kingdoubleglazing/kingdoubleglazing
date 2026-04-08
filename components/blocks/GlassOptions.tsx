import Link from 'next/link'
import { Square, Sun, VolumeX, Layers, ArrowRight, type LucideIcon } from 'lucide-react'
import { glassTypes, type GlassType, type GlassIcon } from '@/data/glass-types'

// ── Icon map ────────────────────────────────────────────────────────────────

const ICON_MAP: Record<GlassIcon, LucideIcon> = {
  'square':   Square,
  'sun':      Sun,
  'volume-x': VolumeX,
  'layers':   Layers,
}

// ── Types ────────────────────────────────────────────────────────────────────

interface GlassOptionsProps {
  variant?: 'preview' | 'full'
  heading?: string
  subheading?: string
}

// ── Component ────────────────────────────────────────────────────────────────

export function GlassOptions({
  variant = 'full',
  heading = 'Choose Your Glass',
  subheading,
}: GlassOptionsProps) {
  const items = variant === 'preview' ? glassTypes.slice(0, 3) : glassTypes
  const isPreview = variant === 'preview'

  return (
    <section className="bg-surface-container-lowest py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2
            className="font-display uppercase leading-none text-on-surface"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {heading}
          </h2>
          {subheading && (
            <p className="font-sans text-base text-on-surface/55 mt-4 max-w-xl leading-relaxed">
              {subheading}
            </p>
          )}
        </div>

        {/* Grid */}
        <div
          className={`grid grid-cols-1 gap-0 ghost-border ${
            isPreview
              ? 'sm:grid-cols-2 lg:grid-cols-3'
              : 'sm:grid-cols-2 lg:grid-cols-4'
          }`}
        >
          {items.map((glass, i) => (
            <GlassCard
              key={glass.id}
              glass={glass}
              index={i}
              compact={isPreview}
            />
          ))}
        </div>

        {/* Preview footer CTA */}
        {isPreview && (
          <div className="mt-10 flex items-center gap-3">
            <div className="h-px flex-1 bg-on-surface/10" />
            <Link
              href="/double-glazing/glass-types/"
              className="group inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-[0.12em] text-on-surface/60 hover:text-on-surface transition-colors duration-150"
            >
              Compare all glass types
              <ArrowRight
                size={14}
                aria-hidden="true"
                className="group-hover:translate-x-0.5 transition-transform duration-150 motion-safe:transition-transform"
              />
            </Link>
            <div className="h-px flex-1 bg-on-surface/10" />
          </div>
        )}

      </div>
    </section>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────

function GlassCard({
  glass,
  index,
  compact,
}: {
  glass: GlassType
  index: number
  compact: boolean
}) {
  const Icon = ICON_MAP[glass.icon]
  const cardBg = index % 2 === 0 ? 'bg-surface hover:bg-surface-container-lowest' : 'bg-surface-container-low hover:bg-surface-container'

  return (
    <article
      id={glass.id}
      aria-labelledby={`glass-title-${glass.id}`}
      className={`group relative flex flex-col ghost-border p-7 card-interactive animate-stagger-child transition-colors duration-150 ${cardBg}`}
      // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
      style={{ '--i': index } as any}
    >
      {/* Icon */}
      <Icon
        size={32}
        strokeWidth={1.5}
        aria-hidden="true"
        className="text-primary mb-5 shrink-0"
      />

      {/* Name */}
      <h3
        id={`glass-title-${glass.id}`}
        className="font-headline text-lg font-semibold uppercase tracking-wide text-on-surface leading-snug mb-2"
      >
        {glass.name}
      </h3>

      {/* Short description */}
      <p className="font-sans text-sm text-on-surface/55 leading-relaxed mb-6 flex-1">
        {glass.shortDescription}
      </p>

      {compact ? (
        // ── Preview: price only ──────────────────────────────────────────
        <div className="mt-auto">
          <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-on-surface/40 mb-1">
            From
          </p>
          <p
            className="font-display uppercase text-on-surface leading-none mb-6"
            style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)' }}
          >
            ${glass.priceFrom}/m²
          </p>
        </div>
      ) : (
        // ── Full: spec table ─────────────────────────────────────────────
        <dl className="border-t border-on-surface/10 pt-5 mb-6 space-y-3">

          <div className="flex items-baseline justify-between gap-2">
            <dt className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-on-surface/40 shrink-0">
              U-Value
            </dt>
            <dd className="font-headline text-sm font-bold text-on-surface">
              {glass.uValue}
              <span className="font-sans text-[0.65rem] font-normal text-on-surface/40 ml-1">W/m²K</span>
            </dd>
          </div>

          <div className="flex items-baseline justify-between gap-2">
            <dt className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-on-surface/40 shrink-0">
              Rw Rating
            </dt>
            <dd className="font-headline text-sm font-bold text-on-surface">
              {glass.rwRating}
              <span className="font-sans text-[0.65rem] font-normal text-on-surface/40 ml-1">dB</span>
            </dd>
          </div>

          {/* Heat reduction — visualised as a bar */}
          <div>
            <div className="flex items-baseline justify-between gap-2 mb-1.5">
              <dt className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-on-surface/40 shrink-0">
                Heat Reduction
              </dt>
              <dd className="font-headline text-sm font-bold text-on-surface">
                {glass.heatReduction}%
              </dd>
            </div>
            {/* CSS-only bar — width driven by inline style, no JS */}
            <div className="h-0.5 w-full bg-on-surface/10" aria-hidden="true">
              <div
                className="h-full bg-primary-container"
                style={{ width: `${glass.heatReduction}%` }}
              />
            </div>
          </div>

          {/* Price — value-ledger accent */}
          <div className="border-l-4 border-primary-container pl-3 pt-3 mt-1 flex items-baseline justify-between gap-2">
            <dt className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-on-surface/40 shrink-0">
              From
            </dt>
            <dd
              className="font-display uppercase text-on-surface leading-none"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
            >
              ${glass.priceFrom}/m²
            </dd>
          </div>

        </dl>
      )}

      {/* Best for */}
      <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-on-surface/40 mb-5">
        Best for: <span className="text-primary">{glass.bestFor}</span>
      </p>

      {/* CTA link */}
      <Link
        href={`/double-glazing/glass-types/#${glass.id}`}
        className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-[0.1em] text-on-surface group-hover:text-primary transition-colors duration-150"
        aria-label={`Learn more about ${glass.name}`}
      >
        Learn more
        <ArrowRight
          size={14}
          aria-hidden="true"
          className="group-hover:translate-x-0.5 transition-transform duration-150 motion-safe:transition-transform"
        />
      </Link>
    </article>
  )
}
