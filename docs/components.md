# Components

All components are Server Components unless marked **[client]**. All copy passed via props — no hardcoded text. Tailwind only.

## Layout

| Component | Location | Notes |
|---|---|---|
| Header | `components/layout/Header.tsx` | Nav, logo, CTA button |
| Footer | `components/layout/Footer.tsx` | NAP, links, schema |
| EmergencyBanner | `components/layout/EmergencyBanner.tsx` | Sticky top, click-to-call, global |

## Blocks

### Hero
- **Variants:** `full-width` (home), `compact` (service pages), `urgent` (emergency)
- **Props:** heading, subheading, ctaPrimary, ctaSecondary, badges[], backgroundImage?, variant
- **Used on:** every page

### TrustBar
- **Props:** items[] (icon, label)
- **Default items:** "Melbourne Owned & Operated", "From $495/m²", "4.9★ Google Reviews", "Free Measure & Quote", "No Hidden Costs"
- **Used on:** home, all service pages, estimate, contact

### ServiceCards
- **Props:** services[] (title, description, href, icon)
- **Data source:** `data/services/index.ts`
- **Used on:** home, about, suburb pages

### BenefitsGrid
- **Props:** benefits[] (icon, title, description), columns?: 2 | 3
- **Content:** unique per page (thermal on energy, acoustic on noise, etc.)
- **Used on:** home, retrofit, energy, noise, heritage

### ProcessSteps
- **Props:** steps[] (number, title, description)
- **Used on:** home, retrofit, emergency, showers, estimate, contact

### CTABanner
- **Variants:** `primary` (estimate), `secondary` (call now), `soft` (consultation)
- **Props:** heading, description, cta, variant
- **Used on:** every page, 1-2 per page

### FAQ
- **Props:** items[] (question, answer), pageUrl (for schema)
- **Implementation:** native `<details>` for zero-JS baseline
- **Schema:** auto-injects FAQPage JSON-LD
- **Used on:** every service page, pricing, blog posts

### ComparisonTable
- **Props:** headers[], rows[], highlightColumn?
- **Design:** responsive, highlighted "recommended" column, snippet-eligible
- **Used on:** glass types, pricing, retrofit, noise, energy, heritage

### TestimonialCarousel **[client]**
- **Props:** testimonials[] (filtered by page), autoPlay?
- **Data source:** `data/testimonials.ts`
- **Used on:** home, retrofit, noise, heritage, suburb pages, about, contact

### GlassOptions
- **Props:** options[] (name, uValue, rwRating, heatReduction, price, description)
- **Options:** Standard Clear DG, Tinted Low-E, Clear Non-Tinted DG, Premium Acoustic PVB + Low-E
- **Used on:** home (preview), retrofit, glass types, estimate

### SuburbIntro
- **Props:** suburb (name, intro, landmarks[], postcode)
- **Used on:** all suburb pages

### BeforeAfter **[client]**
- **Props:** before (image, alt), after (image, alt), caption?
- **Implementation:** draggable slider
- **Used on:** retrofit, noise, heritage, suburb pages, blog

### CostRangeCards
- **Props:** ranges[] (label, priceRange, description)
- **Used on:** home, pricing

## Estimate (all client)

| Component | Purpose |
|---|---|
| EstimateForm | Multi-step form, server actions for submission |
| EstimateResult | Shows estimate range BEFORE lead capture |
| steps/*.tsx | Individual form steps |

## UI Primitives

Button, Input, Accordion — minimal, typed, Tailwind only.

## Component reuse map

| Component | Count | Key pages |
|---|---|---|
| Hero | 18+ | every page |
| CTABanner | 25+ | every page (1-2x) |
| FAQ | 15+ | every service page |
| TrustBar | 12+ | home, services, estimate |
| ProcessSteps | 8+ | home, retrofit, emergency |
| TestimonialCarousel | 8+ | home, retrofit, suburb |
| ComparisonTable | 7+ | pricing, retrofit, energy |
| BenefitsGrid | 5+ | home, retrofit, energy |
| BeforeAfter | 5+ | retrofit, heritage, suburb |
| GlassOptions | 3+ | home, retrofit, glass types |
| CostRangeCards | 2+ | home, pricing |
| EmergencyBanner | 1 | global (root layout) |
| SuburbIntro | 15+ | all suburb pages |
