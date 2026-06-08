# AI Build Lab / VRAMForge

Next.js App Router project for the public VRAMForge site.

The site is a Cloudflare-first static SEO utility platform for AI hardware
planning:

- VRAM estimation.
- GPU profiles and comparisons.
- Local AI workstation builds.
- Cloud GPU planning.
- Future AI software and workflow bridges.

Month 1 is complete. The active work phase is Month 2: data authority, SEO
expansion, and monetization readiness.

## Development

```sh
npm install
npm run dev
```

Open:

```txt
http://localhost:3000
```

## Verification

Use these commands before marking work complete:

```sh
npm run data:validate
npm run lint
npm run build
```

`npm run data:validate` is required when production data changes.

## Production Target

```txt
Domain: vramforge.com
Cloudflare Pages branch: publish
Framework preset: Next.js (Static HTML Export)
Build command: npm run build
Output directory: out
```

The current MVP does not use a production database, auth, payment system, Worker,
OpenNext, or SSR runtime.

## Project Structure

```txt
app/(frontend)/      public routes, layouts, sitemap
components/          reusable UI components
data/                JSON production data
repositories/        data read/query layer
services/            business logic and page models
types/               TypeScript domain types
lib/                 SEO, formatting, shared helpers
public/              static assets
docs/                operating docs and roadmaps
daily_data_update/   source-backed data operations playbook
```

Standard data flow:

```txt
data/*.json -> repositories/*.repository.ts -> services/*.service.ts -> app/components
```

## Current Docs

- `AGENTS.md` - operating rules for Codex/dev agents.
- `TASK_STATUS.md` - current phase, active scope, blockers, next task.
- `DAILY_LOG.md` - Month 2 daily execution log.
- `docs/MONTH_1_SUMMARY.md` - closed Month 1 phase summary.
- `docs/MONTH_2_ROADMAP.md` - active Month 2 roadmap.
- `docs/DATA_SOURCES.md` - source policy for specs, models, prices, images.
- `docs/CHECKLIST_NGHIEM_THU.md` - release and SEO QA checklist.
- `daily_data_update/README.md` - data research/enrichment workflow.

## Non-Negotiables

- Do not create `src/`.
- Do not move `app/(frontend)`.
- Do not hardcode brand/domain in pages/components/helpers.
- Do not invent hardware specs, AI model facts, benchmarks, prices, or
  availability.
- Do not use Google Images as an image source.
- Do not enable affiliate links before disclosure and URL readiness.
- Keep the site static-export compatible.

