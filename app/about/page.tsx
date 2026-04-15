import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { buildMetadata, BASE_URL } from '@/lib/seo/generateMetadata'
import { buildWebPageSchema } from '@/lib/seo/schema/webpage'
import { getFAQSchema } from '@/data/faqs'
import { SchemaScript } from '@/components/SchemaScript'
import { TrustBar } from '@/components/sections/TrustBar'
import { Testimonials } from '@/components/sections/Testimonials'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { siteConfig } from '@/data/site'

export const metadata: Metadata = buildMetadata({
  title: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers | Tas Markou",
  description:
    'Built by a Melbourne glazing family with 50+ years combined experience. King Double Glazing beats any genuine quote by 30% with a 10-year warranty on every job. No call centres, no surprises.',
  path: '/about/',
})

const aboutPageSchemas = [
  buildWebPageSchema({
    url: `${BASE_URL}/about/`,
    name: "About King Double Glazing | Melbourne's Anti-Ripoff Glaziers | Tas Markou",
    description: 'Built by a Melbourne glazing family with 50+ years combined experience. King Double Glazing beats any genuine quote by 30% with a 10-year warranty on every job.',
    breadcrumb: [
      { name: 'Home', url: `${BASE_URL}/` },
      { name: 'About', url: `${BASE_URL}/about/` },
    ],
  }),
  {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tas Markou',
    jobTitle: 'Founder',
    worksFor: { '@id': `${siteConfig.domain}/#business` },
    image: `${siteConfig.domain}/testimonial-founder/founder.webp`,
    description: 'Tas Markou learned the trade from his father, a Melbourne glazier. He built a commercial glazing business with 40+ staff at peak before founding King Double Glazing to offer honest, transparent retrofit double glazing pricing.',
  },
  getFAQSchema('general'),
]

export default function AboutPage() {
  return (
    <>
      <SchemaScript schemas={aboutPageSchemas} />
      {/* Hero */}
      <section className="bg-inverse-surface py-16 md:py-24 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-8 -right-6 font-display uppercase leading-none text-inverse-on-surface/4"
          style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
          aria-hidden="true"
        >
          TAS
        </span>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="inline-block w-fit bg-primary-container text-on-primary-fixed font-headline text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-5">
                About King Double Glazing
              </span>
              <h1
                className="font-display uppercase leading-none text-inverse-on-surface mb-6"
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
              >
                Built by a Family
                <br />
                <span className="text-primary-container">of Melbourne Glaziers</span>
              </h1>
              <p className="font-sans text-base text-inverse-on-surface/85 max-w-lg leading-relaxed mb-8">
                Tas Markou learned the trade from his father, a well-respected Melbourne glazier.
                He completed his apprenticeship at Melbourne Shop Fitters and built a commercial
                glazing operation with 40+ staff at peak.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/instant-estimate/"
                  className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
                >
                  Get My Instant Price →
                </Link>
                <a
                  href={siteConfig.phoneHref}
                  className="inline-flex items-center gap-3 bg-transparent text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-inverse-on-surface/30 hover:bg-inverse-on-surface/10 transition-colors duration-150"
                >
                  Call {siteConfig.phone}
                </a>
              </div>
            </div>
            <div className="relative min-h-[420px] lg:min-h-[520px] overflow-hidden">
              <Image
                src="/testimonial-founder/founder.webp"
                alt="Tas Markou, founder of King Double Glazing"
                fill
                priority
                className="object-cover object-top"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Founder story — detailed */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left — story */}
            <div className="lg:col-span-7">
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
                The Origin Story
              </p>
              <h2
                className="font-display uppercase leading-[0.88] text-on-surface mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                <span className="block">Stop.</span>
                <span className="block text-primary-container">Don&apos;t Overpay.</span>
              </h2>
              <div className="space-y-5 font-sans text-base text-on-surface/70 leading-relaxed max-w-xl">
                <p>
                  Tas Markou grew up around glass. His father was a well-respected Melbourne glazier,
                  and Tas was doing his first glass replacements as a kid.
                  After completing his apprenticeship at Melbourne Shop Fitters, he went on to build
                  a commercial glazing operation with 40+ staff at its peak.
                </p>
                <p>
                  When he saw the demand for energy-efficient glass — and realised most homeowners
                  were being priced out of full replacements — he pivoted to retrofit double glazing.
                  Upgrading the windows people already had, for a fraction of the price.
                </p>
                <p>
                  That&apos;s why our whole business is built around one idea:{' '}
                  <strong className="text-on-surface">Stop. Don&apos;t overpay.</strong>
                </p>
                <blockquote className="border-l-4 border-primary-container pl-5 not-italic">
                  <p className="font-sans text-base font-semibold text-on-surface leading-relaxed">
                    Transparent quoting. Fair pricing. 10-year warranty.
                    No overpaying. That&apos;s the King promise.
                  </p>
                </blockquote>
              </div>
            </div>

            {/* Right — stats */}
            <aside className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-0 ghost-border">
                {[
                  { value: '50+', label: 'Years combined experience' },
                  { value: '40+', label: 'Staff at peak commercial operation' },
                  { value: '30%', label: 'Cheaper than any genuine quote' },
                  { value: '1 day', label: 'Typical install time' },
                ].map(({ value, label }, i) => (
                  <div
                    key={label}
                    className="ghost-border p-6 md:p-8 animate-stagger-child"
                    // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                    style={{ '--i': i } as any}
                  >
                    <div className="h-0.5 w-8 bg-primary-container mb-5" aria-hidden="true" />
                    <p
                      className="font-display uppercase leading-none text-primary-container mb-2"
                      style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                    >
                      {value}
                    </p>
                    <p className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface/80">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* Guarantees */}
      <section className="bg-primary-container py-16 md:py-24 overflow-hidden relative">
        <span
          className="pointer-events-none select-none absolute -bottom-6 right-0 font-display uppercase leading-none text-on-primary-fixed/5"
          style={{ fontSize: 'clamp(8rem, 20vw, 16rem)' }}
          aria-hidden="true"
        >
          KING
        </span>
        <div className="relative max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div>
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/50 mb-4">
                Our Promises
              </p>
              <h2
                className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-6"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                <span className="block">What We</span>
                <span className="block">Guarantee</span>
              </h2>
              <p className="font-sans text-base text-on-primary-fixed/70 leading-relaxed max-w-md">
                These aren&apos;t marketing promises. They&apos;re in writing on every job.
              </p>
            </div>
            <div className="space-y-0 ghost-border">
              {[
                {
                  label: 'We beat any genuine quote by 30%',
                  detail: 'Send us a real competitor quote. We\'ll come in 30% cheaper — guaranteed in writing, same 10-year warranty.',
                },
                {
                  label: 'Fits most existing windows',
                  detail: 'Custom adaptors are made to suit timber, aluminium, and steel frames. If your frames can\'t take a retrofit, we\'ll tell you at the free home visit — no charge, no pressure.',
                },
                {
                  label: '10-year warranty on every job',
                  detail: 'Glass and workmanship covered. No conditions, no fine print.',
                },
                {
                  label: 'Transparent pricing',
                  detail: 'No vague estimates. No hidden charges. The quote we give you is the invoice you receive.',
                },
                {
                  label: '50+ years combined experience',
                  detail: 'Tas learned from his father. Our team has worked on thousands of Melbourne homes.',
                },
              ].map(({ label, detail }, i) => (
                <div
                  key={label}
                  className="ghost-border p-7 bg-on-primary-fixed/5 hover:bg-on-primary-fixed/9 transition-colors duration-150 animate-stagger-child"
                  // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                  style={{ '--i': i } as any}
                >
                  <div className="flex items-start gap-4">
                    <span className="shrink-0 font-display text-on-primary-fixed/30 leading-none" style={{ fontSize: '2rem' }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-on-primary-fixed mb-2">
                        {label}
                      </p>
                      <p className="font-sans text-sm text-on-primary-fixed/60 leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Testimonials />

      <CtaBanner
        heading={"Ready to\nGet Started?"}
        subtext="Get your instant estimate in 60 seconds. Or call Tas directly — no call centres, no middlemen."
        primaryCta={{ label: 'Get My Instant Price →', href: '/instant-estimate/' }}
        secondaryCta={{ label: siteConfig.phone, href: siteConfig.phoneHref }}
      />
    </>
  )
}
