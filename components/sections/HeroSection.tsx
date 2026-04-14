import Image from 'next/image'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { Button } from '@/components/ui/Button'
import { WarrantyBadge } from '@/components/ui/WarrantyBadge'

interface HeroSectionProps {
  badge?: string
  headlineWhite: string
  headlineYellow: string
  subtext: string
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  imageSrc?: string
  imageAlt?: string
  compact?: boolean
  showWarrantyBadge?: boolean
}

export function HeroSection({
  badge = "Stop. Don't Overpay.",
  headlineWhite,
  headlineYellow,
  subtext,
  primaryCta,
  secondaryCta,
  imageSrc = '/hero-main.webp',
  imageAlt = 'Double glazed windows with Melbourne skyline view',
  compact = false,
  showWarrantyBadge = false,
}: HeroSectionProps) {
  return (
    <section className={`relative flex flex-col overflow-hidden bg-[#111318] ${compact ? 'min-h-[50vh]' : 'min-h-[70vh]'}`}>
      {/* Background image */}
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay — graduated, heavier at bottom-left where content sits */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(105deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.48) 55%, rgba(0,0,0,0.28) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-end flex-1 max-w-7xl mx-auto w-full px-4 pb-16 md:pb-20 pt-36">
        {/* Badge */}
        <div className="mb-6 md:mb-8">
          <span className="inline-block bg-primary-container px-3 py-1 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed">
            {badge}
          </span>
        </div>

        {/* Headline */}
        <h1 className="font-display uppercase leading-[0.9] mb-6 md:mb-8">
          <span
            className="block text-white"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}
          >
            {headlineWhite}
          </span>
          <span
            className="block text-primary-container"
            style={{ fontSize: 'clamp(3.5rem, 9vw, 8.5rem)' }}
          >
            {headlineYellow}
          </span>
        </h1>

        {/* Subtext */}
        <p
          className="font-headline font-semibold uppercase tracking-widest text-white/75 mb-8 md:mb-10"
          style={{ fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)' }}
        >
          {subtext}
        </p>

        {/* CTAs + Warranty Badge */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Button as="link" href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>

          <a
            href={secondaryCta?.href ?? siteConfig.phoneHref}
            className="inline-flex items-center gap-2 font-headline font-semibold uppercase tracking-wide text-white border-2 border-white px-8 py-4 text-lg hover:bg-white/10 transition-colors duration-150"
          >
            <Phone size={16} aria-hidden="true" />
            {secondaryCta?.label ?? 'Call Now'}
          </a>

          {showWarrantyBadge && (
            <div className="ml-auto hidden sm:block">
              <WarrantyBadge className="w-[100px] h-[100px] md:w-[120px] md:h-[120px]" />
            </div>
          )}
        </div>

        {/* Warranty badge — mobile: below CTAs, centred */}
        {showWarrantyBadge && (
          <div className="flex sm:hidden mt-6">
            <WarrantyBadge className="w-[90px] h-[90px]" />
          </div>
        )}
      </div>
    </section>
  )
}
