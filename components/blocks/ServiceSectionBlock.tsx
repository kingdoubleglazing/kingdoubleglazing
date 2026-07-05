import Image from 'next/image'
import { GoldLinkButton } from '@/components/ui/GoldLinkButton'
import { GhostLinkButton } from '@/components/ui/GhostLinkButton'
import { tf } from '@/lib/tina'

export interface ServiceSectionBlockData {
  __typename?: string
  id?: string | null
  eyebrow?: string | null
  heading?: string | null
  bodyText?: string | null
  bullets?: (string | null)[] | null
  variant?: string | null
  imageSrc?: string | null
  imageAlt?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
}

export function ServiceSectionBlock({ block }: { block: ServiceSectionBlockData }) {
  const variant = block.variant ?? 'default'
  const isDanger = variant === 'danger'
  const isDark = variant === 'dark'
  const isFeatured = variant === 'featured'
  const onDark = isDanger || isDark

  const bg = isDanger
    ? 'bg-danger'
    : isDark
    ? 'bg-inverse-surface'
    : isFeatured
    ? 'bg-surface'
    : 'bg-surface-container-lowest'

  const textClass = isDanger ? 'text-white' : onDark ? 'text-inverse-on-surface' : 'text-on-surface'
  const checkClass = isDanger ? 'text-white' : 'text-primary-container'
  const eyebrowClass = onDark ? 'text-white/80' : 'text-primary'
  const headingClass = onDark ? 'text-white' : 'text-on-surface'
  const border = isFeatured ? 'border-l-4 border-primary-container pl-8' : ''

  return (
    <section
      id={block.id ?? undefined}
      data-tina-field={tf(block)}
      className={`${bg} py-16 md:py-20 scroll-mt-20`}
    >
      <div className="max-w-5xl mx-auto px-4">
        <div className={`grid grid-cols-1 ${block.imageSrc ? 'lg:grid-cols-2 gap-12 lg:gap-20 items-center' : ''}`}>
          <div className={border}>
            {block.eyebrow && (
              <p
                data-tina-field={tf(block, 'eyebrow')}
                className={`font-headline text-xs font-semibold uppercase tracking-[0.2em] mb-4 ${eyebrowClass}`}
              >
                {block.eyebrow}
              </p>
            )}
            {block.heading && (
              <h2
                data-tina-field={tf(block, 'heading')}
                className={`font-display uppercase leading-none mb-8 ${headingClass}`}
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                {block.heading}
              </h2>
            )}
            {block.bodyText && (
              <p
                data-tina-field={tf(block, 'bodyText')}
                className={`font-sans text-base ${textClass} leading-relaxed mb-6`}
              >
                {block.bodyText}
              </p>
            )}
            {(block.bullets ?? []).filter(Boolean).length > 0 && (
              <ul className="space-y-3 mb-8">
                {(block.bullets ?? []).map((b, i) =>
                  b ? (
                    <li
                      key={i}
                      data-tina-field={tf(block, 'bullets', i)}
                      className={`flex items-start gap-3 font-sans text-sm ${textClass}`}
                    >
                      <span className={`${checkClass} font-bold mt-0.5 shrink-0`}>✓</span>
                      {b}
                    </li>
                  ) : null,
                )}
              </ul>
            )}
            {(block.primaryCta?.label || block.secondaryCta?.label) && (
              <div className="flex flex-wrap gap-3">
                {block.primaryCta?.label && (
                  <GoldLinkButton
                    label={block.primaryCta.label}
                    href={block.primaryCta.href ?? '/contact/'}
                    tinaField={tf(block.primaryCta, 'label')}
                  />
                )}
                {block.secondaryCta?.label && (
                  <GhostLinkButton
                    label={block.secondaryCta.label}
                    href={block.secondaryCta.href ?? '/contact/'}
                    tinaField={tf(block.secondaryCta, 'label')}
                  />
                )}
              </div>
            )}
          </div>
          {block.imageSrc && (
            <div
              data-tina-field={tf(block, 'imageSrc')}
              className="relative min-h-[280px] md:min-h-[400px] overflow-hidden"
            >
              <Image
                src={block.imageSrc}
                alt={block.imageAlt ?? ''}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
