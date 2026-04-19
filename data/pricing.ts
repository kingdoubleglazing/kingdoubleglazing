// TODO: All pricePerSqm values are PLACEHOLDERS pending Tas's final confirmation.
// Calculator must not go live until Tas signs off on exact per-sqm rates per option.

export const OPTIONS = {
  A: {
    label: 'Option A',
    sublabel: 'Basic warmth',
    spec: '4mm clear + 12mm spacer + 4mm clear',
    pricePerSqm: 595,
    heatPct: 55,
    noisePct: 5,
  },
  B: {
    label: 'Option B',
    sublabel: 'Noise + warmth',
    spec: '4mm clear + 12mm spacer + 6mm laminated',
    pricePerSqm: 645,
    heatPct: 50,
    noisePct: 35,
  },
  C: {
    label: 'Option C',
    sublabel: 'Serious noise + warmth',
    spec: '4mm clear + 10mm spacer + 6mm acoustic PVB',
    pricePerSqm: 695,
    heatPct: 55,
    noisePct: 65,
  },
  D: {
    label: 'Option D',
    sublabel: 'Top tier — heat, sun, noise',
    spec: '4mm tinted Low-E + 10mm spacer + 6mm acoustic PVB',
    pricePerSqm: 795,
    heatPct: 70,
    noisePct: 65,
  },
} as const

export const SECOND_STOREY_SURCHARGE = 150 // flat per window

export type OptionKey = keyof typeof OPTIONS

export interface WindowRow {
  heightMm: number
  widthMm: number
  quantity: number
  secondStorey: boolean
}

export function calculateQuote(option: OptionKey, rows: WindowRow[]): number {
  const { pricePerSqm } = OPTIONS[option]
  return rows.reduce((total, row) => {
    const sqm = (row.heightMm / 1000) * (row.widthMm / 1000)
    const rowBase = sqm * pricePerSqm * row.quantity
    const surcharge = row.secondStorey ? SECOND_STOREY_SURCHARGE * row.quantity : 0
    return total + rowBase + surcharge
  }, 0)
}
