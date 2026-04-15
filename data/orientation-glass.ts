import type { GlassType, Orientation } from './pricing'

export const ORIENTATION_GLASS_MAP: Record<Orientation, { recommended: GlassType; reason: string }> = {
  north: { recommended: 'standard', reason: 'Good winter sun. Standard glass keeps the heat in without blocking it.' },
  east:  { recommended: 'lowe',     reason: 'Morning glare. Low-E cuts heat without losing natural light.' },
  west:  { recommended: 'lowe',     reason: 'Hot afternoons. Low-E blocks up to 40% of heat gain.' },
  south: { recommended: 'standard', reason: 'Minimal sun. Standard glass eliminates cold draughts.' },
  mixed: { recommended: 'lowe',     reason: 'Mixed exposure. Low-E handles all orientations well.' },
}
