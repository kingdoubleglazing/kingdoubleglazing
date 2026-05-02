# King Double Glazing

Marketing and lead-capture website for **King Double Glazing** — Melbourne's retrofit double-glazing specialists.

**Live site:** [kingdoubleglazing.com.au](https://kingdoubleglazing.com.au)

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | TinaCMS (content editing) |
| Database | Neon Postgres + Drizzle ORM |
| Email | Resend + React Email |
| Deployment | Vercel |

## Getting started

Install dependencies:

```bash
pnpm install
```

Copy the environment template and fill in your values:

```bash
cp .env.local.example .env.local
```

Run the development server (Next.js + TinaCMS):

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Description |
|---|---|
| `DATABASE_URL` | Neon Postgres connection string |
| `RESEND_API_KEY` | Resend API key for transactional email |
| `NEXT_PUBLIC_TINA_CLIENT_ID` | TinaCMS client ID |
| `TINA_TOKEN` | TinaCMS read token |
| `GITHUB_BRANCH` | Branch TinaCMS reads from (defaults to `main`) |

## Project structure

```
app/
  (site)/          # All public-facing routes + layout
  api/             # API routes (quote confirmation)
components/
  blocks/          # Page-builder blocks (driven by TinaCMS)
  layout/          # Header, Footer, Nav
  sections/        # Reusable section components
  ui/              # Atomic UI primitives
content/           # JSON content files (faqs, gallery, pricing, pages)
data/              # Static TypeScript data (site config, nav)
db/                # Drizzle schema + db client
lib/               # Email templates, SEO helpers, utilities
tina/              # TinaCMS schema config
```

## Content editing

Content is managed through TinaCMS. Run `pnpm dev` and open the `/admin` path in your browser to access the visual editor.

## Database

Migrations are managed with Drizzle Kit:

```bash
pnpm drizzle-kit generate   # generate migration files
pnpm drizzle-kit migrate    # apply migrations to the database
```

## Build & deploy

```bash
pnpm build   # builds TinaCMS then Next.js
pnpm start   # starts production server
```

Deployments are automatic on push to `main` via Vercel.
