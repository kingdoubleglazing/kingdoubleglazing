import { siteConfig } from '@/data/site'

export function buildWebSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.domain}/#website`,
    url: siteConfig.domain,
    name: siteConfig.name,
    description: "Melbourne's retrofit double glazing specialists. Stop. Don't Overpay.",
    publisher: { '@id': `${siteConfig.domain}/#business` },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.domain}/?s={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}
