import { ProcessSteps } from '@/components/sections/ProcessSteps'

export interface ProcessStepsBlockData {
  __typename?: string
  steps?: Array<{
    __typename?: string
    title?: string | null
    body?: string | null
    callout?: string | null
    imageSrc?: string | null
    imageAlt?: string | null
  } | null> | null
  tina?: {
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

  return <ProcessSteps steps={steps} tinaFields={block.tina?.steps} />
}
