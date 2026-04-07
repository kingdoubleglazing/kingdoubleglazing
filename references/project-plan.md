# King Double Glazing — Next.js Rebuild Project Plan

**Status:** Active build plan, replaces all WordPress-era planning
**Owner:** Samridh
**Client:** Tas (Brooklyn Glass Pty Ltd, t/a King Double Glazing)
**Domain:** kingdoubleglazing.com.au

---

## 1. Why we scrapped WordPress

WordPress FSE was the right call when the client was going to edit the site himself. The client has now confirmed he does not want to touch the CMS — Samridh handles all content updates. That single fact removes WordPress's main justification and unlocks a substantially better stack: a fully code-based, statically-rendered Next.js site with zero CMS overhead, zero plugin tax, and the fastest possible page loads. For an SEO-first build in a competitive Melbourne local market where no competitor offers a live estimate calculator, every Lighthouse point and every millisecond of LCP matters.

## 2. Locked stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15 (App Router) + TypeScript | RSC by default, generateMetadata for per-route SEO, sitemap.ts and robots.ts as first-class APIs, mature ecosystem |
| Styling | Tailwind CSS v4 + CSS variables for tokens | Zero runtime, design tokens stay swappable, no CSS-in-JS bloat |
| Content storage | Repo-resident: MDX for blog, TypeScript data files for everything else | No CMS, no DB queries for content, infinitely cacheable, version-controlled, free |
| Database | Neon Postgres (free tier) + Drizzle ORM | For leads/quotes only — never for content. Confirmed adequate by research: 0.5GB storage, 100+ compute hours/month, sub-second cold starts |
| Email | Resend (free tier) + React Email templates | 3000/mo, 100/day cap, runs on SES infrastructure, best DX. Postmark is the documented fallback if deliverability becomes a problem |
| Forms | Native Server Actions | Zero client form library, progressive enhancement, less JS shipped |
| PDF generation | @react-pdf/renderer | Server-side, no Chromium dependency, fits Vercel function limits |
| Hosting | Vercel (app) + Cloudflare (DNS, WAF, caching) | Vercel free tier covers expected traffic for years; Cloudflare gives free WAF + analytics + DDoS |
| Object storage | Cloudflare R2 (zero egress) | For any user-uploaded media or generated PDFs that need persistence |
| Analytics | Vercel Analytics + GA4 | Vercel for Core Web Vitals, GA4 because clients expect it. Plausible was considered and dropped — duplication |
| Error monitoring | Sentry free tier | Catch SSR errors and client errors before they hit Search Console |
| Tooling | pnpm + Biome | Biome replaces ESLint+Prettier with one fast tool; pnpm for disk-efficient installs |
| Testing | Vitest for logic, no E2E in v1 | Don't test what doesn't need testing. Add Playwright later only if estimate tool gets complex |
| Search Console / Bing | Both verified at launch | Non-negotiable |

### Stack risks acknowledged

- **Resend 100/day cap.** A storm event or paid ad spike could exceed this. Mitigation: monitor daily volume in Resend dashboard, and if we ever cross 50/day sustained, pre-emptively upgrade to Resend Pro ($20/mo) or migrate to Postmark.
- **Neon free tier autosuspend (5 min idle).** First lead submission after a quiet period adds ~500-800ms latency. Acceptable for a contact form, would not be acceptable for an interactive feature. Mitigation: if it ever feels slow in practice, paid Neon plan disables autosuspend at $19/mo.
- **Vercel free tier bandwidth.** Cap is 100GB/month. Static-first site with R2 for media will stay well under this for the foreseeable future. Cloudflare in front adds another caching layer that further reduces Vercel egress.

## 3. Phase plan

### Phase 1 — Foundations (week 1, ~3 days)

Goal: empty repo to deployable hello-world with all the boring stuff right.

- Repo init, pnpm, Next.js 15 + TS + Tailwind v4 + Biome
- Branching strategy: `main` deploys to production, all work via PRs that get Vercel preview URLs
- Vercel project linked, env vars scaffolded (RESEND_API_KEY, DATABASE_URL, SENTRY_DSN, GA4 ID)
- Cloudflare DNS pointed at Vercel, SSL verified
- Sentry SDK installed and verified with a deliberate test error
- Robots.txt and a placeholder sitemap.ts shipped on day one so Search Console verification can happen early
- A `/dev/components` route (gated by env check, never indexed) to preview components during build

**Exit criteria:** kingdoubleglazing.com.au returns a 200 with a working layout, Search Console verified, Sentry receiving events, Vercel Analytics live.

### Phase 2 — Information architecture & routing (week 1, ~1 day)

The IA from the WordPress doc carries over almost entirely. URLs do not change. What changes is how it's expressed in code.

- Route tree mirrors the URL structure exactly (App Router file-based routing)
- Dynamic segments: `/areas/[suburb]` and `/blog/[slug]`
- Static service pages each get their own folder for clarity, even though some could be generated dynamically — explicit > clever
- Shared layouts: root layout with header/footer, nested layout for `/double-glazing/*` to share the pillar nav
- See companion doc `king-dg-page-structure.md` for the full route tree, page-by-page breakdown, and component map

**Exit criteria:** every route returns a placeholder page with correct H1 and metadata. Sitemap auto-generates from the route tree.

### Phase 3 — Component system (week 2, ~5 days)

Build the shared components once, well, with proper TypeScript props. Same component list as the WordPress block plan because the IA hasn't changed:

Core components: `Hero`, `TrustBar`, `ServiceCards`, `BenefitsGrid`, `ProcessSteps`, `CTABanner`, `FAQ`, `ComparisonTable`, `TestimonialCarousel`, `GlassOptions`, `SuburbIntro`, `EmergencyBanner`, `BeforeAfter`, `CostRangeCards`.

Principles:
- Server Components by default. `'use client'` only when an interaction genuinely requires it (carousel, FAQ accordion, before/after slider, estimator)
- All props strongly typed, no `any`
- All copy passed in as props, no hardcoded text inside components
- Each component has a story in `/dev/components` showing all variants
- Tailwind only, no component-level CSS files
- All interactive components must work without JavaScript where possible (FAQ as `<details>`, etc.)

**Exit criteria:** every component renders in `/dev/components` with all variants, ready to be composed into pages.

### Phase 4 — Design pass (week 2, ~2 days)

Design *after* components exist, not before. Faster iteration when you can see the real thing in the browser.

- Brand: yellow + black, "Stop Don't Overpay" positioning carries from existing brand work
- Typography: self-host via `next/font` (variable font, woff2, subset to Latin)
- Spacing scale, color tokens, shadow scale, border radius scale all defined as CSS variables in `globals.css`
- Mobile-first, with emergency CTAs designed specifically for thumb reach on mobile
- Dark mode: not needed for v1, would dilute brand
- Iconography: Lucide React (tree-shakeable, no icon font)

**Exit criteria:** design tokens locked, all components styled, mobile and desktop both feel finished.

### Phase 5 — SEO foundation built into the framework (week 3, ~3 days)

This is the part most builds get wrong by treating SEO as a final pass. Doing it as infrastructure means every new page is automatically SEO-correct.

- `generateMetadata` helper that takes page-specific data and emits title, description, canonical, OpenGraph, Twitter Card with the right defaults
- JSON-LD schema helpers, fully typed: `LocalBusinessSchema`, `ServiceSchema`, `FAQPageSchema`, `ArticleSchema`, `BreadcrumbListSchema`, `WebSiteSchema`
- `app/sitemap.ts` that reads from the route tree and content data files automatically, no manual maintenance
- `app/robots.ts` with sensible defaults (allow all, disallow `/dev/`, point to sitemap)
- Dynamic OG images via `next/og` so every page gets a branded social preview without manual asset creation
- Canonical discipline on suburb pages — they reference the parent service page as canonical for content that's substantially shared, full self-canonical when content is genuinely unique
- Per-page schema baked into the page components so it's impossible to ship a page without it

**Exit criteria:** Rich Results Test passes for every schema type. Sitemap reachable. Robots.txt correct. Every page has unique title, description, OG image.

### Phase 6 — Phase 1 content build (week 3-4, ~5 days)

Build the launch-critical pages first, in this order, using the SEO research docs already in the project:

1. Home
2. Retrofit Double Glazing Melbourne (the pillar page)
3. Double Glazing Cost Melbourne
4. Emergency Glass Repair Melbourne
5. About
6. Contact

Each page composes existing components, fills them with the copy and data from the SEO research, and references the page-structure doc for the section list. Content for service pages lives in `/data/services/*.ts` files as typed objects so it can be referenced from multiple components without copy-paste.

**Exit criteria:** the six launch pages are live, indexed, and Lighthouse 100/100/100/100 on mobile and desktop.

### Phase 7 — Performance & technical SEO pass (week 4, ~2 days)

Lighthouse-driven hardening. By this point most performance is already good because of the architecture; this is the polish.

- Image audit: every image through `next/image`, AVIF + WebP, correct `sizes` attribute, lazy loading except above-the-fold
- Font audit: `font-display: swap`, preload the variable font, no FOUT
- JS audit: Bundle Analyzer, kill anything over budget, ensure no client components leaked into static pages
- Cache headers: long max-age on static assets, ISR where appropriate (probably not needed for v1 since content is static)
- CrUX field data review once we have a few weeks of real traffic
- Internal link audit: every page links to and from at least 3 others as the WordPress plan specified

**Exit criteria:** Lighthouse 100s held on the launch pages, PageSpeed Insights green across the board, no console warnings.

### Phase 8 — Service depth & revenue pages (week 5-6, ~7 days)

Build out the Phase 2 and Phase 3 pages from the original prioritisation:

- Soundproof Windows, Energy Efficient Windows, Heritage Homes, Glass Types Hub
- Shower Screens (hub + frameless + semi-frameless), Glass Splashbacks, Custom Mirrors, Commercial Glazing

Same component composition pattern. Each new page must satisfy the internal linking rule (link to 3+, linked from 3+).

### Phase 9 — Instant Estimate Tool (week 6-7, ~5 days)

The differentiator. No Melbourne competitor has this.

- Multi-step form as a client component, server actions for submission
- Inputs: window count, approximate dimensions, glass type selection, suburb (drives travel surcharge if any), urgency
- Pricing logic in `/lib/pricing.ts` — pure functions, fully typed, uses the per-m² baselines confirmed by Tas (still gated on him confirming final figures)
- On submit: insert into Neon `leads` table via Drizzle, send email to Tas via Resend, send confirmation email to customer via Resend, render a quote PDF and attach it to the customer email
- Schema: `WebApplication` JSON-LD on the tool page
- Lead capture: name, email, phone, suburb, photos optional via R2 upload

**Exit criteria:** end-to-end flow works in production, Tas receives a real test lead with a real PDF attached.

### Phase 10 — Local SEO rollout (week 8 onward, ongoing)

- 5 priority suburb pages first: Burwood, Camberwell, Glen Waverley, Hawthorn, Box Hill
- Suburb data lives in `/data/suburbs/*.ts`, each entry has unique intro copy, local landmarks, suburb-specific testimonials filter, suburb-specific schema with `areaServed`
- Google Business Profile setup or refresh (status currently unknown — confirm with Tas)
- Citation building (Yellow Pages, True Local, Hotfrog, etc.)
- Review collection workflow (manual for v1, automated later in Phase 12)

### Phase 11 — Invoicing/quoting integration (deferred, future scope)

**Status: parked, not in v1.** Tas wants a flow where customer quote requests land in a simple invoicing tool he can approve with one tap, instead of having to use a complex tool like Tradify. This is a real need but it's a separate problem from shipping a high-SEO website.

When it's time to tackle this, the research will need to cover:
- Australian-friendly small-business invoicing tools with good APIs (Xero, MYOB Essentials, Rounded, Invoice Ninja, others)
- Whether the flow should be: site → DB → invoicing tool, or site → invoicing tool directly
- Mobile UX of the approval step (Tas wants one-tap simplicity)
- Whether n8n or Make.com belongs in the loop, or whether direct API integration is cleaner

The architecture chosen for v1 (lead lands in Neon DB and emails Tas) is deliberately compatible with adding this layer later — the database is the integration seam.

### Phase 12 — Content engine & ongoing SEO (ongoing)

- Blog: 1-2 posts per week from the SEO research keyword list, MDX in `/content/blog/`
- New suburb pages in batches of 3-5
- Quarterly content refresh on the pillar pages
- Off-page work: outreach for backlinks from Melbourne home improvement blogs, local business directories, supplier sites
- Review request automations (build later when there's a steady flow of finished jobs)

## 4. Cost summary at launch

| Service | Cost |
|---|---|
| Vercel | $0 (free tier) |
| Cloudflare | $0 (free tier) |
| Neon Postgres | $0 (free tier) |
| Resend | $0 (free tier) |
| Sentry | $0 (free tier) |
| GA4 | $0 |
| Domain | already paid (annual renewal only) |
| **Total monthly** | **$0** |

Realistic upgrade triggers and what they would cost:
- Resend Pro if daily volume cap becomes an issue: $20/mo
- Neon Launch if cold starts become noticeable: $19/mo
- Vercel Pro if we exceed 100GB bandwidth: $20/mo

We will not pre-emptively upgrade anything.

## 5. What I still need from Tas before each phase can complete

- **Phase 6 (content build) is gated on:** confirmed glass types, confirmed per-m² pricing for each glass type, final brand assets (logo SVG, brand colors in hex), Tas's preferred contact email and phone for the site footer
- **Phase 9 (estimate tool) is gated on:** the same pricing data, plus any travel surcharge logic by suburb, plus Tas's preferred lead notification email
- **Phase 10 (local SEO) is gated on:** GBP access (existing or new), confirmed service area suburbs in priority order

## 6. Working principles for this project

- SEO is infrastructure, not a feature. Every architectural decision is evaluated against its SEO impact.
- Ship the smallest correct thing, then iterate. No feature creep before launch.
- Static where possible, dynamic where necessary. Database is for leads, not content.
- Zero runtime cost is a feature, not a constraint. Free tiers are sufficient and we will not upgrade until forced.
- Components are owned, not borrowed. No shadcn, no Material, no UI library — small library, fully understood.
- Design after function. Components in skeleton form, then design pass against real layouts.
- Internal linking discipline: every page in, every page out, 3+ links each direction.
- One primary keyword per page. Cannibalisation is the enemy.
- The instant estimate tool is the moat. Protect its UX and its data quality above all other features.
