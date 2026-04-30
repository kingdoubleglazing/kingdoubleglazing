'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useTina, tinaField } from 'tinacms/dist/react'
import { TrustBar } from '@/components/sections/TrustBar'
import { CtaBanner } from '@/components/sections/CtaBanner'
import type { GalleryConnectionQuery, GalleryConnectionQueryVariables } from '@/tina/__generated__/types'
import type { GalleryItem } from '@/lib/types'

type TinaGalleryResult = { data: GalleryConnectionQuery; query: string; variables: GalleryConnectionQueryVariables }

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

export function GalleryPageClient({
  tinaGallery,
}: {
  tinaGallery: TinaGalleryResult | { data: { galleryConnection: { edges: Array<{ node: TinaGalleryNode | GalleryItem }> } }; query: string; variables: object }
}) {
  const { data } = useTina(tinaGallery as TinaGalleryResult)

  // biome-ignore lint/suspicious/noExplicitAny: tinaField property type is narrower than string
  const tf = (obj: object, field: string) => {
    try { return tinaField(obj as any, field as any) || undefined } catch { return undefined }
  }

  const galleryItems: TinaGalleryNode[] = (data.galleryConnection.edges ?? [])
    // biome-ignore lint/suspicious/noExplicitAny: edge type may be null
    .map((e: any) => e?.node)
    .filter((n): n is TinaGalleryNode => n != null)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))

  const categories = [...new Set(galleryItems.map(item => item.category))].filter(Boolean) as string[]

  return (
    <>
      {/* Hero */}
      <section className="bg-inverse-surface py-16 md:py-20 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-4 -right-4 font-display uppercase leading-none text-inverse-on-surface/4"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
          aria-hidden="true"
        >
          WORK
        </span>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5">
            Our Work
          </span>
          <h1
            className="font-display uppercase leading-none text-inverse-on-surface mb-4"
            style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
          >
            Real Jobs.
            <br />
            <span className="text-primary-container">Real Melbourne Homes.</span>
          </h1>
          <p className="font-sans text-base text-inverse-on-surface max-w-xl mx-auto leading-relaxed">
            Every job shown here was done with the existing frames kept intact. No permits, no demolition, done in a day.
          </p>
        </div>
      </section>

      <TrustBar />

      {/* Gallery grid */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryItems.map((item) => (
              <figure
                key={item.id}
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
                  data-tina-field={tf(item, 'caption') || undefined}
                  className="absolute bottom-0 left-0 right-0 bg-inverse-surface/80 px-3 py-2 text-inverse-on-surface font-headline text-xs uppercase tracking-wide translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                >
                  {item.caption}
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-sans text-sm text-on-surface/80 mb-6">
              Every job above came with a 10-year warranty on glass and workmanship.
            </p>
            <Link
              href="/instant-estimate/"
              className="inline-flex items-center gap-2 bg-primary-container text-on-primary-fixed font-headline text-sm font-bold uppercase tracking-wider px-8 py-4 hover:bg-primary-container/90 transition-colors duration-150"
            >
              Generate My Quote →
            </Link>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  )
}
