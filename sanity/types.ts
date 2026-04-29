export interface SiteSettings {
  name: string
  legalName: string
  domain: string
  phone: string
  phoneTel: string
  phoneHref: string
  email: string
  abn: string
  licenseNumber: string
  notificationEmail: string
  address: {
    street: string
    suburb: string
    state: string
    postcode: string
    country: string
    display: string
  }
  geo: { latitude: number; longitude: number }
  social: { facebook: string; instagram: string; google: string }
  logos: { light: string; dark: string; icon: string }
  pricing: { retrofitFromPerSqm: number; retrofitFromDisplay: string }
  trustBarItems?: Array<{ iconKey: string; label: string }>
  paymentTerms?: {
    depositTitle: string
    depositBody: string
    completionTitle: string
    completionBody: string
    warrantyTitle: string
    warrantyBody: string
  }
  adaptorDisclosure?: {
    heading: string
    mobileSubtitle: string
    body1: string
    body2: string
  }
  freeAdviceBlock?: {
    eyebrow: string
    headingLine1: string
    headingLine2: string
    body: string
    buttonLabel: string
  }
}

export interface Navigation {
  mainNav: Array<{ label: string; href: string }>
  ctaNav: { label: string; href: string }
  footerServicesNav: Array<{ label: string; href: string }>
  footerCompanyNav: Array<{ label: string; href: string }>
}

export interface GalleryItem {
  _id: string
  alt: string
  category: string
  caption: string
  order: number
  imageUrl: string
}

export interface PricingOption {
  _id: string
  optionKey: 'A' | 'B' | 'C' | 'D'
  label: string
  sublabel: string
  spec: string
  pricePerSqm: number
  heatPct: number
  noisePct: number
  tech: {
    composition: string[]
    spacerMm: number
    lowE: boolean
    acousticPVB: boolean
    tinted: boolean
    bestFor: string
    rwRating: string | null
    notes: string
  }
}

export interface ProcessStep {
  _id: string
  title: string
  body: string
  callout?: string
  imageAlt?: string
  imageSrc?: string
  order: number
}

export interface FaqItem {
  _id: string
  q: string
  a: string
  group: string
  order: number
}

export interface HomePage {
  badge: string
  headlineWhite: string
  headlineYellow: string
  subtext: string
  primaryCtaLabel: string
  adaptorCaption: string
  estimateCtaHeadline: string
  estimateCtaSubtext: string
  estimateCtaButtonLabel: string
  estimateCtaCaption: string
  faqHeading: string
  faqSubheading: string
  whyRetrofitEyebrow?: string
  whyRetrofitHeading1?: string
  whyRetrofitHeading2?: string
  whyRetrofitItems?: Array<{ iconKey: string; headline: string; sub: string }>
}

export interface ServiceSection {
  id: string
  eyebrow: string
  heading: string
  bodyText: string
  bullets: string[]
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
}

export interface ServicesPage {
  heroHeading: string
  heroSubtext: string
  serviceSections: ServiceSection[]
  faqHeading: string
  faqSubheading: string
}

export interface AboutPage {
  heroHeadline: string
  heroHeadlineYellow: string
  heroSubtext: string
  stats: Array<{ value: string; label: string }>
  storyEyebrow: string
  storyParagraphs: string[]
  storyQuote: string
  guarantees: Array<{ label: string; detail: string }>
}

export interface ContactPage {
  heroHeadline: string
  heroSubtext: string
  formHeading: string
}

export interface WarrantyPage {
  heroHeadline: string
  heroHeadlineYellow: string
  heroSubtext: string
  coveredItems: Array<{ item: string; detail: string }>
  notCoveredItems: Array<{ item: string; detail: string }>
  claimSteps: string[]
  ctaHeadline: string
  ctaSubtext: string
}

export interface EstimatePage {
  heroHeadline: string
  heroSubtext: string
  secondStoreySurcharge: number
}
