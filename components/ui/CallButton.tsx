import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

interface CallButtonProps {
  label?: string
  tinaField?: string
}

export function CallButton({ label = 'Call Us', tinaField }: CallButtonProps) {
  const settings = getSiteSettings()

  return (
    <a
      href={settings.phoneHref}
      data-tina-field={tinaField}
      className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-base font-semibold uppercase tracking-[0.1em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150"
    >
      <Phone size={18} aria-hidden="true" />
      {label} &mdash; {settings.phone}
    </a>
  )
}
