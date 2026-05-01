import { getSiteSettings } from '@/lib/site-settings'
import { CallButton } from '@/components/ui/CallButton'

export interface FreeAdviceBlockData {
  __typename?: string
  eyebrow?: string | null
  headingLine1?: string | null
  headingLine2?: string | null
  body?: string | null
  buttonLabel?: string | null
  tina?: {
    eyebrow?: string
    headingLine1?: string
    headingLine2?: string
    body?: string
    buttonLabel?: string
  }
}

export function FreeAdviceBlock({ block }: { block?: FreeAdviceBlockData }) {
  const settings = getSiteSettings()
  const fab = settings.freeAdviceBlock

  const eyebrow      = block?.eyebrow      ?? fab?.eyebrow      ?? 'Free Advice'
  const headingLine1 = block?.headingLine1 ?? fab?.headingLine1 ?? 'Got a question'
  const headingLine2 = block?.headingLine2 ?? fab?.headingLine2 ?? "we haven't covered?"
  const body         = block?.body         ?? fab?.body         ?? "Call us directly. Free advice, no sales pitch. 25+ years in glazing — we'll give you a straight answer."
  const buttonLabel  = block?.buttonLabel  ?? fab?.buttonLabel  ?? 'Call Us'

  return (
    <section className="bg-inverse-surface py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-2xl">
          <p
            data-tina-field={block?.tina?.eyebrow}
            className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3"
          >
            {eyebrow}
          </p>
          <h2
            className="font-display uppercase leading-[0.9] text-inverse-on-surface mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
          >
            <span data-tina-field={block?.tina?.headingLine1}>{headingLine1}</span>
            <br />
            <span data-tina-field={block?.tina?.headingLine2} className="text-primary-container">{headingLine2}</span>
          </h2>
          <p
            data-tina-field={block?.tina?.body}
            className="font-sans text-base text-inverse-on-surface leading-relaxed mb-6 max-w-lg"
          >
            {body}
          </p>
          <CallButton label={buttonLabel} tinaField={block?.tina?.buttonLabel} />
        </div>
      </div>
    </section>
  )
}
