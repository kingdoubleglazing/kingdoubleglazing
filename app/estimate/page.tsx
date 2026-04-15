import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo/generateMetadata'
import { EstimateCalculator } from '@/components/EstimateCalculator'

export const metadata: Metadata = buildMetadata({
  title: 'Instant Estimate | Double Glazing Cost Calculator | King Double Glazing',
  description:
    'Find out what retrofit double glazing costs for your Melbourne home. Takes 60 seconds. No email required to see your number. From $495/m².',
  path: '/estimate/',
})

export default function EstimatePage() {
  return (
    <section className="bg-surface py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="max-w-2xl mb-12">
          <h1
            className="font-display uppercase leading-none text-on-surface mb-4"
            style={{ fontSize: 'clamp(2.5rem, 7vw, 5rem)' }}
          >
            Instant Estimate
          </h1>
          <p className="font-sans text-base text-on-surface/70 leading-relaxed">
            Find out what retrofit double glazing costs for your home. Takes 60 seconds.
          </p>
        </div>

        <EstimateCalculator />

        <p className="mt-10 text-center font-sans text-xs text-on-surface/50 leading-relaxed max-w-xl mx-auto">
          Estimates are indicative. Final price confirmed after free in-home assessment. No obligation.
        </p>
      </div>
    </section>
  )
}
