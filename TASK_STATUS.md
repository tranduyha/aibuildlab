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

Known Month 1 limitations carried into Month 2:

- GPU source-field mapping warnings were resolved on 2026-06-09.
- Calculator model eligibility was tightened on 2026-06-09; the current
  calculator has 10 eligible dense LLM records plus a separate Image Generation
  mode for SDXL, Stable Diffusion 3.5 Large, and FLUX.1 dev planning.
- Affiliate links should remain disabled until disclosure, URLs, and source rules
  are ready.

## Active Month 2 Scope

### Cluster A - Hardware / GPU / VRAM

Priority:

- Keep source-field mapping warnings at 0 while enriching the core GPU set.
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
Choose the next Month 2 priority: MoE calculator policy or 12GB vs 16GB local AI guide
```

Definition of Done:

- `/models/[slug]/vram-requirements` framework exists and renders source-backed
  model facts through repository/service boundaries.
- `/models/llama-3-1-8b-instruct/vram-requirements` builds as the first
  framework page with H1, canonical, Open Graph, BreadcrumbList, WebPage, and
  FAQPage.
- First batch expands to 3 source-backed dense LLM pages without thin
  keyword-swap content: Llama 3.1 8B Instruct, Qwen2.5 7B Instruct, and
  Mistral 7B Instruct v0.3.
- Model pages link to the calculator and use cautious planning language.
- Sitemap includes all 3 model VRAM pages.
- Calculator and guide hub link to all 3 model VRAM pages.
- Model VRAM pages cross-link to nearby model planning pages.
- Model VRAM pages include 8GB/12GB/16GB decision sections, validation workflow
  steps, model-specific FAQ items, and comparison notes.
- Model VRAM pages include workload-fit guidance, estimate-driver explanations,
  first-time-builder answers, and direct 4-bit comparison cards across the first
  3 model pages.
- `/tools/vram-calculator` shows the expected LLM and Image Generation modes.
- Calculator result warnings remain clearly labeled as planning guidance.
- Image diffusion records remain out of the dense LLM formula path and use the
  separate image-generation planning service.
- MoE and embedding records remain hidden until separate estimate policies exist.
- SDXL has one official-doc observed VRAM sample.
- FLUX.1 dev has one third-party benchmark observed VRAM sample.
- Stable Diffusion 3.5 Large has one third-party approximate VRAM sample.
- `/guides/image-generation-vram-planning` is published and linked from the
  calculator and guide hub.
- `/guides/image-generation-vram-planning` is included in `sitemap.xml` and has
  canonical, metadata, Open Graph, BreadcrumbList, WebPage, and FAQPage signals.
- `/guides/image-generation-vram-planning` now includes direct source links,
  calculator workflow steps, and cautious model-tier testing guidance.
- The dense LLM calculator now has 14 eligible source-backed records, including
  DeepSeek-R1-Distill-Qwen-7B, DeepSeek-R1-Distill-Llama-8B,
  DeepSeek-R1-Distill-Qwen-14B, and DeepSeek-R1-Distill-Qwen-32B.
- DeepSeek-R1 full remains hidden until a MoE-aware planning policy exists.
- `npm run data:validate` passes.
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

## Latest Check

```txt
2026-06-09 GPU source-field cleanup:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated

2026-06-09 calculator eligibility cleanup:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated

2026-06-09 image generation calculator mode:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated
local smoke check -> /tools/vram-calculator HTTP 200

2026-06-09 image generation validation layer:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated

2026-06-09 first image VRAM observed sample:
SDXL Diffusers FP16 sample -> validated, observed peak 10.47 GB
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated

2026-06-09 FLUX observed VRAM benchmark sample:
FLUX.1 dev Diffusers FP16 RTX 4090 sample -> validated, observed peak 22 GB
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated

2026-06-09 Stable Diffusion 3.5 Large approximate VRAM sample:
SD3.5 Large Diffusers BF16 sample -> validated, approximate total VRAM 20 GB
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated

2026-06-09 image validation UI and planning guide:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 50 static pages generated
local smoke checks -> calculator, guides hub, and image-generation guide HTTP 200

2026-06-09 image guide SEO and sitemap wiring:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 50 static pages generated
sitemap output -> includes /guides/image-generation-vram-planning

2026-06-09 image generation guide SEO polish:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 50 static pages generated
static HTML -> updated title, source links, canonical, FAQPage, BreadcrumbList confirmed

2026-06-09 DeepSeek model enrichment:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 50 static pages generated
calculator eligible dense LLM count -> 14 total, including 4 DeepSeek Distill records
DeepSeek-R1 full -> published data profile but hidden from calculator until MoE policy exists

2026-06-09 GSC breadcrumb item fix:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 50 static pages generated
/tools/vram-calculator BreadcrumbList -> 0 missing item entries
sitewide built BreadcrumbList scan -> 34 schemas checked, 0 missing item entries

2026-06-10 model VRAM page framework:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 51 static pages generated
/models/llama-3-1-8b-instruct/vram-requirements -> generated static HTML with H1, canonical, Open Graph, BreadcrumbList, WebPage, FAQPage, source links, calculator link, and GPU planning references
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM batch 1:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 53 static pages generated
model VRAM pages generated -> /models/llama-3-1-8b-instruct/vram-requirements, /models/qwen2-5-7b-instruct/vram-requirements, /models/mistral-7b-instruct-v0-3/vram-requirements
static HTML -> all 3 pages include H1, canonical, Open Graph, BreadcrumbList, WebPage, FAQPage, source links, calculator link, and model-specific notes
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM internal linking:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 53 static pages generated
sitemap output -> includes all 3 model VRAM URLs
calculator output -> links to all 3 model VRAM pages
guides hub output -> links to all 3 model VRAM pages
model page output -> cross-links between nearby model VRAM pages
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM content depth pass:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 53 static pages generated
static HTML -> all 3 model pages include 8GB/12GB/16GB decision sections, validation workflows, model-specific FAQ items, and comparison notes
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM 9.2 quality pass:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 53 static pages generated
static HTML -> all 3 model pages include workload-fit sections, estimate-driver sections, first-time-builder answers, and 4-bit comparison cards
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM compare link spacing fix:
npm run lint -> passed
npm run build -> passed, 53 static pages generated
static HTML -> all 3 model pages include scoped model-compare-links spacing class
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM compare card contrast fix:
npm run lint -> passed
npm run build -> passed, 53 static pages generated
static HTML -> all 3 model pages include scoped model-compare-grid contrast class in the compare section
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM spacing and responsive pass:
npm run lint -> passed
npm run build -> passed, 53 static pages generated
static HTML -> all 3 model pages include scoped model-vram-page layout rules plus model-compare-grid and model-compare-links
responsive CSS -> desktop/tablet/mobile spacing, hero text, disclaimer, grid gap, and card padding rules added
compare card link affordance -> "Open model page" now matches the /gpu "View planning profile" CTA style
browser screenshot check -> skipped because Playwright and a callable browser binary were not available
brand/domain hardcode scan in code directories -> no matches

2026-06-10 model VRAM scale-safety content guardrails:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 53 static pages generated
static HTML -> all 3 model pages include "What the sources confirm" and "How this model differs from nearby pages"
publish guardrails -> model VRAM pages require attached sources, 3 differentiators, 2 planning notes, and 4 model-specific FAQ items
brand/domain hardcode scan in code directories -> no matches
```

## Do Not Do Next

- Do not create many new SEO pages before data cleanup.
- Do not enable affiliate links before disclosure and URL readiness.
- Do not add database/auth/payment/Payload.
- Do not add live price/availability claims without approved source/API.
- Do not hardcode brand/domain in code directories.
