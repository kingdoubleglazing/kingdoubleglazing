import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers",
  description:
    'Brooklyn Glass Pty Ltd t/a King Double Glazing. Melbourne glaziers with a mission: transparent pricing, no middlemen, no upsells. Meet the team.',
  path: '/about/',
})

export default function AboutPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        About King Double Glazing
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        We&apos;re Melbourne glaziers on a mission to bring transparent pricing to the double glazing industry. No middlemen, no upsells, no surprises.
      </p>
      {/* TODO: Phase 6 — content build */}
    </div>
  )
}
