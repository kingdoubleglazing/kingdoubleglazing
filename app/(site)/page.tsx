import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { getSiteSettings, getHomePage } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { HomePageClient } from './HomePageClient'

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
  const homePage = getHomePage()

  const homePageSchema = buildWebPageSchema({
    url: `${BASE_URL}/`,
    name: `Stop Overpaying for Double Glazing Melbourne | ${settings.pricing.retrofitFromDisplay} | King Double Glazing`,
    description: 'We upgrade your existing windows with a second layer of glass. Up to 70% quieter. Up to 70% less heat loss. We beat any genuine quote by 30%.',
    breadcrumb: [{ name: 'Home', url: `${BASE_URL}/` }],
  })

  let tinaHome: Awaited<ReturnType<typeof client.queries.homePage>>
  try {
    tinaHome = await client.queries.homePage({ relativePath: 'home.json' })
  } catch {
    tinaHome = { data: { homePage: homePage as never }, query: '', variables: { relativePath: 'home.json' } }
  }

  return (
    <>
      <SchemaScript schemas={[homePageSchema]} />
      <HomePageClient
        tinaHome={tinaHome}
        steps={homePage.processSteps ?? []}
        faqs={homePage.faqs ?? []}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
