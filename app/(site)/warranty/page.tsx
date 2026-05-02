import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { client } from '@/tina/__generated__/client'
import { PageClient } from '@/components/PageClient'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export const metadata: Metadata = buildMetadata({
  title: '10-Year Warranty on Double Glazing | King Double Glazing Melbourne',
  description:
    'Our 10-year warranty covers glass, workmanship, seals, and frame adaptors. No conditions, no fine print. See exactly what is covered and how to make a claim.',
  path: '/warranty/',
})

const warrantyPageSchemas = [
  buildWebPageSchema({
    url: `${BASE_URL}/warranty/`,
    name: '10-Year Warranty on Double Glazing | King Double Glazing Melbourne',
    description:
      'Our 10-year warranty covers glass, workmanship, seals, and frame adaptors. No conditions, no fine print.',
    breadcrumb: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Warranty', url: `${BASE_URL}/warranty/` },
    ],
  }),
]

export default async function WarrantyPage() {
  try {
    const tinaPage = await client.queries.page({ relativePath: 'warranty.json' })
    return (
      <>
        <SchemaScript schemas={warrantyPageSchemas} />
        <PageClient tinaPage={tinaPage} />
      </>
    )
  } catch {
    const { blocks = [] } = await import('@/content/pages/warranty.json')
    return (
      <>
        <SchemaScript schemas={warrantyPageSchemas} />
        <BlockRenderer blocks={blocks as never[]} />
      </>
    )
  }
}
