import Link from 'next/link'
import { Phone } from 'lucide-react'

type EmergencyBannerProps = {
  phone: string
  message: string
  cta: string
}

export function EmergencyBanner({ phone, message, cta }: EmergencyBannerProps) {
  return (
    <div className="bg-danger text-inverse-on-surface text-sm font-semibold">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4 flex-wrap">
        <span>{message}</span>
        <Link
          href={`tel:${phone.replace(/\s/g, '')}`}
          className="font-headline inline-flex items-center gap-1.5 bg-surface text-danger font-bold px-4 py-1.5 uppercase tracking-wide hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-150"
          aria-label={`${cta}: ${phone}`}
        >
          <Phone size={14} aria-hidden="true" />
          {cta}: {phone}
        </Link>
      </div>
    </div>
  )
}
