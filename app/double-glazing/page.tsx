import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Retrofit Double Glazing Melbourne | Upgrade Existing Windows',
  description:
    'Retrofit double glazing for Melbourne homes — upgrade existing timber or aluminium windows without full replacement. From $495/m². Get your instant estimate.',
  path: '/double-glazing/',
})

export default function RetrofitDoubleGlazingPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Retrofit Double Glazing Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Upgrade your existing windows to double glazing without replacing the frames. The smart way to improve comfort, reduce noise and cut energy bills.
      </p>
      {/* TODO: Phase 6 — content build */}
    </div>
  )
}
