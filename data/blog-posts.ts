export type BlogCategory =
  | 'retrofit'
  | 'pricing'
  | 'acoustic'
  | 'energy'
  | 'heritage'
  | 'glass-types'

export const BLOG_CATEGORIES: { value: BlogCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All Posts' },
  { value: 'retrofit', label: 'Retrofit' },
  { value: 'pricing', label: 'Pricing' },
  { value: 'acoustic', label: 'Acoustic' },
  { value: 'energy', label: 'Energy' },
  { value: 'heritage', label: 'Heritage' },
  { value: 'glass-types', label: 'Glass Types' },
]

export interface InternalLink {
  label: string
  href: string
}

export interface FaqItem {
  q: string
  a: string
}

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: BlogCategory
  datePublished: string // ISO 8601
  dateModified?: string // ISO 8601
  readTime: number // minutes
  /** Primary service page this post leads to */
  primaryService: InternalLink
  /** 2+ related service pages for internal linking */
  relatedServices: InternalLink[]
  /** Slugs of 1–2 related blog posts */
  relatedPosts: string[]
  /** Optional FAQ items — renders FAQPage schema + FAQ section */
  faqItems?: FaqItem[]
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'is-retrofit-double-glazing-worth-it',
    title: "Is Retrofit Double Glazing Worth It? A Melbourne Homeowner's Assessment",
    excerpt:
      'Retrofit costs, thermal payback, resale uplift, and noise reduction — all the numbers without the sales pitch.',
    category: 'retrofit',
    datePublished: '2026-03-15',
    readTime: 8,
    primaryService: { label: 'Retrofit Double Glazing Melbourne', href: '/double-glazing/' },
    relatedServices: [
      { label: 'Double Glazing Cost', href: '/double-glazing/cost/' },
      { label: 'Energy Efficient Windows', href: '/double-glazing/energy-efficient-windows/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['double-glazing-cost-per-m2-australia', 'retrofit-vs-full-window-replacement'],
    faqItems: [
      {
        q: 'How much does retrofit double glazing cost in Melbourne?',
        a: 'Retrofit double glazing starts from $495/m² for standard clear glass IGUs. Acoustic laminated glass runs $650–$850/m² and Low-E glass $580–$720/m². The easiest way to price your specific windows is the Instant Estimate tool — no sales call required.',
      },
      {
        q: 'How long does the thermal payback take?',
        a: 'For Melbourne homes, most homeowners report a noticeable reduction in heating and cooling costs within the first winter. Full cost recovery through energy savings typically takes 8–14 years depending on glass specification, home size, and current energy prices.',
      },
      {
        q: 'Does retrofit double glazing add value to my home?',
        a: 'Australian real estate research indicates double glazing can add 3–8% to property value. For a $900,000 home, that is $27,000–$72,000 — vastly exceeding the typical retrofit investment of $6,000–$15,000 for a whole-home job.',
      },
      {
        q: 'Can I retrofit double glazing to my existing timber windows?',
        a: 'Yes. Timber frames are ideal for retrofit — they typically have sufficient rebate depth to accept an IGU without structural modification. Heritage homes and period properties are some of our most common retrofit jobs.',
      },
    ],
  },
  {
    slug: 'double-glazing-cost-per-m2-australia',
    title: 'Double Glazing Cost per m² in Australia: What You Should Actually Pay',
    excerpt:
      'A no-nonsense breakdown of real pricing for retrofit double glazing, from standard IGUs to acoustic and Low-E glass.',
    category: 'pricing',
    datePublished: '2026-03-08',
    readTime: 6,
    primaryService: { label: 'Double Glazing Cost & Pricing', href: '/double-glazing/cost/' },
    relatedServices: [
      { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
      { label: 'Glass Types Guide', href: '/double-glazing/glass-types/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['is-retrofit-double-glazing-worth-it', 'double-glazing-glass-types-guide'],
    faqItems: [
      {
        q: 'What is a fair price per m² for retrofit double glazing?',
        a: 'Standard clear glass IGUs: $495–$580/m². Low-E glass: $580–$720/m². Acoustic laminated glass: $650–$850/m². These are supply-and-install prices for retrofit into existing frames. Higher quotes likely include margin padding — use an itemised quote to check.',
      },
      {
        q: 'Why do quotes vary so much between glaziers?',
        a: 'Margin, not cost. The glass and installation labour cost is relatively predictable. What varies is the margin applied. Ask for an itemised quote broken down by glass type, panel count, and installation. If a glazier refuses to itemise, that tells you something.',
      },
      {
        q: 'Is there a cheaper way to get double glazing?',
        a: 'Retrofit into existing frames is the most cost-effective path. Full window replacement costs 2–3× more for equivalent thermal performance. Secondary glazing (a second pane added inside) is cheaper but performs significantly worse.',
      },
    ],
  },
  {
    slug: 'best-glass-for-noise-reduction-melbourne',
    title: 'Best Glass for Noise Reduction: Acoustic Laminated vs Standard Double Glazing',
    excerpt:
      'Rw ratings explained, real-world decibel reductions, and which glass type is right for traffic, tram, and aircraft noise.',
    category: 'acoustic',
    datePublished: '2026-02-22',
    readTime: 7,
    primaryService: { label: 'Soundproof Windows Melbourne', href: '/double-glazing/soundproof-windows/' },
    relatedServices: [
      { label: 'Glass Types Guide', href: '/double-glazing/glass-types/' },
      { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['double-glazing-noise-tram-traffic', 'double-glazing-glass-types-guide'],
    faqItems: [
      {
        q: 'What Rw rating do I need for traffic noise?',
        a: 'Standard residential traffic noise: Rw 35–38 is sufficient. Busy arterial roads or tram routes: target Rw 40–44 with acoustic laminated glass. Near major highways or rail: Rw 45+ with specialist high-performance acoustic IGUs.',
      },
      {
        q: 'Does standard double glazing reduce noise?',
        a: 'Yes, but modestly. Standard clear IGUs typically achieve Rw 30–34 — useful for general background reduction but not effective against low-frequency tram or traffic rumble. For material noise improvement, acoustic laminated glass is required.',
      },
      {
        q: 'What is acoustic laminated glass?',
        a: 'Acoustic laminated glass has a polyvinyl butyral (PVB) or SGP interlayer bonded between two glass plies. This interlayer damps vibration — particularly in the mid-frequency range where tram, road traffic, and human voice sit.',
      },
    ],
  },
  {
    slug: 'low-e-glass-explained',
    title: "Low-E Glass Explained: What It Does, What It Costs & Whether You Need It",
    excerpt:
      "U-values, solar heat gain coefficients, and the truth about whether Low-E glass is worth the premium for Melbourne's climate.",
    category: 'energy',
    datePublished: '2026-02-10',
    readTime: 6,
    primaryService: { label: 'Energy Efficient Windows Melbourne', href: '/double-glazing/energy-efficient-windows/' },
    relatedServices: [
      { label: 'Glass Types Guide', href: '/double-glazing/glass-types/' },
      { label: 'Double Glazing Cost', href: '/double-glazing/cost/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['how-to-stop-condensation-on-windows', 'argon-gas-double-glazing-worth-it'],
    faqItems: [
      {
        q: 'What does Low-E coating actually do?',
        a: "Low-E (low emissivity) coating is a microscopically thin metallic layer applied to the glass surface. It reflects long-wave infrared radiation (heat) back into the room in winter and reflects solar heat gain outward in summer. Melbourne's mixed climate makes it useful year-round.",
      },
      {
        q: 'Is Low-E glass worth the extra cost?',
        a: 'For most Melbourne homes, yes. The U-value improvement (typically from 2.8 down to 1.6–1.8) translates to meaningful heating cost reductions. West and north-facing windows benefit most from the solar control. The payback is faster in poorly insulated homes.',
      },
      {
        q: 'What is the difference between hard-coat and soft-coat Low-E?',
        a: 'Hard-coat (pyrolytic) Low-E is baked onto the glass during manufacture — durable and cheaper. Soft-coat (magnetron sputtered) Low-E is applied post-manufacture and is position-sensitive — it must face the cavity inside the IGU. Soft-coat typically performs better but costs more.',
      },
    ],
  },
  {
    slug: 'double-glazing-heritage-homes-melbourne',
    title: 'Retrofit Double Glazing in Heritage-Listed Melbourne Homes',
    excerpt:
      'Heritage overlays, council permit requirements, and how to keep your original timber frames while doubling thermal performance.',
    category: 'heritage',
    datePublished: '2026-01-28',
    readTime: 9,
    primaryService: { label: 'Heritage Double Glazing Melbourne', href: '/double-glazing/heritage-homes/' },
    relatedServices: [
      { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
      { label: 'Double Glazing Cost', href: '/double-glazing/cost/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['is-retrofit-double-glazing-worth-it', 'double-glazing-glass-types-guide'],
    faqItems: [
      {
        q: 'Do I need a permit to retrofit double glazing to a heritage-listed home?',
        a: "It depends on your council and the specific overlay. Many heritage overlays permit IGU retrofits into existing frames without a permit, since the exterior appearance is unchanged. Full window replacement typically does require a permit. We recommend checking with your council or Heritage Victoria before proceeding.",
      },
      {
        q: 'Can you retrofit double glazing into original timber frames?',
        a: 'Yes, and it is often the preferred method. Timber frames typically have adequate rebate depth for a 24mm IGU. The process involves removing the existing glass, rebating the frame if needed, and installing the sealed unit with appropriate seals and glazing tape.',
      },
      {
        q: 'Will the retrofit change the appearance of my heritage windows?',
        a: 'From the street — no visible change. The glass unit sits within the existing frame and sash. We can match the existing glass profile (single astragal, colonial bars) using simulated divided lights. Inside, the windows look and operate identically.',
      },
    ],
  },
  {
    slug: 'double-glazing-glass-types-guide',
    title: 'Double Glazing Glass Types: Which Is Right for Your Home?',
    excerpt:
      'Clear float, tinted, Low-E, acoustic laminated — a complete comparison by performance, price, and application.',
    category: 'glass-types',
    datePublished: '2026-01-14',
    readTime: 8,
    primaryService: { label: 'Double Glazing Glass Types', href: '/double-glazing/glass-types/' },
    relatedServices: [
      { label: 'Energy Efficient Windows', href: '/double-glazing/energy-efficient-windows/' },
      { label: 'Soundproof Windows', href: '/double-glazing/soundproof-windows/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['low-e-glass-explained', 'best-glass-for-noise-reduction-melbourne'],
    faqItems: [
      {
        q: 'Which glass type gives the best thermal performance?',
        a: 'Soft-coat Low-E with argon fill gives the best thermal performance, typically achieving U-values of 1.4–1.6 W/m²K vs 2.7–2.8 for standard clear float. For most Melbourne homes, hard-coat Low-E (U-value ~1.8) is a cost-effective compromise.',
      },
      {
        q: 'Can I mix glass types in different windows?',
        a: 'Absolutely — and it is often the right approach. North and west-facing windows benefit most from Low-E for solar control. South-facing windows gain less from Low-E. Bedrooms near a road warrant acoustic glass. Mixing specifications keeps costs down without sacrificing priorities.',
      },
    ],
  },
  {
    slug: 'how-to-stop-condensation-on-windows',
    title: 'How to Stop Condensation on Windows in Melbourne',
    excerpt:
      "Why double glazing eliminates most condensation — and the one scenario where it doesn't. An honest look at the physics.",
    category: 'energy',
    datePublished: '2025-12-19',
    readTime: 5,
    primaryService: { label: 'Energy Efficient Windows Melbourne', href: '/double-glazing/energy-efficient-windows/' },
    relatedServices: [
      { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
      { label: 'Double Glazing Glass Types', href: '/double-glazing/glass-types/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['low-e-glass-explained', 'is-retrofit-double-glazing-worth-it'],
  },
  {
    slug: 'retrofit-vs-full-window-replacement',
    title: 'Retrofit Double Glazing vs Full Window Replacement: The Honest Comparison',
    excerpt:
      'Cost, disruption, warranty, and performance compared side-by-side. Retrofit wins in nearly every category.',
    category: 'retrofit',
    datePublished: '2025-12-05',
    readTime: 7,
    primaryService: { label: 'Retrofit Double Glazing Melbourne', href: '/double-glazing/' },
    relatedServices: [
      { label: 'Double Glazing Cost', href: '/double-glazing/cost/' },
      { label: 'Heritage Double Glazing', href: '/double-glazing/heritage-homes/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['is-retrofit-double-glazing-worth-it', 'double-glazing-cost-per-m2-australia'],
  },
  {
    slug: 'argon-gas-double-glazing-worth-it',
    title: 'Argon Gas in Double Glazing: Is the Upgrade Worth It?',
    excerpt:
      'The thermal difference between air-filled and argon-filled IGUs — and whether the modest gain justifies the upsell.',
    category: 'glass-types',
    datePublished: '2025-11-20',
    readTime: 5,
    primaryService: { label: 'Double Glazing Glass Types', href: '/double-glazing/glass-types/' },
    relatedServices: [
      { label: 'Low-E Glass — Energy Efficient Windows', href: '/double-glazing/energy-efficient-windows/' },
      { label: 'Double Glazing Cost', href: '/double-glazing/cost/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['low-e-glass-explained', 'double-glazing-glass-types-guide'],
  },
  {
    slug: 'double-glazing-noise-tram-traffic',
    title: 'Double Glazing for Tram & Traffic Noise in Melbourne: What Actually Works',
    excerpt:
      'Inner-city Melbourne noise profiles, tested Rw values, and which glass specification delivers real relief against tram routes.',
    category: 'acoustic',
    datePublished: '2025-11-07',
    readTime: 6,
    primaryService: { label: 'Soundproof Windows Melbourne', href: '/double-glazing/soundproof-windows/' },
    relatedServices: [
      { label: 'Retrofit Double Glazing', href: '/double-glazing/' },
      { label: 'Glass Types Guide', href: '/double-glazing/glass-types/' },
      { label: 'Instant Estimate', href: '/instant-estimate/' },
    ],
    relatedPosts: ['best-glass-for-noise-reduction-melbourne', 'is-retrofit-double-glazing-worth-it'],
  },
]

