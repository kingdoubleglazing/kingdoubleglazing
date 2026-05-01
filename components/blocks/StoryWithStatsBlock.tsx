export interface StoryWithStatsBlockData {
  __typename?: string
  eyebrow?: string | null
  paragraphs?: (string | null)[] | null
  quote?: string | null
  stats?: Array<{
    __typename?: string
    value?: string | null
    label?: string | null
  } | null> | null
  tina?: {
    eyebrow?: string
    paragraphs?: string
    quote?: string
    stats?: Array<{ value?: string; label?: string } | undefined>
  }
}

export function StoryWithStatsBlock({ block }: { block: StoryWithStatsBlockData }) {
  const paragraphs = (block.paragraphs ?? []).filter(Boolean) as string[]
  const stats = (block.stats ?? []).filter(Boolean)

  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-7">
            <p
              data-tina-field={block.tina?.eyebrow}
              className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
            >
              {block.eyebrow ?? 'The Origin Story'}
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              <span className="block">Stop.</span>
              <span className="block text-primary-container">Don&apos;t Overpay.</span>
            </h2>
            <div className="space-y-5 font-sans text-base text-on-surface leading-relaxed max-w-xl">
              {paragraphs.map((para, i) => (
                <p key={i} data-tina-field={block.tina?.paragraphs}>
                  {para}
                </p>
              ))}
              {block.quote && (
                <blockquote className="border-l-4 border-primary-container pl-5 not-italic">
                  <p
                    data-tina-field={block.tina?.quote}
                    className="font-sans text-base font-semibold text-on-surface leading-relaxed"
                  >
                    {block.quote}
                  </p>
                </blockquote>
              )}
            </div>
          </div>

          <aside className="lg:col-span-5">
            <div className="grid grid-cols-2 gap-0 ghost-border">
              {stats.map((stat, i) => (
                <div
                  key={stat!.label ?? i}
                  className="ghost-border p-6 md:p-8 animate-stagger-child"
                  // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                  style={{ '--i': i } as any}
                >
                  <div className="h-0.5 w-8 bg-primary-container mb-5" aria-hidden="true" />
                  <p
                    data-tina-field={block.tina?.stats?.[i]?.value}
                    className="font-display uppercase leading-none text-primary-container mb-2"
                    style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                  >
                    {stat!.value}
                  </p>
                  <p
                    data-tina-field={block.tina?.stats?.[i]?.label}
                    className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
                  >
                    {stat!.label}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
