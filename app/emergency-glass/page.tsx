import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Emergency Glass Repair Melbourne | 24/7 Glazier | Same Day',
  description:
    'Broken window in Melbourne? Our 24/7 emergency glaziers come to you — fast. Board-up, same-day repair and replacement. Call now.',
  path: '/emergency-glass/',
})

export default function EmergencyGlassPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Emergency Glass Repair Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        24/7 emergency glazier service. Broken window, smashed glass or storm damage — we board up and repair fast across Melbourne.
      </p>
      {/* TODO: Phase 6 — content build */}
    </div>
  )
}
