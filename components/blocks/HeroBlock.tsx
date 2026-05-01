import { HeroOverlay } from './HeroOverlay'
import { HeroSplit } from './HeroSplit'
import { HeroCentered } from './HeroCentered'

export interface HeroBlockData {
  __typename?: string
  variant?: string | null
  badge?: string | null
  headlineWhite?: string | null
  headlineYellow?: string | null
  subtext?: string | null
  primaryCta?: { label?: string | null; href?: string | null } | null
  secondaryCta?: { label?: string | null; href?: string | null } | null
  imageSrc?: string | null
  imageAlt?: string | null
  showWarrantyBadge?: boolean | null
  adaptorCaption?: string | null
  accentWord?: string | null
  tina?: {
    badge?: string
    headlineWhite?: string
    headlineYellow?: string
    subtext?: string
    adaptorCaption?: string
    primaryCta?: { label?: string; href?: string }
    secondaryCta?: { label?: string; href?: string }
  }
}

export function HeroBlock({ block }: { block: HeroBlockData }) {
  const variant = block.variant ?? 'overlay'
  if (variant === 'split') return <HeroSplit block={block} />
  if (variant === 'centered') return <HeroCentered block={block} />
  return <HeroOverlay block={block} />
}
