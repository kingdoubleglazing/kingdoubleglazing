import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { client } from '@/tina/__generated__/client'
import { PageClient } from '@/components/PageClient'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Services Melbourne | Retrofit, Emergency, Shower Screens | King',
  description:
    'King Double Glazing services Melbourne: retrofit double glazing, emergency glass repair, shower screens, splashbacks, custom mirrors, and commercial glazing. 10-year warranty on every job.',
  path: '/services/',
})

export default async function ServicesPage() {
  const schemas = [
    buildWebPageSchema({
      url: `${BASE_URL}/services/`,
      name: 'Double Glazing Services Melbourne | Retrofit, Emergency, Shower Screens | King',
      description: 'King Double Glazing services Melbourne: retrofit double glazing, emergency glass repair, shower screens, splashbacks, custom mirrors, and commercial glazing.',
      breadcrumb: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'Services', url: `${BASE_URL}/services/` },
      ],
    }),
  ]

  try {
    const tinaPage = await client.queries.page({ relativePath: 'services.json' })
    return (
      <>
        <SchemaScript schemas={schemas} />
        <PageClient tinaPage={tinaPage} />
      </>
    )
  } catch {
    const { blocks = [] } = await import('@/content/pages/services.json')
    return (
      <>
        <SchemaScript schemas={schemas} />
        <BlockRenderer blocks={blocks as never[]} />
      </>
    )
  }
}
