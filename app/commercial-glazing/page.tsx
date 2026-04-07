import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Commercial Glazing Melbourne | Office & Retail Glass Solutions',
  description:
    'Commercial glazing for Melbourne offices, retail and hospitality. Shopfronts, partitions, balustrades, double glazing retrofits. Get a quote.',
  path: '/commercial-glazing/',
})

export default function CommercialGlazingPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Commercial Glazing Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Glass solutions for Melbourne businesses. Shopfronts, office partitions, balustrades and commercial double glazing retrofits. Transparent pricing.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
