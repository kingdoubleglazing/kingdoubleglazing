export interface Settings {
  // Business identity
  name: string; legalName: string; domain: string; abn: string; licenseNumber: string;
  // Contact
  phone: string; phoneTel: string; phoneHref: string; email: string; notificationEmail: string;
  address: { street: string; suburb: string; state: string; postcode: string; country: string; display: string }
  geo: { latitude: number; longitude: number }
  social: { facebook: string; instagram: string; google: string }
  // Branding
  logos: { light: string; dark: string; icon: string }
  // Pricing
  pricing: { retrofitFromPerSqm: number; retrofitFromDisplay: string }
  // Email copy (all templates)
  emailCopy?: {
    // Quote confirmation — sent to customer
    quoteConfirmSubject?: string
    quoteConfirmHeading?: string
    quoteConfirmIntro?: string
    quoteConfirmSummaryLabel?: string
    quoteConfirmContactNote?: string
    // Contact notification — sent to business
    contactNotifHeading?: string
    contactNotifReplyNote?: string
    // Quote notification — sent to business
    quoteNotifConfirmButton?: string
    quoteNotifConfirmNote?: string
  }
  // Footer copy
  footerTagline?: string
  footerBio?: string
  warrantyBlurb?: string
  // Payment terms (global — shared across all pages)
  paymentTerms?: { depositTitle: string; depositBody: string; completionTitle: string; completionBody: string; warrantyTitle: string; warrantyBody: string }
  // Navigation
  mainNav: Array<{ label: string; href: string }>
  ctaNav: { label: string; href: string }
  footerServicesHeading?: string
  footerServicesNav: Array<{ label: string; href: string }>
  footerCompanyHeading?: string
  footerCompanyNav: Array<{ label: string; href: string }>
}
/** @deprecated Use Settings */
export type SiteSettings = Settings
/** @deprecated Use Settings */
export type Navigation = Settings
export interface GalleryItem {
  id: string; src: string; alt: string; category: string; caption: string; order: number
}
export interface PricingOption {
  id: string; optionKey: string; label: string; sublabel: string;
  spec: string; pricePerSqm: number; heatPct: number; noisePct: number;
  tech: { composition: string[]; spacerMm: number; lowE: boolean; acousticPVB: boolean; tinted: boolean; bestFor: string; rwRating: string | null; notes: string }
}
export interface EmbeddedProcessStep {
  title: string; body: string; callout?: string; imageAlt?: string; imageSrc?: string
}
export interface ProcessStep {
  id: string; title: string; body: string; callout?: string; imageAlt?: string; imageSrc?: string; order: number
}
export interface EmbeddedFaq {
  q: string; a: string
}
export interface FaqItem {
  id: string; q: string; a: string; group: string; order: number
}
export interface HomePage {
  badge: string; headlineWhite: string; headlineYellow: string; subtext: string;
  primaryCtaLabel: string; adaptorCaption: string; estimateCtaHeadline: string;
  estimateCtaSubtext: string; estimateCtaButtonLabel: string; estimateCtaCaption: string;
  faqHeading: string; faqSubheading: string;
  whyRetrofitEyebrow?: string; whyRetrofitHeading1?: string; whyRetrofitHeading2?: string;
  whyRetrofitItems?: Array<{ iconKey: string; headline: string; sub: string }>
  processSteps?: EmbeddedProcessStep[]
  faqs?: EmbeddedFaq[]
}
export interface ServiceSection {
  id: string; eyebrow: string; heading: string; bodyText: string; bullets: string[];
  primaryCta: { label: string; href: string }; secondaryCta?: { label: string; href: string }
}
export interface ServicesPage {
  heroHeading: string; heroSubtext: string; serviceSections: ServiceSection[];
  faqHeading: string; faqSubheading: string;
  faqs?: EmbeddedFaq[]
}
export interface AboutPage {
  heroHeadline: string; heroHeadlineYellow: string; heroSubtext: string;
  stats: Array<{ value: string; label: string }>; storyEyebrow: string;
  storyParagraphs: string[]; storyQuote: string;
  guarantees: Array<{ label: string; detail: string }>
}
export interface ContactPage {
  heroHeadline: string; heroSubtext: string; formHeading: string;
  faqs?: EmbeddedFaq[]
}
export interface WarrantyPage {
  heroHeadline: string; heroHeadlineYellow: string; heroSubtext: string;
  coveredItems: Array<{ item: string; detail: string }>;
  notCoveredItems: Array<{ item: string; detail: string }>;
  claimSteps: string[]; ctaHeadline: string; ctaSubtext: string
}
export interface EstimatePage {
  heroHeadline: string; heroSubtext: string; secondStoreySurcharge: number;
  faqs?: EmbeddedFaq[]
}
