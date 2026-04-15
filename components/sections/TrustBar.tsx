import { Clock, ShieldCheck, Star, MapPin, type LucideIcon } from 'lucide-react'

interface TrustItem {
  icon: LucideIcon
  label: string
}

const defaultItems: TrustItem[] = [
  { icon: Clock,       label: '50+ Years Combined Experience' },
  { icon: Star,        label: 'Beat Any Quote by 30%' },
  { icon: ShieldCheck, label: '10-Year Warranty' },
  { icon: MapPin,      label: 'Melbourne-Owned' },
]

interface TrustBarProps {
  items?: TrustItem[]
}

export function TrustBar({ items = defaultItems }: TrustBarProps) {
  return (
    <div className="bg-inverse-surface overflow-x-auto">
      <ul className="flex items-stretch min-w-max md:min-w-0 md:justify-between max-w-5xl mx-auto divide-x divide-white/10">
        {items.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-2.5 px-6 py-3.5 shrink-0 md:flex-1 md:justify-center">
            <Icon
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="text-primary-container shrink-0"
            />
            <span className="font-headline text-xs font-semibold uppercase tracking-widest text-inverse-on-surface/80 whitespace-nowrap">
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
