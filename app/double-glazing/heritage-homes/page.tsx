import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Heritage Double Glazing Melbourne | Period & Character Homes',
  description:
    'Double glazing for heritage and period homes in Melbourne. Preserve the look of your timber windows while adding modern comfort. From $495/m².',
  path: '/double-glazing/heritage-homes/',
})

export default function HeritageHomesPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Heritage Double Glazing Melbourne
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Retrofit double glazing that respects the character of your period home. Preserve original timber frames while gaining modern thermal and acoustic performance.
      </p>
      {/* TODO: Phase 8 — content build */}
    </div>
  )
}
