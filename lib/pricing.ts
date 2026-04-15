/**
 * Pricing logic for the Instant Estimate Tool.
 * Pure function — takes user inputs, returns a price range.
 * Wide bands for v1. Tas confirms real numbers before launch.
 */

export type PropertyType = 'house' | 'apartment' | 'townhouse'
export type WindowCount  = '1-3' | '4-6' | '7-10' | '10+'
export type Priority     = 'noise' | 'warmth' | 'bills' | 'all'

interface EstimateInput {
  windowCount: WindowCount
  priority: Priority
  propertyType: PropertyType
}

interface EstimateResult {
  low: number
  high: number
  label: string
}

// Base ranges per window-count bracket (AUD, inclusive of installation)
const BASE_RANGES: Record<WindowCount, { low: number; high: number }> = {
  '1-3':  { low: 1_200, high: 2_400 },
  '4-6':  { low: 2_400, high: 4_200 },
  '7-10': { low: 4_000, high: 6_500 },
  '10+':  { low: 6_000, high: 10_500 },
}

// Priority multiplier — acoustic glass costs more than standard clear
const PRIORITY_MULTIPLIER: Record<Priority, number> = {
  noise:   1.15,
  warmth:  1.05,
  bills:   1.05,
  all:     1.15,
}

// Property type adjustment
const PROPERTY_ADJUSTMENT: Record<PropertyType, number> = {
  house:      1.0,
  townhouse:  0.95,
  apartment:  0.85,
}

export function getEstimate(input: EstimateInput): EstimateResult {
  const base = BASE_RANGES[input.windowCount]
  const mult = PRIORITY_MULTIPLIER[input.priority]
  const adj  = PROPERTY_ADJUSTMENT[input.propertyType]

  const low  = Math.round((base.low  * mult * adj) / 100) * 100
  const high = Math.round((base.high * mult * adj) / 100) * 100

  return {
    low,
    high,
    label: `$${low.toLocaleString('en-AU')} – $${high.toLocaleString('en-AU')}`,
  }
}
