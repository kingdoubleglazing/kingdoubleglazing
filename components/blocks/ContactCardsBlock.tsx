import { Phone, Mail, Clock, MapPin } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'
import { tf } from '@/lib/tina'

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
}

export function ContactCardsBlock({ block }: { block?: ContactCardsBlockData }) {
  const settings = getSiteSettings()

  const cards = [
    {
      icon: <Phone size={18} aria-hidden="true" />,
      label: 'Phone',
      value: settings.phone,
      href: settings.phoneHref,
      sublabel: block?.phoneSublabel,
      tinaSublabel: tf(block, 'phoneSublabel'),
    },
    {
      icon: <Mail size={18} aria-hidden="true" />,
      label: 'Email',
      value: settings.email,
      href: `mailto:${settings.email}`,
      sublabel: block?.emailSublabel,
      tinaSublabel: tf(block, 'emailSublabel'),
    },
    {
      icon: <MapPin size={18} aria-hidden="true" />,
      label: block?.serviceAreaLabel,
      tinaLabel: tf(block, 'serviceAreaLabel'),
      value: block?.serviceAreaValue,
      tinaValue: tf(block, 'serviceAreaValue'),
      sublabel: block?.areaSublabel,
      tinaSublabel: tf(block, 'areaSublabel'),
    },
    {
      icon: <Clock size={18} aria-hidden="true" />,
      label: block?.emergencyLabel,
      tinaLabel: tf(block, 'emergencyLabel'),
      value: block?.emergencyValue,
      tinaValue: tf(block, 'emergencyValue'),
      href: settings.phoneHref,
      sublabel: block?.emergencySublabel,
      tinaSublabel: tf(block, 'emergencySublabel'),
    },
  ]

  return (
    <section data-tina-field={tf(block)} className="bg-inverse-surface py-10 md:py-14">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map(({ icon, label, tinaLabel, value, tinaValue, href, sublabel, tinaSublabel }, i) => {
            const inner = (
              <div className="bg-white/10 p-5 flex flex-col gap-2 h-full border border-white/20">
                <div className="flex items-center gap-2 text-white">
                  {icon}
                  {label && (
                    <span data-tina-field={tinaLabel} className="font-headline text-xs font-semibold uppercase tracking-widest text-white/90">
                      {label}
                    </span>
                  )}
                </div>
                {value && (
                  <p data-tina-field={tinaValue} className="font-headline text-sm font-semibold uppercase tracking-wide text-white leading-tight">
                    {value}
                  </p>
                )}
                {sublabel && (
                  <p data-tina-field={tinaSublabel} className="font-sans text-xs text-white/80 leading-snug">{sublabel}</p>
                )}
              </div>
            )
            return href ? (
              <a key={i} href={href} className="hover:opacity-80 transition-opacity duration-150">
                {inner}
              </a>
            ) : (
              <div key={i}>{inner}</div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
