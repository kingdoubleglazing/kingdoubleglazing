# Changelog

Track significant changes, decisions, and milestones. Most recent first.

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
