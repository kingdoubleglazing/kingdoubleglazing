export const estimateFaq = [
  {
    q: 'How accurate is the estimate?',
    a: 'Within ±10% of the final invoice for standard jobs. The free on-site measure confirms the exact price before any work begins.',
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
