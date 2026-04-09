'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { X, ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { GALLERY_CATEGORIES, type GalleryImage } from '@/data/gallery'

interface GalleryGridProps {
  images: GalleryImage[]
}

export function GalleryGrid({ images }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const isOpen = lightboxIndex !== null
  const current = isOpen ? images[lightboxIndex] : null

  // Open / close dialog
  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (isOpen) {
      dialog.showModal()
      document.body.style.overflow = 'hidden'
    } else {
      dialog.close()
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const close = useCallback(() => setLightboxIndex(null), [])

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [images.length])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [images.length])

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prev() }
      if (e.key === 'ArrowRight') { e.preventDefault(); next() }
      if (e.key === 'Escape')     { close() }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, prev, next, close])

  // Close on backdrop click (click outside dialog content)
  function onDialogClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) close()
  }

  return (
    <>
      {/* Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" role="list">
        {images.map((img, i) => {
          const catLabel = GALLERY_CATEGORIES.find((c) => c.value === img.category)?.label ?? ''
          return (
            <li
              key={`${img.src}-${i}`}
              className="animate-stagger-child"
              style={{ '--i': i } as React.CSSProperties}
            >
              <button
                type="button"
                onClick={() => setLightboxIndex(i)}
                className="group w-full text-left bg-surface overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-zoom-in"
                aria-label={`Zoom in: ${img.caption}`}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {/* Zoom hint overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/30">
                    <span className="font-headline text-xs font-semibold uppercase tracking-widest text-white border border-white px-4 py-2">
                      View full
                    </span>
                  </div>
                </div>

                {/* Caption bar */}
                <div className="flex items-center justify-between px-4 py-3 bg-surface-container">
                  <span className="font-headline text-xs font-semibold uppercase tracking-widest text-on-surface/80 truncate">
                    {img.caption}
                  </span>
                  <span className="inline-block shrink-0 ml-3 bg-primary-container text-on-primary-fixed font-headline text-[0.65rem] font-semibold uppercase tracking-widest px-2 py-0.5">
                    {catLabel}
                  </span>
                </div>
              </button>
            </li>
          )
        })}
      </ul>

      {/* Lightbox dialog */}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: keyboard handled by window listener above */}
      <dialog
        ref={dialogRef}
        onClick={onDialogClick}
        onClose={close}
        aria-label={current?.caption ?? 'Image lightbox'}
        className="fixed inset-0 m-0 w-full h-full max-w-none max-h-none bg-transparent p-0 backdrop:bg-black/85 open:flex open:flex-col open:items-center open:justify-center"
      >
        {current && (
          <div className="relative flex flex-col items-center w-full h-full px-4 py-14 md:py-16">

            {/* Close */}
            <button
              type="button"
              onClick={close}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 z-10 flex items-center justify-center w-10 h-10 bg-white/10 text-white hover:bg-white/25 transition-colors duration-150"
            >
              <X size={20} aria-hidden="true" />
            </button>

            {/* Prev */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/10 text-white hover:bg-white/25 transition-colors duration-150"
            >
              <ChevronLeft size={24} aria-hidden="true" />
            </button>

            {/* Next */}
            <button
              type="button"
              onClick={next}
              aria-label="Next image"
              className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 bg-white/10 text-white hover:bg-white/25 transition-colors duration-150"
            >
              <ChevronRight size={24} aria-hidden="true" />
            </button>

            {/* Image */}
            <div className="relative w-full max-w-5xl flex-1 min-h-0">
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-contain"
                priority
              />
            </div>

            {/* Caption + service link */}
            <div className="mt-4 flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
              <span className="font-headline text-sm font-semibold uppercase tracking-widest text-white/80">
                {current.caption}
              </span>
              <Link
                href={current.href}
                onClick={close}
                className="inline-flex items-center gap-1.5 font-headline text-xs font-semibold uppercase tracking-widest text-primary-container hover:text-white transition-colors duration-150"
              >
                View service
                <ExternalLink size={12} aria-hidden="true" />
              </Link>
            </div>

            {/* Counter */}
            <p className="mt-3 font-headline text-xs uppercase tracking-widest text-white/35">
              {lightboxIndex! + 1} / {images.length}
            </p>

          </div>
        )}
      </dialog>
    </>
  )
}
