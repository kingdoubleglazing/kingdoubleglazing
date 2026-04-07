import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Frameless Shower Screens Melbourne | Custom Cut & Installed',
  description:
    'Frameless shower screens custom-cut and installed in Melbourne. 10mm toughened glass, minimal hardware. Get a quote with transparent pricing.',
  path: '/shower-screens/frameless/',
})

export default function FramelessShowerScreensPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Frameless Shower Screens Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        10mm toughened frameless glass, custom cut to your bathroom. Clean, modern look with minimal hardware. Installed across Melbourne.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
