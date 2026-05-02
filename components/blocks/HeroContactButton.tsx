import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

interface HeroContactButtonProps {
  variant?: 'overlay' | 'split'
  label?: string | null
  href?: string | null
  tina?: { label?: string; href?: string }
}

export function HeroContactButton({ variant = 'overlay', label, href, tina }: HeroContactButtonProps) {
  const settings = getSiteSettings()
  const resolvedLabel = label ?? settings.phone
  const resolvedHref  = href  ?? settings.phoneHref

  if (variant === 'split') {
    return (
      <a
        href={resolvedHref}
        data-tina-field={tina?.label}
        className="inline-flex items-center gap-3 bg-transparent text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-inverse-on-surface/30 hover:bg-inverse-on-surface/10 transition-colors duration-150"
      >
        Call {resolvedLabel}
      </a>
    )
  }

  return (
    <a
      href={resolvedHref}
      data-tina-field={tina?.label}
      className="inline-flex items-center gap-2 font-headline font-semibold uppercase tracking-wide text-white border-2 border-white px-8 py-4 text-lg hover:bg-white/10 transition-colors duration-150"
    >
      <Phone size={16} aria-hidden="true" />
      {resolvedLabel}
    </a>
  )
}
