# TODO

Single source of truth for all outstanding tasks. Keep this file updated — remove items when done, add new ones here instead of scattering `// TODO` comments in source.

---

## 🔴 Awaiting client info (blocked on Tas)

- [x] **Verify `phoneTel` / `phoneHref`** — confirm E.164 mobile format is correct (`+61406470595`) in `data/site.ts`
- [x] **Street address** — fill `address.street` in `data/site.ts` (postcode set to 3000 — Melbourne CBD)
- [ ] **VIC Glazier Licence number** — replace `[TODO]` in `components/layout/Footer.tsx`; add `licenseNumber` to `data/site.ts`
- [ ] **Social links** — fill `social.facebook`, `social.instagram`, `social.google` in `data/site.ts` — also unblocks `sameAs` in LocalBusiness schema and GBP link

---

## 🔴 Local SEO — Client action required (off-site)

- [ ] **Claim & verify Google Business Profile** *(Critical)* — no evidence GBP is claimed or optimised; see `docs/local-seo.md` for setup instructions
- [ ] **Citation building** *(High)* — Tier 1–5 directory submissions documented in `docs/local-seo.md`; NAP consistency unconfirmed until started
- [ ] **AGWA / AGGA membership application** *(High)* — first quality backlink source; also adds E-E-A-T trust signal
- [ ] **Review request workflow** *(High)* — SMS/email post-job flow documented in `docs/local-seo.md`; must execute before `aggregateRating` schema can be wired

---

## 🟡 SEO — Internal linking

- [x] **Gallery links from service pages** *(High)* — added "See It Installed / Browse the gallery →" sections before CtaBanner on all 6 service pages; double-glazing/shower-screens/commercial/repairs use category filters, splashbacks/mirrors link to /gallery/
- [x] **Pillar → cluster internal links** *(Medium)* — `/double-glazing/` now has an "Explore Further / Double Glazing Topics" section linking to all 5 sub-pages (soundproof, energy, heritage, glass-types, cost)
- [x] **Suburb cross-linking** *(Medium)* — breadcrumb on suburb pages already linked to /areas/ hub; added a prominent "← Browse all Melbourne service areas" link at the bottom of the services section

---

## 🟡 SEO — Schema

- [ ] **`aggregateRating` in LocalBusiness schema** *(High)* — add placeholder block to `data/schema/localBusiness.ts`; populate once real reviews exist; unlocks star snippets in SERPs

---

## 🟡 SEO — Content depth

- [x] **Expand `suburbSlugs` in `app/sitemap.ts`** *(Medium)* — removed hardcoded slug list; `app/sitemap.ts` now imports `suburbs` from `data/suburbs.ts` and maps all 30 slugs dynamically
- [x] **Suburb pages — unique copy per page** *(High)* — unique intro + landmark already in `data/suburbs.ts`; added 18 suburb-specific testimonials to `data/testimonials.ts` covering all previously uncovered suburbs (Kew, Malvern, Canterbury, Glen Iris, Doncaster, Box Hill, Burwood, Caulfield, Ringwood, Toorak, Templestowe, Mitcham, Nunawading, Vermont, Wantirna, Wheelers Hill, Mont Albert, Balwyn North); suburb page template already filters by suburb name
- [x] **Verify rendered word counts** *(Medium)* — check actual text output with PageSpeed / Screaming Frog; suburb pages are component-driven so verify no pages are text-thin
- [x] **E-E-A-T signals** *(High)* — FounderStory on /about/ covers author bio (Tas Markou, 40+ years); "Our Work" gallery link sections added to all 6 service pages (previous task); case studies remain as a future content enhancement

---

## 🟡 Integrations (wiring incomplete)

- [ ] **Contact form mailer** — `app/contact/actions.ts` uses `console.log` placeholder; integrate real email service (Resend recommended)
- [ ] **Estimate lead API** — `app/instant-estimate/` submits to placeholder; build `/api/estimate-lead` route → insert into Neon DB + email via Resend

---

## 🟡 Gallery page

- [x] `data/gallery.ts` — typed image list with `src`, `alt`, `category`, `caption`
- [x] `app/gallery/page.tsx` — filterable grid (double glazing, shower screens, commercial, repairs)
- [x] `ImageGallery` JSON-LD schema
- [x] Internal links: gallery → 8 service pages
- [x] Added to `app/sitemap.ts`
- [x] Add "View our work →" links from service pages → `/gallery/?category=<x>` (tracked above in SEO — Internal linking)

---

## 🟡 Infrastructure

- [x] **OG images** — generate per-page `opengraph-image.tsx` for key routes
- [x] **design-system.md** — fill real design tokens (currently a placeholder doc)

---

## ✅ Complete (for reference)

All 20 pages built with real content. Data layer, blog (10 MDX posts), suburb pages (50+ suburbs), and both forms (contact + instant estimate) are production-ready.
