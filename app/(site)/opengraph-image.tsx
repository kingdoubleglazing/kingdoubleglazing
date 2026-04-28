import { ImageResponse } from 'next/og'
import { siteConfig } from '@/data/site'

export const runtime = 'edge'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
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

      {/* Tagline */}
      <p
        style={{
          fontSize: 18,
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: '#c9a84c',
          margin: '0 0 24px 0',
        }}
      >
        Stop. Don't Overpay.
      </p>

      {/* Main headline */}
      <h1
        style={{
          fontSize: 72,
          fontWeight: 900,
          textTransform: 'uppercase',
          color: '#ffffff',
          lineHeight: 0.9,
          margin: '0 0 28px 0',
          letterSpacing: '-0.01em',
        }}
      >
        King Double Glazing
      </h1>

      {/* Description */}
      <p
        style={{
          fontSize: 24,
          color: 'rgba(255,255,255,0.6)',
          fontWeight: 400,
          margin: '0 0 48px 0',
          maxWidth: 700,
          lineHeight: 1.4,
        }}
      >
        {`Melbourne's retrofit double glazing specialists. ${siteConfig.pricing.retrofitFromDisplay} — transparent pricing, no surprises.`}
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
            fontSize: 16,
            fontWeight: 700,
            color: '#c9a84c',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}
        >
          {siteConfig.pricing.retrofitFromDisplay}
        </span>
      </div>
    </div>,
    {
      ...size,
    },
  )
}
