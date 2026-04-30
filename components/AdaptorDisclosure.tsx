import { Ruler } from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

export function AdaptorDisclosure() {
  const settings = getSiteSettings()
  const ad = settings.adaptorDisclosure

  const heading         = ad?.heading         ?? 'About our adaptors'
  const mobileSubtitle  = ad?.mobileSubtitle  ?? 'Adds ~20mm to your frame. Tap to read more.'
  const body1           = ad?.body1           ?? 'We use special fittings to attach new glass to your existing frame. Your frame gets about 20mm wider — that is the only visible change. No ripping out, no plastering, no mess.'
  const body2           = ad?.body2           ?? 'This saves you thousands compared to full window replacement.'

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-10">
      <div className="border border-black/10 bg-white">
        {/* Desktop: always visible, icon-left layout */}
        <div className="hidden md:flex items-start gap-6 px-7 py-6">
          <div className="shrink-0 w-10 h-10 bg-black/5 flex items-center justify-center mt-0.5">
            <Ruler size={18} strokeWidth={1.5} className="text-black/70" aria-hidden="true" />
          </div>
          <div>
            <h3 className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-3">
              {heading}
            </h3>
            <p className="font-sans text-sm text-black leading-relaxed">{body1}</p>
            <p className="font-sans text-sm text-black leading-relaxed mt-3">{body2}</p>
          </div>
        </div>

        {/* Mobile: collapsible */}
        <details className="md:hidden">
          <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none group">
            <div className="shrink-0 w-8 h-8 bg-black/5 flex items-center justify-center">
              <Ruler size={14} strokeWidth={1.5} className="text-black/70" aria-hidden="true" />
            </div>
            <span className="font-headline text-sm font-semibold uppercase tracking-wide text-black flex-1 leading-snug">
              {heading}
              <span className="block font-sans text-xs font-normal normal-case tracking-normal text-black/70 mt-0.5">
                {mobileSubtitle}
              </span>
            </span>
            <span className="text-black/70 text-lg leading-none shrink-0" aria-hidden="true">+</span>
          </summary>
          <div className="px-5 pb-6 pt-1 border-t border-black/8">
            <p className="font-sans text-sm text-black leading-relaxed">{body1}</p>
            <p className="font-sans text-sm text-black leading-relaxed mt-3">{body2}</p>
          </div>
        </details>
      </div>
    </div>
  )
}
