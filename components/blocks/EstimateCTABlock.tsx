import { EstimateButton } from '@/components/ui/EstimateButton'
import { tf } from '@/lib/tina'

export interface EstimateCTABlockData {
  __typename?: string
  headline?: string | null
  subtext?: string | null
  cta?: { label?: string | null; href?: string | null } | null
  caption?: string | null
}

export function EstimateCTABlock({ block }: { block: EstimateCTABlockData }) {
  const [line1, line2] = (block.headline ?? '').split('\n')

  return (
    <section data-tina-field={tf(block)} className="bg-primary-container py-16 md:py-20 overflow-hidden relative">
      <span
        className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display uppercase leading-none text-on-primary-fixed/6"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
        aria-hidden="true"
      >
        PRICE
      </span>
      <div className="relative max-w-5xl mx-auto px-4 text-center">
        {block.headline && (
          <h2
            data-tina-field={tf(block, 'headline')}
            className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 6rem)' }}
          >
            {line1}
            {line2 && <><br />{line2}</>}
          </h2>
        )}
        {block.subtext && (
          <p
            data-tina-field={tf(block, 'subtext')}
            className="font-sans text-base text-on-primary-fixed mb-8 max-w-lg mx-auto leading-relaxed"
          >
            {block.subtext}
          </p>
        )}
        {block.cta?.label && (
          <EstimateButton
            label={block.cta.label}
            href={block.cta.href ?? '/instant-estimate/'}
            tinaField={tf(block.cta, 'label')}
          />
        )}
        {block.caption && (
          <p
            data-tina-field={tf(block, 'caption')}
            className="mt-4 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed/80"
          >
            {block.caption}
          </p>
        )}
      </div>
    </section>
  )
}
