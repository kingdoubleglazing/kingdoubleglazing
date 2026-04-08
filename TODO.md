# TODO

Single source of truth for all outstanding tasks. Keep this file updated — remove items when done, add new ones here instead of scattering `// TODO` comments in source.

---

## 🔴 Awaiting client info (blocked on Tas)

- [x] **Phone number (display)** — `phone` in `data/site.ts` set to `0406 470 595`
- [ ] **Verify `phoneTel` / `phoneHref`** — confirm E.164 mobile format is correct (`+61406470595`) in `data/site.ts`
- [ ] **Street address** — fill `address.street` in `data/site.ts` (postcode now set to 3000 — Melbourne CBD matching geo coords)
- [ ] **VIC Glazier Licence number** — replace `[TODO]` in `components/layout/Footer.tsx`; also add `licenseNumber` key to `data/site.ts`
- [ ] **Social links** — fill `social.facebook`, `social.instagram`, `social.google` in `data/site.ts`

---

## 🟡 Phase 6 — Core page content

- [ ] **Home page** (`app/page.tsx`) — hero, trust bar, service cards, FAQ, CTA banner
- [ ] **Double Glazing hub** (`app/double-glazing/page.tsx`) — full content build
- [ ] **Cost & Pricing** (`app/double-glazing/cost/page.tsx`) — pricing hub content
- [ ] **Emergency Glass** (`app/emergency-glass/page.tsx`) — full content build
- [ ] **About Us** (`app/about/page.tsx`) — team, story, trust signals
- [ ] **Contact** (`app/contact/page.tsx`) — contact form with Server Action

---

## 🟡 Phase 8 — Service page content

- [ ] **Shower Screens** (`app/shower-screens/page.tsx`)
- [ ] **Frameless Shower Screens** (`app/shower-screens/frameless/page.tsx`)
- [ ] **Semi-Frameless Shower Screens** (`app/shower-screens/semi-frameless/page.tsx`)
- [ ] **Glass Splashbacks** (`app/glass-splashbacks/page.tsx`)
- [ ] **Custom Mirrors** (`app/custom-mirrors/page.tsx`)
- [ ] **Commercial Glazing** (`app/commercial-glazing/page.tsx`)
- [ ] **Soundproof Windows** (`app/double-glazing/soundproof-windows/page.tsx`)
- [ ] **Energy Efficient Windows** (`app/double-glazing/energy-efficient-windows/page.tsx`)
- [ ] **Heritage Homes** (`app/double-glazing/heritage-homes/page.tsx`)
- [ ] **Glass Types** (`app/double-glazing/glass-types/page.tsx`)

---

## 🟡 Phase 9 — Instant Estimate Tool

- [ ] **Estimate page** (`app/instant-estimate/page.tsx`) — multi-step form, pricing logic, PDF quote, lead capture
- [ ] `lib/pricing.ts` — per-m² baselines by glass type, modifiers (access, condition, suburb travel)
- [ ] Lead insert into Neon DB
- [ ] Email PDF quote via Resend

---

## 🟡 Phase 10 — Areas / Local SEO

- [ ] **Areas index** (`app/areas/page.tsx`) — expand with all suburb cards
- [ ] **Suburb pages** (`app/areas/[suburb]/page.tsx`) — suburb-specific content from `data/suburbs/{slug}.ts`
- [ ] Create `data/suburbs/` directory with individual suburb data files

---

## 🟡 Phase 12 — Blog

- [ ] **Blog index** (`app/blog/page.tsx`) — post listing from `content/blog/*.mdx`
- [ ] **Blog post** (`app/blog/[slug]/page.tsx`) — MDX rendering + frontmatter metadata
- [ ] Set up `content/blog/` directory
- [ ] Configure MDX pipeline (e.g. `next-mdx-remote` or `@next/mdx`)

---

## 🟢 Infrastructure / DX

- [ ] **OG images** — generate per-page `opengraph-image.tsx` for key routes
- [ ] **design-system.md** — fill real design tokens (currently a placeholder doc)
- [ ] Add `licenseNumber` field to `data/site.ts` once obtained from Tas
