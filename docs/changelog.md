# Changelog

Track significant changes, decisions, and milestones. Most recent first.

---

## 2026-04-28 — Sanity CMS migration (full)

**Sanity Studio embedded at `/studio`** (route group isolated from site layout).

**All content migrated from static TypeScript data files to Sanity:**
- Singleton documents: `siteSettings`, `navigation`, `homePage`, `servicesPage`, `aboutPage`, `contactPage`, `warrantyPage`, `estimatePage`
- Collection documents: 42 testimonials, 10 gallery items, 36 FAQ items (7 groups), 4 pricing options, 4 process steps
- All images uploaded to Sanity CDN via migration script (`scripts/migrate-to-sanity.ts`)

**Architecture changes:**
- `app/(site)/` route group: site pages share layout (Header/Footer/EmergencyBanner/FloatingNav); `/studio` gets minimal root layout
- `sanity/schemas/` — 13 schemas with singleton structure tool config
- `sanity/lib/` — `client.ts`, `fetch.ts` (ISR with tags), `queries.ts`, `image.ts`
- `sanity/types.ts` — TypeScript interfaces for all document types
- `components/layout/HeaderWrapper.tsx`, `FloatingNavWrapper.tsx` — async server wrappers for client layout components
- `Footer`, `CtaBanner`, `FreeAdviceBlock` — converted to async server components
- `GlassComparisonTable`, `GlassTechSpecs` — now accept `options: PricingOption[]` as props
- `data/pricing.ts` — `OPTIONS` removed (now in Sanity); `calculateQuote` updated to accept `pricePerSqm: number`
- `app/api/revalidate/` — webhook endpoint for on-demand ISR revalidation from Sanity
- OG image routes remain on edge runtime with static `siteConfig` pricing data

---

## 2026-04-28 — Dead code removal + doc refresh

**Deleted unused components (9 files, ~58 KB):**
- `components/EstimateCalculator.tsx` + `EstimateCalculator.legacy.tsx` — never imported
- `components/sections/ComparisonTable.tsx`, `EmergencyHero.tsx`, `ProblemSolutionSection.tsx`, `ServicesSection.tsx` — leftovers from pre-migration
- `components/ui/Breadcrumb.tsx`, `navigation-menu.tsx`, `ZoomableImage.tsx` — never imported

**Deleted empty directory:** `content/` (blog removed in April migration, directory left behind)

**Updated docs:**
- `docs/architecture.md` — rewrote to reflect actual current routes, file layout, and stack (old doc described 27-route structure)
- `docs/components.md` — rewrote to list only components that exist and are in use

---

## 2026-04-15 — Full site migration: 27-route SEO site → 5-page conversion funnel

Executed full migration per `references/migration/migration.md`, `homepage-funnel.md`, and `copy-voice.md`.

**Deleted** (27 routes → 5 routes):
- `app/areas/`, `app/blog/`, `app/commercial-glazing/`, `app/custom-mirrors/`, `app/double-glazing/` (all subpages), `app/emergency-glass/`, `app/gallery/`, `app/glass-splashbacks/`, `app/shower-screens/`
- `components/sections/`: AcousticComparisonTable, ThermalComparisonTable, GlassFeatureMatrix, GlassPickerGuide, GlassTypeDetail, GlassCostTable, CostRangeCards, RetrofitSystem, GalleryPreview, BeforeAfter
- `components/blocks/GlassOptions.tsx`
- All blog/area/glass-type data files

**Rewrote** (copy + structure):
- `EmergencyBanner` → repurposed as yellow "Stop — Don't Overpay" discount bar (sticky top)
- `Header` → simplified to 5 nav items, Instant Estimate styled as yellow button
- `Footer` → 3-column, removed area links
- `FloatingNav` → removed servicesNav dependency
- `TrustBar` → 4 new items (50+ years, beat any quote 30%, lifetime warranty, Melbourne-owned)
- `ProblemSolutionSection` → 3-line numbered problem list
- `BenefitsGrid` → updated copy to include numbers in every benefit
- `ComparisonTable` → full rewrite as 3-column (Do Nothing / Retrofit / Full Replacement) per funnel spec
- `ServicesSection` → updated hrefs to /services/#anchor
- `FounderStory` → condensed to 80-word strip with Tas's real story
- `ProcessSteps` → simplified to 3 steps
- `data/process-steps.ts`, `data/testimonials.ts` (top 3 now outcome-led), `data/contact-faq.ts` (3 Qs), `data/estimate-faq.ts` (5 Qs)
- `CtaBanner` → lifetime warranty (was 10-year)
- `ContactForm` → service options trimmed to 5-page scope

**Created**:
- `app/services/page.tsx` — single scrollable page with 6 anchor-linked sections
- `lib/pricing.ts` — pure pricing function for estimate tool
- `data/homepage-faq.ts` — 5 homepage FAQs per funnel spec

**Pages rewritten**:
- `app/page.tsx` — exact section order per `HOMEPAGE_FUNNEL.md §0` (15 sections)
- `app/about/page.tsx` — Tas's real story, guarantees block, testimonials
- `app/contact/page.tsx` — simplified, 3 FAQs, prominent click-to-call
- `app/instant-estimate/page.tsx` — rebuilt around new multi-step EstimateForm
- `components/sections/EstimateForm.tsx` — new 4-step form + show-then-gate result per funnel spec

**Sitemap** → 5 pages only. **Nav** → 5 items only. No VEU/rebate mentions anywhere.

---

## 2026-04-10 — PageSpeed fixes (mobile 80→target 90+, accessibility 88→96+, SEO 92→100)

- **ProcessSteps image `sizes`** (`components/sections/ProcessSteps.tsx`): Added `sizes="(min-width: 768px) 25vw, 100vw"` to step images; was defaulting to full-width causing ~278 KiB over-download on desktop where images display at ~25vw
- **Stars `role="img"`** (`components/sections/Testimonials.tsx`): Added `role="img"` to the star-rating `<div>`; `aria-label` is only valid when the element has a role that permits naming — fixes "Elements use prohibited ARIA attributes" audit on both mobile and desktop
- **FloatingNav `inert`** (`components/layout/FloatingNav.tsx`): Replaced `aria-hidden={!show}` with `inert={!show}` (React 19 boolean attribute); removed all individual `tabIndex` props and `ts-expect-error` hack — `inert` handles focus, pointer events, and AT visibility atomically; fixes "aria-hidden contains focusable descendants" audit on desktop
- **GlassOptions link text** (`components/blocks/GlassOptions.tsx`): Added `<span className="sr-only"> about {glass.name}</span>` to "Learn more" links; removed now-redundant `aria-label` prop; fixes "Links do not have descriptive text" SEO audit (3 links flagged as "LEARN MORE")
- **Security headers** (`next.config.ts`): Added `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Strict-Transport-Security` (with includeSubDomains + preload), `Cross-Origin-Opener-Policy: same-origin-allow-popups`, `Referrer-Policy`, `Permissions-Policy` via Next.js `headers()` config — resolves all "Best Practices / Trust and Safety" advisory flags

---

## 2026-04-10 — SEO content depth

- **Sitemap** (`app/sitemap.ts`): Removed hardcoded 5-suburb slug list; now imports `suburbs` from `data/suburbs.ts` and maps all 30 suburb slugs dynamically — previously 25 suburb pages were invisible to Google
- **Suburb testimonials** (`data/testimonials.ts`): Added 18 suburb-specific testimonials for all previously uncovered suburbs (Kew, Malvern, Canterbury, Glen Iris, Doncaster, Box Hill, Burwood, Caulfield, Ringwood, Toorak, Templestowe, Mitcham, Nunawading, Vermont, Wantirna, Wheelers Hill, Mont Albert, Balwyn North); suburb page template already filters by name — all 30 suburb pages now display a suburb-specific testimonial

---

## 2026-04-10 — SEO internal linking completed

- **Pillar → cluster links** (`app/double-glazing/page.tsx`): Added "Double Glazing Topics" section after ComparisonTable linking to all 5 cluster pages (soundproof-windows, energy-efficient-windows, heritage-homes, glass-types, cost)
- **Gallery links from service pages**: Added "See It Installed / Browse the gallery →" strip before CtaBanner on all 6 service pages; category-filtered links for double-glazing (`?category=double-glazing`), shower-screens (`?category=shower-screens`), commercial-glazing (`?category=commercial`), emergency-glass (`?category=repairs`); splashbacks and custom-mirrors link to `/gallery/`
- **Suburb → areas hub back-link** (`app/areas/[suburb]/page.tsx`): Added prominent "← Browse all Melbourne service areas" link at the bottom of the services section (in addition to existing breadcrumb)

---

## 2026-04-09 — Client content: Glass Picker Guide + Modular Retrofit System sections

- **`GlassPickerGuide` section** (`components/sections/GlassPickerGuide.tsx`): Two-path decision tree (Less Heat vs Less Noise) for the glass-types page. Thermal path recommends Low-E → Tinted Low-E with north-facing note. Acoustic path shows Rw comparison table (Standard Clear 35 dB / Standard Laminated 38 dB / Acoustic PVB Laminated 42 dB) and explains the PVB advantage. Each path ends with a direct CTA to the Instant Estimate form. Added to `/double-glazing/glass-types/` before the FAQ.
- **`RetrofitSystem` section** (`components/sections/RetrofitSystem.tsx`): Three-feature block covering the modular retrofit glazing system — wide adjustment range, engineered profiles for most aluminium frames, and custom-machined adapters for unique conditions. Includes a "Custom Capability" callout strip with click-to-call CTA. Added to `/double-glazing/` between BenefitsGrid and GlassOptions.
- Both sections use existing design tokens (`ghost-border`, `primary-container`, `surface-container`, `font-display`, `font-headline`, `rounded-none`).

---

## 2026-04-09 — SEO critical gaps resolved

- **OG images**: Created `app/opengraph-image.tsx` (root brand OG image via `ImageResponse`) and `app/blog/[slug]/opengraph-image.tsx` (dynamic per-post OG images — imports `blogPosts` directly to avoid edge-runtime `fs` incompatibility)
- **JSON-LD — double-glazing hub**: Added `Service` + `BreadcrumbList` schemas to `app/double-glazing/page.tsx`
- **JSON-LD — cost page**: Added `Service` + `BreadcrumbList` schemas to `app/double-glazing/cost/page.tsx`; FAQ schema emitted by `<FAQ>` component automatically
- **FAQ component schema**: Added `buildFaqSchema` emission to `components/sections/FAQ.tsx`; new `emitSchema` prop (default `true`) prevents double-emission on pages that inject FAQ schema themselves
- **Breadcrumb component**: Created `components/ui/Breadcrumb.tsx` — accessible `<nav>` with `BreadcrumbList` JSON-LD emission, `className` prop for spacing, `emitSchema` opt-out; replaced inline breadcrumb in suburb pages
- **NAP**: Set `address.postcode = '3000'` and updated `display` in `data/site.ts` to match Melbourne CBD geo coordinates; street address awaits Tas confirmation

---

## 2026-04-09 — Blog Post page built (`/blog/[slug]/`)

- Implemented `app/blog/[slug]/page.tsx`: `generateStaticParams` from `blogPosts`, `generateMetadata` per-post, Hero (compact, post title as H1) → MDX article body → FAQ accordion → Related Posts grid → Related Services links → CtaBanner
- Installed `next-mdx-remote` (RSC) + `remark-gfm` for MDX rendering
- Created `lib/blog.ts` — filesystem utilities: `getBlogPost`, `getBlogPostContent`, `getRelatedPosts`, `getAllBlogSlugs`
- Created `components/blog/BlogProse.tsx` — KDG-styled MDX component overrides (h2–h4, p, ul/ol/li, blockquote, a, table, hr, code/pre); zero JS, Tailwind only
- Expanded `data/blog-posts.ts` — added `primaryService`, `relatedServices`, `relatedPosts`, `faqItems?`, `dateModified?` fields to `BlogPost` interface; populated all 10 posts with full internal-linking metadata and per-post FAQ items for commercially important posts
- Created `content/blog/*.mdx` — full article content for all 10 posts; first 6 are full-length guides, last 4 complete articles
- JSON-LD: Article + BreadcrumbList on every post; FAQPage added when `faqItems` defined
- Updated `app/sitemap.ts` — blog post routes auto-generated from `blogPosts` array with `lastModified` from `dateModified ?? datePublished`
- Internal linking per post: `primaryService` (Value Ledger inline CTA), `relatedServices` footer bar (2–3 links), estimate tool link, 1–2 related posts programmatically rendered

---

## 2026-04-09 — Blog Index page built (`/blog/`)

- Rebuilt `app/blog/page.tsx` from stub: compact HeroSection → category filter nav → post grid → service internal links → CtaBanner
- Created `data/blog-posts.ts` — 10 blog posts across 6 categories (`retrofit`, `pricing`, `acoustic`, `energy`, `heritage`, `glass-types`) with `BlogPost` interface and `BLOG_CATEGORIES` lookup array
- Category filtering: server-side via `searchParams.category` — no `'use client'` needed; filter links use plain Next.js `<Link>` components
- Post grid: 3-col lg / 2-col md / 1-col mobile; cards show category badge, read time, date, title, excerpt, article link
- JSON-LD: `Blog` schema (with `blogPost` array of `BlogPosting` entries) + `BreadcrumbList`
- Internal links section: 7 related service pages linked below the grid
- `animate-stagger-child` on grid cards for scroll-driven staggered reveal

---

## 2026-04-09 — Contact page built + navbar linked

- Rebuilt `app/contact/page.tsx` from stub: Hero (compact, 2-col with contact cards) → TrustBar → ContactForm → ProcessSteps → FAQ → CtaBanner
- Created `app/contact/actions.ts` — Server Action `submitContactForm` with honeypot protection, field validation, and TODO stub for mailer/CRM integration
- Created `components/sections/ContactForm.tsx` — `'use client'` form using `useActionState`; includes service dropdown, email+phone side-by-side, success/error states
- Created `data/contact-faq.ts` — 6 FAQ items + `ContactFaqItem` type
- Added `{ label: 'Contact', href: '/contact/' }` to `mainNav` in `data/nav.ts` — automatically appears in desktop nav and mobile sheet
- `footerNav.company` already had Contact entry — no footer change needed
- JSON-LD: ContactPage + LocalBusiness + FAQPage schemas

---

## 2026-04-09 — Instant Estimate Tool (draft) built

- Rebuilt `app/instant-estimate/page.tsx` from stub to full page: Hero → TrustBar → ProcessSteps → EstimateForm → FAQ → CtaBanner
- Created `components/sections/EstimateForm.tsx` — `'use client'` multi-step calculator:
  - Step 1: window count stepper (1–30), window size radio cards (4 presets with m² area), glass type radio cards (from `glassTypes` data with live $/m² prices)
  - Step 2: estimate revealed **before** any lead capture — large gold price range + Value Ledger breakdown; optional "Email Me This Estimate" lead form (name + email + phone)
  - Success state after optional form submission
- Created `data/estimate-faq.ts` — 8 FAQ items + `estimateProcessSteps` (3 estimate-specific steps)
- JSON-LD: WebApplication schema + FAQPage schema
- TrustBar: estimate-specific trust items (accuracy, no email required, no sales calls, 10-yr warranty, 90-second result)
- Key UX principle: number is shown first; lead capture is a soft, optional step below — the differentiator vs competitor gated-quote tools
- TODO: wire `handleLeadSubmit` to `/api/estimate-lead` route when backend ready

---

## 2026-04-09 — Commercial Glazing page built

- Created `app/commercial-glazing/page.tsx` — full B2B page replacing the placeholder stub
- Sections: Hero → TrustBar (commercial credentials) → BenefitsGrid → ProcessSteps → TestimonialCarousel (commercial filter) → FAQ → CtaBanner (contact-focused, not estimate)
- Added 3 `commercial`-tagged entries to `data/testimonials.ts` (strata manager, retail fitout, property developer)
- TrustBar: Licensed Glazier, Insurance Certs on Request, Strata & Developer Ready, Melbourne Owned, Melbourne-Wide
- BenefitsGrid: 6 commercial benefits — full scope, compliance docs, itemised quotes, preferred supplier, out-of-hours, NABERS documentation
- ProcessSteps: 4 B2B project flow steps — scope review → itemised quote → scheduled & confirmed → installed & certified
- 8 FAQ items covering strata, multi-site, insurance certs, out-of-hours, double glazing retrofits, pricing, lead time, references
- JSON-LD: Service + BreadcrumbList + FAQPage schemas
- Primary keyword: commercial glazing melbourne

---

## 2026-04-09 — Custom Mirrors page built

- Created `app/custom-mirrors/page.tsx` — full page replacing the placeholder stub
- Sections: Hero (compact) → BenefitsGrid → ProcessSteps → FAQ → CtaBanner
- 6 benefits: any shape/size, edge finishes, moisture-resistant backing, mirror-safe adhesive, transparent pricing, installed in hours
- 4 process steps: measure/quote → glass cut to order → installation booked → fitted
- 8 FAQ items inline: cost, sizes/shapes, bevelling, adhesive system, wet areas, gym mirrors, lead time, old mirror removal
- JSON-LD: Service + BreadcrumbList + FAQPage schemas
- Primary keyword: custom mirrors melbourne

---

## 2026-04-09 — Glass Splashbacks page built

- Created `app/glass-splashbacks/page.tsx` — full page replacing the placeholder stub
- Sections: Hero (compact) → BenefitsGrid → BeforeAfter → FAQ → CtaBanner
- 6 splashback-specific benefits: any colour, longevity, cleanability, custom sizing, AS/NZS 2208, transparent pricing
- BeforeAfter: 4 metrics comparing tiles vs glass (grout lines, cleaning time, 5-year appearance, colour options)
- 8 FAQ items defined inline (gas cooktop, colours, adhesive fixing, over-tiles installation, cut-outs, tiles vs glass)
- JSON-LD: Service + BreadcrumbList + FAQPage schemas
- Primary keyword: glass splashbacks melbourne

---

## 2026-04-09 — Semi-frameless shower screens page built

- Created `app/shower-screens/semi-frameless/page.tsx` — full page replacing the placeholder stub
- Sections: Hero (compact) → BenefitsGrid → BeforeAfter → ComparisonTable (inline) → FAQ → CtaBanner
- Inline comparison: Semi-Frameless (highlighted) vs Frameless vs Framed (8 rows)
- Benefits and BeforeAfter data scoped to the semi-frameless vs framed scenario
- FAQ reuses `data/shower-screens-faq.ts`
- JSON-LD: Service + BreadcrumbList + FAQPage schemas
- Primary keyword: semi frameless shower screens melbourne

---

## 2026-04-09 — Frameless shower screens page built

- Created `app/shower-screens/frameless/page.tsx` — full page replacing the placeholder stub
- Sections: Hero (compact) → BenefitsGrid → BeforeAfter → ComparisonTable (inline) → FAQ → CtaBanner
- Inline comparison: Frameless vs Semi-Frameless vs Framed (8 rows, typed Cell union)
- Benefits and BeforeAfter data scoped to the frameless vs framed scenario
- FAQ reuses `data/shower-screens-faq.ts`
- JSON-LD: Service + BreadcrumbList + FAQPage schemas
- Primary keyword: frameless shower screens melbourne

---

## 2026-04-09 — Shower Screens hub page built

- Created `app/shower-screens/page.tsx` — full hub page replacing the placeholder stub
- Sections: Hero (compact) → TrustBar → ServiceCards → BenefitsGrid → ProcessSteps → BeforeAfter → Testimonials → FAQ → CtaBanner
- ServiceCards: inline section with 2 cards linking to `/shower-screens/frameless/` and `/shower-screens/semi-frameless/`
- All section data defined locally in the page (shower-specific benefits, process steps, before/after metrics)
- Created `data/shower-screens-faq.ts` — 8 FAQ items for shower screen queries
- JSON-LD: Service + BreadcrumbList + FAQPage schemas embedded in page
- Primary keyword: shower screens melbourne

---

## 2026-04-07 — Responsive mobile navigation (Sheet drawer)

- Installed `@radix-ui/react-dialog`
- Created `components/ui/sheet.tsx` — shadcn Sheet, KDG styled (black/gold, 0px radius)
- Updated `Header.tsx` — hamburger button visible on `< lg`, opens right Sheet with: dark logo, top-level nav links, services grouped by category, phone + Get Quote CTAs
- Desktop nav unchanged; `Get Quote` button hidden on mobile (available inside Sheet)
- Removed "Mobile nav" from `TODO.md`

---

## 2026-04-07 — Real logos added to Header and Footer

- Added `public/logo-light.png` (full logo, dark text — for light backgrounds), `public/logo-dark.png` (crown + KING gold — for dark backgrounds), `public/icon-small.png` (crown mark)
- `Header` now uses `<Image src="/logo-light.png">` replacing the KDG text badge
- `Footer` now uses `<Image src="/logo-dark.png">` replacing the KDG text badge
- `data/site.ts` — added `logos` object (`light`, `dark`, `icon`) as single reference for all logo paths
- `app/layout.tsx` — added `icons` metadata (favicon.ico, apple-touch-icon, shortcut using icon-small.png)
- `CLAUDE.md` — documented logo convention in routing table

---

## 2026-04-07 — TODO.md created as single source of truth for tasks

- Scraped all `// TODO` comments + placeholder markers across all pages, components, and data files
- Created `TODO.md` at project root — grouped by priority: blocked on Tas, Phase 6/8/9/10/12, infrastructure
- Updated `CLAUDE.md`: added `TODO.md` to routing table; added principle 12 (no inline TODO comments)

---

## 2026-04-07 — siteConfig wired into all layout components

- Added `phoneHref` key to `data/site.ts` (ready-to-use `tel:` href, separate from `phoneTel` E.164 schema key)
- `Header`, `Footer`, `EmergencyBanner` now import `siteConfig` directly — contact props (`phone`, `email`, `address`) removed
- `app/layout.tsx` cleaned up: removed `PHONE`/`EMAIL`/`ADDRESS` intermediary constants and all contact prop-passing
- Updated `CLAUDE.md`: added `data/site.ts` to routing table and noted the exception to "all copy via props" for contact details

---

## 2026-04-07 — Single source of truth for business details

- Created `data/site.ts` — `siteConfig` with phone, phoneTel, email, address, geo, social links
- Updated `app/layout.tsx` — imports `siteConfig` instead of inline constants
- Updated `lib/seo/schema/localBusiness.ts` — all contact/identity fields now read from `siteConfig`; `sameAs` auto-populated from `siteConfig.social`

---

## 2026-04-07 — Navbar redesign with Services dropdown

- Installed `@radix-ui/react-navigation-menu`, `clsx`, `tailwind-merge`, `class-variance-authority`
- Created `lib/utils.ts` — `cn()` helper
- Created `components/ui/navigation-menu.tsx` — shadcn NavigationMenu, restyled to KDG design system (0px radius, gold/black palette, Barlow Condensed)
- Updated `data/nav.ts` — `mainNav` now: Home / Emergency Glass / Areas / About Us / Blog; new `servicesNav` array groups all 10 services into Double Glazing + Other Services with descriptions
- Rewrote `components/layout/Header.tsx` — Services rendered as Radix NavigationMenu dropdown; CTA changed from "Get Estimate" → "Get Quote"

---

## 2026-04-07 — Project documentation created

- Created `CLAUDE.md` as master routing hub
- Created `docs/architecture.md` — stack, routes, file layout, data model, phases
- Created `docs/components.md` — 14 core components + estimate + UI primitives
- Created `docs/seo.md` — keywords per page, schema plan, snippet targets, PAA questions
- Created `docs/local-seo.md` — GBP, citations, reviews, backlinks, competitors
- Created `docs/content-strategy.md` — calendar, conversion, CTAs, video, top 30 questions
- Created `docs/design-system.md` — placeholder awaiting design direction
- Raw SEO research preserved in `references/` (read-only)
