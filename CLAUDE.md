@AGENTS.md

# King Double Glazing — Project Hub

**Domain:** kingdoubleglazing.com.au
**Client:** Tas (Brooklyn Glass Pty Ltd, t/a King Double Glazing)
**Stack:** Next.js 15 + TypeScript + Tailwind v4 + Biome + pnpm
**Brand voice:** "Stop. Don't Overpay." — transparent, anti-ripoff, honest pricing

## Routing — find what you need

| Concern | Reference |
|---|---|
| Stack, routes, file layout, data model, phases | `docs/architecture.md` |
| Component specs, variants, usage map | `docs/components.md` |
| Keywords per page, schema, technical SEO, snippets | `docs/seo.md` |
| GBP, citations, reviews, backlinks | `docs/local-seo.md` |
| Content calendar, conversion, video, CTAs | `docs/content-strategy.md` |
| Design tokens, colors, typography, spacing | `docs/design-system.md` |
| Change log | `docs/changelog.md` |
| Raw research (read-only, do not modify) | `references/` |

## Skills to invoke

| Task | Skill |
|---|---|
| Building pages, layouts, API routes, App Router patterns | `developing-nextjs` |
| React components, Tailwind, TypeScript frontend | `frontend-dev` |
| Design tokens, glass effects, animations, UI patterns | `tailwind-design-system` |
| High-quality, distinctive UI/page design | `frontend-design` |
| Claude API / Anthropic SDK integration | `claude-api` |
| Finding existing shadcn components before building custom | `shadcn-component-discovery` |

> **shadcn-component-discovery** is located in `.agents/skills/shadcn-component-discovery/`. Invoke it PROACTIVELY before building any UI component, block, or section. Components sourced from registries must be restyled to the KDG design system (0px radius, industrial palette, Bebas Neue/Barlow fonts, `rounded-none` everywhere).

## Core principles (always apply)

1. **SEO is infrastructure, not a feature.** Every page must have: unique title, meta description, H1, canonical, OG image, JSON-LD schema. Use `generateMetadata` and typed schema helpers.
2. **Static where possible, dynamic where necessary.** Database is for leads only. All content lives in TypeScript data files or MDX.
3. **Server Components by default.** `'use client'` only when interaction genuinely requires it.
4. **One primary keyword per page.** No cannibalisation. Check `docs/seo.md` before creating any page.
5. **Internal linking discipline.** Every page links to 3+ others and is linked from 3+ others.
6. **Components are owned, not borrowed.** No UI library runtime dependencies (no Material). Shadcn is permitted as a copy-paste source via the `shadcn-component-discovery` skill — treat each installed component as owned code. All shadcn components **must** be restyled: `rounded-none`, KDG palette, zero-JS where possible.
7. **Zero runtime cost.** Tailwind only, no CSS-in-JS. Self-hosted fonts via `next/font`.
8. **All copy via props.** No hardcoded text inside components. Content lives in `/data/` files.
9. **Mobile-first.** Emergency CTAs designed for thumb reach. All components responsive.
10. **Transparent pricing.** "From $495/m²" messaging throughout. Instant Estimate Tool is the moat.

## Pre-flight checklist (before any page ships)

- [ ] `generateMetadata` returns unique title, description, canonical, OG
- [ ] JSON-LD schema present and valid (test with Rich Results Test)
- [ ] H1 contains primary keyword
- [ ] Primary keyword in first 100 words
- [ ] 3+ internal links out, 3+ internal links in
- [ ] FAQ section with FAQPage schema (service pages)
- [ ] Mobile responsive, click-to-call works
- [ ] No `'use client'` unless justified
- [ ] Lighthouse 100/100/100/100 target
- [ ] Listed in sitemap.ts
