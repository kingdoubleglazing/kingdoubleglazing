import { BASE_URL } from '../generateMetadata'

type Breadcrumb = { name: string; href: string }

export function buildBreadcrumbSchema(items: Breadcrumb[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(({ name, href }, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: `${BASE_URL}${href}`,
    })),
  }
}
