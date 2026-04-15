'use client'

import { useState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/site'
import { getEstimate, type PropertyType, type WindowCount, type Priority } from '@/lib/pricing'

// ── Types ─────────────────────────────────────────────────────────────────────

interface FormState {
  propertyType: PropertyType | null
  suburb: string
  windowCount: WindowCount | null
  priority: Priority | null
  firstName: string
  email: string
  mobile: string
}

const INITIAL: FormState = {
  propertyType: null,
  suburb: '',
  windowCount: null,
  priority: null,
  firstName: '',
  email: '',
  mobile: '',
}

// ── Component ─────────────────────────────────────────────────────────────────

export function EstimateForm() {
  const [step, setStep] = useState<1 | 2 | 3 | 'result'>(1)
  const [form, setForm] = useState<FormState>(INITIAL)
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  function next() {
    setStep(s => {
      if (s === 1) return 2
      if (s === 2) return 3
      return s
    })
  }

  function back() {
    setStep(s => {
      if (s === 2) return 1
      if (s === 3) return 2
      if (s === 'result') return 3
      return s
    })
  }

  function showResult() {
    setStep('result')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    // v1: form submission is intentionally stubbed. Backend wiring (Neon insert + Resend send)
    // is deferred to a future task. Do not change without client approval.
    await new Promise<void>(r => setTimeout(r, 600))
    setSubmitting(false)
    setSubmitted(true)
  }

  const estimate = form.windowCount && form.priority && form.propertyType
    ? getEstimate({ windowCount: form.windowCount, priority: form.priority, propertyType: form.propertyType })
    : null

  if (step === 'result') {
    return <ResultStep estimate={estimate} form={form} submitted={submitted} submitting={submitting} onSubmit={handleSubmit} update={update} onBack={back} />
  }

  return (
    <div
      id="estimate-form"
      className="bg-surface ghost-border p-8 md:p-12 max-w-2xl mx-auto"
      aria-label={`Instant estimate — step ${step} of 3`}
    >
      {/* Progress indicator — hidden on step 1 */}
      {step !== 1 && (
        <div className="mb-8 flex items-center gap-3" aria-label={`Step ${step} of 3`}>
          {([2, 3] as const).map(n => (
            <div key={n} className="flex items-center gap-3">
              <span
                className={[
                  'w-6 h-6 flex items-center justify-center font-headline text-xs font-semibold',
                  n < step ? 'bg-primary-container text-on-primary-fixed' : n === step ? 'bg-inverse-surface text-inverse-on-surface' : 'bg-surface-container-high text-on-surface/80',
                ].join(' ')}
                aria-hidden="true"
              >
                {n < step ? '✓' : n}
              </span>
              {n < 3 && <div className="w-6 h-px bg-surface-container-highest" aria-hidden="true" />}
            </div>
          ))}
          <span className="ml-2 font-headline text-xs font-semibold uppercase tracking-wide text-on-surface/80">
            Step {step} of 3
          </span>
        </div>
      )}

      {step === 1 && <Step1 form={form} update={update} onNext={next} onBack={back} />}
      {step === 2 && <Step2 form={form} update={update} onNext={next} onBack={back} />}
      {step === 3 && <Step3 form={form} update={update} onNext={showResult} onBack={back} />}
    </div>
  )
}

// ── Step 1 — About your home ──────────────────────────────────────────────────

function Step1({ form, update, onNext }: StepProps) {
  const types: { id: PropertyType; label: string }[] = [
    { id: 'house',     label: 'House' },
    { id: 'apartment', label: 'Apartment' },
    { id: 'townhouse', label: 'Townhouse' },
  ]

  return (
    <>
      <h2
        className="font-display uppercase leading-none text-on-surface mb-2"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        Tell Us About
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">Your Home.</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mb-10 leading-relaxed">Takes 60 seconds.</p>

      <fieldset className="mb-8">
        <legend className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/75 mb-4 block">
          Property type
        </legend>
        <div className="grid grid-cols-3 gap-2">
          {types.map(t => (
            <label
              key={t.id}
              className={[
                'flex flex-col items-center gap-2 p-4 cursor-pointer transition-colors duration-150 select-none text-center',
                form.propertyType === t.id
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface',
              ].join(' ')}
            >
              <input type="radio" name="propertyType" value={t.id} checked={form.propertyType === t.id} onChange={() => update('propertyType', t.id)} className="sr-only" />
              <span className="font-headline text-sm font-semibold uppercase tracking-wide">{t.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mb-10 flex flex-col gap-1.5">
        <label htmlFor="suburb" className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/75">
          Suburb
        </label>
        <input
          id="suburb"
          type="text"
          autoComplete="address-level2"
          placeholder="e.g. Brunswick, Richmond, Glen Waverley"
          value={form.suburb}
          onChange={e => update('suburb', e.target.value)}
          className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
        />
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={!form.propertyType}
        className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </>
  )
}

// ── Step 2 — Window count ─────────────────────────────────────────────────────

function Step2({ form, update, onNext, onBack }: StepProps) {
  const options: { id: WindowCount; label: string }[] = [
    { id: '1-3',  label: '1–3 windows' },
    { id: '4-6',  label: '4–6 windows' },
    { id: '7-10', label: '7–10 windows' },
    { id: '10+',  label: '10+ windows' },
  ]

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/70 hover:text-on-surface transition-colors duration-150 mb-6 block"
      >
        ← Back
      </button>

      <h2
        className="font-display uppercase leading-none text-on-surface mb-2"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        Which Windows
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">Are Bothering You?</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mb-10 leading-relaxed">How many windows do you want to upgrade?</p>

      <fieldset className="mb-10">
        <legend className="sr-only">Number of windows to upgrade</legend>
        <div className="grid grid-cols-2 gap-2">
          {options.map(o => (
            <label
              key={o.id}
              className={[
                'flex items-center justify-center p-5 cursor-pointer transition-colors duration-150 select-none text-center',
                form.windowCount === o.id
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface',
              ].join(' ')}
            >
              <input type="radio" name="windowCount" value={o.id} checked={form.windowCount === o.id} onChange={() => update('windowCount', o.id)} className="sr-only" />
              <span className="font-headline text-sm font-semibold uppercase tracking-wide">{o.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onNext}
        disabled={!form.windowCount}
        className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next →
      </button>
    </>
  )
}

// ── Step 3 — Goal ─────────────────────────────────────────────────────────────

function Step3({ form, update, onNext, onBack }: StepProps) {
  const goals: { id: Priority; emoji: string; label: string }[] = [
    { id: 'noise',  emoji: '🔇', label: 'Cut noise' },
    { id: 'warmth', emoji: '🔥', label: 'Keep winter warmth in' },
    { id: 'bills',  emoji: '💰', label: 'Cut energy bills' },
    { id: 'all',    emoji: '🏠', label: 'All of the above' },
  ]

  return (
    <>
      <button
        type="button"
        onClick={onBack}
        className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/70 hover:text-on-surface transition-colors duration-150 mb-6 block"
      >
        ← Back
      </button>

      <h2
        className="font-display uppercase leading-none text-on-surface mb-2"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
      >
        What&apos;s Your
        <br />
        <span className="bg-primary-container text-on-primary-fixed px-2 inline-block leading-tight">Main Goal?</span>
      </h2>
      <p className="font-sans text-sm text-on-surface/70 mb-10 leading-relaxed">
        We&apos;ll recommend the right glass type based on your priority.
      </p>

      <fieldset className="mb-10">
        <legend className="sr-only">Main goal</legend>
        <div className="grid grid-cols-2 gap-2">
          {goals.map(g => (
            <label
              key={g.id}
              className={[
                'flex flex-col items-center gap-3 p-5 cursor-pointer transition-colors duration-150 select-none text-center',
                form.priority === g.id
                  ? 'bg-primary-container text-on-primary-fixed'
                  : 'bg-surface-container hover:bg-surface-container-high text-on-surface',
              ].join(' ')}
            >
              <input type="radio" name="priority" value={g.id} checked={form.priority === g.id} onChange={() => update('priority', g.id)} className="sr-only" />
              <span className="text-2xl" aria-hidden="true">{g.emoji}</span>
              <span className="font-headline text-sm font-semibold uppercase tracking-wide leading-snug">{g.label}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <button
        type="button"
        onClick={onNext}
        disabled={!form.priority}
        className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        See My Estimate Range →
      </button>
    </>
  )
}

// ── Result step ───────────────────────────────────────────────────────────────

function ResultStep({
  estimate,
  form,
  submitted,
  submitting,
  onSubmit,
  update,
  onBack,
}: {
  estimate: ReturnType<typeof getEstimate> | null
  form: FormState
  submitted: boolean
  submitting: boolean
  onSubmit: (e: React.FormEvent) => Promise<void>
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onBack: () => void
}) {
  const canSubmit = form.firstName.trim() && form.email.trim() && form.mobile.trim()

  return (
    <div id="estimate-result" className="max-w-2xl mx-auto">
      {/* The number — hero of the result screen */}
      <div className="bg-inverse-surface px-8 py-12 md:px-12 md:py-16">
        <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-3">
          Most Melbourne homes like yours invest
        </p>
        <p
          className="font-display uppercase leading-none text-primary-container"
          style={{ fontSize: 'clamp(3rem, 11vw, 6.5rem)' }}
          aria-label={`Estimated range: ${estimate?.label}`}
        >
          {estimate?.label ?? '$2,400 – $5,800'}
        </p>
        <div className="mt-5">
          <span className="inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-wide bg-primary-container text-on-primary-fixed px-3 py-1.5">
            <span aria-hidden="true">±</span>
            Accurate Within 10%
          </span>
        </div>
        <p className="font-sans text-base text-inverse-on-surface/85 mt-4 leading-relaxed">
          Estimated range — final quote confirmed at the free in-home check.
        </p>
      </div>

      {/* Lead capture */}
      <div className="bg-surface ghost-border border-t-0 px-8 pb-10 pt-8 md:px-12">
        {!submitted ? (
          <>
            <button
              type="button"
              onClick={onBack}
              className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/70 hover:text-on-surface transition-colors duration-150 mb-6 block"
            >
              ← Back
            </button>

            <p className="font-sans text-base text-on-surface/80 leading-relaxed mb-6">
              Pop in your details and Tas will send you a written quote within one business day.
            </p>

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="firstName" className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75">
                  First name <span className="text-danger font-sans">*</span>
                </label>
                <input
                  id="firstName"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={form.firstName}
                  onChange={e => update('firstName', e.target.value)}
                  placeholder="Your first name"
                  className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75">
                  Email <span className="text-danger font-sans">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={form.email}
                  onChange={e => update('email', e.target.value)}
                  placeholder="you@example.com"
                  className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="mobile" className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75">
                  Mobile <span className="text-danger font-sans">*</span>
                </label>
                <input
                  id="mobile"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  required
                  value={form.mobile}
                  onChange={e => update('mobile', e.target.value)}
                  placeholder="04XX XXX XXX"
                  className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !canSubmit}
                className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {submitting ? 'Sending…' : 'Send My Written Quote →'}
              </button>

              <p className="mt-1 text-center font-sans text-xs text-on-surface/70">
                No spam. No call centres. Just Tas.
              </p>
            </form>
          </>
        ) : (
          <div className="bg-surface-container-lowest px-6 py-5">
            <p className="font-headline text-sm font-semibold uppercase tracking-wide text-primary mb-1">
              ✓ Quote Request Sent
            </p>
            <p className="font-sans text-sm text-on-surface/80 leading-relaxed">
              We&apos;ll email your written quote within 24 hours. Want to talk now?{' '}
              <a href={siteConfig.phoneHref} className="text-on-surface font-semibold underline">
                Call {siteConfig.phone}
              </a>
            </p>
          </div>
        )}

        <p className="mt-6 font-sans text-xs text-on-surface/55 leading-relaxed text-center">
          This is an estimated range based on typical Melbourne homes.
          Final quote confirmed after a free on-site check — no surprises, no pressure.
        </p>

        {!submitted && (
          <div className="flex flex-col sm:flex-row gap-3 mt-4">
            <Link
              href="/contact/"
              className="flex-1 inline-flex items-center justify-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-4 hover:bg-on-surface/80 transition-colors duration-150"
            >
              Book Free Home Visit
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="flex-1 inline-flex items-center justify-center gap-3 bg-transparent text-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-4 ghost-border hover:bg-surface-container transition-colors duration-150"
            >
              Call {siteConfig.phone}
            </a>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Shared types ──────────────────────────────────────────────────────────────

interface StepProps {
  form: FormState
  update: <K extends keyof FormState>(key: K, value: FormState[K]) => void
  onNext: () => void
  onBack: () => void
}
