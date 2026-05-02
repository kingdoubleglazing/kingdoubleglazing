import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { SchemaScript } from '@/components/SchemaScript'
import { getSiteSettings } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { PageClient } from '@/components/PageClient'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export const metadata: Metadata = buildMetadata({
  title: 'Contact King Double Glazing | Double Glazing Quote Melbourne',
  description:
    "Get your double glazing estimate online in minutes. Call or send a message when you're ready to book. We beat any genuine quote by 30%. 10-year warranty.",
  path: '/contact/',
})

export default async function ContactPage() {
  const settings = getSiteSettings()

  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${BASE_URL}/contact/#webpage`,
      url: `${settings.domain}/contact/`,
      name: 'Contact King Double Glazing | Double Glazing Quote Melbourne',
      description: "Get your double glazing estimate online in minutes. Call or send a message when you're ready to book. We beat any genuine competitor quote by 30%.",
      isPartOf: { '@id': `${settings.domain}/#website` },
      about: { '@id': `${settings.domain}/#business` },
    },
  ]

  try {
    const tinaPage = await client.queries.page({ relativePath: 'contact.json' })
    return (
      <>
        <SchemaScript schemas={schemas} />
        <PageClient tinaPage={tinaPage} />
      </>
    )
  } catch {
    const { blocks = [] } = await import('@/content/pages/contact.json')
    return (
      <>
        <SchemaScript schemas={schemas} />
        <BlockRenderer blocks={blocks as never[]} />
      </>
    )
  }
}
