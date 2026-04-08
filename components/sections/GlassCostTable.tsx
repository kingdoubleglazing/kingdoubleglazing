import Link from 'next/link'
import { Square, Sun, VolumeX, Layers, ArrowRight, type LucideIcon } from 'lucide-react'
import { glassTypes, type GlassType, type GlassIcon } from '@/data/glass-types'

// ── Icon map ─────────────────────────────────────────────────────────────────

const ICON_MAP: Record<GlassIcon, LucideIcon> = {
  'square':   Square,
  'sun':      Sun,
  'volume-x': VolumeX,
  'layers':   Layers,
}

// ── Helpers ───────────────────────────────────────────────────────────────────

// Estimated glass area for a standard Melbourne home (m²), used to compute project cost
const TYPICAL_AREA_M2 = 20

function barWidth(value: number, max: number) {
  return `${Math.round((value / max) * 100)}%`
}

// ── Component ─────────────────────────────────────────────────────────────────

interface GlassCostTableProps {
  heading?: string
  subheading?: string
}

export function GlassCostTable({
  heading = 'Cost by Glass Type',
  subheading = 'Same frames. Same installation. The only variable is the glass you choose.',
}: GlassCostTableProps) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Glass Pricing
          </p>
          <h2
            className="font-display uppercase leading-[0.88] text-on-surface"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {heading}
          </h2>
          <p className="font-sans text-base text-on-surface/55 mt-4 max-w-xl leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Card grid — 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="border-2 border-on-surface bg-on-surface grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
          {glassTypes.map((glass, i) => (
            <GlassCard key={glass.id} glass={glass} index={i} />
          ))}
        </div>

        {/* Footnote + CTA row */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-on-surface/35">
            * Prices per m² of glass area. Typical home estimate assumes {TYPICAL_AREA_M2} m².
          </p>
          <Link
            href="/instant-estimate/"
            className="shrink-0 inline-flex items-center gap-2 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            Get my exact price
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  )
}

// ── Card ──────────────────────────────────────────────────────────────────────

function GlassCard({ glass, index }: { glass: GlassType; index: number }) {
  const Icon = ICON_MAP[glass.icon]
  const isEntry = index === 0
  const typicalCost = glass.priceFrom * TYPICAL_AREA_M2

  const fmt = new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  })

  return (
    <article
      aria-labelledby={`gct-${glass.id}`}
      className={`relative flex flex-col p-7 ${isEntry ? 'bg-primary-container' : 'bg-surface'}`}
    >
      {/* Tier label */}
      {isEntry && (
        <div className="bg-inverse-surface text-inverse-on-surface font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] px-3 py-2 text-center -mx-7 -mt-7 mb-7">
          Entry Point
        </div>
      )}

      {/* Icon */}
      <Icon
        size={28}
        strokeWidth={1.5}
        aria-hidden="true"
        className={`mb-5 shrink-0 ${isEntry ? 'text-on-primary-fixed' : 'text-primary'}`}
      />

      {/* Name */}
      <h3
        id={`gct-${glass.id}`}
        className={`font-headline text-base font-semibold uppercase tracking-wide leading-snug mb-1 ${isEntry ? 'text-on-primary-fixed' : 'text-on-surface'}`}
      >
        {glass.name}
      </h3>

      <p className={`font-sans text-sm leading-relaxed mb-6 ${isEntry ? 'text-on-primary-fixed/70' : 'text-on-surface/55'}`}>
        {glass.shortDescription}
      </p>

      {/* Price per m² — headline number */}
      <div className="mb-1">
        <p className={`font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] mb-1 ${isEntry ? 'text-on-primary-fixed/60' : 'text-on-surface/40'}`}>
          From
        </p>
        <p
          className={`font-display uppercase leading-none ${isEntry ? 'text-on-primary-fixed' : 'text-on-surface'}`}
          style={{ fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
        >
          ${glass.priceFrom}/m²
        </p>
      </div>

      {/* Typical home estimate */}
      <p className={`font-headline text-sm font-semibold uppercase tracking-wide mb-6 ${isEntry ? 'text-on-primary-fixed/60' : 'text-on-surface/40'}`}>
        ~{fmt.format(typicalCost)} typical home
      </p>

      {/* Spec bars */}
      <dl className={`border-t pt-5 mb-6 space-y-4 ${isEntry ? 'border-on-primary-fixed/20' : 'border-on-surface/10'}`}>

        <SpecBar
          label="Thermal (U-value)"
          display={`${glass.uValue} W/m²K`}
          // Lower U-value = better; invert for bar width
          barPct={barWidth(3.5 - glass.uValue, 3.5)}
          isEntry={isEntry}
        />

        <SpecBar
          label="Acoustic (Rw)"
          display={`${glass.rwRating} dB`}
          barPct={barWidth(glass.rwRating, 55)}
          isEntry={isEntry}
        />

        <SpecBar
          label="Heat reduction"
          display={`${glass.heatReduction}%`}
          barPct={barWidth(glass.heatReduction, 100)}
          isEntry={isEntry}
        />

      </dl>

      {/* Best for */}
      <p className={`font-headline text-[0.75rem] font-semibold uppercase tracking-[0.15em] mb-6 ${isEntry ? 'text-on-primary-fixed/50' : 'text-on-surface/40'}`}>
        Best for: <span className={isEntry ? 'text-on-primary-fixed' : 'text-primary'}>{glass.bestFor}</span>
      </p>

      {/* CTA */}
      <Link
        href={`/instant-estimate/?glass=${glass.id}`}
        className={[
          'mt-auto block w-full text-center font-headline text-sm font-semibold uppercase tracking-[0.12em] py-3.5 px-5 transition-colors duration-150',
          isEntry
            ? 'bg-inverse-surface text-inverse-on-surface hover:bg-on-surface/80'
            : 'border-2 border-on-surface text-on-surface hover:bg-inverse-surface hover:text-inverse-on-surface',
        ].join(' ')}
      >
        Estimate with this glass
      </Link>
    </article>
  )
}

// ── Spec bar ──────────────────────────────────────────────────────────────────

function SpecBar({
  label,
  display,
  barPct,
  isEntry,
}: {
  label: string
  display: string
  barPct: string
  isEntry: boolean
}) {
  const muted = isEntry ? 'text-on-primary-fixed/50' : 'text-on-surface/40'
  const bold = isEntry ? 'text-on-primary-fixed' : 'text-on-surface'
  const trackBg = isEntry ? 'bg-on-primary-fixed/20' : 'bg-on-surface/10'
  const fillBg = isEntry ? 'bg-on-primary-fixed' : 'bg-primary-container'

  return (
    <div>
      <div className="flex items-baseline justify-between gap-2 mb-1.5">
        <dt className={`font-headline text-[0.75rem] font-semibold uppercase tracking-[0.15em] ${muted} shrink-0`}>
          {label}
        </dt>
        <dd className={`font-headline text-sm font-bold ${bold}`}>
          {display}
        </dd>
      </div>
      <div className={`h-0.5 w-full ${trackBg}`} aria-hidden="true">
        <div className={`h-full ${fillBg}`} style={{ width: barPct }} />
      </div>
    </div>
  )
}
