import { CallButton } from '@/components/ui/CallButton'
import { tf } from '@/lib/tina'

export interface FreeAdviceBlockData {
  __typename?: string
  eyebrow?: string | null
  headingLine1?: string | null
  headingLine2?: string | null
  body?: string | null
  buttonLabel?: string | null
}

export function FreeAdviceBlock({ block }: { block?: FreeAdviceBlockData }) {
  return (
    <section data-tina-field={tf(block)} className="bg-inverse-surface py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-2xl">
          {block?.eyebrow && (
            <p
              data-tina-field={tf(block, 'eyebrow')}
              className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3"
            >
              {block.eyebrow}
            </p>
          )}
          {(block?.headingLine1 || block?.headingLine2) && (
            <h2
              className="font-display uppercase leading-[0.9] text-inverse-on-surface mb-4"
              style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
            >
              {block?.headingLine1 && (
                <span data-tina-field={tf(block, 'headingLine1')}>{block.headingLine1}</span>
              )}
              {block?.headingLine1 && block?.headingLine2 && <br />}
              {block?.headingLine2 && (
                <span data-tina-field={tf(block, 'headingLine2')} className="text-primary-container">{block.headingLine2}</span>
              )}
            </h2>
          )}
          {block?.body && (
            <p
              data-tina-field={tf(block, 'body')}
              className="font-sans text-base text-inverse-on-surface leading-relaxed mb-6 max-w-lg"
            >
              {block.body}
            </p>
          )}
          <CallButton label={block?.buttonLabel ?? undefined} tinaField={tf(block, 'buttonLabel')} />
        </div>
      </div>
    </section>
  )
}
