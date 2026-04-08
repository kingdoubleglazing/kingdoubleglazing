// ── Types ─────────────────────────────────────────────────────────────────────

interface Metric {
  label: string
  before: string
  after: string
  unit?: string
  note?: string
}

interface BeforeAfterProps {
  heading?: string
  subheading?: string
  metrics?: Metric[]
}

// ── Default data ──────────────────────────────────────────────────────────────

const defaultMetrics: Metric[] = [
  {
    label: 'Bedroom temp at 11 pm (summer)',
    before: '29',
    after: '22',
    unit: '°C',
    note: '−7° without extra air con',
  },
  {
    label: 'Quarterly energy bill',
    before: '$430',
    after: '$255',
    note: '−41% average saving',
  },
  {
    label: 'Street noise (Rw measurement)',
    before: '62',
    after: '34',
    unit: 'dB',
    note: 'Halved perceived loudness',
  },
  {
    label: 'Window condensation',
    before: 'Daily',
    after: 'Zero',
    note: 'Warm inner pane eliminates dew point',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

export function BeforeAfter({
  heading = 'The Difference Is Real',
  subheading = 'Measured results from Melbourne homes. Not marketing copy.',
  metrics = defaultMetrics,
}: BeforeAfterProps) {
  return (
    <section className="bg-inverse-surface overflow-hidden py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3">
            Real Results
          </p>
          <h2
            className="font-display uppercase leading-[0.88] text-inverse-on-surface"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {heading}
          </h2>
          <p className="font-sans text-base text-inverse-on-surface/50 mt-4 max-w-xl leading-relaxed">
            {subheading}
          </p>
        </div>

        {/* Column labels */}
        <div className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_200px_200px] gap-0 mb-0">
          <div className="ghost-border px-5 py-3 bg-inverse-on-surface/5">
            <span className="font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/30">
              Measurement
            </span>
          </div>
          <div className="ghost-border px-5 py-3 bg-inverse-on-surface/5 text-center">
            <span className="font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/30">
              Before
            </span>
          </div>
          <div className="ghost-border px-5 py-3 bg-primary-container text-center">
            <span className="font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/60">
              After King Retrofit
            </span>
          </div>
        </div>

        {/* Metric rows */}
        {metrics.map((metric, i) => (
          <div
            key={metric.label}
            className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_200px_200px] gap-0"
          >
            {/* Label column */}
            <div className={`ghost-border px-5 py-5 flex flex-col justify-center ${i % 2 === 0 ? 'bg-inverse-on-surface/[0.03]' : 'bg-transparent'}`}>
              <p className="font-headline text-sm font-semibold uppercase tracking-wide text-inverse-on-surface leading-snug">
                {metric.label}
              </p>
              {metric.note && (
                <p className="font-sans text-xs text-inverse-on-surface/35 mt-1 leading-snug">
                  {metric.note}
                </p>
              )}
            </div>

            {/* Before column */}
            <div className={`ghost-border px-5 py-5 flex items-center justify-center text-center ${i % 2 === 0 ? 'bg-inverse-on-surface/[0.03]' : 'bg-transparent'}`}>
              <span
                className="font-display uppercase text-inverse-on-surface/40 leading-none tabular-nums"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                {metric.before}
                {metric.unit && (
                  <span className="font-headline text-sm font-semibold align-baseline ml-0.5">
                    {metric.unit}
                  </span>
                )}
              </span>
            </div>

            {/* After column — yellow accent */}
            <div className={`ghost-border border-l-2 border-primary-container px-5 py-5 flex items-center justify-center text-center ${i % 2 === 0 ? 'bg-primary-container/10' : 'bg-primary-container/[0.06]'}`}>
              <span
                className="font-display uppercase text-primary-container leading-none tabular-nums"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.25rem)' }}
              >
                {metric.after}
                {metric.unit && (
                  <span className="font-headline text-sm font-semibold align-baseline ml-0.5">
                    {metric.unit}
                  </span>
                )}
              </span>
            </div>
          </div>
        ))}

        {/* Footer caveat */}
        <p className="mt-6 font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/25">
          Results vary by home size, orientation, and glass type selected. Data from King customer surveys 2024–2025.
        </p>

      </div>
    </section>
  )
}
