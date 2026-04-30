import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { getSiteSettings, getWarrantyPage } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { WarrantyPageClient } from './WarrantyPageClient'

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
  const settings = getSiteSettings()

  let tinaWarranty: Awaited<ReturnType<typeof client.queries.warrantyPage>>

  try {
    tinaWarranty = await client.queries.warrantyPage({ relativePath: 'warranty.json' })
  } catch {
    const warrantyPage = getWarrantyPage()
    tinaWarranty = { data: { warrantyPage: warrantyPage as never }, query: '', variables: { relativePath: 'warranty.json' } }
  }

  return (
    <>
      <SchemaScript schemas={warrantyPageSchemas} />
      <WarrantyPageClient
        tinaWarranty={tinaWarranty}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
        email={settings.email}
      />
    </>
  )
}
