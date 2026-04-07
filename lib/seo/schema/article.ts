type ArticleSchemaInput = {
  headline: string
  description: string
  url: string
  datePublished: string
  dateModified: string
  image?: string
}

export function buildArticleSchema({
  headline,
  description,
  url,
  datePublished,
  dateModified,
  image,
}: ArticleSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    dateModified,
    ...(image && { image }),
    author: {
      '@type': 'Organization',
      '@id': 'https://kingdoubleglazing.com.au/#business',
      name: 'King Double Glazing',
    },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://kingdoubleglazing.com.au/#business',
      name: 'King Double Glazing',
    },
  }
}
