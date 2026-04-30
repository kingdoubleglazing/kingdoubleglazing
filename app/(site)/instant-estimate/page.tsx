import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { getSiteSettings, getEstimatePage, getPricingOptions } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { EstimatePageClient } from './EstimatePageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Instant Double Glazing Estimate Melbourne | See Your Price First',
  description:
    'Get an instant double glazing estimate in minutes. No email required to see your number. We beat any genuine quote by 30%. 10-year warranty on every job.',
  path: '/instant-estimate/',
})

export default async function InstantEstimatePage() {
  const settings = getSiteSettings()
  const estimatePage = getEstimatePage()
  const faqs = estimatePage.faqs ?? []

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

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(item => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  }

  const pricingOptions = await getPricingOptions()

  let tinaEstimate: Awaited<ReturnType<typeof client.queries.estimatePage>>
  try {
    tinaEstimate = await client.queries.estimatePage({ relativePath: 'estimate.json' })
  } catch {
    tinaEstimate = { data: { estimatePage: estimatePage as never }, query: '', variables: { relativePath: 'estimate.json' } }
  }

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <EstimatePageClient
        tinaEstimate={tinaEstimate}
        pricingOptions={pricingOptions}
        faqs={faqs}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
