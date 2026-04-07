import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'

export const metadata: Metadata = buildMetadata({
  title: 'Contact King Double Glazing | Get a Quote Melbourne',
  description:
    'Get in touch with King Double Glazing for a quote. Call, email or use our instant estimate tool. Melbourne glaziers, transparent pricing.',
  path: '/contact/',
})

export default function ContactPage() {
  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Contact King Double Glazing
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Get a quote or ask a question. We respond within one business day. Prefer an instant answer? Use our{' '}
        <a href="/instant-estimate/" className="text-primary underline">
          online estimate tool
        </a>
        .
      </p>
      {/* TODO: Phase 6 — contact form with Server Action */}
    </div>
  )
}
