export const homepageFaq = [
  {
    q: 'Will this fit my existing windows?',
    a: 'Almost always yes. We retrofit timber, aluminium, and steel frames. If your frames can\'t take a retrofit, we\'ll tell you during the free home visit — no charge.',
  },
  {
    q: 'How long does it take?',
    a: 'Most jobs are done in a single day. Large homes might take two.',
  },
  {
    q: 'How much does it cost?',
    a: 'Most Melbourne homes land between $2,400 and $6,000 depending on how many windows you upgrade. Use our Instant Estimate to get your exact range in 60 seconds.',
  },
  {
    q: 'What\'s the warranty?',
    a: 'Lifetime, no strings attached. Same warranty we\'ve offered for 50+ years combined experience.',
  },
  {
    q: 'What if I already have a quote from someone else?',
    a: 'Send it to us. If it\'s a genuine quote, we\'ll beat it by 30% — guaranteed in writing.',
  },
] as const

export type HomepageFaqItem = (typeof homepageFaq)[number]
