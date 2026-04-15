import Link from 'next/link'
import { Check, X } from 'lucide-react'

// ── Data ─────────────────────────────────────────────────────────────────────

interface ComparisonRow {
  feature: string
  doNothing: string | null
  retrofit: string
  fullReplacement: string
}

const rows: ComparisonRow[] = [
  {
    feature: 'Upfront cost',
    doNothing:       '$0',
    retrofit:        'From $595/m²',
    fullReplacement: '$15,000+',
  },
  {
    feature: 'Noise reduction',
    doNothing:       null,
    retrofit:        'Up to 70% quieter',
    fullReplacement: 'Up to 70% quieter',
  },
  {
    feature: 'Winter warmth',
    doNothing:       null,
    retrofit:        'Up to 50% warmer',
    fullReplacement: 'Up to 50% warmer',
  },
  {
    feature: 'Time to install',
    doNothing:       '—',
    retrofit:        '1 day',
    fullReplacement: '2–4 weeks',
  },
  {
    feature: 'Disruption',
    doNothing:       'None',
    retrofit:        'Minimal',
    fullReplacement: 'Major — walls damaged',
  },
  {
    feature: 'Keep existing frames?',
    doNothing:       'Yes',
    retrofit:        'Yes',
    fullReplacement: 'No — ripped out',
  },
  {
    feature: 'Warranty',
    doNothing:       '—',
    retrofit:        'Lifetime',
    fullReplacement: 'Varies',
  },
  {
    feature: 'Energy bill savings',
    doNothing:       null,
    retrofit:        'Up to 40% less heating',
    fullReplacement: 'Up to 40% less heating',
  },
]

// ── Component ─────────────────────────────────────────────────────────────────

interface ComparisonTableProps {
  heading?: string
}

export function ComparisonTable({
  heading = 'Do Nothing, Retrofit With Us, Or Replace Everything — The Honest Comparison',
}: ComparisonTableProps) {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10 md:mb-14">
          <h2
            className="font-display uppercase leading-[0.88] text-on-surface"
            style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
          >
            {heading}
          </h2>
        </div>

        {/* Desktop table */}
        <div className="hidden md:block overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr>
                <th scope="col" className="bg-surface-container text-left font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/80 px-6 py-4 border border-surface-container-high" />
                <th scope="col" className="bg-surface-container text-center font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/70 px-6 py-4 border border-surface-container-high min-w-[160px]">
                  Do Nothing
                </th>
                {/* King Retrofit — highlighted */}
                <th scope="col" className="bg-primary-container text-center px-6 py-4 border border-primary-container min-w-[200px] relative">
                  <span className="font-headline text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/60 block mb-1">
                    Best for most Melbourne homes
                  </span>
                  <span
                    className="font-display uppercase text-on-primary-fixed leading-none block"
                    style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)' }}
                  >
                    Retrofit With Us ⭐
                  </span>
                </th>
                <th scope="col" className="bg-surface-container text-center font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/70 px-6 py-4 border border-surface-container-high min-w-[160px]">
                  Full Window<br />Replacement
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-surface' : 'bg-surface-container-lowest'}>
                  <td className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface px-6 py-4 border border-surface-container-high">
                    {row.feature}
                  </td>
                  <td className="text-center px-6 py-4 border border-surface-container-high text-on-surface/80">
                    {row.doNothing === null ? (
                      <X size={16} strokeWidth={2} aria-label="None" className="mx-auto text-on-surface/25" />
                    ) : (
                      <span className="font-sans text-sm">{row.doNothing}</span>
                    )}
                  </td>
                  <td className="bg-primary-container/10 text-center px-6 py-4 border-y border-primary-container/30 border-x border-primary-container">
                    <span className="font-headline text-sm font-bold uppercase tracking-wide text-on-surface">
                      {row.retrofit}
                    </span>
                  </td>
                  <td className="text-center px-6 py-4 border border-surface-container-high">
                    <span className="font-sans text-sm text-on-surface/80">{row.fullReplacement}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile — stacked cards, Retrofit first */}
        <div className="md:hidden space-y-4">
          {/* Retrofit card — highlighted */}
          <div className="bg-primary-container p-6">
            <p className="font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed/60 mb-1">
              Best for most Melbourne homes
            </p>
            <h3 className="font-display uppercase text-on-primary-fixed leading-none mb-6" style={{ fontSize: '2rem' }}>
              Retrofit With Us ⭐
            </h3>
            <dl className="space-y-3">
              {rows.map(row => (
                <div key={row.feature} className="flex justify-between gap-4">
                  <dt className="font-headline text-xs font-semibold uppercase tracking-wide text-on-primary-fixed/60 shrink-0">{row.feature}</dt>
                  <dd className="font-sans text-sm font-semibold text-on-primary-fixed text-right">{row.retrofit}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* Do Nothing */}
          <div className="bg-surface-container-lowest p-6 opacity-70">
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface/70 mb-4">Do Nothing</h3>
            <dl className="space-y-3">
              {rows.map(row => (
                <div key={row.feature} className="flex justify-between gap-4">
                  <dt className="font-headline text-xs font-semibold uppercase tracking-wide text-on-surface/80 shrink-0">{row.feature}</dt>
                  <dd className="font-sans text-sm text-on-surface/70 text-right">{row.doNothing ?? '—'}</dd>
                </div>
              ))}
            </dl>
          </div>
          {/* Full Replacement */}
          <div className="bg-surface-container-lowest p-6">
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface/70 mb-4">Full Replacement</h3>
            <dl className="space-y-3">
              {rows.map(row => (
                <div key={row.feature} className="flex justify-between gap-4">
                  <dt className="font-headline text-xs font-semibold uppercase tracking-wide text-on-surface/80 shrink-0">{row.feature}</dt>
                  <dd className="font-sans text-sm text-on-surface/80 text-right">{row.fullReplacement}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* CTA below table */}
        <div className="mt-10 text-center">
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
