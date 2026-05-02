import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { getSiteSettings, getPricingOptions } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { PageClient } from '@/components/PageClient'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export const metadata: Metadata = buildMetadata({
  title: 'Instant Double Glazing Estimate Melbourne | See Your Price First',
  description:
    'Get an instant double glazing estimate in minutes. No email required to see your number. We beat any genuine quote by 30%. 10-year warranty on every job.',
  path: '/instant-estimate/',
})

export default async function InstantEstimatePage() {
  const settings = getSiteSettings()
  const pricingOptions = await getPricingOptions()

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'King Double Glazing Instant Estimate Tool',
    url: `${settings.domain}/instant-estimate/`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'AUD',
      description: 'Free instant double glazing estimate — no email required to see your number',
    },
    provider: {
      '@type': 'LocalBusiness',
      name: settings.name,
      url: settings.domain,
      telephone: settings.phoneTel,
    },
  }

  try {
    const tinaPage = await client.queries.page({ relativePath: 'estimate.json' })
    return (
      <>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <PageClient tinaPage={tinaPage} pricingOptions={pricingOptions} />
      </>
    )
  } catch {
    const { blocks = [] } = await import('@/content/pages/estimate.json')
    return (
      <>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
        <BlockRenderer blocks={blocks as never[]} pricingOptions={pricingOptions} />
      </>
    )
  }
}
