import { Phone } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export function FreeAdviceBlock() {
  const settings = getSiteSettings()
  const fab = settings.freeAdviceBlock

  const eyebrow     = fab?.eyebrow      ?? 'Free Advice'
  const headingLine1 = fab?.headingLine1 ?? "Got a question"
  const headingLine2 = fab?.headingLine2 ?? "we haven't covered?"
  const body        = fab?.body         ?? "Call us directly. Free advice, no sales pitch. 25+ years in glazing — we'll give you a straight answer."
  const buttonLabel = fab?.buttonLabel  ?? 'Call Us'

  return (
    <section className="bg-inverse-surface py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-2xl">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3">
            {eyebrow}
          </p>
          <h2
            className="font-display uppercase leading-[0.9] text-inverse-on-surface mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
          >
            {headingLine1}
            <br />
            <span className="text-primary-container">{headingLine2}</span>
          </h2>
          <p className="font-sans text-base text-inverse-on-surface leading-relaxed mb-6 max-w-lg">
            {body}
          </p>
          <a
            href={settings.phoneHref}
            className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-base font-semibold uppercase tracking-[0.1em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            <Phone size={18} aria-hidden="true" />
            {buttonLabel} — {settings.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
