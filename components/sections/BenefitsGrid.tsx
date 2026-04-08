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
    text: 'Retrofit installs into your current timber or aluminium — no structural work, no demolition, no mess.',
  },
  {
    icon: Zap,
    heading: 'Installed in One Day',
    text: "Most Melbourne homes are completed in a single visit. You're back to normal by sundown.",
  },
  {
    icon: Tag,
    heading: 'From $495/m²',
    text: 'Half the cost of full window replacement with equivalent thermal and acoustic performance.',
  },
  {
    icon: TrendingDown,
    heading: 'Up to 40% Energy Saving',
    text: 'Cut heating and cooling bills year-round. The glass upgrade that actually pays for itself.',
  },
  {
    icon: ShieldCheck,
    heading: '10-Year Warranty',
    text: 'Glass and workmanship guaranteed in writing — not just a verbal promise.',
  },
  {
    icon: MapPin,
    heading: 'Melbourne-Wide Coverage',
    text: 'We service all suburbs from the CBD to the Mornington Peninsula. No travel surcharges.',
  },
]

interface BenefitsGridProps {
  eyebrow?: string
  heading?: string
  items?: BenefitItem[]
}

export function BenefitsGrid({
  eyebrow = 'Why Choose King',
  heading = "What You\nActually Get",
  items = defaultItems,
}: BenefitsGridProps) {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section header */}
        <div className="mb-12 md:mb-16">
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

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 ghost-border">
          {items.map(({ icon: Icon, heading: itemHeading, text }, i) => {
            const num = String(i + 1).padStart(2, '0')
            return (
              <article
                key={itemHeading}
                className="group relative overflow-hidden bg-surface ghost-border p-7 card-interactive animate-stagger-child"
                // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                style={{ '--i': i } as any}
              >
                {/* Yellow top accent bar — thickens on hover via height trick */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 bg-primary-container transition-all duration-200 ease-in-out group-hover:h-1"
                />

                {/* Oversized background number stamp */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -bottom-4 -right-2 font-display text-on-surface/[0.04] select-none leading-none"
                  style={{ fontSize: 'clamp(7rem, 14vw, 11rem)' }}
                >
                  {num}
                </span>

                {/* Icon tag */}
                <div className="mb-6 w-9 h-9 bg-primary-container flex items-center justify-center shrink-0">
                  <Icon
                    size={18}
                    strokeWidth={2}
                    aria-hidden="true"
                    className="text-on-primary-fixed"
                  />
                </div>

                {/* Heading */}
                <h3 className="font-headline text-[1.1rem] font-semibold uppercase tracking-wide text-on-surface leading-snug mb-3">
                  {itemHeading}
                </h3>

                {/* Body */}
                <p className="font-sans text-sm text-on-surface/55 leading-relaxed relative z-10">
                  {text}
                </p>
              </article>
            )
          })}
        </div>

      </div>
    </section>
  )
}
