import type { SiteSettings } from '@/sanity/types'

export function buildWebSiteSchema(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${settings.domain}/#website`,
    url: settings.domain,
    name: settings.name,
    description: "Melbourne's retrofit double glazing specialists. Stop. Don't Overpay.",
    publisher: { '@id': `${settings.domain}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${settings.domain}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
