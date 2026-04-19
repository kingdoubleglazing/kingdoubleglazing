'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OPTIONS, type OptionKey } from '@/data/pricing'

const OPTION_KEYS = Object.keys(OPTIONS) as OptionKey[]

export function GlassComparisonTable() {
  const router = useRouter()
  const [revealed, setRevealed] = useState<Record<OptionKey, boolean>>({
    A: false, B: false, C: false, D: false,
  })

  function toggle(key: OptionKey) {
    setRevealed(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function handleSelect(key: OptionKey) {
    router.replace(`?option=${key}`, { scroll: false })
    requestAnimationFrame(() => {
      document.getElementById('estimate-form')?.scrollIntoView({ behavior: 'smooth' })
    })
  }

  return (
    <section className="bg-surface-container-low py-14 md:py-18">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Glass Options
          </p>
          <h2
            className="font-display uppercase leading-[0.9] text-on-surface"
            style={{ fontSize: 'clamp(2rem,5vw,3.5rem)' }}
          >
            What do I want to achieve?
          </h2>
          <p className="font-sans text-sm text-on-surface/70 mt-3">
            Less noise, less heat, or a bit of both?
          </p>
          <p className="font-sans text-xs text-on-surface/50 mt-1">
            Pick the option that matches what matters most.
          </p>
        </div>

        {/* 2×2 grid on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OPTION_KEYS.map(key => {
            const opt = OPTIONS[key]
            const isRevealed = revealed[key]
            const isTop = key === 'D'

            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                onClick={() => handleSelect(key)}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSelect(key) } }}
                className={[
                  'relative flex flex-col p-4 md:p-5 cursor-pointer transition-all duration-150 group',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  isTop
                    ? 'bg-inverse-surface border border-primary-container hover:bg-white/5 hover:border-primary-container active:scale-[0.98]'
                    : 'bg-surface border border-surface-container-high hover:border-primary/60 hover:bg-surface-container active:scale-[0.98]',
                ].join(' ')}
              >
                {/* Option letter */}
                <span
                  className={[
                    'font-display uppercase leading-none mb-2',
                    isTop ? 'text-primary-container' : 'text-primary',
                  ].join(' ')}
                  style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}
                >
                  {key}
                </span>

                {/* Sublabel */}
                <p
                  className={[
                    'font-headline text-xs font-semibold uppercase tracking-wide leading-tight mb-3',
                    isTop ? 'text-inverse-on-surface/80' : 'text-on-surface/80',
                  ].join(' ')}
                >
                  {opt.sublabel}
                </p>

                {/* Metrics */}
                <div className="space-y-2 mb-3">
                  <div>
                    <p
                      className={[
                        'font-display uppercase leading-none',
                        isTop ? 'text-primary-container' : 'text-on-surface',
                      ].join(' ')}
                      style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)' }}
                    >
                      {opt.noisePct}%
                    </p>
                    <p
                      className={[
                        'font-headline text-[0.6rem] font-semibold uppercase tracking-wide',
                        isTop ? 'text-inverse-on-surface/50' : 'text-on-surface/50',
                      ].join(' ')}
                    >
                      quieter
                    </p>
                  </div>
                  <div>
                    <p
                      className={[
                        'font-display uppercase leading-none',
                        isTop ? 'text-primary-container' : 'text-on-surface',
                      ].join(' ')}
                      style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)' }}
                    >
                      {opt.heatPct}%
                    </p>
                    <p
                      className={[
                        'font-headline text-[0.6rem] font-semibold uppercase tracking-wide',
                        isTop ? 'text-inverse-on-surface/50' : 'text-on-surface/50',
                      ].join(' ')}
                    >
                      less heat
                    </p>
                  </div>
                </div>

                {/* Select CTA */}
                <p
                  className={[
                    'mt-auto font-headline text-[0.65rem] font-semibold uppercase tracking-[0.15em] transition-colors duration-150',
                    isTop
                      ? 'text-primary-container group-hover:text-primary-fixed-dim'
                      : 'text-primary/60 group-hover:text-primary',
                  ].join(' ')}
                >
                  Get my price →
                </p>

                {/* Spec toggle */}
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); toggle(key) }}
                  className={[
                    'mt-2 text-left font-sans text-xs underline underline-offset-2 transition-colors duration-150',
                    isTop
                      ? 'text-inverse-on-surface/40 hover:text-inverse-on-surface/70'
                      : 'text-on-surface/40 hover:text-on-surface/70',
                  ].join(' ')}
                >
                  {isRevealed ? 'Hide spec ↑' : "What's this made of? ↓"}
                </button>

                {isRevealed && (
                  <p
                    className={[
                      'mt-2 font-sans text-[0.65rem] leading-snug',
                      isTop ? 'text-inverse-on-surface/60' : 'text-on-surface/60',
                    ].join(' ')}
                    onClick={e => e.stopPropagation()}
                  >
                    {opt.spec}
                  </p>
                )}
              </div>
            )
          })}
        </div>

        {/* Hint */}
        <p className="mt-5 text-center font-sans text-sm text-on-surface/60">
          Press any option above to jump straight to Step 1 and get your full quote.
        </p>

        {/* East/west warning */}
        <div className="mt-6 border-l-4 border-primary-container pl-4">
          <p className="font-sans text-sm text-on-surface/75 leading-relaxed">
            <strong className="text-on-surface">Heads up:</strong> East and west-facing windows usually get more heat than north or south. If those are the rooms you're upgrading, consider Option C or D.
          </p>
        </div>

        {/* Footer caption */}
        <p className="mt-4 font-sans text-xs text-on-surface/50 leading-relaxed">
          All percentages compared to standard 3mm clear house glass — what's in most Melbourne homes today.
        </p>

      </div>
    </section>
  )
}
