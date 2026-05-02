import { getSiteSettings } from '@/lib/site-settings'
import { DarkCTAButton } from '@/components/ui/DarkCTAButton'
import { GhostPhoneButton } from '@/components/ui/GhostPhoneButton'

const DEFAULT_TRUST_ITEMS = [
  'Price locked at quote',
  '10-year warranty',
  'We beat any quote by 30%',
]

interface CtaBannerProps {
  heading?: string
  subtext?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  trustItems?: (string | null)[]
  tina?: {
    heading?: string
    subtext?: string
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
    trustItems?: string
  }
}

export function CtaBanner({
  heading = "Stop.\nDon't Overpay.",
  subtext = 'Get a transparent, itemised estimate in minutes. No sales calls.',
  primaryCta = { label: 'Get Instant Estimate', href: '/instant-estimate/' },
  secondaryCta,
  trustItems,
  tina,
}: CtaBannerProps) {
  if (!secondaryCta) {
    const settings = getSiteSettings()
    secondaryCta = { label: settings.phone, href: settings.phoneHref }
  }
  const items = trustItems?.filter(Boolean) as string[] | undefined
  const resolvedItems = items?.length ? items : DEFAULT_TRUST_ITEMS

  return (
    <section className="bg-primary-container py-16 md:py-24 overflow-hidden relative">

      {/* Oversized background stamp — structural texture */}
      <span
        className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display uppercase leading-none text-on-primary-fixed/[0.06]"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
        aria-hidden="true"
      >
        KING
      </span>

      <div className="relative max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-8">

          {/* Headline block */}
          <div>
            <h2
              data-tina-field={tina?.heading}
              className="font-display uppercase leading-[0.88] text-on-primary-fixed"
              style={{ fontSize: 'clamp(3rem, 8vw, 7rem)' }}
            >
              {heading.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p
              data-tina-field={tina?.subtext}
              className="font-sans text-base text-on-primary-fixed mt-5 max-w-md leading-relaxed mx-auto"
            >
              {subtext}
            </p>
          </div>

          {/* CTA cluster */}
          <div className="flex flex-col sm:flex-row gap-3">
            <DarkCTAButton label={primaryCta.label} href={primaryCta.href} tinaField={tina?.primaryCta?.label} />
            <GhostPhoneButton label={secondaryCta.label} href={secondaryCta.href} tinaField={tina?.secondaryCta?.label} />
          </div>

          {/* Trust footnote */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {resolvedItems.map((item, i) => (
              <p
                key={i}
                data-tina-field={tina?.trustItems}
                className="font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/80"
              >
                ✓ {item}
              </p>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
