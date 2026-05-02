import settingsJson from '@/content/settings/settings.json'

export const mainNav = settingsJson.mainNav as Array<{ label: string; href: string }>
export const ctaNav = settingsJson.ctaNav
export const footerNav = { services: settingsJson.footerServicesNav, company: settingsJson.footerCompanyNav }
