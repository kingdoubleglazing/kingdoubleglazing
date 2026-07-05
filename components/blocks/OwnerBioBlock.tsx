import Image from 'next/image'
import { GoldLinkButton } from '@/components/ui/GoldLinkButton'

export interface OwnerBioBlockData {
  __typename?: string
  eyebrow?: string | null
  name?: string | null
  role?: string | null
  imageSrc?: string | null
  imageAlt?: string | null
  paragraphs?: (string | null)[] | null
  quote?: string | null
  cta?: { label?: string | null; href?: string | null } | null
  tina?: {
    eyebrow?: string
    name?: string
    role?: string
    imageSrc?: string
    paragraphs?: string
    quote?: string
    cta?: { label?: string; href?: string }
  }
}

export function OwnerBioBlock({ block }: { block: OwnerBioBlockData }) {
  const paragraphs = (block.paragraphs ?? []).filter(Boolean) as string[]
  const name = block.name ?? 'Tas Markou'

  return (
    <section className="bg-inverse-surface py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* ── Section 1: Portrait ─────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto lg:mx-0 ghost-border overflow-hidden bg-inverse-surface">
              {block.imageSrc && (
                <Image
                  src={block.imageSrc}
                  alt={block.imageAlt ?? name}
                  data-tina-field={block.tina?.imageSrc}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              )}
            </div>
          </div>

          {/* ── Section 2: Bio ──────────────────────────────────── */}
          <div className="lg:col-span-7">
            <p
              data-tina-field={block.tina?.eyebrow}
              className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-4"
            >
              {block.eyebrow ?? 'Meet the Owner'}
            </p>
            <h2
              data-tina-field={block.tina?.name}
              className="font-display uppercase leading-[0.9] text-inverse-on-surface"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)' }}
            >
              {name}
            </h2>
            {block.role && (
              <p
                data-tina-field={block.tina?.role}
                className="font-headline text-sm font-semibold uppercase tracking-[0.15em] text-primary-container mt-2 mb-6"
              >
                {block.role}
              </p>
            )}

            <div className="space-y-4 font-sans text-base text-inverse-on-surface leading-relaxed max-w-xl">
              {paragraphs.map((para, i) => (
                <p key={i} data-tina-field={block.tina?.paragraphs}>
                  {para}
                </p>
              ))}
            </div>

            {block.quote && (
              <blockquote className="border-l-4 border-primary-container pl-5 mt-6">
                <p
                  data-tina-field={block.tina?.quote}
                  className="font-sans text-base font-semibold text-inverse-on-surface leading-relaxed"
                >
                  {block.quote}
                </p>
              </blockquote>
            )}

            {block.cta?.label && block.cta?.href && (
              <div className="mt-8">
                <GoldLinkButton
                  label={block.cta.label}
                  href={block.cta.href}
                  tinaField={block.tina?.cta?.label}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
