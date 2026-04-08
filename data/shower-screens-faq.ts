export const showerScreensFaq = [
  {
    q: 'How much does a frameless shower screen cost in Melbourne?',
    a: 'Frameless shower screens typically start from around $900–$1,200 for a standard alcove configuration. Semi-frameless options start slightly lower. The final price depends on glass thickness, panel count, door swing, and any custom sizing. Use our Instant Estimate Tool for a transparent itemised price without a site visit.',
  },
  {
    q: "What's the difference between frameless and semi-frameless?",
    a: 'Frameless screens use 10 mm toughened safety glass with minimal hardware — hinges and a handle, no visible frame around the glass panels. Semi-frameless screens use 6–8 mm glass with a slim aluminium channel along the top and sides but no full frame. Frameless is the premium, minimal look; semi-frameless is a practical mid-range option that costs less and tolerates slight wall variations better.',
  },
  {
    q: 'How long does installation take?',
    a: 'Most standard shower screen installations are completed in 2–3 hours. Custom configurations or larger walk-in enclosures may take half a day. In all cases we aim to leave the room usable by the end of the visit.',
  },
  {
    q: 'Do frameless shower screens leak?',
    a: 'When correctly measured and installed, frameless shower screens do not leak. The base channel is sealed and door seals run the full height of any door panel. Leaking is almost always caused by poor installation or incorrect silicone application — not the screen itself.',
  },
  {
    q: 'What glass thickness is used?',
    a: 'Our frameless screens use 10 mm toughened safety glass — the industry standard for frameless configurations. Semi-frameless screens typically use 6 mm toughened glass. Both meet AS/NZS 2208 Australian safety glass standards.',
  },
  {
    q: 'Do you offer custom sizes?',
    a: 'Yes. Every screen we supply is cut to measure. If your bathroom has non-standard dimensions, sloped ceilings, or return panels, we accommodate them. There is no premium for custom sizing — it is included in the quoted price.',
  },
  {
    q: 'How do I clean a frameless shower screen?',
    a: 'Wipe down after each use with a squeegee to prevent water spots. For deeper cleaning, a diluted white vinegar solution removes mineral buildup without damaging the glass or seals. Avoid abrasive cleaners. Frameless screens are significantly easier to clean than framed alternatives because there are no metal tracks to scrub.',
  },
  {
    q: 'Can you replace an existing shower screen without retiling?',
    a: 'In most cases, yes. We measure from existing wall surfaces and design around them. Retiling is only required if the original screen was significantly inset into the tiles or structural changes are needed. We will advise clearly at measure stage if retiling is needed.',
  },
] as const

export type ShowerScreenFaqItem = (typeof showerScreensFaq)[number]
