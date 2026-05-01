import Link from 'next/link'
import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export interface EmergencyStripBlockData {
  __typename?: string
  boldText?: string | null
  text?: string | null
  ctaLabel?: string | null
  ctaHref?: string | null
  tina?: {
    boldText?: string
    text?: string
    ctaLabel?: string
  }
}

export function EmergencyStripBlock({ block }: { block?: EmergencyStripBlockData }) {
  const settings = getSiteSettings()
  const boldText = block?.boldText ?? 'Broken window right now?'
  const text = block?.text ?? 'We do emergency glass repair across Melbourne.'
  const ctaLabel = block?.ctaLabel ?? 'See emergency services →'
  const ctaHref = block?.ctaHref ?? '/services/#emergency'

  return (
    <section className="bg-danger py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-sm text-white leading-relaxed">
          <strong data-tina-field={block?.tina?.boldText}>{boldText}</strong>{' '}
          <span data-tina-field={block?.tina?.text}>{text}</span>
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <Link
            href={ctaHref}
            data-tina-field={block?.tina?.ctaLabel}
            className="font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150 underline underline-offset-4"
          >
            {ctaLabel}
          </Link>
          <a
            href={settings.phoneHref}
            className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150"
          >
            <Phone size={15} aria-hidden="true" />
            Call {settings.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
