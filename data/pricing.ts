export type GlassType = 'standard' | 'lowe' | 'acoustic'
export type PropertyType = 'house' | 'apartment' | 'townhouse'
export type Orientation = 'north' | 'east' | 'west' | 'south' | 'mixed'
export type FrameCondition = 'good' | 'needs-work'

export interface QuoteInputs {
  glassType: GlassType
  windowCount: number
  propertyType: PropertyType
  storeys: 1 | 2 | 3
  frameCondition: FrameCondition
  orientation: Orientation
  priority: 'noise' | 'warmth' | 'both'
}

// PLACEHOLDER PRICES — update when Tas confirms
export const PRICING = {
  glassTypes: {
    standard: { label: 'Standard Double Glazing', pricePerSqm: 495 }, // PLACEHOLDER — update when Tas confirms
    lowe:     { label: 'Tinted Low-E Glass',       pricePerSqm: 595 }, // PLACEHOLDER — update when Tas confirms
    acoustic: { label: 'Acoustic Laminated Glass', pricePerSqm: 645 }, // PLACEHOLDER — update when Tas confirms
  },
  avgWindowSqm: {
    house:     1.2,
    apartment: 0.9,
    townhouse: 1.0,
  },
  storeyMultiplier: { 1: 1.0, 2: 1.12, 3: 1.20 } as Record<number, number>,
  frameConditionMultiplier: { 'good': 1.0, 'needs-work': 1.15 },
  volumeDiscount: { 1: 0, 4: 0.05, 8: 0.10, 12: 0.15 } as Record<number, number>,
  rangeBand: 0.15,
} as const

export function calculateEstimate(inputs: QuoteInputs): { low: number; high: number; mid: number } {
  const { glassType, windowCount, propertyType, storeys, frameCondition } = inputs

  const pricePerSqm = PRICING.glassTypes[glassType].pricePerSqm
  const avgSqm = PRICING.avgWindowSqm[propertyType]
  const storeyMult = PRICING.storeyMultiplier[storeys] ?? 1.2
  const frameMult = PRICING.frameConditionMultiplier[frameCondition]

  const discountKey = ([1, 4, 8, 12] as const)
    .filter(k => windowCount >= k)
    .at(-1) ?? 1
  const discount = PRICING.volumeDiscount[discountKey]

  const mid = Math.round(
    (pricePerSqm * avgSqm * windowCount * storeyMult * frameMult * (1 - discount)) / 100
  ) * 100

  return {
    mid,
    low:  Math.round((mid * (1 - PRICING.rangeBand)) / 100) * 100,
    high: Math.round((mid * (1 + PRICING.rangeBand)) / 100) * 100,
  }
}
