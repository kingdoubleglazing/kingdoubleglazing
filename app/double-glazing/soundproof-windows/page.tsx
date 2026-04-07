import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Soundproof Windows Melbourne | Acoustic Double Glazing',
  description:
    'Reduce traffic and neighbourhood noise with acoustic double glazing in Melbourne. Laminated glass, high Rw ratings. Get a quote from $495/m².',
  path: '/double-glazing/soundproof-windows/',
})

export default function SoundproofWindowsPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Soundproof Windows Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Acoustic double glazing that cuts traffic noise, barking dogs and neighbours. Laminated glass with high Rw ratings for Melbourne homes.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
