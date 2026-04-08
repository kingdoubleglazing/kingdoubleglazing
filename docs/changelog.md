# Changelog

Track significant changes, decisions, and milestones. Most recent first.

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
