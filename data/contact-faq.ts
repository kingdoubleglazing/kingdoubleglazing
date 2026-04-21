export const contactFaq = [
  {
    q: 'How quickly do you respond?',
    a: 'Within one business day for emails and forms. Phone calls answered same day during business hours. Broken glass? Call directly — we aim to dispatch within 2–4 hours in Melbourne.',
  },
  {
    q: 'Do I need a site visit to get a price?',
    a: 'No. Use the Quote Generator to get your price in 60 seconds — no email required to see your number. Call us when you\'ve seen the price and you\'re ready to go ahead. Tas comes to your home once, confirms the exact measurements, and installs the same day.',
  },
  {
    q: 'What areas do you service?',
    a: 'All of metropolitan Melbourne. We work across eastern, northern, and inner-western suburbs. Call us for outer-metro jobs.',
  },
] as const

export type ContactFaqItem = (typeof contactFaq)[number]
