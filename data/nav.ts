export const mainNav = [
  { label: 'Home',     href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Gallery',  href: '/gallery/' },
  { label: 'About',    href: '/about/' },
  { label: 'Contact',  href: '/contact/' },
] as const

export const ctaNav = {
  label: 'Get Quote',
  href: '/instant-estimate/',
} as const

export const footerNav = {
  services: [
    { label: 'Retrofit Double Glazing', href: '/services/#retrofit' },
    { label: 'Emergency Glass Repair',  href: '/services/#emergency' },
    { label: 'Shower Screens',          href: '/services/#shower-screens' },
    { label: 'Glass Splashbacks',       href: '/services/#splashbacks' },
    { label: 'Custom Mirrors',          href: '/services/#mirrors' },
    { label: 'Commercial Glazing',      href: '/services/#commercial' },
  ],
  company: [
    { label: 'About Us',               href: '/about/' },
    { label: 'Gallery',                href: '/gallery/' },
    { label: 'Contact',                href: '/contact/' },
    { label: 'Warranty',               href: '/warranty/' },
    { label: 'Get an Instant Estimate', href: '/instant-estimate/' },
  ],
} as const
