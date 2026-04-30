import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export interface ContactCardsBlockData {
  __typename?: string
}

export function ContactCardsBlock() {
  const settings = getSiteSettings()

  const cards = [
    {
      icon: <Phone size={18} aria-hidden="true" />,
      label: 'Phone',
      value: settings.phone,
      href: settings.phoneHref,
      sublabel: 'Mon–Fri 8am–6pm · Emergency 24/7',
    },
    {
      icon: <Mail size={18} aria-hidden="true" />,
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
      sublabel: 'Reply within one business day',
    },
    {
      icon: <MapPin size={18} aria-hidden="true" />,
      label: 'Service Area',
      value: 'All of Melbourne',
      sublabel: 'Eastern, northern & inner-western suburbs',
    },
    {
      icon: <Clock size={18} aria-hidden="true" />,
      label: 'Emergency',
      value: '24/7 Emergency Glass',
      href: settings.phoneHref,
      sublabel: '2–4 hour response, inner suburbs',
    },
  ]

  return (
    <section className="bg-inverse-surface py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map(({ icon, label, value, href, sublabel }) => {
            const inner = (
              <div className="bg-white/10 p-5 flex flex-col gap-2 h-full border border-white/20">
                <div className="flex items-center gap-2 text-white">
                  {icon}
                  <span className="font-headline text-xs font-semibold uppercase tracking-widest text-white/90">
                    {label}
                  </span>
                </div>
                <p className="font-headline text-sm font-semibold uppercase tracking-wide text-white leading-tight">
                  {value}
                </p>
                <p className="font-sans text-xs text-white/80 leading-snug">{sublabel}</p>
              </div>
            )
            return href ? (
              <a key={label} href={href} className="hover:opacity-80 transition-opacity duration-150">
                {inner}
              </a>
            ) : (
              <div key={label}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
