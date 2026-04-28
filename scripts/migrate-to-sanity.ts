/**
 * One-time migration script: pushes all static site content to Sanity.
 * Run with: npx tsx scripts/migrate-to-sanity.ts
 */

import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,
  dataset: process.env.SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const ROOT = path.join(process.cwd(), 'public')

async function uploadImage(relPath: string): Promise<{ asset: { _type: 'reference'; _ref: string } } | null> {
  const abs = path.join(ROOT, relPath)
  if (!fs.existsSync(abs)) {
    console.warn(`  ⚠ Image not found: ${abs}`)
    return null
  }
  const buffer = fs.readFileSync(abs)
  const filename = path.basename(abs)
  const asset = await client.assets.upload('image', buffer, { filename })
  console.log(`  ✓ Uploaded ${filename} → ${asset._id}`)
  return { asset: { _type: 'reference', _ref: asset._id } }
}

async function upsert(doc: Record<string, unknown>) {
  await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0])
  console.log(`  ✓ Upserted ${doc._type} (${doc._id})`)
}

// ─── 1. SITE SETTINGS ────────────────────────────────────────────────────────
async function migrateSiteSettings() {
  console.log('\n[1] Site Settings')
  await upsert({
    _id: 'siteSettings',
    _type: 'siteSettings',
    name: 'King Double Glazing',
    legalName: 'Brooklyn Glass Pty Ltd t/a King Double Glazing',
    domain: 'https://kingdoubleglazing.com.au',
    phone: '0406 470 595',
    phoneTel: '+61406470595',
    phoneHref: 'tel:+61406470595',
    email: 'hello@kingdoubleglazing.com.au',
    abn: '87 627 894 428',
    licenseNumber: '',
    notificationEmail: 'tasmarkou1969@gmail.com',
    address: {
      street: '5 Glenarm Road',
      suburb: 'Glen Iris',
      state: 'VIC',
      postcode: '3146',
      country: 'AU',
      display: '5 Glenarm Road, Glen Iris VIC 3146, Australia',
    },
    geo: { latitude: -37.8577, longitude: 145.0594 },
    social: { facebook: '', instagram: '', google: '' },
    reviews: { totalCount: 36, averageRating: 5.0 },
    logos: { light: '/logo-light.png', dark: '/logo-dark.png', icon: '/icon-small.png' },
    pricing: { retrofitFromPerSqm: 595, retrofitFromDisplay: 'From $595/m²' },
  })
}

// ─── 2. NAVIGATION ───────────────────────────────────────────────────────────
async function migrateNavigation() {
  console.log('\n[2] Navigation')
  await upsert({
    _id: 'navigation',
    _type: 'navigation',
    mainNav: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services/' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Who We Are', href: '/about/' },
      { label: 'Contact', href: '/contact/' },
    ],
    ctaNav: { label: 'Get Quote', href: '/instant-estimate/' },
    footerServicesNav: [
      { label: 'Retrofit Double Glazing', href: '/services/#retrofit' },
      { label: 'Emergency Glass Repair', href: '/services/#emergency' },
      { label: 'Shower Screens', href: '/services/#shower-screens' },
      { label: 'Glass Splashbacks', href: '/services/#splashbacks' },
      { label: 'Custom Mirrors', href: '/services/#mirrors' },
      { label: 'Commercial Glazing', href: '/services/#commercial' },
    ],
    footerCompanyNav: [
      { label: 'Who We Are', href: '/about/' },
      { label: 'Gallery', href: '/gallery/' },
      { label: 'Contact', href: '/contact/' },
      { label: 'Warranty', href: '/warranty/' },
      { label: 'Get an Instant Estimate', href: '/instant-estimate/' },
    ],
  })
}

// ─── 3. PAGE DOCUMENTS ───────────────────────────────────────────────────────
async function migratePageDocuments() {
  console.log('\n[3] Page Documents')

  // Home Page
  await upsert({
    _id: 'homePage',
    _type: 'homePage',
    badge: "Stop. Don't Overpay. · 10-Year Warranty · Beat Any Quote 30%",
    headlineWhite: 'Quieter Home. Lower Bills.',
    headlineYellow: 'Without Replacing Your Windows.',
    subtext: 'We add a second pane to your existing windows. No ripping out, no mess. Up to 70% quieter.',
    primaryCtaLabel: 'Generate My Quote →',
    adaptorCaption: 'Our standard adapters are engineered to suit a wide range of window configurations.',
    estimateCtaHeadline: 'Get Your Price.\nIn Minutes Online.',
    estimateCtaSubtext: "We beat any genuine quote by 30%. That's a promise in writing.",
    estimateCtaButtonLabel: 'Start My Quote →',
    estimateCtaCaption: 'Enter your window sizes · See your price instantly',
    faqHeading: 'Common Questions',
    faqSubheading: 'Plain answers, no jargon.',
  })

  // Services Page
  await upsert({
    _id: 'servicesPage',
    _type: 'servicesPage',
    heroHeading: 'One Team.\nEvery Job.',
    heroSubtext: 'Retrofit double glazing is our main business — we add a second pane to your existing windows. We also do emergency repairs, shower screens, splashbacks, mirrors, and commercial glazing. 10-year warranty on every job.',
    faqHeading: 'Service Questions',
    faqSubheading: 'Common questions about what we do.',
    serviceSections: [
      {
        id: 'retrofit',
        eyebrow: 'Hero Service',
        heading: 'Retrofit Double Glazing',
        bodyText: 'We add a second pane to your existing windows. Same frames, same look. Up to 70% quieter. Up to 70% less heat loss. Half the price of full replacement.',
        bullets: [
          'Works on timber, aluminium, and steel frames',
          'Installed in one day — most Melbourne homes',
          'From $595/m² — we beat any genuine quote by 30%',
          '10-year warranty on glass and workmanship',
          'No council approval required in most cases',
        ],
        primaryCta: { label: 'Generate My Quote →', href: '/instant-estimate/' },
      },
      {
        id: 'emergency',
        eyebrow: 'Rapid Response',
        heading: 'Emergency Glass Repair',
        bodyText: 'Broken window right now? We do same-day emergency glass repair across Melbourne — shopfronts, homes, sliding doors, skylights.',
        bullets: [
          'Same-day response in metropolitan Melbourne',
          'Temporary boarding while glass is ordered',
          'All glass types — safety, toughened, laminated',
          'Insurance reports available on request',
        ],
        primaryCta: { label: 'Call Now', href: 'tel:+61406470595' },
      },
      {
        id: 'shower-screens',
        eyebrow: 'Bathroom',
        heading: 'Shower Screens',
        bodyText: 'Frameless, semi-frameless, or framed. Toughened safety glass. We supply and install across Melbourne, usually in one day.',
        bullets: [
          'Frameless — no metal frame, looks like a single sheet of glass',
          'Semi-frameless — cleaner look, lower cost',
          'Framed — most affordable, very durable',
          'Custom sizes cut to your exact dimensions',
          'Measure-it-yourself quote available — accurate within 10% if you measure carefully',
          '10-year warranty on every screen',
        ],
        primaryCta: { label: 'Send My Measurements →', href: '/contact/?service=shower-diy' },
        secondaryCta: { label: 'Or Get in Touch →', href: '/contact/?service=shower-visit' },
      },
      {
        id: 'splashbacks',
        eyebrow: 'Kitchen & Bathroom',
        heading: 'Kitchen Glass Splashbacks',
        bodyText: 'Custom-cut glass splashbacks in any colour. Easy to clean, heat-resistant. We measure, cut, and install.',
        bullets: [
          'Any colour — match your kitchen exactly',
          'Heat and steam resistant',
          'Hygienic — no grout to clean',
          'Custom sizes, no standard-size limitations',
        ],
        primaryCta: { label: 'Get a Quote →', href: '/contact/' },
      },
      {
        id: 'mirrors',
        eyebrow: 'Custom',
        heading: 'Custom Mirrors',
        bodyText: 'Bespoke mirrors cut to any size. Bathrooms, gyms, hallways, studios. We supply and install across Melbourne.',
        bullets: [
          'Cut to exact dimensions',
          'Bevelled edge or straight cut',
          'Wall-mounted or free-standing',
          'Commercial and residential',
        ],
        primaryCta: { label: 'Get a Quote →', href: '/contact/' },
      },
      {
        id: 'commercial',
        eyebrow: 'Commercial',
        heading: 'Commercial Glazing',
        bodyText: 'Offices, retail, shopfronts, strata. Same transparent pricing, same 10-year warranty.',
        bullets: [
          'Retrofit double glazing for offices and apartments',
          'Shopfront glass supply and installation',
          'Office partitions and internal glazing',
          'Strata and body corporate work',
          'All project sizes — call to discuss yours',
        ],
        primaryCta: { label: 'Get a Quote →', href: '/contact/' },
      },
    ],
  })

  // About Page
  await upsert({
    _id: 'aboutPage',
    _type: 'aboutPage',
    heroHeadline: 'Built by a Family',
    heroHeadlineYellow: 'of Melbourne Glaziers',
    heroSubtext: 'Tas Markou ran two double glazing factories. He found a way to drop the price — because most companies charge more than families can afford. 40+ staff at peak. 25+ years in the trade.',
    stats: [
      { value: '50+', label: 'Years combined experience' },
      { value: '40+', label: 'Staff at peak commercial operation' },
      { value: '30%', label: 'Cheaper than any genuine quote' },
      { value: '1 day', label: 'Typical install time' },
    ],
    storyEyebrow: 'The Origin Story',
    storyParagraphs: [
      'I grew up in glass. My father was a glazier and I was doing installs as a kid. I ran two factories. Along the way I found a way to drop the price — most companies charge way more than families can afford.',
      "You want quieter, warmer windows. You don't want to spend $15,000 ripping out frames that work fine. We add a second pane to what you already have. No mess. One day, done.",
      "Every quote is in plain numbers. No hidden extras. If we can't beat any real competitor quote by 30%, I'll say so. Stop. Don't overpay.",
    ],
    storyQuote: "Transparent quoting. Fair pricing. 10-year warranty. That's the King promise. — Tas",
    guarantees: [
      { label: 'We beat any genuine quote by 30%', detail: 'Send us a real competitor quote. We come in 30% cheaper, in writing.' },
      { label: 'Fits most existing windows', detail: "Custom fittings for timber, aluminium, and steel frames. If it won't work, we'll tell you before any work begins." },
      { label: '10-year warranty on every job', detail: 'Glass and workmanship covered. No conditions, no fine print.' },
      { label: 'Transparent pricing', detail: 'The quote you get is the price you pay. No hidden extras.' },
      { label: '50+ years combined experience', detail: 'Tas learned from his father. Our team has done thousands of Melbourne homes.' },
    ],
  })

  // Contact Page
  await upsert({
    _id: 'contactPage',
    _type: 'contactPage',
    heroHeadline: 'Get a Quote.',
    heroSubtext: "Price yourself online first. Call us when you'd like to proceed.",
    formHeading: 'Send Us a Message',
  })

  // Warranty Page
  await upsert({
    _id: 'warrantyPage',
    _type: 'warrantyPage',
    heroHeadline: 'Our 10-Year',
    heroHeadlineYellow: 'Warranty',
    heroSubtext: 'Every installation is backed by a 10-year warranty on glass and workmanship. No conditions, no fine print.',
    coveredItems: [
      { item: 'Glass units', detail: 'Any seal failure, fogging, or manufacturing defect in the glass itself.' },
      { item: 'Installation workmanship', detail: 'If it fails because of how we fitted it, we fix it free.' },
      { item: 'Frame adaptors', detail: 'The fittings we use to attach new glass to your existing frame.' },
      { item: 'Seals and edge spacers', detail: 'The seal and spacer bar that keep moisture and air out of the unit.' },
    ],
    notCoveredItems: [
      { item: 'Intentional damage', detail: 'Breakage caused by deliberate impact or misuse.' },
      { item: 'Storm or weather damage', detail: 'Damage caused by hail, fallen debris, or extreme weather events.' },
      { item: 'Building structural movement', detail: "If the building settles and distorts the frame beyond the fitting's tolerance." },
    ],
    claimSteps: [
      'Call or email us with your job reference and a brief description.',
      'We inspect within 7 business days — no charge for the visit.',
      "If it's covered, we repair or replace at no cost to you.",
    ],
    ctaHeadline: 'Ready to Get Your Price?',
    ctaSubtext: 'Get your price in minutes. Every job comes with this warranty, in writing.',
  })

  // Estimate Page
  await upsert({
    _id: 'estimatePage',
    _type: 'estimatePage',
    heroHeadline: 'Generate Your Own Quote.',
    heroSubtext: "Price yourself online first. Call us when you'd like to proceed.",
    secondStoreySurcharge: 150,
  })
}

// ─── 4. FAQS ─────────────────────────────────────────────────────────────────
async function migrateFaqs() {
  console.log('\n[4] FAQs')

  const faqs: Array<{ group: string; order: number; q: string; a: string }> = [
    // Homepage
    { group: 'homepage', order: 1, q: 'Will this fit my existing windows?', a: "Almost always yes. We retrofit timber, aluminium, and steel frames. If your frames can't take a retrofit, we'll tell you before any work begins — no charge." },
    { group: 'homepage', order: 2, q: 'How long does it take?', a: 'Most jobs are done in a single day. Large homes might take two.' },
    { group: 'homepage', order: 3, q: 'How much does it cost?', a: 'Most Melbourne homes land between $2,400 and $6,000 depending on how many windows you upgrade. Use our Instant Estimate to get your exact range in minutes.' },
    { group: 'homepage', order: 4, q: "What's the warranty?", a: '10 years on glass and workmanship. Guaranteed in writing on every job, no conditions. See full warranty terms →' },
    { group: 'homepage', order: 5, q: 'What if I already have a quote from someone else?', a: "Send it to us. If it's a genuine quote, we'll beat it by 30% — guaranteed in writing." },

    // Estimate
    { group: 'estimate', order: 1, q: 'How accurate is the online price?', a: 'Within about 10%, as long as your measurements are correct. Enter the height and width of each window in millimetres and the calculator does the rest. When we visit your home for final measurements, the number rarely moves by more than 10%.' },
    { group: 'estimate', order: 2, q: 'How do I measure my windows?', a: 'Measure the glass pane itself — height then width, in millimetres. Not the frame, just the glass. A standard double-hung window might be around 900mm tall × 600mm wide. If you have the same size in multiple rooms, put them all in one row with the quantity.' },
    { group: 'estimate', order: 3, q: 'Why do I need to price myself first?', a: "We keep our prices low by running lean. The calculator means no sales visits, no chasing, and no time wasted on either side. You see the price. If it works, we move forward. If not, we don't chase." },
    { group: 'estimate', order: 4, q: 'What about the deposit?', a: 'We ask for a 50% deposit to start fabrication — your glass is custom-made for your exact windows. The remaining 50% is due once materials are ready and your install is scheduled. No surprise fees.' },
    { group: 'estimate', order: 5, q: 'What is the second storey surcharge?', a: 'Second storey windows are harder to access, so we charge a flat $150 extra per window. Tick the second storey checkbox on any row that applies and the calculator adds it automatically.' },
    { group: 'estimate', order: 6, q: 'Will the adaptor change how my window looks?', a: "Our adaptor adds about 20mm to your existing frame width — so a 40mm frame becomes around 60mm. This is how we fit insulated glass into your existing frames without replacing them. Most customers don't notice the difference after install." },
    { group: 'estimate', order: 7, q: "What's covered by the warranty?", a: 'Our 10-year warranty covers the glass unit, the seals, and our workmanship. If anything fails within that time, we come back and fix it — no charge.' },
    { group: 'estimate', order: 8, q: 'How long from quote to install?', a: "Once your deposit is in, fabrication typically takes 2–3 weeks. We'll confirm your install date as soon as materials are ready." },
    { group: 'estimate', order: 9, q: 'Do I have to give my email to see the price?', a: 'No. Your price appears as you enter your windows — no email, no phone number, no obligation. You can optionally send your quote through to us when you\'re ready to proceed.' },
    { group: 'estimate', order: 10, q: 'Does the price include installation?', a: 'Yes. Every quote includes glass, installation, frame preparation, rubbish removal, and 10-year warranty. No hidden extras.' },
    { group: 'estimate', order: 11, q: 'What if I already have a quote from someone else?', a: "Send it to us. If it's a genuine quote, we'll beat it by 30% — guaranteed in writing, same 10-year warranty." },

    // Contact
    { group: 'contact', order: 1, q: 'How quickly do you respond?', a: 'Within one business day for emails and forms. Phone calls answered same day during business hours. Broken glass? Call directly — we aim to dispatch within 2–4 hours in Melbourne.' },
    { group: 'contact', order: 2, q: 'Do I need a site visit to get a price?', a: "No. Use the Quote Generator to get your price in minutes — no email required to see your number. If you're happy with the estimate, email your quote through to us to proceed. We'll then arrange a convenient time for a site inspection and final measure before scheduling your installation." },
    { group: 'contact', order: 3, q: 'What areas do you service?', a: 'All of metropolitan Melbourne. We work across eastern, northern, and inner-western suburbs. Call us for outer-metro jobs.' },

    // Retrofit
    { group: 'retrofit', order: 1, q: 'How much does retrofit double glazing cost in Melbourne?', a: 'Most Melbourne homes pay from $595 per square metre for retrofit double glazing, depending on glass type, frame condition, and access. Full window replacement typically costs 30–50% more.' },
    { group: 'retrofit', order: 2, q: 'Is retrofit double glazing cheaper than replacing windows?', a: 'Yes. Because we reuse your existing frames, retrofit double glazing avoids structural work and usually costs 30–50% less than a full window replacement.' },
    { group: 'retrofit', order: 3, q: 'Does retrofit double glazing work on old timber frames?', a: "Yes — retrofit is specifically designed for existing frames including single-glazed timber, aluminium, and steel windows common in Melbourne's older homes." },
    { group: 'retrofit', order: 4, q: 'Will it reduce tram and traffic noise?', a: 'Retrofit acoustic double glazing significantly reduces low-frequency traffic and tram noise. We recommend our acoustic glass option for homes near Melbourne trams or arterials.' },
    { group: 'retrofit', order: 5, q: 'How long does retrofit double glazing installation take?', a: 'Most homes are completed in one day. We work room by room to minimise disruption.' },
    { group: 'retrofit', order: 6, q: 'Is there a government rebate for double glazing in Melbourne?', a: 'The Victorian Energy Upgrades (VEU) program may offer incentives for energy-efficient glazing upgrades. We recommend checking the VEU scheme for current eligibility.' },
    { group: 'retrofit', order: 7, q: 'What is the warranty on retrofit double glazing?', a: 'We offer a 10-year warranty on all retrofit double glazing installations, covering glass and workmanship with no conditions or fine print. See full warranty terms at kingdoubleglazing.com.au/warranty/' },
    { group: 'retrofit', order: 8, q: 'Can you beat a competitor quote on double glazing?', a: 'Yes — we will beat any genuine, like-for-like written competitor quote by at least 30%, guaranteed in writing with the same 10-year warranty.' },

    // Emergency
    { group: 'emergency', order: 1, q: 'Do you do 24/7 emergency glass repair in Melbourne?', a: 'Yes. We provide emergency glass repair and board-up services across Melbourne, available 24 hours.' },
    { group: 'emergency', order: 2, q: 'How quickly can you respond to a broken window in Melbourne?', a: 'We aim to respond within 2–4 hours for emergency calls across inner Melbourne suburbs.' },
    { group: 'emergency', order: 3, q: 'What types of glass do you repair?', a: 'We repair all residential and commercial glass including single pane, double glazed units, shower screens, and shopfront glass.' },
    { group: 'emergency', order: 4, q: 'Do you provide temporary board-up for broken windows?', a: 'Yes — if glass cannot be replaced immediately, we provide secure temporary board-up to protect your property.' },
    { group: 'emergency', order: 5, q: 'Is emergency glass repair covered by home insurance?', a: 'Most home and contents policies cover accidental glass breakage. We can provide documentation to support your claim.' },

    // General
    { group: 'general', order: 1, q: 'Do you really beat competitor quotes by 30%?', a: "Yes — send us a genuine, like-for-like written competitor quote and we'll come in at least 30% cheaper, guaranteed in writing with the same 10-year warranty on glass and workmanship." },
    { group: 'general', order: 2, q: 'What warranty does King Double Glazing offer?', a: 'We offer a 10-year warranty on all retrofit double glazing installations, covering glass and workmanship. No conditions, no fine print. See full warranty terms at kingdoubleglazing.com.au/warranty/' },
    { group: 'general', order: 3, q: 'Who is Tas Markou and why does that matter?', a: 'Tas Markou is the founder of King Double Glazing. He learned the trade from his father, a Melbourne glazier, and built a commercial glazing business with 40+ staff at peak. Unlike large glazing companies, Tas is personally involved in every quote.' },
    { group: 'general', order: 4, q: 'How is King Double Glazing different from other Melbourne glaziers?', a: 'King Double Glazing was built specifically to offer retrofit double glazing at transparent, honest prices. We beat any genuine competitor quote by 30%, with no call centres, no hidden fees, and no high-pressure sales.' },

    // Services page FAQs
    { group: 'services', order: 1, q: 'Do you do all these services or just double glazing?', a: 'All of them. King Double Glazing handles retrofit double glazing, shower screens, splashbacks, mirrors, emergency repairs, and commercial jobs. One team, one price promise, one warranty.' },
    { group: 'services', order: 2, q: "What's the fastest service you offer?", a: 'Emergency glass repair — we aim to be on site within 2–4 hours in metropolitan Melbourne. Call us directly for fastest response.' },
    { group: 'services', order: 3, q: 'Do shower screens and splashbacks include installation?', a: 'Yes. Every job includes supply, installation, and cleanup. We leave the site in the same condition we found it.' },
  ]

  for (const [i, faq] of faqs.entries()) {
    await upsert({
      _id: `faqItem-${faq.group}-${faq.order}`,
      _type: 'faqItem',
      ...faq,
    })
    if (i % 5 === 0) process.stdout.write('.')
  }
  console.log()
}

// ─── 5. TESTIMONIALS ─────────────────────────────────────────────────────────
async function migrateTestimonials() {
  console.log('\n[5] Testimonials (42 items — uploading customer images first)')

  const img1 = await uploadImage('testimonial-founder/customer-1.webp')
  const img2 = await uploadImage('testimonial-founder/customer-2.webp')

  const testimonials = [
    { name: 'Sarah M.', suburb: 'Brunswick', source: 'Google', rating: 5, tag: 'noise', text: 'Tram noise cut in half — we actually sleep now.', img: img1 },
    { name: 'David K.', suburb: 'Glen Waverley', source: 'Google', rating: 5, tag: 'energy', text: 'Heating bill dropped 30% last winter. Paid for itself already.', img: img2 },
    { name: 'Priya R.', suburb: 'Camberwell', source: 'Google', rating: 5, tag: 'retrofit', text: 'Quoted $18k by a big name. King did it for $6k with a 10-year warranty.', img: null },
    { name: 'Michael A.', suburb: 'St Kilda', source: 'Google', rating: 5, tag: 'retrofit', text: 'Was sceptical about retrofit vs full replacement. A friend told me to just do the full windows. Glad I ignored him. You cannot tell the difference visually, and the performance specs are identical.', img: null },
    { name: 'Anna P.', suburb: 'Camberwell', source: 'Google', rating: 5, tag: 'energy', text: 'West-facing bedroom was genuinely unusable in summer — 34°C at 9pm. Tinted Low-E glass has fixed it completely. Air con barely runs now. The estimate tool online gave me the exact price before anyone even came out.', img: null },
    { name: 'Chris L.', suburb: 'Brighton', source: 'Google', rating: 5, tag: 'retrofit', text: "Used the instant estimate tool to budget before committing. No sales call, no pressure. The price they quoted was the price I paid. That kind of transparency is rare in the trades.", img: null },
    { name: 'Marcus & Priya N.', suburb: 'Brunswick', source: 'Google', rating: 5, tag: 'noise', text: "Our bedroom faces Sydney Road. Friday and Saturday nights were unusable — we were wearing earplugs to sleep. The acoustic laminated glass has completely changed the situation. The tram noise that used to wake us at 6 am is now barely audible. I genuinely did not think glass could make that much difference.", img: null },
    { name: 'Helen C.', suburb: 'Port Melbourne', source: 'Google', rating: 5, tag: 'noise', text: "Flight path noise was the main reason we almost moved. A friend suggested acoustic glazing as a last resort before we listed the house. We're not moving. The difference in the front rooms is night and day — my daughter actually sleeps through now. Worth every cent.", img: null },
    { name: 'Rob & Diane F.', suburb: 'Glen Waverley', source: 'Google', rating: 5, tag: 'energy', text: "Our gas bills were brutal every winter — the old single-pane windows were just radiating cold into the rooms. We went with Low-E double glazing throughout. First winter after: $380 less on gas over the quarter. The house holds heat in a way it never did before. We wished we'd done it when we bought the place.", img: null },
    { name: 'Yasmin T.', suburb: 'Northcote', source: 'Google', rating: 5, tag: 'energy', text: "I was skeptical about the energy saving claims — they always sound too good. But the condensation alone proved the point: zero condensation on the inner pane since installation, where before it was streaming every winter morning. The heating runs half as often. The numbers are real.", img: null },
    { name: 'Oliver & Kate B.', suburb: 'Carlton', source: 'Google', rating: 5, tag: 'heritage', text: "We were told by two other glaziers that we'd need council approval and a heritage consultant before touching the windows. King told us that a glass-only retrofit is permit-exempt — kept the frames, just replaced the glass. They were right. No permit, no consultant, done in one day. The house looks exactly the same from the street, and the draughts are completely gone.", img: null },
    { name: 'Fiona M.', suburb: 'Fitzroy', source: 'Google', rating: 5, tag: 'heritage', text: "Our Victorian terrace is on the Heritage Overlay and I was nervous about any window work. King assessed the frames, confirmed the retrofit was permit-free, and did the whole house in a day. The original sash windows still look original — you'd never know the glass had changed. Warmer, quieter, no heritage headache.", img: null },
    { name: 'Paul & Sandra O.', suburb: 'Hawthorn', source: 'Google', rating: 5, tag: 'emergency', text: "Woke up to a burglary at 3am — back door glass completely smashed. Called King at 6am, glazier was here by 7:45am, property secured before we left for work. Didn't expect anyone to show up that fast. They boarded it properly, not just cardboard, and came back two days later with the permanent glass. Exactly what you need when you're in shock.", img: null },
    { name: 'Rental Manager — South Yarra', suburb: 'South Yarra', source: 'Google', rating: 5, tag: 'emergency', text: "Tenant called me at 7pm on a Friday — kitchen window smashed. King had a glazier there by 9pm and replaced the glass permanently on the same visit. No board-up, no return trip, no landlord nightmare over the weekend. I've used them for three emergency jobs now and the response is always the same.", img: null },
    { name: 'Diane K.', suburb: 'Footscray', source: 'Google', rating: 5, tag: 'emergency', text: "Storm took out my lounge window at 11pm on a Wednesday. I expected to be told someone would come in the morning. King had a glazier here within the hour. He cleaned up the glass, boarded the frame properly, and the permanent replacement was fitted two days later. Professional job, not a handyman with a piece of wood.", img: null },
    { name: 'James R. — Strata Manager', suburb: 'South Melbourne', source: 'Google', rating: 5, tag: 'commercial', text: "We manage 14 strata buildings across Melbourne. King handles all our glazing — routine replacements, double glazing retrofits on older blocks, and emergency call-outs. The invoicing is clean, the pricing is consistent, and they show up when they say they will. That last part is rarer than it should be.", img: null },
    { name: 'Natalie W. — Retail Fitout', suburb: 'Collingwood', source: 'Google', rating: 5, tag: 'commercial', text: "Needed a full shopfront glass installation done over a weekend so we could open Monday. King confirmed the timeline, showed up Saturday morning, and were done by Sunday afternoon. The glass is immaculate — not a mark on it. Every trade we brought in for the fitout delivered late except these guys.", img: null },
    { name: 'Tom B. — Property Developer', suburb: 'Richmond', source: 'Google', rating: 5, tag: 'commercial', text: "Used King on a 12-unit apartment project — double glazing throughout plus frameless balustrades on the upper levels. Scope was substantial and they handled it without the project management headaches I've had with other glaziers. Itemised quotes, predictable scheduling, zero defects at handover. We're using them on the next project.", img: null },
    { name: 'Margaret & Peter S.', suburb: 'Kew', source: 'Google', rating: 5, tag: 'heritage', text: "Our Kew home is on the Heritage Overlay and we'd been told by two builders that any window work required council sign-off. Tas explained that a glass-only retrofit is permit-exempt — you replace the glass unit inside the existing frame, not the frame itself. He was right. No planning permit, job done in a day, and the original timber sashes look exactly as they did before. The draught problem we'd lived with for twenty years is gone.", img: null },
    { name: 'Caroline B.', suburb: 'Malvern', source: 'Google', rating: 5, tag: 'heritage', text: "My Malvern Edwardian is in a heritage precinct and I was very anxious about any alteration to the original windows. Tas came out, assessed the frames, and confirmed the retrofit was 100% permit-free — the glass changes but the frames stay completely intact. The installation took one day and left no trace. The cold draughts from the bay window are completely gone.", img: null },
    { name: 'James & Louise W.', suburb: 'Canterbury', source: 'Google', rating: 5, tag: 'energy', text: "We'd been putting off doing anything about the windows in our Canterbury home for years because we assumed it meant replacing the original frames. The retrofit option was a revelation — the frames stay, only the glass is upgraded. Our heating bills dropped by over $300 last winter and there's no more condensation on the inside of the glass in the mornings.", img: null },
    { name: 'Nick A.', suburb: 'Glen Iris', source: 'Google', rating: 5, tag: 'noise', text: "We're half a block from the High Street tram line in Glen Iris. The noise through our original Victorian windows was constant — trams every few minutes during peak hour. The acoustic laminated glass has made an enormous difference. You can still hear them faintly if you listen, but the intrusive rattling and bell noise is gone. Sleep quality has improved noticeably.", img: null },
    { name: 'Sandra T.', suburb: 'Doncaster', source: 'Google', rating: 5, tag: 'noise', text: "Our property backs onto the Eastern Freeway sound corridor. We used to hear constant traffic through the back bedrooms — a low-frequency rumble that made it hard to get to sleep. The double glazing with acoustic PVB glass has been the single biggest quality-of-life improvement we've made to this house. Genuinely quiet back there now.", img: null },
    { name: 'Wei & Mei C.', suburb: 'Box Hill', source: 'Google', rating: 5, tag: 'noise', text: "Our Box Hill unit is right near the station and rail noise at 6am was our daily alarm clock whether we wanted it or not. Acoustic laminated double glazing in the bedroom windows has fixed it. The trains are still there, but you no longer hear them through the glass. The difference from the first night was dramatic.", img: null },
    { name: 'Stephen & Anne R.', suburb: 'Burwood', source: 'Google', rating: 5, tag: 'energy', text: "Our 1960s brick veneer in Burwood was genuinely cold in winter — single-pane windows radiating cold air into every room. Tas quoted a fair price, the job was done in one day, and the results were immediate. First cold snap after installation the house stayed at temperature without the heater running constantly. Paid for itself within two winters.", img: null },
    { name: 'Rachel H.', suburb: 'Caulfield', source: 'Google', rating: 5, tag: 'noise', text: "I live near the Caulfield station corridor and tram noise on Hawthorn Road was a persistent problem. Acoustic laminated glass in the front-facing windows has been well worth it. The installation was clean, the pricing matched the online estimate exactly, and the noise reduction is genuine — not marginal. I'd recommend King to anyone in Caulfield dealing with the same issue.", img: null },
    { name: 'Andrew & Lyn P.', suburb: 'Ringwood', source: 'Google', rating: 5, tag: 'energy', text: "We'd had quotes from two other glaziers and both came back with full window replacement recommendations. Tas told us our aluminium frames were structurally sound and all that needed changing was the glass unit inside — saving us nearly $8,000. The thermal performance is the same as a full replacement. Can't understand why no one else mentioned the retrofit option.", img: null },
    { name: 'Patricia M.', suburb: 'Toorak', source: 'Google', rating: 5, tag: 'energy', text: "Our Toorak home has original inter-war leadlight and timber windows throughout — many irreplaceable. I was worried that improving thermal performance meant compromising the original fabric of the house. Tas was very clear that the retrofit keeps every original frame in place and only changes the glazed unit. The house is noticeably warmer this winter without any alteration to its character.", img: null },
    { name: 'Greg & Sarah D.', suburb: 'Templestowe', source: 'Google', rating: 5, tag: 'energy', text: "Templestowe winters are noticeably colder than the inner suburbs and our west-facing rooms were getting punished every summer afternoon as well. Low-E double glazing has solved both problems — the west rooms are usable in summer now and we've cut our heating runtime in winter by roughly half. Exactly what it said on the tin.", img: null },
    { name: 'Deborah K.', suburb: 'Mitcham', source: 'Google', rating: 5, tag: 'noise', text: "Our Mitcham home is close enough to the Belgrave line that train noise used to be a constant in the front rooms. I'd assumed double glazing would be a minor improvement — the change was bigger than I expected. The acoustic laminated units have made the front study genuinely usable again as a workspace. Would recommend without hesitation.", img: null },
    { name: 'John & Trudy F.', suburb: 'Nunawading', source: 'Google', rating: 5, tag: 'noise', text: "Whitehorse Road traffic noise was something we'd just accepted as part of living here. A neighbour mentioned King after getting their glazing done and the difference in their place was obvious. We had ours done two months ago — the Whitehorse Road rumble that used to come straight through is now barely noticeable. The instant estimate tool online gave us a quote within a few minutes and it was accurate to the dollar.", img: null },
    { name: 'David & Carol M.', suburb: 'Vermont', source: 'Google', rating: 5, tag: 'energy', text: "Our Vermont home from the 1960s had terrible condensation every winter morning — streaming down the inside of every window. We'd been told it was 'just what older homes do'. It's not — it's a symptom of heat loss through single-pane glass. No condensation since the retrofit. The heating bills have dropped meaningfully and the house feels genuinely different.", img: null },
    { name: 'Tony & Barb N.', suburb: 'Wantirna', source: 'Google', rating: 5, tag: 'energy', text: "We bought our Wantirna place knowing the windows needed attention but kept deferring it. When we finally got Tas out he gave us a straight assessment — aluminium frames in good condition, just needs the glass upgraded. The retrofit was far cheaper than what we'd mentally budgeted for full replacement. The house is warmer, and the electricity bill this winter confirmed it.", img: null },
    { name: 'Liz & Michael C.', suburb: 'Wheelers Hill', source: 'Google', rating: 5, tag: 'energy', text: "Wheelers Hill gets genuinely cold in July and August and our family home was losing heat fast through original single glazing. King retrofitted the entire house — 14 windows — in one long day. The first month's gas bill after installation was $210 less than the same month the year before. That kind of direct cost saving makes the job feel like an easy decision in hindsight.", img: null },
    { name: 'Eleanor V.', suburb: 'Mont Albert', source: 'Google', rating: 5, tag: 'heritage', text: "Mont Albert's Union Road tram runs right past my Victorian cottage and the noise was something I'd just lived with. Getting double glazing was always on the to-do list but I was worried about heritage complications given the precinct rules here. Tas confirmed the glass-only retrofit is permit-exempt — no council involvement, no heritage consultant. One day's work, no tram noise through the bedroom window. Wish I'd done it years ago.", img: null },
    { name: 'Robert & Kim A.', suburb: 'Balwyn North', source: 'Google', rating: 5, tag: 'retrofit', text: "Our large Balwyn North home had 22 windows — we expected a major disruption. King completed the whole job in two days, working systematically through each room. The pricing was itemised and transparent upfront — no variations, no surprises. Final invoice matched the estimate exactly. You'd expect that to be standard but it isn't with most trades.", img: null },
  ]

  for (const [i, t] of testimonials.entries()) {
    const doc: Record<string, unknown> = {
      _id: `testimonial-${i + 1}`,
      _type: 'testimonial',
      name: t.name,
      suburb: t.suburb,
      source: t.source,
      rating: t.rating,
      tag: t.tag,
      text: t.text,
    }
    if (t.img) doc.customerImage = t.img
    await upsert(doc)
  }
}

// ─── 6. GALLERY ──────────────────────────────────────────────────────────────
async function migrateGallery() {
  console.log('\n[6] Gallery (uploading images)')

  const items = [
    { src: 'gallery/Double-glazing-category.webp', alt: 'Retrofit double glazing installed in Melbourne home', category: 'retrofit', caption: 'Retrofit Double Glazing', order: 1 },
    { src: 'gallery/Balconia-pic-1000x667-1.webp', alt: 'Balconia glazing project — exterior glass installation', category: 'commercial', caption: 'Commercial Glazing', order: 2 },
    { src: 'gallery/Balconia_-Yarraville-bowling-club.webp', alt: 'Yarraville bowling club glazing project', category: 'commercial', caption: 'Yarraville Bowling Club', order: 3 },
    { src: 'gallery/Balconia_-Yarraville-bowling-club-2.webp', alt: 'Yarraville bowling club — interior glazing detail', category: 'commercial', caption: 'Yarraville Bowling Club — Detail', order: 4 },
    { src: 'gallery/Shop-fronts-1b.webp', alt: 'Commercial shopfront glass installation Melbourne', category: 'shopfronts', caption: 'Shopfront Glazing', order: 5 },
    { src: 'gallery/Shop-fronts-2b.webp', alt: 'Retail shopfront double glazing Melbourne', category: 'shopfronts', caption: 'Retail Shopfront', order: 6 },
    { src: 'gallery/Shop-fronts-3b.webp', alt: 'Commercial glass shopfront — Melbourne CBD', category: 'shopfronts', caption: 'Commercial Shopfront', order: 7 },
    { src: 'gallery/office-partition.webp', alt: 'Glass office partition installation', category: 'commercial', caption: 'Office Partitions', order: 8 },
    { src: 'gallery/glass-repairs-cropped.webp', alt: 'Emergency glass repair Melbourne', category: 'repairs', caption: 'Glass Repairs', order: 9 },
    { src: 'gallery/glass-repairs-2-scaled.webp', alt: 'Glass repair and replacement Melbourne', category: 'repairs', caption: 'Glass Replacement', order: 10 },
  ]

  for (const item of items) {
    const image = await uploadImage(item.src)
    await upsert({
      _id: `galleryItem-${item.order}`,
      _type: 'galleryItem',
      alt: item.alt,
      category: item.category,
      caption: item.caption,
      order: item.order,
      ...(image ? { image } : {}),
    })
  }
}

// ─── 7. PROCESS STEPS ────────────────────────────────────────────────────────
async function migrateProcessSteps() {
  console.log('\n[7] Process Steps (uploading images)')

  const steps = [
    {
      order: 1,
      title: 'Request a Quote',
      body: 'Fill out our online quote form with your measurements and requirements.',
      imageSrc: 'process-steps/step-1-measure.webp',
      imageAlt: 'Homeowner using the online estimate tool on a phone',
    },
    {
      order: 2,
      title: 'Review & Proceed',
      body: "If you're happy with the estimate, simply email your quote through to us to proceed.",
      imageSrc: 'stock/window-house.webp',
      imageAlt: 'Homeowner reviewing a double glazing quote online',
    },
    {
      order: 3,
      title: 'Site Visit',
      body: "We'll contact you to arrange a convenient time for a site inspection and final measure.",
      imageSrc: 'process-steps/step-2-install.webp',
      imageAlt: 'Glazier conducting a site inspection and measuring windows',
    },
    {
      order: 4,
      title: 'Final Confirmation',
      body: "Once all sizes are confirmed, we'll lock everything in and schedule your installation.",
      callout: "Adds ~20mm to your frame width. We'll confirm exact measurements on site.",
      imageSrc: 'process-steps/step-3-finish.webp',
      imageAlt: 'Glazier completing a retrofit double glazing installation',
    },
  ]

  for (const step of steps) {
    const image = await uploadImage(step.imageSrc)
    await upsert({
      _id: `processStep-${step.order}`,
      _type: 'processStep',
      order: step.order,
      title: step.title,
      body: step.body,
      callout: 'callout' in step ? step.callout : undefined,
      imageAlt: step.imageAlt,
      ...(image ? { image } : {}),
    })
  }
}

// ─── 8. PRICING OPTIONS ──────────────────────────────────────────────────────
async function migratePricingOptions() {
  console.log('\n[8] Pricing Options')

  const options = [
    {
      optionKey: 'A',
      label: 'Option A',
      sublabel: 'Basic warmth',
      spec: '4mm clear + 12mm spacer + 4mm clear',
      pricePerSqm: 595,
      heatPct: 55,
      noisePct: 5,
      tech: {
        composition: ['4mm clear glass', '12mm air spacer', '4mm clear glass'],
        spacerMm: 12,
        lowE: false,
        acousticPVB: false,
        tinted: false,
        bestFor: 'Warmth only — minimal noise reduction',
        rwRating: '',
        notes: 'Standard clear insulated unit. Reduces heat loss by up to 55% compared to single glazing.',
      },
    },
    {
      optionKey: 'B',
      label: 'Option B',
      sublabel: 'Noise + warmth',
      spec: '4mm clear + 12mm spacer + 6mm laminated',
      pricePerSqm: 645,
      heatPct: 50,
      noisePct: 35,
      tech: {
        composition: ['4mm clear glass', '12mm air spacer', '6mm laminated glass'],
        spacerMm: 12,
        lowE: false,
        acousticPVB: false,
        tinted: false,
        bestFor: 'Moderate noise reduction + good warmth',
        rwRating: '',
        notes: 'Laminated inner pane adds mass, improving noise reduction over standard clear double glazing.',
      },
    },
    {
      optionKey: 'C',
      label: 'Option C',
      sublabel: 'Serious noise + warmth',
      spec: '4mm clear + 10mm spacer + 6mm acoustic PVB',
      pricePerSqm: 695,
      heatPct: 55,
      noisePct: 65,
      tech: {
        composition: ['4mm clear glass', '10mm air spacer', '6mm laminated with acoustic PVB interlayer'],
        spacerMm: 10,
        lowE: false,
        acousticPVB: true,
        tinted: false,
        bestFor: 'Serious noise reduction — traffic, tram, aircraft',
        rwRating: 'Rw ~35–37 dB',
        notes: 'Acoustic PVB interlayer significantly damps sound vibration. Up to 65% quieter than single glazing.',
      },
    },
    {
      optionKey: 'D',
      label: 'Option D',
      sublabel: 'Top tier — heat, sun, noise',
      spec: '4mm tinted Low-E + 10mm spacer + 6mm acoustic PVB',
      pricePerSqm: 795,
      heatPct: 70,
      noisePct: 70,
      tech: {
        composition: ['4mm tinted Low-E glass', '10mm air spacer', '6mm laminated with acoustic PVB interlayer'],
        spacerMm: 10,
        lowE: true,
        acousticPVB: true,
        tinted: true,
        bestFor: 'Maximum performance — heat, sun glare, and noise',
        rwRating: 'Rw ~37 dB',
        notes: 'Low-E coating reflects radiant heat. Tint reduces solar heat gain and glare. Best choice for east/west-facing rooms.',
      },
    },
  ]

  for (const option of options) {
    await upsert({
      _id: `pricingOption-${option.optionKey}`,
      _type: 'pricingOption',
      ...option,
    })
  }
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  console.log('=== King Double Glazing → Sanity Migration ===')
  console.log(`Project: ${process.env.SANITY_PROJECT_ID} / ${process.env.SANITY_DATASET}`)

  await migrateSiteSettings()
  await migrateNavigation()
  await migratePageDocuments()
  await migrateFaqs()
  await migrateTestimonials()
  await migrateGallery()
  await migrateProcessSteps()
  await migratePricingOptions()

  console.log('\n✅ Migration complete.')
}

main().catch(err => {
  console.error('\n❌ Migration failed:', err)
  process.exit(1)
})
