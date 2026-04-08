export const processSteps = [
  {
    title: 'Measure Online',
    body: 'Enter your window dimensions into our Instant Estimate Tool. Get a transparent price in 60 seconds — no site visit required.',
    imageSrc: '/process-steps/step-1-measure.webp',
    imageAlt: 'Hands using a laser tape measure on an existing window frame',
  },
  {
    title: 'Confirm Your Quote',
    body: 'A King technician reviews your submission. You receive an itemised quote within 24 hours. No vague estimates, no pressure.',
    imageSrc: '/process-steps/step-2-install.webp',
    imageAlt: 'Glazier carefully lifting a double-glazed unit into a window frame',
  },
  {
    title: 'We Install',
    body: 'Our crew fits new double-glazed units directly into your existing frames. One day. No structural work. No mess.',
    imageSrc: '/process-steps/step-3-finish.webp',
    imageAlt: "Glazier peeling protective film from a finished double-glazed window",
  },
  {
    title: 'You Save',
    body: 'Lower energy bills from day one. Quieter rooms. Government rebate paperwork handled by us.',
    imageSrc: '/process-steps/step-3-finish.webp',
    imageAlt: 'Crystal-clear double-glazed window in a Melbourne home after installation',
  },
] as const

export type ProcessStep = (typeof processSteps)[number]
