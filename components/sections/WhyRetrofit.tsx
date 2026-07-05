import {
  BadgePercent,
  Clock,
  Hammer,
  Layers,
  ShieldCheck,
  Star,
  Thermometer,
  Volume2,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  hammer: Hammer,
  layers: Layers,
  zap: Zap,
  volume2: Volume2,
  thermometer: Thermometer,
  badgePercent: BadgePercent,
  clock: Clock,
  shieldCheck: ShieldCheck,
  star: Star,
  wrench: Wrench,
}

interface WhyRetrofitProps {
  tinaSelf?: string
  eyebrow?: string
  heading1?: string
  heading2?: string
  items?: Array<{
    iconKey: string
    headline?: string
    sub?: string
    tinaHeadline?: string
    tinaSub?: string
  }>
  tinaEyebrow?: string
  tinaHeading1?: string
  tinaHeading2?: string
}

export function WhyRetrofit({
  tinaSelf,
  eyebrow,
  heading1,
  heading2,
  items,
  tinaEyebrow,
  tinaHeading1,
  tinaHeading2,
}: WhyRetrofitProps) {
  const resolvedItems = (items ?? []).map((item) => ({
    icon: ICON_MAP[item.iconKey] ?? Hammer,
    ...item,
  }))

  return (
    <section data-tina-field={tinaSelf} className="bg-surface py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">

        {(eyebrow || heading1 || heading2) && (
          <div className="mb-8">
            {eyebrow && (
              <p
                data-tina-field={tinaEyebrow}
                className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3"
              >
                {eyebrow}
              </p>
            )}
            {(heading1 || heading2) && (
              <h2
                className="font-display uppercase leading-[0.88] text-on-surface"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {heading1 && (
                  <span data-tina-field={tinaHeading1} className="block">{heading1}</span>
                )}
                {heading2 && (
                  <span data-tina-field={tinaHeading2} className="block text-primary-container">{heading2}</span>
                )}
              </h2>
            )}
          </div>
        )}

        {resolvedItems.length > 0 && (
          <ul className="flex flex-col divide-y divide-on-surface/10 lg:divide-y-0 lg:grid lg:grid-cols-3 lg:ghost-border">
            {resolvedItems.map(({ icon: Icon, headline, sub, tinaHeadline, tinaSub }, i) => (
              <li
                key={headline ?? i}
                className="flex items-center gap-3 py-3
                  lg:ghost-border lg:p-5 lg:flex-col lg:items-start lg:gap-3 lg:py-5"
              >
                <div className="w-7 h-7 lg:w-9 lg:h-9 bg-primary-container flex items-center justify-center shrink-0">
                  <Icon size={14} strokeWidth={2} aria-hidden="true" className="text-on-primary-fixed lg:[font-size:16px]" />
                </div>
                <div className="flex-1 min-w-0">
                  {headline && (
                    <h3
                      data-tina-field={tinaHeadline}
                      className="font-headline text-sm lg:text-base font-semibold uppercase tracking-wide text-on-surface leading-snug lg:mb-1"
                    >
                      {headline}
                    </h3>
                  )}
                  {sub && (
                    <p
                      data-tina-field={tinaSub}
                      className="hidden lg:block font-sans text-sm text-on-surface leading-snug"
                    >
                      {sub}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}

      </div>
    </section>
  )
}
