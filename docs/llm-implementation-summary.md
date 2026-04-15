# LLM/AI Search Optimisation — Implementation Summary

Completed: 2026-04-15

---

## Files created

| File | Purpose |
|---|---|
| `lib/seo/schema/webpage.ts` | `buildWebPageSchema()` helper — WebPage JSON-LD with `isPartOf` + `about` entity links |
| `lib/seo/schema/website.ts` | `buildWebSiteSchema()` helper — WebSite JSON-LD with SearchAction |
| `data/faqs.ts` | Typed FAQ data for schema injection: `retrofitFaqs`, `emergencyFaqs`, `generalFaqs`, `getFAQSchema()` |
| `components/SchemaScript.tsx` | Reusable Server Component that renders `schemas: object[]` as `<script type="application/ld+json">` tags |
| `docs/llm-content-audit.md` | Per-page answer-first content audit with recommendations |
| `docs/llm-implementation-summary.md` | This file |

---

## Files modified

| File | Change |
|---|---|
| `app/robots.ts` | Added explicit `Allow: /` rules for GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, PerplexityBot |
| `lib/seo/schema/localBusiness.ts` | Enhanced: `@type` array (`LocalBusiness` + `HomeAndConstructionBusiness`), 22-suburb `areaServed`, `knowsAbout` array, `hasOfferCatalog`, `slogan`, `legalName`, richer `description` |
| `app/layout.tsx` | Added WebSite schema injection alongside existing LocalBusiness schema |
| `app/page.tsx` | Added WebPage schema via `SchemaScript` |
| `app/services/page.tsx` | Replaced single Service schema with: WebPage + Retrofit Service + Emergency Service + FAQPage (8 retrofit + 5 emergency FAQs). Updated metadata title to include "Melbourne". |
| `app/about/page.tsx` | Added WebPage + Person (Tas Markou) + FAQPage (4 general/guarantees FAQs) via `SchemaScript`. Updated metadata description to start with benefit. |
| `app/contact/page.tsx` | Replaced `ContactPage` schema with enhanced version including `@id`, `isPartOf`, `about` entity links. Updated metadata title. |
| `app/sitemap.ts` | Added `lastModified: new Date()` to all entries. Updated services to `weekly`. Updated about/contact to `monthly`. |

---

## Architectural adaptation

The prompt assumed separate `/retrofit-double-glazing/` and `/emergency-glass-repair/` pages. These do not exist in the project — all services live at `/services/` with anchor IDs (`#retrofit`, `#emergency`).

**Decision:** Schema for both services was injected into `/services/page.tsx` rather than creating placeholder pages. This avoids SEO keyword cannibalisation, which CLAUDE.md explicitly prohibits ("One primary keyword per page. No cannibalisation."). Service-specific schemas link to the correct anchor URLs (`/services/#retrofit`, `/services/#emergency`).

---

## Outstanding TODOs for Samridh

1. **Social/directory URLs** — `siteConfig.social` (Facebook, Instagram, Google) are empty strings. Add real URLs to populate the `sameAs` field in `localBusinessSchema`. Also add hipages and ProductReview profile URLs once live.
   - File: `data/site.ts` + `lib/seo/schema/localBusiness.ts` (TODO comment at bottom)

2. **Glazier licence number** — `siteConfig.licenseNumber` is empty. Add VIC glazier licence number when confirmed.
   - File: `data/site.ts`

3. **Warranty phrasing** — The implementation prompt referenced "lifetime warranty" in several places. The site consistently uses "10-year warranty". All FAQ answers and schema descriptions use "10-year" to match existing site content. Confirm with Tas whether this should change.

4. **Pricing in FAQ answers** — `retrofitFaqs[0]` states "from $595 per square metre". This matches `siteConfig.pricing.retrofitFromPerSqm`. Update if pricing changes.
   - File: `data/faqs.ts`

5. **About page — entity statement** — The content audit recommends prepending "King Double Glazing is a Melbourne-based retrofit double glazing company founded by Tas Markou." to the first paragraph of `/about/`. This is a copy change, not a code change.
   - File: `app/about/page.tsx` (HeroSection subtext prop)

6. **Services page H1** — The H1 "One Team. Every Job." is too generic for LLM citation. Consider updating to include "Melbourne" or the primary service name.
   - File: `app/services/page.tsx`

7. **Homepage — keyword in first paragraph** — The subtext does not mention "retrofit double glazing" by name. Adding it would improve citation matching.
   - File: `app/page.tsx` (HeroSection subtext prop)

---

## Schema entity graph built

```
WebSite (#website)
  └── publisher → LocalBusiness (#business)

LocalBusiness (#business)
  ├── @type: [LocalBusiness, HomeAndConstructionBusiness]
  ├── areaServed: 22 Melbourne suburbs
  ├── knowsAbout: 9 topics
  └── hasOfferCatalog: 5 services

WebPage (per page)
  ├── isPartOf → WebSite (#website)
  └── about → LocalBusiness (#business)

Person (Tas Markou, on /about/)
  └── worksFor → LocalBusiness (#business)

Service (on /services/)
  ├── Retrofit Double Glazing → provider: #business
  └── Emergency Glass Repair → provider: #business

FAQPage
  ├── /services/ — 13 Q&As (8 retrofit + 5 emergency)
  └── /about/ — 4 Q&As (guarantees/general)
```

---

## What was not implemented

- **`llms.txt`** — Intentionally skipped. No significant LLM crawler currently reads it; premature to add noise.
- **Separate `/retrofit-double-glazing/` page** — See architectural adaptation above.
- **Separate `/emergency-glass-repair/` page** — See architectural adaptation above.
- **`instant-estimate/` page schema** — Out of scope; tool/calculator page with different optimisation needs.
- **`gallery/` page schema** — Out of scope; image gallery with different optimisation needs.
