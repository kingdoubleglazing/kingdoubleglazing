import type { MetadataRoute } from 'next'

const BASE_URL = 'https://kingdoubleglazing.com.au'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`,                 changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/services/`,        changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/gallery/`,         changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/instant-estimate/`,changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/about/`,           changeFrequency: 'yearly',  priority: 0.6 },
    { url: `${BASE_URL}/contact/`,         changeFrequency: 'yearly',  priority: 0.7 },
  ]
}
