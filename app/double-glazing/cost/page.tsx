import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Cost Melbourne | Transparent Pricing from $495/m²',
  description:
    'How much does double glazing cost in Melbourne? Honest price breakdown from $495/m². Use our instant estimate tool — no sales calls, no surprises.',
  path: '/double-glazing/cost/',
})

export default function DoubleGlazingCostPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Double Glazing Cost Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Transparent double glazing pricing. No hidden fees. Use our instant estimate tool to get a real number for your project from $495/m².
      </p>
      {/* TODO: Phase 6 — pricing hub content */}
    </div>
  )
}
