import { EmergencyTextLink } from '@/components/ui/EmergencyTextLink'
import { EmergencyPhoneLink } from '@/components/ui/EmergencyPhoneLink'
import { tf } from '@/lib/tina'

export interface EmergencyStripBlockData {
  __typename?: string
  boldText?: string | null
  text?: string | null
  cta?: { label?: string | null; href?: string | null } | null
}

export function EmergencyStripBlock({ block }: { block?: EmergencyStripBlockData }) {
  const ctaLabel = block?.cta?.label
  const ctaHref = block?.cta?.href ?? '/services/#emergency'

  return (
    <section className="bg-danger py-6" data-tina-field={tf(block)}>
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        {(block?.boldText || block?.text) && (
          <p className="font-sans text-sm text-white leading-relaxed">
            {block?.boldText && (
              <strong data-tina-field={tf(block, 'boldText')}>{block.boldText}</strong>
            )}
            {block?.boldText && block?.text ? ' ' : null}
            {block?.text && (
              <span data-tina-field={tf(block, 'text')}>{block.text}</span>
            )}
          </p>
        )}
        <div className="flex items-center gap-6 flex-wrap">
          {ctaLabel && (
            <EmergencyTextLink
              label={ctaLabel}
              href={ctaHref}
              tinaField={tf(block?.cta, 'label')}
            />
          )}
          <EmergencyPhoneLink />
        </div>
      </div>
    </section>
  )
}
