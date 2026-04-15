import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Explicitly allow all AI/LLM crawlers for GEO/AEO visibility
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'OAI-SearchBot', 'ClaudeBot', 'anthropic-ai', 'PerplexityBot'],
        allow: '/',
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: '/dev/',
      },
    ],
    sitemap: 'https://kingdoubleglazing.com.au/sitemap.xml',
  }
}
