import { CheckCircle, DollarSign } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export interface PaymentTermsBlockData {
  __typename?: string
  eyebrow?: string | null
  heading?: string | null
  depositTitle?: string | null
  depositBody?: string | null
  completionTitle?: string | null
  completionBody?: string | null
  warrantyTitle?: string | null
  warrantyBody?: string | null
  tina?: {
    eyebrow?: string
    heading?: string
    depositTitle?: string
    depositBody?: string
    completionTitle?: string
    completionBody?: string
    warrantyTitle?: string
    warrantyBody?: string
  }
}

export function PaymentTerms({ block }: { block?: PaymentTermsBlockData }) {
  const settings = getSiteSettings()
  const pt = settings.paymentTerms

  const eyebrow         = block?.eyebrow         ?? 'How payment works'
  const heading         = block?.heading         ?? 'Payment Terms & Assurance'
  const depositTitle    = block?.depositTitle    ?? pt?.depositTitle    ?? '50% Deposit to Start'
  const depositBody     = block?.depositBody     ?? pt?.depositBody     ?? 'Pay 50% to get your glass made.'
  const completionTitle = block?.completionTitle ?? pt?.completionTitle ?? '50% on Completion'
  const completionBody  = block?.completionBody  ?? pt?.completionBody  ?? 'Pay the other 50% when the job is done.'
  const warrantyTitle   = block?.warrantyTitle   ?? pt?.warrantyTitle   ?? 'Made for You, Backed for 10 Years'
  const warrantyBody    = block?.warrantyBody    ?? pt?.warrantyBody    ?? 'All glass is made to measure for your home. If anything needs adjusting after install, we fix it — typically within 2–3 weeks.'

  return (
    <section className="bg-white py-12 md:py-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="border border-black">
          <div className="px-6 py-6 md:px-8 border-b border-black/10">
            <p
              data-tina-field={block?.tina?.eyebrow}
              className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-black mb-1"
            >
              {eyebrow}
            </p>
            <h2
              data-tina-field={block?.tina?.heading}
              className="font-display uppercase text-black leading-none"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
            >
              {heading}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-black/10">
            <div className="px-6 py-6 md:px-8">
              <div className="flex items-center gap-2 mb-3">
                <DollarSign size={16} strokeWidth={2} className="text-primary-container shrink-0" aria-hidden="true" />
                <h3
                  data-tina-field={block?.tina?.depositTitle}
                  className="font-headline text-sm font-semibold uppercase tracking-wide text-black"
                >
                  {depositTitle}
                </h3>
              </div>
              <div className="h-0.5 w-6 bg-primary-container mb-3" aria-hidden="true" />
              <p data-tina-field={block?.tina?.depositBody} className="font-sans text-sm text-black leading-relaxed">{depositBody}</p>
            </div>

            <div className="px-6 py-6 md:px-8">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle size={16} strokeWidth={2} className="text-primary-container shrink-0" aria-hidden="true" />
                <h3
                  data-tina-field={block?.tina?.completionTitle}
                  className="font-headline text-sm font-semibold uppercase tracking-wide text-black"
                >
                  {completionTitle}
                </h3>
              </div>
              <div className="h-0.5 w-6 bg-primary-container mb-3" aria-hidden="true" />
              <p data-tina-field={block?.tina?.completionBody} className="font-sans text-sm text-black leading-relaxed">{completionBody}</p>
            </div>
          </div>

          <div className="px-6 py-6 md:px-8 border-t border-black/10 bg-black/[0.02]">
            <h3
              data-tina-field={block?.tina?.warrantyTitle}
              className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-2"
            >
              {warrantyTitle}
            </h3>
            <p data-tina-field={block?.tina?.warrantyBody} className="font-sans text-sm text-black leading-relaxed">{warrantyBody}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
