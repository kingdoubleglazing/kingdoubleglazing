import Image from 'next/image'

/**
 * FounderStory — compact strip for homepage.
 * Tas's real story, 8th-grade level, 80 words max.
 */
export function FounderStory() {
  return (
    <section className="bg-surface-container-low py-16 md:py-24">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — story */}
          <div>
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-4">
              Built by a Family of Melbourne Glaziers
            </p>
            <h2
              className="font-display uppercase leading-[0.88] text-on-surface mb-8"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}
            >
              <span className="block">Stop.</span>
              <span className="block text-primary-container">Don&apos;t Overpay.</span>
            </h2>
            <div className="space-y-4 font-sans text-base text-on-surface/70 leading-relaxed max-w-xl">
              <p>
                Tas Markou learned the trade from his father, a well-respected Melbourne glazier.
                He did his apprenticeship at Melbourne Shop Fitters and built a commercial glazing
                team of 40+ people.
              </p>
              <p>
                When he saw how much full window replacement was costing ordinary families,
                he pivoted to retrofit — upgrading the windows people already had,
                for a fraction of the price.
              </p>
              <p className="font-semibold text-on-surface">
                That&apos;s why our whole business is built around one idea:{' '}
                <span className="text-primary-container">Stop. Don&apos;t overpay.</span>
              </p>
            </div>
          </div>

          {/* Right — photo */}
          <div className="relative min-h-[400px] lg:min-h-[480px] overflow-hidden">
            <Image
              src="/testimonial-founder/founder.webp"
              alt="Tas Markou, founder of King Double Glazing"
              fill
              className="object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
