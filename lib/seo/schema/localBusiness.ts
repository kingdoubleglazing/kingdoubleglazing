import { siteConfig } from '@/data/site'

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteConfig.domain}/#business`,
  name: siteConfig.name,
  alternateName: siteConfig.legalName,
  description: "Melbourne's retrofit double glazing specialists. Stop. Don't Overpay. From $595/m².",
  url: siteConfig.domain,
  telephone: siteConfig.phoneTel,
  email: siteConfig.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.suburb,
    addressRegion: siteConfig.address.state,
    postalCode: siteConfig.address.postcode,
    addressCountry: siteConfig.address.country,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  areaServed: {
    '@type': 'State',
    name: 'Victoria',
  },
  priceRange: 'From $595/m²',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '07:00',
      closes: '17:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '08:00',
      closes: '14:00',
    },
  ],
  sameAs: Object.values(siteConfig.social).filter(Boolean),
} as const
