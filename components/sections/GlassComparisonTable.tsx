'use client'

import { useState, useActionState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { calculateQuote, type OptionKey, type WindowRow } from '@/data/pricing'
import { submitQuote, type QuoteState } from '@/app/(site)/actions/quote'
import type { PricingOption } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

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

interface GlassComparisonTableProps {
  options: PricingOption[]
  secondStoreySurcharge: number
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  quieterLabel?: string | null
  lessHeatLabel?: string | null
  getMyPriceLabel?: string | null
  selectedLabel?: string | null
  specLinkLabel?: string | null
  pressHint?: string | null
  eastWestBold?: string | null
  eastWestBody?: string | null
  comparisonNote?: string | null
  step1Label?: string | null
  step1Heading?: string | null
  measureInstruction?: string | null
  measureNote?: string | null
  addWindowLabel?: string | null
  changeLabel?: string | null
  step2Label?: string | null
  yourQuoteLabel?: string | null
  noMeasurementsHint?: string | null
  accuracyNote?: string | null
  measurementOffNote?: string | null
  budgetPrompt?: string | null
  sendQuoteLabel?: string | null
  dialogTitle?: string | null
  dialogDescription?: string | null
  modalQuoteSummaryLabel?: string | null
  modalSubmitLabel?: string | null
  modalSendingLabel?: string | null
  modalErrorMessage?: string | null
  successEyebrow?: string | null
  successTitle?: string | null
  successBody?: string | null
  startNewQuoteLabel?: string | null
}

const LABEL_CLASS = 'block font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface mb-2'

export function GlassComparisonTable({ options, secondStoreySurcharge, eyebrow, heading, subtext, quieterLabel, lessHeatLabel, step1Heading, addWindowLabel, yourQuoteLabel, noMeasurementsHint, accuracyNote, measurementOffNote, budgetPrompt, sendQuoteLabel, dialogTitle, dialogDescription, modalQuoteSummaryLabel, modalSubmitLabel, modalSendingLabel, modalErrorMessage, successEyebrow, successTitle, successBody, startNewQuoteLabel }: GlassComparisonTableProps) {
  const optionsMap = Object.fromEntries(options.map(o => [o.optionKey, o]))
  const optionKeys = options.map(o => o.optionKey)

  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(options[0]?.optionKey ?? null)
  const [rows, setRows] = useState<RowDraft[]>([{ ...BLANK_ROW }])
  const [dialogOpen, setDialogOpen] = useState(false)
  const [quoteState, quoteAction, quotePending] = useActionState(
    submitQuote,
    { status: 'idle' } as QuoteState,
  )

  // Sync from URL on mount (shareable ?option=A links)
  /* eslint-disable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */
  useEffect(() => {
    const opt = searchParams.get('option') as OptionKey
    if (optionKeys.includes(opt)) setSelectedOption(opt)
  }, [searchParams])
  /* eslint-enable react-hooks/exhaustive-deps, react-hooks/set-state-in-effect */

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
    setSelectedOption(options[0]?.optionKey ?? null)
    setRows([{ ...BLANK_ROW }])
    router.replace('?', { scroll: false })
  }

  const validRows = rows.map(parseRow).filter(Boolean) as WindowRow[]
  const selectedOpt = selectedOption ? optionsMap[selectedOption] : null
  const rawTotal =
    selectedOpt && validRows.length > 0 ? calculateQuote(selectedOpt.pricePerSqm, validRows, secondStoreySurcharge) : null
  const total = rawTotal ? Math.round(rawTotal / 10) * 10 : null
  const totalWindows = validRows.reduce((s, r) => s + r.quantity, 0)
  const totalSqm = validRows.reduce((s, r) => s + (r.heightMm / 1000) * (r.widthMm / 1000) * r.quantity, 0)

  // ── Single-page quote form ───────────────────────────────────────────────
  return (
    <section className="bg-surface-container-low py-14 md:py-18" id="estimate-form">
      <div className="max-w-2xl mx-auto px-4">

        {/* Header */}
        <div className="mb-8">
          <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
            {eyebrow ?? 'Glass Options'}
          </p>
          <h2
            className="font-display uppercase leading-[0.95] text-on-surface"
            style={{ fontSize: 'clamp(1.6rem,5vw,3rem)' }}
          >
            {heading ?? 'Get your instant quote'}
          </h2>
          {subtext && (
            <p className="font-sans text-sm text-on-surface mt-3 leading-relaxed">{subtext}</p>
          )}
        </div>

        {/* One continuous form */}
        <div className="space-y-8">

          {/* 1 — Glass option (dropdown) */}
          <div>
            <label htmlFor="glass-option" className={LABEL_CLASS}>
              Glass option
            </label>
            <select
              id="glass-option"
              value={selectedOption ?? ''}
              onChange={e => {
                const key = e.target.value as OptionKey
                setSelectedOption(key)
                router.replace(`?option=${key}`, { scroll: false })
              }}
              className="w-full bg-white border border-outline-variant px-3 py-3 font-sans text-sm text-on-surface focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2"
            >
              {optionKeys.map(key => {
                const o = optionsMap[key]
                return (
                  <option key={key} value={key}>
                    {o.label} — {o.sublabel} — from ${o.pricePerSqm}/m²
                  </option>
                )
              })}
            </select>
            {selectedOpt && (
              <p className="mt-2 font-sans text-xs text-on-surface/70 leading-relaxed">
                {selectedOpt.noisePct}% {quieterLabel ?? 'quieter'} · {selectedOpt.heatPct}% {lessHeatLabel ?? 'less heat'}
              </p>
            )}
            {selectedOpt?.spec && (
              <p className="mt-1 font-sans text-xs text-on-surface/50">
                Glass make-up: {selectedOpt.spec}
              </p>
            )}
          </div>

          {/* 2 — Your windows */}
          <div>
            <label className={LABEL_CLASS}>{step1Heading ?? 'Your windows'}</label>

            <div className="space-y-3">
              {rows.map((row, i) => (
                <WindowRowInput
                  key={i}
                  index={i}
                  row={row}
                  onChange={(field, val) => updateRow(i, field, val)}
                  onRemove={() => removeRow(i)}
                  canRemove={rows.length > 1}
                  secondStoreySurcharge={secondStoreySurcharge}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={addRow}
              className="mt-3 w-full py-2.5 border border-dashed border-outline-variant text-on-surface/50 hover:border-primary hover:text-primary font-headline text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-150"
            >
              {addWindowLabel ?? '+ Add another window'}
            </button>
          </div>

          {/* 3 — Your quote */}
          <div className="border-t border-surface-container-high pt-6">
            <label className={LABEL_CLASS}>{yourQuoteLabel ?? 'Your quote'}</label>

            <p
              className="font-display uppercase text-primary leading-none"
              style={{ fontSize: 'clamp(2rem,7vw,3.5rem)' }}
              aria-live="polite"
              aria-label={total ? `Quote total: $${total.toLocaleString()}` : 'Enter your window measurements above'}
            >
              {total ? `$${total.toLocaleString()}` : '—'}
            </p>

            {!total && (
              <p className="font-sans text-xs text-on-surface/50 mt-2">
                {noMeasurementsHint ?? 'Updates as you enter your windows above.'}
              </p>
            )}

            {total && selectedOption && (
              <>
                <div className="mt-4 space-y-1">
                  {validRows.map((r, i) => {
                    const sqm = (r.heightMm / 1000) * (r.widthMm / 1000)
                    const opt = optionsMap[selectedOption]
                    const rowCost =
                      sqm * opt.pricePerSqm * r.quantity +
                      (r.secondStorey ? secondStoreySurcharge * r.quantity : 0)
                    return (
                      <div key={i} className="flex justify-between gap-4 font-sans text-xs text-on-surface/60">
                        <span>
                          {r.heightMm}×{r.widthMm}mm · qty {r.quantity}
                          {r.secondStorey ? ' · 2nd floor' : ''} · ${opt.pricePerSqm}/m²
                        </span>
                        <span className="shrink-0">${Math.round(rowCost).toLocaleString()}</span>
                      </div>
                    )
                  })}

                  <div className="flex justify-between gap-4 font-sans text-xs font-semibold text-on-surface border-t border-surface-container-high pt-2 mt-2">
                    <span>Total area: {totalSqm.toFixed(2)} m²</span>
                    <span className="shrink-0">
                      {optionsMap[selectedOption].label} · ${optionsMap[selectedOption].pricePerSqm}/m²
                    </span>
                  </div>
                </div>

                <div className="border-l-4 border-primary-container pl-4 mt-5">
                  <p className="font-sans text-sm font-semibold text-on-surface">
                    {accuracyNote ?? "If you've filled this out correctly, your price is accurate to within 10%."}
                  </p>
                  <p className="font-sans text-xs text-on-surface/60 leading-relaxed mt-1">
                    {measurementOffNote ?? 'If your measurements are off, the final quote may adjust slightly. We confirm everything on site before any work starts.'}
                  </p>
                </div>

                <div className="mt-5 bg-primary-container text-on-primary-fixed px-5 py-3">
                  <p className="font-sans text-sm font-medium leading-snug">
                    {budgetPrompt ?? "If this is within your budget, send your quote through — we'll call to confirm and book the install."}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setDialogOpen(true)}
                  className="mt-6 w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 active:scale-[0.98]"
                >
                  {sendQuoteLabel ?? 'Send Us Your Quote →'}
                </button>
              </>
            )}
          </div>
        </div>

      </div>

      {/* ── Quote contact Dialog ───────────────────────────────────────── */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="p-0">
          {quoteState.status === 'success' ? (
            <div className="px-6 pt-10 pb-8 text-center">
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                {successEyebrow ?? '✓ Sent.'}
              </p>
              <DialogTitle
                className="font-display uppercase text-on-surface leading-none mb-3"
                style={{ fontSize: 'clamp(1.8rem,5vw,2.8rem)' }}
              >
                {successTitle ?? "We'll be in touch soon."}
              </DialogTitle>
              <p className="font-sans text-sm text-on-surface/70 leading-relaxed mb-8 max-w-xs mx-auto">
                {successBody ?? "Once we confirm your quote you'll receive an email with your price locked in."}
              </p>
              <button
                type="button"
                onClick={() => { setDialogOpen(false); reset() }}
                className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface hover:text-primary transition-colors duration-150 underline underline-offset-4"
              >
                {startNewQuoteLabel ?? 'Start a new quote'}
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
                    {dialogTitle ?? 'Send Us Your Quote'}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    {dialogDescription ?? "We'll call to confirm and book your install."}
                  </DialogDescription>
                </DialogHeader>

                {/* Quote summary */}
                {total && selectedOption && (
                  <div className="bg-surface-container-low border border-surface-container-high px-4 py-3 mb-6">
                    <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-on-surface/60 mb-1">
                      {modalQuoteSummaryLabel ?? 'Your quote'}
                    </p>
                    <p className="font-display uppercase text-primary leading-none" style={{ fontSize: '2rem' }}>
                      ${total.toLocaleString()}
                    </p>
                    <p className="font-sans text-xs text-on-surface/60 mt-1">
                      {optionsMap[selectedOption].label} · {totalWindows} window{totalWindows !== 1 ? 's' : ''} · {totalSqm.toFixed(2)} m²
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
                    {quoteState.message ?? (modalErrorMessage ?? 'Something went wrong. Please try again.')}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={quotePending || !total}
                  className="mt-6 w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {quotePending ? (modalSendingLabel ?? 'Sending…') : (modalSubmitLabel ?? 'Send Us Your Quote →')}
                </button>
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
  index, row, onChange, onRemove, canRemove, secondStoreySurcharge,
}: {
  index: number
  row: RowDraft
  onChange: (field: keyof RowDraft, val: string | boolean) => void
  onRemove: () => void
  canRemove: boolean
  secondStoreySurcharge: number
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
          Second storey? (+${secondStoreySurcharge} per window)
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
