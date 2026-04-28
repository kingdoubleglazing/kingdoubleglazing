# Components

All components are Server Components unless marked **[client]**. All copy passed via props. Tailwind only — no CSS-in-JS, no runtime UI library.

## Layout

| Component | Location | Notes |
|---|---|---|
| Header | `components/layout/Header.tsx` | Nav, logo, CTA button |
| Footer | `components/layout/Footer.tsx` | NAP, links, licence number |
| EmergencyBanner | `components/layout/EmergencyBanner.tsx` | Sticky top bar, click-to-call |
| FloatingNav | `components/layout/FloatingNav.tsx` | Mobile floating navigation |

## Sections

| Component | Props | Used on |
|---|---|---|
| HeroSection | heading, subheading, cta, badges[] | Home |
| TrustBar | items[] (icon, label) | Home, services, estimate, contact |
| CtaBanner | heading, description, cta | Every page (1–2×) |
| FAQ | items[] (question, answer), pageUrl | Services, estimate, contact, warranty |
| Testimonials | items[] | Home, about |
| ProcessSteps | steps[] (number, title, description) | Home |
| ContactForm | — | Contact page |
| WhyRetrofit | — | Home |
| GlassComparisonTable | — | Instant estimate page |
| GlassTechSpecs | — | Instant estimate page |

## Shared blocks

| Component | Purpose | Used on |
|---|---|---|
| AdaptorDisclosure | Disclosure copy for adaptor eligibility | Estimate, services, warranty |
| ClientFitNote | Note about who the service suits | Estimate |
| FreeAdviceBlock | "Free advice" callout block | Home, services, estimate, contact, warranty |
| PaymentTerms | Payment terms blurb | Estimate, services, warranty |
| SchemaScript | Renders `schemas: object[]` as JSON-LD `<script>` tags | Every page |

## UI Primitives

| Component | Notes |
|---|---|
| Button | Typed variants: primary, secondary, ghost |
| WarrantyBadge | Badge displaying warranty period |
| dialog | Radix-based modal (shadcn source) |
| sheet | Radix-based slide-over (shadcn source) |

## Component reuse map

| Component | Pages |
|---|---|
| TrustBar | Home, services, estimate, contact, warranty |
| CtaBanner | Every page |
| FreeAdviceBlock | Home, services, estimate, contact, warranty |
| FAQ | Services, estimate, contact, warranty |
| SchemaScript | Every page |
| AdaptorDisclosure | Estimate, services, warranty |
| PaymentTerms | Estimate, services, warranty |
| Testimonials | Home, about |
| GlassComparisonTable | Instant estimate |
| GlassTechSpecs | Instant estimate |
| HeroSection | Home |
| ProcessSteps | Home |
| WhyRetrofit | Home |
| ContactForm | Contact |
