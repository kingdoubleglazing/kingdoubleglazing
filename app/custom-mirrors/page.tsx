import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Mirrors Melbourne | Cut to Size, Supply & Install',
  description:
    'Custom-cut mirrors for bathrooms, gyms and feature walls in Melbourne. Any shape, any size, bevelled edges available. Get a quote.',
  path: '/custom-mirrors/',
})

export default function CustomMirrorsPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Custom Mirrors Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Custom-cut mirrors for any room. Bathroom vanity, gym wall, feature mirror — any shape, any size, with bevelling available. Supplied and installed.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
