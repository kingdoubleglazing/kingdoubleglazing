# Design System

> **Status:** Awaiting design direction. This document will be populated with tokens, patterns, and conventions as design decisions are made.

## Brand

- **Colors:** Yellow + Black (exact hex TBD)
- **Positioning:** "Stop. Don't Overpay."
- **Dark mode:** Not needed for v1

## Tokens (to be defined)

```css
/* styles/globals.css — placeholder */
:root {
  /* Colors */
  /* Typography */
  /* Spacing scale */
  /* Shadow scale */
  /* Border radius scale */
}
```

## Typography
- Self-hosted via `next/font` (variable font, woff2, Latin subset)
- `font-display: swap`, preload variable font

## Icons
- Lucide React (tree-shakeable, no icon font)

## Principles
- Mobile-first
- Emergency CTAs designed for thumb reach
- Tailwind only, no component-level CSS
- CSS variables for all tokens (swappable)

## Component patterns (to be defined)
- Button variants
- Card patterns
- Glass/transparency effects
- Animation conventions
- Responsive breakpoints
