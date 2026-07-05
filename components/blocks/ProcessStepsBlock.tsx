import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { tf } from '@/lib/tina'

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
}

export function ProcessStepsBlock({ block }: { block: ProcessStepsBlockData }) {
  const rawSteps = (block.steps ?? []).filter(Boolean)

  const steps = rawSteps.map((step, i) => ({
    id: String(i),
    title: step!.title ?? undefined,
    body: step!.body ?? undefined,
    callout: step!.callout ?? undefined,
    imageSrc: step!.imageSrc ?? undefined,
    imageAlt: step!.imageAlt ?? undefined,
  }))

  const tinaSteps = rawSteps.map(step => ({
    title: tf(step, 'title'),
    body: tf(step, 'body'),
    callout: tf(step, 'callout'),
  }))

  return (
    <ProcessSteps
      steps={steps}
      heading={block.heading ?? undefined}
      subheading={block.subheading ?? undefined}
      cta={block.cta?.label && block.cta?.href ? { label: block.cta.label, href: block.cta.href } : undefined}
      tinaSelf={tf(block)}
      tinaHeading={tf(block, 'heading')}
      tinaSubheading={tf(block, 'subheading')}
      tinaCta={tf(block.cta)}
      tinaSteps={tinaSteps}
    />
  )
}
