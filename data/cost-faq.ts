export const costFaq = [
  {
    q: 'What does double glazing actually cost in Melbourne?',
    a: 'Retrofit double glazing starts from $495/m² for standard clear units. A typical Melbourne home with 8–12 windows (roughly 20–28 m² of glass area) runs $6,000–$12,000 fully installed. That includes measure, glass, installation, and cleanup — no separate labour line. Use the Instant Estimate tool to get a number specific to your windows in 60 seconds.',
  },
  {
    q: "What's included in the price per m²?",
    a: 'Everything. The per-m² rate covers the factory-sealed double-glazed unit, on-site measure and confirmation, professional installation into your existing frame, safe disposal of the old glass, and a written 10-year warranty. There are no separate labour charges, no rubbish removal fees, and no callout surcharges within metropolitan Melbourne.',
  },
  {
    q: 'Why is retrofit cheaper than full window replacement?',
    a: "Full window replacement means new frames, new reveals, plastering, painting, and often council notification — plus the window unit itself. Retrofit eliminates all of that. You're paying only for the glass upgrade. The saving is typically $500–$800 per m², or $10,000–$20,000 on a full home job, while achieving identical thermal and acoustic performance.",
  },
  {
    q: 'Are there government rebates that reduce the cost?',
    a: "Yes. Retrofit double glazing qualifies for the Victorian Energy Upgrades (VEU) program. Depending on your home's heating zone and the glass specification, the rebate typically offsets $300–$900 on a standard home job. We lodge the paperwork on your behalf — you receive a reduced invoice, not a rebate you have to chase yourself.",
  },
  {
    q: 'How does the glass type affect the final price?',
    a: 'Standard clear double glazing starts at $495/m². Upgrading to Tinted Low-E adds roughly $100/m², Acoustic Laminated adds ~$150/m², and Triple Glazed adds ~$300/m². For a 20 m² home that difference is $2,000–$6,000 between entry and premium tiers. The Instant Estimate tool shows you the exact cost for each tier side-by-side.',
  },
  {
    q: 'Can I get a quote without a sales visit?',
    a: "Yes — that's the point. Enter your window dimensions into the Instant Estimate tool and you get a transparent, itemised price immediately. No sales call, no site visit required to see a number. A King technician reviews your submission and confirms the quote within 24 hours. A physical measure-up only happens once you've decided to proceed.",
  },
  {
    q: 'Is the quoted price the price I actually pay?',
    a: "Yes. The written quote is the invoice — it's contractually binding. We've never issued a variation after the fact for a standard retrofit job. The only scenario where a price changes is if on-site measure-up reveals a frame that can't accept a standard unit (very rare), in which case we notify you before ordering glass. No surprises at invoice is a founding principle, not a marketing line.",
  },
  {
    q: 'Can I do one room first and add more later?',
    a: "Absolutely. There's no minimum order. Many customers start with the worst room — typically a west-facing bedroom or a street-facing living room — and add the rest 6–12 months later once they've experienced the difference. Prices per m² are the same regardless of quantity, though larger jobs qualify for project pricing that brings the per-m² rate down.",
  },
  {
    q: 'What affects the cost besides glass type?',
    a: 'Frame condition (very deteriorated frames may need remediation before glazing), window accessibility (upper-storey windows with no balcony access require scaffolding, billed separately), and window size (very large panes require two-person installation). All of these are identified at quote stage — never after the job has started.',
  },
  {
    q: 'Is double glazing worth the cost in Melbourne?',
    a: "For most Melbourne homes: yes, within 5–8 years through energy savings alone. The VEU rebate shortens that to 4–6 years on eligible properties. But energy savings are only part of the equation — the comfort improvement in Melbourne's shoulder seasons (7-month heating and cooling period) and the acoustic improvement near traffic are immediate, not deferred. Resale value studies consistently show double glazing adds more than its cost to property value in Melbourne's inner suburbs.",
  },
] as const

export type CostFaqItem = (typeof costFaq)[number]
