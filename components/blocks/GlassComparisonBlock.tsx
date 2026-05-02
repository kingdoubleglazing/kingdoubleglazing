import { Suspense } from 'react'
import { GlassComparisonTable } from '@/components/sections/GlassComparisonTable'
import { getSiteSettings } from '@/lib/site-settings'
import type { PricingOption } from '@/lib/types'

export interface GlassComparisonBlockData {
  __typename?: string
  pricingOptions?: PricingOption[]
  eyebrow?: string | null
  heading?: string | null
  subtext?: string | null
  secondStoreySurcharge?: number | null
  // Card labels
  quieterLabel?: string | null
  lessHeatLabel?: string | null
  getMyPriceLabel?: string | null
  selectedLabel?: string | null
  specLinkLabel?: string | null
  // Pre-selection hints
  pressHint?: string | null
  eastWestBold?: string | null
  eastWestBody?: string | null
  comparisonNote?: string | null
  // Step 1
  step1Label?: string | null
  step1Heading?: string | null
  measureInstruction?: string | null
  measureNote?: string | null
  addWindowLabel?: string | null
  changeLabel?: string | null
  // Step 2
  step2Label?: string | null
  yourQuoteLabel?: string | null
  noMeasurementsHint?: string | null
  accuracyNote?: string | null
  measurementOffNote?: string | null
  budgetPrompt?: string | null
  sendQuoteLabel?: string | null
  // Modal — form
  dialogTitle?: string | null
  dialogDescription?: string | null
  modalQuoteSummaryLabel?: string | null
  modalSubmitLabel?: string | null
  modalSendingLabel?: string | null
  modalErrorMessage?: string | null
  // Modal — success
  successEyebrow?: string | null
  successTitle?: string | null
  successBody?: string | null
  startNewQuoteLabel?: string | null
}

export function GlassComparisonBlock({ pricingOptions = [], block }: { pricingOptions?: PricingOption[]; block?: GlassComparisonBlockData }) {
  const settings = getSiteSettings()

  return (
    <Suspense fallback={<div className="bg-surface-container-low h-96" />}>
      <GlassComparisonTable
        options={pricingOptions}
        secondStoreySurcharge={block?.secondStoreySurcharge ?? 150}
        phone={settings.phone}
        phoneHref={settings.phoneHref}
        eyebrow={block?.eyebrow}
        heading={block?.heading}
        subtext={block?.subtext}
        quieterLabel={block?.quieterLabel}
        lessHeatLabel={block?.lessHeatLabel}
        getMyPriceLabel={block?.getMyPriceLabel}
        selectedLabel={block?.selectedLabel}
        specLinkLabel={block?.specLinkLabel}
        pressHint={block?.pressHint}
        eastWestBold={block?.eastWestBold}
        eastWestBody={block?.eastWestBody}
        comparisonNote={block?.comparisonNote}
        step1Label={block?.step1Label}
        step1Heading={block?.step1Heading}
        measureInstruction={block?.measureInstruction}
        measureNote={block?.measureNote}
        addWindowLabel={block?.addWindowLabel}
        changeLabel={block?.changeLabel}
        step2Label={block?.step2Label}
        yourQuoteLabel={block?.yourQuoteLabel}
        noMeasurementsHint={block?.noMeasurementsHint}
        accuracyNote={block?.accuracyNote}
        measurementOffNote={block?.measurementOffNote}
        budgetPrompt={block?.budgetPrompt}
        sendQuoteLabel={block?.sendQuoteLabel}
        dialogTitle={block?.dialogTitle}
        dialogDescription={block?.dialogDescription}
        modalQuoteSummaryLabel={block?.modalQuoteSummaryLabel}
        modalSubmitLabel={block?.modalSubmitLabel}
        modalSendingLabel={block?.modalSendingLabel}
        modalErrorMessage={block?.modalErrorMessage}
        successEyebrow={block?.successEyebrow}
        successTitle={block?.successTitle}
        successBody={block?.successBody}
        startNewQuoteLabel={block?.startNewQuoteLabel}
      />
    </Suspense>
  )
}
