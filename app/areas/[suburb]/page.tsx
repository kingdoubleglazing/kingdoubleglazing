import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { buildMetadata } from '@/lib/seo/generateMetadata'

// Expand as data/suburbs/*.ts files are added
const suburbData: Record<string, { name: string; postcode: string }> = {
  burwood: { name: 'Burwood', postcode: '3125' },
  camberwell: { name: 'Camberwell', postcode: '3124' },
  'glen-waverley': { name: 'Glen Waverley', postcode: '3150' },
  hawthorn: { name: 'Hawthorn', postcode: '3122' },
  'box-hill': { name: 'Box Hill', postcode: '3128' },
}

export async function generateStaticParams() {
  return Object.keys(suburbData).map((slug) => ({ suburb: slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ suburb: string }>
}): Promise<Metadata> {
  const { suburb } = await params
  const data = suburbData[suburb]
  if (!data) return {}
  return buildMetadata({
    title: `Double Glazing ${data.name} | Retrofit Windows ${data.postcode}`,
    description: `Retrofit double glazing in ${data.name} ${data.postcode}. Local Melbourne glazier — transparent pricing from $495/m². Get your instant estimate.`,
    path: `/areas/${suburb}/`,
  })
}

export default async function SuburbPage({
  params,
}: {
  params: Promise<{ suburb: string }>
}) {
  const { suburb } = await params
  const data = suburbData[suburb]
  if (!data) notFound()

  return (
    <div className="px-4 py-16 max-w-7xl mx-auto">
      <h1 className="text-display-lg text-on-surface mb-4">
        Double Glazing {data.name}
      </h1>
      <p className="text-lg text-on-surface/70 max-w-2xl">
        Retrofit double glazing for {data.name} ({data.postcode}) homes. Local Melbourne glazier with transparent pricing from $495/m².
      </p>
      {/* TODO: Phase 10 — suburb-specific content from data/suburbs/{slug}.ts */}
    </div>
  )
}
