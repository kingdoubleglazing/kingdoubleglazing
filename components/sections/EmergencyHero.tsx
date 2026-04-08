import { Phone, Check, AlertTriangle } from 'lucide-react'
import Image from 'next/image'
import { siteConfig } from '@/data/site'

const trustChecks = [
  'Dispatched in 30 min',
  'Board-up same visit',
  'All Melbourne suburbs',
]

export function EmergencyHero() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-inverse-surface flex flex-col min-h-svh md:min-h-[80vh] pb-20 md:pb-0">

        {/* Background image */}
        <Image
          src="/hero/hero-emergency.webp"
          alt="Emergency glazier securing a shattered Melbourne shopfront window"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Dark overlay — heavier on left where content sits */}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.70) 50%, rgba(0,0,0,0.35) 100%)' }}
          aria-hidden="true"
        />

        {/* Red urgency alert bar */}
        <div className="relative z-10 bg-danger flex items-center justify-center gap-3 px-4 py-3">
          <AlertTriangle size={14} strokeWidth={2.5} className="text-white shrink-0 animate-pulse" aria-hidden="true" />
          <span className="font-headline text-xs font-semibold uppercase tracking-[0.25em] text-white">
            24/7 Emergency Glazier — Melbourne-Wide
          </span>
          <AlertTriangle size={14} strokeWidth={2.5} className="text-white shrink-0 animate-pulse" aria-hidden="true" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col flex-1 justify-center max-w-4xl mx-auto w-full px-4 py-10 md:py-16 gap-8">

          {/* Headline */}
          <div>
            <h1
              className="font-display uppercase leading-[0.88] text-white"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
            >
              Broken
            </h1>
            <h1
              className="font-display uppercase leading-[0.88] text-primary-container"
              style={{ fontSize: 'clamp(4rem, 14vw, 11rem)' }}
            >
              Glass?
            </h1>
          </div>

          {/* Response time badge */}
          <div className="flex items-center gap-3">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-danger" />
            </span>
            <span className="font-headline text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
              Glazier on call — average 30 min response
            </span>
          </div>

          {/* Primary CTA — phone */}
          <a
            href={siteConfig.phoneHref}
            className="group flex flex-col items-center justify-center gap-1 bg-danger hover:bg-danger/90 transition-colors duration-150 px-8 py-6 md:py-7 w-full md:w-auto md:inline-flex"
            aria-label={`Call King Double Glazing emergency line: ${siteConfig.phone}`}
          >
            <span className="flex items-center gap-3 text-white">
              <Phone
                size={28}
                strokeWidth={2}
                aria-hidden="true"
                className="shrink-0"
              />
              <span
                className="font-display uppercase leading-none tracking-wider tabular-nums"
                style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
              >
                {siteConfig.phone}
              </span>
            </span>
            <span className="font-headline text-sm font-semibold uppercase tracking-[0.25em] text-white/70 mt-1">
              Available 24 hours, 7 days
            </span>
          </a>

          {/* Trust checks */}
          <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 sm:gap-6" aria-label="Why call King">
            {trustChecks.map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <Check
                  size={15}
                  strokeWidth={3}
                  aria-hidden="true"
                  className="text-primary-container shrink-0"
                />
                <span className="font-headline text-sm font-semibold uppercase tracking-[0.15em] text-white/70">
                  {item}
                </span>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* ── Sticky mobile call bar ────────────────────────────────────────── */}
      <a
        href={siteConfig.phoneHref}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-center gap-3 bg-danger py-4 px-6"
        style={{ paddingBottom: 'max(1rem, env(safe-area-inset-bottom))' }}
        aria-label={`Call emergency glazier: ${siteConfig.phone}`}
      >
        <Phone size={20} strokeWidth={2.5} aria-hidden="true" className="text-white shrink-0" />
        <span className="font-headline text-base font-semibold uppercase tracking-[0.2em] text-white">
          Call 24/7 — {siteConfig.phone}
        </span>
      </a>
    </>
  )
}
