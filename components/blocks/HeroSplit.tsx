import Image from 'next/image'
import { tf } from '@/lib/tina'
import { HeroCTA } from './HeroCTA'
import { HeroContactButton } from './HeroContactButton'
import type { HeroBlockData } from './HeroBlock'

export function HeroSplit({ block }: { block: HeroBlockData }) {
  return (
    <section data-tina-field={tf(block)} className="bg-inverse-surface py-16 md:py-24 overflow-hidden relative">
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
              <span
                data-tina-field={tf(block, 'badge')}
                className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5"
              >
                {block.badge}
              </span>
            )}
            {(block.headlineWhite || block.headlineYellow) && (
              <h1
                className="font-display uppercase leading-none text-inverse-on-surface mb-6"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
              >
                {block.headlineWhite && (
                  <span data-tina-field={tf(block, 'headlineWhite')}>{block.headlineWhite}</span>
                )}
                {block.headlineWhite && block.headlineYellow && <br />}
                {block.headlineYellow && (
                  <span data-tina-field={tf(block, 'headlineYellow')} className="text-primary-container">
                    {block.headlineYellow}
                  </span>
                )}
              </h1>
            )}
            {block.subtext && (
              <p
                data-tina-field={tf(block, 'subtext')}
                className="font-sans text-base text-inverse-on-surface max-w-lg leading-relaxed mb-8"
              >
                {block.subtext}
              </p>
            )}
            {(block.primaryCta?.label || block.secondaryCta?.label) && (
              <div className="flex flex-wrap gap-3">
                {block.primaryCta?.label && (
                  <HeroCTA
                    label={block.primaryCta.label}
                    href={block.primaryCta.href ?? '/instant-estimate/'}
                    tinaField={tf(block.primaryCta, 'label')}
                  />
                )}
                {block.secondaryCta?.label && (
                  <HeroContactButton
                    variant="split"
                    label={block.secondaryCta.label}
                    href={block.secondaryCta?.href}
                    tinaField={tf(block.secondaryCta, 'label')}
                  />
                )}
              </div>
            )}
          </div>
          {block.imageSrc && (
            <div className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden" data-tina-field={tf(block, 'imageSrc')}>
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
