'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { glassTypes } from '@/data/glass-types'
import { siteConfig } from '@/data/site'

// ── Floor / level presets ─────────────────────────────────────
const FLOOR_OPTIONS = [
  { id: 'ground', label: 'Ground Floor',  sublabel: 'All windows at ground level',    scaffolding: 0    },
  { id: 'upper',  label: 'Upper Floor',   sublabel: 'First floor or above',            scaffolding: 750  },
  { id: 'mixed',  label: 'Mixed Levels',  sublabel: 'Both ground and upper windows',   scaffolding: 375  },
] as const

type FloorId = (typeof FLOOR_OPTIONS)[number]['id']

// ── Window size presets ─────────────────────────────────────────
const WINDOW_SIZES = [
  { id: 'small',    label: 'Small',          sublabel: 'Bathroom / ensuite',   area: 0.45 },
  { id: 'standard', label: 'Standard',       sublabel: 'Casement / sash',      area: 0.9  },
  { id: 'large',    label: 'Large',          sublabel: 'Picture window',        area: 1.5  },
  { id: 'xl',       label: 'Sliding Panel',  sublabel: 'Door or large panel',   area: 2.1  },
] as const

type WindowSizeId = (typeof WINDOW_SIZES)[number]['id']
type GlassTypeId  = (typeof glassTypes)[number]['id']

function fmtAUD(n: number) {
  return `$${Math.round(n).toLocaleString('en-AU')}`
}

function roundTo100(n: number) {
  return Math.round(n / 100) * 100
}

// ── Component ───────────────────────────────────────────────────
export function EstimateForm() {
  const searchParams = useSearchParams()

  // Step 1 inputs
  const [count,   setCount]   = useState(6)
  const [sizeId,  setSizeId]  = useState<WindowSizeId>('standard')
  const [glassId, setGlassId] = useState<GlassTypeId>('standard-clear')
  const [floorId, setFloorId] = useState<FloorId>('ground')

  // Pre-select glass type when arriving via GlassPickerGuide CTAs (?glass=<id>)
  useEffect(() => {
    const g = searchParams.get('glass') as GlassTypeId | null
    if (g && glassTypes.some(t => t.id === g)) {
      setGlassId(g)
    }
  }, [searchParams])

  // View state
  const [step,      setStep]      = useState<1 | 2>(1)
  const [showLead,  setShowLead]  = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [leadError, setLeadError] = useState('')

  // Lead capture fields
  const [leadName,  setLeadName]  = useState('')
  const [leadEmail, setLeadEmail] = useState('')
  const [leadPhone, setLeadPhone] = useState('')

  // ── Calculation ────────────────────────────────────────────
  const size  = WINDOW_SIZES.find(s => s.id === sizeId)!
  const glass = glassTypes.find(g => g.id === glassId)!
  const floor = FLOOR_OPTIONS.find(f => f.id === floorId)!

  const totalArea      = parseFloat((count * size.area).toFixed(1))
  const base           = totalArea * glass.priceFrom
  const scaffolding    = floor.scaffolding
  const lowEst         = roundTo100(base * 0.9 + scaffolding)
  const highEst        = roundTo100(base * 1.1 + scaffolding)

  // ── Handlers ───────────────────────────────────────────────
  function handleCalculate() {
    setStep(2)
    // Scroll form into view after state update
    setTimeout(() => {
      document.getElementById('estimate-result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 80)
  }

  function handleReset() {
    setStep(1)
    setShowLead(false)
    setSubmitted(false)
    setLeadError('')
  }

  async function handleLeadSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!leadEmail.trim() && !leadPhone.trim()) {
      setLeadError('Please enter an email address or phone number.')
      return
    }
    setSubmitting(true)
    setLeadError('')
    try {
      // TODO: wire to /api/estimate-lead route — POST { name, email, phone, windowCount: count, sizeId, glassId, lowEst, highEst }
      await new Promise<void>(r => setTimeout(r, 700))
      setSubmitted(true)
    } catch {
      setLeadError('Something went wrong. Please call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  // ── Step 1: Inputs ─────────────────────────────────────────
  if (step === 1) {
    return (
      <div
        id="calculator"
        className="bg-surface ghost-border p-8 md:p-12 max-w-3xl mx-auto"
        aria-label="Instant estimate calculator — step 1 of 2"
      >
        {/* Progress */}
        <StepIndicator current={1} />

        <h2
          className="font-display uppercase leading-none text-on-surface mt-6 mb-10"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          Tell Us About
          <br />
          <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">Your Windows</span>
        </h2>

        {/* ── Section A: Window count ── */}
        <fieldset className="mb-10">
          <legend className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/55 mb-4 block">
            How many windows?
          </legend>
          <div className="flex items-center gap-0 w-fit ghost-border">
            <button
              type="button"
              aria-label="Decrease window count"
              onClick={() => setCount(c => Math.max(1, c - 1))}
              className="w-12 h-12 bg-surface-container-high flex items-center justify-center font-headline font-semibold text-xl text-on-surface hover:bg-surface-container-highest transition-colors duration-150 select-none"
            >
              −
            </button>
            <div
              className="w-16 h-12 bg-surface flex items-center justify-center font-display text-on-surface leading-none"
              style={{ fontSize: '1.75rem' }}
              aria-live="polite"
              aria-atomic="true"
            >
              {count}
            </div>
            <button
              type="button"
              aria-label="Increase window count"
              onClick={() => setCount(c => Math.min(30, c + 1))}
              className="w-12 h-12 bg-surface-container-high flex items-center justify-center font-headline font-semibold text-xl text-on-surface hover:bg-surface-container-highest transition-colors duration-150 select-none"
            >
              +
            </button>
          </div>
          <p className="mt-2 font-sans text-xs text-on-surface/40">
            Enter the windows you want double-glazed now. You can add more later.
          </p>
        </fieldset>

        {/* ── Section B: Window size ── */}
        <fieldset className="mb-10">
          <legend className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/55 mb-4 block">
            Typical window size
          </legend>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {WINDOW_SIZES.map(s => (
              <label
                key={s.id}
                className={[
                  'flex flex-col gap-1 p-4 cursor-pointer transition-colors duration-150 select-none',
                  sizeId === s.id
                    ? 'bg-primary-container text-on-primary-fixed'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="windowSize"
                  value={s.id}
                  checked={sizeId === s.id}
                  onChange={() => setSizeId(s.id)}
                  className="sr-only"
                />
                <span className="font-headline text-sm font-semibold uppercase tracking-wide leading-none">
                  {s.label}
                </span>
                <span
                  className={[
                    'font-sans text-xs leading-snug',
                    sizeId === s.id ? 'text-on-primary-fixed/70' : 'text-on-surface/50',
                  ].join(' ')}
                >
                  {s.sublabel}
                </span>
                <span
                  className={[
                    'font-headline text-xs font-semibold uppercase tracking-widest mt-1',
                    sizeId === s.id ? 'text-on-primary-fixed/60' : 'text-on-surface/35',
                  ].join(' ')}
                >
                  ~{s.area} m²
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        {/* ── Section C: Floor / level ── */}
        <fieldset className="mb-10">
          <legend className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/55 mb-4 block">
            Which floor are the windows on?
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {FLOOR_OPTIONS.map(f => (
              <label
                key={f.id}
                className={[
                  'flex flex-col gap-1 p-4 cursor-pointer transition-colors duration-150 select-none',
                  floorId === f.id
                    ? 'bg-primary-container text-on-primary-fixed'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="floor"
                  value={f.id}
                  checked={floorId === f.id}
                  onChange={() => setFloorId(f.id)}
                  className="sr-only"
                />
                <span className="font-headline text-sm font-semibold uppercase tracking-wide leading-none">
                  {f.label}
                </span>
                <span
                  className={[
                    'font-sans text-xs leading-snug mt-0.5',
                    floorId === f.id ? 'text-on-primary-fixed/70' : 'text-on-surface/50',
                  ].join(' ')}
                >
                  {f.sublabel}
                </span>
                {f.scaffolding > 0 && (
                  <span
                    className={[
                      'font-headline text-xs font-semibold uppercase tracking-widest mt-1',
                      floorId === f.id ? 'text-on-primary-fixed/60' : 'text-on-surface/35',
                    ].join(' ')}
                  >
                    +${f.scaffolding} scaffolding
                  </span>
                )}
              </label>
            ))}
          </div>
          <p className="mt-3 font-sans text-xs text-on-surface/40">
            Upper-floor windows without balcony access require scaffolding. Quoted separately at site measure.
          </p>
        </fieldset>

        {/* ── Section D: Glass type ── */}
        <fieldset className="mb-10">
          <legend className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/55 mb-4 block">
            Glass type
          </legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {glassTypes.map(g => (
              <label
                key={g.id}
                className={[
                  'flex items-start justify-between gap-4 p-4 cursor-pointer transition-colors duration-150 select-none',
                  glassId === g.id
                    ? 'bg-primary-container text-on-primary-fixed'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface',
                ].join(' ')}
              >
                <input
                  type="radio"
                  name="glassType"
                  value={g.id}
                  checked={glassId === g.id}
                  onChange={() => setGlassId(g.id)}
                  className="sr-only"
                />
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-headline text-sm font-semibold uppercase tracking-wide leading-tight">
                    {g.name}
                  </span>
                  <span
                    className={[
                      'font-sans text-xs leading-snug',
                      glassId === g.id ? 'text-on-primary-fixed/70' : 'text-on-surface/50',
                    ].join(' ')}
                  >
                    {g.bestFor}
                  </span>
                </div>
                <span
                  className={[
                    'font-display leading-none shrink-0',
                    glassId === g.id ? 'text-on-primary-fixed' : 'text-on-surface',
                  ].join(' ')}
                  style={{ fontSize: '1.25rem' }}
                >
                  ${g.priceFrom}/m²
                </span>
              </label>
            ))}
          </div>
          <p className="mt-3 font-sans text-xs text-on-surface/40">
            Not sure? Standard Clear works well for most Melbourne homes.
          </p>
        </fieldset>

        {/* ── CTA ── */}
        <button
          type="button"
          onClick={handleCalculate}
          className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 flex items-center justify-center gap-3"
        >
          Calculate My Estimate
          <span aria-hidden="true" className="text-base leading-none">→</span>
        </button>

        <p className="mt-4 text-center font-sans text-xs text-on-surface/35">
          No email required to see your number
        </p>
      </div>
    )
  }

  // ── Step 2: Result ─────────────────────────────────────────
  return (
    <div
      id="estimate-result"
      className="max-w-3xl mx-auto"
      aria-label="Instant estimate calculator — step 2 of 2"
    >
      {/* Progress */}
      <div className="bg-surface ghost-border px-8 pt-8 md:px-12 md:pt-12">
        <StepIndicator current={2} />
      </div>

      {/* Result panel — the NUMBER is the hero */}
      <div className="bg-inverse-surface px-8 py-10 md:px-12 md:py-14">
        <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3">
          Your Estimate
        </p>
        <p
          className="font-display uppercase leading-none text-primary-container"
          style={{ fontSize: 'clamp(3.5rem, 11vw, 7rem)' }}
          aria-label={`Estimated cost: ${fmtAUD(lowEst)} to ${fmtAUD(highEst)}`}
        >
          {fmtAUD(lowEst)}
          <span className="text-inverse-on-surface/25 mx-2">–</span>
          {fmtAUD(highEst)}
        </p>
        <p className="font-sans text-sm text-inverse-on-surface/50 mt-3">
          Accurate within ±10% of the final invoice price &middot; No email required
        </p>
      </div>

      {/* Value Ledger breakdown */}
      <div className="bg-surface ghost-border border-t-0 px-8 pb-8 pt-6 md:px-12 md:pb-10 md:pt-8">
        <div className="value-ledger px-6 py-5 mb-8">
          <dl className="space-y-3">
            <BreakdownRow label="Windows" value={`${count} window${count !== 1 ? 's' : ''}`} />
            <BreakdownRow label="Average size" value={`${size.label} (~${size.area} m²)`} />
            <BreakdownRow label="Total glass area" value={`${totalArea} m²`} />
            <BreakdownRow label="Glass type" value={glass.name} />
            <BreakdownRow label="Base rate" value={`$${glass.priceFrom}/m²`} />
            <BreakdownRow label="Floor level" value={floor.label} />
            {scaffolding > 0 && (
              <BreakdownRow label="Scaffolding (est.)" value={fmtAUD(scaffolding)} />
            )}
            <div className="h-px bg-primary-container/30 my-1" aria-hidden="true" />
            <BreakdownRow
              label="Estimate range"
              value={`${fmtAUD(lowEst)} – ${fmtAUD(highEst)}`}
              strong
            />
          </dl>
          <p className="mt-4 font-sans text-xs text-on-surface/40 leading-relaxed">
            Includes glass, installation, frame prep, rubbish removal, and 10-year warranty.
            {scaffolding > 0 && ' Scaffolding cost confirmed at on-site measure.'}
            {' '}VEU rebates (typically $300–$900) applied at invoice stage.
          </p>
        </div>

        {/* Action cluster */}
        {!showLead && !submitted && (
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/contact/"
              className="flex-1 inline-flex items-center justify-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
            >
              Book Free Assessment
              <span aria-hidden="true">→</span>
            </Link>
            <button
              type="button"
              onClick={() => setShowLead(true)}
              className="flex-1 inline-flex items-center justify-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-4 hover:bg-on-surface/80 transition-colors duration-150"
            >
              Email Me This Estimate
            </button>
          </div>
        )}

        {/* ── Optional lead capture ── */}
        {showLead && !submitted && (
          <div className="mt-2">
            <div className="h-px bg-surface-container-high mb-6" aria-hidden="true" />
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/55 mb-1">
              Send Me a Formal PDF Quote
            </p>
            <p className="font-sans text-xs text-on-surface/40 mb-6 leading-relaxed">
              We&apos;ll email an itemised PDF quote within 2 business hours.
              No follow-up calls unless you ask.
            </p>

            <form onSubmit={handleLeadSubmit} noValidate className="flex flex-col gap-4">
              {/* Name — optional */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lead-name"
                  className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/55"
                >
                  Name <span className="normal-case tracking-normal font-sans text-on-surface/35">(optional)</span>
                </label>
                <input
                  id="lead-name"
                  type="text"
                  autoComplete="name"
                  value={leadName}
                  onChange={e => setLeadName(e.target.value)}
                  placeholder="Your name"
                  className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/30 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lead-email"
                  className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/55"
                >
                  Email <span className="normal-case tracking-normal font-sans text-on-surface/35">(or phone below)</span>
                </label>
                <input
                  id="lead-email"
                  type="email"
                  autoComplete="email"
                  value={leadEmail}
                  onChange={e => setLeadEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/30 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
                />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="lead-phone"
                  className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/55"
                >
                  Phone <span className="normal-case tracking-normal font-sans text-on-surface/35">(optional)</span>
                </label>
                <input
                  id="lead-phone"
                  type="tel"
                  autoComplete="tel"
                  value={leadPhone}
                  onChange={e => setLeadPhone(e.target.value)}
                  placeholder="04XX XXX XXX"
                  className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/30 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
                />
              </div>

              {leadError && (
                <p role="alert" className="font-sans text-sm text-danger">
                  {leadError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row gap-3 mt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 inline-flex items-center justify-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Sending…' : 'Send PDF Quote'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowLead(false)}
                  className="sm:w-auto inline-flex items-center justify-center bg-transparent text-on-surface/50 font-headline text-xs font-semibold uppercase tracking-widest px-4 py-4 hover:text-on-surface transition-colors duration-150"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ── Success state ── */}
        {submitted && (
          <div className="mt-2 bg-surface-container-lowest px-6 py-5 value-ledger">
            <p className="font-headline text-sm font-semibold uppercase tracking-wide text-success mb-1">
              ✓ Quote Request Sent
            </p>
            <p className="font-sans text-sm text-on-surface/60 leading-relaxed">
              We&apos;ll email your itemised PDF quote within 2 business hours.
              A technician is available on{' '}
              <a
                href={siteConfig.phoneHref}
                className="text-on-surface font-semibold underline"
              >
                {siteConfig.phone}
              </a>{' '}
              if you&apos;d prefer to talk now.
            </p>
          </div>
        )}

        {/* Recalculate */}
        <div className="mt-8 pt-6 border-t border-surface-container-high flex items-center justify-between flex-wrap gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/40 hover:text-on-surface transition-colors duration-150 flex items-center gap-2"
          >
            ← Recalculate
          </button>
          <p className="font-sans text-xs text-on-surface/30">
            Free on-site assessment confirms the exact price.
          </p>
        </div>
      </div>
    </div>
  )
}

// ── Sub-components ──────────────────────────────────────────────

function StepIndicator({ current }: { current: 1 | 2 }) {
  const steps = ['Your Windows', 'Your Estimate'] as const
  return (
    <div className="flex items-center gap-0" aria-label={`Step ${current} of 2`}>
      {steps.map((label, i) => {
        const num    = i + 1
        const active = num === current
        const done   = num < current
        return (
          <div key={label} className="flex items-center">
            <div className="flex items-center gap-2">
              <span
                className={[
                  'w-6 h-6 flex items-center justify-center font-headline text-xs font-semibold',
                  active ? 'bg-primary-container text-on-primary-fixed' : done ? 'bg-success text-white' : 'bg-surface-container-high text-on-surface/40',
                ].join(' ')}
                aria-hidden="true"
              >
                {done ? '✓' : num}
              </span>
              <span
                className={[
                  'font-headline text-xs font-semibold uppercase tracking-wide',
                  active ? 'text-on-surface' : 'text-on-surface/35',
                ].join(' ')}
              >
                {label}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-8 h-px bg-surface-container-highest mx-3"
                aria-hidden="true"
              />
            )}
          </div>
        )
      })}
    </div>
  )
}

function BreakdownRow({
  label,
  value,
  strong = false,
}: {
  label: string
  value: string
  strong?: boolean
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt
        className={[
          'font-headline text-xs font-semibold uppercase tracking-wide shrink-0',
          strong ? 'text-on-surface' : 'text-on-surface/45',
        ].join(' ')}
      >
        {label}
      </dt>
      <dd
        className={[
          'font-sans text-sm text-right',
          strong ? 'font-semibold text-on-surface' : 'text-on-surface/70',
        ].join(' ')}
      >
        {value}
      </dd>
    </div>
  )
}
