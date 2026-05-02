'use client'

import { useEffect } from 'react'
import { useTina, tinaField } from 'tinacms/dist/react'
import { BlockRenderer } from '@/components/blocks/BlockRenderer'
import type { PricingOption } from '@/lib/types'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TinaPageResult = { data: any; query: string; variables: any }
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyBlock = Record<string, any>

function sf(obj: object, field: string): string | undefined {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  try { return (tinaField as (o: any, f: any) => string)(obj, field) || undefined } catch { return undefined }
}

function blockTemplate(block: AnyBlock): string {
  if (block._template) return block._template as string
  if (block.__typename) {
    return (block.__typename as string)
      .replace(/^PageBlocks/, '')
      .replace(/^[A-Z]/, (c: string) => c.toLowerCase())
  }
  return ''
}

function augmentBlocks(blocks: AnyBlock[]): AnyBlock[] {
  return (blocks ?? []).map(block => {
    if (!block) return block
    const t = blockTemplate(block)
    switch (t) {
      case 'hero':
        return { ...block, tina: { badge: sf(block, 'badge'), headlineWhite: sf(block, 'headlineWhite'), headlineYellow: sf(block, 'headlineYellow'), subtext: sf(block, 'subtext'), adaptorCaption: sf(block, 'adaptorCaption'), primaryCta: block.primaryCta ? { label: sf(block.primaryCta, 'label'), href: sf(block.primaryCta, 'href') } : undefined, secondaryCta: block.secondaryCta ? { label: sf(block.secondaryCta, 'label'), href: sf(block.secondaryCta, 'href') } : undefined } }
      case 'whyRetrofit':
        return { ...block, tina: { eyebrow: sf(block, 'eyebrow'), heading1: sf(block, 'heading1'), heading2: sf(block, 'heading2'), items: ((block.items as AnyBlock[]) ?? []).map((item: AnyBlock) => item ? { headline: sf(item, 'headline'), sub: sf(item, 'sub') } : undefined) } }
      case 'processSteps':
        return { ...block, tina: { heading: sf(block, 'heading'), subheading: sf(block, 'subheading'), ctaRef: sf(block, 'cta'), cta: block.cta ? { label: sf(block.cta, 'label'), href: sf(block.cta, 'href') } : undefined, steps: ((block.steps as AnyBlock[]) ?? []).map((step: AnyBlock) => step ? { title: sf(step, 'title'), body: sf(step, 'body'), callout: sf(step, 'callout') } : undefined) } }
      case 'estimateCta':
        return { ...block, tina: { headline: sf(block, 'headline'), subtext: sf(block, 'subtext'), cta: block.cta ? { label: sf(block.cta, 'label'), href: sf(block.cta, 'href') } : undefined, caption: sf(block, 'caption') } }
      case 'faq':
        return { ...block, tina: { heading: sf(block, 'heading'), subheading: sf(block, 'subheading'), faqs: ((block.faqs as AnyBlock[]) ?? []).map((faq: AnyBlock) => faq ? { q: sf(faq, 'q'), a: sf(faq, 'a') } : undefined) } }
      case 'serviceSection':
        return { ...block, tina: { eyebrow: sf(block, 'eyebrow'), heading: sf(block, 'heading'), bodyText: sf(block, 'bodyText'), bullets: sf(block, 'bullets'), primaryCta: block.primaryCta ? { label: sf(block.primaryCta, 'label'), href: sf(block.primaryCta, 'href') } : undefined, secondaryCta: block.secondaryCta ? { label: sf(block.secondaryCta, 'label'), href: sf(block.secondaryCta, 'href') } : undefined } }
      case 'storyWithStats':
        return { ...block, tina: { eyebrow: sf(block, 'eyebrow'), paragraphs: sf(block, 'paragraphs'), quote: sf(block, 'quote'), stats: ((block.stats as AnyBlock[]) ?? []).map((stat: AnyBlock) => stat ? { value: sf(stat, 'value'), label: sf(stat, 'label') } : undefined) } }
      case 'warrantyCoverage':
        return { ...block, tina: { coveredEyebrow: sf(block, 'coveredEyebrow'), coveredHeading: sf(block, 'coveredHeading'), notCoveredEyebrow: sf(block, 'notCoveredEyebrow'), notCoveredHeading: sf(block, 'notCoveredHeading'), claimEyebrow: sf(block, 'claimEyebrow'), coveredItems: ((block.coveredItems as AnyBlock[]) ?? []).map((item: AnyBlock) => item ? { item: sf(item, 'item'), detail: sf(item, 'detail') } : undefined), notCoveredItems: ((block.notCoveredItems as AnyBlock[]) ?? []).map((item: AnyBlock) => item ? { item: sf(item, 'item'), detail: sf(item, 'detail') } : undefined), claimSteps: sf(block, 'claimSteps') } }
      case 'contactForm':
        return { ...block, tina: { heading: sf(block, 'heading') } }
      case 'ctaBanner':
        return { ...block, tina: { heading: sf(block, 'heading'), subtext: sf(block, 'subtext'), primaryCta: block.primaryCta ? { label: sf(block.primaryCta, 'label'), href: sf(block.primaryCta, 'href') } : undefined, secondaryCta: { label: block.secondaryCta ? sf(block.secondaryCta, 'label') : sf(block, 'secondaryCta'), href: block.secondaryCta ? sf(block.secondaryCta, 'href') : undefined }, trustItems: sf(block, 'trustItems') } }
      case 'trustBar':
        return { ...block, tina: { items: ((block.items as AnyBlock[]) ?? []).map((item: AnyBlock) => item ? { iconKey: sf(item, 'iconKey'), label: sf(item, 'label') } : undefined) } }
      case 'contactCards':
        return { ...block, tina: { phoneSublabel: sf(block, 'phoneSublabel'), emailSublabel: sf(block, 'emailSublabel'), serviceAreaLabel: sf(block, 'serviceAreaLabel'), serviceAreaValue: sf(block, 'serviceAreaValue'), areaSublabel: sf(block, 'areaSublabel'), emergencyLabel: sf(block, 'emergencyLabel'), emergencyValue: sf(block, 'emergencyValue'), emergencySublabel: sf(block, 'emergencySublabel') } }
      case 'glassTechSpecs':
        return { ...block, tina: { eyebrow: sf(block, 'eyebrow'), heading: sf(block, 'heading'), description: sf(block, 'description') } }
      case 'adaptorDisclosure':
        return { ...block, tina: { heading: sf(block, 'heading'), mobileSubtitle: sf(block, 'mobileSubtitle'), body1: sf(block, 'body1'), body2: sf(block, 'body2') } }
      case 'paymentTerms':
        return { ...block, tina: { eyebrow: sf(block, 'eyebrow'), heading: sf(block, 'heading'), depositTitle: sf(block, 'depositTitle'), depositBody: sf(block, 'depositBody'), completionTitle: sf(block, 'completionTitle'), completionBody: sf(block, 'completionBody'), warrantyTitle: sf(block, 'warrantyTitle'), warrantyBody: sf(block, 'warrantyBody') } }
      case 'freeAdvice':
        return { ...block, tina: { eyebrow: sf(block, 'eyebrow'), headingLine1: sf(block, 'headingLine1'), headingLine2: sf(block, 'headingLine2'), body: sf(block, 'body'), buttonLabel: sf(block, 'buttonLabel') } }
      case 'whatElseStrip':
        return { ...block, tina: { eyebrow: sf(block, 'eyebrow'), heading: sf(block, 'heading'), cta: block.cta ? { label: sf(block.cta, 'label'), href: sf(block.cta, 'href') } : undefined, services: ((block.services as AnyBlock[]) ?? []).map((s: AnyBlock) => s ? { label: sf(s, 'label'), href: sf(s, 'href') } : undefined) } }
      case 'emergencyStrip':
        return { ...block, tina: { boldText: sf(block, 'boldText'), text: sf(block, 'text'), cta: block.cta ? { label: sf(block.cta, 'label'), href: sf(block.cta, 'href') } : undefined } }
      default:
        return block
    }
  })
}

export function PageClient({
  tinaPage,
  pricingOptions,
}: {
  tinaPage: TinaPageResult
  pricingOptions?: PricingOption[]
}) {
  const { data } = useTina(tinaPage)
  const blocks = augmentBlocks(data?.page?.blocks ?? [])

  // TinaCMS race condition fix: the admin sends "quickEditEnabled" on sidebar open,
  // but the iframe may not be loaded yet. After React commits to the DOM (so
  // data-tina-field attributes exist), proactively send "quick-edit" to the admin,
  // which causes it to reply with "quickEditEnabled: true" and enable hover outlines.
  useEffect(() => {
    if (typeof window === 'undefined' || window === window.parent) return
    if (document.querySelector('[data-tina-field]')) {
      window.parent.postMessage({ type: 'quick-edit', value: true }, window.location.origin)
    }
  }, [blocks])

  return <BlockRenderer blocks={blocks} pricingOptions={pricingOptions} />
}
