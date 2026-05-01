import { EmergencyTextLink } from '@/components/ui/EmergencyTextLink'
import { EmergencyPhoneLink } from '@/components/ui/EmergencyPhoneLink'

export interface EmergencyStripBlockData {
  __typename?: string
  boldText?: string | null
  text?: string | null
  cta?: { label?: string | null; href?: string | null } | null
  tina?: {
    boldText?: string
    text?: string
    cta?: { label?: string; href?: string }
  }
}

export function EmergencyStripBlock({ block }: { block?: EmergencyStripBlockData }) {
  const boldText = block?.boldText ?? 'Broken window right now?'
  const text = block?.text ?? 'We do emergency glass repair across Melbourne.'
  const ctaLabel = block?.cta?.label ?? 'See emergency services →'
  const ctaHref = block?.cta?.href ?? '/services/#emergency'

  return (
    <section className="bg-danger py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-sm text-white leading-relaxed">
          <strong data-tina-field={block?.tina?.boldText}>{boldText}</strong>{' '}
          <span data-tina-field={block?.tina?.text}>{text}</span>
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <EmergencyTextLink label={ctaLabel} href={ctaHref} tinaField={block?.tina?.cta?.label} />
          <EmergencyPhoneLink />
        </div>
      </div>
    </section>
  )
}
