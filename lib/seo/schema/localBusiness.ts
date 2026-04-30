import type { SiteSettings } from '@/lib/types'

const AREA_SERVED_SUBURBS = [
  'Melbourne', 'South Yarra', 'Richmond', 'Fitzroy', 'Carlton', 'St Kilda',
  'Prahran', 'Hawthorn', 'Toorak', 'Brighton', 'Malvern', 'Kew',
  'Camberwell', 'Box Hill', 'Doncaster', 'Glen Iris', 'Collingwood',
  'Northcote', 'Brunswick', 'Coburg', 'Williamstown', 'Footscray',
]

export function buildLocalBusinessSchema(settings: SiteSettings) {
  return {
    '@context': 'https://schema.org',
    '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
    '@id': `${settings.domain}/#business`,
    name: settings.name,
    legalName: settings.legalName,
    description: 'King Double Glazing installs retrofit double glazing across Melbourne homes and businesses. We reuse your existing frames to deliver acoustic and thermal performance at 30–50% less than full window replacement, backed by a 10-year warranty.',
    slogan: "Stop — Don't Overpay",
    url: settings.domain,
    telephone: settings.phoneTel,
    email: settings.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.address.street,
      addressLocality: settings.address.suburb,
      addressRegion: settings.address.state,
      postalCode: settings.address.postcode,
      addressCountry: settings.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: settings.geo.latitude,
      longitude: settings.geo.longitude,
    },
    areaServed: AREA_SERVED_SUBURBS.map(suburb => ({
      '@type': 'City',
      name: suburb,
      containedInPlace: { '@type': 'State', name: 'Victoria', containedInPlace: { '@type': 'Country', name: 'Australia' } },
    })),
    priceRange: '$$',
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
    knowsAbout: [
      'retrofit double glazing', 'acoustic double glazing', 'double glazing Melbourne',
      'emergency glass repair', 'shower screens', 'kitchen glass splashbacks',
      'commercial glazing', 'energy efficient windows', 'soundproofing windows',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Glazing Services',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retrofit Double Glazing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Emergency Glass Repair' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shower Screens & Splashbacks' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Commercial Glazing' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Mirrors' } },
      ],
    },
    sameAs: Object.values(settings.social).filter(Boolean),
  }
}
