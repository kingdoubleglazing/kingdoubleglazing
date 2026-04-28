import { sanityFetch } from '@/sanity/lib/fetch'
import { SITE_SETTINGS_QUERY, NAVIGATION_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings, Navigation } from '@/sanity/types'
import { FloatingNav } from './FloatingNav'

export async function FloatingNavWrapper() {
  const [settings, nav] = await Promise.all([
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] }),
    sanityFetch<Navigation>({ query: NAVIGATION_QUERY, tags: ['navigation'] }),
  ])

  return (
    <FloatingNav
      logoSrc={settings.logos.dark}
      mainNav={nav.mainNav}
      ctaNav={nav.ctaNav}
      phone={settings.phone}
      phoneHref={settings.phoneHref}
    />
  )
}
