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
  email: 'hello@kingdoubleglazing.com.au',
  abn: '87 627 894 428',
  licenseNumber: '', // VIC Glazier Licence — awaiting Tas
  address: {
    street: '5 Glenarm Road',
    suburb: 'Glen Iris',
    state: 'VIC',
    postcode: '3146',
    country: 'AU',
    display: '5 Glenarm Road, Glen Iris VIC 3146, Australia',
  },
  geo: {
    latitude: -37.8577,
    longitude: 145.0594,
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
