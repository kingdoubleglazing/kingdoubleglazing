'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useTina, tinaField } from 'tinacms/dist/react'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import type { GalleryConnectionQuery, GalleryConnectionQueryVariables } from '@/tina/__generated__/types'
import type { GalleryItem } from '@/lib/types'

type TinaGalleryResult = { data: GalleryConnectionQuery; query: string; variables: GalleryConnectionQueryVariables }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TinaPageResult = { data: any; query: string; variables: any }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyBlock = Record<string, any>

type TinaGalleryNode = {
  __typename?: string
  id: string
  src?: string | null
  alt?: string | null
  category?: string | null
  caption?: string | null
  order?: number | null
  _sys?: object
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sf(obj: object, field: string): string | undefined {
  try { return (tinaField as (o: any, f: any) => string)(obj, field) || undefined } catch { return undefined }
}

function blockTemplate(block: AnyBlock): string {
  if (block._template) return block._template as string
  if (block.__typename) {
    return (block.__typename as string)
      .replace(/^PageBlocks/, '')
      .replace(/^[A-Z]/, (c: string) => c.toLowerCase())
  }
  return ''
}

function augmentBlock(block: AnyBlock): AnyBlock {
  if (!block) return block
  const t = blockTemplate(block)
  switch (t) {
    case 'hero':
      return { ...block, tina: { badge: sf(block, 'badge'), headlineWhite: sf(block, 'headlineWhite'), headlineYellow: sf(block, 'headlineYellow'), subtext: sf(block, 'subtext') } }
    case 'trustBar':
      return { ...block, tina: { items: ((block.items as AnyBlock[]) ?? []).map((item: AnyBlock) => item ? { iconKey: sf(item, 'iconKey'), label: sf(item, 'label') } : undefined) } }
    case 'ctaBanner':
      return { ...block, tina: { heading: sf(block, 'heading'), subtext: sf(block, 'subtext'), primaryCta: block.primaryCta ? { label: sf(block.primaryCta, 'label'), href: sf(block.primaryCta, 'href') } : undefined, secondaryCta: block.secondaryCta ? { label: sf(block.secondaryCta, 'label'), href: sf(block.secondaryCta, 'href') } : undefined, trustItems: sf(block, 'trustItems') } }
    default:
      return block
  }
}

export function GalleryPageClient({
  tinaGallery,
  tinaPage,
  fallbackBlocks = [],
}: {
  tinaGallery: TinaGalleryResult | { data: { galleryConnection: { edges: Array<{ node: TinaGalleryNode | GalleryItem }> } }; query: string; variables: object }
  tinaPage: TinaPageResult
  fallbackBlocks?: AnyBlock[]
}) {
  const { data: pageData } = useTina(tinaPage)
  const rawBlocks: AnyBlock[] = pageData?.page?.blocks ?? fallbackBlocks
  const blocks = rawBlocks.map(augmentBlock)
  const galleryBlurb: string = pageData?.page?.galleryBlurb ?? 'Every job above came with a 10-year warranty on glass and workmanship.'
  const galleryBlurbTina = sf(pageData?.page ?? {}, 'galleryBlurb')

  const topBlocks = blocks.filter(b => blockTemplate(b) !== 'ctaBanner')
  const bottomBlocks = blocks.filter(b => blockTemplate(b) === 'ctaBanner')

  const { data: galleryData } = useTina(tinaGallery as TinaGalleryResult)

  const galleryItems: TinaGalleryNode[] = (galleryData.galleryConnection.edges ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((e: any) => e?.node)
    .filter((n): n is TinaGalleryNode => n != null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const categories = [...new Set(galleryItems.map(item => item.category))].filter(Boolean) as string[]

  useEffect(() => {
    if (typeof window === 'undefined' || window === window.parent) return
    if (document.querySelector('[data-tina-field]')) {
      window.parent.postMessage({ type: 'quick-edit', value: true }, window.location.origin)
    }
  }, [blocks, galleryItems])

  return (
    <>
      <BlockRenderer blocks={topBlocks} />

      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-10">
              {categories.map((cat) => (
                <span
                  key={cat}
                  className="font-headline text-xs uppercase tracking-wide border border-current px-3 py-1 text-on-surface"
                >
                  {cat}
                </span>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <figure
                key={item.id}
                data-tina-field={sf(item, 'src')}
                className="group overflow-hidden bg-surface-variant relative aspect-[4/3]"
              >
                {item.src && (
                  <Image
                    src={item.src}
                    alt={item.alt ?? ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <figcaption
                  data-tina-field={sf(item, 'caption')}
                  className="absolute bottom-0 left-0 right-0 bg-inverse-surface/80 px-3 py-2 text-inverse-on-surface font-headline text-xs uppercase tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p
              data-tina-field={galleryBlurbTina}
              className="font-sans text-sm text-on-surface/80 mb-6"
            >
              {galleryBlurb}
            </p>
          </div>
        </div>
      </section>

      <BlockRenderer blocks={bottomBlocks} />
    </>
  )
}
