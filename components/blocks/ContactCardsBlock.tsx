import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export interface ContactCardsBlockData {
  __typename?: string
  phoneSublabel?: string | null
  emailSublabel?: string | null
  serviceAreaLabel?: string | null
  serviceAreaValue?: string | null
  areaSublabel?: string | null
  emergencyLabel?: string | null
  emergencyValue?: string | null
  emergencySublabel?: string | null
  tina?: {
    phoneSublabel?: string
    emailSublabel?: string
    serviceAreaLabel?: string
    serviceAreaValue?: string
    areaSublabel?: string
    emergencyLabel?: string
    emergencyValue?: string
    emergencySublabel?: string
  }
}

export function ContactCardsBlock({ block }: { block?: ContactCardsBlockData }) {
  const settings = getSiteSettings()

  const cards = [
    {
      icon: <Phone size={18} aria-hidden="true" />,
      label: 'Phone',
      value: settings.phone,
      href: settings.phoneHref,
      sublabel: block?.phoneSublabel ?? 'Mon–Fri 8am–6pm · Emergency 24/7',
      tinaField: block?.tina?.phoneSublabel,
    },
    {
      icon: <Mail size={18} aria-hidden="true" />,
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
      sublabel: block?.emailSublabel ?? 'Reply within one business day',
      tinaField: block?.tina?.emailSublabel,
    },
    {
      icon: <MapPin size={18} aria-hidden="true" />,
      label: block?.serviceAreaLabel ?? 'Service Area',
      tinaLabel: block?.tina?.serviceAreaLabel,
      value: block?.serviceAreaValue ?? 'All of Melbourne',
      tinaValue: block?.tina?.serviceAreaValue,
      sublabel: block?.areaSublabel ?? 'Eastern, northern & inner-western suburbs',
      tinaField: block?.tina?.areaSublabel,
    },
    {
      icon: <Clock size={18} aria-hidden="true" />,
      label: block?.emergencyLabel ?? 'Emergency',
      tinaLabel: block?.tina?.emergencyLabel,
      value: block?.emergencyValue ?? '24/7 Emergency Glass',
      tinaValue: block?.tina?.emergencyValue,
      href: settings.phoneHref,
      sublabel: block?.emergencySublabel ?? '2–4 hour response, inner suburbs',
      tinaField: block?.tina?.emergencySublabel,
    },
  ]

  return (
    <section className="bg-inverse-surface py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map(({ icon, label, tinaLabel, value, tinaValue, href, sublabel, tinaField }) => {
            const inner = (
              <div className="bg-white/10 p-5 flex flex-col gap-2 h-full border border-white/20">
                <div className="flex items-center gap-2 text-white">
                  {icon}
                  <span data-tina-field={tinaLabel} className="font-headline text-xs font-semibold uppercase tracking-widest text-white/90">
                    {label}
                  </span>
                </div>
                <p data-tina-field={tinaValue} className="font-headline text-sm font-semibold uppercase tracking-wide text-white leading-tight">
                  {value}
                </p>
                <p data-tina-field={tinaField} className="font-sans text-xs text-white/80 leading-snug">{sublabel}</p>
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
