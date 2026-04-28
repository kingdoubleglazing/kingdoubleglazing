# Architecture

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS v4 + CSS variables |
| Content | Repo-resident TypeScript data files (all content), MDX removed |
| Database | Neon Postgres + Drizzle ORM — leads/quotes only |
| Email | Resend + React Email |
| Forms | Native Server Actions |
| Hosting | Vercel |
| Tooling | pnpm + Biome |
| Icons | Lucide React (tree-shakeable) |

## Route tree

```
/                    Home
/services/           Services hub (6 anchored sections: retrofit, emergency, showers, splashbacks, mirrors, commercial)
/gallery/            Photo gallery (filterable by category)
/about/              About us
/contact/            Contact / Get a quote
/instant-estimate/   Estimate tool
/warranty/           Warranty policy
/confirm-success/    Form submission success redirect
/confirm-error/      Form submission error redirect
```

Trailing slashes everywhere — `trailingSlash: true` in `next.config.ts`.

## App Router file layout

```
app/
├── layout.tsx                Root: header, footer, LocalBusiness + WebSite schema
├── page.tsx                  Home
├── sitemap.ts
├── robots.ts
├── opengraph-image.tsx        Default OG image
├── services/page.tsx
├── gallery/page.tsx
├── about/
│   ├── page.tsx
│   └── opengraph-image.tsx
├── contact/
│   ├── page.tsx
│   ├── opengraph-image.tsx
│   └── actions.ts            Server action: contact form submit
├── instant-estimate/page.tsx
├── warranty/page.tsx
├── confirm-success/page.tsx
├── confirm-error/page.tsx
├── actions/
│   ├── contact.ts            Contact form server action
│   └── quote.ts              Quote form server action
└── api/confirm-quote/route.ts

components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── EmergencyBanner.tsx   Sticky top bar
│   └── FloatingNav.tsx       Mobile floating navigation
├── sections/
│   ├── HeroSection.tsx
│   ├── TrustBar.tsx
│   ├── CtaBanner.tsx
│   ├── FAQ.tsx               Uses native <details>, injects FAQPage schema
│   ├── Testimonials.tsx
│   ├── ProcessSteps.tsx
│   ├── ContactForm.tsx
│   ├── WhyRetrofit.tsx
│   ├── GlassComparisonTable.tsx
│   └── GlassTechSpecs.tsx
├── ui/
│   ├── Button.tsx
│   ├── WarrantyBadge.tsx
│   ├── dialog.tsx
│   └── sheet.tsx
├── AdaptorDisclosure.tsx
├── ClientFitNote.tsx
├── FreeAdviceBlock.tsx
├── PaymentTerms.tsx
└── SchemaScript.tsx          Renders JSON-LD <script> tags (Server Component)

data/
├── site.ts          Single source of truth: phone, email, address, social, logos, domain
├── nav.ts           Navigation structure
├── testimonials.ts
├── faqs.ts          General FAQs + getFAQSchema()
├── homepage-faq.ts
├── estimate-faq.ts
├── contact-faq.ts
├── gallery.ts       Gallery images with category metadata
├── pricing.ts       Pricing config for estimate tool
└── process-steps.ts

lib/
├── seo/
│   ├── generateMetadata.ts
│   └── schema/
│       ├── localBusiness.ts
│       ├── service.ts
│       ├── faqPage.ts
│       ├── webpage.ts
│       ├── website.ts
│       └── breadcrumbList.ts
├── email/
│   └── templates/
│       ├── ContactNotification.tsx
│       ├── QuoteConfirmation.tsx
│       └── QuoteNotification.tsx
└── utils.ts         cn() helper

db/
├── index.ts         Drizzle client (Neon Postgres)
└── schema.ts        Leads/quotes table schema
```

## Data model

```ts
// data/site.ts — source of truth for all contact details
export const siteConfig = {
  phone: '+61XXXXXXXXXX',
  email: '...',
  address: {...},
  domain: 'https://kingdoubleglazing.com.au',
  logos: { light: '/logo-light.png', dark: '/logo-dark.png', icon: '/icon-small.png' },
  social: { facebook: '...', instagram: '...', google: '...' },
}
```

## Env vars

`RESEND_API_KEY`, `DATABASE_URL`

## Outstanding integrations (not yet wired)

- Contact form mailer → needs Resend `RESEND_API_KEY` and `/api/estimate-lead` route
- `aggregateRating` in LocalBusiness schema → waiting on real Google reviews
