import {
  BadgePercent,
  Clock,
  Hammer,
  ShieldCheck,
  Star,
  Thermometer,
  Volume2,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'
import { getSiteSettings } from '@/lib/site-settings'

const ICON_MAP: Record<string, LucideIcon> = {
  clock: Clock,
  star: Star,
  shieldCheck: ShieldCheck,
  wrench: Wrench,
  hammer: Hammer,
  zap: Zap,
  badgePercent: BadgePercent,
  thermometer: Thermometer,
  volume2: Volume2,
}

const FALLBACK_ITEMS: TrustItem[] = [
  { icon: Clock,       label: '50+ Years Combined Experience' },
  { icon: Star,        label: 'Beat Any Quote by 30%' },
  { icon: ShieldCheck, label: '10-Year Warranty' },
  { icon: Wrench,      label: 'Fits Most Existing Frames' },
]

interface TrustItem {
  icon: LucideIcon
  label: string
}

interface TrustBarProps {
  items?: TrustItem[]
}

export function TrustBar({ items }: TrustBarProps) {
  let resolvedItems = items
  if (!resolvedItems) {
    const settings = getSiteSettings()
    resolvedItems = settings.trustBarItems?.length
      ? settings.trustBarItems.map(({ iconKey, label }) => ({
          icon: ICON_MAP[iconKey] ?? Clock,
          label,
        }))
      : FALLBACK_ITEMS
  }

  return (
    <div className="bg-inverse-surface">
      <ul className="flex flex-col md:flex-row md:items-stretch md:justify-between max-w-5xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10">
        {resolvedItems.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5 px-6 py-3.5 md:flex-1 md:justify-center">
            <Icon
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="text-primary-container shrink-0"
            />
            <span className="font-headline text-xs font-semibold uppercase tracking-widest text-inverse-on-surface whitespace-nowrap">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
