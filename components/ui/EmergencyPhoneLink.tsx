import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export function EmergencyPhoneLink() {
  const settings = getSiteSettings()

  return (
    <a
      href={settings.phoneHref}
      className="inline-flex items-center gap-2 font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150"
    >
      <Phone size={15} aria-hidden="true" />
      Call {settings.phone}
    </a>
  )
}
