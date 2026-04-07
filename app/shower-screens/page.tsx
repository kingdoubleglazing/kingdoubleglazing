import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Shower Screens Melbourne | Frameless & Semi-Frameless Installation',
  description:
    'Custom shower screens installed across Melbourne. Frameless, semi-frameless and framed. Measure, supply and fit. Get a quote today.',
  path: '/shower-screens/',
})

export default function ShowerScreensPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Shower Screens Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Custom frameless and semi-frameless shower screens, measured and installed across Melbourne. Transparent pricing, no hidden fees.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
