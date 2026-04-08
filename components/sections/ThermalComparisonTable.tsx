import Link from 'next/link'

// ── Data ─────────────────────────────────────────────────────────────────────

interface ThermalRow {
  config: string
  uValue: number        // W/m²K — lower is better
  heatReduction: number // % improvement vs single pane
  bestFor: string
  priceFrom: string
  recommended?: boolean
  isBaseline?: boolean
}

// Single pane baseline U-value
const BASELINE_U = 5.8

const rows: ThermalRow[] = [
  {
    config: 'Single Pane (existing)',
    uValue: BASELINE_U,
    heatReduction: 0,
    bestFor: 'Baseline — what you have now',
    priceFrom: '—',
    isBaseline: true,
  },
  {
    config: 'Standard Double Glazing',
    uValue: 2.7,
    heatReduction: 53,
    bestFor: 'Year-round baseline improvement',
    priceFrom: '$495/m²',
  },
  {
    config: 'Acoustic Laminated',
    uValue: 2.4,
    heatReduction: 59,
    bestFor: 'Noise priority + thermal gain',
    priceFrom: '$645/m²',
  },
  {
    config: 'Tinted Low-E Double',
    uValue: 1.8,
    heatReduction: 69,
    bestFor: 'West/north-facing rooms, bill reduction',
    priceFrom: '$595/m²',
    recommended: true,
  },
  {
    config: 'Triple Glazed',
    uValue: 1.0,
    heatReduction: 83,
    bestFor: 'Maximum efficiency, Hills & Ranges',
    priceFrom: '$795/m²',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface ThermalComparisonTableProps {
  heading?: string
  subheading?: string
}

export function ThermalComparisonTable({
  heading = 'U-Values Compared',
  subheading = 'Lower U-value = less heat escaping in winter, less heat entering in summer. Tested to AS/NZS 4666.',
}: ThermalComparisonTableProps) {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Thermal Performance
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

        {/* Rows */}
        <div className="ghost-border">
          {rows.map((row) => (
            <ThermalRow key={row.config} row={row} />
          ))}
        </div>

        {/* Key + CTA */}
        <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-wrap gap-x-8 gap-y-2">
            <p className="font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-on-surface/35">
              Lower U-value = better insulation
            </p>
            <p className="font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-on-surface/35">
              Tested to AS/NZS 4666
            </p>
          </div>
          <Link
            href="/instant-estimate/?glass=tinted-low-e"
            className="shrink-0 inline-flex items-center gap-2 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            Estimate Low-E cost →
          </Link>
        </div>

      </div>
    </section>
  )
}

// ── Row ───────────────────────────────────────────────────────────────────────

function ThermalRow({ row }: { row: ThermalRow }) {
  // Bar represents thermal improvement: 0% for baseline, up to 83%+ for triple
  const barPct = row.isBaseline ? 4 : row.heatReduction
  const isRec = row.recommended
  const isBase = row.isBaseline

  const textMain = isBase ? 'text-on-surface/35' : 'text-on-surface'
  const textMuted = isBase ? 'text-on-surface/25' : isRec ? 'text-primary' : 'text-on-surface/50'

  return (
    <div
      className={[
        'ghost-border border-t-0 first:border-t-0 grid grid-cols-1 md:grid-cols-[220px_1fr_160px] gap-0',
        isRec ? 'bg-primary-container/8' : isBase ? 'bg-surface-container' : 'bg-surface',
      ].join(' ')}
    >
      {/* Config name */}
      <div className={`px-6 py-5 flex flex-col justify-center ${isRec ? 'border-l-2 border-primary-container' : ''}`}>
        {isRec && (
          <span className="font-headline text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-primary mb-1">
            Recommended for Melbourne
          </span>
        )}
        {isBase && (
          <span className="font-headline text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-on-surface/30 mb-1">
            Your current windows
          </span>
        )}
        <p className={`font-headline text-sm font-semibold uppercase tracking-wide leading-snug ${textMain}`}>
          {row.config}
        </p>
      </div>

      {/* Performance bar + metadata */}
      <div className="px-6 py-5 flex flex-col justify-center gap-3">

        {/* U-value + improvement bar */}
        <div className="flex items-center gap-4">
          {/* Bar — width = heat reduction %, represents thermal performance */}
          <div className="flex-1 h-2 bg-on-surface/10 relative" aria-hidden="true">
            <div
              className={`absolute inset-y-0 left-0 ${isBase ? 'bg-on-surface/20' : isRec ? 'bg-primary-container' : 'bg-primary/50'}`}
              style={{ width: `${barPct}%` }}
            />
          </div>

          {/* U-value label */}
          <span
            className={`font-display uppercase leading-none tabular-nums shrink-0 ${isBase ? 'text-on-surface/30' : isRec ? 'text-on-surface' : 'text-on-surface'}`}
            style={{ fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)' }}
          >
            U {row.uValue}
          </span>

          {/* Improvement callout */}
          {row.heatReduction > 0 && (
            <span className={`font-headline text-[0.8125rem] font-semibold uppercase tracking-wide shrink-0 ${isRec ? 'text-primary' : 'text-on-surface/40'}`}>
              −{row.heatReduction}% heat loss
            </span>
          )}
        </div>

        {/* Best for */}
        <p className={`font-headline text-xs font-semibold uppercase tracking-[0.15em] ${textMuted}`}>
          {row.bestFor}
        </p>
      </div>

      {/* Price */}
      <div className="px-6 py-5 flex items-center justify-start md:justify-end">
        <span
          className={`font-display uppercase leading-none ${isBase ? 'text-on-surface/25' : isRec ? 'text-on-surface' : 'text-on-surface/60'}`}
          style={{ fontSize: 'clamp(1.1rem, 2vw, 1.4rem)' }}
        >
          {row.priceFrom}
        </span>
      </div>
    </div>
  )
}
