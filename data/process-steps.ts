export const processSteps = [
  {
    title: 'Get Your Price Online',
    body: 'Use the instant estimate tool — 60 seconds, no email needed. See your number first. If it works for your budget, move to step 2.',
    imageSrc: '/process-steps/step-1-measure.webp',
    imageAlt: 'Homeowner using the online estimate tool on a phone',
  },
  {
    title: 'Call When You\'re Ready',
    body: 'Once you\'ve seen your price and decided you want to go ahead, call Tas or send the quote through. No site visits until you\'ve made the call.',
    imageSrc: '/process-steps/step-2-install.webp',
    imageAlt: 'Homeowner calling to book a double glazing installation',
  },
  {
    title: 'We Come Once — and Install',
    body: 'Tas comes to your home, confirms the exact measurements, locks in the final price, and installs the same day. One visit. Done.',
    callout: 'Adds ~20mm to your frame width. We\'ll confirm exact measurements on the day.',
    imageSrc: '/process-steps/step-3-finish.webp',
    imageAlt: 'Glazier completing a retrofit double glazing installation',
  },
] as const

export type ProcessStep = (typeof processSteps)[number]
