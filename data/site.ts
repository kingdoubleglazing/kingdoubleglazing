// Routes that use the transparent/overlay navbar (absolute positioned, white text, dark logo)
export const transparentNavRoutes = ['/', '/about/']

// Single source of truth for all business contact & identity details.
export const siteConfig = {
  name: 'King Double Glazing',
  legalName: 'Brooklyn Glass Pty Ltd t/a King Double Glazing',
  domain: 'https://kingdoubleglazing.com.au',
  phone: '0406 470 595',
  phoneTel: '+61406470595', // E.164 format for JSON-LD schema
  phoneHref: 'tel:+61406470595', // ready-to-use href for <a> tags
  email: 'info@kingdoubleglazing.com.au',
  licenseNumber: '', // VIC Glazier Licence — awaiting Tas
  address: {
    street: '', // Physical street address — awaiting Tas confirmation
    suburb: 'Melbourne',
    state: 'VIC',
    postcode: '3000',
    country: 'AU',
    display: 'Melbourne, VIC 3000, Australia',
  },
  geo: {
    latitude: -37.8136,
    longitude: 144.9631,
  },
  social: {
    facebook: '',
    instagram: '',
    google: ''
  },  logos: {
    // light  = dark text/gold crown — use on light/white backgrounds (Header)
    light: '/logo-light.png',
    // dark   = all-gold crown + KING — use on dark/black backgrounds (Footer)
    dark: '/logo-dark.png',
    // icon   = crown mark only — use for favicons, small badges
    icon: '/icon-small.png',
  },} as const
