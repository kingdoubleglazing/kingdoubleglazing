import type { MetadataRoute } from 'next'

const BASE_URL = 'https://kingdoubleglazing.com.au'

// Static routes with change frequency and priority
const staticRoutes: MetadataRoute.Sitemap = [
  { url: `${BASE_URL}/`, changeFrequency: 'weekly', priority: 1.0 },
  { url: `${BASE_URL}/double-glazing/`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/double-glazing/cost/`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/double-glazing/soundproof-windows/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/double-glazing/energy-efficient-windows/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/double-glazing/heritage-homes/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/double-glazing/glass-types/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/emergency-glass/`, changeFrequency: 'weekly', priority: 0.9 },
  { url: `${BASE_URL}/shower-screens/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/shower-screens/frameless/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/shower-screens/semi-frameless/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/glass-splashbacks/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/custom-mirrors/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/commercial-glazing/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/instant-estimate/`, changeFrequency: 'monthly', priority: 0.8 },
  { url: `${BASE_URL}/areas/`, changeFrequency: 'monthly', priority: 0.7 },
  { url: `${BASE_URL}/blog/`, changeFrequency: 'weekly', priority: 0.6 },
  { url: `${BASE_URL}/about/`, changeFrequency: 'yearly', priority: 0.5 },
  { url: `${BASE_URL}/contact/`, changeFrequency: 'yearly', priority: 0.6 },
]

// Suburb slugs — expand as data files are added
const suburbSlugs = [
  'burwood',
  'camberwell',
  'glen-waverley',
  'hawthorn',
  'box-hill',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const suburbRoutes: MetadataRoute.Sitemap = suburbSlugs.map((slug) => ({
    url: `${BASE_URL}/areas/${slug}/`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...suburbRoutes]
}
