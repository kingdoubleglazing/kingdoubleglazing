import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { getSiteSettings } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { PageClient } from '@/components/PageClient'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings()
  return buildMetadata({
    title: `Stop Overpaying for Double Glazing Melbourne | ${settings.pricing.retrofitFromDisplay} | King Double Glazing`,
    description:
      'We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 70% less heat loss. We beat any genuine quote by 30%.',
    path: '/',
  })
}

export default async function HomePage() {
  const settings = getSiteSettings()

  const homePageSchema = buildWebPageSchema({
    url: `${BASE_URL}/`,
    name: `Stop Overpaying for Double Glazing Melbourne | ${settings.pricing.retrofitFromDisplay} | King Double Glazing`,
    description: 'We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 70% less heat loss. We beat any genuine quote by 30%.',
    breadcrumb: [{ name: 'Home', url: `${BASE_URL}/` }],
  })

  try {
    const tinaPage = await client.queries.page({ relativePath: 'home.json' })
    return (
      <>
        <SchemaScript schemas={[homePageSchema]} />
        <PageClient tinaPage={tinaPage} />
      </>
    )
  } catch {
    // Fallback when TinaCMS is unavailable (static build without CMS)
    const homeJson = await import('@/content/pages/home.json')
    const blocks = (homeJson as { blocks: unknown[] }).blocks ?? []
    return (
      <>
        <SchemaScript schemas={[homePageSchema]} />
        <BlockRenderer blocks={blocks as never[]} />
      </>
    )
  }
}
