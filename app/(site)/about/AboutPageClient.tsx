'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useTina, tinaField } from 'tinacms/dist/react'
import { TrustBar } from '@/components/sections/TrustBar'
import { CtaBanner } from '@/components/sections/CtaBanner'
import { FreeAdviceBlock } from '@/components/FreeAdviceBlock'
import type { AboutPageQuery, AboutPageQueryVariables, FaqConnectionQuery } from '@/tina/__generated__/types'
import type { FaqItem } from '@/lib/types'

type TinaAboutResult = { data: AboutPageQuery; query: string; variables: AboutPageQueryVariables }

type TinaFaqNode = {
  __typename?: string
  id?: string
  q?: string | null
  a?: string | null
  order?: number | null
  _sys?: object
}

export function AboutPageClient({
  tinaAbout,
  phone,
  phoneHref,
  domain,
}: {
  tinaAbout: TinaAboutResult
  phone: string
  phoneHref: string
  domain: string
}) {
  const { data } = useTina(tinaAbout)
  const page = data.aboutPage

  const tf = (obj: object, field: string) => {
    try { return tinaField(obj, field) || undefined } catch { return undefined }
  }

  return (
    <>
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
                <span data-tina-field={tf(page, 'heroHeadline') || undefined}>
                  {page?.heroHeadline ?? 'Built by a Family'}
                </span>
                <br />
                <span
                  data-tina-field={tf(page, 'heroHeadlineYellow') || undefined}
                  className="text-primary-container"
                >
                  {page?.heroHeadlineYellow ?? 'of Melbourne Glaziers'}
                </span>
              </h1>
              <p
                data-tina-field={tf(page, 'heroSubtext') || undefined}
                className="font-sans text-base text-inverse-on-surface max-w-lg leading-relaxed mb-8"
              >
                {page?.heroSubtext ?? 'Tas Markou ran two double glazing factories. He found a way to drop the price — because most companies charge more than families can afford. 40+ staff at peak. 25+ years in the trade.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/instant-estimate/"
                  className="inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 hover:bg-primary-fixed-dim transition-colors duration-150"
                >
                  Generate My Quote →
                </Link>
                <a
                  href={phoneHref}
                  className="inline-flex items-center gap-3 bg-transparent text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-8 py-4 border border-inverse-on-surface/30 hover:bg-inverse-on-surface/10 transition-colors duration-150"
                >
                  Call {phone}
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

      {/* Founder story */}
      <section className="bg-surface py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7">
              <p
                data-tina-field={tf(page, 'storyEyebrow') || undefined}
                className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4"
              >
                {page?.storyEyebrow ?? 'The Origin Story'}
              </p>
              <h2
                className="font-display uppercase leading-[0.88] text-on-surface mb-8"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
              >
                <span className="block">Stop.</span>
                <span className="block text-primary-container">Don&apos;t Overpay.</span>
              </h2>
              <div className="space-y-5 font-sans text-base text-on-surface leading-relaxed max-w-xl">
                {(page?.storyParagraphs ?? [
                  'I grew up in glass. My father was a glazier and I was doing installs as a kid. I ran two factories. Along the way I found a way to drop the price — most companies charge way more than families can afford.',
                  "You want quieter, warmer windows. You don't want to spend $15,000 ripping out frames that work fine. We add a second pane to what you already have. No mess. One day, done.",
                  "Every quote is in plain numbers. No hidden extras. If we can't beat any real competitor quote by 30%, I'll say so. Stop. Don't overpay.",
                ]).map((para, i) => (
                  <p
                    key={i}
                    data-tina-field={tf(page, 'storyParagraphs') || undefined}
                  >
                    {para}
                  </p>
                ))}
                <blockquote className="border-l-4 border-primary-container pl-5 not-italic">
                  <p
                    data-tina-field={tf(page, 'storyQuote') || undefined}
                    className="font-sans text-base font-semibold text-on-surface leading-relaxed"
                  >
                    {page?.storyQuote ?? "Transparent quoting. Fair pricing. 10-year warranty. That's the King promise. — Tas"}
                  </p>
                </blockquote>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <div className="grid grid-cols-2 gap-0 ghost-border">
                {(page?.stats ?? [
                  { value: '50+', label: 'Years combined experience' },
                  { value: '40+', label: 'Staff at peak commercial operation' },
                  { value: '30%', label: 'Cheaper than any genuine quote' },
                  { value: '1-2 days', label: 'Typical install time' },
                ]).map((stat, i) => {
                  if (!stat) return null
                  return (
                    <div
                      key={stat.label ?? i}
                      className="ghost-border p-6 md:p-8 animate-stagger-child"
                      // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                      style={{ '--i': i } as any}
                    >
                      <div className="h-0.5 w-8 bg-primary-container mb-5" aria-hidden="true" />
                      <p
                        data-tina-field={tf(stat, 'value') || undefined}
                        className="font-display uppercase leading-none text-primary-container mb-2"
                        style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
                      >
                        {stat.value}
                      </p>
                      <p
                        data-tina-field={tf(stat, 'label') || undefined}
                        className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-on-surface"
                      >
                        {stat.label}
                      </p>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>
      </section>


      <FreeAdviceBlock />

      <CtaBanner
        heading={"Ready to\nGet Started?"}
        subtext="Generate your own quote in minutes. Or call us directly — no call centres, no middlemen."
        primaryCta={{ label: 'Generate My Quote →', href: '/instant-estimate/' }}
        secondaryCta={{ label: phone, href: phoneHref }}
      />
    </>
  )
}
