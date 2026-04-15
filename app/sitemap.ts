import type { MetadataRoute } from 'next'

const BASE_URL = 'https://kingdoubleglazing.com.au'
const lastModified = new Date()

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE_URL}/`,                  changeFrequency: 'weekly',  priority: 1.0, lastModified },
    { url: `${BASE_URL}/services/`,         changeFrequency: 'weekly',  priority: 0.9, lastModified },
    { url: `${BASE_URL}/instant-estimate/`, changeFrequency: 'monthly', priority: 0.9, lastModified },
    { url: `${BASE_URL}/gallery/`,          changeFrequency: 'monthly', priority: 0.7, lastModified },
    { url: `${BASE_URL}/about/`,            changeFrequency: 'monthly', priority: 0.6, lastModified },
    { url: `${BASE_URL}/contact/`,          changeFrequency: 'monthly', priority: 0.5, lastModified },
  ]
}
