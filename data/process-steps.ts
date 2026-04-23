export const processSteps = [
  {
    title: 'Request a Quote',
    body: 'Fill out our online quote form with your measurements and requirements.',
    imageSrc: '/process-steps/step-1-measure.webp',
    imageAlt: 'Homeowner using the online estimate tool on a phone',
  },
  {
    title: 'Review & Proceed',
    body: "If you're happy with the estimate, simply email your quote through to us to proceed.",
    imageSrc: '/stock/window-house.webp',
    imageAlt: 'Homeowner reviewing a double glazing quote online',
  },
  {
    title: 'Site Visit',
    body: "We'll contact you to arrange a convenient time for a site inspection and final measure.",
    imageSrc: '/process-steps/step-2-install.webp',
    imageAlt: 'Glazier conducting a site inspection and measuring windows',
  },
  {
    title: 'Final Confirmation',
    body: "Once all sizes are confirmed, we'll lock everything in and schedule your installation.",
    callout: 'Adds ~20mm to your frame width. We\'ll confirm exact measurements on site.',
    imageSrc: '/process-steps/step-3-finish.webp',
    imageAlt: 'Glazier completing a retrofit double glazing installation',
  },
] as const

export type ProcessStep = (typeof processSteps)[number]
