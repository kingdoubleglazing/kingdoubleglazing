import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'
import { WarrantyBadge } from '@/components/ui/WarrantyBadge'
import { Button } from '@/components/ui/Button'

export interface HeroBlockData {
  __typename?: string
  variant?: string | null
  badge?: string | null
  headlineWhite?: string | null
  headlineYellow?: string | null
  subtext?: string | null
  primaryCtaLabel?: string | null
  primaryCtaHref?: string | null
  imageSrc?: string | null
  imageAlt?: string | null
  showWarrantyBadge?: boolean | null
  adaptorCaption?: string | null
  accentWord?: string | null
  tina?: {
    badge?: string
    headlineWhite?: string
    headlineYellow?: string
    subtext?: string
    adaptorCaption?: string
  }
}

export function HeroBlock({ block }: { block: HeroBlockData }) {
  const settings = getSiteSettings()
  const variant = block.variant ?? 'overlay'

  if (variant === 'split') return <HeroSplit block={block} settings={settings} />
  if (variant === 'centered') return <HeroCentered block={block} />
  return <HeroOverlay block={block} settings={settings} />
}

// ── Overlay hero (home, services, contact, estimate) ──────────────────────────
function HeroOverlay({ block, settings }: { block: HeroBlockData; settings: ReturnType<typeof getSiteSettings> }) {
  const imageSrc = block.imageSrc ?? '/hero/hero-double-glazing.webp'
  const imageAlt = block.imageAlt ?? 'King Double Glazing Melbourne'
  const primaryHref = block.primaryCtaLabel?.startsWith('Call') ? settings.phoneHref : (block.primaryCtaHref ?? '/instant-estimate/')

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
          {block.primaryCtaLabel && (
            <Button as="link" href={primaryHref} size="lg">
              {block.primaryCtaLabel}
            </Button>
          )}
          <a
            href={settings.phoneHref}
            className="inline-flex items-center gap-2 font-headline font-semibold uppercase tracking-wide text-white border-2 border-white px-8 py-4 text-lg hover:bg-white/10 transition-colors duration-150"
          >
            <Phone size={16} aria-hidden="true" />
            {settings.phone}
          </a>
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

// ── Split hero (about page) ───────────────────────────────────────────────────
function HeroSplit({ block, settings }: { block: HeroBlockData; settings: ReturnType<typeof getSiteSettings> }) {
  return (
    <section className="bg-inverse-surface py-16 md:py-24 overflow-hidden relative">
      {block.accentWord && (
        <span
          className="pointer-events-none select-none absolute -bottom-8 -right-6 font-display uppercase leading-none text-inverse-on-surface/4"
          style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
          aria-hidden="true"
        >
          {block.accentWord}
        </span>
      )}
      <div className="relative max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            {block.badge && (
              <span className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5">
                {block.badge}
              </span>
            )}
            <h1
              className="font-display uppercase leading-none text-inverse-on-surface mb-6"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
            >
              <span data-tina-field={block.tina?.headlineWhite}>
                {block.headlineWhite ?? 'Built by a Family'}
              </span>
              <br />
              <span data-tina-field={block.tina?.headlineYellow} className="text-primary-container">
                {block.headlineYellow ?? 'of Melbourne Glaziers'}
              </span>
            </h1>
            {block.subtext && (
              <p
                data-tina-field={block.tina?.subtext}
                className="font-sans text-base text-inverse-on-surface max-w-lg leading-relaxed mb-8"
              >
                {block.subtext}
              </p>
            )}
            <div className="flex flex-wrap gap-3">
              <Link
                href={block.primaryCtaHref ?? '/instant-estimate/'}
                className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
              >
                {block.primaryCtaLabel ?? 'Generate My Quote →'}
              </Link>
              <a
                href={settings.phoneHref}
                className="inline-flex items-center gap-3 bg-transparent text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-inverse-on-surface/30 hover:bg-inverse-on-surface/10 transition-colors duration-150"
              >
                Call {settings.phone}
              </a>
            </div>
          </div>
          {block.imageSrc && (
            <div className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden">
              <Image
                src={block.imageSrc}
                alt={block.imageAlt ?? ''}
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Centered hero (warranty page) ─────────────────────────────────────────────
function HeroCentered({ block }: { block: HeroBlockData }) {
  return (
    <section className="bg-inverse-surface py-16 md:py-24 overflow-hidden relative">
      {block.accentWord && (
        <span
          className="pointer-events-none select-none absolute -bottom-8 -right-6 font-display uppercase leading-none text-inverse-on-surface/4"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
          aria-hidden="true"
        >
          {block.accentWord}
        </span>
      )}
      <div className="relative max-w-5xl mx-auto px-4">
        {block.badge && (
          <span className="inline-block bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5">
            {block.badge}
          </span>
        )}
        <h1
          className="font-display uppercase leading-none text-inverse-on-surface mb-6"
          style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
        >
          <span data-tina-field={block.tina?.headlineWhite}>
            {block.headlineWhite}
          </span>{' '}
          <span data-tina-field={block.tina?.headlineYellow} className="text-primary-container">
            {block.headlineYellow}
          </span>
        </h1>
        {block.subtext && (
          <p
            data-tina-field={block.tina?.subtext}
            className="font-sans text-base text-inverse-on-surface max-w-xl leading-relaxed"
          >
            {block.subtext}
          </p>
        )}
      </div>
    </section>
  )
}
