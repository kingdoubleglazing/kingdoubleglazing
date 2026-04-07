import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Blog | Tips, Guides & Advice | King Double Glazing',
  description:
    'Practical guides on retrofit double glazing, noise reduction, energy efficiency and glass for Melbourne homes. No fluff, no sales pitch.',
  path: '/blog/',
})

export default function BlogPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Double Glazing Blog
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Practical guides and honest advice on double glazing, glass types, noise and energy for Melbourne homeowners.
      </p>
      {/* TODO: Phase 12 — blog posts from content/blog/*.mdx */}
    </div>
  )
}
