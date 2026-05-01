import type { HeroBlockData } from './HeroBlock'

export function HeroCentered({ block }: { block: HeroBlockData }) {
  return (
    <section className="bg-inverse-surface py-16 md:py-24 overflow-hidden relative">
      {block.accentWord && (
        <span
          className="pointer-events-none select-none absolute -bottom-8 -right-6 font-display uppercase leading-none text-inverse-on-surface/4"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
          aria-hidden="true"
        >
          {block.accentWord}
        </span>
      )}
      <div className="relative max-w-5xl mx-auto px-4">
        {block.badge && (
          <span className="inline-block bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5">
            {block.badge}
          </span>
        )}
        <h1
          className="font-display uppercase leading-none text-inverse-on-surface mb-6"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          <span data-tina-field={block.tina?.headlineWhite}>
            {block.headlineWhite}
          </span>{' '}
          <span data-tina-field={block.tina?.headlineYellow} className="text-primary-container">
            {block.headlineYellow}
          </span>
        </h1>
        {block.subtext && (
          <p
            data-tina-field={block.tina?.subtext}
            className="font-sans text-base text-inverse-on-surface max-w-xl leading-relaxed"
          >
            {block.subtext}
          </p>
        )}
      </div>
    </section>
  )
}
