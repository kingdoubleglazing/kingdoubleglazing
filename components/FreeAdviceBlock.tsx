import { Phone } from 'lucide-react'
import { siteConfig } from '@/data/site'

export function FreeAdviceBlock() {
  return (
    <section className="bg-inverse-surface py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-2xl">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3">
            Free Advice
          </p>
          <h2
            className="font-display uppercase leading-[0.9] text-inverse-on-surface mb-4"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
          >
            Got a question
            <br />
            <span className="text-primary-container">we haven't covered?</span>
          </h2>
          <p className="font-sans text-base text-inverse-on-surface/80 leading-relaxed mb-6 max-w-lg">
            For any other questions not answered on this website, feel free to call Tas for free advice. No quote pitch, no sales — just straight answers from someone who's been in glazing for 25+ years.
          </p>
          <a
            href={siteConfig.phoneHref}
            className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-base font-semibold uppercase tracking-[0.1em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150"
          >
            <Phone size={18} aria-hidden="true" />
            Call Tas — {siteConfig.phone}
          </a>
        </div>
      </div>
    </section>
  )
}
