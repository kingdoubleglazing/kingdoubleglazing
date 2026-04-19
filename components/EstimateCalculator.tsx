'use client'

import { useState, useActionState } from 'react'
import { Phone } from 'lucide-react'
import { siteConfig } from '@/data/site'
import { OPTIONS, calculateQuote, SECOND_STOREY_SURCHARGE, type OptionKey, type WindowRow } from '@/data/pricing'
import { submitQuote, type QuoteState } from '@/app/actions/quote'

// ── Types ─────────────────────────────────────────────────────────────────────

type PanelState = 'form' | 'contact'

interface RowDraft {
  heightMm: string
  widthMm: string
  quantity: string
  secondStorey: boolean
}

interface CalcState {
  option: OptionKey | null
  rows: RowDraft[]
  panelState: PanelState
}

const BLANK_ROW: RowDraft = { heightMm: '', widthMm: '', quantity: '1', secondStorey: false }

const initial: CalcState = {
  option: null,
  rows: [{ ...BLANK_ROW }],
  panelState: 'form',
}

const OPTION_KEYS = Object.keys(OPTIONS) as OptionKey[]

// ── Helpers ───────────────────────────────────────────────────────────────────

function parseRow(r: RowDraft): WindowRow | null {
  const h = Number(r.heightMm)
  const w = Number(r.widthMm)
  const q = Number(r.quantity)
  if (!h || !w || !q) return null
  if (h < 200 || h > 3500 || w < 200 || w > 3500 || q < 1 || q > 50) return null
  return { heightMm: h, widthMm: w, quantity: q, secondStorey: r.secondStorey }
}

// ── Main component ─────────────────────────────────────────────────────────────

export function EstimateCalculator() {
  const [calc, setCalc] = useState<CalcState>(initial)
  const [quoteState, quoteAction, quotePending] = useActionState(
    submitQuote,
    { status: 'idle' } as QuoteState,
  )

  function selectOption(o: OptionKey) {
    setCalc(prev => ({ ...prev, option: o }))
  }

  function updateRow(i: number, field: keyof RowDraft, value: string | boolean) {
    setCalc(prev => {
      const rows = [...prev.rows]
      rows[i] = { ...rows[i], [field]: value }
      return { ...prev, rows }
    })
  }

  function addRow() {
    setCalc(prev => ({ ...prev, rows: [...prev.rows, { ...BLANK_ROW }] }))
  }

  function removeRow(i: number) {
    if (calc.rows.length <= 1) return
    setCalc(prev => ({ ...prev, rows: prev.rows.filter((_, idx) => idx !== i) }))
  }

  function reset() { setCalc(initial) }

  const validRows = calc.rows.map(parseRow).filter(Boolean) as WindowRow[]
  const rawTotal = calc.option && validRows.length > 0
    ? calculateQuote(calc.option, validRows)
    : null
  const total = rawTotal ? Math.round(rawTotal / 10) * 10 : null
  const totalWindows = validRows.reduce((s, r) => s + r.quantity, 0)

  const completedSteps = [!!calc.option, validRows.length > 0, !!total] as const

  // ── Success ───────────────────────────────────────────────────────────────
  if (quoteState.status === 'success') {
    return (
      <div className="px-6 py-10 md:px-10 text-center max-w-2xl mx-auto">
        <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-6">
          ✓ Sent.
        </p>
        <p
          className="font-display uppercase text-inverse-on-surface leading-none mb-4"
          style={{ fontSize: 'clamp(2rem,6vw,3.5rem)' }}
        >
          Tas will call you soon.
        </p>
        <p className="font-sans text-sm text-inverse-on-surface/60 leading-relaxed mb-8 max-w-xs mx-auto">
          Once Tas confirms your quote you'll receive an email with your price locked in.
        </p>
        <button
          type="button"
          onClick={reset}
          className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/45 hover:text-inverse-on-surface transition-colors duration-150 underline underline-offset-4"
        >
          Start a new quote
        </button>
      </div>
    )
  }

  // ── Contact form ──────────────────────────────────────────────────────────
  if (calc.panelState === 'contact') {
    return (
      <div className="px-6 py-8 md:px-10 max-w-2xl mx-auto">
        <div className="mb-5">
          <p className="font-headline text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/40 mb-1">
            Your quote
          </p>
          <p
            className="font-display text-primary-container leading-none"
            style={{ fontSize: 'clamp(1.75rem,5vw,2.5rem)' }}
          >
            ${total?.toLocaleString()}
          </p>
          <p className="font-sans text-xs text-inverse-on-surface/50 mt-1">
            {calc.option ? OPTIONS[calc.option].label : ''} · {totalWindows} {totalWindows === 1 ? 'window' : 'windows'}
          </p>
        </div>

        <p className="font-sans text-sm text-inverse-on-surface/85 mb-5 max-w-md leading-relaxed">
          If this is within your budget, send your quote through — Tas will call to confirm and book the install.
        </p>

        {quoteState.status === 'error' && (
          <div role="alert" className="bg-red-900/40 px-4 py-3 mb-5">
            <p className="font-sans text-sm text-red-300">{quoteState.message}</p>
          </div>
        )}

        <form action={quoteAction} className="space-y-4">
          <DarkField id="qf-name"    name="name"    label="Name"             type="text"  autoComplete="name"  placeholder="Your full name" />
          <DarkField id="qf-email"   name="email"   label="Email"            type="email" autoComplete="email" placeholder="you@example.com" />
          <DarkField id="qf-phone"   name="phone"   label="Phone"            type="tel"   autoComplete="tel"   placeholder="04XX XXX XXX" />
          <DarkField id="qf-address" name="address" label="Suburb (optional)" type="text"  placeholder="e.g. Fitzroy" />

          <input type="hidden" name="option"       value={calc.option ?? ''} />
          <input type="hidden" name="windows"      value={JSON.stringify(validRows)} />
          <input type="hidden" name="total"        value={total ?? 0} />
          <input type="hidden" name="windowCount"  value={totalWindows} />

          <button
            type="submit"
            disabled={quotePending}
            className="w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed mt-2"
          >
            {quotePending ? 'Sending…' : 'Send Quote to Tas →'}
          </button>
          <a
            href={siteConfig.phoneHref}
            className="mt-3 w-full inline-flex items-center justify-center gap-2 border-2 border-primary-container/40 text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-container/10 transition-colors duration-150"
          >
            <Phone size={16} aria-hidden="true" />
            Or Call Tas — {siteConfig.phone}
          </a>
          <p className="text-center font-sans text-xs text-inverse-on-surface/40">
            Not ready? Close the tab. We won't chase.
          </p>
        </form>

        <button
          type="button"
          onClick={() => setCalc(prev => ({ ...prev, panelState: 'form' }))}
          className="mt-5 font-headline text-xs font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/45 hover:text-inverse-on-surface transition-colors duration-150"
        >
          ← Back
        </button>
      </div>
    )
  }

  // ── Main form ─────────────────────────────────────────────────────────────
  return (
    <div>
      {/* Progress bar */}
      <div className="px-6 pt-7 pb-4 md:px-10 max-w-2xl mx-auto" aria-hidden="true">
        <div className="flex gap-1">
          {completedSteps.map((done, i) => (
            <div
              key={i}
              className="h-1 flex-1 transition-colors duration-300"
              style={{ backgroundColor: done ? 'var(--color-primary-container,#ffd700)' : 'rgba(255,255,255,0.12)' }}
            />
          ))}
        </div>
      </div>

      {/* Step 1: Option */}
      <div className="px-6 py-6 md:px-10 max-w-2xl mx-auto">
        <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-inverse-on-surface/35 mb-2">
          Step 1 of 3
        </p>
        <p
          className="font-display uppercase text-inverse-on-surface leading-none mb-6"
          style={{ fontSize: 'clamp(1.6rem,4vw,2.25rem)' }}
        >
          Which option do you want?
        </p>
        <div className="grid grid-cols-2 gap-3">
          {OPTION_KEYS.map(key => {
            const opt = OPTIONS[key]
            return (
              <TapCard
                key={key}
                selected={calc.option === key}
                onClick={() => selectOption(key)}
              >
                <span
                  className="font-display uppercase leading-none block mb-1"
                  style={{ fontSize: 'clamp(1.5rem,4vw,2rem)' }}
                >
                  {key}
                </span>
                <span className="font-headline text-xs font-semibold uppercase tracking-wide block leading-snug">
                  {opt.sublabel}
                </span>
                <span className="font-sans text-[0.65rem] mt-1.5 block opacity-55">
                  {opt.heatPct}% less heat · {opt.noisePct}% quieter
                </span>
              </TapCard>
            )
          })}
        </div>
      </div>

      {/* Step 2: Windows */}
      {calc.option && (
        <div className="px-6 py-6 md:px-10 max-w-2xl mx-auto border-t border-white/10">
          <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-inverse-on-surface/35 mb-2">
            Step 2 of 3
          </p>
          <p
            className="font-display uppercase text-inverse-on-surface leading-none mb-4"
            style={{ fontSize: 'clamp(1.4rem,4vw,2rem)' }}
          >
            Your windows
          </p>

          <div className="mb-5 border-l-2 border-primary-container pl-3">
            <p className="font-sans text-sm text-inverse-on-surface/85 leading-relaxed">
              Write the height and width of each piece of glass.
            </p>
            <p className="font-sans text-xs text-inverse-on-surface/55 mt-1 leading-relaxed">
              Example: A fixed window that's 1000mm tall × 500mm wide = one row. If you have three the same size, put 3 in quantity.
            </p>
          </div>

          <div className="flex justify-center mb-5">
            <WindowDiagram />
          </div>

          <div className="space-y-4">
            {calc.rows.map((row, i) => (
              <WindowRowInput
                key={i}
                index={i}
                row={row}
                onChange={(field, val) => updateRow(i, field, val)}
                onRemove={() => removeRow(i)}
                canRemove={calc.rows.length > 1}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={addRow}
            className="mt-4 w-full py-3 border border-dashed border-white/20 text-inverse-on-surface/50 hover:border-primary-container hover:text-primary-container font-headline text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-150"
          >
            + Add another window
          </button>
        </div>
      )}

      {/* Step 3: Total */}
      {calc.option && (
        <div className="px-6 py-6 md:px-10 max-w-2xl mx-auto border-t border-white/10">
          <p className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.25em] text-inverse-on-surface/35 mb-2">
            Step 3 of 3
          </p>
          <p className="font-headline text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-inverse-on-surface/40 mb-2">
            Your quote
          </p>

          <p
            className="font-display uppercase text-primary-container leading-none transition-all duration-200"
            style={{ fontSize: 'clamp(2.25rem,7vw,4rem)' }}
            aria-live="polite"
            aria-label={total ? `Quote total: $${total.toLocaleString()}` : 'Enter your window measurements above'}
          >
            {total ? `$${total.toLocaleString()}` : '—'}
          </p>

          {!total && (
            <p className="font-sans text-xs text-inverse-on-surface/30 mt-2">
              Updates as you enter your windows above.
            </p>
          )}

          {total && (
            <>
              {/* Row breakdown */}
              <div className="mt-4 space-y-1">
                {validRows.map((r, i) => {
                  const sqm = (r.heightMm / 1000) * (r.widthMm / 1000)
                  const opt = OPTIONS[calc.option!]
                  const rowCost = sqm * opt.pricePerSqm * r.quantity + (r.secondStorey ? SECOND_STOREY_SURCHARGE * r.quantity : 0)
                  return (
                    <div key={i} className="flex justify-between gap-4 font-sans text-xs text-inverse-on-surface/55">
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
                <p className="font-sans text-sm font-semibold text-inverse-on-surface/90">
                  If you've filled this out correctly, your price is accurate to within 10%.
                </p>
                <p className="font-sans text-xs text-inverse-on-surface/55 leading-relaxed mt-1">
                  If your measurements are off, the final quote may adjust slightly. We confirm everything on site before any work starts.
                </p>
              </div>

              <div className="mt-5 bg-primary-container text-on-primary-fixed px-5 py-3">
                <p className="font-sans text-sm font-medium leading-snug">
                  If this is within your budget, send your quote through — Tas will call to confirm and book the install.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setCalc(prev => ({ ...prev, panelState: 'contact' }))}
                className="mt-6 w-full bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150 active:scale-[0.98]"
              >
                Send Quote to Tas →
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
      )}
    </div>
  )
}

// ── WindowRowInput ─────────────────────────────────────────────────────────────

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
  const sqm = (h && w) ? ((h / 1000) * (w / 1000)).toFixed(2) : null

  return (
    <div className="bg-white/5 border border-white/10 p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="font-headline text-xs font-semibold uppercase tracking-wide text-inverse-on-surface/50">
          Window {index + 1}
        </span>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="font-sans text-xs text-inverse-on-surface/30 hover:text-inverse-on-surface/60 transition-colors duration-150"
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
        <span className="font-sans text-xs text-inverse-on-surface/70">
          Second storey? (+${SECOND_STOREY_SURCHARGE} per window)
        </span>
      </label>

      {sqm && q >= 1 && q <= 50 && (
        <p className="mt-2 font-sans text-xs text-primary-container/70">
          ✓ {sqm} m² × {row.quantity} = {(Number(sqm) * (q || 1)).toFixed(2)} m² total
        </p>
      )}
    </div>
  )
}

// ── Shared primitives ──────────────────────────────────────────────────────────

function TapCard({ selected, onClick, children }: {
  selected: boolean; onClick: () => void; children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'flex flex-col items-center justify-center text-center min-h-[90px] px-3 py-4',
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

function NumberField({ id, label, value, onChange, min, max, placeholder }: {
  id: string; label: string; value: string
  onChange: (v: string) => void; min: number; max: number; placeholder: string
}) {
  const num = Number(value)
  const invalid = value !== '' && (isNaN(num) || num < min || num > max)

  return (
    <div className="flex flex-col gap-1">
      <label
        htmlFor={id}
        className="font-headline text-[0.6rem] font-semibold uppercase tracking-[0.12em] text-inverse-on-surface/50"
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
          'bg-white/10 border px-3 py-2.5 font-sans text-sm text-inverse-on-surface placeholder:text-inverse-on-surface/25',
          'focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2',
          invalid ? 'border-red-500/60' : 'border-white/15',
        ].join(' ')}
      />
      {invalid && (
        <span className="font-sans text-[0.58rem] text-red-400 leading-none">
          {min}–{max}
        </span>
      )}
    </div>
  )
}

function DarkField({ id, name, label, type, autoComplete, placeholder }: {
  id: string; name: string; label: string; type: string
  autoComplete?: string; placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/55"
      >
        {label}
        {label !== 'Suburb (optional)' && (
          <span className="text-red-400 ml-1" aria-label="required">*</span>
        )}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        autoComplete={autoComplete}
        placeholder={placeholder}
        required={label !== 'Suburb (optional)'}
        className="bg-white/10 border border-white/15 px-4 py-3 font-sans text-base text-inverse-on-surface placeholder:text-inverse-on-surface/30 focus-visible:outline-2 focus-visible:outline-primary-container focus-visible:outline-offset-2"
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
      {/* Window frame */}
      <rect x="25" y="8" width="70" height="80" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      {/* Cross bars */}
      <line x1="25" y1="48" x2="95" y2="48" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <line x1="60" y1="8"  x2="60" y2="88" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      {/* Height dimension */}
      <line x1="14" y1="8"  x2="14" y2="88" stroke="#ffd700" strokeWidth="1.5" />
      <line x1="10" y1="8"  x2="18" y2="8"  stroke="#ffd700" strokeWidth="1.5" />
      <line x1="10" y1="88" x2="18" y2="88" stroke="#ffd700" strokeWidth="1.5" />
      <text x="8" y="52" textAnchor="middle" fontSize="9" fill="#ffd700" transform="rotate(-90,8,52)" fontFamily="sans-serif">H</text>
      {/* Width dimension */}
      <line x1="25" y1="100" x2="95" y2="100" stroke="#ffd700" strokeWidth="1.5" />
      <line x1="25" y1="96"  x2="25" y2="104" stroke="#ffd700" strokeWidth="1.5" />
      <line x1="95" y1="96"  x2="95" y2="104" stroke="#ffd700" strokeWidth="1.5" />
      <text x="60" y="109" textAnchor="middle" fontSize="9" fill="#ffd700" fontFamily="sans-serif">W</text>
    </svg>
  )
}
