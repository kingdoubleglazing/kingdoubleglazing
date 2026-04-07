import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Instant Double Glazing Estimate Melbourne | Get Your Price Now',
  description:
    'Get an instant double glazing quote online in 2 minutes. No sales calls, no obligation. Real transparent pricing from $495/m².',
  path: '/instant-estimate/',
})

export default function InstantEstimatePage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Instant Double Glazing Quote Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Get a real estimate in 2 minutes. No calls, no obligation. Just honest pricing for your double glazing project.
      </p>
      {/* TODO: Phase 9 — Instant Estimate Tool */}
    </div>
  )
}
