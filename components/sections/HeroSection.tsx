import Image from 'next/image'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { WarrantyBadge } from '@/components/ui/WarrantyBadge'

interface HeroSectionProps {
  badge?: string
  headlineWhite: string
  headlineYellow: string
  subtext: string
  adaptorCaption?: string
  filterMessage?: string
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
  adaptorCaption,
  filterMessage,
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
      <div className="relative z-10 flex flex-col justify-end flex-1 max-w-5xl mx-auto w-full px-4 pb-16 md:pb-20 pt-30">
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
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            {headlineWhite}
          </span>{' '}
          <span
            className="block text-primary-container"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            {headlineYellow}
          </span>
        </h1>

        {/* Subtext */}
        <p className="font-sans text-lg md:text-xl text-white mb-6 max-w-2xl leading-relaxed">
          {subtext}
        </p>

        {/* Adaptor caption — prominent, between subtext and CTAs */}
        {adaptorCaption && (
          <div className="border-l-4 border-primary-container pl-4 mb-6 max-w-xl">
            <p className="font-sans font-bold text-white leading-snug" style={{ fontSize: 'clamp(1.1rem,2.5vw,1.4rem)' }}>
              {adaptorCaption}
            </p>
          </div>
        )}

        {/* Filter message — anti-time-waster callout */}
        {filterMessage && (
          <p className="font-sans text-sm font-medium text-white border-l-2 border-primary-container pl-3 mb-7 max-w-xl leading-snug">
            {filterMessage}
          </p>
        )}

        {/* CTAs + Warranty Badge */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <Button as="link" href={primaryCta.href} size="lg">
            {primaryCta.label}
          </Button>

          <a
            href={secondaryCta?.href ?? '#'}
            className="inline-flex items-center gap-2 font-headline font-semibold uppercase tracking-wide text-white border-2 border-white px-8 py-4 text-lg hover:bg-white/10 transition-colors duration-150"
          >
            <Phone size={16} aria-hidden="true" />
            {secondaryCta?.label ?? 'Call Now'}
          </a>

          {showWarrantyBadge && (
            <div className="ml-auto hidden sm:block">
              <WarrantyBadge />
            </div>
          )}
        </div>

        {/* Warranty badge — mobile: below CTAs */}
        {showWarrantyBadge && (
          <div className="flex sm:hidden mt-6">
            <WarrantyBadge />
          </div>
        )}
      </div>
    </section>
  )
}
