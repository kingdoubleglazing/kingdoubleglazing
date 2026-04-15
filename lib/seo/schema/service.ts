type ServiceSchemaInput = {
  name: string
  description: string
  url: string
  areaServed?: string
  priceRange?: string
}

export function buildServiceSchema({
  name,
  description,
  url,
  areaServed = 'Melbourne, Victoria',
  priceRange = 'From $595/m²',
}: ServiceSchemaInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://kingdoubleglazing.com.au/#business',
      name: 'King Double Glazing',
    },
    areaServed,
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: priceRange,
        priceCurrency: 'AUD',
      },
    },
  }
}
