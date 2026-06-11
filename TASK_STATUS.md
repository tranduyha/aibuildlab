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
Next recommended Month 2 priority: source-aware "How much VRAM do you need for AI workloads" guide if scoped without overlap, or Cloud GPU provider re-audit before another cloud planning page
```

Definition of Done:

- `/models/[slug]/vram-requirements` framework exists and renders source-backed
  model facts through repository/service boundaries.
- MoE estimate mode exists on `/tools/vram-calculator` without reusing the dense
  LLM formula.
- DeepSeek-R1 and Mixtral 8x7B Instruct v0.1 are available only through the MoE
  planning estimate path.
- MoE estimates use source-backed total parameters, or a higher source-backed
  packaged model size when available, as the resident weight-memory baseline.
- Active parameters are shown as architecture context, not as the VRAM floor.
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
- Embedding records remain hidden until separate estimate policies exist.
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
- DeepSeek-R1 full is available only in the MoE planning estimate mode.
- `/guides/12gb-vs-16gb-vram-local-ai` is published with 9.5-quality content
  depth, source-aware 12GB/16GB/24GB+ planning sections, a workload decision
  table, model VRAM page links, image-generation and MoE guardrails, FAQPage,
  WebPage, BreadcrumbList, canonical, Open Graph, sitemap coverage, and links
  from `/guides` and `/tools/vram-calculator`.
- `/guides/how-to-choose-a-gpu-for-local-llms` is published as a source-aware
  local LLM GPU selection workflow with model-first planning, quantization and
  context checks, MoE guardrails, VRAM tier cards, model-page links,
  persona-specific next routes, scope boundaries, FAQPage, WebPage,
  BreadcrumbList, canonical, Open Graph, sitemap coverage, and links from
  `/guides`, `/tools/vram-calculator`, and
  `/guides/12gb-vs-16gb-vram-local-ai`.
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

2026-06-10 MoE calculator policy:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> initial sandbox font fetch failure, rerun with network permission passed and generated 53 static pages
calculator policy -> dense LLM dropdown now accepts only eligible llm records with model size
MoE classification -> Mixtral 8x7B Instruct v0.1 and DeepSeek-R1 are calculatorGroup "moe" and calculatorEligible false
UI/content -> /tools/vram-calculator includes MoE policy notice, indexable MoE section, and MoE FAQ schema item
brand/domain hardcode scan in code directories -> no matches

2026-06-10 MoE calculator estimate mode:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> initial sandbox font fetch failure, rerun with network permission passed and generated 53 static pages
MoE model data -> DeepSeek-R1 and Mixtral 8x7B Instruct v0.1 have structured source-backed MoE fields
calculator mode -> /tools/vram-calculator has separate LLM, MoE, and Image Generation modes
service smoke check -> Mixtral uses 47B resident baseline and DeepSeek-R1 uses 685B conservative packaged baseline
static HTML -> MoE title, FAQ, and estimate-mode copy present on /tools/vram-calculator
brand/domain hardcode scan in code directories -> no matches

2026-06-10 project route cleanup and GPU sitemap coverage:
npm run lint -> passed
npm run build -> passed, 49 static pages generated
/projects cleanup -> removed leftover sample portfolio routes, project sample data, project component, repository, service, and type export
sitemap output -> 43 public HTML routes and 43 sitemap URLs
GPU detail sitemap coverage -> all generated /gpu/[slug] pages included
static SEO audit -> no missing title, description, canonical, or H1 issues

2026-06-10 SEO meta description warning fix:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated
meta descriptions shortened -> /about 140 chars, /cloud-gpu 147 chars, /guides/cloud-gpu-vs-local-gpu 145 chars, /guides/local-ai-vs-ai-saas 135 chars
static SEO audit -> 43 public HTML routes, 43 sitemap URLs, 0 issues, 0 warnings

2026-06-10 VRAM calculator result CTA copy pass:
npm run data:validate -> 0 errors, 0 warnings
npm run lint -> passed
npm run build -> passed, 49 static pages generated
calculator result CTA -> visible /compare action now reads "Compare GPU options before committing"
monetization placement data -> placement-vram-calculator-result title/description/ctaLabel updated to planning-oriented copy without price, SKU, affiliate, ranking, or cloud-route mismatch

2026-06-10 sitewide breadcrumb coverage pass:
npm run lint -> passed
npm run build -> passed, 49 static pages generated
breadcrumb audit -> 42 public routes excluding home checked, 0 missing visual breadcrumbs, 0 missing BreadcrumbList schemas
pages updated -> /about, /builds, /cloud-gpu, /cloud-gpu/[slug], /compare, /gpu, /guides
brand/domain hardcode scan in code directories -> no matches

2026-06-10 breadcrumb coverage verification:
npm.cmd run lint -> passed
npm run build -> passed, 49 static pages generated
static HTML breadcrumb audit -> 42 public routes excluding home and not-found checked, 0 missing visual breadcrumbs, 0 missing BreadcrumbList schemas
page code changes -> none; current page-specific breadcrumb pattern remains appropriate
brand/domain hardcode scan in code directories -> no matches

2026-06-11 12GB vs 16GB local AI guide:
npm.cmd run data:validate -> 0 errors, 0 warnings
npm.cmd run lint -> passed after fixing one JSX unescaped quote issue
npm run build -> passed, 50 static pages generated
/guides/12gb-vs-16gb-vram-local-ai -> generated static HTML with one H1, canonical, Open Graph, BreadcrumbList, WebPage, FAQPage, source-aware planning language, decision table, model-page links, image-generation and MoE guardrails
sitemap output -> includes /guides/12gb-vs-16gb-vram-local-ai
guide hub and calculator output -> link to /guides/12gb-vs-16gb-vram-local-ai
brand/domain hardcode scan in code directories -> no matches

2026-06-11 12GB vs 16GB guide workflow layout fix:
npm.cmd run lint -> passed
npm run build -> passed, 50 static pages generated
/guides/12gb-vs-16gb-vram-local-ai Planning workflow -> 4 cards now use scoped 4-column desktop grid instead of the shared 5-column guide workflow grid

2026-06-11 12GB vs 16GB guide retention and scope pass:
npm.cmd run lint -> passed
npm run build -> passed, 50 static pages generated
/guides/12gb-vs-16gb-vram-local-ai -> added persona-specific next-click routing and scope-boundary cards to reduce overlap with image/cloud/model guides and improve user retention
brand/domain hardcode scan in code directories -> no matches

2026-06-11 local LLM GPU selection guide:
npm.cmd run data:validate -> 0 errors, 0 warnings
npm.cmd run lint -> passed
npm.cmd run build -> passed, 51 static pages generated
/guides/how-to-choose-a-gpu-for-local-llms -> generated static HTML with one H1, canonical, Open Graph, BreadcrumbList, WebPage, FAQPage, source-aware workflow language, decision table, VRAM tier cards, model-page links, MoE/image guardrails, persona routing, scope boundaries, and continue-planning links
sitemap output -> includes /guides/how-to-choose-a-gpu-for-local-llms
guide hub, calculator, and 12GB vs 16GB guide output -> link to /guides/how-to-choose-a-gpu-for-local-llms
brand/domain hardcode scan in code directories -> no matches
sensitive-claim scan -> only negative/guardrail uses for price, stock, affiliate, benchmark, tokens-per-second, and guaranteed-fit language

2026-06-11 sitewide back to top button:
npm.cmd run lint -> passed
npm.cmd run build -> passed, 51 static pages generated
layout -> mounts shared BackToTopButton after the footer for all frontend routes
static HTML -> home page and newest guide include back-to-top-button
brand/domain hardcode scan in code directories -> no matches
follow-up -> BackToTopButton is now icon-only with an upward arrow and hover/focus "Back to top" tooltip
npm.cmd run lint -> passed
npm.cmd run build -> passed, 51 static pages generated

2026-06-11 local LLM GPU guide layout differentiation:
npm.cmd run lint -> passed
npm.cmd run build -> passed, 51 static pages generated
/guides/how-to-choose-a-gpu-for-local-llms -> refactored from comparison-guide rhythm into a decision workflow with 5 starter questions, 6-step diagnostic flow, model example roles, "When not to buy yet", GPU profile reading checks, and next-tool routing
static HTML -> new decision-workflow headings present; old Quick answer, decision table, VRAM tier, and persona-route headings absent
static HTML -> exactly 1 H1
brand/domain hardcode scan in code directories -> no matches
follow-up -> 6-step decision flow now uses a scoped 3-column desktop grid for a 3-over-3 card layout
npm.cmd run lint -> passed
npm.cmd run build -> passed, 51 static pages generated

2026-06-11 guide CTA consolidation and fast routing:
npm.cmd run lint -> passed
npm.cmd run build -> passed, 51 static pages generated
/guides/how-to-choose-a-gpu-for-local-llms -> removed duplicate Continue planning / Next routes section; Choose your next tool remains as the route selector before FAQ
/guides/12gb-vs-16gb-vram-local-ai -> added Fast routing after your estimate with five estimate-band next-route cards
source checks -> 12GB vs 16GB guide contains the new fast-routing heading; local LLM GPU guide no longer contains Continue planning or Next routes
brand/domain hardcode scan in code directories -> no matches
```

## Do Not Do Next

- Do not create many new SEO pages before data cleanup.
- Do not enable affiliate links before disclosure and URL readiness.
- Do not add database/auth/payment/Payload.
- Do not add live price/availability claims without approved source/API.
- Do not hardcode brand/domain in code directories.
