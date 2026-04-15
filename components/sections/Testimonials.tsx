import Image from 'next/image'
import { testimonials, type Testimonial } from '@/data/testimonials'

interface TestimonialsProps {
  heading?: string
  subheading?: string
  items?: readonly Testimonial[]
}

export function Testimonials({
  heading = 'Real Homes.\nReal Results.',
  subheading = 'Every review is from a verified Melbourne customer.',
  items = testimonials.slice(0, 6),
}: TestimonialsProps) {
  return (
    <section className="bg-surface py-16 md:py-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="mb-10 md:mb-14 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Customer Reviews
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heading.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>
            <p className="font-sans text-sm text-on-surface/70 mt-4">
              {subheading}
            </p>
          </div>

          {/* Aggregate badge */}
          <div className="shrink-0 flex flex-col items-start sm:items-end gap-1">
            <Stars count={5} />
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/80">
              5.0 · {items.length} Reviews · Google
            </p>
          </div>
        </div>

        {/* Carousel — CSS scroll-snap on mobile, grid on desktop */}
        <div
          className="
            flex gap-0 overflow-x-auto snap-x snap-mandatory -mx-4 px-4
            md:grid md:grid-cols-3 md:overflow-x-visible md:mx-0 md:px-0
            ghost-border
          "
          style={{ scrollbarWidth: 'none' }}
          aria-label="Customer testimonials"
        >
          {items.map((t, i) => (
            <TestimonialCard key={t.name} testimonial={t} index={i} />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <p
          className="mt-4 text-center font-headline text-[0.8125rem] uppercase tracking-[0.2em] text-on-surface/55 md:hidden"
          aria-hidden="true"
        >
          Swipe to read more
        </p>

      </div>
    </section>
  )
}

// ── Stars ────────────────────────────────────────────────────────────────────

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill={i < count ? 'var(--color-primary-container)' : 'none'}
          stroke={i < count ? 'none' : 'currentColor'}
          strokeWidth="1.5"
          aria-hidden="true"
        >
          <path d="M7 1l1.545 3.13L12 4.635l-2.5 2.435.59 3.44L7 8.885l-3.09 1.625.59-3.44L2 4.635l3.455-.505L7 1z" />
        </svg>
      ))}
    </div>
  )
}

// ── Card ─────────────────────────────────────────────────────────────────────

function TestimonialCard({
  testimonial: t,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  return (
    <article
      className="
        snap-start shrink-0 w-[82vw] sm:w-[55vw]
        md:w-auto
        flex flex-col
        bg-surface-container-lowest ghost-border p-7
        card-interactive animate-stagger-child
      "
      // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
      style={{ '--i': index } as any}
      aria-label={`Review by ${t.name} from ${t.suburb}`}
    >
      {/* Opening quote — structural accent */}
      <span
        className="font-display leading-none text-primary-container select-none mb-3 block"
        style={{ fontSize: '3.5rem', lineHeight: '0.8' }}
        aria-hidden="true"
      >
        "
      </span>

      {/* Review text */}
      <p className="font-sans text-sm text-on-surface/70 leading-relaxed flex-1 mb-6">
        {t.text}
      </p>

      {/* Footer */}
      <div className="flex items-end justify-between gap-4 border-t border-on-surface/8 pt-5">
        <div className="flex items-center gap-3">
          {t.customerImage && (
            <div className="relative shrink-0 w-10 h-10 overflow-hidden rounded-full bg-on-surface/10">
              <Image
                src={t.customerImage}
                alt={t.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
          <p className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface leading-none mb-1">
            {t.name}
          </p>
          <p className="font-headline text-[0.8125rem] font-semibold uppercase tracking-[0.15em] text-on-surface/80">
            {t.suburb} · {t.source}
          </p>
          </div>
        </div>
        <Stars count={t.rating} />
      </div>
    </article>
  )
}
