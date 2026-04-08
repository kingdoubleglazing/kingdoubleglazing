export const contactFaq = [
  {
    q: 'How quickly do you respond to enquiries?',
    a: 'Within one business day for form submissions and email. Phone calls are answered during business hours (Mon–Fri 8am–5pm). For broken glass emergencies, call directly — we aim to have a technician on site within 2–4 hours in metropolitan Melbourne.',
  },
  {
    q: 'Do I need a site visit before getting a price?',
    a: "No. Use the Instant Estimate Tool for a ballpark figure in 60 seconds — accurate within ±10%, no email required to see the number. A King technician then does a free on-site measure to confirm dimensions and issue a binding written quote. The site visit only happens when you're ready to proceed.",
  },
  {
    q: 'What areas do you service?',
    a: "All of metropolitan Melbourne and inner suburbs. We regularly work in the eastern, northern, and inner-western suburbs. For outer metro and regional jobs, contact us and we'll confirm availability — larger jobs are always worth discussing.",
  },
  {
    q: 'Is a site visit really free?',
    a: "Yes, no conditions. We measure, advise on glass type and specification, and provide a written quote at no cost. There's no obligation to proceed and no follow-up pressure — the quote is valid for 30 days.",
  },
  {
    q: 'Can I get a quote for just one window?',
    a: "Yes. There's no minimum order. Many customers start with a single problem window — usually the noisiest bedroom or the hottest west-facing room — and add more later. Pricing is the same per m² regardless of quantity, though larger jobs may qualify for project pricing.",
  },
  {
    q: 'What information is helpful to have ready?',
    a: 'Approximate window count, whether windows are single or sliding, which floor they're on, and any specific concern (noise, heat, drafts). Photos via email or WhatsApp are useful. If you don\'t have measurements, that\'s fine — the free measure-up handles that.',
  },
] as const

export type ContactFaqItem = (typeof contactFaq)[number]
