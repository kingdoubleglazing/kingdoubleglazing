'use client'

import { useActionState } from 'react'
import { submitContact, type ContactState } from '@/app/(site)/actions/contact'

const initial: ContactState = { status: 'idle' }

const TIME_OPTIONS = [
  { value: 'morning',   label: 'Morning' },
  { value: 'afternoon', label: 'Afternoon' },
  { value: 'evening',   label: 'Evening' },
] as const

interface ContactFormProps {
  phone: string
  phoneHref: string
  email: string
}

export function ContactForm({ phone, phoneHref, email }: ContactFormProps) {
  const [state, action, pending] = useActionState(submitContact, initial)

  if (state.status === 'success') {
    return (
      <div className="bg-surface ghost-border p-8 md:p-12 max-w-2xl mx-auto">
        <div className="value-ledger px-6 py-5 mb-6">
          <p className="font-headline text-sm font-semibold uppercase tracking-wide text-success mb-1">
            ✓ Message Received
          </p>
          <p className="font-sans text-sm text-on-surface leading-relaxed">
            Got it, {state.name}. We'll call you within 2 hours.
          </p>
        </div>
        <p className="font-sans text-xs text-on-surface leading-relaxed">
          If it&apos;s urgent, call directly on{' '}
          <a href={phoneHref} className="text-primary font-semibold underline">
            {phone}
          </a>
          .
        </p>
      </div>
    )
  }

  return (
    <form
      action={action}
      noValidate
      className="bg-surface ghost-border p-8 md:p-12 max-w-2xl mx-auto flex flex-col gap-6"
      aria-label="Contact form"
    >
      {/* Error banner */}
      {state.status === 'error' && (
        <div role="alert" className="bg-danger/10 px-4 py-3">
          <p className="font-sans text-sm text-danger">{state.message}</p>
        </div>
      )}

      {/* ── Full Name ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-name"
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
        >
          Full Name <RequiredMark />
        </label>
        <input
          id="cf-name"
          type="text"
          name="name"
          autoComplete="name"
          required
          placeholder="Your full name"
          className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
        />
      </div>

      {/* ── Phone + Email ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-phone"
            className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
          >
            Phone Number <RequiredMark />
          </label>
          <input
            id="cf-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            required
            placeholder="04XX XXX XXX"
            className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-email"
            className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
          >
            Email Address <RequiredMark />
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
          />
        </div>
      </div>

      {/* ── Suburb ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-suburb"
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
        >
          Suburb <span className="normal-case tracking-normal font-sans font-normal text-on-surface">(optional)</span>
        </label>
        <input
          id="cf-suburb"
          type="text"
          name="suburb"
          autoComplete="address-level2"
          placeholder="e.g. Brunswick, Richmond, Glen Waverley"
          className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
        />
      </div>

      {/* ── Message ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-message"
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
        >
          Message <span className="normal-case tracking-normal font-sans font-normal text-on-surface">(optional)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="Tell us about your project — window count, location, urgency, anything useful."
          className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2 resize-y min-h-28"
        />
      </div>

      {/* ── Preferred time ── */}
      <fieldset>
        <legend className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface mb-3 block">
          Preferred contact time <span className="normal-case tracking-normal font-sans font-normal text-on-surface">(optional)</span>
        </legend>
        <div className="flex gap-2 flex-wrap">
          {TIME_OPTIONS.map(({ value, label }) => (
            <label key={value} className="cursor-pointer select-none">
              <input type="radio" name="preferredTime" value={value} className="sr-only peer" />
              <span className="inline-flex items-center px-4 py-2 font-headline text-xs font-semibold uppercase tracking-[0.12em] bg-surface-container text-on-surface peer-checked:bg-primary-container peer-checked:text-on-primary-fixed transition-colors duration-150">
                {label}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {pending ? 'Sending…' : 'Send Enquiry →'}
      </button>

      <p className="text-center font-sans text-xs text-on-surface">
        We'll call within 2 hours. No spam, no pressure.
      </p>

      {/* Alternatives */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 pt-2 border-t border-surface-container-high">
        <a
          href={phoneHref}
          className="font-headline text-xs font-semibold uppercase tracking-widest text-on-surface hover:text-primary transition-colors duration-150"
        >
          ☎ {phone}
        </a>
        <a
          href={`mailto:${email}`}
          className="font-headline text-xs font-semibold uppercase tracking-widest text-on-surface hover:text-primary transition-colors duration-150"
        >
          ✉ {email}
        </a>
      </div>
    </form>
  )
}

function RequiredMark() {
  return (
    <span className="text-danger font-sans normal-case tracking-normal" aria-label="required">
      *
    </span>
  )
}
