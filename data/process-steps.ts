export const processSteps = [
  {
    title: 'Tell Us About Your Windows',
    body: '60 seconds online or a quick phone call. Window count, suburb, main goal — that\'s all we need.',
    imageSrc: '/process-steps/step-1-measure.webp',
    imageAlt: 'Homeowner answering questions about their windows online',
  },
  {
    title: 'We Measure and Quote',
    body: 'Free home visit. A King glazier measures precisely and gives you a fixed price in writing — no surprises.',
    imageSrc: '/process-steps/step-2-install.webp',
    imageAlt: 'Glazier measuring an existing window frame',
  },
  {
    title: 'We Install in a Day',
    body: 'No mess. No frame damage. Done in a single day. Lifetime warranty from the moment we leave.',
    imageSrc: '/process-steps/step-3-finish.webp',
    imageAlt: 'Glazier completing a retrofit double glazing installation',
  },
] as const

export type ProcessStep = (typeof processSteps)[number]
