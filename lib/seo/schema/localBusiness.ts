export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://kingdoubleglazing.com.au/#business',
  name: 'King Double Glazing',
  alternateName: 'Brooklyn Glass Pty Ltd t/a King Double Glazing',
  description: "Melbourne's retrofit double glazing specialists. Stop. Don't Overpay. From $495/m².",
  url: 'https://kingdoubleglazing.com.au',
  // TODO: add real phone, email, address from Tas
  telephone: '+61-3-XXXX-XXXX',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Melbourne',
    addressRegion: 'VIC',
    addressCountry: 'AU',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -37.8136,
    longitude: 144.9631,
  },
  areaServed: {
    '@type': 'State',
    name: 'Victoria',
  },
  priceRange: 'From $495/m²',
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
  sameAs: [], // TODO: social links
} as const
