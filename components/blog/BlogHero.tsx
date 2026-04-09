import Link from 'next/link'
import { siteConfig } from '@/data/site'

interface BlogHeroProps {
  badge: string
  title: string
  excerpt: string
  datePublished?: string
  readTime?: number
  /** If true, renders H1. If false/omitted, renders a decorative heading (for index page). */
  asH1?: boolean
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-AU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

export function BlogHero({
  badge,
  title,
  excerpt,
  datePublished,
  readTime,
  asH1 = true,
}: BlogHeroProps) {
  const Heading = asH1 ? 'h1' : 'h2'

  return (
    <section className="bg-primary-container pt-36 pb-16 md:pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-4xl">

          {/* Badge */}
          <div className="mb-6">
            <span className="inline-block bg-on-primary-fixed px-3 py-1 font-headline text-xs font-semibold uppercase tracking-widest text-primary-container">
              {badge}
            </span>
          </div>

          {/* Title */}
          <Heading
            className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-6 md:mb-8"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            {title}
          </Heading>

          {/* Meta row — date + read time */}
          {(datePublished || readTime) && (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-6">
              {datePublished && (
                <time
                  dateTime={datePublished}
                  className="font-headline text-xs uppercase tracking-widest text-on-primary-fixed/50"
                >
                  {formatDate(datePublished)}
                </time>
              )}
              {readTime && (
                <span className="font-headline text-xs uppercase tracking-widest text-on-primary-fixed/50">
                  {readTime} min read
                </span>
              )}
            </div>
          )}

          {/* Excerpt */}
          <p
            className="font-sans text-on-primary-fixed/70 leading-relaxed mb-10 max-w-2xl"
            style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.0625rem)' }}
          >
            {excerpt}
          </p>

          {/* CTA cluster */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/instant-estimate/"
              className="inline-flex items-center justify-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-7 py-4 hover:bg-on-primary-fixed/80 transition-colors duration-150"
            >
              Get Instant Estimate
              <span aria-hidden="true">→</span>
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center justify-center gap-3 bg-transparent text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-7 py-4 border border-on-primary-fixed/30 hover:bg-on-primary-fixed/10 transition-colors duration-150"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M3 1h3l1.5 3.5-1.5 1a8.5 8.5 0 004.5 4.5l1-1.5L15 10v3a1 1 0 01-1 1A13 13 0 012 2a1 1 0 011-1z" fill="currentColor"/>
              </svg>
              {siteConfig.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
