import { ProcessSteps } from '@/components/sections/ProcessSteps'

export interface ProcessStepsBlockData {
  __typename?: string
  heading?: string | null
  subheading?: string | null
  cta?: { label?: string | null; href?: string | null } | null
  steps?: Array<{
    __typename?: string
    title?: string | null
    body?: string | null
    callout?: string | null
    imageSrc?: string | null
    imageAlt?: string | null
  } | null> | null
  tina?: {
    heading?: string
    subheading?: string
    ctaRef?: string
    cta?: { label?: string; href?: string }
    steps?: Array<{ title?: string; body?: string; callout?: string } | undefined>
  }
}

export function ProcessStepsBlock({ block }: { block: ProcessStepsBlockData }) {
  const steps = (block.steps ?? [])
    .filter(Boolean)
    .map((step, i) => ({
      id: String(i),
      title: step!.title ?? '',
      body: step!.body ?? '',
      callout: step!.callout ?? undefined,
      imageSrc: step!.imageSrc ?? undefined,
      imageAlt: step!.imageAlt ?? undefined,
      order: i,
    }))

  return (
    <ProcessSteps
      steps={steps}
      heading={block.heading ?? undefined}
      subheading={block.subheading ?? undefined}
      cta={block.cta?.label && block.cta?.href ? { label: block.cta.label, href: block.cta.href } : undefined}
      tinaFields={block.tina}
    />
  )
}
