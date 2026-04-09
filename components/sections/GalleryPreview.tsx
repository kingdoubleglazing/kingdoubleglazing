import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { galleryImages } from '@/data/gallery'

export function GalleryPreview() {
  // First image is featured (tall left column), next 4 fill the 2×2 right grid
  const [featured, ...rest] = galleryImages
  const grid = rest.slice(0, 4)

  return (
    <section className="bg-[#111318] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <p className="font-headline text-xs uppercase tracking-widest text-white/40 mb-3">
              Real installs. No stock photos.
            </p>
            <h2
              className="font-display uppercase leading-[0.9] text-white"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              See Our{' '}
              <span className="text-primary-container">Work.</span>
            </h2>
          </div>
          <Link
            href="/gallery/"
            className="hidden sm:inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-[0.15em] text-white border border-white/30 px-6 py-3 hover:border-white/70 hover:bg-white/5 transition-colors duration-150 shrink-0"
          >
            View full gallery
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

        {/* Grid — desktop: featured left + 2×2 right. Mobile: stacked single column */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr] md:grid-rows-2 gap-2 md:gap-3">

          {/* Featured — spans 2 rows on md+ */}
          <Link
            href={`/gallery/?category=${featured.category}`}
            aria-label={featured.caption}
            className="group relative overflow-hidden bg-white/5 md:row-span-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
          >
            <div className="relative aspect-[4/3] md:aspect-auto md:h-full">
              <Image
                src={featured.src}
                alt={featured.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-4">
                <span className="font-headline text-[0.65rem] font-semibold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  {featured.caption}
                </span>
              </div>
            </div>
          </Link>

          {/* 4 regular images — 2 per row on md+ */}
          {grid.map((img) => (
            <Link
              key={img.src}
              href={`/gallery/?category=${img.category}`}
              aria-label={img.caption}
              className="group relative overflow-hidden bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-container"
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-end p-3">
                  <span className="font-headline text-[0.65rem] font-semibold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {img.caption}
                  </span>
                </div>
              </div>
            </Link>
          ))}

        </div>

        {/* CTA row */}
        <div className="mt-6 flex justify-center sm:justify-start">
          <Link
            href="/gallery/"
            className="inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-[0.15em] text-white border border-white/30 px-6 py-3 hover:border-white/70 hover:bg-white/5 transition-colors duration-150 sm:hidden"
          >
            View full gallery
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>

      </div>
    </section>
  )
}
