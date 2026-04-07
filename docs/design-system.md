# Design System: Industrial Authority

**Creative North Star:** Architectural Brutalism — raw, structural, heavy. The interface is a high-spec construction project: intentional asymmetry, oversized typography, zero decorative elements.

---

## 1. Colors: Tonal Power

| Token | Value | Usage |
|---|---|---|
| `primary` | `#705d00` | Vertical accents, structural highlights |
| `primary-container` | `#ffd700` | CTAs, Value Markers, button backgrounds |
| `on-primary-fixed` | `#221b00` | Text on yellow — maximum contrast |
| `primary-fixed-dim` | `#c9a800` | Button hover state |
| `surface` | `#ffffff` | Base layer |
| `surface-container-lowest` | `#fafafa` | Value Ledger, floating panels |
| `surface-container-low` | `#f5f5f5` | Section background breaks |
| `surface-container` | `#efefef` | Mid-tier backgrounds |
| `surface-container-high` | `#e8e8e8` | Input field backgrounds |
| `surface-container-highest` | `#e0e0e0` | Interactive cards |
| `on-surface` | `#000000` | Body text |
| `inverse-surface` | `#000000` | Secondary button background |
| `inverse-on-surface` | `#ffffff` | Secondary button text |
| `outline-variant` | `rgba(0,0,0,0.15)` | Ghost borders only |

### The "No-Line" Rule
**1px borders are prohibited.** Section separation uses hard background shifts between `surface` and `surface-container-low`. Boundaries defined by mass, not lines.

### What NOT to do
- No Navy Blue — corporate fluff
- No yellow text on white — unreadable and cheap
- No 1px solid borders — if contrast is weak, fix the colors

### Signature Textures
Hero CTAs may use a **"Molten Glass"** gradient: `linear-gradient(to right, #705d00, #c9a800)`.

---

## 2. Typography: Voice of Authority

| Role | Font | Weight | Size | Case | Usage |
|---|---|---|---|---|---|
| Display | Bebas Neue | 400 | `3.5rem`+ | Uppercase | Hero anchors, "STOP DON'T OVERPAY" stamps |
| Headline | Barlow Condensed | 600–700 | `1.5rem–2.5rem` | Sentence | Facts headers, section titles |
| Body | Barlow | 400–600 | `1rem–1.125rem` | Sentence | All copy, specs, value propositions |

**Tailwind utilities:** `font-display`, `font-headline`, `font-sans`

### Rules
- Bebas Neue at smaller sizes: add `tracking-wider` (`0.05em`) for accessibility
- All motion: `linear` or `ease-in-out` — heavy machinery, no bounce
- Display headlines: anchor to **top-left** to disrupt centered grid; overlap product images for editorial feel

---

## 3. Elevation & Depth: Tonal Layering

No drop shadows. Things are **bolted down**, not floating.

| Technique | How |
|---|---|
| Chiseled depth | Stack `surface-container-lowest` cards on `surface-container-high` background |
| Ghost border | `outline: 1px solid rgba(0,0,0,0.15)` — felt, not seen |
| Industrial Glassmorphism | `backdrop-blur-[20px]` + `bg-surface-container-lowest/80` — for nav & quote calculator |

---

## 4. Components: Structural Units

### Buttons — "I-Beams"
- **Primary:** `bg-primary-container text-on-primary-fixed` — sharp `rounded-none`
- **Secondary:** `bg-inverse-surface text-inverse-on-surface rounded-none`
- **Hover:** color shifts to `bg-primary-fixed-dim` — no scale, no bounce
- All buttons: `0px` border-radius (class `rounded-none`)

### Input Fields — "Specs"
- Background: `bg-surface-container-high`, no borders
- Labels: small-caps `font-headline text-xs uppercase tracking-widest`, positioned **above** the field — never inside as placeholder

### Cards — "Panels"
- No divider lines
- `gap-14` (`3.5rem`) between list items — whitespace is the seal
- Premium Tier: `border-l-4 border-primary` left accent

### The "Value Ledger" — Signature Component
Exclusive to price breakdowns:
```
border-l-4 border-primary-container bg-surface-container-lowest
```
Reinforces "King of Value" positioning.

---

## 5. Spacing & Radius

- **Border radius:** `0px` everywhere. Roundness is for friendly brands.
- **Section gap:** `3.5rem` (custom `--spacing-section`)
- **Card padding:** `p-6` to `p-8`

---

## 6. Micro Animations

All motion is **purposeful and weighted** — industrial machinery, not a toy. Rules:
- Easing: `ease-in-out` only. No spring, no bounce.
- Duration: 200–500ms. Nothing lingers.
- Scroll-driven via `animation-timeline: view()` — zero JS, static-safe.
- All utilities respect `prefers-reduced-motion`.

### Utility Reference

| Class | Where to use | Effect |
|---|---|---|
| `.animate-stamp` | `<h1>` with `.text-display-lg` | Page-load opacity + slight descale + letter-spacing snap |
| `.animate-reveal` | Blocks entering the viewport | Fade + 1.5rem slide up, scroll-driven |
| `.animate-stagger-child` | List items, grid cards — set `style="--i:N"` on each | Staggered reveal-up, 80ms per step |
| `.value-ledger-animated` | Price breakdowns | Left yellow border draws downward as block enters view |
| `.animate-molten` | Hero CTA button only | Gradient sweeps left→right on loop |
| `.animate-badge-pulse` | "Stop. Don't Overpay." badge | Slow yellow glow pulse |
| `.animate-shimmer` | Loading skeletons | Horizontal shimmer sweep |
| `.card-interactive` | ServiceCards, GlassOptions cards | 2px lift + yellow bottom shadow on hover |

### Component → Animation Map

| Component | Apply |
|---|---|
| Hero `<h1>` | `.animate-stamp` |
| Hero primary CTA button | `.animate-molten` |
| "Stop. Don't Overpay." badge | `.animate-badge-pulse` |
| TrustBar items | `.animate-stagger-child` with `--i:0` through `--i:4` |
| ServiceCards grid | `.card-interactive` + `.animate-stagger-child` |
| BenefitsGrid items | `.animate-stagger-child` |
| ProcessSteps list | `.animate-stagger-child` |
| Price breakdown | `.value-ledger-animated` (replaces `.value-ledger`) |
| FAQ `<details>` | `data-faq` attribute, body div gets `.faq-body` |
| Image/content loading | `.animate-shimmer` on placeholder |

### shadcn Components — Animation Notes

When using shadcn/Radix components, hook into `data-state` attributes for transitions:

```css
/* Accordion open/close */
[data-state="open"]  { animation: reveal-up 0.3s ease-in-out both; }
[data-state="closed"] { opacity: 0; }
```

---

## 7. Tailwind v4 Token Reference

All tokens live in `app/globals.css` under `@theme`. Tailwind generates utilities automatically:

```
bg-primary            → #705d00
bg-primary-container  → #ffd700
text-on-primary-fixed → #221b00
bg-surface-low        → #f5f5f5  (surface-container-low)
bg-surface-highest    → #e0e0e0  (surface-container-highest)
font-display          → Bebas Neue
font-headline         → Barlow Condensed
font-sans             → Barlow
```

Custom utilities (defined in `@layer utilities`):
- `.text-display-lg` — 3.5rem Bebas Neue, uppercase, tight leading
- `.glass-panel` — glassmorphism for nav/calculator
- `.value-ledger` — yellow-accented price breakdown container
- `.premium-accent` — primary left border for premium cards
