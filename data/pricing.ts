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
    tech: {
      composition: ['4mm clear glass', '12mm air spacer', '4mm clear glass'],
      spacerMm: 12,
      lowE: false,
      acousticPVB: false,
      tinted: false,
      bestFor: 'Warmth only — minimal noise reduction',
      rwRating: null as string | null,
      notes: 'Standard clear insulated unit. Reduces heat loss by up to 55% compared to single glazing.',
    },
  },
  B: {
    label: 'Option B',
    sublabel: 'Noise + warmth',
    spec: '4mm clear + 12mm spacer + 6mm laminated',
    pricePerSqm: 645,
    heatPct: 50,
    noisePct: 35,
    tech: {
      composition: ['4mm clear glass', '12mm air spacer', '6mm laminated glass'],
      spacerMm: 12,
      lowE: false,
      acousticPVB: false,
      tinted: false,
      bestFor: 'Moderate noise reduction + good warmth',
      rwRating: null as string | null,
      notes: 'Laminated inner pane adds mass, improving noise reduction over standard clear double glazing.',
    },
  },
  C: {
    label: 'Option C',
    sublabel: 'Serious noise + warmth',
    spec: '4mm clear + 10mm spacer + 6mm acoustic PVB',
    pricePerSqm: 695,
    heatPct: 55,
    noisePct: 65,
    tech: {
      composition: ['4mm clear glass', '10mm air spacer', '6mm laminated with acoustic PVB interlayer'],
      spacerMm: 10,
      lowE: false,
      acousticPVB: true,
      tinted: false,
      bestFor: 'Serious noise reduction — traffic, tram, aircraft',
      rwRating: 'Rw ~35–37 dB' as string | null,
      notes: 'Acoustic PVB interlayer significantly damps sound vibration. Up to 65% quieter than single glazing.',
    },
  },
  D: {
    label: 'Option D',
    sublabel: 'Top tier — heat, sun, noise',
    spec: '4mm tinted Low-E + 10mm spacer + 6mm acoustic PVB',
    pricePerSqm: 795,
    heatPct: 70,
    noisePct: 65,
    tech: {
      composition: ['4mm tinted Low-E glass', '10mm air spacer', '6mm laminated with acoustic PVB interlayer'],
      spacerMm: 10,
      lowE: true,
      acousticPVB: true,
      tinted: true,
      bestFor: 'Maximum performance — heat, sun glare, and noise',
      rwRating: 'Rw ~37 dB' as string | null,
      notes: 'Low-E coating reflects radiant heat. Tint reduces solar heat gain and glare. Best choice for east/west-facing rooms.',
    },
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
