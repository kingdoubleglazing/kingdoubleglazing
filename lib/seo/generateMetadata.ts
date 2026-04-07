import type { Metadata } from 'next'

export const BASE_URL = 'https://kingdoubleglazing.com.au'
export const SITE_NAME = 'King Double Glazing'

type MetadataInput = {
  title: string
  description: string
  path: string
  ogTitle?: string
  ogDescription?: string
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  path,
  ogTitle,
  ogDescription,
  noIndex = false,
}: MetadataInput): Metadata {
  const canonical = `${BASE_URL}${path}`
  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: ogTitle ?? title,
      description: ogDescription ?? description,
      url: canonical,
      siteName: SITE_NAME,
      locale: 'en_AU',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: ogTitle ?? title,
      description: ogDescription ?? description,
    },
  }
}
