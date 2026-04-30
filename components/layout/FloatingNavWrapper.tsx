import { getSiteSettings, getNavigation } from '@/lib/content'
import { FloatingNav } from './FloatingNav'

export async function FloatingNavWrapper() {
  const settings = getSiteSettings()
  const nav = getNavigation()

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
