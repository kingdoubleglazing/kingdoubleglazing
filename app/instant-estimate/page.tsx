import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { TrustBar } from '@/components/sections/TrustBar'
import { EstimateCalculator } from '@/components/EstimateCalculator'
import { FAQ } from '@/components/sections/FAQ'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { estimateFaq } from '@/data/estimate-faq'
import { siteConfig } from '@/data/site'
import { Eye, ShieldCheck, PhoneOff, Clock, Calculator } from 'lucide-react'
import { GlassComparisonTable } from '@/components/sections/GlassComparisonTable'

export const metadata: Metadata = buildMetadata({
  title: 'Instant Double Glazing Estimate Melbourne | See Your Price First',
  description:
    'Get an instant double glazing estimate in 60 seconds. No email required to see your number. We beat any genuine quote by 30%. 10-year warranty on every job.',
  path: '/instant-estimate/',
})

const webAppSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'King Double Glazing Instant Estimate Tool',
  url: `${siteConfig.domain}/instant-estimate/`,
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'AUD',
    description: 'Free instant double glazing estimate — no email required to see your number',
  },
  provider: {
    '@type': 'LocalBusiness',
    name: siteConfig.name,
    url: siteConfig.domain,
    telephone: siteConfig.phoneTel,
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: estimateFaq.map(item => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  })),
}

const estimateTrustItems = [
  { icon: Eye,         label: 'See Your Price First'   },
  { icon: PhoneOff,    label: 'No Sales Calls'         },
  { icon: Calculator,  label: 'Accurate Within ±10%'   },
  { icon: ShieldCheck, label: '10-Year Warranty'      },
  { icon: Clock,       label: 'Takes 60 Seconds'       },
]

export default function InstantEstimatePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted static schema
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-primary-container py-16 md:py-20 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-4 -right-6 font-display uppercase leading-none text-on-primary-fixed/6"
          style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
          aria-hidden="true"
        >
          PRICE
        </span>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="flex flex-col gap-5 max-w-3xl">
            <span className="inline-block w-fit bg-on-primary-fixed text-primary-container font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1">
              Instant Estimate Tool
            </span>
            <h1
              className="font-display uppercase leading-none text-on-primary-fixed"
              style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
            >
              Get Your Price in 60 Seconds.
              <br />
              <span className="bg-on-primary-fixed text-primary-container px-2 inline-block leading-tight">No Email Needed to See Your Number.</span>
            </h1>
            <p className="font-sans text-base text-on-primary-fixed/70 max-w-lg leading-relaxed">
              We&apos;ll beat any genuine quote by 30%. That&apos;s a promise in writing.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
              {[
                '4 quick questions',
                'Takes 60 seconds',
                'See your range instantly',
                'No email needed',
              ].map(item => (
                <li key={item} className="font-headline text-xs font-semibold uppercase tracking-widest text-on-primary-fixed">
                  ✓ {item}
                </li>
              ))}
            </ul>
            <div className="mt-3">
              <a
                href="#estimate-form"
                className="inline-flex items-center gap-3 bg-on-primary-fixed text-primary-container font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-on-primary-fixed/80 transition-colors duration-150 w-fit"
              >
                Start My Free Estimate →
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar items={estimateTrustItems} />

      <GlassComparisonTable />

      {/* The tool */}
      <section className="bg-inverse-surface" id="estimate-form">
        <div className="max-w-4xl mx-auto">
          <EstimateCalculator />
        </div>
        <p className="max-w-4xl mx-auto px-6 py-6 md:px-10 font-sans text-xs text-inverse-on-surface/30 leading-relaxed text-center">
          Estimate is indicative only. Free on-site measure confirms exact dimensions and final price before any work begins.
        </p>
      </section>

      <FAQ
        heading="Estimate FAQ"
        subheading="Common questions about the tool and how it works."
        items={estimateFaq}
        emitSchema={false}
      />

      <CtaBanner
        heading={"Ready for the\nFormal Quote?"}
        subtext="Once you have an estimate, book a free on-site check. A King glazier measures precisely and issues a contractual quote — price locked, no surprises."
        primaryCta={{ label: 'Book Free Home Visit', href: '/contact/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
