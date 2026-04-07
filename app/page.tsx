import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: "Retrofit Double Glazing Melbourne | From $495/m² | King Double Glazing",
  description:
    "Stop. Don't Overpay. Melbourne's retrofit double glazing specialists upgrade your existing windows from $495/m². Get your instant estimate online — no sales calls.",
  path: '/',
})

export default function HomePage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Double Glazing Melbourne — Stop. Don&apos;t Overpay.
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Retrofit double glazing for existing Melbourne windows. Transparent pricing from $495/m². No pushy sales. No surprises.
      </p>
      {/* TODO: Phase 6 — Home page content build */}
    </div>
  )
}
