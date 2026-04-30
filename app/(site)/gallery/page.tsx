import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { getGalleryItems } from '@/lib/content'
import { client } from '@/tina/__generated__/client'
import { GalleryPageClient } from './GalleryPageClient'

export const metadata: Metadata = buildMetadata({
  title: 'Our Work | King Double Glazing Gallery | Melbourne',
  description:
    'Browse real double glazing, shopfront, shower screen, and glass repair jobs across Melbourne. Retrofit specialists — no frame replacement needed.',
  path: '/gallery/',
})

export default async function GalleryPage() {
  let tinaGallery: Awaited<ReturnType<typeof client.queries.galleryConnection>>

  try {
    tinaGallery = await client.queries.galleryConnection()
  } catch {
    const galleryItems = await getGalleryItems()
    tinaGallery = {
      data: {
        galleryConnection: {
          totalCount: galleryItems.length,
          pageInfo: { hasPreviousPage: false, hasNextPage: false, startCursor: '', endCursor: '' },
          edges: galleryItems.map(item => ({ cursor: item.id, node: item as never })),
        },
      },
      query: '',
      variables: {},
    }
  }

  return <GalleryPageClient tinaGallery={tinaGallery} />
}
