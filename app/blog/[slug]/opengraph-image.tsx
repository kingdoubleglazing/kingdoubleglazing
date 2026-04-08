import { ImageResponse } from 'next/og'
import { blogPosts } from '@/data/blog-posts'

export const runtime = 'edge'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts.find((p) => p.slug === slug) ?? null

  const title = post?.title ?? 'King Double Glazing Blog'
  const excerpt = post?.excerpt ?? "Melbourne's retrofit double glazing specialists."

  return new ImageResponse(
    <div
      style={{
        background: '#0d1117',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: '64px 72px',
        fontFamily: 'sans-serif',
      }}
    >
      {/* Gold accent bar */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          background: '#c9a84c',
        }}
      />

      {/* Category label */}
      <p
        style={{
          fontSize: 14,
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          margin: '0 0 20px 0',
        }}
      >
        King Double Glazing · Blog
      </p>

      {/* Post title */}
      <h1
        style={{
          fontSize: title.length > 60 ? 44 : 56,
          fontWeight: 900,
          textTransform: 'uppercase',
          color: '#ffffff',
          lineHeight: 0.95,
          margin: '0 0 24px 0',
          maxWidth: 900,
        }}
      >
        {title}
      </h1>

      {/* Excerpt */}
      <p
        style={{
          fontSize: 20,
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 400,
          margin: '0 0 48px 0',
          maxWidth: 700,
          lineHeight: 1.4,
        }}
      >
        {excerpt.length > 120 ? `${excerpt.slice(0, 117)}…` : excerpt}
      </p>

      {/* Footer row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span
          style={{
            fontSize: 16,
            color: 'rgba(255,255,255,0.35)',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          kingdoubleglazing.com.au
        </span>
        <span
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: '#c9a84c',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
          }}
        >
          Stop. Don't Overpay.
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
