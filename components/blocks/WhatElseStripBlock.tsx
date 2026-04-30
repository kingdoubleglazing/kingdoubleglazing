import Link from 'next/link'

const services = [
  { label: 'Emergency repairs',  href: '/services/#emergency' },
  { label: 'Shower screens',     href: '/services/#shower-screens' },
  { label: 'Splashbacks',        href: '/services/#splashbacks' },
  { label: 'Custom mirrors',     href: '/services/#mirrors' },
  { label: 'Commercial glazing', href: '/services/#commercial' },
]

export function WhatElseStripBlock() {
  return (
    <section className="bg-surface-container-low py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              What Else We Do
            </p>
            <h2 className="font-headline text-lg md:text-xl font-semibold uppercase tracking-wide text-on-surface">
              We&apos;re glaziers. We do the lot.
            </h2>
          </div>
          <Link
            href="/services/"
            className="inline-flex items-center gap-2 bg-on-surface text-surface font-headline text-sm font-semibold uppercase tracking-[0.12em] px-6 py-3 hover:bg-primary-container hover:text-on-primary-fixed transition-colors duration-150 shrink-0"
          >
            See All Services →
          </Link>
        </div>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
          {services.map(({ label, href }) => (
            <li key={href}>
              <Link
                href={href}
                className="font-sans text-base text-on-surface hover:text-primary underline underline-offset-4 decoration-on-surface/40 hover:decoration-primary"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
