import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Semi Frameless Shower Screens Melbourne | Best of Both Worlds',
  description:
    'Semi-frameless shower screens in Melbourne — cleaner look than framed, more affordable than fully frameless. Custom sizes. Get a quote.',
  path: '/shower-screens/semi-frameless/',
})

export default function SemiFramelessShowerScreensPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Semi Frameless Shower Screens Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        The sweet spot between fully frameless and framed. Sleek hardware, toughened glass, installed across Melbourne.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
