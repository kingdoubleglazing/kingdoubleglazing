// @deprecated — archived before calculator rebuild (Round 5). Do not import.
// @ts-nocheck
'use client'

import { useState, useActionState } from 'react'
import Image from 'next/image'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/data/site'
import {
  calculatePartialEstimate,
  GLASS_OPTIONS,
  GLASS_OVERRIDE_REASON,
  WINDOW_BAND_DISCOUNT,
  WINDOW_BAND_MIDPOINT,
  ORIENTATION_GLASS_MAP,
  type GlassType,
  type PropertyType,
  type WindowBand,
  type Orientation,
  type FrameCondition,
  type Priority,
  type EstimateResult,
} from '@/data/pricing'
import { submitQuote, type QuoteState } from '@/app/actions/quote'

// ── Types ─────────────────────────────────────────────────────────────────────

type PanelState = 'estimate' | 'contact'

interface CalcState {
  propertyType:    PropertyType | null
  windowBand:      WindowBand | null
  orientation:     Orientation | null
  glassType:       GlassType | null
  glassOverridden: boolean
  frameCondition:  FrameCondition | null
  storeys:         1 | 2 | 3 | null
  priority:        Priority | null
  panelState:      PanelState
}

const initial: CalcState = {
  propertyType:    null,
  windowBand:      null,
  orientation:     null,
  glassType:       null,
  glassOverridden: false,
  frameCondition:  null,
  storeys:         null,
  priority:        null,
  panelState:      'estimate',
}

// ── Main component ─────────────────────────────────────────────────────────────

export function EstimateCalculator() {
  const [calc, setCalc] = useState<CalcState>(initial)
  const [quoteState, quoteAction, quotePending] = useActionState(
    submitQuote,
    { status: 'idle' } as QuoteState,
  )

  function update<K extends keyof CalcState>(key: K, val: CalcState[K]) {
    setCalc(prev => ({ ...prev, [key]: val }))
  }

  function reset() { setCalc(initial) }

  function selectOrientation(o: Orientation) {
    setCalc(prev => {
      const map = ORIENTATION_GLASS_MAP[o]
      return {
        ...prev,
        orientation:     o,
        glassType:       prev.glassOverridden ? prev.glassType : map.recommended,
        glassOverridden: prev.glassOverridden,
      }
    })
  }

  function overrideGlass(g: GlassType) {
    setCalc(prev => ({ ...prev, glassType: g, glassOverridden: true }))
  }

  const estimate: EstimateResult | null = calc.propertyType
    ? calculatePartialEstimate({
        propertyType:   calc.propertyType,
        windowBand:     calc.windowBand     ?? undefined,
        glassType:      calc.glassType      ?? undefined,
        storeys:        calc.storeys        ?? undefined,
        frameCondition: calc.frameCondition ?? undefined,
      })
    : null

  const isComplete = !!(
    calc.propertyType && calc.windowBand && calc.orientation &&
    calc.glassType && calc.frameCondition && calc.storeys && calc.priority
  )

  const completedSteps = [
    !!calc.propertyType,
    !!calc.windowBand,
    !!calc.orientation,
    !!(calc.frameCondition && calc.storeys && calc.priority),
  ] as const

  const panelProps = {
    estimate,
    calc,
    isComplete,
    panelState:   calc.panelState,
    quoteState,
    quoteAction,
    quotePending,
    onSendQuote:  () => update('panelState', 'contact'),
    onBack:       () => update('panelState', 'estimate'),
    onReset:      reset,
  }

  return (
    <div>

      {/* ── Steps column ───────────────────────────────────────────────────── */}
      <div className="max-w-2xl mx-auto">
        {/* Progress bar — 4 segments, no rounded corners */}
        <div className="px-6 pt-7 pb-5 md:px-10" aria-hidden="true">
          <div className="flex gap-1">
            {completedSteps.map((done, i) => (
              <div
                key={i}
                className="h-1 flex-1 transition-colors duration-300"
                style={{ backgroundColor: done ? 'var(--color-primary-container, #ffd700)' : 'rgba(255,255,255,0.12)' }}
              />
            ))}
          </div>
        </div>

        {/* ── Step 1: Property type ────────────────────────────────────────── */}
        <StepSection step={1} label="What type of property is it?">
          <div className="grid grid-cols-3 gap-3">
            {PROPERTY_OPTIONS.map(o => (
              <TapCard
                key={o.id}
                selected={calc.propertyType === o.id}
                onClick={() => update('propertyType', o.id)}
              >
                <span className="text-2xl mb-2 block" aria-hidden="true">{o.icon}</span>
                <span className="font-headline text-sm font-semibold uppercase tracking-wide leading-none">{o.label}</span>
              </TapCard>
            ))}
          </div>
        </StepSection>

        {/* ── Step 2: Window count ─────────────────────────────────────────── */}
        {calc.propertyType && (
          <StepSection step={2} label="How many windows need glazing?">
            <div className="grid grid-cols-2 gap-3">
              {WINDOW_OPTIONS.map(o => (
                <TapCard
                  key={o.id}
                  selected={calc.windowBand === o.id}
                  onClick={() => update('windowBand', o.id)}
                >
                  <span className="font-headline text-base font-semibold uppercase tracking-wide block leading-none">{o.label}</span>
                  {o.discount && (
                    <span className="mt-2 inline-block font-headline text-[0.6rem] font-semibold uppercase tracking-[0.12em] bg-primary-container text-on-primary-fixed px-1.5 py-0.5">
                      {o.discount}
                    </span>
                  )}
                </TapCard>
              ))}
            </div>
          </StepSection>
        )}

        {/* ── Step 3: Orientation + glass ──────────────────────────────────── */}
        {calc.windowBand && (
          <StepSection step={3} label="Which direction do most windows face?">
            <div className="flex items-center gap-4 mb-5">
              <CompassSVG />
              <p className="font-sans text-xs text-inverse-on-surface/45 leading-relaxed max-w-[200px]">
                This helps us recommend the right glass type for your home.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {ORIENTATION_OPTIONS.slice(0, 4).map(o => (
                <TapCard
                  key={o.id}
                  selected={calc.orientation === o.id}
                  onClick={() => selectOrientation(o.id)}
                >
                  <span className="font-headline text-sm font-semibold uppercase tracking-wide">{o.label}</span>
                </TapCard>
              ))}
            </div>
            <div className="mt-3">
              <TapCard
                selected={calc.orientation === 'mixed'}
                onClick={() => selectOrientation('mixed')}
              >
                <span className="font-headline text-sm font-semibold uppercase tracking-wide">Mixed / Not sure</span>
              </TapCard>
            </div>

            {calc.orientation && calc.glassType && (
              <div className="mt-6 bg-white/5 px-5 py-4">
                <p className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-primary-container mb-1">
                  {calc.glassOverridden
                    ? `Selected: ${GLASS_OPTIONS[calc.glassType].label}`
                    : `Recommended: ${GLASS_OPTIONS[ORIENTATION_GLASS_MAP[calc.orientation].recommended].label}`}
                </p>
                <p className="font-sans text-xs text-inverse-on-surface/60 leading-relaxed mb-4">
                  {calc.glassOverridden
                    ? GLASS_OVERRIDE_REASON[calc.glassType]
                    : ORIENTATION_GLASS_MAP[calc.orientation].reason}
                </p>
                <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/35 mb-2">
                  Change glass type:
                </p>
                <div className="flex flex-wrap gap-2">
                  {(Object.entries(GLASS_OPTIONS) as [GlassType, typeof GLASS_OPTIONS[GlassType]][]).map(([k, v]) => (
                    <button
                      key={k}
                      type="button"
                      onClick={() => overrideGlass(k)}
                      className={[
                        'px-3 py-1.5 font-headline text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-150',
                        calc.glassType === k
                          ? 'bg-primary-container text-on-primary-fixed'
                          : 'bg-white/10 text-inverse-on-surface/70 hover:bg-white/15',
                      ].join(' ')}
                    >
                      {v.label}
                    </button>
                  ))}
                </div>
                {calc.glassType && (
                  <p className="font-sans text-xs text-inverse-on-surface/55 mt-3 leading-relaxed">
                    {GLASS_OPTIONS[calc.glassType].description}
                  </p>
                )}
              </div>
            )}
          </StepSection>
        )}

        {/* ── Step 4: Frame + storeys + priority ──────────────────────────── */}
        {calc.orientation && (
          <StepSection step={4} label="A few more details.">
            <fieldset className="mb-8">
              <legend className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/45 mb-3 block">
                Are your window frames in good condition?
              </legend>
              <div className="grid grid-cols-2 gap-3">
                <TapCard selected={calc.frameCondition === 'good'}       onClick={() => update('frameCondition', 'good')}>
                  <span className="font-headline text-sm font-semibold uppercase tracking-wide">Good condition</span>
                </TapCard>
                <TapCard selected={calc.frameCondition === 'needs-work'} onClick={() => update('frameCondition', 'needs-work')}>
                  <span className="font-headline text-sm font-semibold uppercase tracking-wide">Needs work</span>
                </TapCard>
              </div>
            </fieldset>

            <fieldset className="mb-8">
              <legend className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/45 mb-3 block">
                How many storeys?
              </legend>
              <div className="grid grid-cols-3 gap-3">
                {([1, 2, 3] as const).map(n => (
                  <TapCard key={n} selected={calc.storeys === n} onClick={() => update('storeys', n)}>
                    <span className="font-headline text-sm font-semibold uppercase tracking-wide">{n === 3 ? '3+' : n}</span>
                  </TapCard>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/45 mb-3 block">
                Main reason for upgrading?
              </legend>
              <div className="grid grid-cols-3 gap-3">
                <TapCard selected={calc.priority === 'noise'}  onClick={() => update('priority', 'noise')}>
                  <span className="text-xl mb-1.5 block" aria-hidden="true">🔇</span>
                  <span className="font-headline text-xs font-semibold uppercase tracking-wide leading-snug">Stop Noise</span>
                </TapCard>
                <TapCard selected={calc.priority === 'warmth'} onClick={() => update('priority', 'warmth')}>
                  <span className="text-xl mb-1.5 block" aria-hidden="true">🌡</span>
                  <span className="font-headline text-xs font-semibold uppercase tracking-wide leading-snug">Stay Warmer</span>
                </TapCard>
                <TapCard selected={calc.priority === 'both'}   onClick={() => update('priority', 'both')}>
                  <span className="text-xl mb-1.5 block" aria-hidden="true">✓</span>
                  <span className="font-headline text-xs font-semibold uppercase tracking-wide leading-snug">Both</span>
                </TapCard>
              </div>
            </fieldset>
          </StepSection>
        )}
      </div>

      {/* ── Estimate panel — appears below steps ────────────────────────────── */}
      <div className={[
        'max-w-2xl mx-auto',
        calc.propertyType
          ? 'border-t border-white/10'
          : 'hidden',
      ].join(' ')}>
        <EstimatePanel {...panelProps} />
      </div>

    </div>
  )
}

// ── Estimate panel ─────────────────────────────────────────────────────────────

function EstimatePanel({
  estimate, calc, isComplete, panelState, quoteState,
  quoteAction, quotePending, onSendQuote, onBack, onReset,
}: {
  estimate:    EstimateResult | null
  calc:        CalcState
  isComplete:  boolean
  panelState:  PanelState
  quoteState:  QuoteState
  quoteAction: (formData: FormData) => void
  quotePending: boolean
  onSendQuote: () => void
  onBack:      () => void
  onReset:     () => void
}) {
  const glassLabel  = calc.glassType  ? GLASS_OPTIONS[calc.glassType].label : 'Standard Double Glazing'
  const windowCount = calc.windowBand ? WINDOW_BAND_MIDPOINT[calc.windowBand] : 5
  const discountPct = calc.windowBand ? WINDOW_BAND_DISCOUNT[calc.windowBand] : 0

  // ── Success ───────────────────────────────────────────────────────────────
  if (quoteState.status === 'success') {
    return (
      <div className="px-6 py-10 md:px-8 text-center">
        <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-6">
          ✓ Sent.
        </p>
        <p
          className="font-display uppercase text-inverse-on-surface leading-none mb-4"
          style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
        >
          Tas will call you soon.
        </p>
        <p className="font-sans text-sm text-inverse-on-surface/60 leading-relaxed mb-8 max-w-xs mx-auto">
          Once Tas confirms your quote you&apos;ll receive a confirmation email with your estimate locked in.
        </p>
        <button
          type="button"
          onClick={onReset}
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/45 hover:text-inverse-on-surface transition-colors duration-150 underline underline-offset-4"
        >
          Start a new estimate
        </button>
      </div>
    )
  }

  // ── Contact form ──────────────────────────────────────────────────────────
  if (panelState === 'contact') {
    return (
      <div className="px-6 py-8 md:px-8">
        <div className="mb-6">
          <p className="font-headline text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/40 mb-1">
            Your estimate
          </p>
          <p className="font-display text-primary-container leading-none" style={{ fontSize: 'clamp(1.75rem, 5vw, 2.5rem)' }}>
            ${estimate?.low.toLocaleString()} – ${estimate?.high.toLocaleString()}
          </p>
        </div>

        <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
          <Image
            src="/testimonial-founder/founder.webp"
            alt="Tas Markou — founder, King Double Glazing"
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
          <div>
            <p className="font-headline text-sm font-semibold uppercase tracking-wide text-inverse-on-surface">
              Tas Markou — Founder
            </p>
            <p className="font-sans text-xs text-inverse-on-surface/55">
              Personally measures every job. 25+ years glazing.
            </p>
          </div>
        </div>

        <p className="font-headline text-sm font-semibold uppercase tracking-[0.1em] text-inverse-on-surface mb-5">
          Send this to Tas
        </p>

        {quoteState.status === 'error' && (
          <div role="alert" className="bg-red-900/40 px-4 py-3 mb-5">
            <p className="font-sans text-sm text-red-300">{quoteState.message}</p>
          </div>
        )}

        <form action={quoteAction} className="space-y-4">
          <DarkField id="qf-name"  name="name"  label="Name"  type="text"  autoComplete="name"  placeholder="Your full name" />
          <DarkField id="qf-email" name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" />
          <DarkField id="qf-phone" name="phone" label="Phone" type="tel"   autoComplete="tel"   placeholder="04XX XXX XXX" />

          {/* Hidden calculator state */}
          <input type="hidden" name="propertyType"   value={calc.propertyType   ?? ''} />
          <input type="hidden" name="windowBand"     value={calc.windowBand     ?? ''} />
          <input type="hidden" name="glassType"      value={calc.glassType      ?? ''} />
          <input type="hidden" name="orientation"    value={calc.orientation    ?? 'mixed'} />
          <input type="hidden" name="storeys"        value={calc.storeys        ?? 1} />
          <input type="hidden" name="frameCondition" value={calc.frameCondition ?? 'good'} />
          <input type="hidden" name="priority"       value={calc.priority       ?? 'both'} />

          <button
            type="submit"
            disabled={quotePending}
            className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {quotePending ? 'Sending…' : 'Submit Quote Request →'}
          </button>
          <a
            href={siteConfig.phoneHref}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 border-2 border-primary-container/40 text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-container/10 transition-colors duration-150"
          >
            <Phone size={16} aria-hidden="true" />
            Or Call Tas — {siteConfig.phone}
          </a>
          <p className="text-center font-sans text-xs text-inverse-on-surface/40">
            Tas will call within 2 hours to confirm.
          </p>
        </form>

        <button
          type="button"
          onClick={onBack}
          className="mt-5 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/45 hover:text-inverse-on-surface transition-colors duration-150"
        >
          ← Back
        </button>
      </div>
    )
  }

  // ── Estimate (default) ────────────────────────────────────────────────────
  return (
    <div className="px-6 py-8 md:px-8">
      <p className="font-headline text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/40 mb-2">
        {isComplete ? 'Your estimate' : 'Estimated cost'}
      </p>

      <p
        className="font-display uppercase text-primary-container leading-none transition-all duration-200"
        style={{ fontSize: 'clamp(2.25rem, 7vw, 4rem)' }}
        aria-live="polite"
        aria-label={estimate
          ? `Estimated range: $${estimate.low.toLocaleString()} to $${estimate.high.toLocaleString()}`
          : undefined}
      >
        {estimate
          ? `$${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}`
          : '—'}
      </p>

      <p className="font-sans text-sm text-inverse-on-surface/55 mt-3">
        {windowCount} {windowCount === 1 ? 'window' : 'windows'} · {glassLabel}
      </p>

      {isComplete && (
        <p className="font-sans text-xs text-inverse-on-surface/40 mt-1">
          {calc.propertyType && PROPERTY_LABELS[calc.propertyType]} · {calc.storeys}{calc.storeys === 1 ? ' storey' : ' storeys'}
          {discountPct > 0 ? ` · ${(discountPct * 100).toFixed(0)}% discount` : ''}
        </p>
      )}

      {!isComplete && (
        <p className="font-sans text-xs text-inverse-on-surface/30 mt-2">
          Updates as you answer below.
        </p>
      )}

      {/* F1: Accuracy disclosure — shows as soon as any estimate is available */}
      {estimate && (
        <div className="border-l-4 border-primary-container pl-4 mt-5">
          <p className="font-sans text-sm font-semibold text-inverse-on-surface/90">
            Your price is accurate within 10%.
          </p>
          <p className="font-sans text-xs text-inverse-on-surface/55 leading-relaxed mt-1">
            We&apos;ve priced thousands of Melbourne retrofit jobs. If your inputs are correct, your final quote will land within 10% of the number above. No surprise blowouts.
          </p>
        </div>
      )}

      {isComplete && (
        <>
          <p className="font-sans text-xs text-inverse-on-surface/30 mt-4 leading-relaxed">
            ✱ Final price confirmed after free home visit. No obligation.
          </p>

          {/* B4: Budget sub-caption above Send button */}
          <div className="mt-5 bg-primary-container text-on-primary-fixed px-5 py-3">
            <p className="font-sans text-sm font-medium leading-snug">
              If this is within your budget, send your quote through and Tas will call to confirm.
            </p>
          </div>

          <button
            type="button"
            onClick={onSendQuote}
            className="mt-6 w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 active:scale-[0.98]"
          >
            ✓ Send This Quote to Tas
          </button>
          <a
            href={siteConfig.phoneHref}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 border-2 border-primary-container/40 text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-container/10 transition-colors duration-150"
          >
            <Phone size={16} aria-hidden="true" />
            Or Call Tas — {siteConfig.phone}
          </a>
        </>
      )}
    </div>
  )
}

// ── Shared primitives ──────────────────────────────────────────────────────────

function StepSection({ step, label, children }: {
  step: number; label: string; children: React.ReactNode
}) {
  return (
    <div className="px-6 py-8 md:px-10 md:py-10">
      <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-inverse-on-surface/35 mb-2">
        Step {step} of 4
      </p>
      <p
        className="font-display uppercase text-inverse-on-surface leading-none mb-6"
        style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)' }}
      >
        {label}
      </p>
      {children}
    </div>
  )
}

function TapCard({ selected, onClick, children }: {
  selected: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex flex-col items-center justify-center text-center min-h-[72px] px-3 py-4',
        'transition-all duration-150 active:scale-[0.97] cursor-pointer',
        selected
          ? 'border-2 border-primary-container bg-white/10 text-inverse-on-surface'
          : 'border border-white/15 bg-white/5 text-inverse-on-surface/80 hover:border-white/25 hover:bg-white/10',
      ].join(' ')}
    >
      {children}
    </button>
  )
}

function DarkField({ id, name, label, type, autoComplete, placeholder }: {
  id: string; name: string; label: string; type: string
  autoComplete?: string; placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/55">
        {label} <span className="text-red-400" aria-label="required">*</span>
      </label>
      <input
        id={id}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required
        className="bg-white/10 border border-white/15 px-4 py-3 font-sans text-base text-inverse-on-surface placeholder:text-inverse-on-surface/30 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
      />
    </div>
  )
}

function CompassSVG() {
  return (
    <svg width="52" height="52" viewBox="0 0 56 56" aria-hidden="true" className="shrink-0 text-white/20">
      <circle cx="28" cy="28" r="26" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="28" y1="2"  x2="28" y2="54" stroke="currentColor" strokeWidth="0.75" />
      <line x1="2"  y1="28" x2="54" y2="28" stroke="currentColor" strokeWidth="0.75" />
      <polygon points="28,5 25.5,16 30.5,16" fill="#ffd700" />
      <text x="28" y="3"  textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.45)" dominantBaseline="auto">N</text>
      <text x="28" y="55" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.45)" dominantBaseline="auto">S</text>
      <text x="3"  y="30" textAnchor="start"  fontSize="6" fill="rgba(255,255,255,0.45)">W</text>
      <text x="53" y="30" textAnchor="end"    fontSize="6" fill="rgba(255,255,255,0.45)">E</text>
    </svg>
  )
}

// ── Static option data ─────────────────────────────────────────────────────────

const PROPERTY_OPTIONS: { id: PropertyType; label: string; icon: string }[] = [
  { id: 'house',     label: 'House',     icon: '🏠' },
  { id: 'apartment', label: 'Apartment', icon: '🏢' },
  { id: 'townhouse', label: 'Townhouse', icon: '🏘' },
]

const PROPERTY_LABELS: Record<PropertyType, string> = {
  house:     'House',
  apartment: 'Apartment',
  townhouse: 'Townhouse',
}

const WINDOW_OPTIONS: { id: WindowBand; label: string; discount?: string }[] = [
  { id: '1-3',  label: '1–3 windows' },
  { id: '4-7',  label: '4–7 windows',  discount: '5% off' },
  { id: '8-12', label: '8–12 windows', discount: '10% off' },
  { id: '12+',  label: '12+ windows',  discount: '15% off' },
]

const ORIENTATION_OPTIONS: { id: Orientation; label: string }[] = [
  { id: 'north', label: 'North' },
  { id: 'east',  label: 'East' },
  { id: 'west',  label: 'West' },
  { id: 'south', label: 'South' },
]
