import { ServiceCTAButton } from '@/components/ui/ServiceCTAButton'
import Link from 'next/link'
import { tf } from '@/lib/tina'

export interface WhatElseStripBlockData {
  __typename?: string
  eyebrow?: string | null
  heading?: string | null
  cta?: { label?: string | null; href?: string | null } | null
  services?: Array<{ label?: string | null; href?: string | null } | null> | null
}

export function WhatElseStripBlock({ block }: { block?: WhatElseStripBlockData }) {
  const eyebrow = block?.eyebrow
  const heading = block?.heading
  const ctaLabel = block?.cta?.label
  const ctaHref = block?.cta?.href ?? '/services/'
  const services = block?.services?.filter(Boolean) ?? []

  return (
    <section data-tina-field={tf(block)} className="bg-surface-container-low py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            {eyebrow && (
              <p
                data-tina-field={tf(block, 'eyebrow')}
                className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2"
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                data-tina-field={tf(block, 'heading')}
                className="font-headline text-lg md:text-xl font-semibold uppercase tracking-wide text-on-surface"
              >
                {heading}
              </h2>
            )}
          </div>
          {ctaLabel && (
            <ServiceCTAButton label={ctaLabel} href={ctaHref} tinaField={tf(block?.cta, 'label')} />
          )}
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {services.map((service, i) => {
            const label = service!.label
            if (!label) return null
            const href = service!.href ?? '#'
            return (
              <li key={i} data-tina-field={tf(service, 'label')}>
                <Link
                  href={href}
                  className="font-sans text-base text-on-surface hover:text-primary underline underline-offset-4 decoration-on-surface/40 hover:decoration-primary"
                >
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
