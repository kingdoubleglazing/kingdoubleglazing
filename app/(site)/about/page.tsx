import type { Metadata } from 'next'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { SchemaScript } from '@/components/SchemaScript'
import { getSiteSettings, getAboutPage, getFaqs } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { AboutPageClient } from './AboutPageClient'

export const metadata: Metadata = buildMetadata({
  title: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers | Tas Markou",
  description:
    'Built by a Melbourne glazing family with 50+ years combined experience. King Double Glazing beats any genuine quote by 30% with a 10-year warranty on every job. No call centres, no surprises.',
  path: '/about/',
})

export default async function AboutPage() {
  const settings = getSiteSettings()
  const generalFaqs = await getFaqs('general')

  const aboutPageSchemas = [
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

  let tinaAbout: Awaited<ReturnType<typeof client.queries.aboutPage>>

  try {
    tinaAbout = await client.queries.aboutPage({ relativePath: 'about.json' })
  } catch {
    const aboutPage = getAboutPage()
    tinaAbout = { data: { aboutPage: aboutPage as never }, query: '', variables: { relativePath: 'about.json' } }
  }

  return (
    <>
      <SchemaScript schemas={aboutPageSchemas} />
      <AboutPageClient
        tinaAbout={tinaAbout}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
        domain={settings.domain}
      />
    </>
  )
}
