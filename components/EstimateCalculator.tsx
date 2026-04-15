'use client'

import { useState, useActionState } from 'react'
import { PRICING, calculateEstimate } from '@/data/pricing'
import { ORIENTATION_GLASS_MAP } from '@/data/orientation-glass'
import { submitQuote, type QuoteState } from '@/app/actions/quote'
import type { PropertyType, Orientation, GlassType, FrameCondition } from '@/data/pricing'

// ── Types ─────────────────────────────────────────────────────────────────────

type Step = 1 | 2 | 3 | 4 | 'result' | 'contact' | 'submitted'

type WindowBand = '1-3' | '4-7' | '8-12' | '12+'

const BAND_TO_COUNT: Record<WindowBand, number> = {
  '1-3':  2,
  '4-7':  5,
  '8-12': 10,
  '12+':  14,
}

interface CalcState {
  propertyType:   PropertyType | null
  windowBand:     WindowBand | null
  windowCount:    number | null
  orientation:    Orientation | null
  glassType:      GlassType | null
  glassReason:    string | null
  frameCondition: FrameCondition | null
  storeys:        1 | 2 | 3 | null
  priority:       'noise' | 'warmth' | 'both' | null
  estimate:       { low: number; high: number; mid: number } | null
}

const initialState: CalcState = {
  propertyType: null, windowBand: null, windowCount: null,
  orientation: null, glassType: null, glassReason: null,
  frameCondition: null, storeys: null, priority: null, estimate: null,
}

const initialQuoteState: QuoteState = { status: 'idle' }

// ── Main component ─────────────────────────────────────────────────────────────

export function EstimateCalculator() {
  const [step, setStep] = useState<Step>(1)
  const [calc, setCalc] = useState<CalcState>(initialState)
  const [quoteState, quoteAction, quotePending] = useActionState(submitQuote, initialQuoteState)

  function update<K extends keyof CalcState>(key: K, value: CalcState[K]) {
    setCalc(prev => ({ ...prev, [key]: value }))
  }

  function reset() {
    setCalc(initialState)
    setStep(1)
  }

  function computeEstimate(state: CalcState) {
    if (!state.propertyType || !state.windowCount || !state.glassType || !state.frameCondition || !state.storeys || !state.priority) return null
    return calculateEstimate({
      propertyType:   state.propertyType,
      windowCount:    state.windowCount,
      glassType:      state.glassType,
      orientation:    state.orientation ?? 'mixed',
      frameCondition: state.frameCondition,
      storeys:        state.storeys,
      priority:       state.priority,
    })
  }

  function goToResult() {
    const estimate = computeEstimate(calc)
    setCalc(prev => ({ ...prev, estimate }))
    setStep('result')
  }

  const showProgress = typeof step === 'number'

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress bar */}
      {showProgress && (
        <div className="mb-8" role="progressbar" aria-valuenow={step as number} aria-valuemin={1} aria-valuemax={4} aria-label={`Step ${step} of 4`}>
          <div className="flex gap-1.5 mb-2">
            {([1, 2, 3, 4] as const).map(n => (
              <div
                key={n}
                className="h-1 flex-1 transition-colors duration-300"
                style={{ backgroundColor: (step as number) >= n ? '#F5C518' : '#E5E5E5' }}
              />
            ))}
          </div>
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/60">
            Step {step} of 4
          </p>
        </div>
      )}

      {step === 1 && (
        <Step1
          calc={calc}
          onSelect={propertyType => { update('propertyType', propertyType); setStep(2) }}
        />
      )}
      {step === 2 && (
        <Step2
          calc={calc}
          onSelect={band => {
            update('windowBand', band)
            update('windowCount', BAND_TO_COUNT[band])
            setStep(3)
          }}
          onBack={() => setStep(1)}
        />
      )}
      {step === 3 && (
        <Step3
          calc={calc}
          onSelect={orientation => {
            const map = ORIENTATION_GLASS_MAP[orientation]
            setCalc(prev => ({
              ...prev,
              orientation,
              glassType:   map.recommended,
              glassReason: map.reason,
            }))
            setStep(4)
          }}
          onBack={() => setStep(2)}
        />
      )}
      {step === 4 && (
        <Step4
          calc={calc}
          onUpdate={update}
          onSubmit={goToResult}
          onBack={() => setStep(3)}
        />
      )}
      {step === 'result' && (
        <ResultScreen
          calc={calc}
          onContact={() => setStep('contact')}
          onReset={reset}
          onChangeGlass={(g: GlassType) => {
            const newCalc = { ...calc, glassType: g }
            const estimate = computeEstimate(newCalc)
            setCalc({ ...newCalc, estimate })
          }}
        />
      )}
      {step === 'contact' && quoteState.status !== 'success' && (
        <ContactStep
          calc={calc}
          quoteAction={quoteAction}
          quotePending={quotePending}
          quoteState={quoteState}
          onReset={reset}
        />
      )}
      {(step === 'contact' && quoteState.status === 'success') && (
        <SubmittedScreen onReset={reset} />
      )}
    </div>
  )
}

// ── Step 1 — Property type ─────────────────────────────────────────────────────

function Step1({ onSelect }: { calc: CalcState; onSelect: (t: PropertyType) => void }) {
  const options: { id: PropertyType; label: string; icon: string }[] = [
    { id: 'house',     label: 'House',     icon: '🏠' },
    { id: 'apartment', label: 'Apartment', icon: '🏢' },
    { id: 'townhouse', label: 'Townhouse', icon: '🏘️' },
  ]

  return (
    <div>
      <h2 className="font-display uppercase leading-none text-on-surface mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        What type of
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">property is it?</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mt-4 mb-8 leading-relaxed">Tap to select — we&apos;ll move straight to the next question.</p>

      <div className="grid grid-cols-3 gap-3">
        {options.map(o => (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o.id)}
            className="flex flex-col items-center gap-3 p-5 min-h-24 bg-surface-container hover:bg-surface-container-high transition-colors duration-150 cursor-pointer"
            aria-label={o.label}
          >
            <span className="text-3xl" aria-hidden="true">{o.icon}</span>
            <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface">{o.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 2 — Window count ─────────────────────────────────────────────────────

function Step2({ calc, onSelect, onBack }: { calc: CalcState; onSelect: (b: WindowBand) => void; onBack: () => void }) {
  const options: { id: WindowBand; label: string; discount?: string }[] = [
    { id: '1-3',  label: '1–3 windows' },
    { id: '4-7',  label: '4–7 windows' },
    { id: '8-12', label: '8–12 windows',  discount: 'Whole-home discount applies' },
    { id: '12+',  label: '12+ windows',   discount: 'Whole-home discount applies' },
  ]

  return (
    <div>
      <BackButton onClick={onBack} />
      <h2 className="font-display uppercase leading-none text-on-surface mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        How many windows
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">need glazing?</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mt-4 mb-8 leading-relaxed">
        Upgrading {calc.propertyType ?? 'your home'}. Pick the closest number.
      </p>

      <div className="grid grid-cols-2 gap-3">
        {options.map(o => (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o.id)}
            className="flex flex-col items-center justify-center gap-1 p-5 min-h-20 bg-surface-container hover:bg-surface-container-high transition-colors duration-150 cursor-pointer text-center"
          >
            <span className="font-headline text-base font-semibold uppercase tracking-wide text-on-surface">{o.label}</span>
            {o.discount && (
              <span className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.12em] bg-primary-container text-on-primary-fixed px-1.5 py-0.5 mt-1">
                {o.discount}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

// ── Step 3 — Orientation ──────────────────────────────────────────────────────

function Step3({ onSelect, onBack }: { calc: CalcState; onSelect: (o: Orientation) => void; onBack: () => void }) {
  const options: { id: Orientation; label: string }[] = [
    { id: 'north', label: 'North' },
    { id: 'east',  label: 'East' },
    { id: 'west',  label: 'West' },
    { id: 'south', label: 'South' },
    { id: 'mixed', label: 'Not sure' },
  ]

  return (
    <div>
      <BackButton onClick={onBack} />
      <h2 className="font-display uppercase leading-none text-on-surface mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Which direction do
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">most windows face?</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mt-4 mb-8 leading-relaxed">
        We&apos;ll recommend the right glass type based on sun exposure.
      </p>

      {/* Simple compass rose */}
      <CompassRose />

      <div className="grid grid-cols-2 gap-3 mt-6">
        {options.slice(0, 4).map(o => (
          <button
            key={o.id}
            type="button"
            onClick={() => onSelect(o.id)}
            className="flex items-center justify-center p-5 min-h-16 bg-surface-container hover:bg-surface-container-high transition-colors duration-150 cursor-pointer"
          >
            <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface">{o.label}</span>
          </button>
        ))}
        <button
          type="button"
          onClick={() => onSelect('mixed')}
          className="col-span-2 flex items-center justify-center p-4 min-h-14 bg-surface-container hover:bg-surface-container-high transition-colors duration-150 cursor-pointer"
        >
          <span className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface">Not sure / Mixed</span>
        </button>
      </div>
    </div>
  )
}

// ── Step 4 — Frame condition + storeys + priority ──────────────────────────────

function Step4({ calc, onUpdate, onSubmit, onBack }: {
  calc: CalcState
  onUpdate: <K extends keyof CalcState>(key: K, value: CalcState[K]) => void
  onSubmit: () => void
  onBack: () => void
}) {
  const allAnswered = calc.frameCondition && calc.storeys && calc.priority

  return (
    <div>
      <BackButton onClick={onBack} />
      <h2 className="font-display uppercase leading-none text-on-surface mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Last two
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">quick questions.</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mt-4 mb-8 leading-relaxed">Answer all three to unlock your estimate.</p>

      {/* Frame condition */}
      <fieldset className="mb-7">
        <legend className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75 mb-3 block">
          Are your window frames in good condition?
        </legend>
        <div className="flex gap-3">
          {([
            { id: 'good', label: 'Yes, looks fine' },
            { id: 'needs-work', label: 'Needs some work' },
          ] as const).map(o => (
            <button
              key={o.id}
              type="button"
              onClick={() => onUpdate('frameCondition', o.id)}
              className={[
                'flex-1 px-4 py-3 font-headline text-sm font-semibold uppercase tracking-wide transition-colors duration-150 cursor-pointer',
                calc.frameCondition === o.id
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high',
              ].join(' ')}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Storeys */}
      <fieldset className="mb-7">
        <legend className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75 mb-3 block">
          How many storeys?
        </legend>
        <div className="flex gap-3">
          {([1, 2, 3] as const).map(n => (
            <button
              key={n}
              type="button"
              onClick={() => onUpdate('storeys', n)}
              className={[
                'flex-1 px-4 py-3 font-headline text-sm font-semibold uppercase tracking-wide transition-colors duration-150 cursor-pointer',
                calc.storeys === n
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high',
              ].join(' ')}
            >
              {n === 3 ? '3+' : n}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Priority */}
      <fieldset className="mb-8">
        <legend className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75 mb-3 block">
          Main reason for upgrading?
        </legend>
        <div className="flex gap-3">
          {([
            { id: 'noise',  label: 'Stop noise' },
            { id: 'warmth', label: 'Stay warmer' },
            { id: 'both',   label: 'Both' },
          ] as const).map(o => (
            <button
              key={o.id}
              type="button"
              onClick={() => onUpdate('priority', o.id)}
              className={[
                'flex-1 px-4 py-3 font-headline text-sm font-semibold uppercase tracking-wide transition-colors duration-150 cursor-pointer',
                calc.priority === o.id
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high',
              ].join(' ')}
            >
              {o.label}
            </button>
          ))}
        </div>
      </fieldset>

      {/* Glass type note (auto-set from orientation) */}
      {calc.glassReason && (
        <div className="mb-6 bg-surface-container-high px-4 py-3">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.12em] text-on-surface/60 mb-1">
            Recommended: {PRICING.glassTypes[calc.glassType!]?.label}
          </p>
          <p className="font-sans text-xs text-on-surface/70">{calc.glassReason}</p>
        </div>
      )}

      <button
        type="button"
        onClick={onSubmit}
        disabled={!allAnswered}
        className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        See My Estimate →
      </button>
    </div>
  )
}

// ── Result screen ─────────────────────────────────────────────────────────────

function ResultScreen({ calc, onContact, onReset, onChangeGlass }: {
  calc: CalcState
  onContact: () => void
  onReset: () => void
  onChangeGlass: (g: GlassType) => void
}) {
  const est = calc.estimate
  const glassLabel = calc.glassType ? PRICING.glassTypes[calc.glassType]?.label : ''

  return (
    <div>
      {/* Estimate hero */}
      <div className="bg-inverse-surface px-8 py-12 md:px-12 md:py-16 mb-0">
        <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3">
          Your estimate
        </p>
        <p
          className="font-display uppercase leading-none text-primary-container"
          style={{ fontSize: 'clamp(2.5rem, 10vw, 6rem)' }}
          aria-label={est ? `Estimated range: $${est.low.toLocaleString()} to $${est.high.toLocaleString()}` : 'Estimate unavailable'}
        >
          {est
            ? `$${est.low.toLocaleString()} – $${est.high.toLocaleString()}`
            : '—'}
        </p>
        <p className="font-sans text-sm text-inverse-on-surface/70 mt-4 leading-relaxed">
          Based on {calc.windowCount} window{(calc.windowCount ?? 0) !== 1 ? 's' : ''} · {glassLabel}
        </p>
        {calc.glassReason && (
          <p className="font-sans text-xs text-inverse-on-surface/60 mt-1 italic">{calc.glassReason}</p>
        )}
        <p className="font-sans text-xs text-inverse-on-surface/50 mt-4">
          ✱ Final price confirmed after free in-home assessment
        </p>
      </div>

      {/* Glass override */}
      <div className="bg-surface-container-low px-8 py-4 md:px-12">
        <p className="font-headline text-xs font-semibold uppercase tracking-[0.12em] text-on-surface/60 mb-2">
          Change glass type:
        </p>
        <div className="flex gap-2 flex-wrap">
          {(Object.keys(PRICING.glassTypes) as GlassType[]).map(g => (
            <button
              key={g}
              type="button"
              onClick={() => onChangeGlass(g)}
              className={[
                'px-3 py-1.5 font-headline text-xs font-semibold uppercase tracking-[0.1em] transition-colors duration-150 cursor-pointer',
                calc.glassType === g
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container text-on-surface hover:bg-surface-container-high',
              ].join(' ')}
            >
              {PRICING.glassTypes[g].label}
            </button>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="bg-surface ghost-border border-t-0 px-8 py-8 md:px-12 flex flex-col gap-4">
        <button
          type="button"
          onClick={onContact}
          className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 flex items-center justify-center gap-3"
        >
          ✓ Send Me This Quote
        </button>
        <button
          type="button"
          onClick={onReset}
          className="w-full bg-transparent text-on-surface/60 font-headline text-xs font-semibold uppercase tracking-[0.12em] px-8 py-3 hover:text-on-surface transition-colors duration-150"
        >
          ✕ Start Over
        </button>
      </div>
    </div>
  )
}

// ── Contact capture step ───────────────────────────────────────────────────────

function ContactStep({ calc, quoteAction, quotePending, quoteState, onReset }: {
  calc: CalcState
  quoteAction: (formData: FormData) => void
  quotePending: boolean
  quoteState: QuoteState
  onReset: () => void
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onReset}
        className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/60 hover:text-on-surface transition-colors duration-150 mb-6 block"
      >
        ← Start over
      </button>

      <h2 className="font-display uppercase leading-none text-on-surface mb-2" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
        Where should
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">we send it?</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mt-4 mb-8 leading-relaxed">
        Tas will call within 2 hours to confirm.
      </p>

      {quoteState.status === 'error' && (
        <div role="alert" className="bg-danger/10 px-4 py-3 mb-6">
          <p className="font-sans text-sm text-danger">{quoteState.message}</p>
        </div>
      )}

      <form action={quoteAction} className="flex flex-col gap-5">
        {/* Visible fields */}
        <Field id="ec-name" name="name" label="Name" type="text" autoComplete="name" placeholder="Your full name" required />
        <Field id="ec-email" name="email" label="Email" type="email" autoComplete="email" placeholder="you@example.com" required />
        <Field id="ec-phone" name="phone" label="Phone" type="tel" autoComplete="tel" placeholder="04XX XXX XXX" required />

        {/* Hidden calculator state */}
        <input type="hidden" name="propertyType"   value={calc.propertyType ?? ''} />
        <input type="hidden" name="windowCount"    value={calc.windowCount ?? ''} />
        <input type="hidden" name="glassType"      value={calc.glassType ?? ''} />
        <input type="hidden" name="orientation"    value={calc.orientation ?? 'mixed'} />
        <input type="hidden" name="storeys"        value={calc.storeys ?? '1'} />
        <input type="hidden" name="frameCondition" value={calc.frameCondition ?? ''} />
        <input type="hidden" name="priority"       value={calc.priority ?? ''} />

        <button
          type="submit"
          disabled={quotePending}
          className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
        >
          {quotePending ? 'Sending…' : 'Request My Quote →'}
        </button>

        <p className="text-center font-sans text-xs text-on-surface/60">
          Tas will call within 2 hours to confirm.
        </p>
      </form>
    </div>
  )
}

// ── Submitted screen ──────────────────────────────────────────────────────────

function SubmittedScreen({ onReset }: { onReset: () => void }) {
  return (
    <div className="bg-surface ghost-border p-8 md:p-12 text-center">
      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-success mb-2">
        ✓ Quote sent to Tas.
      </p>
      <p className="font-sans text-base text-on-surface/80 leading-relaxed mb-8">
        Expect a call within 2 hours.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/60 hover:text-on-surface transition-colors duration-150 underline underline-offset-4"
      >
        Start a new estimate
      </button>
    </div>
  )
}

// ── Shared helpers ─────────────────────────────────────────────────────────────

function BackButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/70 hover:text-on-surface transition-colors duration-150 mb-6 block"
    >
      ← Back
    </button>
  )
}

function Field({ id, name, label, type, autoComplete, placeholder, required }: {
  id: string; name: string; label: string; type: string
  autoComplete?: string; placeholder?: string; required?: boolean
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75">
        {label} {required && <span className="text-danger font-sans normal-case tracking-normal" aria-label="required">*</span>}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={required}
        className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
      />
    </div>
  )
}

function CompassRose() {
  return (
    <svg
      width="64"
      height="64"
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="mx-auto text-on-surface/30"
    >
      {/* Cardinal directions */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="currentColor" strokeWidth="1" />
      <line x1="32" y1="4"  x2="32" y2="60" stroke="currentColor" strokeWidth="1" />
      <line x1="4"  y1="32" x2="60" y2="32" stroke="currentColor" strokeWidth="1" />
      {/* N arrow */}
      <polygon points="32,8 29,20 35,20" fill="#F5C518" />
      {/* Labels */}
      <text x="32" y="3"  textAnchor="middle" fontSize="7" fill="currentColor" dominantBaseline="auto">N</text>
      <text x="32" y="63" textAnchor="middle" fontSize="7" fill="currentColor" dominantBaseline="auto">S</text>
      <text x="2"  y="34" textAnchor="middle" fontSize="7" fill="currentColor">W</text>
      <text x="62" y="34" textAnchor="middle" fontSize="7" fill="currentColor">E</text>
    </svg>
  )
}
