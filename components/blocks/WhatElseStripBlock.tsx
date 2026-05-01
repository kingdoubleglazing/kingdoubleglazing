import Link from 'next/link'

const DEFAULT_SERVICES = [
  { label: 'Emergency repairs',  href: '/services/#emergency' },
  { label: 'Shower screens',     href: '/services/#shower-screens' },
  { label: 'Splashbacks',        href: '/services/#splashbacks' },
  { label: 'Custom mirrors',     href: '/services/#mirrors' },
  { label: 'Commercial glazing', href: '/services/#commercial' },
]

export interface WhatElseStripBlockData {
  __typename?: string
  eyebrow?: string | null
  heading?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  services?: Array<{ label?: string | null; href?: string | null } | null> | null
  tina?: {
    eyebrow?: string
    heading?: string
    ctaLabel?: string
  }
}

export function WhatElseStripBlock({ block }: { block?: WhatElseStripBlockData }) {
  const eyebrow = block?.eyebrow ?? 'What Else We Do'
  const heading = block?.heading ?? "We're glaziers. We do the lot."
  const ctaLabel = block?.ctaLabel ?? 'See All Services →'
  const ctaHref = block?.ctaHref ?? '/services/'
  const services = block?.services?.filter(Boolean).map(s => ({ label: s!.label ?? '', href: s!.href ?? '#' }))
    ?? DEFAULT_SERVICES

  return (
    <section className="bg-surface-container-low py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p
              data-tina-field={block?.tina?.eyebrow}
              className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2"
            >
              {eyebrow}
            </p>
            <h2
              data-tina-field={block?.tina?.heading}
              className="font-headline text-lg md:text-xl font-semibold uppercase tracking-wide text-on-surface"
            >
              {heading}
            </h2>
          </div>
          <Link
            href={ctaHref}
            data-tina-field={block?.tina?.ctaLabel}
            className="inline-flex items-center gap-2 bg-on-surface text-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-150 shrink-0"
          >
            {ctaLabel}
          </Link>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {services.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-sans text-base text-on-surface hover:text-primary underline underline-offset-4 decoration-on-surface/40 hover:decoration-primary"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
