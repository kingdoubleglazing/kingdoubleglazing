import Link from 'next/link'
import { getSiteSettings } from '@/lib/site-settings'

export interface WarrantyCoverageBlockData {
  __typename?: string
  coveredEyebrow?: string | null
  coveredHeading?: string | null
  notCoveredEyebrow?: string | null
  notCoveredHeading?: string | null
  claimEyebrow?: string | null
  coveredItems?: Array<{ item?: string | null; detail?: string | null } | null> | null
  notCoveredItems?: Array<{ item?: string | null; detail?: string | null } | null> | null
  claimSteps?: (string | null)[] | null
  tina?: {
    coveredEyebrow?: string
    coveredHeading?: string
    notCoveredEyebrow?: string
    notCoveredHeading?: string
    claimEyebrow?: string
    coveredItems?: Array<{ item?: string; detail?: string } | undefined>
    notCoveredItems?: Array<{ item?: string; detail?: string } | undefined>
    claimSteps?: string
  }
}

export function WarrantyCoverageBlock({ block }: { block: WarrantyCoverageBlockData }) {
  const settings = getSiteSettings()
  const covered = (block.coveredItems ?? []).filter(Boolean)
  const notCovered = (block.notCoveredItems ?? []).filter(Boolean)
  const claimSteps = (block.claimSteps ?? []).filter(Boolean) as string[]

  return (
    <>
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <p
                data-tina-field={block.tina?.coveredEyebrow}
                className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
              >
                {block.coveredEyebrow ?? "What's Covered"}
              </p>
              <h2
                data-tina-field={block.tina?.coveredHeading}
                className="font-display uppercase leading-[0.88] text-on-surface mb-8"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {block.coveredHeading ?? '10 Years. Full Stop.'}
              </h2>
              <ul className="space-y-0 ghost-border">
                {covered.map((c, i) => (
                  <li key={c!.item ?? i} className="ghost-border p-6 flex items-start gap-4">
                    <span className="shrink-0 w-5 h-5 mt-0.5 bg-primary-container text-on-primary-fixed flex items-center justify-center font-headline text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <p
                        data-tina-field={block.tina?.coveredItems?.[i]?.item}
                        className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface mb-1"
                      >
                        {c!.item}
                      </p>
                      <p
                        data-tina-field={block.tina?.coveredItems?.[i]?.detail}
                        className="font-sans text-sm text-on-surface/70 leading-relaxed"
                      >
                        {c!.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p
                data-tina-field={block.tina?.notCoveredEyebrow}
                className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/60 mb-4"
              >
                {block.notCoveredEyebrow ?? "What's Not Covered"}
              </p>
              <h2
                data-tina-field={block.tina?.notCoveredHeading}
                className="font-display uppercase leading-[0.88] text-on-surface mb-8"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {block.notCoveredHeading ?? 'Exclusions'}
              </h2>
              <ul className="space-y-0 ghost-border mb-10">
                {notCovered.map((c, i) => (
                  <li key={c!.item ?? i} className="ghost-border p-6 flex items-start gap-4">
                    <span className="shrink-0 w-5 h-5 mt-0.5 border border-on-surface/30 text-on-surface/40 flex items-center justify-center font-headline text-xs font-bold">
                      ✕
                    </span>
                    <div>
                      <p
                        data-tina-field={block.tina?.notCoveredItems?.[i]?.item}
                        className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface mb-1"
                      >
                        {c!.item}
                      </p>
                      <p
                        data-tina-field={block.tina?.notCoveredItems?.[i]?.detail}
                        className="font-sans text-sm text-on-surface/70 leading-relaxed"
                      >
                        {c!.detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {claimSteps.length > 0 && (
                <>
                  <p
                    data-tina-field={block.tina?.claimEyebrow}
                    className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
                  >
                    {block.claimEyebrow ?? 'How to Make a Claim'}
                  </p>
                  <ol className="space-y-3" data-tina-field={block.tina?.claimSteps}>
                    {claimSteps.map((step, i) => (
                      <li key={i} className="flex items-start gap-3 font-sans text-base text-on-surface">
                        <span className="shrink-0 w-6 h-6 bg-primary-container text-on-primary-fixed flex items-center justify-center font-headline text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <p className="mt-6 font-sans text-sm text-on-surface/60">
                    Contact us:{' '}
                    <a href={settings.phoneHref} className="underline hover:text-primary">
                      {settings.phone}
                    </a>{' '}
                    or{' '}
                    <a href={`mailto:${settings.email}`} className="underline hover:text-primary">
                      {settings.email}
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
