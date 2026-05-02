import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { getGalleryItems } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { GalleryPageClient } from './GalleryPageClient'
import galleryJson from '@/content/pages/gallery.json'

export const metadata: Metadata = buildMetadata({
  title: 'Our Work | King Double Glazing Gallery | Melbourne',
  description:
    'Browse real double glazing, shopfront, shower screen, and glass repair jobs across Melbourne. Retrofit specialists — no frame replacement needed.',
  path: '/gallery/',
})

export default async function GalleryPage() {
  const [galleryResult, pageResult] = await Promise.allSettled([
    client.queries.galleryConnection(),
    client.queries.page({ relativePath: 'gallery.json' }),
  ])

  const tinaGallery = galleryResult.status === 'fulfilled'
    ? galleryResult.value
    : await getGalleryItems().then(items => ({
        data: {
          galleryConnection: {
            totalCount: items.length,
            pageInfo: { hasPreviousPage: false, hasNextPage: false, startCursor: '', endCursor: '' },
            edges: items.map(item => ({ cursor: item.id, node: item as never })),
          },
        },
        query: '',
        variables: {},
      }))

  if (pageResult.status === 'fulfilled') {
    return (
      <GalleryPageClient
        tinaGallery={tinaGallery}
        tinaPage={pageResult.value}
      />
    )
  }

  // Fallback: static gallery page content
  return (
    <GalleryPageClient
      tinaGallery={tinaGallery}
      tinaPage={{ data: { page: galleryJson }, query: '', variables: {} }}
      fallbackBlocks={(galleryJson as { blocks: unknown[] }).blocks as never[]}
    />
  )
}
