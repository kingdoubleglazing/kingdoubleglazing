import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Glass Types | Which Glass is Right for You?',
  description:
    'Low-E, acoustic laminated, argon-filled — compare double glazing glass types for Melbourne homes. Honest guide with no upsell.',
  path: '/double-glazing/glass-types/',
})

export default function GlassTypesPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Double Glazing Glass Types
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Not all double glazing is equal. Compare Low-E, acoustic laminated, toughened and argon-filled IGUs to find the right glass for your Melbourne home.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
