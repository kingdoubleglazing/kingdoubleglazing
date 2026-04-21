'use client'

import { useState, useActionState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Phone } from 'lucide-react'
import {
  OPTIONS,
  calculateQuote,
  SECOND_STOREY_SURCHARGE,
  type OptionKey,
  type WindowRow,
} from '@/data/pricing'
import { submitQuote, type QuoteState } from '@/app/actions/quote'
import { siteConfig } from '@/data/site'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

const OPTION_KEYS = Object.keys(OPTIONS) as OptionKey[]

interface RowDraft {
  heightMm: string
  widthMm: string
  quantity: string
  secondStorey: boolean
}

const BLANK_ROW: RowDraft = { heightMm: '', widthMm: '', quantity: '1', secondStorey: false }

function parseRow(r: RowDraft): WindowRow | null {
  const h = Number(r.heightMm)
  const w = Number(r.widthMm)
  const q = Number(r.quantity)
  if (!h || !w || !q) return null
  if (h < 200 || h > 3500 || w < 200 || w > 3500 || q < 1 || q > 50) return null
  return { heightMm: h, widthMm: w, quantity: q, secondStorey: r.secondStorey }
}

export function GlassComparisonTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [revealed, setRevealed] = useState<Record<OptionKey, boolean>>({
    A: false, B: false, C: false, D: false,
  })
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null)
  const [rows, setRows] = useState<RowDraft[]>([{ ...BLANK_ROW }])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [quoteState, quoteAction, quotePending] = useActionState(
    submitQuote,
    { status: 'idle' } as QuoteState,
  )
  const calcRef = useRef<HTMLDivElement>(null)

  // Sync from URL on mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const opt = searchParams.get('option') as OptionKey
    if (OPTION_KEYS.includes(opt) && !selectedOption) {
      setSelectedOption(opt)
    }
  }, [searchParams])


  function handleSelect(key: OptionKey) {
    const firstSelection = selectedOption === null
    setSelectedOption(key)
    router.replace(`?option=${key}`, { scroll: false })
    if (firstSelection) {
      requestAnimationFrame(() => {
        calcRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      })
    }
  }

  function toggle(key: OptionKey) {
    setRevealed(prev => ({ ...prev, [key]: !prev[key] }))
  }

  function updateRow(i: number, field: keyof RowDraft, value: string | boolean) {
    setRows(prev => {
      const next = [...prev]
      next[i] = { ...next[i], [field]: value }
      return next
    })
  }

  function addRow() {
    setRows(prev => [...prev, { ...BLANK_ROW }])
  }

  function removeRow(i: number) {
    if (rows.length <= 1) return
    setRows(prev => prev.filter((_, idx) => idx !== i))
  }

  function reset() {
    setSelectedOption(null)
    setRows([{ ...BLANK_ROW }])
    router.replace('?', { scroll: false })
  }

  const validRows = rows.map(parseRow).filter(Boolean) as WindowRow[]
  const rawTotal =
    selectedOption && validRows.length > 0 ? calculateQuote(selectedOption, validRows) : null
  const total = rawTotal ? Math.round(rawTotal / 10) * 10 : null
  const totalWindows = validRows.reduce((s, r) => s + r.quantity, 0)

  // ── Main view ──────────────────────────────────────────────────────────────
  return (
    <section className="bg-surface-container-low py-14 md:py-18" id="estimate-form">
      <div className="max-w-5xl mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            Glass Options
          </p>
          <h2
            className="font-display uppercase leading-[0.9] text-on-surface"
            style={{ fontSize: 'clamp(1.35rem,5vw,3.5rem)' }}
          >
            What do I want to achieve?
          </h2>
          <p className="font-sans text-sm text-on-surface mt-3">
            Select an option to get your price.
          </p>
        </div>

        {/* 2×2 grid on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {OPTION_KEYS.map(key => {
            const opt = OPTIONS[key]
            const isRevealed = revealed[key]
            const isTop = key === 'D'
            const isSelected = selectedOption === key

            return (
              <div
                key={key}
                role="button"
                tabIndex={0}
                onClick={() => handleSelect(key)}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    handleSelect(key)
                  }
                }}
                className={[
                  'relative flex flex-col p-4 md:p-5 cursor-pointer transition-all duration-150 group',
                  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  isSelected
                    ? 'border-2 border-primary bg-primary/8 scale-[1.02]'
                    : isTop
                    ? 'bg-inverse-surface border border-primary-container hover:border-primary-container active:scale-[0.98]'
                    : 'bg-surface border border-surface-container-high hover:border-primary/60 hover:bg-surface-container active:scale-[0.98]',
                ].join(' ')}
              >
                {isSelected && (
                  <span className="absolute top-1.5 right-1.5 font-headline text-[0.5rem] font-semibold uppercase tracking-widest bg-primary text-white px-1.5 py-0.5 leading-none">
                    Selected
                  </span>
                )}

                {/* Option letter */}
                <span
                  className={[
                    'font-display uppercase leading-none mb-2',
                    isSelected ? 'text-primary' : isTop ? 'text-primary-container' : 'text-primary',
                  ].join(' ')}
                  style={{ fontSize: 'clamp(2rem,5vw,3rem)' }}
                >
                  {key}
                </span>

                {/* Sublabel */}
                <p
                  className={[
                    'font-headline text-xs font-semibold uppercase tracking-wide leading-tight mb-3',
                    isSelected ? 'text-on-surface' : isTop ? 'text-inverse-on-surface' : 'text-on-surface',
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
                        isSelected ? 'text-primary' : isTop ? 'text-primary-container' : 'text-on-surface',
                      ].join(' ')}
                      style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)' }}
                    >
                      {opt.noisePct}%
                    </p>
                    <p
                      className={[
                        'font-headline text-[0.6rem] font-semibold uppercase tracking-wide',
                        isSelected ? 'text-on-surface/70' : isTop ? 'text-inverse-on-surface/80' : 'text-on-surface/80',
                      ].join(' ')}
                    >
                      quieter
                    </p>
                  </div>
                  <div>
                    <p
                      className={[
                        'font-display uppercase leading-none',
                        isSelected ? 'text-primary' : isTop ? 'text-primary-container' : 'text-on-surface',
                      ].join(' ')}
                      style={{ fontSize: 'clamp(1.5rem,4vw,2.25rem)' }}
                    >
                      {opt.heatPct}%
                    </p>
                    <p
                      className={[
                        'font-headline text-[0.6rem] font-semibold uppercase tracking-wide',
                        isSelected ? 'text-on-surface/70' : isTop ? 'text-inverse-on-surface/80' : 'text-on-surface/80',
                      ].join(' ')}
                    >
                      less heat
                    </p>
                  </div>
                </div>

                {/* CTA label */}
                <p
                  className={[
                    'mt-auto font-headline text-[0.65rem] font-semibold uppercase tracking-[0.15em] transition-colors duration-150',
                    isSelected
                      ? 'text-primary'
                      : isTop
                      ? 'text-primary-container group-hover:text-primary-fixed-dim'
                      : 'text-primary/60 group-hover:text-primary',
                  ].join(' ')}
                >
                  {isSelected ? '✓ Selected' : 'Get my price →'}
                </p>

                {/* Spec toggle */}
                <button
                  type="button"
                  onClick={e => { e.stopPropagation(); toggle(key) }}
                  className={[
                    'mt-2 text-left font-sans text-xs underline underline-offset-2 transition-colors duration-150',
                    isSelected
                      ? 'text-on-surface/50 hover:text-on-surface/70'
                      : isTop
                      ? 'text-inverse-on-surface/70 hover:text-inverse-on-surface/70'
                      : 'text-on-surface/70 hover:text-on-surface/70',
                  ].join(' ')}
                >
                  {isRevealed ? 'Hide spec ↑' : "What's this made of? ↓"}
                </button>

                {isRevealed && (
                  <p
                    className={[
                      'mt-2 font-sans text-[0.65rem] leading-snug',
                      isSelected
                        ? 'text-on-surface/70'
                        : isTop
                        ? 'text-inverse-on-surface/80'
                        : 'text-on-surface',
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

        {/* Contextual hints — only before selection */}
        {!selectedOption && (
          <>
            <p className="mt-5 text-center font-sans text-sm text-on-surface">
              Press any option to get your price.
            </p>
            <div className="mt-6 border-l-4 border-primary-container pl-4">
              <p className="font-sans text-sm text-on-surface leading-relaxed">
                <strong>East or west-facing rooms?</strong> They get more heat. Choose Option C or D.
              </p>
            </div>
            <p className="mt-4 font-sans text-xs text-on-surface/80 leading-relaxed">
              All figures compared to standard single glazing — what most Melbourne homes have now.
            </p>
          </>
        )}

        {/* ── Inline calculator (revealed on option select) ──────────────── */}
        {selectedOption && (
          <div ref={calcRef} className="mt-8 max-w-2xl">

            {/* Selected option summary + change link */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-surface-container-high">
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface">
                {OPTIONS[selectedOption].label}: {OPTIONS[selectedOption].sublabel}
              </p>
              <button
                type="button"
                onClick={reset}
                className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-primary/70 hover:text-primary transition-colors duration-150"
              >
                Change →
              </button>
            </div>

            {/* Step 1 of 2: Window measurements */}
            <div>
              <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-on-surface mb-2">
                Step 1 of 2
              </p>
              <p
                className="font-display uppercase text-on-surface leading-none mb-4"
                style={{ fontSize: 'clamp(1.2rem,3vw,1.75rem)' }}
              >
                Your windows
              </p>

              <div className="mb-5 border-l-2 border-primary-container pl-3">
                <p className="font-sans text-sm text-on-surface leading-relaxed">
                  Measure the glass, not the frame. Enter height and width in millimetres.
                </p>
                <p className="font-sans text-xs text-on-surface/60 mt-1 leading-relaxed">
                  Same size three times? Enter one row and set quantity to 3.
                </p>
              </div>

              <div className="flex justify-center mb-5">
                <WindowDiagram />
              </div>

              <div className="space-y-4">
                {rows.map((row, i) => (
                  <WindowRowInput
                    key={i}
                    index={i}
                    row={row}
                    onChange={(field, val) => updateRow(i, field, val)}
                    onRemove={() => removeRow(i)}
                    canRemove={rows.length > 1}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={addRow}
                className="mt-4 w-full py-3 border border-dashed border-outline-variant text-on-surface/50 hover:border-primary hover:text-primary font-headline text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-150"
              >
                + Add another window
              </button>
            </div>

            {/* Step 2 of 2: Price */}
            <div className="mt-8 pt-8 border-t border-surface-container-high">
              <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-on-surface mb-2">
                Step 2 of 2
              </p>
              <p className="font-headline text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-on-surface/70 mb-2">
                Your quote
              </p>

              <p
                className="font-display uppercase text-primary leading-none transition-all duration-200"
                style={{ fontSize: 'clamp(2.25rem,7vw,4rem)' }}
                aria-live="polite"
                aria-label={
                  total
                    ? `Quote total: $${total.toLocaleString()}`
                    : 'Enter your window measurements above'
                }
              >
                {total ? `$${total.toLocaleString()}` : '—'}
              </p>

              {!total && (
                <p className="font-sans text-xs text-on-surface/50 mt-2">
                  Updates as you enter your windows above.
                </p>
              )}

              {total && (
                <>
                  <div className="mt-4 space-y-1">
                    {validRows.map((r, i) => {
                      const sqm = (r.heightMm / 1000) * (r.widthMm / 1000)
                      const opt = OPTIONS[selectedOption!]
                      const rowCost =
                        sqm * opt.pricePerSqm * r.quantity +
                        (r.secondStorey ? SECOND_STOREY_SURCHARGE * r.quantity : 0)
                      return (
                        <div key={i} className="flex justify-between gap-4 font-sans text-xs text-on-surface/60">
                          <span>
                            {r.heightMm}×{r.widthMm}mm · qty {r.quantity}
                            {r.secondStorey ? ' · 2nd floor' : ''}
                          </span>
                          <span className="shrink-0">${Math.round(rowCost).toLocaleString()}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className="border-l-4 border-primary-container pl-4 mt-5">
                    <p className="font-sans text-sm font-semibold text-on-surface">
                      If you&apos;ve filled this out correctly, your price is accurate to within 10%.
                    </p>
                    <p className="font-sans text-xs text-on-surface/60 leading-relaxed mt-1">
                      If your measurements are off, the final quote may adjust slightly. We confirm
                      everything on site before any work starts.
                    </p>
                  </div>

                  <div className="mt-5 bg-primary-container text-on-primary-fixed px-5 py-3">
                    <p className="font-sans text-sm font-medium leading-snug">
                      If this is within your budget, send your quote through — Tas will call to
                      confirm and book the install.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setDialogOpen(true)}
                    className="mt-6 w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 active:scale-[0.98]"
                  >
                    Send Quote to Tas →
                  </button>
                  <a
                    href={siteConfig.phoneHref}
                    className="mt-3 w-full inline-flex items-center justify-center gap-2 border-2 border-primary/40 text-primary font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary/10 transition-colors duration-150"
                  >
                    <Phone size={16} aria-hidden="true" />
                    Or Call Tas — {siteConfig.phone}
                  </a>
                </>
              )}
            </div>
          </div>
        )}

      </div>

      {/* ── Quote contact Dialog ───────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-0">
          {quoteState.status === 'success' ? (
            <div className="px-6 pt-10 pb-8 text-center">
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                ✓ Sent.
              </p>
              <DialogTitle
                className="font-display uppercase text-on-surface leading-none mb-3"
                style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)' }}
              >
                Tas will call you soon.
              </DialogTitle>
              <p className="font-sans text-sm text-on-surface/70 leading-relaxed mb-8 max-w-xs mx-auto">
                Once Tas confirms your quote you&apos;ll receive an email with your price locked in.
              </p>
              <button
                type="button"
                onClick={() => { setDialogOpen(false); reset() }}
                className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface hover:text-primary transition-colors duration-150 underline underline-offset-4"
              >
                Start a new quote
              </button>
            </div>
          ) : (
            <form action={quoteAction}>
              {/* Hidden quote fields */}
              <input type="hidden" name="option" value={selectedOption ?? ''} />
              <input type="hidden" name="windows" value={JSON.stringify(validRows)} />
              <input type="hidden" name="total" value={total ?? ''} />
              <input type="hidden" name="windowCount" value={totalWindows} />

              <div className="px-6 pt-8 pb-6">
                <DialogHeader className="mb-6">
                  <DialogTitle style={{ fontSize: 'clamp(1.4rem,4vw,2rem)' }}>
                    Send Your Quote to Tas
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    Tas will call to confirm and book your install.
                  </DialogDescription>
                </DialogHeader>

                {/* Quote summary */}
                {total && selectedOption && (
                  <div className="bg-surface-container-low border border-surface-container-high px-4 py-3 mb-6">
                    <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-on-surface/60 mb-1">
                      Your quote
                    </p>
                    <p className="font-display uppercase text-primary leading-none" style={{ fontSize: '2rem' }}>
                      ${total.toLocaleString()}
                    </p>
                    <p className="font-sans text-xs text-on-surface/60 mt-1">
                      {OPTIONS[selectedOption].label} · {totalWindows} window{totalWindows !== 1 ? 's' : ''}
                    </p>
                  </div>
                )}

                {/* Contact fields */}
                <div className="space-y-4">
                  <LightField id="d-name"   name="name"   label="Your name"          type="text"  autoComplete="name"           placeholder="Jane Smith" />
                  <LightField id="d-email"  name="email"  label="Email"               type="email" autoComplete="email"          placeholder="jane@example.com" />
                  <LightField id="d-phone"  name="phone"  label="Phone"               type="tel"   autoComplete="tel"            placeholder="0400 000 000" />
                  <LightField id="d-suburb" name="suburb" label="Suburb (optional)"   type="text"  autoComplete="address-level2" placeholder="e.g. Fitzroy" />
                </div>

                {quoteState.status === 'error' && (
                  <p className="mt-4 font-sans text-sm text-red-600" role="alert">
                    {quoteState.message ?? 'Something went wrong. Please try again.'}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={quotePending || !total}
                  className="mt-6 w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quotePending ? 'Sending…' : 'Send to Tas →'}
                </button>

                <a
                  href={siteConfig.phoneHref}
                  className="mt-3 w-full inline-flex items-center justify-center gap-2 border-2 border-primary/40 text-primary font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-3 hover:bg-primary/10 transition-colors duration-150"
                >
                  <Phone size={16} aria-hidden="true" />
                  Or Call Tas — {siteConfig.phone}
                </a>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>

    </section>
  )
}

// ── Window row input ───────────────────────────────────────────────────────────

function WindowRowInput({
  index, row, onChange, onRemove, canRemove,
}: {
  index: number
  row: RowDraft
  onChange: (field: keyof RowDraft, val: string | boolean) => void
  onRemove: () => void
  canRemove: boolean
}) {
  const h = Number(row.heightMm)
  const w = Number(row.widthMm)
  const q = Number(row.quantity)
  const sqm = h && w ? ((h / 1000) * (w / 1000)).toFixed(2) : null

  return (
    <div className="bg-surface border border-surface-container-high p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-headline text-xs font-semibold uppercase tracking-wide text-on-surface">
          Window {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="font-sans text-xs text-on-surface/50 hover:text-on-surface transition-colors duration-150"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-3">
        <NumberField
          id={`row-${index}-h`}
          label="Height mm"
          value={row.heightMm}
          onChange={v => onChange('heightMm', v)}
          min={200}
          max={3500}
          placeholder="e.g. 1200"
        />
        <NumberField
          id={`row-${index}-w`}
          label="Width mm"
          value={row.widthMm}
          onChange={v => onChange('widthMm', v)}
          min={200}
          max={3500}
          placeholder="e.g. 800"
        />
        <NumberField
          id={`row-${index}-q`}
          label="Qty"
          value={row.quantity}
          onChange={v => onChange('quantity', v)}
          min={1}
          max={50}
          placeholder="1"
        />
      </div>

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={row.secondStorey}
          onChange={e => onChange('secondStorey', e.target.checked)}
          className="w-4 h-4 accent-yellow-400"
        />
        <span className="font-sans text-xs text-on-surface/70">
          Second storey? (+${SECOND_STOREY_SURCHARGE} per window)
        </span>
      </label>

      {sqm && q >= 1 && q <= 50 && (
        <p className="mt-2 font-sans text-xs text-primary">
          ✓ {sqm} m² × {row.quantity} = {(Number(sqm) * (q || 1)).toFixed(2)} m² total
        </p>
      )}
    </div>
  )
}

// ── Field components ───────────────────────────────────────────────────────────

function NumberField({
  id, label, value, onChange, min, max, placeholder,
}: {
  id: string; label: string; value: string
  onChange: (v: string) => void; min: number; max: number; placeholder: string
}) {
  const num = Number(value)
  const invalid = value !== '' && (isNaN(num) || num < min || num > max)

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-on-surface"
      >
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        value={value}
        onChange={e => onChange(e.target.value)}
        min={min}
        max={max}
        placeholder={placeholder}
        className={[
          'bg-white border px-3 py-2.5 font-sans text-sm text-on-surface placeholder:text-on-surface/25',
          'focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2',
          invalid ? 'border-red-400' : 'border-outline-variant',
        ].join(' ')}
      />
      {invalid && (
        <span className="font-sans text-[0.58rem] text-red-500 leading-none">{min}–{max}</span>
      )}
    </div>
  )
}

function LightField({
  id, name, label, type, autoComplete, placeholder,
}: {
  id: string; name: string; label: string; type: string
  autoComplete?: string; placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
      >
        {label}
        {label !== 'Suburb (optional)' && (
          <span className="text-red-500 ml-1" aria-label="required">*</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={label !== 'Suburb (optional)'}
        className="bg-white border border-outline-variant px-4 py-3 font-sans text-base text-on-surface placeholder:text-on-surface/30 focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
      />
    </div>
  )
}

function WindowDiagram() {
  return (
    <svg
      width="110"
      height="110"
      viewBox="0 0 110 110"
      aria-label="Window measurement diagram — height and width"
      className="opacity-70"
    >
      <rect x="25" y="8" width="70" height="80" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
      <line x1="25" y1="48" x2="95" y2="48" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <line x1="60" y1="8"  x2="60" y2="88" stroke="rgba(0,0,0,0.12)" strokeWidth="1" />
      <line x1="14" y1="8"  x2="14" y2="88" stroke="#c9a800" strokeWidth="1.5" />
      <line x1="10" y1="8"  x2="18" y2="8"  stroke="#c9a800" strokeWidth="1.5" />
      <line x1="10" y1="88" x2="18" y2="88" stroke="#c9a800" strokeWidth="1.5" />
      <text x="8" y="52" textAnchor="middle" fontSize="9" fill="#c9a800" transform="rotate(-90,8,52)" fontFamily="sans-serif">H</text>
      <line x1="25" y1="100" x2="95" y2="100" stroke="#c9a800" strokeWidth="1.5" />
      <line x1="25" y1="96"  x2="25" y2="104" stroke="#c9a800" strokeWidth="1.5" />
      <line x1="95" y1="96"  x2="95" y2="104" stroke="#c9a800" strokeWidth="1.5" />
      <text x="60" y="109" textAnchor="middle" fontSize="9" fill="#c9a800" fontFamily="sans-serif">W</text>
    </svg>
  )
}
