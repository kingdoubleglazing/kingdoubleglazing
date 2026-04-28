import { groq } from 'next-sanity'

export const SITE_SETTINGS_QUERY = groq`*[_type == "siteSettings"][0]`

export const NAVIGATION_QUERY = groq`*[_type == "navigation"][0]`

export const TESTIMONIALS_QUERY = groq`*[_type == "testimonial"] | order(_createdAt asc) {
  _id, name, suburb, source, rating, tag, text,
  "customerImage": customerImage.asset->url
}`

export const GALLERY_QUERY = groq`*[_type == "galleryItem"] | order(order asc) {
  _id, alt, category, caption, order,
  "imageUrl": image.asset->url,
  "imageDimensions": image.asset->metadata.dimensions
}`

export const PRICING_QUERY = groq`*[_type == "pricingOption"] | order(optionKey asc) {
  _id, optionKey, label, sublabel, spec,
  pricePerSqm, heatPct, noisePct, tech
}`

export const PROCESS_STEPS_QUERY = groq`*[_type == "processStep"] | order(order asc) {
  _id, title, body, callout, imageAlt, order,
  "imageSrc": image.asset->url
}`

export const FAQS_QUERY = groq`*[_type == "faqItem" && group == $group] | order(order asc) {
  _id, q, a, group, order
}`

export const ALL_FAQS_QUERY = groq`*[_type == "faqItem"] | order(group asc, order asc) {
  _id, q, a, group, order
}`

export const HOME_PAGE_QUERY = groq`*[_type == "homePage"][0]`

export const SERVICES_PAGE_QUERY = groq`*[_type == "servicesPage"][0]`

export const ABOUT_PAGE_QUERY = groq`*[_type == "aboutPage"][0]`

export const CONTACT_PAGE_QUERY = groq`*[_type == "contactPage"][0]`

export const WARRANTY_PAGE_QUERY = groq`*[_type == "warrantyPage"][0]`

export const ESTIMATE_PAGE_QUERY = groq`*[_type == "estimatePage"][0]`
