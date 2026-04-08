export const mainNav = [
  { label: 'Home', href: '/' },
  { label: 'Emergency Glass', href: '/emergency-glass/' },
  { label: 'Areas', href: '/areas/' },
  { label: 'About Us', href: '/about/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Contact', href: '/contact/' },
] as const

export type ServiceItem = {
  label: string
  href: string
  description: string
}

export type ServiceGroup = {
  heading: string
  items: ServiceItem[]
}

export const servicesNav: ServiceGroup[] = [
  {
    heading: 'Double Glazing',
    items: [
      {
        label: 'Retrofit Double Glazing',
        href: '/double-glazing/',
        description: 'Secondary glazing for existing windows',
      },
      {
        label: 'Soundproof Windows',
        href: '/double-glazing/soundproof-windows/',
        description: 'Reduce outside noise by up to 75%',
      },
      {
        label: 'Energy Efficient Windows',
        href: '/double-glazing/energy-efficient-windows/',
        description: 'Cut heating & cooling costs',
      },
      {
        label: 'Heritage Homes',
        href: '/double-glazing/heritage-homes/',
        description: 'Double glazing for period properties',
      },
      {
        label: 'Glass Types',
        href: '/double-glazing/glass-types/',
        description: 'Laminated, tinted, low-e and more',
      },
      {
        label: 'Cost & Pricing',
        href: '/double-glazing/cost/',
        description: 'Transparent pricing from $495/m²',
      },
    ],
  },
  {
    heading: 'Other Services',
    items: [
      {
        label: 'Shower Screens',
        href: '/shower-screens/',
        description: 'Frameless & semi-frameless screens',
      },
      {
        label: 'Glass Splashbacks',
        href: '/glass-splashbacks/',
        description: 'Custom kitchen & bathroom splashbacks',
      },
      {
        label: 'Custom Mirrors',
        href: '/custom-mirrors/',
        description: 'Bespoke mirrors cut to size',
      },
      {
        label: 'Commercial Glazing',
        href: '/commercial-glazing/',
        description: 'Offices, retail & strata',
      },
    ],
  },
]

export const doubleGlazingNav = [
  { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
  { label: 'Cost & Pricing', href: '/double-glazing/cost/' },
  { label: 'Soundproof Windows', href: '/double-glazing/soundproof-windows/' },
  { label: 'Energy Efficient', href: '/double-glazing/energy-efficient-windows/' },
  { label: 'Heritage Homes', href: '/double-glazing/heritage-homes/' },
  { label: 'Glass Types', href: '/double-glazing/glass-types/' },
] as const

export const showerScreensNav = [
  { label: 'Shower Screens', href: '/shower-screens/' },
  { label: 'Frameless', href: '/shower-screens/frameless/' },
  { label: 'Semi-Frameless', href: '/shower-screens/semi-frameless/' },
] as const

export const footerNav = {
  services: [
    { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
    { label: 'Cost & Pricing', href: '/double-glazing/cost/' },
    { label: 'Soundproof Windows', href: '/double-glazing/soundproof-windows/' },
    { label: 'Energy Efficient Windows', href: '/double-glazing/energy-efficient-windows/' },
    { label: 'Emergency Glass Repair', href: '/emergency-glass/' },
    { label: 'Shower Screens', href: '/shower-screens/' },
    { label: 'Glass Splashbacks', href: '/glass-splashbacks/' },
    { label: 'Custom Mirrors', href: '/custom-mirrors/' },
    { label: 'Commercial Glazing', href: '/commercial-glazing/' },
  ],
  company: [
    { label: 'About Us', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Get an Instant Estimate', href: '/instant-estimate/' },
  ],
  areas: [
    { label: 'Burwood', href: '/areas/burwood/' },
    { label: 'Camberwell', href: '/areas/camberwell/' },
    { label: 'Glen Waverley', href: '/areas/glen-waverley/' },
    { label: 'Hawthorn', href: '/areas/hawthorn/' },
    { label: 'Box Hill', href: '/areas/box-hill/' },
    { label: 'All Areas', href: '/areas/' },
  ],
} as const
