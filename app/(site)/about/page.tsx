import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { SchemaScript } from '@/components/SchemaScript'
import { getSiteSettings, getFaqs } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { PageClient } from '@/components/PageClient'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'

export const metadata: Metadata = buildMetadata({
  title: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers | Tas Markou",
  description:
    'Built by a Melbourne glazing family with 50+ years combined experience. King Double Glazing beats any genuine quote by 30% with a 10-year warranty on every job. No call centres, no surprises.',
  path: '/about/',
})

export default async function AboutPage() {
  const settings = getSiteSettings()
  const generalFaqs = await getFaqs('general')

  const schemas = [
    buildWebPageSchema({
      url: `${BASE_URL}/about/`,
      name: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers | Tas Markou",
      description: 'Built by a Melbourne glazing family with 50+ years combined experience. King Double Glazing beats any genuine quote by 30% with a 10-year warranty on every job.',
      breadcrumb: [
        { name: 'Home', url: `${BASE_URL}/` },
        { name: 'About', url: `${BASE_URL}/about/` },
      ],
    }),
    {
      '@context': 'https://schema.org',
      '@type': 'Person',
      name: 'Tas Markou',
      jobTitle: 'Founder',
      worksFor: { '@id': `${settings.domain}/#business` },
      image: `${settings.domain}/testimonial-founder/founder.webp`,
      description: 'Tas Markou learned the trade from his father, a Melbourne glazier. He built a commercial glazing business with 40+ staff at peak before founding King Double Glazing to offer honest, transparent retrofit double glazing pricing.',
    },
    buildFaqSchema(generalFaqs.map(f => ({ question: f.q, answer: f.a }))),
  ]

  try {
    const tinaPage = await client.queries.page({ relativePath: 'about.json' })
    return (
      <>
        <SchemaScript schemas={schemas} />
        <PageClient tinaPage={tinaPage} />
      </>
    )
  } catch {
    const { blocks = [] } = await import('@/content/pages/about.json')
    return (
      <>
        <SchemaScript schemas={schemas} />
        <BlockRenderer blocks={blocks as never[]} />
      </>
    )
  }
}
