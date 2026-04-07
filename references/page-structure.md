# King Double Glazing — Page Structure & Component Architecture (Next.js)

**Status:** Active. Replaces all prior WordPress-era page-structure docs.
**Stack:** Next.js 15 App Router + TypeScript + Tailwind v4. Content lives in the repo (TS data files + MDX). No CMS.

## Document purpose

This is the design and routing blueprint for kingdoubleglazing.com.au. It defines every route, what each page targets for SEO, what components compose it, and how the data flows. Use it as the source of truth when building any page.

## Table of contents

1. Site architecture and route tree
2. App Router file layout
3. Content data model
4. Reusable components
5. Page-by-page breakdown
6. Internal linking strategy
7. URL structure
8. Schema markup plan
9. Phase prioritisation

---

## 1. Site architecture and route tree

```
kingdoubleglazing.com.au/
│
├── /                                            Home (hero hub)
│
├── /double-glazing/                             Retrofit DG Melbourne (pillar)
│   ├── /double-glazing/cost/                    Cost & Pricing Guide
│   ├── /double-glazing/soundproof-windows/      Acoustic / Noise Service
│   ├── /double-glazing/energy-efficient-windows/  Thermal / Energy Service
│   ├── /double-glazing/heritage-homes/          Heritage & Period Homes
│   └── /double-glazing/glass-types/             Glass Types Comparison Hub
│
├── /emergency-glass/                            Emergency Glass Repair Hub
│
├── /shower-screens/                             Shower Screens Hub
│   ├── /shower-screens/frameless/               Frameless Shower Screens
│   └── /shower-screens/semi-frameless/          Semi-Frameless Shower Screens
│
├── /glass-splashbacks/                          Glass Splashbacks
├── /custom-mirrors/                             Custom Mirrors
├── /commercial-glazing/                         Commercial Glazing
│
├── /instant-estimate/                           Instant Estimate Tool
│
├── /areas/                                      Suburb index
│   └── /areas/[suburb]/                         Suburb landing pages (dynamic)
│
├── /blog/                                       Blog index
│   └── /blog/[slug]/                            Blog post (dynamic, MDX)
│
├── /about/                                      About Us
└── /contact/                                    Contact / Get a Quote
```

### Architecture principles

- **3-click rule:** every important page reachable within 3 clicks from home
- **Pillar-cluster model:** `/double-glazing/` is the pillar, sub-pages are topic clusters that link back to and from it
- **One primary keyword per page:** no cannibalisation
- **Silo structure:** double glazing content lives under `/double-glazing/`, glass services under their own slugs
- **Suburb pages are template-driven:** same component composition, unique data per suburb
- **URLs identical to WordPress plan:** zero migration cost if any links already exist

---

## 2. App Router file layout

```
src/
├── app/
│   ├── layout.tsx                              Root layout: header, footer, schema.org Organization
│   ├── page.tsx                                Home
│   ├── sitemap.ts                              Auto-generated from routes + data files
│   ├── robots.ts
│   ├── opengraph-image.tsx                     Default OG image
│   │
│   ├── double-glazing/
│   │   ├── layout.tsx                          Pillar nav, breadcrumbs
│   │   ├── page.tsx                            Pillar page
│   │   ├── cost/page.tsx
│   │   ├── soundproof-windows/page.tsx
│   │   ├── energy-efficient-windows/page.tsx
│   │   ├── heritage-homes/page.tsx
│   │   └── glass-types/page.tsx
│   │
│   ├── emergency-glass/page.tsx
│   │
│   ├── shower-screens/
│   │   ├── page.tsx
│   │   ├── frameless/page.tsx
│   │   └── semi-frameless/page.tsx
│   │
│   ├── glass-splashbacks/page.tsx
│   ├── custom-mirrors/page.tsx
│   ├── commercial-glazing/page.tsx
│   │
│   ├── instant-estimate/
│   │   ├── page.tsx
│   │   └── actions.ts                          Server action: submit lead, send emails, write to DB
│   │
│   ├── areas/
│   │   ├── page.tsx                            Suburb index
│   │   └── [suburb]/
│   │       ├── page.tsx
│   │       └── generateStaticParams from data/suburbs
│   │
│   ├── blog/
│   │   ├── page.tsx                            Blog index
│   │   └── [slug]/
│   │       └── page.tsx                        MDX rendering
│   │
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   │
│   └── api/
│       └── og/route.tsx                        Dynamic OG image generation
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── EmergencyBanner.tsx                 Sticky top, click-to-call
│   ├── blocks/
│   │   ├── Hero.tsx
│   │   ├── TrustBar.tsx
│   │   ├── ServiceCards.tsx
│   │   ├── BenefitsGrid.tsx
│   │   ├── ProcessSteps.tsx
│   │   ├── CTABanner.tsx
│   │   ├── FAQ.tsx
│   │   ├── ComparisonTable.tsx
│   │   ├── TestimonialCarousel.tsx
│   │   ├── GlassOptions.tsx
│   │   ├── SuburbIntro.tsx
│   │   ├── BeforeAfter.tsx
│   │   └── CostRangeCards.tsx
│   ├── estimate/
│   │   ├── EstimateForm.tsx                    Client component
│   │   ├── EstimateResult.tsx
│   │   └── steps/*.tsx
│   └── ui/
│       └── (primitives: Button, Input, Accordion, etc.)
│
├── data/
│   ├── services/
│   │   ├── retrofit.ts
│   │   ├── soundproof.ts
│   │   ├── energy.ts
│   │   ├── heritage.ts
│   │   ├── emergency.ts
│   │   └── ...
│   ├── suburbs/
│   │   ├── burwood.ts
│   │   ├── camberwell.ts
│   │   └── ...
│   ├── glass-types.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   └── nav.ts
│
├── content/
│   └── blog/
│       └── *.mdx
│
├── lib/
│   ├── seo/
│   │   ├── generateMetadata.ts
│   │   └── schema/
│   │       ├── localBusiness.ts
│   │       ├── service.ts
│   │       ├── faqPage.ts
│   │       ├── article.ts
│   │       └── breadcrumbList.ts
│   ├── pricing.ts                              Pure pricing functions for the estimate tool
│   ├── db/
│   │   ├── schema.ts                           Drizzle schema: leads table
│   │   └── client.ts
│   └── email/
│       ├── client.ts                           Resend client
│       └── templates/                          React Email templates
│
└── styles/
    └── globals.css                             Tokens, Tailwind directives
```

---

## 3. Content data model

All page content lives in typed TypeScript files. No CMS, no database content, no fetch calls for content. Build-time only.

### Service page data shape

```ts
// data/services/retrofit.ts
export const retrofitService = {
  slug: 'double-glazing',
  primaryKeyword: 'retrofit double glazing melbourne',
  title: 'Retrofit Double Glazing Melbourne | From $495/m²',
  metaDescription: '...',
  hero: {
    heading: 'Retrofit Double Glazing Melbourne',
    subheading: '...',
    ctaPrimary: { label: 'Get Instant Estimate', href: '/instant-estimate' },
    ctaSecondary: { label: 'Call Now', href: 'tel:...' },
    badges: [...],
  },
  benefits: [...],
  processSteps: [...],
  comparisonTable: {...},
  faqs: [...],
  internalLinks: [...],
} as const
```

Every service page imports its own data file and composes the same components. Updating copy means editing one file. Adding a new service means creating one new data file plus one new page.tsx that's three lines long.

### Suburb data shape

```ts
// data/suburbs/burwood.ts
export const burwood = {
  slug: 'burwood',
  name: 'Burwood',
  postcode: '3125',
  intro: '...',                  // unique copy, never templated
  landmarks: [...],
  testimonialIds: [...],         // filters from testimonials.ts
  schema: { areaServed: {...} },
} as const
```

### Why this matters for SEO

- Build-time generation means every page is fully static and ships zero database calls
- Type safety means it's impossible to ship a page missing a title, meta description, or H1
- One source of truth per page means no copy-paste duplication and no cannibalisation risk

---

## 4. Reusable components

Same component list as the WordPress plan because the visual architecture hasn't changed — only the implementation. Each component is a Server Component unless noted.

### 4.1 Hero
Used on every page. Background image/gradient, H1, supporting text, 1-2 CTAs, optional trust badges row. Variants: full-width (home), compact (service pages), urgent (emergency).

### 4.2 TrustBar
Horizontal strip with 3-5 trust signals. "Melbourne Owned & Operated", "From $495/m²", "4.9★ Google Reviews", "Free Measure & Quote", "No Hidden Costs". Used on home, all service pages, estimate tool, contact.

### 4.3 ServiceCards
Grid of 3-4 cards linking to core services. Used on home and about. Single source of truth in `data/services/index.ts`.

### 4.4 BenefitsGrid
2x3 or 3x3 grid. Identical visual pattern across pages, content unique per page (thermal benefits on energy page, acoustic benefits on noise page, etc.). Used on home, retrofit pillar, energy, noise, heritage.

### 4.5 ProcessSteps
Numbered horizontal steps describing how a service works. Variants per service. Used on retrofit, emergency, shower screens, estimate tool, contact.

### 4.6 CTABanner
Full-width coloured banner with heading, supporting line, CTA. Variants: primary (estimate tool), secondary (call now, for emergency), soft (free consultation, for contact). Appears 1-2 times per page across the entire site.

### 4.7 FAQ
Accordion using native `<details>` for zero-JS baseline, optional client enhancement for animation. Each instance ships its own FAQPage JSON-LD automatically. Content always unique per page, targeting page-specific PAA queries.

### 4.8 ComparisonTable
Responsive table with highlighted "recommended" column. Used on glass types, pricing, retrofit, noise, energy, heritage. Designed for featured snippet eligibility.

### 4.9 TestimonialCarousel
Client component (the only carousel we ship). Pulls from `data/testimonials.ts`. Filters per page: home shows general, suburb pages show suburb-tagged, service pages show service-tagged.

### 4.10 GlassOptions
Visual cards for the four glass options Tas defined: Standard Clear DG, Tinted Low-E, Clear Non-Tinted DG, Premium Acoustic PVB + Low-E. Each card shows U-value, Rw rating, heat reduction %, indicative price. Used on retrofit, glass types, estimate tool.

### 4.11 SuburbIntro
Used on all suburb pages. Wraps unique-per-suburb intro, landmarks, local context.

### 4.12 EmergencyBanner
Sticky top of every page. Click-to-call. Lives in the root layout.

### 4.13 BeforeAfter
Image slider showing before/after install photos. Client component, draggable. Used on retrofit, noise, heritage, suburb pages, blog posts.

### 4.14 CostRangeCards
Cards showing price bands for different scenarios. Used on home and pricing page.

### Component reuse summary

| Component | Times used | Pages |
|---|---|---|
| Hero | 18+ | every page |
| CTABanner | 25+ | every page (1-2 per page) |
| FAQ | 15+ | every service page, pricing, blog posts |
| TrustBar | 12+ | home, all service pages, estimate, contact |
| ProcessSteps | 8+ | home, retrofit, emergency, showers, estimate, contact |
| TestimonialCarousel | 8+ | home, retrofit, noise, heritage, suburb pages, about, contact |
| ComparisonTable | 7+ | pricing, retrofit, noise, energy, heritage, glass types |
| ServiceCards | 5+ | home, about, suburb pages |
| BenefitsGrid | 5+ | home, retrofit, noise, energy, heritage |
| BeforeAfter | 5+ | retrofit, noise, heritage, suburb pages, blog |
| GlassOptions | 3+ | home, retrofit, pricing, glass types |
| CostRangeCards | 2+ | home, pricing |
| EmergencyBanner | global | every page (root layout) |
| SuburbIntro | 15+ | all suburb pages |

Every component's visual design is built once. Content inside each instance is unique to the page it's on.

---

## 5. Page-by-page breakdown

### 5.1 Home — `/`

**Primary keyword:** double glazing melbourne (commercial, high competition — supported by the pillar page)
**Schema:** LocalBusiness (full NAP, hours, geo, rating, services, sameAs links), WebSite with SearchAction
**Composition:** Hero (full-width) → TrustBar → ServiceCards → BenefitsGrid → CostRangeCards → GlassOptions (preview, links to glass types page) → ProcessSteps → TestimonialCarousel → CTABanner (estimate)

### 5.2 Retrofit Double Glazing Melbourne — `/double-glazing/`

**Primary keyword:** retrofit double glazing melbourne
**Status:** PILLAR page. Supports the entire `/double-glazing/*` cluster.
**Schema:** Service (serviceType: retrofit double glazing, areaServed: Greater Melbourne, offers with priceRange "from $495/m²"), BreadcrumbList
**Composition:** Hero (compact) → TrustBar → BenefitsGrid (5-6 retrofit benefits) → GlassOptions (full) → ProcessSteps (4 steps: measure → quote → install → enjoy) → ComparisonTable (retrofit vs full replacement vs secondary glazing) → BeforeAfter → TestimonialCarousel (filtered: retrofit) → FAQ (8-10 retrofit-specific) → CTABanner (estimate)
**Internal links:** every `/double-glazing/*` child, instant estimate, 3 blog posts, 2-3 suburb pages

### 5.3 Double Glazing Cost Melbourne — `/double-glazing/cost/`

**Primary keyword:** double glazing cost melbourne
**Schema:** Service + Offer with price range, FAQPage, BreadcrumbList
**Composition:** Hero (compact, headline emphasises pricing) → TrustBar → CostRangeCards (full) → ComparisonTable (cost by glass type) → BenefitsGrid (value framing) → ProcessSteps (how quoting works) → FAQ (cost-specific) → CTABanner (estimate)

### 5.4 Soundproof Windows Melbourne — `/double-glazing/soundproof-windows/`

**Primary keyword:** soundproof windows melbourne
**Schema:** Service (acoustic glazing), FAQPage, BreadcrumbList
**Composition:** Hero (compact, noise-focused imagery) → TrustBar → BenefitsGrid (acoustic benefits) → ComparisonTable (Rw ratings by glass config) → GlassOptions (acoustic-focused) → ProcessSteps → TestimonialCarousel (filtered: noise) → FAQ → CTABanner

### 5.5 Energy Efficient Windows Melbourne — `/double-glazing/energy-efficient-windows/`

**Primary keyword:** energy efficient windows melbourne
**Schema:** Service (thermal glazing), FAQPage, BreadcrumbList
**Composition:** Hero (compact, energy/comfort imagery) → TrustBar → BenefitsGrid (thermal benefits, U-value emphasis) → ComparisonTable (U-values by glass config) → GlassOptions (Low-E focused) → ProcessSteps → TestimonialCarousel → FAQ → CTABanner

### 5.6 Heritage & Period Homes — `/double-glazing/heritage-homes/`

**Primary keyword:** heritage double glazing melbourne
**Schema:** Service, FAQPage, BreadcrumbList
**Composition:** Hero (compact, heritage home imagery) → TrustBar → BenefitsGrid (heritage-specific: preservation, council compliance) → BeforeAfter (heritage examples) → ProcessSteps (heritage-specific approval flow) → TestimonialCarousel → FAQ → CTABanner

### 5.7 Glass Types Hub — `/double-glazing/glass-types/`

**Primary keyword:** double glazing glass types
**Schema:** Article (educational), BreadcrumbList
**Composition:** Hero (compact) → GlassOptions (full, all four) → ComparisonTable (full feature matrix) → BenefitsGrid (when to choose what) → FAQ → CTABanner (estimate)

### 5.8 Emergency Glass Repair Melbourne — `/emergency-glass/`

**Primary keyword:** emergency glass repair melbourne
**Schema:** Service (emergency, 24/7), LocalBusiness reinforcement, FAQPage, BreadcrumbList
**Composition:** Hero (urgent variant, click-to-call dominant) → TrustBar (emergency-focused: response time, 24/7) → ProcessSteps (call → arrive → make safe → permanent fix) → BenefitsGrid → TestimonialCarousel → FAQ → CTABanner (call-now variant)
**Mobile critical:** thumb-reachable click-to-call, large buttons, no friction

### 5.9 Shower Screens Hub — `/shower-screens/`

**Primary keyword:** shower screens melbourne
**Schema:** Service, BreadcrumbList
**Composition:** Hero (compact) → TrustBar → ServiceCards (links to frameless and semi-frameless) → BenefitsGrid → ProcessSteps → BeforeAfter → TestimonialCarousel → FAQ → CTABanner

### 5.10 Frameless Shower Screens — `/shower-screens/frameless/`

**Primary keyword:** frameless shower screens melbourne
**Composition:** Hero → BenefitsGrid → BeforeAfter → ComparisonTable (frameless vs semi-frameless vs framed) → FAQ → CTABanner

### 5.11 Semi-Frameless Shower Screens — `/shower-screens/semi-frameless/`

**Primary keyword:** semi frameless shower screens melbourne
**Composition:** mirror of frameless

### 5.12 Glass Splashbacks — `/glass-splashbacks/`

**Primary keyword:** glass splashbacks melbourne
**Composition:** Hero → BenefitsGrid → BeforeAfter → FAQ → CTABanner

### 5.13 Custom Mirrors — `/custom-mirrors/`

**Primary keyword:** custom mirrors melbourne
**Composition:** Hero → BenefitsGrid → ProcessSteps → FAQ → CTABanner

### 5.14 Commercial Glazing — `/commercial-glazing/`

**Primary keyword:** commercial glazing melbourne
**Schema:** Service (B2B framing), BreadcrumbList
**Composition:** Hero (B2B variant) → TrustBar (commercial credentials) → BenefitsGrid (commercial-focused) → ProcessSteps (B2B project flow) → TestimonialCarousel (commercial filter) → FAQ → CTABanner (contact-focused, not estimate)

### 5.15 Instant Estimate Tool — `/instant-estimate/`

**Primary keyword:** double glazing quote melbourne
**Schema:** WebApplication, Service
**Composition:** Hero (compact, value prop: "Accurate within 10%, no email required to see your number") → TrustBar → ProcessSteps (1. enter details 2. get estimate 3. book assessment) → EstimateForm (multi-step client component) → FAQ → CTABanner (soft, contact)
**Critical:** the calculation result must show *before* the lead capture step. Show the number, then ask for contact details to send the formal PDF quote. This is the differentiator and the reason competitors don't have one — most lead capture tools gate the value behind the form.

### 5.16 About Us — `/about/`

**Schema:** AboutPage, Organization
**Composition:** Hero (compact, team or workshop imagery) → BenefitsGrid (why us) → ProcessSteps (our approach) → TestimonialCarousel → ServiceCards → CTABanner

### 5.17 Contact / Get a Quote — `/contact/`

**Schema:** ContactPage, LocalBusiness
**Composition:** Hero (compact) → TrustBar → Contact form (server action, lighter than estimator) → ProcessSteps → FAQ → CTABanner

### 5.18 Suburb Index — `/areas/`

**Schema:** CollectionPage, BreadcrumbList
**Composition:** Hero (compact) → grid of all suburbs as cards → CTABanner

### 5.19 Suburb Landing Page — `/areas/[suburb]/`

**Primary keyword:** double glazing [suburb]
**Schema:** LocalBusiness with areaServed scoped to suburb, Service, BreadcrumbList
**Composition:** Hero (compact, suburb-specific H1) → SuburbIntro (unique copy) → ServiceCards → BenefitsGrid → TestimonialCarousel (suburb-filtered) → FAQ → CTABanner
**Generated via:** `generateStaticParams` reading from `/data/suburbs/`

### 5.20 Blog Index — `/blog/`

**Schema:** Blog, BreadcrumbList
**Composition:** Hero (compact) → post grid sorted by date → category filters → CTABanner

### 5.21 Blog Post — `/blog/[slug]/`

**Schema:** Article, BreadcrumbList, FAQPage if FAQ included
**Composition:** Hero (compact, post title as H1) → MDX content → FAQ (if defined in frontmatter) → related posts → CTABanner
**Internal linking required per post:** 1 primary service page, 2+ related services, 1 estimate tool link, 1-2 related blog posts

---

## 6. Internal linking strategy

```
HOME
  ├── all service hubs
  ├── /instant-estimate/
  ├── /blog/ + 3 latest posts
  └── /areas/

RETROFIT DG (pillar)
  ├── all /double-glazing/* children
  ├── /instant-estimate/
  ├── 3+ blog posts
  └── 2-3 suburb pages

EVERY SERVICE PAGE
  ├── parent hub
  ├── 2-3 sibling service pages
  ├── /instant-estimate/ or /contact/
  └── 2+ relevant blog posts

EVERY BLOG POST
  ├── 1 primary service page
  ├── 2+ related service pages
  ├── /instant-estimate/
  └── 1-2 related blog posts

EVERY SUBURB PAGE
  ├── all core service pages
  ├── /instant-estimate/
  ├── 3-5 adjacent suburb pages
  └── 1-2 relevant blog posts
```

### Rule (enforced manually for now, lintable later)

Every new page must:
1. Link TO at least 3 existing pages
2. Get links FROM at least 3 existing pages
3. Use descriptive anchor text — never "click here" or "learn more" alone

---

## 7. URL structure

```
/                                          Home
/double-glazing/                           Retrofit DG (pillar)
/double-glazing/cost/                      Pricing Hub
/double-glazing/soundproof-windows/        Noise Service
/double-glazing/energy-efficient-windows/  Thermal Service
/double-glazing/heritage-homes/            Heritage & Period
/double-glazing/glass-types/               Glass Comparison
/emergency-glass/                          Emergency Glass Repair
/shower-screens/                           Shower Screens Hub
/shower-screens/frameless/                 Frameless Shower Screens
/shower-screens/semi-frameless/            Semi-Frameless Shower Screens
/glass-splashbacks/                        Glass Splashbacks
/custom-mirrors/                           Custom Mirrors
/commercial-glazing/                       Commercial Glazing
/instant-estimate/                         Estimate Tool
/areas/                                    Suburb Index
/areas/[suburb]/                           Suburb Landing Pages
/blog/                                     Blog Index
/blog/[slug]/                              Blog Posts
/about/                                    About Us
/contact/                                  Contact / Get a Quote
```

Trailing slashes consistent everywhere. Configured in `next.config.ts` with `trailingSlash: true`.

---

## 8. Schema markup plan

### Site-wide (root layout)

- WebSite with SearchAction
- Organization / HomeAndConstructionBusiness as the main entity
- BreadcrumbList on every non-home page (auto-generated by a helper from the route)

### Per-page schema

| Page type | Schema types |
|---|---|
| Home | LocalBusiness (full NAP, hours, geo, aggregateRating, services, sameAs) |
| Service pages | Service (serviceType, areaServed, offers with priceRange) |
| FAQ sections | FAQPage (auto-injected by FAQ component) |
| Pricing page | Service + Offer with price ranges |
| Blog posts | Article (headline, datePublished, dateModified, author, image) |
| Suburb pages | LocalBusiness + Service with areaServed scoped to suburb |
| Estimate tool | WebApplication |

All schemas implemented as typed helpers in `lib/seo/schema/*.ts`. JSON-LD injected via `<script type="application/ld+json">` in the page's head. No third-party plugin involved.

---

## 9. Phase prioritisation

### Phase 1 — Launch foundation (week 3-4 of project plan)
1. Home
2. Retrofit Double Glazing Melbourne (pillar)
3. Double Glazing Cost Melbourne
4. Emergency Glass Repair Melbourne
5. About Us
6. Contact

Components needed: Hero, TrustBar, ServiceCards, BenefitsGrid, ProcessSteps, CTABanner, FAQ, ComparisonTable, EmergencyBanner, CostRangeCards

### Phase 2 — Service depth (week 5)
1. Soundproof Windows Melbourne
2. Energy Efficient Windows Melbourne
3. Heritage & Period Homes
4. Glass Types Comparison Hub

Adds: GlassOptions, TestimonialCarousel, BeforeAfter

### Phase 3 — Revenue pages (week 6)
1. Shower Screens hub + frameless + semi-frameless
2. Glass Splashbacks
3. Custom Mirrors
4. Commercial Glazing

### Phase 4 — Instant Estimate Tool (week 6-7)
The differentiator. Detailed in project plan Phase 9.

### Phase 5 — Local SEO rollout (week 8 onward)
1. Suburb pages: Burwood, Camberwell, Glen Waverley, Hawthorn, Box Hill (first batch)
2. Blog: first 5 posts targeting low-difficulty high-intent keywords
3. Remaining suburb pages in batches of 5
4. GBP optimisation + citation building

### Phase 6 — Content engine (ongoing)
1. 1-2 blog posts per week
2. New suburb pages in batches of 3-5
3. Quarterly content refresh on pillar pages
4. Testimonial collection and display

---

## Key SEO principles applied

1. **One primary keyword per page** — no cannibalisation
2. **Keyword in H1, first 100 words, URL, title tag, meta description** — every page
3. **FAQ sections with FAQPage schema** — every service page for PAA capture
4. **Comparison tables** — designed for featured snippet eligibility
5. **Internal linking** — every page in 3+, out 3+, pillar-cluster model
6. **Content gaps exploited** — heritage overlays, body corporate, Melbourne noise scenarios, interactive pricing tool — competitors don't cover these
7. **"From $495/m²" messaging** — transparent pricing as the brand differentiator throughout
8. **Suburb pages** — systematic local SEO that competitors have started but not completed
9. **Blog supports service pages** — informational content links to and builds authority for commercial pages
10. **Mobile-first** — emergency page optimised for click-to-call, all components responsive
11. **Static-first rendering** — every content page is fully static, ships zero JS where possible, loads in well under 1 second
12. **Schema as code** — typed helpers make it impossible to ship a page without correct structured data
