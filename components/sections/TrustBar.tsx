import {
  AlertTriangle,
  Award,
  BadgePercent,
  Building2,
  Calendar,
  CheckCircle,
  Clock,
  DollarSign,
  Gauge,
  Hammer,
  Home,
  Layers,
  Leaf,
  Lock,
  MapPin,
  Phone,
  ShieldCheck,
  Star,
  Sun,
  Thermometer,
  ThumbsUp,
  Truck,
  Users,
  Volume2,
  Wind,
  Wrench,
  Zap,
  type LucideIcon,
} from 'lucide-react'

const ICON_MAP: Record<string, LucideIcon> = {
  alertTriangle: AlertTriangle,
  award: Award,
  badgePercent: BadgePercent,
  building2: Building2,
  calendar: Calendar,
  checkCircle: CheckCircle,
  clock: Clock,
  dollarSign: DollarSign,
  gauge: Gauge,
  hammer: Hammer,
  home: Home,
  layers: Layers,
  leaf: Leaf,
  lock: Lock,
  mapPin: MapPin,
  phone: Phone,
  shieldCheck: ShieldCheck,
  star: Star,
  sun: Sun,
  thermometer: Thermometer,
  thumbsUp: ThumbsUp,
  truck: Truck,
  users: Users,
  volume2: Volume2,
  wind: Wind,
  wrench: Wrench,
  zap: Zap,
}

const FALLBACK_ITEMS = [
  { icon: Clock,       label: '50+ Years Combined Experience' },
  { icon: Star,        label: 'Beat Any Quote by 30%' },
  { icon: ShieldCheck, label: '10-Year Warranty' },
  { icon: Wrench,      label: 'Fits Most Existing Frames' },
]

interface TrustItem {
  icon: LucideIcon
  label: string
}

export interface TrustBarBlockData {
  __typename?: string
  items?: Array<{ iconKey?: string | null; label?: string | null } | null> | null
  tina?: {
    items?: Array<{ iconKey?: string; label?: string } | undefined>
  }
}

interface TrustBarProps {
  items?: TrustItem[]
  block?: TrustBarBlockData
}

export function TrustBar({ items, block }: TrustBarProps) {
  let resolvedItems = items

  if (!resolvedItems) {
    if (block?.items?.length) {
      resolvedItems = block.items
        .filter(Boolean)
        .map(item => ({
          icon: ICON_MAP[item!.iconKey ?? ''] ?? Clock,
          label: item!.label ?? '',
        }))
    } else {
      resolvedItems = FALLBACK_ITEMS
    }
  }

  return (
    <div className="bg-inverse-surface">
      <ul className="flex flex-col md:flex-row md:items-stretch md:justify-between max-w-5xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10">
        {resolvedItems.map(({ icon: Icon, label }, i) => (
          <li
            key={label}
            data-tina-field={block?.tina?.items?.[i]?.iconKey}
            className="flex items-center gap-2.5 px-6 py-3.5 md:flex-1 md:justify-center"
          >
            <Icon
              size={16}
              strokeWidth={2.5}
              aria-hidden="true"
              className="text-primary-container shrink-0"
            />
            <span
              data-tina-field={block?.tina?.items?.[i]?.label}
              className="font-headline text-xs font-semibold uppercase tracking-widest text-inverse-on-surface whitespace-nowrap"
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
