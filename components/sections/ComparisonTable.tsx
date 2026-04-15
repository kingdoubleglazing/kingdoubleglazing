import Link from 'next/link'

// ── Data ─────────────────────────────────────────────────────────────────────

interface ComparisonRow {
  feature: string
  doNothing: string
  retrofit: string
  fullReplacement: string
}

const rows: ComparisonRow[] = [
  {
    feature:        'Upfront cost',
    doNothing:      '$0',
    retrofit:       'From $595/m²',
    fullReplacement:'From $1,200/m²',
  },
  {
    feature:        'Noise reduction',
    doNothing:      'None',
    retrofit:       'Up to 70% quieter',
    fullReplacement:'Up to 70% quieter',
  },
  {
    feature:        'Winter warmth',
    doNothing:      'None',
    retrofit:       'Up to 50% warmer',
    fullReplacement:'Up to 50% warmer',
  },
  {
    feature:        'Time to install',
    doNothing:      '—',
    retrofit:       '1 day',
    fullReplacement:'2–4 weeks',
  },
  {
    feature:        'Disruption',
    doNothing:      'None',
    retrofit:       'Minimal',
    fullReplacement:'Frames replaced, minor wall work',
  },
  {
    feature:        'Keep existing frames?',
    doNothing:      'Yes',
    retrofit:       'Yes',
    fullReplacement:'New frames installed',
  },
  {
    feature:        'Warranty',
    doNothing:      '—',
    retrofit:       '10 Years',
    fullReplacement:'Manufacturer warranty',
  },
  {
    feature:        'Energy bill savings',
    doNothing:      'None',
    retrofit:       'Up to 40% less heating',
    fullReplacement:'Up to 40% less heating',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface ComparisonTableProps {
  heading?: string
}

export function ComparisonTable({
  heading = 'Add a Second Glass Layer, Replace the Whole Window, or Live With It — How They Compare',
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
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                {/* Feature label */}
                <th
                  scope="col"
                  className="bg-surface-container-low text-left px-6 py-4 border border-surface-container-high"
                />

                {/* Do Nothing — muted */}
                <th
                  scope="col"
                  className="text-center px-6 py-5 min-w-[150px]"
                  style={{ backgroundColor: '#F5F5F5', border: '1px solid #E8E8E8' }}
                >
                  <span
                    className="font-display uppercase text-on-surface/60 leading-none block"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.5rem)' }}
                  >
                    Do Nothing
                  </span>
                </th>

                {/* Retrofit — brand yellow */}
                <th
                  scope="col"
                  className="bg-primary-container text-center px-6 py-5 min-w-[200px]"
                  style={{ border: '1px solid #c9a800' }}
                >
                  <span className="inline-block font-headline text-[0.65rem] font-semibold uppercase tracking-[0.18em] bg-black text-primary-container px-2 py-0.5 mb-2">
                    Most popular choice
                  </span>
                  <span
                    className="font-display uppercase text-on-primary-fixed leading-none block"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
                  >
                    Retrofit With Us
                  </span>
                  <span className="block font-sans text-xs normal-case font-normal text-on-primary-fixed/70 mt-1">Add a second glass layer</span>
                </th>

                {/* Full Replacement — clean white */}
                <th
                  scope="col"
                  className="text-center px-6 py-5 min-w-[180px]"
                  style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
                >
                  <span
                    className="inline-block font-headline text-[0.65rem] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 mb-2"
                    style={{ backgroundColor: '#F0F0F0', color: '#555' }}
                  >
                    New builds &amp; old frames
                  </span>
                  <span
                    className="font-display uppercase text-on-surface leading-none block"
                    style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)' }}
                  >
                    Full Replacement
                  </span>
                  <span className="block font-sans text-xs normal-case font-normal text-on-surface/70 mt-1">Whole new window + frame</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.feature}>
                  {/* Feature label */}
                  <td
                    className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface px-6 py-4"
                    style={{ backgroundColor: '#FAFAFA', border: '1px solid #E8E8E8' }}
                  >
                    {row.feature}
                  </td>

                  {/* Do Nothing — grey, muted */}
                  <td
                    className="text-center px-6 py-4"
                    style={{ backgroundColor: '#F5F5F5', border: '1px solid #E8E8E8' }}
                  >
                    <span className="font-sans text-sm" style={{ color: '#555' }}>
                      {row.doNothing}
                    </span>
                  </td>

                  {/* Retrofit — solid yellow */}
                  <td
                    className="bg-primary-container text-center px-6 py-4"
                    style={{ border: '1px solid #c9a800' }}
                  >
                    <span className="font-headline text-sm font-bold uppercase tracking-wide text-on-primary-fixed">
                      {row.retrofit}
                    </span>
                  </td>

                  {/* Full Replacement — white, full contrast */}
                  <td
                    className="text-center px-6 py-4"
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}
                  >
                    <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface">
                      {row.fullReplacement}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile cards: Retrofit → Full Replacement → Do Nothing ──────── */}
        <div className="md:hidden space-y-4">

          {/* Retrofit — solid brand yellow */}
          <div className="bg-primary-container p-6" style={{ border: '1px solid #c9a800' }}>
            <p className="inline-block font-headline text-[0.65rem] font-semibold uppercase tracking-[0.18em] bg-black text-primary-container px-2 py-0.5 mb-3">
              Most popular choice
            </p>
            <h3
              className="font-display uppercase text-on-primary-fixed leading-none mb-1"
              style={{ fontSize: '1.75rem' }}
            >
              Retrofit With Us
            </h3>
            <p className="font-sans text-xs normal-case font-normal text-on-primary-fixed/70 mb-5">Add a second glass layer</p>
            <dl className="space-y-3">
              {rows.map(row => (
                <div key={row.feature} className="flex justify-between gap-4">
                  <dt className="font-headline text-xs font-semibold uppercase tracking-wide text-on-primary-fixed/60 shrink-0">
                    {row.feature}
                  </dt>
                  <dd className="font-headline text-sm font-bold uppercase tracking-wide text-on-primary-fixed text-right">
                    {row.retrofit}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Full Replacement — white, full contrast */}
          <div className="p-6" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E5E5' }}>
            <p
              className="inline-block font-headline text-[0.65rem] font-semibold uppercase tracking-[0.18em] px-2 py-0.5 mb-3"
              style={{ backgroundColor: '#F0F0F0', color: '#555' }}
            >
              New builds &amp; old frames
            </p>
            <h3
              className="font-display uppercase text-on-surface leading-none mb-1"
              style={{ fontSize: '1.75rem' }}
            >
              Full Replacement
            </h3>
            <p className="font-sans text-xs normal-case font-normal text-on-surface/70 mb-5">Whole new window + frame</p>
            <dl className="space-y-3">
              {rows.map(row => (
                <div key={row.feature} className="flex justify-between gap-4">
                  <dt className="font-headline text-xs font-semibold uppercase tracking-wide text-on-surface/60 shrink-0">
                    {row.feature}
                  </dt>
                  <dd className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface text-right">
                    {row.fullReplacement}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Do Nothing — greyed out */}
          <div className="p-6" style={{ backgroundColor: '#F5F5F5', border: '1px solid #E8E8E8' }}>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wide mb-4" style={{ color: '#555' }}>
              Do Nothing
            </h3>
            <dl className="space-y-3">
              {rows.map(row => (
                <div key={row.feature} className="flex justify-between gap-4">
                  <dt className="font-headline text-xs font-semibold uppercase tracking-wide shrink-0" style={{ color: '#555' }}>
                    {row.feature}
                  </dt>
                  <dd className="font-sans text-sm text-right" style={{ color: '#555' }}>
                    {row.doNothing}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* Secondary service note */}
        <p className="mt-8 text-center font-sans text-sm text-on-surface/55 italic">
          We do both. Most Melbourne homes are perfect for retrofit, but if you&apos;re building new or your frames need replacing, we&apos;ll quote that too.
        </p>

        {/* CTA */}
        <div className="mt-4 text-center">
          <Link
            href="/instant-estimate/"
            className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            Get My Instant Price — See What Your Home Would Cost →
          </Link>
        </div>

      </div>
    </section>
  )
}
