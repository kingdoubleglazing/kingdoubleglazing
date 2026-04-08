import Link from 'next/link'
import { processSteps } from '@/data/process-steps'

interface StepItem {
  title: string
  body: string
}

interface ProcessStepsProps {
  heading?: string
  subheading?: string
  cta?: { label: string; href: string }
  steps?: readonly StepItem[]
}

export function ProcessSteps({
  heading = 'How It Works',
  subheading = 'Retrofit double glazing without the runaround.',
  cta = { label: 'Get Instant Estimate', href: '/instant-estimate/' },
  steps = processSteps,
}: ProcessStepsProps) {
  return (
    <section className="bg-inverse-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="mb-12 md:mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div>
            <h2
              className="font-display uppercase leading-none text-inverse-on-surface"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              {heading}
            </h2>
            <p className="font-sans text-base text-inverse-on-surface/50 mt-4 max-w-md leading-relaxed">
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

        {/* Steps — desktop: 4-col grid with connecting track; mobile: vertical stack */}
        <ol className="relative grid grid-cols-1 md:grid-cols-4 gap-0">

          {/* Yellow track line — desktop only */}
          {/* <div
            className="hidden md:block absolute left-0 right-0 h-px bg-primary-container/20"
            style={{ top: 'calc(clamp(4rem, 9vw, 8rem) * 0.55)' }}
            aria-hidden="true"
          /> */}

          {steps.map((step, i) => (
            <StepCard
              key={step.title}
              step={step}
              index={i}
              isLast={i === steps.length - 1}
            />
          ))}
        </ol>

      </div>
    </section>
  )
}

function StepCard({
  step,
  index,
  isLast,
}: {
  step: StepItem
  index: number
  isLast: boolean
}) {
  const num = String(index + 1).padStart(2, '0')

  return (
    <li
      className="relative flex gap-6 md:flex-col md:gap-0 md:pr-8 animate-stagger-child"
      // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
      style={{ '--i': index } as any}
    >
      {/* Mobile connector line — vertical */}
      {!isLast && (
        <div
          className="md:hidden absolute left-[calc(clamp(3rem,7vw,6rem)/2-1px)] top-[clamp(3rem,7vw,6rem)] bottom-0 w-px bg-primary-container/25"
          aria-hidden="true"
        />
      )}

      {/* Step number */}
      <div className="relative z-10 shrink-0">
        <span
          className="block font-display uppercase leading-none text-primary-container"
          style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
          aria-hidden="true"
        >
          {num}
        </span>
      </div>

      {/* Content */}
      <div className="md:mt-6 pb-12 md:pb-0">
        <h3 className="font-headline text-lg font-semibold uppercase tracking-wide text-inverse-on-surface leading-snug mb-3">
          {step.title}
        </h3>
        <p className="font-sans text-sm text-inverse-on-surface/55 leading-relaxed">
          {step.body}
        </p>

        {/* Yellow accent bar */}
        <div className="mt-5 h-0.5 w-8 bg-primary-container" aria-hidden="true" />
      </div>
    </li>
  )
}
