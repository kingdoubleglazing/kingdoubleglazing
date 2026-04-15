# King Double Glazing — Migration Plan

**Purpose.** This document tells Claude Code exactly what to delete, rewrite, and keep in the `kingdoubleglazing-main` codebase. The project is pivoting from a 27-route SEO-heavy site to a 5-page conversion funnel. Budget is tight (remaining ~8 hours of developer time). Do not rebuild components — rewrite copy and restructure pages in place.

**Brand positioning (locked).** "Stop — Don't Overpay." King Double Glazing beats any genuine competitor quote by 30% minimum and offers a lifetime warranty. Retrofits existing windows instead of full replacement. The crown logo and yellow-warning aesthetic stay.

**Reading level (locked).** 8th grade. No jargon in headlines. Jargon allowed in body copy only if immediately followed by a plain-English explanation and a percentage number. See `COPY_AND_VOICE.md` for the full rules.

**Do not touch.** VEU or government rebates — remove every mention from the codebase. Tas has not confirmed eligibility and this is a compliance risk. The client has asked for it to be excluded.

---

## 1. Final page list (5 pages)

| Route | Purpose | Primary CTA |
|---|---|---|
| `/` | Homepage funnel — the conversion workhorse | Get My Instant Price |
| `/instant-estimate` | Multi-step estimate tool (demo pricing) | Get My Estimate |
| `/services` | Single scrollable page: retrofit + emergency + shower screens + splashbacks + mirrors | Get My Instant Price |
| `/about` | Founder story (Tas), trust, guarantees | Get My Instant Price |
| `/contact` | Phone, form, service area, hours | Call / Submit |

Nav items (mobile and desktop): **Home · Services · Instant Estimate · About · Contact**. The "Instant Estimate" nav item should be styled as a button (yellow background, black text) to make it the obvious primary action.

---

## 2. Files and folders to DELETE

Delete these entire directories and all files within them:

```
app/areas/                              # all suburb pages
app/blog/                               # blog system
app/commercial-glazing/                 # out of funnel scope
app/custom-mirrors/                     # folded into /services
app/double-glazing/                     # entire folder including all subpages:
  - cost/
  - energy-efficient-windows/
  - glass-types/
  - heritage-homes/
  - soundproof-windows/
  - layout.tsx
  - page.tsx
  - opengraph-image.tsx
app/emergency-glass/                    # folded into /services
app/gallery/                            # only delete if Tas has no real photos — see note below
app/glass-splashbacks/                  # folded into /services
app/shower-screens/                     # entire folder including frameless + semi-frameless subpages
content/blog/                           # all 10 MDX files
components/blog/                        # BlogHero, BlogProse
components/gallery/                     # GalleryGrid — only if gallery is killed
```

Delete these individual component files:

```
components/sections/AcousticComparisonTable.tsx
components/sections/ThermalComparisonTable.tsx
components/sections/GlassFeatureMatrix.tsx
components/sections/GlassPickerGuide.tsx
components/sections/GlassTypeDetail.tsx
components/sections/GlassCostTable.tsx
components/sections/CostRangeCards.tsx
components/sections/RetrofitSystem.tsx
components/sections/GalleryPreview.tsx    # unless gallery stays
components/sections/BeforeAfter.tsx       # unless real photos exist
components/blocks/GlassOptions.tsx
```

Delete these data files:

```
data/blog-posts.ts
data/cost-faq.ts
data/cost-ranges.ts
data/emergency-faq.ts
data/energy-faq.ts
data/glass-types-faq.ts
data/glass-types.ts
data/heritage-faq.ts
data/retrofit-faq.ts
data/shower-screens-faq.ts
data/soundproof-faq.ts
data/suburb-faq.ts
data/suburbs.ts
data/gallery.ts                           # unless gallery stays
```

Delete these SEO schema files (they're for pages that no longer exist):

```
lib/seo/schema/article.ts                 # blog is dead
```

**KEEP these SEO files** — they protect any future ranking value for near-zero cost:
- `lib/seo/generateMetadata.ts`
- `lib/seo/schema/localBusiness.ts`
- `lib/seo/schema/service.ts`
- `lib/seo/schema/faqPage.ts`
- `lib/seo/schema/breadcrumbList.ts`
- `app/sitemap.ts` (update to list only the 5 pages)
- `app/robots.ts`

**Gallery decision note.** Keep `/gallery`, `GalleryGrid.tsx`, `GalleryPreview.tsx`, and `data/gallery.ts` ONLY IF Samridh confirms Tas has provided 6+ real job photos. Otherwise delete. Stock images hurt trust on trades sites — a missing gallery is better than a fake one. Default assumption: delete.

---

## 3. Files to REWRITE (keep file, replace contents)

### Pages to rewrite

**`app/page.tsx` (homepage)** — complete rewrite. New section order per `HOMEPAGE_FUNNEL.md`. This is the highest-priority file in the entire migration.

**`app/about/page.tsx`** — rewrite using Tas's real story from the old TheGlassDiscounters site:
- Tas Markou founded the business
- Grew up in the trade — father was a well-respected glazier
- Completed apprenticeship at Melbourne Shop Fitters
- Built commercial glazing operation with 40+ staff at peak
- Pivoted to retrofit double glazing when he saw the demand for energy-efficient glass and realised most homeowners were being priced out of full replacements
- Core principles: transparent quoting, fair pricing, lifetime warranty, no overpaying
- Use the phrase "50+ years of combined experience" — NOT "Tas has 50 years experience" (misleading, the old site was careful about this wording)

**`app/contact/page.tsx`** — simplify. Keep the form, drop any FAQ section beyond 3 questions. Add a prominent click-to-call block for mobile.

**`app/instant-estimate/page.tsx`** — this is the funnel's money page. Rebuild as a multi-step form (4–5 steps, see `HOMEPAGE_FUNNEL.md` §7 for the exact flow). Placeholder pricing is fine for v1. Claude Code should hardcode realistic ranges in `lib/pricing.ts` using wide bands (e.g., "$2,400 – $3,800" for a typical 3-bedroom home) and label the result as "Estimated range — final quote after free in-home check."

### New page to create

**`app/services/page.tsx`** — does not exist yet. Create as a single scrollable page with anchor-linked sections:
1. `#retrofit` — Retrofit Double Glazing (the hero service, most detailed)
2. `#replacement` — Full Window Replacement & New Installs (secondary service — one short section, three lines of copy, photo optional, CTA to contact form not estimate tool)
3. `#emergency` — Emergency Glass Repair
4. `#shower-screens` — Shower Screens (frameless, semi-frameless, framed all on one page)
5. `#splashbacks` — Kitchen Glass Splashbacks
6. `#mirrors` — Custom Mirrors
7. `#commercial` — Commercial Glazing (one short paragraph + contact CTA, not a full section)

Each section gets: short outcome-led heading, 3–4 plain-English benefit bullets with numbers where possible, one photo or illustration, and a CTA back to the estimate tool (retrofit) or contact form (everything else).

> The #replacement section should be brief (50–80 words), clearly positioned as secondary to retrofit, and CTA should go to the contact form rather than the Instant Estimate tool (the estimate tool is retrofit-specific).

### Components to rewrite (keep file, replace copy/structure)

- `components/sections/HeroSection.tsx` — new funnel hero per `HOMEPAGE_FUNNEL.md` §1
- `components/sections/ProblemSolutionSection.tsx` — rewrite with 8th-grade language, 3 lines problem / 3 lines fix
- `components/sections/BenefitsGrid.tsx` — every benefit gets a number; kill any bullet without one
- `components/sections/ComparisonTable.tsx` — rebuild as the 3-column centrepiece (Do Nothing vs Retrofit vs Full Replacement) per `HOMEPAGE_FUNNEL.md` §5
- `components/sections/ServicesSection.tsx` — drives the services preview on homepage + the full `/services` page
- `components/sections/FounderStory.tsx` — rewrite using Tas's real story (see above)
- `components/sections/ProcessSteps.tsx` — simplify to 3 steps: 1) Tell us about your windows 2) We measure + quote 3) We install in a day
- `components/sections/TrustBar.tsx` — new items: "50+ years combined experience · We beat any quote by 30% · Lifetime warranty · Melbourne-owned"
- `components/layout/EmergencyBanner.tsx` — repurpose as the top discount announcement bar: *"We'll beat any genuine quote by 30%. Lifetime warranty on every job. Call 0406 470 595"* — confirm phone with Samridh before final build
- `components/layout/Header.tsx` — reduce nav to the 5 items above
- `components/layout/Footer.tsx` — reduce nav to the 5 items, keep contact info and ABN/trading name
- `data/nav.ts` — reduce to 5 items
- `data/site.ts` — update phone, tagline, positioning
- `data/testimonials.ts` — keep shell, rewrite content to lead with specific outcomes ("Cut tram noise by about half", "Heating bill dropped 30% last winter")
- `data/process-steps.ts` — rewrite to the 3-step version
- `data/contact-faq.ts` — cut to 3 questions max
- `data/estimate-faq.ts` — cut to 5 questions max

---

## 4. Components to KEEP as-is (or near as-is)

These work and don't need structural changes — just verify copy is on-brand:

- `components/ui/Button.tsx`
- `components/ui/Breadcrumb.tsx`
- `components/ui/ZoomableImage.tsx`
- `components/ui/navigation-menu.tsx`
- `components/ui/sheet.tsx`
- `components/layout/FloatingNav.tsx` — verify it only shows the 5 nav items
- `components/sections/ContactForm.tsx`
- `components/sections/EstimateForm.tsx` — needs the multi-step rebuild but the file shell stays
- `components/sections/FAQ.tsx`
- `components/sections/Testimonials.tsx`
- `components/sections/CtaBanner.tsx`
- `components/sections/EmergencyHero.tsx` — repurpose for the `#emergency` section on `/services`
- `app/contact/actions.ts` — server action works
- `app/layout.tsx` — root layout

---

## 5. Execution order for Claude Code

Do the work in this sequence. Each step should leave the site in a working (building, deploying) state.

1. **Delete pass.** Remove all files and folders listed in §2. Update `app/sitemap.ts` to list only the 5 final routes. Update `data/nav.ts`. Run `next build` — fix any import errors that surface from deleted files by deleting the broken imports or the components that used them.

2. **Copy rewrite pass (existing components).** Rewrite `HeroSection`, `ProblemSolutionSection`, `BenefitsGrid`, `ComparisonTable`, `TrustBar`, `ProcessSteps`, `FounderStory`, `EmergencyBanner`, and the data files listed in §3. Do not change structure yet — just rewrite the content in place using `HOMEPAGE_FUNNEL.md` and `COPY_AND_VOICE.md` as sources of truth.

3. **Homepage restructure.** Rewrite `app/page.tsx` to use the exact section order in `HOMEPAGE_FUNNEL.md` §0.

4. **Build `/services`.** Create the single-page collapsed services route.

5. **Rewrite `/about`.** Use Tas's real story.

6. **Rewrite `/contact`.** Simplify.

7. **Rebuild `/instant-estimate`.** Multi-step form per `HOMEPAGE_FUNNEL.md` §7. Placeholder pricing in `lib/pricing.ts`.

8. **Final pass.** Verify every page has: (a) the top discount banner, (b) at least one primary CTA above the fold, (c) a footer CTA, (d) mobile click-to-call, (e) no banned words from `COPY_AND_VOICE.md` §2.

---

## 6. Inconsistencies and open questions flagged for Samridh

These are NOT for Claude Code to decide — surface them to Samridh before final deploy:

1. **Phone number.** Old site uses `0406 470 595`. Confirm this is still current for King Double Glazing. If different, update `data/site.ts`, `EmergencyBanner`, and every `tel:` link.
2. **"Beat any quote by 30%"** is a legal promise. Confirm with Tas in writing that this is still his policy under the King Double Glazing brand.
3. **"Lifetime warranty, no strings attached"** — same. Reconfirm with Tas.
4. **Gallery.** Does Tas have 6+ real job photos? If yes, keep `/gallery`. If no, delete.
5. **Instant Estimate pricing.** Demo uses placeholder ranges. Tas needs to confirm real glass prices before launch, but the tool ships with the placeholders and a clear "estimate only" label.
6. **"50+ years combined experience"** — keep the word "combined". The old site was careful about this; dropping it would be misleading about Tas's personal tenure.
7. **Instant Estimate Tool gating.** Show the estimate range FIRST, then ask for contact details to send the formal written quote. Research confirms this structure converts 2x better than gating the number behind the form (Research 2 §3, Reddit dealership case study: 10% → 22% conversion after switching to show-then-gate).