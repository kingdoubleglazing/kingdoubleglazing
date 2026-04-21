import Link from 'next/link'
import Image from 'next/image'
import { processSteps } from '@/data/process-steps'

interface StepItem {
  title: string
  body: string
  callout?: string
  imageSrc?: string
  imageAlt?: string
}

interface ProcessStepsProps {
  heading?: string
  subheading?: string
  cta?: { label: string; href: string }
  steps?: readonly StepItem[]
}

export function ProcessSteps({
  heading = 'How It Works',
  subheading = 'Three steps. One day. 10-year warranty.',
  cta = { label: 'Get Instant Estimate', href: '/instant-estimate/' },
  steps = processSteps,
}: ProcessStepsProps) {
  return (
    <section className="bg-inverse-surface py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2
              className="font-display uppercase leading-none text-inverse-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heading}
            </h2>
            <p className="font-sans text-base text-inverse-on-surface mt-4 max-w-md leading-relaxed">
              {subheading}
            </p>
          </div>
          <Link
            href={cta.href}
            className="shrink-0 inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            {cta.label}
            <span aria-hidden="true" className="text-base leading-none">→</span>
          </Link>
        </div>

        {/* Steps */}
        <ol className="relative grid grid-cols-1 md:grid-cols-3 gap-0">
          {steps.map((step, i) => {
            const num = String(i + 1).padStart(2, '0')
            const isLast = i === steps.length - 1
            return (
              <li
                key={step.title}
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
                  <h3 className="font-headline text-lg font-semibold uppercase tracking-wide text-inverse-on-surface leading-snug mb-3">
                    {step.title}
                  </h3>
                  <p className="font-sans text-base text-inverse-on-surface leading-relaxed">
                    {step.body}
                  </p>
                  {step.callout && (
                    <p className="mt-3 font-sans text-xs text-primary-container leading-relaxed border-l-2 border-primary-container/40 pl-3">
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
