import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { BlogHero } from '@/components/blog/BlogHero'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { blogPosts, BLOG_CATEGORIES, type BlogCategory } from '@/data/blog-posts'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: 'Double Glazing Blog | Honest Guides for Melbourne Homeowners | King Double Glazing',
  description:
    'Practical guides on retrofit double glazing, noise reduction, energy efficiency and glass costs for Melbourne homes. No fluff, no sales pitch.',
  path: '/blog/',
})

// ── JSON-LD ───────────────────────────────────────────────────────────────────

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'King Double Glazing Blog',
  url: `${BASE_URL}/blog/`,
  description:
    'Practical guides on retrofit double glazing, noise reduction, energy efficiency and glass for Melbourne homes.',
  publisher: {
    '@type': 'Organization',
    '@id': `${BASE_URL}/#business`,
    name: siteConfig.name,
  },
  blogPost: blogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${BASE_URL}/blog/${post.slug}/`,
    datePublished: post.datePublished,
    description: post.excerpt,
  })),
}

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: 'Home', href: '/' },
  { name: 'Blog', href: '/blog/' },
])

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category = 'all' } = await searchParams
  const activeCategory = category as BlogCategory | 'all'

  const filtered =
    activeCategory === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory)

  const activeCategoryLabel =
    BLOG_CATEGORIES.find((c) => c.value === activeCategory)?.label ?? 'All Posts'

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogHero
        badge="Honest Advice"
        title="Double Glazing Guides"
        excerpt="Practical, no-fluff articles for Melbourne homeowners. Real costs, real specs, and what actually works."
        asH1
      />

      {/* ── Category filter + post grid ── */}
      <section className="bg-surface-container-low py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">

          {/* Category filter nav */}
          <nav aria-label="Filter posts by category" className="mb-10">
            <ul className="flex flex-wrap gap-2" role="list">
              {BLOG_CATEGORIES.map(({ value, label }) => {
                const isActive = value === activeCategory
                return (
                  <li key={value}>
                    <Link
                      href={value === 'all' ? '/blog/' : `/blog/?category=${value}`}
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

          {/* Post count */}
          <p className="font-headline text-xs uppercase tracking-widest text-on-surface/40 mb-8">
            {filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
            {activeCategory !== 'all' && ` — ${activeCategoryLabel}`}
          </p>

          {/* Post grid */}
          {filtered.length > 0 ? (
            <ul
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              role="list"
            >
              {filtered.map((post, i) => (
                <li
                  key={post.slug}
                  className="animate-stagger-child"
                  style={{ '--i': i } as React.CSSProperties}
                >
                  <article className="bg-surface flex flex-col h-full">
                    {/* Card header — category + read time */}
                    <div className="bg-surface-container-high px-6 py-4 flex items-center justify-between">
                      <span className="inline-block bg-primary-container text-on-primary-fixed font-headline text-[0.7rem] font-semibold uppercase tracking-widest px-2 py-0.5">
                        {BLOG_CATEGORIES.find((c) => c.value === post.category)?.label}
                      </span>
                      <span className="font-headline text-xs uppercase tracking-widest text-on-surface/40">
                        {post.readTime} min read
                      </span>
                    </div>

                    {/* Card body */}
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      <time
                        dateTime={post.datePublished}
                        className="font-headline text-xs uppercase tracking-widest text-on-surface/40"
                      >
                        {formatDate(post.datePublished)}
                      </time>
                      <h2 className="font-headline font-bold text-[1.125rem] leading-snug text-on-surface">
                        {post.title}
                      </h2>
                      <p className="font-sans text-sm text-on-surface/65 leading-relaxed flex-1">
                        {post.excerpt}
                      </p>
                      <Link
                        href={`/blog/${post.slug}/`}
                        className="inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-[0.15em] text-primary mt-4 hover:text-primary-fixed-dim transition-colors duration-150"
                      >
                        Read article
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-sans text-on-surface/50">No posts in this category yet.</p>
          )}
        </div>
      </section>

      {/* ── Internal links ── */}
      <section className="bg-surface py-16 md:py-20 border-t-0">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-headline text-xs uppercase tracking-widest text-on-surface/40 mb-6">
            Explore our services
          </p>
          <ul className="flex flex-wrap gap-3" role="list">
            {[
              { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
              { label: 'Pricing & Costs', href: '/double-glazing/cost/' },
              { label: 'Soundproof Windows', href: '/double-glazing/soundproof-windows/' },
              { label: 'Energy Efficient Windows', href: '/double-glazing/energy-efficient-windows/' },
              { label: 'Heritage Homes', href: '/double-glazing/heritage-homes/' },
              { label: 'Glass Types', href: '/double-glazing/glass-types/' },
              { label: 'Instant Estimate', href: '/instant-estimate/' },
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
        heading={"Get Your\nInstant Estimate"}
        subtext="Price your retrofit in 60 seconds. Transparent, itemised — no sales calls, no site visit required."
        primaryCta={{ label: 'Get Instant Estimate', href: '/instant-estimate/' }}
      />
    </>
  )
}
