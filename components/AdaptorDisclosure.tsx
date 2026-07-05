import { Ruler } from 'lucide-react'
import { tf } from '@/lib/tina'

export interface AdaptorDisclosureBlockData {
  __typename?: string
  heading?: string | null
  mobileSubtitle?: string | null
  body1?: string | null
  body2?: string | null
}

export function AdaptorDisclosure({ block }: { block?: AdaptorDisclosureBlockData }) {
  const heading        = block?.heading
  const mobileSubtitle = block?.mobileSubtitle
  const body1          = block?.body1
  const body2          = block?.body2

  return (
    <div data-tina-field={tf(block)} className="max-w-5xl mx-auto px-4 py-8 md:py-10">
      <div className="border border-black/10 bg-white">
        {/* Desktop: always visible, icon-left layout */}
        <div className="hidden md:flex items-start gap-6 px-7 py-6">
          <div className="shrink-0 w-10 h-10 bg-black/5 flex items-center justify-center mt-0.5">
            <Ruler size={18} strokeWidth={1.5} className="text-black/70" aria-hidden="true" />
          </div>
          <div>
            {heading && (
              <h3
                data-tina-field={tf(block, 'heading')}
                className="font-headline text-sm font-semibold uppercase tracking-wide text-black mb-3"
              >
                {heading}
              </h3>
            )}
            {body1 && <p data-tina-field={tf(block, 'body1')} className="font-sans text-sm text-black leading-relaxed">{body1}</p>}
            {body2 && <p data-tina-field={tf(block, 'body2')} className="font-sans text-sm text-black leading-relaxed mt-3">{body2}</p>}
          </div>
        </div>

        {/* Mobile: collapsible */}
        <details className="md:hidden">
          <summary className="flex items-center gap-4 px-5 py-4 cursor-pointer list-none [&::-webkit-details-marker]:hidden select-none group">
            <div className="shrink-0 w-8 h-8 bg-black/5 flex items-center justify-center">
              <Ruler size={14} strokeWidth={1.5} className="text-black/70" aria-hidden="true" />
            </div>
            <span className="font-headline text-sm font-semibold uppercase tracking-wide text-black flex-1 leading-snug">
              {heading && <span data-tina-field={tf(block, 'heading')}>{heading}</span>}
              {mobileSubtitle && (
                <span
                  data-tina-field={tf(block, 'mobileSubtitle')}
                  className="block font-sans text-xs font-normal normal-case tracking-normal text-black/70 mt-0.5"
                >
                  {mobileSubtitle}
                </span>
              )}
            </span>
            <span className="text-black/70 text-lg leading-none shrink-0" aria-hidden="true">+</span>
          </summary>
          <div className="px-5 pb-6 pt-1 border-t border-black/8">
            {body1 && <p data-tina-field={tf(block, 'body1')} className="font-sans text-sm text-black leading-relaxed">{body1}</p>}
            {body2 && <p data-tina-field={tf(block, 'body2')} className="font-sans text-sm text-black leading-relaxed mt-3">{body2}</p>}
          </div>
        </details>
      </div>
    </div>
  )
}
