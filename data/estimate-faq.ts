export const estimateFaq = [
  {
    q: 'How accurate is the online price?',
    a: 'Within about 10%, as long as your inputs are correct. We price retrofit jobs the same way every time — there\'s no margin padding or sales markup. When we visit your home for final measurements, the number rarely moves by more than 10%.',
  },
  {
    q: 'Why do I need to price myself first?',
    a: 'We keep our prices low by running lean. The calculator means no sales visits, no chasing, and no time wasted on either side. You see the price. If it works, we move forward. If not, we don\'t chase.',
  },
  {
    q: 'What about the deposit?',
    a: 'We ask for a 50% deposit to start fabrication — your glass is custom-made for your exact windows. The remaining 50% is due once materials are ready and your install is scheduled. No surprise fees.',
  },
  {
    q: 'Will the adaptor change how my window looks?',
    a: 'Our adaptor adds about 20mm to your existing frame width — so a 40mm frame becomes around 60mm. This is how we fit insulated glass into your existing frames without replacing them. Most customers don\'t notice the difference after install, and it saves you thousands compared to full replacement.',
  },
  {
    q: 'What\'s covered by the warranty?',
    a: 'Our 10-year warranty covers the glass unit, the seals, and our workmanship. If anything fails within that time, we come back and fix it — no charge.',
  },
  {
    q: 'How long from quote to install?',
    a: 'Once your deposit is in, fabrication typically takes 2–3 weeks. We\'ll confirm your install date as soon as materials are ready.',
  },
  {
    q: 'What if I want changes after install?',
    a: 'We stand behind our workmanship. Any installation-related adjustments are typically handled within 2–3 weeks.',
  },
  {
    q: 'Do I have to give my email to see the estimate?',
    a: 'No. Your estimate appears the moment you finish the 4 steps — no email, no phone number, no obligation. You can optionally share contact details to get a formal written quote.',
  },
  {
    q: 'Does the estimate include installation?',
    a: 'Yes. Every estimate includes glass, installation, frame preparation, rubbish removal, and 10-year warranty. No hidden extras.',
  },
  {
    q: 'What if I already have a quote from someone else?',
    a: 'Send it to us. If it\'s a genuine quote, we\'ll beat it by 30% — guaranteed in writing, same 10-year warranty.',
  },
  {
    q: 'How do I go from estimate to installed windows?',
    a: 'Book a free on-site check. A King glazier measures precisely and issues a binding written quote. Once you approve, we install within 2–3 weeks.',
  },
] as const

export type EstimateFaqItem = (typeof estimateFaq)[number]
