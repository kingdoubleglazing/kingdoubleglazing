import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Service Areas Melbourne | Suburbs We Serve',
  description:
    "King Double Glazing serves Melbourne's inner and outer eastern suburbs. Find your suburb for local double glazing, shower screens and glass services.",
  path: '/areas/',
})

// Expand as data/suburbs/*.ts files are added
const suburbs = [
  { name: 'Burwood', slug: 'burwood' },
  { name: 'Camberwell', slug: 'camberwell' },
  { name: 'Glen Waverley', slug: 'glen-waverley' },
  { name: 'Hawthorn', slug: 'hawthorn' },
  { name: 'Box Hill', slug: 'box-hill' },
]

export default function AreasPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Double Glazing Melbourne Service Areas
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl mb-10">
        We serve Melbourne&apos;s inner and outer eastern suburbs. Select your suburb below.
      </p>
      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {suburbs.map(({ name, slug }) => (
          <li key={slug}>
            <Link
              href={`/areas/${slug}/`}
              className="block p-4 bg-surface-container-low hover:bg-surface-container ghost-border font-headline font-semibold uppercase tracking-wide text-on-surface text-sm transition-colors duration-150"
            >
              {name}
            </Link>
          </li>
        ))}
      </ul>
      {/* TODO: Phase 10 — expand with all suburb data files */}
    </div>
  )
}
