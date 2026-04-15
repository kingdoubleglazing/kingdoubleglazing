import { homepageFaq } from '@/data/homepage-faq'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'

interface FaqItem {
  q: string
  a: string
}

interface FAQProps {
  heading?: string
  subheading?: string
  items?: readonly FaqItem[]
  /** Emit FAQPage JSON-LD schema. Set false if the parent page already emits it. */
  emitSchema?: boolean
}

export function FAQ({
  heading = 'Common Questions',
  subheading = 'Everything Melbourne homeowners ask before booking.',
  items = homepageFaq,
  emitSchema = true,
}: FAQProps) {
  const schema = emitSchema
    ? buildFaqSchema(items.map(({ q, a }) => ({ question: q, answer: a })))
    : null

  return (
    <>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              FAQ
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heading}
            </h2>
          </div>
          <p className="font-sans text-base text-on-surface/75 max-w-sm leading-relaxed lg:text-right">
            {subheading}
          </p>
        </div>

        {/* Accordion — native <details>, zero JS */}
        <div className="ghost-border">
          {items.map((item, i) => (
            <details
              key={item.q}
              className="group ghost-border border-t-0 first:border-t-0 bg-surface open:bg-surface-container-lowest"
              // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
              style={{ '--i': i } as any}
            >
              <summary className="flex items-start justify-between gap-6 cursor-pointer list-none px-7 py-6 select-none [&::-webkit-details-marker]:hidden">
                {/* Number + question */}
                <div className="flex items-start gap-5">
                  <span
                    className="font-display uppercase text-on-surface/20 leading-none shrink-0 mt-0.5"
                    aria-hidden="true"
                    style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-headline text-base font-semibold uppercase tracking-wide text-on-surface leading-snug pt-1">
                    {item.q}
                  </h3>
                </div>

                {/* Expand/collapse indicator */}
                <div className="shrink-0 mt-1 w-6 h-6 bg-surface-container-high group-open:bg-primary-container flex items-center justify-center transition-colors duration-150">
                  <span
                    className="font-display leading-none text-on-surface group-open:text-on-primary-fixed select-none transition-colors duration-150"
                    aria-hidden="true"
                    style={{ fontSize: '1.25rem', lineHeight: '1' }}
                  >
                    <span className="group-open:hidden">+</span>
                    <span className="hidden group-open:inline">−</span>
                  </span>
                </div>
              </summary>

              {/* Answer */}
              <div className="px-7 pb-7 pl-[calc(1.75rem+2rem+1.25rem)]">
                <div className="h-px w-8 bg-primary-container mb-5" aria-hidden="true" />
                <p className="font-sans text-base text-on-surface/65 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </details>
          ))}
        </div>

      </div>
    </section>
    </>
  )
}
