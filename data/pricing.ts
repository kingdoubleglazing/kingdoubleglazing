export type OptionKey = 'A' | 'B' | 'C' | 'D'

export const SECOND_STOREY_SURCHARGE = 150 // flat per window, used as fallback default

export interface WindowRow {
  heightMm: number
  widthMm: number
  quantity: number
  secondStorey: boolean
}

export function calculateQuote(pricePerSqm: number, rows: WindowRow[], secondStoreySurcharge = SECOND_STOREY_SURCHARGE): number {
  return rows.reduce((total, row) => {
    const sqm = (row.heightMm / 1000) * (row.widthMm / 1000)
    const rowBase = sqm * pricePerSqm * row.quantity
    const surcharge = row.secondStorey ? secondStoreySurcharge * row.quantity : 0
    return total + rowBase + surcharge
  }, 0)
}
