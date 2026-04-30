import { CheckCircle, DollarSign } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export function PaymentTerms() {
  const settings = getSiteSettings()
  const pt = settings.paymentTerms

  const depositTitle    = pt?.depositTitle    ?? '50% Deposit to Start'
  const depositBody     = pt?.depositBody     ?? 'Pay 50% to get your glass made.'
  const completionTitle = pt?.completionTitle ?? '50% on Completion'
  const completionBody  = pt?.completionBody  ?? 'Pay the other 50% when the job is done.'
  const warrantyTitle   = pt?.warrantyTitle   ?? 'Made for You, Backed for 10 Years'
  const warrantyBody    = pt?.warrantyBody    ?? 'All glass is made to measure for your home. If anything needs adjusting after install, we fix it — typically within 2–3 weeks.'

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="border border-black">
          <div className="px-6 py-6 md:px-8 border-b border-black/10">
            <p className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-black mb-1">
              How payment works
            </p>
            <h2
              className="font-display uppercase text-black leading-none"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              Payment Terms &amp; Assurance
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="px-6 py-6 md:px-8">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={16} strokeWidth={2} className="text-primary-container shrink-0" aria-hidden="true" />
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-black">
                  {depositTitle}
                </h3>
              </div>
              <div className="h-0.5 w-6 bg-primary-container mb-3" aria-hidden="true" />
              <p className="font-sans text-sm text-black leading-relaxed">{depositBody}</p>
            </div>

            <div className="px-6 py-6 md:px-8">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={16} strokeWidth={2} className="text-primary-container shrink-0" aria-hidden="true" />
                <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-black">
                  {completionTitle}
                </h3>
              </div>
              <div className="h-0.5 w-6 bg-primary-container mb-3" aria-hidden="true" />
              <p className="font-sans text-sm text-black leading-relaxed">{completionBody}</p>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8 border-t border-black/10 bg-black/[0.02]">
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-2">
              {warrantyTitle}
            </h3>
            <p className="font-sans text-sm text-black leading-relaxed">{warrantyBody}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
