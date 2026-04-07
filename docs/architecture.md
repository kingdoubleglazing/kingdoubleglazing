# Architecture

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + CSS variables |
| Content | Repo-resident: MDX (blog), TS data files (everything else) |
| Database | Neon Postgres (free) + Drizzle ORM — leads/quotes only |
| Email | Resend (free) + React Email |
| Forms | Native Server Actions |
| PDF | @react-pdf/renderer |
| Hosting | Vercel (app) + Cloudflare (DNS, WAF, caching) |
| Storage | Cloudflare R2 (user uploads, generated PDFs) |
| Analytics | Vercel Analytics + GA4 |
| Errors | Sentry |
| Tooling | pnpm + Biome |
| Testing | Vitest (logic only, no E2E in v1) |
| Icons | Lucide React (tree-shakeable) |

## Route tree

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
/shower-screens/frameless/                 Frameless
/shower-screens/semi-frameless/            Semi-Frameless
/glass-splashbacks/                        Glass Splashbacks
/custom-mirrors/                           Custom Mirrors
/commercial-glazing/                       Commercial Glazing
/instant-estimate/                         Estimate Tool
/areas/                                    Suburb Index
/areas/[suburb]/                           Suburb Landing (dynamic)
/blog/                                     Blog Index
/blog/[slug]/                              Blog Post (MDX)
/about/                                    About Us
/contact/                                  Contact / Get a Quote
```

Trailing slashes everywhere. `trailingSlash: true` in `next.config.ts`.

## App Router file layout

```
src/
├── app/
│   ├── layout.tsx              Root: header, footer, Organization schema
│   ├── page.tsx                Home
│   ├── sitemap.ts              Auto-generated from routes + data
│   ├── robots.ts
│   ├── opengraph-image.tsx     Default OG
│   ├── double-glazing/
│   │   ├── layout.tsx          Pillar nav, breadcrumbs
│   │   ├── page.tsx            Pillar
│   │   ├── cost/page.tsx
│   │   ├── soundproof-windows/page.tsx
│   │   ├── energy-efficient-windows/page.tsx
│   │   ├── heritage-homes/page.tsx
│   │   └── glass-types/page.tsx
│   ├── emergency-glass/page.tsx
│   ├── shower-screens/
│   │   ├── page.tsx
│   │   ├── frameless/page.tsx
│   │   └── semi-frameless/page.tsx
│   ├── glass-splashbacks/page.tsx
│   ├── custom-mirrors/page.tsx
│   ├── commercial-glazing/page.tsx
│   ├── instant-estimate/
│   │   ├── page.tsx
│   │   └── actions.ts          Server action: submit, email, DB
│   ├── areas/
│   │   ├── page.tsx            Suburb index
│   │   └── [suburb]/page.tsx   generateStaticParams from data/suburbs
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx     MDX rendering
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   └── api/og/route.tsx        Dynamic OG images
├── components/
│   ├── layout/    Header, Footer, EmergencyBanner
│   ├── blocks/    Hero, TrustBar, ServiceCards, BenefitsGrid, ProcessSteps,
│   │              CTABanner, FAQ, ComparisonTable, TestimonialCarousel,
│   │              GlassOptions, SuburbIntro, BeforeAfter, CostRangeCards
│   ├── estimate/  EstimateForm, EstimateResult, steps/
│   └── ui/        Button, Input, Accordion (primitives)
├── data/
│   ├── services/  retrofit.ts, soundproof.ts, energy.ts, heritage.ts, emergency.ts, ...
│   ├── suburbs/   burwood.ts, camberwell.ts, ...
│   ├── glass-types.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   └── nav.ts
├── content/blog/  *.mdx
├── lib/
│   ├── seo/
│   │   ├── generateMetadata.ts
│   │   └── schema/  localBusiness.ts, service.ts, faqPage.ts, article.ts, breadcrumbList.ts
│   ├── pricing.ts   Pure functions for estimate tool
│   ├── db/          schema.ts (Drizzle), client.ts
│   └── email/       client.ts (Resend), templates/
└── styles/globals.css  Tokens + Tailwind directives
```

## Data model patterns

### Service page data

```ts
export const retrofitService = {
  slug: 'double-glazing',
  primaryKeyword: 'retrofit double glazing melbourne',
  title: 'Retrofit Double Glazing Melbourne | From $495/m²',
  metaDescription: '...',
  hero: { heading, subheading, ctaPrimary, ctaSecondary, badges },
  benefits: [...],
  processSteps: [...],
  comparisonTable: {...},
  faqs: [...],
  internalLinks: [...],
} as const
```

### Suburb data

```ts
export const burwood = {
  slug: 'burwood',
  name: 'Burwood',
  postcode: '3125',
  intro: '...',          // unique copy, never templated
  landmarks: [...],
  testimonialIds: [...], // filters from testimonials.ts
  schema: { areaServed: {...} },
} as const
```

## Phase plan

| Phase | Scope | Depends on |
|---|---|---|
| 1 | Foundations: repo, deploy, Sentry, robots, sitemap | — |
| 2 | IA & routing: all routes return placeholder + metadata | Phase 1 |
| 3 | Component system: all 14 core components | Phase 2 |
| 4 | Design pass: tokens, typography, mobile-first styling | Phase 3 |
| 5 | SEO foundation: generateMetadata, schema helpers, OG images | Phase 3 |
| 6 | Content build: Home, Retrofit, Cost, Emergency, About, Contact | Phase 4+5, **gated on Tas assets** |
| 7 | Performance: image/font/JS audit, Lighthouse 100s | Phase 6 |
| 8 | Service depth: soundproof, energy, heritage, glass types, showers, splashbacks, mirrors, commercial | Phase 7 |
| 9 | Instant Estimate Tool | Phase 8, **gated on Tas pricing** |
| 10 | Local SEO: suburb pages (Burwood, Camberwell, Glen Waverley, Hawthorn, Box Hill first) | Phase 7, **gated on GBP access** |
| 11 | Invoicing integration | Deferred, not in v1 |
| 12 | Content engine: blog, new suburbs, quarterly refresh | Ongoing |

## Env vars needed

`RESEND_API_KEY`, `DATABASE_URL`, `SENTRY_DSN`, `NEXT_PUBLIC_GA4_ID`
