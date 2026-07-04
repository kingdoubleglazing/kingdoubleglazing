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
      <div className="max-w-3xl mx-auto px-4">
        <p
          data-tina-field={block?.tina?.eyebrow}
          className="font-headline text-xs font-semibold uppercase tracking-[0.2em] text-black mb-1"
        >
          {eyebrow}
        </p>
        <h2
          data-tina-field={block?.tina?.heading}
          className="font-display uppercase text-black leading-none mb-6"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)' }}
        >
          {heading}
        </h2>

        <div className="space-y-5">
          <div>
            <h3
              data-tina-field={block?.tina?.depositTitle}
              className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-1"
            >
              {depositTitle}
            </h3>
            <p data-tina-field={block?.tina?.depositBody} className="font-sans text-sm text-black leading-relaxed">{depositBody}</p>
          </div>

          <div>
            <h3
              data-tina-field={block?.tina?.completionTitle}
              className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-1"
            >
              {completionTitle}
            </h3>
            <p data-tina-field={block?.tina?.completionBody} className="font-sans text-sm text-black leading-relaxed">{completionBody}</p>
          </div>

          <div>
            <h3
              data-tina-field={block?.tina?.warrantyTitle}
              className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-1"
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
