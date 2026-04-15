import { buildFaqSchema } from '@/lib/seo/schema/faqPage'

// FAQ data for JSON-LD schema injection (uses { question, answer } format).
// These are separate from rendered FAQ component data (which uses { q, a }).

type FAQ = { question: string; answer: string }

export const retrofitFaqs: FAQ[] = [
  {
    question: 'How much does retrofit double glazing cost in Melbourne?',
    answer: 'Most Melbourne homes pay from $595 per square metre for retrofit double glazing, depending on glass type, frame condition, and access. Full window replacement typically costs 30–50% more.',
  },
  {
    question: 'Is retrofit double glazing cheaper than replacing windows?',
    answer: 'Yes. Because we reuse your existing frames, retrofit double glazing avoids structural work and usually costs 30–50% less than a full window replacement.',
  },
  {
    question: 'Does retrofit double glazing work on old timber frames?',
    answer: "Yes — retrofit is specifically designed for existing frames including single-glazed timber, aluminium, and steel windows common in Melbourne's older homes.",
  },
  {
    question: 'Will it reduce tram and traffic noise?',
    answer: 'Retrofit acoustic double glazing significantly reduces low-frequency traffic and tram noise. We recommend our acoustic glass option for homes near Melbourne trams or arterials.',
  },
  {
    question: 'How long does retrofit double glazing installation take?',
    answer: 'Most homes are completed in one day. We work room by room to minimise disruption.',
  },
  {
    question: 'Is there a government rebate for double glazing in Melbourne?',
    answer: 'The Victorian Energy Upgrades (VEU) program may offer incentives for energy-efficient glazing upgrades. We recommend checking the VEU scheme for current eligibility.',
  },
  {
    question: 'What is the warranty on retrofit double glazing?',
    answer: 'We offer a 10-year warranty on all retrofit double glazing installations, covering glass and workmanship with no conditions or fine print.',
  },
  {
    question: 'Can you beat a competitor quote on double glazing?',
    answer: 'Yes — we will beat any genuine, like-for-like written competitor quote by at least 30%, guaranteed in writing with the same 10-year warranty.',
  },
]

export const emergencyFaqs: FAQ[] = [
  {
    question: 'Do you do 24/7 emergency glass repair in Melbourne?',
    answer: 'Yes. We provide emergency glass repair and board-up services across Melbourne, available 24 hours.',
  },
  {
    question: 'How quickly can you respond to a broken window in Melbourne?',
    answer: 'We aim to respond within 2–4 hours for emergency calls across inner Melbourne suburbs.',
  },
  {
    question: 'What types of glass do you repair?',
    answer: 'We repair all residential and commercial glass including single pane, double glazed units, shower screens, and shopfront glass.',
  },
  {
    question: 'Do you provide temporary board-up for broken windows?',
    answer: 'Yes — if glass cannot be replaced immediately, we provide secure temporary board-up to protect your property.',
  },
  {
    question: 'Is emergency glass repair covered by home insurance?',
    answer: 'Most home and contents policies cover accidental glass breakage. We can provide documentation to support your claim.',
  },
]

export const generalFaqs: FAQ[] = [
  {
    question: 'Do you really beat competitor quotes by 30%?',
    answer: "Yes — send us a genuine, like-for-like written competitor quote and we'll come in at least 30% cheaper, guaranteed in writing with the same 10-year warranty on glass and workmanship.",
  },
  {
    question: 'What warranty does King Double Glazing offer?',
    answer: 'We offer a 10-year warranty on all retrofit double glazing installations, covering glass and workmanship. No conditions, no fine print.',
  },
  {
    question: 'Who is Tas Markou and why does that matter?',
    answer: 'Tas Markou is the founder of King Double Glazing. He learned the trade from his father, a Melbourne glazier, and built a commercial glazing business with 40+ staff at peak. Unlike large glazing companies, Tas is personally involved in every quote.',
  },
  {
    question: 'How is King Double Glazing different from other Melbourne glaziers?',
    answer: 'King Double Glazing was built specifically to offer retrofit double glazing at transparent, honest prices. We beat any genuine competitor quote by 30%, with no call centres, no hidden fees, and no high-pressure sales.',
  },
]

export function getFAQSchema(page: 'retrofit' | 'emergency' | 'general') {
  const map = {
    retrofit: retrofitFaqs,
    emergency: emergencyFaqs,
    general: generalFaqs,
  }
  return buildFaqSchema(map[page])
}
