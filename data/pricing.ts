// PLACEHOLDER PRICES — pending Tas confirmation

export type GlassType      = 'standard' | 'lowe' | 'acoustic'
export type PropertyType   = 'house' | 'apartment' | 'townhouse'
export type Orientation    = 'north' | 'east' | 'west' | 'south' | 'mixed'
export type FrameCondition = 'good' | 'needs-work'
export type WindowBand     = '1-3' | '4-7' | '8-12' | '12+'
export type Priority       = 'noise' | 'warmth' | 'both'

export const GLASS_OPTIONS: Record<GlassType, { label: string; pricePerSqm: number; description: string }> = {
  standard: {
    label:       'Standard Double Glazing',
    pricePerSqm: 495, // PLACEHOLDER — pending Tas confirmation
    description: 'Reduces heat loss and cold draughts. Best for south and north-facing windows.',
  },
  lowe: {
    label:       'Tinted Low-E Glass',
    pricePerSqm: 595, // PLACEHOLDER — pending Tas confirmation
    description: 'Blocks up to 40% of heat gain. Best for east and west-facing windows.',
  },
  acoustic: {
    label:       'Acoustic Laminated Glass',
    pricePerSqm: 645, // PLACEHOLDER — pending Tas confirmation
    description: 'Cuts traffic and tram noise by up to 60%. Best for busy roads or rail lines.',
  },
}

export const AVG_WINDOW_SQM: Record<PropertyType, number> = {
  house:     1.2,
  apartment: 0.9,
  townhouse: 1.0,
}

export const WINDOW_BAND_MIDPOINT: Record<WindowBand, number> = {
  '1-3':  2,
  '4-7':  5,
  '8-12': 10,
  '12+':  14,
}

export const WINDOW_BAND_DISCOUNT: Record<WindowBand, number> = {
  '1-3':  0,
  '4-7':  0.05,
  '8-12': 0.10,
  '12+':  0.15,
}

export const STOREY_MULTIPLIER: Record<number, number> = {
  1: 1.00,
  2: 1.12,
  3: 1.20,
}

export const FRAME_MULTIPLIER: Record<FrameCondition, number> = {
  'good':       1.00,
  'needs-work': 1.15,
}

export const ORIENTATION_GLASS_MAP: Record<Orientation, { recommended: GlassType; reason: string }> = {
  north: {
    recommended: 'standard',
    reason: 'North-facing windows get good winter sun. Standard glass keeps the warmth in without blocking it.',
  },
  east: {
    recommended: 'lowe',
    reason: 'East-facing windows get morning sun and glare. Low-E cuts heat gain without darkening the room.',
  },
  west: {
    recommended: 'lowe',
    reason: 'West-facing windows get the hottest afternoon sun. Low-E blocks up to 40% of that heat.',
  },
  south: {
    recommended: 'standard',
    reason: 'South-facing windows get little direct sun. Standard glass is the right call — it stops cold draughts.',
  },
  mixed: {
    recommended: 'lowe',
    reason: 'Mixed exposure means some windows face the sun hard. Low-E handles all of them well.',
  },
}

export interface EstimateInputs {
  propertyType:   PropertyType
  windowBand:     WindowBand
  glassType:      GlassType
  storeys:        1 | 2 | 3
  frameCondition: FrameCondition
}

export interface EstimateResult {
  low:         number
  mid:         number
  high:        number
  windowCount: number
  pricePerSqm: number
  discount:    number
}

export function calculateEstimate(inputs: EstimateInputs): EstimateResult {
  const { propertyType, windowBand, glassType, storeys, frameCondition } = inputs

  const pricePerSqm = GLASS_OPTIONS[glassType].pricePerSqm
  const avgSqm      = AVG_WINDOW_SQM[propertyType]
  const windowCount = WINDOW_BAND_MIDPOINT[windowBand]
  const storeyMult  = STOREY_MULTIPLIER[storeys] ?? 1.0
  const frameMult   = FRAME_MULTIPLIER[frameCondition]
  const discount    = WINDOW_BAND_DISCOUNT[windowBand]

  const raw  = pricePerSqm * avgSqm * windowCount * storeyMult * frameMult * (1 - discount)
  const mid  = Math.round(raw / 100) * 100
  const low  = Math.round((mid * 0.85) / 100) * 100
  const high = Math.round((mid * 1.15) / 100) * 100

  return { low, mid, high, windowCount, pricePerSqm, discount }
}

// Partial calculation — uses sensible defaults for any missing fields.
// Requires propertyType at minimum (returns null if absent).
export function calculatePartialEstimate(
  inputs: Partial<EstimateInputs> & { propertyType: PropertyType },
): EstimateResult {
  return calculateEstimate({
    propertyType:   inputs.propertyType,
    windowBand:     inputs.windowBand     ?? '4-7',
    glassType:      inputs.glassType      ?? 'standard',
    storeys:        inputs.storeys        ?? 1,
    frameCondition: inputs.frameCondition ?? 'good',
  })
}
