import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildBreadcrumbSchema } from '@/lib/seo/schema/breadcrumbList'
import { buildArticleSchema } from '@/lib/seo/schema/article'
import { buildFaqSchema } from '@/lib/seo/schema/faqPage'
import { BlogHero } from '@/components/blog/BlogHero'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { BlogProseComponents } from '@/components/blog/BlogProse'
import { getBlogPost, getBlogPostContent, getRelatedPosts, getAllBlogSlugs } from '@/lib/blog'
import { BLOG_CATEGORIES } from '@/data/blog-posts'
import { siteConfig } from '@/data/site'

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }))
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  return buildMetadata({
    title: `${post.title} | King Double Glazing`,
    description: post.excerpt,
    path: `/blog/${post.slug}/`,
  })
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const content = getBlogPostContent(slug)
  if (!content) notFound()

  const relatedPosts = getRelatedPosts(post.relatedPosts)
  const categoryLabel = BLOG_CATEGORIES.find((c) => c.value === post.category)?.label

  // ── JSON-LD schemas ──
  const articleSchema = buildArticleSchema({
    headline: post.title,
    description: post.excerpt,
    url: `${BASE_URL}/blog/${post.slug}/`,
    datePublished: post.datePublished,
    dateModified: post.dateModified ?? post.datePublished,
  })

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog/' },
    { name: post.title, href: `/blog/${post.slug}/` },
  ])

  const faqSchema = post.faqItems
    ? buildFaqSchema(post.faqItems.map(({ q, a }) => ({ question: q, answer: a })))
    : null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* ── Hero — post title as H1 ── */}
      <BlogHero
        badge={categoryLabel ?? 'King Double Glazing Blog'}
        title={post.title}
        excerpt={post.excerpt}
        datePublished={post.datePublished}
        readTime={post.readTime}
        asH1
      />

      {/* ── Article body ── */}
      <article className="bg-surface py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">

          {/* Post meta row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-12 pb-6 border-b border-surface-container-high">
            <time
              dateTime={post.datePublished}
              className="font-headline text-xs uppercase tracking-widest text-on-surface/40"
            >
              {formatDate(post.datePublished)}
            </time>
            <span className="font-headline text-xs uppercase tracking-widest text-on-surface/40">
              {post.readTime} min read
            </span>
            <Link
              href={`/blog/?category=${post.category}`}
              className="inline-block bg-primary-container text-on-primary-fixed font-headline text-[0.7rem] font-semibold uppercase tracking-widest px-2 py-0.5 hover:bg-primary-fixed-dim transition-colors duration-150"
            >
              {categoryLabel}
            </Link>
          </div>

          {/* MDX content */}
          <MDXRemote
            source={content}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
              },
            }}
            components={BlogProseComponents}
          />

          {/* Primary service CTA inline */}
          <div className="mt-14 value-ledger px-6 py-5">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Main service
            </p>
            <Link
              href={post.primaryService.href}
              className="font-headline font-bold text-base uppercase tracking-wide text-on-surface hover:text-primary transition-colors duration-150"
            >
              {post.primaryService.label} →
            </Link>
          </div>
        </div>
      </article>

      {/* ── FAQ section (if defined) ── */}
      {post.faqItems && post.faqItems.length > 0 && (
        <section className="bg-surface-container-low py-16 md:py-24">
          <div className="max-w-3xl mx-auto px-4">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              FAQ
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface mb-10"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              Common Questions
            </h2>
            <div className="ghost-border">
              {post.faqItems.map((item, i) => (
                <details
                  key={item.q}
                  className="group bg-surface open:bg-surface-container-lowest"
                >
                  <summary className="flex items-start justify-between gap-6 cursor-pointer list-none px-7 py-6 select-none [&::-webkit-details-marker]:hidden">
                    <div className="flex items-start gap-5">
                      <span
                        className="font-display uppercase text-on-surface/20 leading-none shrink-0 mt-0.5"
                        aria-hidden="true"
                        style={{ fontSize: '1.5rem' }}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <h3 className="font-headline text-base font-semibold uppercase tracking-wide text-on-surface leading-snug pt-1">
                        {item.q}
                      </h3>
                    </div>
                    <div className="shrink-0 mt-1 w-6 h-6 bg-surface-container-high group-open:bg-primary-container flex items-center justify-center transition-colors duration-150">
                      <span
                        className="font-display leading-none text-on-surface group-open:text-on-primary-fixed select-none transition-colors duration-150"
                        aria-hidden="true"
                        style={{ fontSize: '1.25rem', lineHeight: '1' }}
                      >
                        <span className="group-open:hidden">+</span>
                        <span className="hidden group-open:inline">−</span>
                      </span>
                    </div>
                  </summary>
                  <div className="px-7 pb-7 pl-[calc(1.75rem+2rem+1.25rem)]">
                    <div className="h-px w-8 bg-primary-container mb-5" aria-hidden="true" />
                    <p className="font-sans text-sm text-on-surface/65 leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Related posts ── */}
      {relatedPosts.length > 0 && (
        <section className="bg-surface py-16 md:py-20">
          <div className="max-w-7xl mx-auto px-4">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              Keep reading
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface mb-10"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
            >
              Related Articles
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6" role="list">
              {relatedPosts.map((related) => (
                <li key={related.slug}>
                  <article className="bg-surface-container-low flex flex-col h-full">
                    <div className="bg-surface-container-high px-6 py-4 flex items-center justify-between">
                      <span className="inline-block bg-primary-container text-on-primary-fixed font-headline text-[0.7rem] font-semibold uppercase tracking-widest px-2 py-0.5">
                        {BLOG_CATEGORIES.find((c) => c.value === related.category)?.label}
                      </span>
                      <span className="font-headline text-xs uppercase tracking-widest text-on-surface/40">
                        {related.readTime} min read
                      </span>
                    </div>
                    <div className="flex flex-col flex-1 p-6 gap-3">
                      <h3 className="font-headline font-bold text-base leading-snug text-on-surface">
                        {related.title}
                      </h3>
                      <p className="font-sans text-sm text-on-surface/65 leading-relaxed flex-1">
                        {related.excerpt}
                      </p>
                      <Link
                        href={`/blog/${related.slug}/`}
                        className="inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-[0.15em] text-primary mt-3 hover:text-primary-fixed-dim transition-colors duration-150"
                      >
                        Read article →
                      </Link>
                    </div>
                  </article>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── Related services (internal linking) ── */}
      <section className="bg-surface-container-low py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-headline text-xs uppercase tracking-widest text-on-surface/40 mb-4">
            Related services
          </p>
          <ul className="flex flex-wrap gap-3" role="list">
            {post.relatedServices.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="inline-flex items-center gap-2 font-headline text-xs font-semibold uppercase tracking-[0.12em] bg-surface text-on-surface px-4 py-2.5 hover:bg-surface-container-highest transition-colors duration-150"
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

