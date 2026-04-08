import { Check, X, Minus } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

type CellValue = { type: 'check' } | { type: 'cross' } | { type: 'dash' } | { type: 'text'; value: string } | { type: 'highlight'; value: string }

interface ComparisonRow {
  feature: string
  retrofit: CellValue
  fullReplacement: CellValue
  secondary: CellValue
}

const rows: ComparisonRow[] = [
  {
    feature: 'Typical cost',
    retrofit:       { type: 'highlight', value: 'From $495/m²' },
    fullReplacement:{ type: 'text',      value: 'From $1,200/m²' },
    secondary:      { type: 'text',      value: 'From $350/m²' },
  },
  {
    feature: 'Installation time',
    retrofit:       { type: 'highlight', value: '1 day' },
    fullReplacement:{ type: 'text',      value: '3–7 days' },
    secondary:      { type: 'text',      value: '1–2 days' },
  },
  {
    feature: 'Frame disruption',
    retrofit:       { type: 'highlight', value: 'None' },
    fullReplacement:{ type: 'text',      value: 'Full demolition' },
    secondary:      { type: 'text',      value: 'None' },
  },
  {
    feature: 'Heritage / period windows',
    retrofit:       { type: 'check' },
    fullReplacement:{ type: 'dash' },
    secondary:      { type: 'check' },
  },
  {
    feature: 'Thermal performance (U-value)',
    retrofit:       { type: 'highlight', value: '1.1–2.0 W/m²K' },
    fullReplacement:{ type: 'text',      value: '1.1–2.0 W/m²K' },
    secondary:      { type: 'text',      value: '2.5+ W/m²K' },
  },
  {
    feature: 'Acoustic performance (Rw)',
    retrofit:       { type: 'highlight', value: '30–52 dB' },
    fullReplacement:{ type: 'text',      value: '30–52 dB' },
    secondary:      { type: 'text',      value: '20–28 dB' },
  },
  {
    feature: 'VEU rebate eligible',
    retrofit:       { type: 'check' },
    fullReplacement:{ type: 'check' },
    secondary:      { type: 'cross' },
  },
  {
    feature: 'Warranty',
    retrofit:       { type: 'highlight', value: '10 years' },
    fullReplacement:{ type: 'text',      value: '5–10 years' },
    secondary:      { type: 'text',      value: '2–5 years' },
  },
  {
    feature: 'Council approval usually required',
    retrofit:       { type: 'cross' },
    fullReplacement:{ type: 'dash' },
    secondary:      { type: 'cross' },
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface ComparisonTableProps {
  heading?: string
  subheading?: string
}

export function ComparisonTable({
  heading = 'How We Compare',
  subheading = 'Retrofit delivers full-replacement performance at half the cost and none of the mess.',
}: ComparisonTableProps) {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Retrofit vs The Alternatives
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

        {/* Table wrapper — horizontal scroll on mobile */}
        <div className="overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[640px] ghost-border border-collapse">
            <thead>
              <tr>
                {/* Feature column header */}
                <th
                  scope="col"
                  className="bg-surface-container text-left font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-surface/40 px-6 py-4 ghost-border"
                >
                  Feature
                </th>

                {/* King Retrofit — highlighted */}
                <th
                  scope="col"
                  className="bg-primary-container text-center px-6 py-4 ghost-border min-w-[180px]"
                >
                  <span className="font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/60 block mb-1">
                    King
                  </span>
                  <span className="font-display uppercase text-on-primary-fixed leading-none block"
                    style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                  >
                    Retrofit
                  </span>
                </th>

                {/* Full Replacement */}
                <th
                  scope="col"
                  className="bg-surface-container text-center font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-surface/50 px-6 py-4 ghost-border min-w-[160px]"
                >
                  Full<br />Replacement
                </th>

                {/* Secondary Glazing */}
                <th
                  scope="col"
                  className="bg-surface-container text-center font-headline text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-on-surface/50 px-6 py-4 ghost-border min-w-[160px]"
                >
                  Secondary<br />Glazing
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={row.feature}
                  className={i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'}
                >
                  {/* Feature label */}
                  <td className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface px-6 py-4 ghost-border">
                    {row.feature}
                  </td>

                  {/* King Retrofit cell — yellow tint */}
                  <td className="bg-primary-container/10 text-center px-6 py-4 ghost-border border-l-2 border-primary-container">
                    <CellRenderer value={row.retrofit} isKing />
                  </td>

                  {/* Full Replacement */}
                  <td className="text-center px-6 py-4 ghost-border">
                    <CellRenderer value={row.fullReplacement} />
                  </td>

                  {/* Secondary Glazing */}
                  <td className="text-center px-6 py-4 ghost-border">
                    <CellRenderer value={row.secondary} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footnote */}
        <p className="mt-6 font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-on-surface/35">
          * Prices are indicative and market-dependent. King Retrofit prices guaranteed at time of quote.
        </p>

      </div>
    </section>
  )
}

// ── Cell renderer ─────────────────────────────────────────────────────────────

function CellRenderer({ value, isKing = false }: { value: CellValue; isKing?: boolean }) {
  if (value.type === 'check') {
    return (
      <Check
        size={18}
        strokeWidth={2.5}
        aria-label="Yes"
        className={isKing ? 'text-primary mx-auto' : 'text-success mx-auto'}
      />
    )
  }
  if (value.type === 'cross') {
    return (
      <X
        size={18}
        strokeWidth={2.5}
        aria-label="No"
        className="text-danger mx-auto"
      />
    )
  }
  if (value.type === 'dash') {
    return (
      <Minus
        size={18}
        strokeWidth={2}
        aria-label="Varies"
        className="text-on-surface/30 mx-auto"
      />
    )
  }
  if (value.type === 'highlight') {
    return (
      <span className="font-headline text-sm font-bold uppercase tracking-wide text-on-surface">
        {value.value}
      </span>
    )
  }
  return (
    <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface/50">
      {value.value}
    </span>
  )
}
