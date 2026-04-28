import { sanityFetch } from '@/sanity/lib/fetch'
import { NAVIGATION_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { Navigation, SiteSettings } from '@/sanity/types'
import { Header } from './Header'

export async function HeaderWrapper() {
  const [nav, settings] = await Promise.all([
    sanityFetch<Navigation>({ query: NAVIGATION_QUERY, tags: ['navigation'] }),
    sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] }),
  ])

  return (
    <Header
      mainNav={nav.mainNav}
      ctaNav={nav.ctaNav}
      phone={settings.phone}
      phoneHref={settings.phoneHref}
      logoLight={settings.logos.light}
      logoDark={settings.logos.dark}
    />
  )
}
