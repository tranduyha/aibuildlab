# AGENTS.md

This file is the operating contract for Codex or any AI/dev working on
`aibuildlab`.

## Current Phase

Month 1 is closed. Treat it as a completed foundation phase.

The active phase is:

```txt
Month 2 - Data Authority, SEO Expansion, and Monetization Readiness
```

Primary objective:

```txt
Turn the Month 1 static SEO utility MVP into a source-backed topical authority
site for VRAM planning, GPU research, local AI hardware, Cloud GPU options, and
AI workflow tooling.
```

Do not restart Month 1 work unless a regression requires it.

## Product Context

`aibuildlab` is the codebase for the public site now branded through config as
VRAMForge / vramforge.com.

The site is an AI hardware affiliate SEO utility platform focused on:

- GPU VRAM planning.
- Local LLM hardware research.
- Stable Diffusion and image-generation hardware planning.
- AI workstation builds.
- Cloud GPU and AI infrastructure alternatives.
- Future AI SaaS/software bridge content.

The product strategy is:

```txt
Useful tool first
source-backed data second
SEO expansion third
monetization last
```

## Required Architecture

The repo uses Next.js App Router with this structure:

```txt
app/(frontend)/
components/
data/
lib/
repositories/
services/
types/
public/
daily_data_update/
docs/
```

Rules:

- Do not create `src/`.
- Do not move `app/(frontend)`.
- Do not switch App Router to Pages Router.
- Public pages belong in `app/(frontend)/`.
- Shared UI components belong in `components/`.
- Static production data belongs in `data/`.
- Data access belongs in `repositories/`.
- Business logic belongs in `services/`.
- SEO and formatting helpers belong in `lib/`.
- TypeScript domain types belong in `types/`.
- Public assets belong in `public/`.
- Do not add production database, auth, payment, SaaS dashboard, Payload CMS, or
  Postgres unless explicitly requested.
- Keep the site Cloudflare Pages static export compatible.

Standard data flow:

```txt
data/*.json -> repositories/*.repository.ts -> services/*.service.ts -> pages/components
```

Avoid importing JSON directly inside pages/components when a repository/service
boundary exists.

## Brand and Site Config Rules

All public brand, site, domain, disclosure, and metadata text must come from
config and helpers:

- `data/site-settings.json`
- `repositories/site-settings.repository.ts`
- `services/site-settings.service.ts`
- `lib/seo.ts`

Config-owned values include:

- `siteSettings.name`
- `siteSettings.shortName`
- `siteSettings.logo.text`
- `siteSettings.logo.shortText`
- `siteSettings.tagline`
- `siteSettings.description`
- `siteSettings.siteUrl`
- `siteSettings.domain`
- `siteSettings.trust.editorialNote`
- `siteSettings.trust.dataDisclaimer`
- `siteSettings.trust.affiliateDisclosure`

Do not hardcode current brand/domain strings in:

- `app/(frontend)/`
- `components/`
- `lib/`
- `services/`
- `repositories/`

Allowed exceptions:

- `data/site-settings.json`
- `docs/*`
- `DAILY_LOG.md`
- `TASK_STATUS.md`
- `README.md`
- test snapshots with a clear reason

Before ending a code task, scan for current brand/domain hardcodes in code
directories and fix any violation.

## SEO Rules

Every public SEO page must have real user value. Do not create thin pages that
only swap a GPU/model keyword.

Each SEO page should have:

- Clear slug.
- Unique H1.
- Metadata from `lib/seo.ts` or equivalent helper.
- Canonical URL where appropriate.
- Useful body content, data, table, FAQ, or workflow.
- Internal links into related site areas.
- Mobile-safe layout.
- Source-aware wording when data is draft or estimated.
- Schema only when valid and non-misleading.

Avoid unsupported claims:

- No fake benchmark claims.
- No tokens/s or image-speed claims without benchmark sources and test context.
- No price or availability claims without timestamped approved source/API.
- No "best", "guaranteed", or buying recommendation language unless the data
  and review methodology support it.

Use Google Search principles:

```txt
helpful, reliable, people-first content
clear crawl/index signals
valid structured data
mobile-first page experience
```

## Data Rules

For any data research, source gap, enrichment, calculator matching, price, or
affiliate task, read these first:

- `docs/DATA_SOURCES.md`
- `daily_data_update/README.md`
- relevant docs under `daily_data_update/docs/`

Research flow:

```txt
daily_data_update / external research
-> data/update-candidates/*.json
-> verified enrichment
-> data/*.json
-> repositories
-> services
-> pages/components
```

Golden rule:

```txt
Candidate first. Source-backed then merge. Validate before done. No source = no claim.
```

If a field has no reliable source:

- Leave it `null`.
- Keep or set `needsReview: true`.
- Keep or set `dataConfidence: "low"`.
- Keep `sources: []` unless a valid source exists.
- Add notes or a source-gap candidate.
- Make the UI show "Needs verification" or omit the field.

Do not invent:

- GPU specs.
- AI model facts.
- Benchmarks.
- Tokens/s.
- Image speed.
- Prices.
- Availability.
- Commission terms.
- Buying recommendations.

## Image Rules

Do not download images from Google Images.

Allowed sources:

- Existing project-created images.
- Pexels API.
- Unsplash API.
- Wikimedia Commons API.
- eBay Browse API.
- Official affiliate/product feeds.
- Official press/media kit when terms allow.

Every downloaded image must have metadata in:

```txt
data/images/image-manifest.json
```

UI should render real image assets through the image repository/service layer.

## Monetization Rules

Affiliate and monetization features must stay conservative.

- Do not add live affiliate links unless explicitly requested.
- Do not render affiliate CTAs unless disclosure is enabled and the URL is valid.
- Keep CTAs neutral and planning-oriented.
- Do not place affiliate CTAs in nav, breadcrumbs, source lists, or calculator
  result surfaces unless a future task explicitly approves it.
- Do not claim current prices, stock, discounts, or commissions without source.

## Cloudflare-First Rules

The production target remains Cloudflare Pages static export.

Known deployment assumptions:

```txt
Production domain: vramforge.com
Production branch: publish
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Output directory: out
No Worker/OpenNext/SSR runtime in the current static MVP
```

## Daily Workflow

Before code:

1. Read `AGENTS.md`.
2. Read `TASK_STATUS.md`.
3. Read `DAILY_LOG.md`.
4. Read `docs/MONTH_2_ROADMAP.md`.
5. If the task touches data, read `docs/DATA_SOURCES.md` and
   `daily_data_update/README.md`.
6. Confirm the task belongs to the active Month 2 focus.

After code:

1. Run `npm run data:validate` when data changed.
2. Run `npm run lint`.
3. Run `npm run build`.
4. Record failures if any.
5. Update `DAILY_LOG.md`.
6. Update `TASK_STATUS.md`.
7. Do not mark work done unless verification ran or the reason for skipping is
   clearly logged.

## Active Month 2 Priority

Use this order unless the user explicitly changes direction:

1. Month 2 readiness audit and documentation sync.
2. Fix GPU source-field mapping warnings.
3. Upgrade calculator assumptions and AI model eligibility.
4. Improve source-backed GPU matching.
5. Publish a small number of high-quality model VRAM pages.
6. Add guide pages only when data and intent support them.
7. Expand Cloud GPU and AI software bridges carefully.
8. Prepare monetization, but do not enable affiliate links prematurely.

