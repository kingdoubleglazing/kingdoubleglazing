import Link from 'next/link'
import Image from 'next/image'
import { siteConfig } from '@/data/site'

// ─────────────────────────────────────────────────────────────────────────────
// FounderStory — multi-section personal profile for Casmaku (Cas)
// Broken into four distinct visual sections that cascade down the page.
// ─────────────────────────────────────────────────────────────────────────────

export function FounderStory() {
  return (
    <>
      <FounderHero />
      <FounderOrigin />
      <FounderMission />
      <FounderPhilosophy />
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 1 — The Man at a Glance (dark)
// ─────────────────────────────────────────────────────────────────────────────

function FounderHero() {
  const stats = [
    { value: '40+', label: 'Years in glazing' },
    { value: '7', label: 'Age at first glass job' },
    { value: '2', label: 'Companies founded' },
    { value: '30%', label: 'Cost savings vs replacement' },
  ]

  return (
    <section className="relative bg-inverse-surface overflow-hidden py-16 md:py-24">
      {/* Background watermark */}
      <span
        className="pointer-events-none select-none absolute -bottom-8 -right-6 font-display uppercase leading-none text-inverse-on-surface/4"
        style={{ fontSize: 'clamp(8rem, 22vw, 18rem)' }}
        aria-hidden="true"
      >
        CAS
      </span>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — identity block */}
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary-container mb-4">
              Meet Your Glazier
            </p>

            {/* Name stamp */}
            <h2
              className="font-display uppercase leading-[0.88] text-inverse-on-surface mb-2"
              style={{ fontSize: 'clamp(3.5rem, 9vw, 7.5rem)' }}
            >
              <span className="block">Casmaku</span>
              <span className="block text-primary-container">Founder</span>
            </h2>

            <p className="font-headline text-sm font-semibold uppercase tracking-widest text-inverse-on-surface/40 mb-8">
              King Double Glazing — Brooklyn Glass Pty Ltd
            </p>

            {/* Intro paragraph */}
            <p className="font-sans text-base text-inverse-on-surface/70 leading-relaxed max-w-md">
              Hi, I'm Cas. Glass has been part of my life for as long as I can remember —
              and after more than four decades in the industry, I still love what I do.
              King Double Glazing is the result of everything I've learned: a smarter,
              more honest way to upgrade homes and buildings.
            </p>

            {/* Call to action — "Have a chat" */}
            <Link
              href={siteConfig.phoneHref}
              className="mt-8 inline-flex items-center gap-3 bg-primary-container text-on-primary-fixed font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-fixed-dim transition-colors duration-150"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M3 1h3l1.5 3.5-1.5 1a8.5 8.5 0 004.5 4.5l1-1.5L15 10v3a1 1 0 01-1 1A13 13 0 012 2a1 1 0 011-1z" fill="currentColor"/>
              </svg>
              Have a Chat with Cas
            </Link>
          </div>

          {/* Right — founder photo + stats ledger */}
          <div className="flex flex-col gap-6 self-start">

            {/* Founder photo */}
            <div className="relative w-full aspect-4/3 overflow-hidden">
              <Image
                src="/testimonial-founder/founder.webp"
                alt="Casmaku, founder of King Double Glazing, Melbourne glazing specialist"
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Stats ledger */}
            <div className="grid grid-cols-2 gap-0 ghost-border">
            {stats.map(({ value, label }, i) => (
              <div
                key={label}
                className="ghost-border p-6 md:p-8 animate-stagger-child"
                // biome-ignore lint/suspicious/noExplicitAny: CSS custom prop
                style={{ '--i': i } as any}
              >
                {/* Yellow accent top bar */}
                <div className="h-0.5 w-8 bg-primary-container mb-5" aria-hidden="true" />

                <p
                  className="font-display uppercase leading-none text-primary-container mb-2"
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
                >
                  {value}
                </p>
                <p className="font-headline text-xs font-semibold uppercase tracking-[0.15em] text-inverse-on-surface/40">
                  {label}
                </p>
              </div>
            ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 2 — Born Into Glass (light)
// ─────────────────────────────────────────────────────────────────────────────

function FounderOrigin() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
          The Origin Story
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">

          {/* Left — pull quote + copy */}
          <div className="lg:col-span-7">
            {/* Pull quote */}
            <blockquote className="relative mb-10">
              <span
                className="font-display leading-none text-primary-container select-none"
                style={{ fontSize: 'clamp(5rem, 12vw, 9rem)' }}
                aria-hidden="true"
              >
                "
              </span>
              <p
                className="font-headline font-semibold uppercase tracking-wide text-on-surface leading-snug -mt-4"
                style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
              >
                My father was a glazier.
                I did my first glass replacement
                at seven years old.
              </p>
            </blockquote>

            {/* Body */}
            <div className="space-y-5 font-sans text-base text-on-surface/70 leading-relaxed max-w-xl">
              <p>
                What started as helping out in the family workshop quickly became
                a lifelong calling. After finishing school, Cas stepped into the
                industry professionally — working alongside large glazing companies
                before moving into window manufacturing.
              </p>
              <p>
                Over the years, he gained hands-on experience across both domestic
                and commercial projects, eventually running two specialist companies in
                each area. That journey gave him a granular understanding of how the
                industry works — and where it consistently lets customers down.
              </p>
              <p>
                "I've seen homeowners pay double what they should. That's what pushed me
                to do something different."
              </p>
            </div>
          </div>

          {/* Right — editorial callout panel */}
          <aside className="lg:col-span-5 bg-surface-container-low p-8 self-start">
            {/* Yellow accent */}
            <div className="h-1 w-12 bg-primary-container mb-6" aria-hidden="true" />

            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-3">
              40 Years at a Glance
            </p>

            <ul className="space-y-5">
              {[
                { year: '7 yrs old', detail: 'First glass replacement — under his father\'s eye' },
                { year: 'Post-school', detail: 'Joined the trade professionally with major glazing firms' },
                { year: 'Mid-career', detail: 'Expanded into window manufacturing — domestic & commercial' },
                { year: 'Business owner', detail: 'Founded and ran two specialist glazing companies' },
                { year: 'Today', detail: 'Leads King Double Glazing — Melbourne\'s no-ripoff glazier' },
              ].map(({ year, detail }) => (
                <li key={year} className="flex gap-4">
                  <span className="shrink-0 font-headline text-xs font-semibold uppercase tracking-widest text-primary-container bg-inverse-surface px-2 py-1 h-fit">
                    {year}
                  </span>
                  <p className="font-sans text-sm text-on-surface/60 leading-relaxed">
                    {detail}
                  </p>
                </li>
              ))}
            </ul>
          </aside>

        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 3 — The Mission (yellow)
// ─────────────────────────────────────────────────────────────────────────────

function FounderMission() {
  const pillars = [
    {
      label: 'Works With Most Frames',
      detail: 'Timber or aluminium — existing frames stay put. No demolition, no mess.',
    },
    {
      label: 'At Least 30% Cheaper',
      detail: 'Compared to full window replacement, with equivalent thermal and acoustic performance.',
    },
    {
      label: 'Transparent Pricing',
      detail: 'No vague quotes, no site visits just to give a number. Itemised estimates online.',
    },
  ]

  return (
    <section className="bg-primary-container py-16 md:py-24 overflow-hidden relative">
      {/* Background watermark */}
      <span
        className="pointer-events-none select-none absolute -bottom-6 right-0 font-display uppercase leading-none text-on-primary-fixed/5"
        style={{ fontSize: 'clamp(8rem, 20vw, 16rem)' }}
        aria-hidden="true"
      >
        MISSION
      </span>

      <div className="relative max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — headline block */}
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-on-primary-fixed/50 mb-4">
              Why King?
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-primary-fixed mb-6"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              <span className="block">A Smarter</span>
              <span className="block">Way to Glaze</span>
            </h2>
            <p className="font-sans text-base text-on-primary-fixed/70 leading-relaxed max-w-md">
              With more than 40 years in the trade, Cas has seen where the industry
              falls short. King Double Glazing was built to fix that — a retrofit
              double glazing system designed to work with most existing domestic and
              commercial frames, delivering high-quality results while cutting costs
              by at least 30%.
            </p>
          </div>

          {/* Right — pillars */}
          <div className="space-y-0 ghost-border">
            {pillars.map(({ label, detail }, i) => (
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
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Section 4 — The Personal Touch (light grey)
// ─────────────────────────────────────────────────────────────────────────────

function FounderPhilosophy() {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left — large quote block */}
          <div className="lg:col-span-7">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Honest Advice
            </p>

            <h2
              className="font-display uppercase leading-[0.88] text-on-surface mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              <span className="block">No Pressure.</span>
              <span className="block">
                Just{' '}
                <span className="text-primary-container bg-inverse-surface px-2 inline-block leading-tight">
                  Experience.
                </span>
              </span>
            </h2>

            <div className="space-y-5 font-sans text-base text-on-surface/70 leading-relaxed max-w-xl">
              <p>
                Cas is family-oriented and genuinely enjoys sharing what he's learned
                over four decades in the trade. There's no hard sell, no pushy follow-ups,
                and no obligation to commit on the spot.
              </p>
              <p>
                "Whether you're ready to move forward with a project or just want some
                honest advice, I'm always happy to have a chat and point you in the
                right direction."
              </p>
              <p>
                That philosophy is baked into everything King Double Glazing does —
                from the way quotes are presented to the way jobs are handled on-site.
                You deal with Cas directly. No middlemen. No runaround.
              </p>
            </div>

            {/* CTA row */}
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                href={siteConfig.phoneHref}
                className="inline-flex items-center gap-3 bg-inverse-surface text-inverse-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-on-surface/80 transition-colors duration-150"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                  <path d="M3 1h3l1.5 3.5-1.5 1a8.5 8.5 0 004.5 4.5l1-1.5L15 10v3a1 1 0 01-1 1A13 13 0 012 2a1 1 0 011-1z" fill="currentColor"/>
                </svg>
                Call {siteConfig.phone}
              </Link>
              <Link
                href="/instant-estimate/"
                className="inline-flex items-center gap-3 bg-transparent text-on-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 ghost-border hover:bg-surface-container transition-colors duration-150"
              >
                Get Instant Estimate →
              </Link>
            </div>
          </div>

          {/* Right — value ledger card */}
          <aside className="lg:col-span-5">
            <div className="border-l-4 border-primary-container bg-surface-container-lowest p-8">
              <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
                What to Expect When You Call
              </p>

              <ul className="space-y-6">
                {[
                  {
                    icon: '01',
                    heading: 'Straight Answers',
                    body: 'Cas gives you honest information up front — no vague estimates designed to "get you in the door".',
                  },
                  {
                    icon: '02',
                    heading: 'No Obligation',
                    body: 'Have a conversation without any pressure. Ask anything. Take your time.',
                  },
                  {
                    icon: '03',
                    heading: 'Real Expertise',
                    body: 'Forty years of hands-on experience means practical advice, not a sales pitch.',
                  },
                ].map(({ icon, heading, body }) => (
                  <li key={heading} className="flex gap-4">
                    <span
                      className="shrink-0 font-display text-primary-container/30 leading-none"
                      style={{ fontSize: '1.75rem' }}
                      aria-hidden="true"
                    >
                      {icon}
                    </span>
                    <div>
                      <p className="font-headline text-sm font-semibold uppercase tracking-wide text-on-surface mb-1">
                        {heading}
                      </p>
                      <p className="font-sans text-sm text-on-surface/55 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </div>
    </section>
  )
}
