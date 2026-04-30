import Link from 'next/link'
import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export function EmergencyStripBlock() {
  const settings = getSiteSettings()

  return (
    <section className="bg-danger py-6">
      <div className="max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
        <p className="font-sans text-sm text-white leading-relaxed">
          <strong>Broken window right now?</strong>{' '}
          We do emergency glass repair across Melbourne.
        </p>
        <div className="flex items-center gap-6 flex-wrap">
          <Link
            href="/services/#emergency"
            className="font-headline text-sm font-semibold uppercase tracking-wide text-white hover:text-white/80 transition-colors duration-150 underline underline-offset-4"
          >
            See emergency services →
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
