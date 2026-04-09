# TODO

Single source of truth for all outstanding tasks. Keep this file updated — remove items when done, add new ones here instead of scattering `// TODO` comments in source.

---

## 🔴 Awaiting client info (blocked on Tas)

- [ ] **Verify `phoneTel` / `phoneHref`** — confirm E.164 mobile format is correct (`+61406470595`) in `data/site.ts`
- [ ] **Street address** — fill `address.street` in `data/site.ts` (postcode set to 3000 — Melbourne CBD)
- [ ] **VIC Glazier Licence number** — replace `[TODO]` in `components/layout/Footer.tsx`; add `licenseNumber` to `data/site.ts`
- [ ] **Social links** — fill `social.facebook`, `social.instagram`, `social.google` in `data/site.ts`

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
- [ ] Add "View our work →" links from service pages → `/gallery/?category=<x>` (internal linking back)

---

## 🟡 Infrastructure

- [ ] **OG images** — generate per-page `opengraph-image.tsx` for key routes
- [ ] **design-system.md** — fill real design tokens (currently a placeholder doc)

---

## ✅ Complete (for reference)

All 20 pages built with real content. Data layer, blog (10 MDX posts), suburb pages (50+ suburbs), and both forms (contact + instant estimate) are production-ready.
