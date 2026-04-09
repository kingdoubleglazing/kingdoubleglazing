import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { HeroSection } from '@/components/sections/HeroSection'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { GalleryGrid } from '@/components/gallery/GalleryGrid'
import { siteConfig } from '@/data/site'
import {
  galleryImages,
  GALLERY_CATEGORIES,
  type GalleryCategory,
} from '@/data/gallery'

export const metadata: Metadata = buildMetadata({
  title: 'Our Work | Glass Installation Gallery Melbourne | King Double Glazing',
  description:
    'See real installs by King Double Glazing — retrofit double glazing, frameless shower screens, commercial shop fronts and glass repairs across Melbourne.',
  path: '/gallery/',
})

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const imageGallerySchema = {
  '@context': 'https://schema.org',
  '@type': 'ImageGallery',
  name: 'Our Work — King Double Glazing',
  url: `${BASE_URL}/gallery/`,
  description:
    'Real glass installation projects by King Double Glazing across Melbourne — retrofit double glazing, shower screens, commercial glazing and emergency repairs.',
  author: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#business`,
    name: siteConfig.name,
  },
  image: galleryImages.map((img) => ({
    '@type': 'ImageObject',
    contentUrl: `${BASE_URL}${img.src}`,
    description: img.alt,
    name: img.caption,
  })),
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Gallery', href: '/gallery/' },
])

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category = 'all' } = await searchParams
  const activeCategory = category as GalleryCategory | 'all'

  const filtered =
    activeCategory === 'all'
      ? galleryImages
      : galleryImages.filter((img) => img.category === activeCategory)

  const activeCategoryLabel =
    GALLERY_CATEGORIES.find((c) => c.value === activeCategory)?.label ?? 'All Work'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageGallerySchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <HeroSection
        badge="Real Installs. No Stock Photos."
        headlineWhite="Our"
        headlineYellow="Work."
        subtext="Melbourne double glazing, shower screens, commercial glazing and glass repairs — all by licensed glaziers."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
        compact
      />

      {/* ── Category filter + grid ── */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">

          {/* Filter nav */}
          <nav aria-label="Filter gallery by category" className="mb-10">
            <ul className="flex flex-wrap gap-2" role="list">
              {GALLERY_CATEGORIES.map(({ value, label }) => {
                const isActive = value === activeCategory
                return (
                  <li key={value}>
                    <Link
                      href={value === 'all' ? '/gallery/' : `/gallery/?category=${value}`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`inline-flex items-center font-headline text-xs font-semibold uppercase tracking-[0.15em] px-5 py-3 transition-colors duration-150 ${
                        isActive
                          ? 'bg-inverse-surface text-inverse-on-surface'
                          : 'bg-surface-container text-on-surface hover:bg-surface-container-highest'
                      }`}
                    >
                      {label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Image count */}
          <p className="font-headline text-xs uppercase tracking-widest text-on-surface/40 mb-8">
            {filtered.length} {filtered.length === 1 ? 'project' : 'projects'}
            {activeCategory !== 'all' && ` — ${activeCategoryLabel}`}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <GalleryGrid images={filtered} />
          ) : (
            <p className="font-sans text-on-surface/50">No projects in this category yet.</p>
          )}
        </div>
      </section>

      {/* ── Internal links to service pages ── */}
      <section className="bg-surface py-16 md:py-20 border-t border-outline-variant">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-headline text-xs uppercase tracking-widest text-on-surface/40 mb-6">
            Explore our services
          </p>
          <ul className="flex flex-wrap gap-3" role="list">
            {[
              { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
              { label: 'Shower Screens',           href: '/shower-screens/' },
              { label: 'Frameless Shower Screens', href: '/shower-screens/frameless/' },
              { label: 'Glass Splashbacks',        href: '/glass-splashbacks/' },
              { label: 'Custom Mirrors',           href: '/custom-mirrors/' },
              { label: 'Commercial Glazing',       href: '/commercial-glazing/' },
              { label: 'Emergency Glass',          href: '/emergency-glass/' },
              { label: 'Pricing & Costs',          href: '/double-glazing/cost/' },
            ].map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-[0.12em] bg-surface-container text-on-surface px-4 py-2 hover:bg-surface-container-highest transition-colors duration-150"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner
        heading={"See The Price\nNot Just The Work."}
        subtext="Get a transparent, itemised estimate in 60 seconds. No sales calls, no site visit required."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
      />
    </>
  )
}
