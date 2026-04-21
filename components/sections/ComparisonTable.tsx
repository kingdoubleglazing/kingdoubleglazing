import Link from 'next/link'

// ── Data ─────────────────────────────────────────────────────────────────────

interface ComparisonRow {
  feature: string
  doNothing: string
  retrofit: string
}

const rows: ComparisonRow[] = [
  {
    feature:   'Noise reduction',
    doNothing: 'None',
    retrofit:  'Up to 70% quieter',
  },
  {
    feature:   'Winter warmth',
    doNothing: 'None',
    retrofit:  'Up to 70% less heat loss',
  },
  {
    feature:   'Disruption',
    doNothing: 'None',
    retrofit:  'Minimal',
  },
  {
    feature:   'Keep existing frames?',
    doNothing: 'Yes',
    retrofit:  'Yes — no replacement needed',
  },
  {
    feature:   'Energy bill savings',
    doNothing: 'None',
    retrofit:  'Up to 40% less heating',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface ComparisonTableProps {
  heading?: string
}

export function ComparisonTable({
  heading = "Upgrade Your Windows or Live With It — Here's the Difference",
}: ComparisonTableProps) {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">

        {/* Heading */}
        <div className="mb-10 md:mb-14">
          <h2
            className="font-display uppercase leading-[0.88] text-on-surface"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {heading}
          </h2>
        </div>

        {/* ── Desktop table ─────────────────────────────────────────────────── */}
        <div className="hidden md:block overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[480px] border-collapse">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="bg-surface-container-low text-left px-6 py-4 border border-surface-container-high"
                />

                {/* Do Nothing */}
                <th
                  scope="col"
                  className="text-center px-6 py-5 min-w-[150px]"
                  style={{ backgroundColor: '#F5F5F5', border: '1px solid #E8E8E8' }}
                >
                  <span
                    className="font-display uppercase text-on-surface leading-none block"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.8rem)' }}
                  >
                    Do Nothing
                  </span>
                </th>

                {/* Retrofit */}
                <th
                  scope="col"
                  className="bg-primary-container text-center px-6 py-5 min-w-[200px]"
                  style={{ border: '1px solid #c9a800' }}
                >
                  <span className="inline-block font-headline text-[15px] font-semibold uppercase tracking-[0.18em] bg-black text-primary-container px-2 py-0.5 mb-2">
                    What we do
                  </span>
                  <span
                    className="font-display uppercase text-on-primary-fixed leading-none block"
                    style={{ fontSize: 'clamp(1.5rem, 2.5vw, 1.9rem)' }}
                  >
                    Retrofit With Us
                  </span>
                  <span className="block font-sans text-[17px] normal-case font-normal text-on-primary-fixed mt-1">
                    Add a second glass layer
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.feature}>
                  <td
                    className="font-headline font-semibold uppercase tracking-wide text-on-surface px-6 py-4 text-[19px]"
                    style={{ backgroundColor: '#FAFAFA', border: '1px solid #E8E8E8' }}
                  >
                    {row.feature}
                  </td>

                  <td
                    className="text-center px-6 py-4"
                    style={{ backgroundColor: '#F5F5F5', border: '1px solid #E8E8E8' }}
                  >
                    <span className="font-sans text-[21px]" style={{ color: '#3f3f46' }}>
                      {row.doNothing}
                    </span>
                  </td>

                  <td
                    className="bg-primary-container text-center px-6 py-4"
                    style={{ border: '1px solid #c9a800' }}
                  >
                    <span className="font-headline text-[19px] font-bold uppercase tracking-wide text-on-primary-fixed">
                      {row.retrofit}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile: compact side-by-side grid ────────────────────────────── */}
        <div className="md:hidden border border-surface-container-high overflow-hidden">

          {/* Column headers */}
          <div className="grid grid-cols-2">
            <div className="p-3 border-b border-r border-surface-container-high" style={{ backgroundColor: '#F5F5F5' }}>
              <p className="font-headline text-[15px] font-semibold uppercase tracking-wide" style={{ color: '#555' }}>
                Do Nothing
              </p>
            </div>
            <div className="bg-primary-container p-3 border-b" style={{ borderBottomColor: '#c9a800' }}>
              <p className="font-headline text-[14px] font-semibold uppercase tracking-[0.15em] bg-black text-primary-container inline px-1.5 py-0.5">
                What we do
              </p>
              <p className="font-headline text-[15px] font-semibold uppercase tracking-wide text-on-primary-fixed mt-1">
                Retrofit With Us
              </p>
            </div>
          </div>

          {/* Data rows */}
          {rows.map((row, i) => {
            const isLast = i === rows.length - 1
            return (
              <div key={row.feature} className="grid grid-cols-2">
                <div
                  className={['p-3 border-r border-surface-container-high', !isLast ? 'border-b' : ''].join(' ')}
                  style={{ backgroundColor: '#F5F5F5', borderBottomColor: '#E8E8E8' }}
                >
                  <p className="font-headline text-[14px] font-semibold uppercase tracking-wide mb-0.5" style={{ color: '#888' }}>
                    {row.feature}
                  </p>
                  <p className="font-sans text-[19px] leading-snug" style={{ color: '#3f3f46' }}>
                    {row.doNothing}
                  </p>
                </div>
                <div
                  className={['bg-primary-container p-3', !isLast ? 'border-b' : ''].join(' ')}
                  style={{ borderBottomColor: '#c9a800' }}
                >
                  <p className="font-headline text-[14px] font-semibold uppercase tracking-wide text-on-primary-fixed/70 mb-0.5">
                    {row.feature}
                  </p>
                  <p className="font-headline text-[17px] font-bold uppercase tracking-wide text-on-primary-fixed leading-snug">
                    {row.retrofit}
                  </p>
                </div>
              </div>
            )
          })}

        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href="/instant-estimate/"
            className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            Generate My Quote — See What Your Home Would Cost →
          </Link>
        </div>

      </div>
    </section>
  )
}
