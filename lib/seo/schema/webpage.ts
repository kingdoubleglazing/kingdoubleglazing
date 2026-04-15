import { siteConfig } from '@/data/site'

type WebPageParams = {
  url: string
  name: string
  description: string
  breadcrumb?: { name: string; url: string }[]
  dateModified?: string
}

export function buildWebPageSchema({ url, name, description, breadcrumb, dateModified }: WebPageParams) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': `${siteConfig.domain}/#website` },
    about: { '@id': `${siteConfig.domain}/#business` },
    ...(dateModified ? { dateModified } : {}),
    ...(breadcrumb ? {
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumb.map(({ name: n, url: u }, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: n,
          item: u,
        })),
      },
    } : {}),
  }
}
