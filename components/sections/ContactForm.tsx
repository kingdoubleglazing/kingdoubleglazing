'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { siteConfig } from '@/data/site'
import { submitContactForm, type ContactFormState } from '@/app/contact/actions'

const SERVICE_OPTIONS = [
  'Retrofit Double Glazing',
  'Emergency Glass Repair',
  'Shower Screens',
  'Glass Splashbacks',
  'Custom Mirrors',
  'Commercial Glazing',
  'Other / Not Sure',
] as const

const initial: ContactFormState = { status: 'idle' }

export function ContactForm() {
  const [state, action, pending] = useActionState(submitContactForm, initial)

  if (state.status === 'success') {
    return (
      <div className="bg-surface ghost-border p-8 md:p-12 max-w-2xl mx-auto">
        <div className="value-ledger px-6 py-5 mb-6">
          <p className="font-headline text-sm font-semibold uppercase tracking-wide text-success mb-1">
            ✓ Message Received
          </p>
          <p className="font-sans text-sm text-on-surface/70 leading-relaxed">
            We&apos;ll be in touch within one business day. If it&apos;s urgent, call us now on{' '}
            <a href={siteConfig.phoneHref} className="text-primary font-semibold underline">
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>
        <p className="font-sans text-xs text-on-surface/80 leading-relaxed">
          While you wait, check out the{' '}
          <Link href="/instant-estimate/" className="underline hover:text-on-surface/80">
            Instant Estimate Tool
          </Link>{' '}
          to see a ballpark figure before our call.
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
      {/* Honeypot — hidden from real users */}
      <input type="text" name="_hp" tabIndex={-1} aria-hidden="true" className="hidden" />

      {/* Error banner */}
      {state.status === 'error' && (
        <div role="alert" className="bg-danger/10 px-4 py-3">
          <p className="font-sans text-sm text-danger">{state.message}</p>
        </div>
      )}

      {/* ── Name ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-name"
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75"
        >
          Name <RequiredMark />
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

      {/* ── Email + Phone side by side ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-email"
            className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75"
          >
            Email
          </label>
          <input
            id="cf-email"
            type="email"
            name="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="cf-phone"
            className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75"
          >
            Phone
          </label>
          <input
            id="cf-phone"
            type="tel"
            name="phone"
            autoComplete="tel"
            placeholder="04XX XXX XXX"
            className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
          />
        </div>
      </div>
      <p className="font-sans text-xs text-on-surface/60 -mt-4">
        At least one contact method required.
      </p>

      {/* ── Service ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-service"
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75"
        >
          What are you after? <span className="normal-case tracking-normal font-sans font-normal text-on-surface/60">(optional)</span>
        </label>
        <div className="relative">
          <select
            id="cf-service"
            name="service"
            defaultValue=""
            className="w-full appearance-none bg-surface-container-high px-4 py-3 pr-10 font-sans text-base text-on-surface focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2 cursor-pointer"
          >
            <option value="" disabled>Select a service…</option>
            {SERVICE_OPTIONS.map(opt => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          {/* Chevron icon */}
          <span
            className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-on-surface/80"
            aria-hidden="true"
          >
            ▾
          </span>
        </div>
      </div>

      {/* ── Message ── */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="cf-message"
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/75"
        >
          Message <span className="normal-case tracking-normal font-sans font-normal text-on-surface/60">(optional)</span>
        </label>
        <textarea
          id="cf-message"
          name="message"
          rows={4}
          placeholder="Tell us about your project — window count, location, urgency, anything useful."
          className="bg-surface-container-high px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/55 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2 resize-y min-h-28"
        />
      </div>

      {/* ── Submit ── */}
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-5 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {pending ? 'Sending…' : 'Send Message'}
        {!pending && <span aria-hidden="true" className="text-base leading-none">→</span>}
      </button>

      <p className="text-center font-sans text-xs text-on-surface/60">
        We respond within one business day. No spam, no pressure.
      </p>

      {/* Alternatives */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-x-8 gap-y-2 pt-2 border-t border-surface-container-high">
        <a
          href={siteConfig.phoneHref}
          className="font-headline text-xs font-semibold uppercase tracking-widest text-on-surface/70 hover:text-primary transition-colors duration-150"
        >
          ☎ {siteConfig.phone}
        </a>
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-headline text-xs font-semibold uppercase tracking-widest text-on-surface/70 hover:text-primary transition-colors duration-150"
        >
          ✉ {siteConfig.email}
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
