import Link from 'next/link'
import { siteConfig } from '@/data/site'

/**
 * Discount announcement bar — top of every page.
 * Yellow background, black text. "Stop — Don't Overpay." brand hook.
 * Non-sticky: scrolls away with the page.
 */
export function EmergencyBanner() {
  return (
    <div className="bg-primary-container text-on-primary-fixed text-sm font-semibold">
      <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        <span className="font-headline text-xs font-semibold uppercase tracking-wide">
          <strong>Stop — Don&apos;t Overpay.</strong>{' '}
          We&apos;ll beat any genuine quote by 30%. Backed by 10-year warranty.
        </span>
        <Link
          href="/instant-estimate/"
          className="font-headline inline-flex items-center gap-1.5 bg-on-primary-fixed text-primary-container font-bold px-4 py-1.5 uppercase tracking-wide text-xs hover:bg-on-primary-fixed/80 transition-colors duration-150 shrink-0"
        >
          Get My Instant Price →
        </Link>
      </div>
    </div>
  )
}
