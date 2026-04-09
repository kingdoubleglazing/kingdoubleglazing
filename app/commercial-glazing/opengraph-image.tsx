import { ImageResponse } from 'next/og'

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
        King Double Glazing · Commercial
      </p>

      <h1
        style={{
          fontSize: 64,
          fontWeight: 900,
          textTransform: 'uppercase',
          color: '#ffffff',
          lineHeight: 0.92,
          margin: '0 0 24px 0',
          maxWidth: 900,
        }}
      >
        Commercial Glazing Melbourne
      </h1>

      <p
        style={{
          fontSize: 22,
          color: 'rgba(255,255,255,0.55)',
          fontWeight: 400,
          margin: '0 0 48px 0',
          maxWidth: 720,
          lineHeight: 1.4,
        }}
      >
        Shopfronts, office partitions, balustrades, and double glazing retrofits for strata and developers. Itemised quotes, predictable scheduling.
      </p>

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
          Offices · Retail · Strata
        </span>
      </div>
    </div>,
    { ...size },
  )
}
