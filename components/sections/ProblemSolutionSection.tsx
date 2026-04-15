interface ProblemLine {
  label: string
  detail: string
}

const defaultLines: ProblemLine[] = [
  {
    label: 'Loud.',
    detail: 'Traffic, trams, neighbours — standard glass lets it all in.',
  },
  {
    label: 'Cold in winter, hot in summer.',
    detail: 'Up to 40% of your heating escapes through old windows.',
  },
  {
    label: 'Expensive to fix.',
    detail: 'Full window replacement costs $15,000+ and takes weeks.',
  },
]

interface ProblemSolutionSectionProps {
  heading?: string
  lines?: ProblemLine[]
}

export function ProblemSolutionSection({
  heading = 'Single-Pane Windows Are Costing You',
  lines = defaultLines,
}: ProblemSolutionSectionProps) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-3xl">
          <h2
            className="font-display uppercase leading-[0.95] text-on-surface mb-12"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {heading}
          </h2>

          <ol className="space-y-0 ghost-border">
            {lines.map(({ label, detail }, i) => (
              <li
                key={label}
                className="ghost-border p-7 flex gap-6 items-start bg-surface hover:bg-surface-container-lowest transition-colors duration-150"
              >
                <span
                  className="font-display uppercase text-primary-container/30 leading-none shrink-0"
                  style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <p className="font-headline text-base font-semibold uppercase tracking-wide text-on-surface mb-1">
                    {label}
                  </p>
                  <p className="font-sans text-sm text-on-surface/80 leading-relaxed">
                    {detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
