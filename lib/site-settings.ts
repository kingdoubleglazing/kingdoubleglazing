// Sync, client-safe — only JSON imports, no fs/promises
import type { SiteSettings, Navigation, HomePage, ServicesPage, AboutPage, ContactPage, WarrantyPage, EstimatePage } from '@/lib/types'

import siteJson from '@/content/settings/site.json'
import navJson from '@/content/settings/nav.json'
import homeJson from '@/content/pages/home.json'
import servicesJson from '@/content/pages/services.json'
import aboutJson from '@/content/pages/about.json'
import contactJson from '@/content/pages/contact.json'
import warrantyJson from '@/content/pages/warranty.json'
import estimateJson from '@/content/pages/estimate.json'

export const getSiteSettings = (): SiteSettings => siteJson as SiteSettings
export const getNavigation = (): Navigation => navJson as Navigation
export const getHomePage = (): HomePage => homeJson as HomePage
export const getServicesPage = (): ServicesPage => servicesJson as ServicesPage
export const getAboutPage = (): AboutPage => aboutJson as AboutPage
export const getContactPage = (): ContactPage => contactJson as ContactPage
export const getWarrantyPage = (): WarrantyPage => warrantyJson as WarrantyPage
export const getEstimatePage = (): EstimatePage => estimateJson as EstimatePage
