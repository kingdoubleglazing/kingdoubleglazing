import type { ReactNode } from 'react'
import Image from 'next/image'

const defaultHeadline = (
  <>
    <span className="block">The Problem</span>
    <span className="block">Is <mark className="bg-inverse-surface text-primary-container px-2 not-italic">Clear.</mark></span>
  </>
)

interface ProblemSolutionSectionProps {
  headline?: ReactNode
  body?: string
  pullQuote?: string
  imageSrc?: string
  imageAlt?: string
  imageCaption?: { eyebrow: string; title: string }
}

export function ProblemSolutionSection({
  headline = defaultHeadline,
  body = "Melbourne homes lose up to 40% of their heating and cooling through single-pane glass. You're effectively burning money every winter.",
  pullQuote = "Retrofit Double Glazing is the architectural answer. We swap your glass, not your frames, saving you thousands on replacement costs while locking in thermal efficiency.",
  imageSrc = '/double-glazing-before-after.webp',
  imageAlt = 'Before and after double glazing — cold foggy windows vs bright clear view',
  imageCaption = { eyebrow: 'Industrial Grade', title: 'Built for Melbourne' },
}: ProblemSolutionSectionProps) {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left — text */}
          <div>
            <h2 className="font-display uppercase leading-[0.95] text-on-surface mb-8"
              style={{ fontSize: 'clamp(3rem, 6vw, 5.5rem)' }}
            >
              {headline}
            </h2>

            <p className="font-sans text-base text-on-surface/65 leading-relaxed mb-8 max-w-md">
              {body}
            </p>

            {/* Pull quote — yellow left rule */}
            <blockquote className="border-l-4 border-primary-container pl-5">
              <p className="font-sans text-base font-semibold text-on-surface leading-relaxed">
                {pullQuote}
              </p>
            </blockquote>
          </div>

          {/* Right — image with caption overlay */}
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Dark caption bar — bottom-right overlay */}
            <div className="absolute bottom-0 right-0 bg-inverse-surface px-5 py-4 max-w-[55%]">
              <p className="font-headline text-[0.8125rem] font-semibold uppercase tracking-widest text-inverse-on-surface/50 mb-0.5">
                {imageCaption.eyebrow}
              </p>
              <p className="font-display uppercase text-primary-container leading-none"
                style={{ fontSize: 'clamp(1rem, 2vw, 1.375rem)' }}
              >
                {imageCaption.title}
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
