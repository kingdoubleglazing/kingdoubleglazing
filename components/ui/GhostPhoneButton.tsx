import Link from 'next/link'
import { getSiteSettings } from '@/lib/site-settings'

interface GhostPhoneButtonProps {
  label?: string
  href?: string
  tinaField?: string
}

export function GhostPhoneButton({ label, href, tinaField }: GhostPhoneButtonProps) {
  const settings = getSiteSettings()
  const resolvedLabel = label ?? settings.phone
  const resolvedHref = href ?? settings.phoneHref

  return (
    <Link
      href={resolvedHref}
      data-tina-field={tinaField}
      className="inline-flex items-center justify-center gap-3 bg-transparent text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 ghost-border hover:bg-on-primary-fixed/10 transition-colors duration-150"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
        <path d="M3 1h3l1.5 3.5-1.5 1a8.5 8.5 0 004.5 4.5l1-1.5L15 10v3a1 1 0 01-1 1A13 13 0 012 2a1 1 0 011-1z" fill="currentColor"/>
      </svg>
      {resolvedLabel}
    </Link>
  )
}
