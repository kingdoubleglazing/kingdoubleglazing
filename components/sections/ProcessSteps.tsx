import Image from 'next/image'
import type { ProcessStep } from '@/lib/types'
import { GoldLinkButton } from '@/components/ui/GoldLinkButton'

interface TinaFields {
  heading?: string
  subheading?: string
  ctaRef?: string
  cta?: { label?: string; href?: string }
  steps?: ReadonlyArray<{ title?: string; body?: string; callout?: string } | undefined>
}

interface ProcessStepsProps {
  steps: ProcessStep[]
  heading?: string
  subheading?: string
  cta?: { label: string; href: string }
  tinaFields?: TinaFields
}

const GRID_COLS: Record<number, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-3',
  4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
  6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
}

export function ProcessSteps({
  steps,
  heading = 'Our Process',
  subheading = 'Simple and transparent — from quote to installation.',
  cta = { label: 'Get Instant Estimate', href: '/instant-estimate/' },
  tinaFields,
}: ProcessStepsProps) {
  const colsClass = GRID_COLS[steps.length] ?? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="bg-inverse-surface py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">

        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2
              data-tina-field={tinaFields?.heading}
              className="font-display uppercase leading-none text-inverse-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heading}
            </h2>
            <p
              data-tina-field={tinaFields?.subheading}
              className="font-sans text-base text-inverse-on-surface mt-4 max-w-md leading-relaxed"
            >
              {subheading}
            </p>
          </div>
          <GoldLinkButton label={cta.label} href={cta.href} tinaField={tinaFields?.ctaRef} />
        </div>

        <ol className={`relative grid ${colsClass} gap-0`}>
          {steps.map((step, i) => {
            const num = String(i + 1).padStart(2, '0')
            const isLast = i === steps.length - 1
            return (
              <li
                key={step.id}
                className="relative flex gap-6 md:flex-col md:gap-0 md:pr-8 animate-stagger-child"
                // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                style={{ '--i': i } as any}
              >
                {!isLast && (
                  <div
                    className="md:hidden absolute left-[calc(clamp(3rem,7vw,6rem)/2-1px)] top-[clamp(3rem,7vw,6rem)] bottom-0 w-px bg-primary-container/25"
                    aria-hidden="true"
                  />
                )}
                <div className="relative z-10 shrink-0">
                  <span
                    className="block font-display uppercase leading-none text-primary-container"
                    style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
                    aria-hidden="true"
                  >
                    {num}
                  </span>
                </div>
                <div className="md:mt-6 pb-12 md:pb-0">
                  {step.imageSrc && (
                    <div className="relative w-full aspect-video mb-5 overflow-hidden">
                      <Image
                        src={step.imageSrc}
                        alt={step.imageAlt ?? step.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  )}
                  <h3
                    data-tina-field={tinaFields?.steps?.[i]?.title}
                    className="font-headline text-lg font-semibold uppercase tracking-wide text-inverse-on-surface leading-snug mb-3"
                  >
                    {step.title}
                  </h3>
                  <p
                    data-tina-field={tinaFields?.steps?.[i]?.body}
                    className="font-sans text-base text-inverse-on-surface leading-relaxed"
                  >
                    {step.body}
                  </p>
                  {step.callout && (
                    <p
                      data-tina-field={tinaFields?.steps?.[i]?.callout}
                      className="mt-3 font-sans text-xs text-primary-container leading-relaxed border-l-2 border-primary-container/40 pl-3"
                    >
                      {step.callout}
                    </p>
                  )}
                  <div className="mt-5 h-0.5 w-8 bg-primary-container" aria-hidden="true" />
                </div>
              </li>
            )
          })}
        </ol>

      </div>
    </section>
  )
}
