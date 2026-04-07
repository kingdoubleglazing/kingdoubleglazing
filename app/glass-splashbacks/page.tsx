import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Glass Splashbacks Melbourne | Kitchen & Bathroom Supply & Install',
  description:
    'Custom glass splashbacks for kitchens and bathrooms in Melbourne. Any colour, any size. Toughened glass, supply and install. Get a quote.',
  path: '/glass-splashbacks/',
})

export default function GlassSplashbacksPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Glass Splashbacks Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Custom toughened glass splashbacks for kitchens and bathrooms. Any colour, any size. Measured, supplied and installed across Melbourne.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
