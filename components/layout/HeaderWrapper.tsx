import { getSiteSettings, getNavigation } from '@/lib/content'
import { Header } from './Header'

export async function HeaderWrapper() {
  const nav = getNavigation()
  const settings = getSiteSettings()

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
