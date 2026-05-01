import Image from 'next/image'
import { getSiteSettings } from '@/lib/site-settings'
import { WarrantyBadge } from '@/components/ui/WarrantyBadge'
import { HeroCTA } from './HeroCTA'
import { HeroContactButton } from './HeroContactButton'
import type { HeroBlockData } from './HeroBlock'

export function HeroOverlay({ block }: { block: HeroBlockData }) {
  const settings = getSiteSettings()
  const imageSrc = block.imageSrc ?? '/hero/hero-double-glazing.webp'
  const imageAlt = block.imageAlt ?? 'King Double Glazing Melbourne'
  const primaryHref = block.primaryCta?.label?.startsWith('Call')
    ? settings.phoneHref
    : (block.primaryCta?.href ?? '/instant-estimate/')

  return (
    <section className="relative flex flex-col overflow-hidden bg-[#111318] min-h-[60vh]">
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.50) 55%, rgba(0,0,0,0.30) 100%)' }}
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col justify-end flex-1 max-w-5xl mx-auto w-full px-4 pb-16 md:pb-20 pt-30">
        {block.badge && (
          <div className="mb-6 md:mb-8">
            <span
              data-tina-field={block.tina?.badge}
              className="inline-block bg-primary-container px-3 py-1 font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed"
            >
              {block.badge}
            </span>
          </div>
        )}
        <h1 className="font-display uppercase leading-[0.9] mb-6 md:mb-8">
          {block.headlineWhite && (
            <span
              data-tina-field={block.tina?.headlineWhite}
              className="block text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              {block.headlineWhite}
            </span>
          )}
          {block.headlineYellow && (
            <span
              data-tina-field={block.tina?.headlineYellow}
              className="block text-primary-container"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              {block.headlineYellow}
            </span>
          )}
        </h1>
        {block.subtext && (
          <p
            data-tina-field={block.tina?.subtext}
            className="font-sans text-lg md:text-xl text-white mb-6 max-w-2xl leading-relaxed"
          >
            {block.subtext}
          </p>
        )}
        {block.adaptorCaption && (
          <div className="border-l-4 border-primary-container pl-4 mb-6 max-w-xl">
            <p
              data-tina-field={block.tina?.adaptorCaption}
              className="font-sans font-bold text-white leading-snug"
              style={{ fontSize: 'clamp(1.1rem, 2.5vw, 1.4rem)' }}
            >
              {block.adaptorCaption}
            </p>
          </div>
        )}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          {block.primaryCta?.label && (
            <HeroCTA
              label={block.primaryCta.label}
              href={primaryHref}
              tina={block.tina?.primaryCta}
            />
          )}
          <HeroContactButton
            variant="overlay"
            label={block.secondaryCta?.label}
            href={block.secondaryCta?.href}
            tina={block.tina?.secondaryCta}
          />
          {block.showWarrantyBadge && (
            <div className="ml-auto hidden sm:block">
              <WarrantyBadge />
            </div>
          )}
        </div>
        {block.showWarrantyBadge && (
          <div className="flex sm:hidden mt-6">
            <WarrantyBadge />
          </div>
        )}
      </div>
    </section>
  )
}
