import navJson from '@/content/settings/nav.json'
export const mainNav = navJson.mainNav as Array<{ label: string; href: string }>
export const ctaNav = navJson.ctaNav
export const footerNav = { services: navJson.footerServicesNav, company: navJson.footerCompanyNav }
