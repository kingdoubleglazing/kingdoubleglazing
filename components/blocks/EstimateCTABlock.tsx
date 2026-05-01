import { EstimateButton } from '@/components/ui/EstimateButton'

export interface EstimateCTABlockData {
  __typename?: string
  headline?: string | null
  subtext?: string | null
  cta?: { label?: string | null; href?: string | null } | null
  caption?: string | null
  tina?: {
    headline?: string
    subtext?: string
    cta?: { label?: string; href?: string }
    caption?: string
  }
}

export function EstimateCTABlock({ block }: { block: EstimateCTABlockData }) {
  const headline = block.headline ?? 'Get Your Price.\nIn Minutes Online.'
  const subtext = block.subtext ?? "We beat any genuine quote by 30%. That's a promise in writing."
  const buttonLabel = block.cta?.label ?? 'Start My Quote →'
  const buttonHref = block.cta?.href ?? '/instant-estimate/'
  const caption = block.caption ?? 'Enter your window sizes · See your price instantly'

  const [line1, line2] = headline.split('\n')

  return (
    <section className="bg-primary-container py-16 md:py-20 overflow-hidden relative">
      <span
        className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display uppercase leading-none text-on-primary-fixed/6"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
        aria-hidden="true"
      >
        PRICE
      </span>
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        <h2
          data-tina-field={block.tina?.headline}
          className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-4"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
        >
          {line1}
          {line2 && <><br />{line2}</>}
        </h2>
        <p
          data-tina-field={block.tina?.subtext}
          className="font-sans text-base text-on-primary-fixed mb-8 max-w-lg mx-auto leading-relaxed"
        >
          {subtext}
        </p>
        <EstimateButton label={buttonLabel} href={buttonHref} tinaField={block.tina?.cta?.label} />
        <p
          data-tina-field={block.tina?.caption}
          className="mt-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed/80"
        >
          {caption}
        </p>
      </div>
    </section>
  )
}
