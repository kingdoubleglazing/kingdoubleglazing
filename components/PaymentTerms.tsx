import { DollarSign, CheckCircle } from 'lucide-react'

export function PaymentTerms() {
  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="border border-black">
          <div className="px-6 py-6 md:px-8 border-b border-black/10">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-black/40 mb-1">
              How payment works
            </p>
            <h2
              className="font-display uppercase text-black leading-none"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Payment Terms &amp; Assurance
            </h2>
          </div>

          {/* Two-column payment grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10">
            {/* Deposit block */}
            <div className="px-6 py-6 md:px-8">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign
                  size={16}
                  strokeWidth={2}
                  className="text-primary-container shrink-0"
                  aria-hidden="true"
                />
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-black">
                  50% Deposit to Start
                </h3>
              </div>
              <div className="h-0.5 w-6 bg-primary-container mb-3" aria-hidden="true" />
              <p className="font-sans text-sm text-black/70 leading-relaxed">
                A 50% deposit is required to commence fabrication.
              </p>
            </div>

            {/* Completion block */}
            <div className="px-6 py-6 md:px-8">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle
                  size={16}
                  strokeWidth={2}
                  className="text-primary-container shrink-0"
                  aria-hidden="true"
                />
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-black">
                  50% on Completion
                </h3>
              </div>
              <div className="h-0.5 w-6 bg-primary-container mb-3" aria-hidden="true" />
              <p className="font-sans text-sm text-black/70 leading-relaxed">
                The remaining 50% is due once materials are ready and your installation is scheduled.
              </p>
            </div>
          </div>

          {/* Workmanship footer */}
          <div className="px-6 py-6 md:px-8 border-t border-black/10 bg-black/[0.02]">
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-2">
              Made for You, Backed for 10 Years
            </h3>
            <p className="font-sans text-sm text-black/70 leading-relaxed">
              All materials are custom-made for your project. We stand behind our workmanship and promptly address any installation-related adjustments, typically within 2&ndash;3 weeks if required.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
