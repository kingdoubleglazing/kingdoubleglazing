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
import { sanityFetch } from '@/sanity/lib/fetch'
import { HOME_PAGE_QUERY } from '@/sanity/lib/queries'
import type { HomePage } from '@/sanity/types'

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

const FALLBACK_ITEMS = [
  { icon: Hammer,       headline: 'No Structural Work',        sub: 'No demolition, no painting, no plastering. Your frames stay where they are.' },
  { icon: Layers,       headline: 'Suits Most Domestic Frames', sub: 'Custom adaptors fit timber, aluminium, and steel windows.' },
  { icon: Zap,          headline: 'Installed in One Day',       sub: 'Most Melbourne homes done by sundown.' },
  { icon: Volume2,      headline: 'Up to 70% Quieter',          sub: 'Acoustic glass cuts traffic and tram noise.' },
  { icon: Thermometer,  headline: '50–55% Less Heat Loss',      sub: 'Compared to standard single glazing — lower bills, warmer rooms.' },
  { icon: BadgePercent, headline: 'We Beat Any Quote by 30%',   sub: 'Send us a real competitor quote. We come in 30% cheaper, in writing, with the 10-year warranty.' },
]

export async function WhyRetrofit() {
  const page = await sanityFetch<HomePage>({ query: HOME_PAGE_QUERY, tags: ['homePage'] })

  const eyebrow  = page.whyRetrofitEyebrow  ?? 'WHY RETROFIT?'
  const heading1 = page.whyRetrofitHeading1 ?? "Stop. Don’t Overpay."
  const heading2 = page.whyRetrofitHeading2 ?? 'Upgrade What You Already Have.'

  const items = page.whyRetrofitItems?.length
    ? page.whyRetrofitItems.map(({ iconKey, headline, sub }) => ({
        icon: ICON_MAP[iconKey] ?? Hammer,
        headline,
        sub,
      }))
    : FALLBACK_ITEMS

  return (
    <section className="bg-surface py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">

        <div className="mb-8">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-display uppercase leading-[0.88] text-on-surface"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            <span className="block">{heading1}</span>
            <span className="block text-primary-container">{heading2}</span>
          </h2>
        </div>

        <ul className="flex flex-col divide-y divide-on-surface/10 lg:divide-y-0 lg:grid lg:grid-cols-3 lg:ghost-border">
          {items.map(({ icon: Icon, headline, sub }) => (
            <li
              key={headline}
              className="flex items-center gap-3 py-3
                lg:ghost-border lg:p-5 lg:flex-col lg:items-start lg:gap-3 lg:py-5"
            >
              <div className="w-7 h-7 lg:w-9 lg:h-9 bg-primary-container flex items-center justify-center shrink-0">
                <Icon size={14} strokeWidth={2} aria-hidden="true" className="text-on-primary-fixed lg:[font-size:16px]" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-headline text-sm lg:text-base font-semibold uppercase tracking-wide text-on-surface leading-snug lg:mb-1">
                  {headline}
                </h3>
                <p className="hidden lg:block font-sans text-sm text-on-surface leading-snug">
                  {sub}
                </p>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </section>
  )
}
