import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { buildServiceSchema } from '@/lib/seo/schema/service'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { SchemaScript } from '@/components/SchemaScript'
import { getSiteSettings, getServicesPage } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { ServicesPageClient } from './ServicesPageClient'

export async function generateMetadata(): Promise<Metadata> {
  const settings = getSiteSettings()
  return buildMetadata({
    title: 'Double Glazing Services Melbourne | Retrofit, Emergency Glass, Shower Screens | King Double Glazing',
    description:
      `Retrofit double glazing from ${settings.pricing.retrofitFromDisplay}, emergency glass repair, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne. 10-year warranty.`,
    path: '/services/',
  })
}

export default async function ServicesPage() {
  const settings = getSiteSettings()
  const servicesPage = getServicesPage()
  const faqs = servicesPage.faqs ?? []

  const servicesPageSchemas = [
    buildWebPageSchema({
      url: `${BASE_URL}/services/`,
      name: 'Double Glazing Services Melbourne | Retrofit, Emergency Glass, Shower Screens | King Double Glazing',
      description: `Retrofit double glazing from ${settings.pricing.retrofitFromDisplay}, emergency glass repair, shower screens, splashbacks, mirrors, and commercial glazing across Melbourne. 10-year warranty.`,
      breadcrumb: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'Services', url: `${BASE_URL}/services/` },
      ],
    }),
    buildServiceSchema({
      name: 'Retrofit Double Glazing Melbourne',
      description: 'We add a second layer of glass to your existing windows. Works on timber, aluminium, and steel frames. Installed in one day. Up to 70% quieter, up to 70% less heat loss. From $595/m².',
      url: `${BASE_URL}/services/#retrofit`,
      priceRange: settings.pricing.retrofitFromDisplay,
    }),
    buildServiceSchema({
      name: 'Emergency Glass Repair Melbourne',
      description: 'Same-day emergency glass repair across Melbourne. Broken windows, shopfronts, sliding doors, skylights. Temporary boarding available. Insurance reports on request.',
      url: `${BASE_URL}/services/#emergency`,
    }),
    buildFaqSchema(faqs.map(f => ({ question: f.q, answer: f.a }))),
  ]

  let tinaServices: Awaited<ReturnType<typeof client.queries.servicesPage>>
  try {
    tinaServices = await client.queries.servicesPage({ relativePath: 'services.json' })
  } catch {
    tinaServices = { data: { servicesPage: servicesPage as never }, query: '', variables: { relativePath: 'services.json' } }
  }

  return (
    <>
      <SchemaScript schemas={servicesPageSchemas} />
      <ServicesPageClient
        tinaServices={tinaServices}
        faqs={faqs}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
      />
    </>
  )
}
