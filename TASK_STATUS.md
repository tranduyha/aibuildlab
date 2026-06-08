# TASK_STATUS.md

Current operating status for `aibuildlab`.

## Project

```txt
aibuildlab
Public site: VRAMForge
Production domain: vramforge.com
Repository: https://github.com/tranduyha/aibuildlab.git
```

## Current Phase

```txt
Month 2 - Data Authority, SEO Expansion, and Monetization Readiness
```

Month 1 is closed and summarized in:

```txt
docs/MONTH_1_SUMMARY.md
```

The active roadmap is:

```txt
docs/MONTH_2_ROADMAP.md
```

## Current Goal

Build on the Month 1 static SEO utility foundation by improving data confidence,
calculator usefulness, source-backed topical coverage, internal linking, and
monetization readiness without creating thin programmatic SEO pages.

## Current Architecture

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

No `src/` directory is used.

## Month 1 Final Status

Completed:

- Cloudflare-first static Next.js App Router foundation.
- Global layout, header, footer, config-driven brand, favicon, and image layer.
- VRAM Calculator page and interactive client component.
- GPU index and generated GPU profile pages.
- Comparison index and generated comparison pages.
- Build index and generated build pages.
- Guides hub and published guide pages.
- Cloud GPU provider hub and generated provider profile pages.
- AI tools data layer for future software bridge content.
- Monetization placement system with safety guards.
- Affiliate CTA infrastructure with disclosure and URL render guards.
- Sitemap, robots, canonical metadata, Open Graph basics, and `html lang="en"`.
- Static export with `npm run build`.

Known Month 1 limitation:

- GPU source-field mapping warnings remain and must be resolved before broad
  Month 2 content scaling.
- Calculator model data needs stronger source-backed eligibility.
- Affiliate links should remain disabled until disclosure, URLs, and source rules
  are ready.

## Active Month 2 Scope

### Cluster A - Hardware / GPU / VRAM

Priority:

- Fix source-field mapping warnings for the core GPU set.
- Make source-backed GPU fields the default for public matching.
- Create model VRAM pages only after model data is source-backed.
- Avoid thin GPU or comparison expansion.

### Cluster B - Cloud GPU / AI Infrastructure

Priority:

- Re-audit Cloud GPU provider source coverage.
- Add only useful planning guides, not provider ranking pages.
- Avoid exact price, availability, or commission claims without timestamped
  approved sources.

### Cluster C - AI SaaS / Software Bridge

Priority:

- Keep AI tools data reviewed before any public `/ai-tools` route.
- Start with guide content that helps local AI users decide when hosted tools are
  more practical.
- Avoid SaaS directory spam.

## Current Recommended Task

```txt
Day 16 - Month 2 readiness audit and documentation reset
```

Definition of Done:

- Docs point to Month 2 instead of Month 1.
- `DAILY_LOG.md` starts clean for Month 2.
- Month 1 history is summarized in `docs/MONTH_1_SUMMARY.md`.
- Obsolete bootstrap docs are removed.
- `npm run lint` passes.
- `npm run build` passes.

## Required Checks For Every Future Task

Run when relevant:

```sh
npm run data:validate
npm run lint
npm run build
```

Always update:

```txt
DAILY_LOG.md
TASK_STATUS.md
```

## Blockers

None.

## Do Not Do Next

- Do not create many new SEO pages before data cleanup.
- Do not enable affiliate links before disclosure and URL readiness.
- Do not add database/auth/payment/Payload.
- Do not add live price/availability claims without approved source/API.
- Do not hardcode brand/domain in code directories.

