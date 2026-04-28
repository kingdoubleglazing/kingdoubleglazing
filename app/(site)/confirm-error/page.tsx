import { sanityFetch } from '@/sanity/lib/fetch'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/types'

export default async function ConfirmErrorPage() {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] })
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">
        <h1
          className="font-display uppercase text-white leading-none mb-6"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
        >
          Something went wrong.
        </h1>
        <p className="font-sans text-base text-white leading-relaxed max-w-md mx-auto mb-8">
          This link may have already been used, or it&apos;s expired. Call us directly if you need to confirm.
        </p>
        <a
          href={settings.phoneHref}
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
        >
          Call {settings.phone}
        </a>
      </div>
    </div>
  )
}
