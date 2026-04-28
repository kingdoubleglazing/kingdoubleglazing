import type { Metadata } from 'next'
import Link from 'next/link'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { SchemaScript } from '@/components/SchemaScript'
import { sanityFetch } from '@/sanity/lib/fetch'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import type { SiteSettings } from '@/sanity/types'

export const metadata: Metadata = buildMetadata({
  title: '10-Year Warranty on Double Glazing | King Double Glazing Melbourne',
  description:
    'Our 10-year warranty covers glass, workmanship, seals, and frame adaptors. No conditions, no fine print. See exactly what is covered and how to make a claim.',
  path: '/warranty/',
})

const warrantyPageSchemas = [
  buildWebPageSchema({
    url: `${BASE_URL}/warranty/`,
    name: '10-Year Warranty on Double Glazing | King Double Glazing Melbourne',
    description:
      'Our 10-year warranty covers glass, workmanship, seals, and frame adaptors. No conditions, no fine print.',
    breadcrumb: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'Warranty', url: `${BASE_URL}/warranty/` },
    ],
  }),
]

export default async function WarrantyPage() {
  const settings = await sanityFetch<SiteSettings>({ query: SITE_SETTINGS_QUERY, tags: ['siteSettings'] })
  return (
    <>
      <SchemaScript schemas={warrantyPageSchemas} />

      {/* Hero */}
      <section className="bg-inverse-surface py-16 md:py-24 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-8 -right-6 font-display uppercase leading-none text-inverse-on-surface/4"
          style={{ fontSize: 'clamp(6rem, 18vw, 14rem)' }}
          aria-hidden="true"
        >
          COVERED
        </span>
        <div className="relative max-w-5xl mx-auto px-4">
          <span className="inline-block bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5">
            Warranty
          </span>
          <h1
            className="font-display uppercase leading-none text-inverse-on-surface mb-6"
            style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
          >
            Our 10-Year{' '}
            <span className="text-primary-container">Warranty</span>
          </h1>
          <p className="font-sans text-base text-inverse-on-surface max-w-xl leading-relaxed">
            Every installation is backed by a 10-year warranty on glass and workmanship. No conditions, no fine print.
          </p>
        </div>
      </section>

      {/* What's covered */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            <div>
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                What&apos;s Covered
              </p>
              <h2
                className="font-display uppercase leading-[0.88] text-on-surface mb-8"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                10 Years. Full Stop.
              </h2>
              <ul className="space-y-0 ghost-border">
                {[
                  {
                    item: 'Glass units',
                    detail: 'Any seal failure, fogging, or manufacturing defect in the glass itself.',
                  },
                  {
                    item: 'Installation workmanship',
                    detail: 'If it fails because of how we fitted it, we fix it free.',
                  },
                  {
                    item: 'Frame adaptors',
                    detail: 'The fittings we use to attach new glass to your existing frame.',
                  },
                  {
                    item: 'Seals and edge spacers',
                    detail: 'The seal and spacer bar that keep moisture and air out of the unit.',
                  },
                ].map(({ item, detail }) => (
                  <li key={item} className="ghost-border p-6 flex items-start gap-4">
                    <span className="shrink-0 w-5 h-5 mt-0.5 bg-primary-container text-on-primary-fixed flex items-center justify-center font-headline text-xs font-bold">
                      ✓
                    </span>
                    <div>
                      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface mb-1">
                        {item}
                      </p>
                      <p className="font-sans text-sm text-on-surface leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-surface/70 mb-4">
                What&apos;s Not Covered
              </p>
              <h2
                className="font-display uppercase leading-[0.88] text-on-surface mb-8"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                The Short List
              </h2>
              <ul className="space-y-0 ghost-border">
                {[
                  {
                    item: 'Intentional damage',
                    detail: 'Breakage caused by deliberate impact or misuse.',
                  },
                  {
                    item: 'Storm or weather damage',
                    detail: 'Damage caused by hail, fallen debris, or extreme weather events.',
                  },
                  {
                    item: 'Building structural movement',
                    detail: 'If the building settles and distorts the frame beyond the fitting\'s tolerance.',
                  },
                ].map(({ item, detail }) => (
                  <li key={item} className="ghost-border p-6 flex items-start gap-4">
                    <span className="shrink-0 w-5 h-5 mt-0.5 bg-on-surface/10 text-on-surface/70 flex items-center justify-center font-headline text-xs font-bold">
                      ✕
                    </span>
                    <div>
                      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface mb-1">
                        {item}
                      </p>
                      <p className="font-sans text-sm text-on-surface leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8 bg-surface-container p-6 ghost-border">
                <p className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-primary mb-2">
                  How to Make a Claim
                </p>
                <ol className="space-y-2 font-sans text-sm text-on-surface leading-relaxed list-decimal list-inside">
                  <li>Call or email us with your job reference and a brief description.</li>
                  <li>We inspect within 7 business days — no charge for the visit.</li>
                  <li>If it&apos;s covered, we repair or replace at no cost to you.</li>
                </ol>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={settings.phoneHref}
                    className="inline-flex items-center gap-2 bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-[0.12em] px-5 py-3 hover:bg-primary-fixed-dim transition-colors duration-150"
                  >
                    Call {settings.phone}
                  </a>
                  <a
                    href={`mailto:${settings.email}`}
                    className="inline-flex items-center gap-2 border border-on-surface/20 text-on-surface font-headline text-xs font-semibold uppercase tracking-[0.12em] px-5 py-3 hover:bg-on-surface/5 transition-colors duration-150"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary-container py-16 md:py-20 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-6 -right-4 font-display uppercase leading-none text-on-primary-fixed/6"
          style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
          aria-hidden="true"
        >
          KING
        </span>
        <div className="relative max-w-5xl mx-auto px-4 text-center">
          <h2
            className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Ready to Get Your Price?
          </h2>
          <p className="font-sans text-base text-on-primary-fixed mb-8 max-w-lg mx-auto leading-relaxed">
            Get your price in minutes. Every job comes with this warranty, in writing.
          </p>
          <Link
            href="/instant-estimate/"
            className="inline-flex items-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-10 py-5 hover:bg-on-primary-fixed/80 transition-colors duration-150"
          >
            Generate My Quote →
          </Link>
        </div>
      </section>
    </>
  )
}
