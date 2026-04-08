export const glassTypes = [
  {
    id: 'standard-clear',
    icon: 'square' as const,
    name: 'Standard Clear Double Glazing',
    shortDescription: 'Reliable thermal and acoustic baseline for most Melbourne homes.',
    uValue: 2.7,
    rwRating: 35,
    heatReduction: 50,
    priceFrom: 495,
    bestFor: 'Most homes, balanced performance',
  },
  {
    id: 'tinted-low-e',
    icon: 'sun' as const,
    name: 'Tinted Low-E',
    shortDescription: 'Maximum thermal control for west-facing or solar-heavy rooms.',
    uValue: 1.8,
    rwRating: 36,
    heatReduction: 78,
    priceFrom: 595,
    bestFor: 'Hot rooms, energy bill reduction',
  },
  {
    id: 'acoustic-laminated',
    icon: 'volume-x' as const,
    name: 'Acoustic Laminated',
    shortDescription: 'Specialist glass for traffic, planes, and neighbour noise.',
    uValue: 2.4,
    rwRating: 42,
    heatReduction: 45,
    priceFrom: 645,
    bestFor: 'Busy roads, flight paths, party walls',
  },
  {
    id: 'triple-glazed',
    icon: 'layers' as const,
    name: 'Triple Glazed',
    shortDescription: 'Premium thermal and acoustic performance for full home comfort.',
    uValue: 1.0,
    rwRating: 40,
    heatReduction: 85,
    priceFrom: 795,
    bestFor: 'Maximum energy efficiency, cold climates',
  },
] as const

export type GlassType = (typeof glassTypes)[number]
export type GlassIcon = GlassType['icon']
