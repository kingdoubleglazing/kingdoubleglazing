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
import { tf } from '@/lib/tina'

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

interface TrustItem {
  icon: LucideIcon
  label: string
}

export interface TrustBarBlockData {
  __typename?: string
  items?: Array<{ iconKey?: string | null; label?: string | null } | null> | null
}

interface TrustBarProps {
  items?: TrustItem[]
  block?: TrustBarBlockData
}

export function TrustBar({ items, block }: TrustBarProps) {
  // Keep a reference to the live Tina node for each row so inline-edit ids
  // resolve correctly; the `items` prop path has no node (static render).
  const rows = items
    ? items.map(({ icon, label }) => ({ node: undefined as unknown, Icon: icon, label }))
    : (block?.items ?? [])
        .filter(Boolean)
        .map(item => ({
          node: item,
          Icon: ICON_MAP[item!.iconKey ?? ''] ?? Clock,
          label: item!.label ?? '',
        }))

  if (!rows.some(({ label }) => label)) return null

  return (
    <div data-tina-field={tf(block)} className="bg-inverse-surface">
      <ul className="flex flex-col md:flex-row md:items-stretch md:justify-between max-w-5xl mx-auto divide-y md:divide-y-0 md:divide-x divide-white/10">
        {rows.map(({ node, Icon, label }, i) =>
          label ? (
            <li
              key={`${label}-${i}`}
              data-tina-field={tf(node)}
              className="flex items-center gap-2.5 px-6 py-3.5 md:flex-1 md:justify-center"
            >
              <Icon
                size={16}
                strokeWidth={2.5}
                aria-hidden="true"
                className="text-primary-container shrink-0"
              />
              <span
                data-tina-field={tf(node, 'label')}
                className="font-headline text-xs font-semibold uppercase tracking-widest text-inverse-on-surface whitespace-nowrap"
              >
                {label}
              </span>
            </li>
          ) : null,
        )}
      </ul>
    </div>
  )
}
