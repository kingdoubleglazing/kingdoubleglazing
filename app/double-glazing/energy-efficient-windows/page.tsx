import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Energy Efficient Windows Melbourne | Low-E Double Glazing',
  description:
    'Cut heating and cooling costs with energy efficient double glazing in Melbourne. Low-E glass, argon gas fill. From $495/m². Get your instant estimate.',
  path: '/double-glazing/energy-efficient-windows/',
})

export default function EnergyEfficientWindowsPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Energy Efficient Windows Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Low-E glass and argon gas fill that keeps heat in winter and out in summer. Reduce your energy bills with retrofit double glazing.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
