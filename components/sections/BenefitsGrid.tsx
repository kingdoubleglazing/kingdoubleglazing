import {
  Layers,
  Zap,
  Tag,
  TrendingDown,
  ShieldCheck,
  MapPin,
  type LucideIcon,
} from 'lucide-react'

export interface BenefitItem {
  icon: LucideIcon
  heading: string
  text: string
}

const defaultItems: BenefitItem[] = [
  {
    icon: Layers,
    heading: 'Keep Your Existing Frames',
    text: 'We add glass to the windows you already have. Same frames. Same look. Zero demolition.',
  },
  {
    icon: Zap,
    heading: 'Installed in One Day',
    text: 'Most Melbourne homes are done in a single visit. You\'re back to normal by sundown.',
  },
  {
    icon: Tag,
    heading: 'From $595/m²',
    text: 'Half the price of full window replacement. Same noise and warmth results.',
  },
  {
    icon: TrendingDown,
    heading: 'Up to 40% Less on Heating',
    text: 'Cut your energy bills year-round. The upgrade that actually pays for itself.',
  },
  {
    icon: ShieldCheck,
    heading: '10-Year Warranty',
    text: 'Glass and workmanship guaranteed in writing on every job. No conditions.',
  },
  {
    icon: MapPin,
    heading: 'We Beat Any Quote by 30%',
    text: 'Send us a genuine competitor quote. We\'ll come in 30% cheaper — guaranteed in writing.',
  },
]

interface BenefitsGridProps {
  eyebrow?: string
  heading?: string
  items?: readonly BenefitItem[]
}

export function BenefitsGrid({
  eyebrow = 'Why King',
  heading = "What You\nActually Get",
  items = defaultItems,
}: BenefitsGridProps) {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">

        {/* Section header */}
        <div className="mb-8 md:mb-16">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-display uppercase leading-[0.88] text-on-surface"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
          >
            {heading.split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? (
                  <>
                    <span className="text-primary-container bg-inverse-surface px-2 inline-block leading-tight mr-2">
                      {line.split(' ')[0]}
                    </span>
                    {line.split(' ').slice(1).join(' ')}
                  </>
                ) : line}
              </span>
            ))}
          </h2>
        </div>

        {/* Mobile: compact bullet list. sm+: full card grid */}
        <ul className="flex flex-col divide-y divide-on-surface/8 sm:divide-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:ghost-border">
          {items.map(({ icon: Icon, heading: itemHeading, text }, i) => {
            const num = String(i + 1).padStart(2, '0')
            return (
              <li
                key={itemHeading}
                className="group relative overflow-hidden bg-surface animate-stagger-child
                  flex items-center gap-3 py-3 sm:py-0
                  sm:flex-col sm:items-start sm:ghost-border sm:p-7 sm:card-interactive"
                // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                style={{ '--i': i } as any}
              >
                {/* top accent line — sm+ only */}
                <div
                  aria-hidden="true"
                  className="hidden sm:block absolute inset-x-0 top-0 h-0.5 bg-primary-container transition-all duration-200 ease-in-out group-hover:h-1"
                />
                {/* ghost number — sm+ only */}
                <span
                  aria-hidden="true"
                  className="hidden sm:block pointer-events-none absolute -bottom-4 -right-2 font-display text-on-surface/[0.04] select-none leading-none"
                  style={{ fontSize: 'clamp(7rem, 14vw, 11rem)' }}
                >
                  {num}
                </span>

                {/* icon square */}
                <div className="w-8 h-8 sm:w-9 sm:h-9 sm:mb-6 bg-primary-container flex items-center justify-center shrink-0">
                  <Icon size={16} strokeWidth={2} aria-hidden="true" className="text-on-primary-fixed" />
                </div>

                {/* text */}
                <div className="flex-1 min-w-0 sm:flex-none">
                  <h3 className="font-headline text-sm sm:text-[1.1rem] font-semibold uppercase tracking-wide text-on-surface leading-snug sm:mb-3">
                    {itemHeading}
                  </h3>
                  {/* body text hidden on mobile to save space */}
                  <p className="hidden sm:block font-sans text-sm text-on-surface/75 leading-relaxed relative z-10">
                    {text}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>

      </div>
    </section>
  )
}
