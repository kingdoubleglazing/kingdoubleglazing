import type { PricingOption } from '@/sanity/types'
import type { OptionKey } from '@/data/pricing'

const YES = (
  <span className="text-primary-container font-bold" aria-label="Yes">✓</span>
)
const NO = (
  <span className="text-on-surface/40" aria-label="No">—</span>
)

export function GlassTechSpecs({ options }: { options: PricingOption[] }) {
  const OPTION_KEYS = options.map(o => o.optionKey) as OptionKey[]
  const OPTIONS = Object.fromEntries(options.map(o => [o.optionKey, o])) as Record<OptionKey, PricingOption>

  return (
    <section id="tech-specs" className="bg-surface-container-low py-14 md:py-18">
      <div className="max-w-5xl mx-auto px-4">

        <div className="mb-8">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Technical Data
          </p>
          <h2
            className="font-display uppercase leading-[0.9] text-on-surface"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
          >
            Glass Specification Summary
          </h2>
          <p className="font-sans text-sm text-on-surface mt-3 max-w-lg">
            Full composition and performance data for each option. All figures compared to standard 3mm single glazing.
          </p>
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {OPTION_KEYS.map(key => {
            const opt = OPTIONS[key]
            return (
              <div key={key} id={`tech-specs-${key.toLowerCase()}`} className="bg-surface ghost-border p-5">
                <div className="flex items-baseline gap-3 mb-4">
                  <span
                    className="font-display uppercase leading-none text-primary"
                    style={{ fontSize: '2.5rem' }}
                  >
                    {key}
                  </span>
                  <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface">
                    {opt.sublabel}
                  </span>
                </div>

                <table className="w-full text-sm">
                  <tbody className="divide-y divide-on-surface/10">
                    <TechRow label="Glass makeup" value={opt.tech.composition.join(' + ')} />
                    <TechRow label="Spacer" value={`${opt.tech.spacerMm}mm air gap`} />
                    <TechRow label="Heat reduction" value={`Up to ${opt.heatPct}%`} highlight />
                    <TechRow label="Noise reduction" value={`Up to ${opt.noisePct}%`} highlight />
                    {opt.tech.rwRating && (
                      <TechRow label="Acoustic rating" value={opt.tech.rwRating} />
                    )}
                    <TechRow label="Low-E coating" value={opt.tech.lowE ? 'Yes' : 'No'} />
                    <TechRow label="Acoustic PVB" value={opt.tech.acousticPVB ? 'Yes' : 'No'} />
                    <TechRow label="Tinted" value={opt.tech.tinted ? 'Yes' : 'No'} />
                  </tbody>
                </table>

                <p className="mt-4 font-sans text-xs text-on-surface leading-relaxed border-l-2 border-primary-container pl-3">
                  {opt.tech.notes}
                </p>
              </div>
            )
          })}
        </div>

        {/* Desktop: comparison table */}
        <div className="hidden md:block overflow-x-auto -mx-4 px-4">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 bg-surface-container font-headline text-xs uppercase tracking-wide text-on-surface" />
                {OPTION_KEYS.map(key => (
                  <th key={key} id={`tech-specs-${key.toLowerCase()}`} className="px-5 py-3 bg-surface-container text-center font-display uppercase text-on-surface" style={{ fontSize: '1.5rem' }}>
                    {key}
                    <span className="block font-headline text-[0.6rem] font-semibold normal-case tracking-wide mt-0.5 text-primary">
                      {OPTIONS[key].sublabel}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-on-surface/10">

              <DesktopRow label="Glass makeup">
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center font-sans text-xs text-on-surface leading-snug">
                    {OPTIONS[key].tech.composition.map((layer, i) => (
                      <span key={i} className="block">{layer}</span>
                    ))}
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Air spacer">
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center font-sans text-sm text-on-surface">
                    {OPTIONS[key].tech.spacerMm}mm
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Heat reduction" highlight>
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center font-display uppercase text-on-surface" style={{ fontSize: '1.5rem' }}>
                    {OPTIONS[key].heatPct}%
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Noise reduction" highlight>
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center font-display uppercase text-on-surface" style={{ fontSize: '1.5rem' }}>
                    {OPTIONS[key].noisePct}%
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Acoustic rating (Rw)">
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center font-sans text-sm text-on-surface">
                    {OPTIONS[key].tech.rwRating ?? '—'}
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Low-E coating">
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center">
                    {OPTIONS[key].tech.lowE ? YES : NO}
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Acoustic PVB interlayer">
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center">
                    {OPTIONS[key].tech.acousticPVB ? YES : NO}
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Tinted">
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center">
                    {OPTIONS[key].tech.tinted ? YES : NO}
                  </td>
                ))}
              </DesktopRow>

              <DesktopRow label="Best for">
                {OPTION_KEYS.map(key => (
                  <td key={key} className="px-5 py-3 text-center font-sans text-xs text-on-surface leading-snug">
                    {OPTIONS[key].tech.bestFor}
                  </td>
                ))}
              </DesktopRow>

            </tbody>
          </table>
        </div>

        <p className="mt-5 font-sans text-xs text-on-surface/70 leading-relaxed">
          Acoustic ratings are indicative. Rw figures based on published data for acoustic PVB laminated units (source: industry references). Exact performance varies with installation conditions.
        </p>

      </div>
    </section>
  )
}

function TechRow({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <tr>
      <td className="py-2 pr-3 font-headline text-[0.65rem] font-semibold uppercase tracking-wide text-on-surface/70 w-2/5 align-top">
        {label}
      </td>
      <td className={`py-2 font-sans text-sm text-on-surface ${highlight ? 'font-semibold' : ''}`}>
        {value}
      </td>
    </tr>
  )
}

function DesktopRow({ label, children, highlight }: { label: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <tr className={highlight ? 'bg-surface-container-lowest' : ''}>
      <td className="px-5 py-3 font-headline text-xs font-semibold uppercase tracking-wide text-on-surface whitespace-nowrap">
        {label}
      </td>
      {children}
    </tr>
  )
}
