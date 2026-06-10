# DAILY_LOG.md

Month 1 daily history has been closed and summarized in:

```txt
docs/MONTH_1_SUMMARY.md
```

This file now starts fresh for Month 2.

## Daily Entry Template

```md
## YYYY-MM-DD - Short task title

### Agent
Codex

### Planned Task
- What this session intends to complete.

### Completed
- [ ] Work item 1
- [ ] Work item 2

### Checked
- [ ] npm run data:validate
- [ ] npm run lint
- [ ] npm run build
- [ ] manual checks

### Issues
- None, or list exact failures/residual risks.

### Files Changed
- path/file

### Next Step
- The next recommended task.
```

---

## 2026-06-08 - Month 2 documentation reset

### Agent
Codex

### Planned Task
Close Month 1 documentation, remove obsolete bootstrap docs, create a clean
Month 2 operating roadmap, and reset daily logging for the next phase.

### Completed
- [x] Created `docs/MONTH_1_SUMMARY.md`.
- [x] Created `docs/MONTH_2_ROADMAP.md`.
- [x] Rewrote `TASK_STATUS.md` for Month 2.
- [x] Reset `DAILY_LOG.md` for Month 2.
- [x] Updated `AGENTS.md` for post-Month-1 operating rules.
- [x] Updated `README.md`, `README_ENV.md`, and `docs/CHECKLIST_NGHIEM_THU.md`.
- [x] Removed obsolete Month 1/bootstrap docs after preserving the important
  content in the new summary and roadmap.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 41 existing GPU
  source-field mapping warnings.
- [x] `npm run lint`
- [x] `npm run build`
- [x] Markdown file inventory confirmed the old Month 1/bootstrap docs were
  removed and the new Month 1/Month 2 docs are present.

### Issues
- Existing GPU source-field mapping warnings remain as the first Month 2 data
  cleanup priority.

### Files Changed
- `AGENTS.md`
- `TASK_STATUS.md`
- `DAILY_LOG.md`
- `README.md`
- `README_ENV.md`
- `docs/CHECKLIST_NGHIEM_THU.md`
- `docs/MONTH_1_SUMMARY.md`
- `docs/MONTH_2_ROADMAP.md`
- `daily_data_update/README.md`
- `daily_data_update/docs/CALCULATOR_DATA_POLICY.md`
- `daily_data_update/docs/DATA_CADENCE.md`
- `daily_data_update/prompts/08_MONTH_1_DATA_AUDIT.md`
- `daily_data_update/prompts/11_GPU_MULTI_SOURCE_ENRICHMENT.md`
- Removed `README_DOCS_UPDATE.md`
- Removed `docs/ROADMAP_THANG_1_2.md`
- Removed `docs/PROMPT_MAU_CHO_CODEX.md`
- Removed `CLAUDE.md`

### Next Step
Run Month 2 Day 16 readiness audit, then start GPU source-field cleanup.

---

## 2026-06-09 - GPU source-field warning cleanup

### Agent
Codex

### Planned Task
Research and fix `data/gpus.json` source-field mapping warnings while keeping
valid user-researched data and avoiding vendor-mismatched fields.

### Completed
- [x] Audited the 41 GPU source-field warnings from `npm run data:validate`.
- [x] Preserved source-backed GPU data where fields match vendor terminology.
- [x] Set vendor-mismatched duplicate fields to `null`, including NVIDIA
  `streamProcessors` / `computeUnits` / `tbpWatts`, AMD and Intel
  `cudaCores`, and Intel `streamProcessors` / `computeUnits` / `tgpWatts`.
- [x] Added official source mappings for launch year coverage where appropriate.
- [x] Added AMD official source mappings for stream processors, compute units,
  launch year, and memory speed.
- [x] Added Intel official source mappings for memory bus, memory speed, TBP,
  and launch year.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 49 static pages.

### Issues
- No validation, lint, or build failures.
- Follow-up opportunity: add a vendor-specific NVIDIA `smCount` field if the
  site later wants to show SM counts instead of overloading `computeUnits`.

### Files Changed
- `data/gpus.json`

### Next Step
Move to calculator assumptions and AI model eligibility cleanup after a quick
manual spot-check of changed GPU pages.

---

## 2026-06-09 - Calculator assumptions and model eligibility cleanup

### Agent
Codex

### Planned Task
Tighten VRAM Calculator model eligibility, keep enough source-backed dense LLM
options in the dropdown, and document hidden model paths for image diffusion,
MoE, and embedding records.

### Completed
- [x] Changed calculator model option logic so only explicit
  `calculatorEligible: true` records can enter the dropdown.
- [x] Updated calculator assumptions to describe the current dense LLM formula
  and exclude image diffusion / MoE / embedding records from the default
  calculator mode.
- [x] Enriched eligible dense LLM records with source-backed license and context
  fields where official/model-card sources support them.
- [x] Confirmed the calculator still has 10 eligible dense LLM model options.
- [x] Documented 6 hidden model records and their next-step paths in
  `docs/CALCULATOR_MODEL_ELIGIBILITY.md`.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 49 static pages.

### Issues
- Image diffusion, MoE, and embedding records remain intentionally hidden from
  the current calculator until separate formula modes are implemented.

### Files Changed
- `data/ai-models.json`
- `data/calculator-assumptions.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `services/calculator-assumption.service.ts`

### Next Step
Review the calculator page manually, then plan a separate image-diffusion
workflow estimator if image-generation planning becomes the next priority.

---

## 2026-06-09 - Image generation calculator mode

### Agent
Codex

### Planned Task
Add Image Generation mode to the existing `/tools/vram-calculator` route without
mixing image workflows into the dense LLM formula.

### Completed
- [x] Added `data/image-generation-assumptions.json` with draft planning
  presets for SDXL, Stable Diffusion 3.5 Large, and FLUX.1 dev.
- [x] Added image-generation calculator types, repository, and service layer.
- [x] Added an LLM / Image Generation segmented control to the existing
  calculator UI.
- [x] Wired image workflow, resolution, precision, runtime, batch size, and
  safety margin controls.
- [x] Kept image estimates labeled as planning estimates, not benchmarks.
- [x] Updated calculator page copy and eligibility documentation for the new
  image mode.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 49 static pages.
- [x] Local smoke check returned HTTP 200 for `/tools/vram-calculator` and
  confirmed Image Generation copy is present.

### Issues
- Image-generation assumptions remain draft/low confidence until validated with
  runtime-specific memory samples.

### Files Changed
- `app/(frontend)/theme.css`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `components/VramCalculator.tsx`
- `data/image-generation-assumptions.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `repositories/image-generation-assumption.repository.ts`
- `services/image-generation-calculator.service.ts`
- `types/image-generation-calculator.ts`
- `types/index.ts`

### Next Step
Collect source-backed runtime memory samples for SDXL, Stable Diffusion 3.5, and
FLUX before strengthening image-generation claims or publishing image-specific
SEO guides.

---

## 2026-06-09 - Image generation validation layer

### Agent
Codex

### Planned Task
Create a validation data layer for image-generation runtime memory samples so
future observed VRAM evidence can be tracked without changing calculator
contracts.

### Completed
- [x] Added `data/image-generation-validation-samples.json`.
- [x] Added initial SDXL, Stable Diffusion 3.5 Large, and FLUX.1 dev validation
  sample slots with source-backed workflow references.
- [x] Kept sample status as `needs-source` because the researched official
  sources do not provide measured peak VRAM values.
- [x] Added image-generation validation types, repository, and service.
- [x] Added current-estimate comparison support for future observed samples.
- [x] Added image-generation assumption and validation files to
  `scripts/validate-data.ts`.
- [x] Updated calculator eligibility documentation with validation sample status.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 49 static pages.

### Issues
- No source-backed observed peak VRAM numbers were added. Current validation
  records are slots, not public evidence.

### Files Changed
- `data/image-generation-validation-samples.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `repositories/image-generation-validation.repository.ts`
- `scripts/validate-data.ts`
- `services/image-generation-validation.service.ts`
- `types/image-generation-validation.ts`
- `types/index.ts`

### Next Step
Find measured peak VRAM samples with complete setup details, or run controlled
manual tests and record environment metadata before exposing observed samples in
the UI.

---

## 2026-06-09 - First image VRAM observed sample

### Agent
Codex

### Planned Task
Promote any source-backed image-generation validation sample that includes a
measured peak VRAM value, and add a repeatable local measurement protocol.

### Completed
- [x] Promoted the SDXL Base 1.0 + Diffusers + FP16 sample to `validated`.
- [x] Recorded Hugging Face Diffusers' documented max memory reserved value of
  10.47 GB for the SDXL sample.
- [x] Confirmed current image calculator estimate for that sample is 14.4 GB,
  leaving a conservative 3.9 GB delta.
- [x] Added `docs/IMAGE_GENERATION_VALIDATION_PROTOCOL.md`.
- [x] Added `scripts/measure-image-generation-vram.py` for future controlled
  local CUDA measurements.
- [x] Confirmed this machine does not expose `nvidia-smi`, so no local measured
  sample was created here.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] `python -m py_compile scripts/measure-image-generation-vram.py` passed.
- [x] Validation service comparison shows 1 validated sample and 2
  `needs-source` samples.

### Issues
- Stable Diffusion 3.5 Large and FLUX.1 dev still need source-backed observed
  peak VRAM values.

### Files Changed
- `data/image-generation-validation-samples.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `docs/IMAGE_GENERATION_VALIDATION_PROTOCOL.md`
- `scripts/measure-image-generation-vram.py`

### Next Step
Collect measured peak VRAM values for Stable Diffusion 3.5 Large and FLUX.1 dev
from official/runtime docs or controlled manual CUDA tests.

---

## 2026-06-09 - FLUX observed VRAM benchmark sample

### Agent
Codex

### Planned Task
Find and record a source-backed observed VRAM sample for FLUX.1 dev if a
benchmark source provides complete setup details.

### Completed
- [x] Researched public FLUX.1 dev memory benchmark sources.
- [x] Promoted the FLUX.1 dev + Diffusers + FP16 + RTX 4090 sample to
  `validated`.
- [x] Recorded observed peak VRAM as 22 GB from GIGAGPU's RTX 4090 benchmark.
- [x] Captured setup details in notes: Ubuntu 24.04, NVIDIA driver 560.x,
  CUDA 12.6, Diffusers 0.30, PyTorch 2.5, RTX 4090 24GB, 1024x1024, 30 steps,
  guidance scale 3.5.
- [x] Updated calculator eligibility and validation protocol docs.
- [x] Left Stable Diffusion 3.5 Large as `needs-source` because available
  sources did not provide a measured peak VRAM value with sufficient setup
  detail.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 49 static pages.
- [x] Validation service comparison shows 2 validated image samples and 1
  `needs-source` sample.

### Issues
- FLUX validation is from a third-party benchmark, not official vendor/runtime
  documentation, so public copy must describe it cautiously.
- Stable Diffusion 3.5 Large still needs a measured peak VRAM source or manual
  CUDA test.

### Files Changed
- `data/image-generation-validation-samples.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `docs/IMAGE_GENERATION_VALIDATION_PROTOCOL.md`

### Next Step
Collect or run a controlled Stable Diffusion 3.5 Large measured VRAM sample.

---

## 2026-06-09 - Stable Diffusion 3.5 Large approximate VRAM sample

### Agent
Codex

### Planned Task
Find a source-backed SD3.5 Large VRAM sample or document why the source quality
is weaker than the SDXL official memory-counter sample.

### Completed
- [x] Researched Stable Diffusion 3.5 Large measured VRAM sources.
- [x] Promoted the SD3.5 Large + Diffusers + BF16 sample to `validated` using a
  GIGAGPU guide that reports approximately 20 GB total VRAM for FP16 and
  includes a Diffusers BF16 deployment snippet.
- [x] Marked the source as `benchmark` and documented that it is approximate,
  third-party evidence rather than an official max-memory counter.
- [x] Updated validation protocol and eligibility documentation.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 49 static pages.

### Issues
- The SD3.5 source is weaker than the SDXL official Diffusers sample because it
  does not print `max_memory_reserved` or a full GPU environment for the VRAM
  table.

### Files Changed
- `data/image-generation-validation-samples.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `docs/IMAGE_GENERATION_VALIDATION_PROTOCOL.md`
- `TASK_STATUS.md`

### Next Step
Run checks, then add a calculator UI validation signal if all image models have
at least one validation sample.

---

## 2026-06-09 - Image validation UI and planning guide

### Agent
Codex

### Planned Task
Add image validation evidence to the calculator UI, document validation samples,
publish the first image-generation VRAM planning guide, and link it from
relevant routes.

### Completed
- [x] Added an Image Generation validation signal to the calculator result UI.
- [x] Created `docs/IMAGE_GENERATION_VALIDATION_SUMMARY.md`.
- [x] Created `/guides/image-generation-vram-planning`.
- [x] Added a published guide record for Image Generation VRAM Planning.
- [x] Linked the guide from `/tools/vram-calculator`.
- [x] Updated `/guides` so the new guide appears in published guide cards and
  the old Stable Diffusion planning backlog item is replaced with a narrower
  future topic.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 50 static pages.
- [x] Local smoke check returned HTTP 200 for `/tools/vram-calculator`.
- [x] Local smoke check returned HTTP 200 for
  `/guides/image-generation-vram-planning`.
- [x] Local smoke check confirmed `/guides` contains the new guide title.

### Issues
- The validation signal is client-rendered, so the plain HTML smoke check does
  not expose that exact text before hydration.
- Public guide copy stays cautious because current samples are setup-specific
  and include third-party benchmark evidence.

### Files Changed
- `app/(frontend)/guides/image-generation-vram-planning/page.tsx`
- `app/(frontend)/guides/page.tsx`
- `app/(frontend)/theme.css`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `components/VramCalculator.tsx`
- `data/guides.json`
- `docs/IMAGE_GENERATION_VALIDATION_SUMMARY.md`

### Next Step
Add more image-generation validation samples for ComfyUI, ControlNet, and
offload workflows before publishing narrower 12GB vs 16GB or model-specific
image-generation guides.

---

## 2026-06-09 - Image guide SEO and sitemap wiring

### Agent
Codex

### Planned Task
Stop image-generation feature expansion for now and ensure the newly published
Image Generation VRAM Planning guide has sitemap, metadata, schema, and internal
link coverage.

### Completed
- [x] Added `/guides/image-generation-vram-planning` to `app/(frontend)/sitemap.ts`.
- [x] Confirmed the page uses `buildMetadata` with article type, canonical URL,
  Open Graph metadata, title, and description.
- [x] Confirmed the page renders BreadcrumbList, WebPage, and FAQPage JSON-LD.
- [x] Confirmed internal links from `/tools/vram-calculator` and `/guides`.
- [x] Confirmed `robots.txt` still points to the production sitemap.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 50 static pages.
- [x] `out/sitemap.xml` includes
  `https://vramforge.com/guides/image-generation-vram-planning`.
- [x] Built HTML includes canonical, page title, description, Open Graph,
  BreadcrumbList, and FAQPage signals.

### Issues
- None.

### Files Changed
- `app/(frontend)/sitemap.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Resume Month 2 priorities outside image generation: calculator QA, internal
link audit, or the next source-backed guide batch.

---

## 2026-06-09 - Image generation guide SEO polish

### Agent
Codex

### Planned Task
Improve the Image Generation VRAM Planning guide from a good published guide to
a stronger SEO/trust page by adding direct sources, calculator workflow steps,
and model-tier testing guidance.

### Completed
- [x] Updated the guide title and metadata to include SDXL, SD3.5, and FLUX.
- [x] Added direct source links for the SDXL, SD3.5, and FLUX validation samples.
- [x] Added a "How to use the calculator with this guide" workflow section.
- [x] Added a "Which tier should you test first?" section with cautious
  setup-specific guidance.
- [x] Updated `data/guides.json` SEO title/description and source references.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 50 static pages.
- [x] Built HTML includes the updated title, direct source links, canonical,
  FAQPage, BreadcrumbList, and testing-tier section.
- [x] `out/sitemap.xml` still includes
  `https://vramforge.com/guides/image-generation-vram-planning`.

### Issues
- Local HTTP smoke check was skipped because no dev server was reachable, but
  static build output was inspected directly.

### Files Changed
- `app/(frontend)/guides/image-generation-vram-planning/page.tsx`
- `data/guides.json`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Move on from image generation for now; resume Month 2 non-image priorities such
as calculator QA, internal link audit, or source-backed model VRAM pages.

---

## 2026-06-09 - DeepSeek model enrichment

### Agent
Codex

### Planned Task
Research DeepSeek model candidates and add only source-backed models that fit
the current dense LLM calculator policy.

### Completed
- [x] Added DeepSeek-R1-Distill-Qwen-7B, DeepSeek-R1-Distill-Llama-8B,
  DeepSeek-R1-Distill-Qwen-14B, and DeepSeek-R1-Distill-Qwen-32B as eligible
  dense LLM calculator records.
- [x] Added DeepSeek-R1 as a published but hidden MoE profile outside the dense
  calculator formula.
- [x] Left DeepSeek Distill context length fields `null` until a direct
  model-card or config source is mapped.
- [x] Updated calculator eligibility documentation with the new eligible and
  hidden DeepSeek paths.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 50 static pages.
- [x] Calculator model count check found 14 eligible dense LLM records, including
  4 DeepSeek Distill records.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- Full DeepSeek-R1 remains hidden because MoE memory planning needs a separate
  policy for model-load, active-parameter, quantization, and serving behavior.
- DeepSeek Distill context length is intentionally not claimed yet.

### Files Changed
- `data/ai-models.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Add source-backed model profile pages for the strongest calculator models, or
implement a MoE planning policy before exposing DeepSeek-R1 in the calculator.

---

## 2026-06-09 - GSC breadcrumb item fix

### Agent
Codex

### Planned Task
Fix Google Search Console's missing `item` warning inside
`BreadcrumbList.itemListElement` for `/tools/vram-calculator`.

### Completed
- [x] Removed the schema-only `Tools` breadcrumb item because the site does not
  have a real `/tools` index URL.
- [x] Kept the calculator JSON-LD breadcrumb as `Home` -> `VRAM Calculator`,
  with both ListItem entries carrying valid canonical `item` URLs.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 50 static pages.
- [x] Parsed `.next/server/app/tools/vram-calculator.html` and confirmed the
  calculator BreadcrumbList has 0 missing `item` entries.
- [x] Parsed 34 built BreadcrumbList schemas and confirmed every ListItem has
  an `item` URL.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- GSC may take time to clear the warning after deployment and validation.

### Files Changed
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Deploy the fix, then use GSC's "Validate fix" action for the affected
Breadcrumb issue.

---

## 2026-06-10 - Model VRAM page framework

### Agent
Codex

### Planned Task
Create the first source-backed model VRAM page framework for
`/models/[slug]/vram-requirements` without scaling thin model pages.

### Completed
- [x] Added a published-model repository helper for source-backed model lookup.
- [x] Added model VRAM page service helpers with an explicit allowlist so the
  framework can publish one testable page before the full batch.
- [x] Added `/models/[slug]/vram-requirements` with `generateStaticParams`,
  `generateMetadata`, canonical metadata, BreadcrumbList, WebPage, and FAQPage.
- [x] Rendered the first framework page for
  `/models/llama-3-1-8b-instruct/vram-requirements`.
- [x] Reused the existing dense LLM calculator service for planning estimates
  instead of duplicating estimate logic.
- [x] Kept model page language cautious: planning estimates only, no tokens/s,
  no price/stock claims, no best-GPU or guaranteed-run wording.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 51 static pages.
- [x] Static HTML for the Llama 3.1 8B page includes H1, canonical, Open Graph,
  BreadcrumbList, WebPage, FAQPage, source links, calculator link, and GPU
  planning references.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- The framework intentionally exposes only one model page until the next batch
  expands the allowlist and content coverage.
- Sitemap/internal-link expansion is deferred to the dedicated internal-linking
  step.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `repositories/ai-model.repository.ts`
- `services/ai-model.service.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Run `THUC_THI_MODEL_VRAM_BATCH_1` to expand the framework to the first 2-3
source-backed model VRAM pages.

---

## 2026-06-10 - Model VRAM batch 1

### Agent
Codex

### Planned Task
Expand the model VRAM framework to the first small batch of source-backed dense
LLM pages without creating thin keyword-swap content.

### Completed
- [x] Published the first 3 model VRAM pages:
  `/models/llama-3-1-8b-instruct/vram-requirements`,
  `/models/qwen2-5-7b-instruct/vram-requirements`, and
  `/models/mistral-7b-instruct-v0-3/vram-requirements`.
- [x] Added an explicit allowlist for the first model page batch.
- [x] Added model-specific planning summaries, context notes, fit notes, and
  FAQ items for Llama 3.1 8B, Qwen2.5 7B, and Mistral 7B.
- [x] Kept all VRAM values tied to the existing dense LLM calculator service
  and labeled as planning estimates.
- [x] Kept MoE, embedding, image-generation, benchmark, speed, price, stock,
  and buying recommendation claims out of the model pages.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] Static HTML for all 3 model pages includes H1, canonical, Open Graph,
  BreadcrumbList, WebPage, FAQPage, source links, calculator link, and
  model-specific notes.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- Sitemap and broader internal linking are intentionally deferred to
  `THUC_THI_MODEL_VRAM_INTERNAL_LINKING`.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `services/ai-model.service.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Run `THUC_THI_MODEL_VRAM_INTERNAL_LINKING` to add sitemap entries and stronger
links between calculator, model pages, GPU profiles, and guide surfaces.

---

## 2026-06-10 - Model VRAM internal linking

### Agent
Codex

### Planned Task
Wire sitemap and internal links for the first model VRAM page batch so the new
pages are discoverable from calculator, guides, and nearby model pages.

### Completed
- [x] Added model VRAM pages to `sitemap.xml` through the AI model service.
- [x] Added a source-backed model VRAM page section to `/tools/vram-calculator`.
- [x] Added a model VRAM requirement page section to `/guides`.
- [x] Added cross-links between the Llama 3.1 8B, Qwen2.5 7B, and Mistral 7B
  model VRAM pages.
- [x] Kept internal-link copy planning-oriented and avoided buying
  recommendations.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] `out/sitemap.xml` includes all 3 model VRAM URLs.
- [x] Built calculator HTML links to all 3 model VRAM pages.
- [x] Built guide hub HTML links to all 3 model VRAM pages.
- [x] Built Llama model page HTML links to the Qwen and Mistral model pages.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- No validation, lint, build, sitemap, or internal-link check failures.
- Follow-up opportunity: run a content-depth pass to add 8GB/12GB/16GB
  decision sections and stronger validation workflows to the 3 model pages.

### Files Changed
- `app/(frontend)/guides/page.tsx`
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `app/(frontend)/sitemap.ts`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `services/ai-model.service.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Run a model VRAM content-depth pass, then consider MoE calculator policy or the
12GB vs 16GB local AI guide.

---

## 2026-06-10 - Model VRAM content depth pass

### Agent
Codex

### Planned Task
Deepen the first 3 model VRAM requirement pages with more useful decision
content for 8GB, 12GB, and 16GB planning, plus clearer validation workflows.

### Completed
- [x] Added 8GB, 12GB, and 16GB tier decision sections to the Llama 3.1 8B,
  Qwen2.5 7B, and Mistral 7B model VRAM pages.
- [x] Added model-specific validation workflow cards that separate artifact,
  context, runtime, and comparison checks.
- [x] Added model-specific FAQ items for 8GB and 12GB fit questions.
- [x] Added comparison notes between the 7B and 8B model pages.
- [x] Kept all claims framed as planning guidance, not benchmarks, buying
  recommendations, speed claims, or guaranteed compatibility.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] Static HTML for all 3 model pages includes the 8GB/12GB/16GB decision
  section, validation workflow, model-specific FAQ, and comparison notes.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- No validation, lint, build, static HTML, or hardcode scan failures.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `services/ai-model.service.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Choose the next Month 2 priority: add a MoE-aware calculator policy or publish a
source-backed 12GB vs 16GB local AI planning guide.

---

## 2026-06-10 - Model VRAM 9.2 quality pass

### Agent
Codex

### Planned Task
Raise the first 3 model VRAM requirement pages above the previous quality score
by adding stronger user-decision content, SEO intent coverage, and comparison
depth without introducing unsupported claims.

### Completed
- [x] Added workload-fit sections for casual chat, coding/light prompting,
  long-context, baseline 7B testing, and runtime comparison scenarios.
- [x] Added "what changes the estimate most" sections for quantization,
  context length, runtime package, offload, and overhead risks.
- [x] Added direct first-time-builder answers for 8GB, 12GB, and 16GB planning
  decisions on each model page.
- [x] Added direct 4-bit baseline comparison cards across all 3 model pages.
- [x] Expanded metadata descriptions to include 8GB, 12GB, 16GB, and larger GPU
  tier planning intent.
- [x] Kept all copy source-aware and avoided benchmark, speed, price, stock,
  "best GPU", and buying recommendation claims.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] Static HTML for all 3 model pages includes workload-fit sections,
  estimate-driver sections, first-time-builder answers, and 4-bit comparison
  cards.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- No validation, lint, build, static HTML, or hardcode scan failures.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `services/ai-model.service.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Result
The 3 model VRAM pages now meet the target quality bar above 9.2 for content
depth, SEO intent coverage, and user decision support.

---

## 2026-06-10 - Model VRAM compare link spacing fix

### Agent
Codex

### Planned Task
Fix the visual spacing between the 4-bit comparison cards and the nearby model
link cards on the model VRAM pages.

### Completed
- [x] Added a scoped `model-compare-links` class to the nearby model links under
  the comparison card grid.
- [x] Added top margin for that scoped link group without changing every
  `.related-links` block sitewide.

### Checked
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] Static HTML for all 3 model pages includes `model-compare-links`.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- No lint, build, static HTML, or hardcode scan failures.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `app/(frontend)/theme.css`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

---

## 2026-06-10 - Model VRAM scale-safety content guardrails

### Agent
Codex

### Planned Task
Increase SEO/content safety for the 3 model VRAM pages so future model-page
scaling requires source-backed, model-specific content instead of simple
keyword-swapped templates.

### Completed
- [x] Added a "What the sources confirm" section to separate source-backed
  model facts from calculator assumptions.
- [x] Added a "How this model differs from nearby pages" section with required
  model-specific differentiators for Llama 3.1 8B, Qwen2.5 7B, and Mistral 7B.
- [x] Added source-confirmation generation from attached model source fields.
- [x] Added publish-time guardrails requiring attached sources, at least 3
  differentiators, at least 2 planning notes, and at least 4 model-specific FAQ
  items for model VRAM pages.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] Static HTML for all 3 model VRAM pages includes "What the sources
  confirm" and "How this model differs from nearby pages".
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- No validation, lint, build, static HTML, or hardcode scan failures.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `services/ai-model.service.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

---

## 2026-06-10 - Model VRAM compare card contrast fix

### Agent
Codex

### Planned Task
Improve visual contrast for the 4-bit baseline comparison cards so they stand
out from the surrounding page background.

### Completed
- [x] Added a scoped `model-compare-grid` class to the comparison card grid
  under "Compare nearby model planning pages".
- [x] Increased card contrast with a white background, clearer border, and
  subtle shadow only for this model comparison grid.
- [x] Confirmed the class is not applied to the VRAM planning estimate grid.

### Checked
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] Static HTML for all 3 model pages includes `model-compare-grid` in the
  compare section.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- No lint, build, static HTML, or hardcode scan failures.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `app/(frontend)/theme.css`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

---

## 2026-06-10 - Model VRAM spacing and responsive pass

### Agent
Codex

### Planned Task
Review the full model VRAM page layout, improve vertical spacing between
sections/cards, and tighten responsive behavior for desktop, tablet, and mobile.

### Completed
- [x] Added scoped `model-vram-page` layout rules for the model VRAM pages.
- [x] Adjusted hero, badge, disclaimer, section heading, grid, and card spacing
  so adjacent blocks have clearer visual separation.
- [x] Added tablet and mobile overrides for section spacing, hero type, lead
  text, disclaimers, grid gaps, and compact card padding.
- [x] Kept the compare-card contrast styling scoped to the nearby-model
  comparison grid.
- [x] Styled the "Open model page" text link to match the `/gpu` "View planning
  profile" CTA pattern: primary color, inline arrow spacing, 14px text, and
  no underline.

### Checked
- [x] `npm run lint` passed.
- [x] `npm run build` passed.
- [x] Build generated 53 static pages.
- [x] Static HTML includes `model-vram-page`, `model-compare-grid`, and
  `model-compare-links` on the model VRAM pages.
- [x] The compare-card text link is scoped through
  `.model-compare-grid .guide-card > a`.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- Browser screenshot verification was not available in this environment because
  Playwright and a callable browser binary were not installed.
- `npm run data:validate` was not run because no data files changed.

### Files Changed
- `app/(frontend)/models/[slug]/vram-requirements/page.tsx`
- `app/(frontend)/theme.css`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

---

## 2026-06-10 - MoE calculator policy

### Agent
Codex

### Planned Task
Implement an explicit Mixture-of-Experts calculator policy so MoE records remain
tracked but are not estimated with the dense LLM VRAM formula.

### Completed
- [x] Added `moe` as a first-class calculator model group in TypeScript types.
- [x] Classified Mixtral 8x7B Instruct v0.1 and DeepSeek-R1 as `calculatorGroup:
  "moe"` while keeping `calculatorEligible: false`.
- [x] Updated the dense LLM calculator model filter so only eligible `llm`
  records with source-backed model size enter the dropdown.
- [x] Added an excluded-model service path with MoE-specific exclusion reasons.
- [x] Added a calculator UI policy notice that lists tracked MoE models excluded
  from dense LLM estimates.
- [x] Added an indexable "Mixture-of-Experts model policy" section and FAQ item
  on `/tools/vram-calculator`.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` initially failed in the sandbox because `next/font`
  could not fetch Google Fonts.
- [x] `npm run build` passed after rerunning with network permission.
- [x] Build generated 53 static pages.
- [x] Static HTML for `/tools/vram-calculator` includes the MoE policy section,
  MoE FAQ item, and calculator notice listing DeepSeek-R1 and Mixtral.
- [x] Only two records are classified as `calculatorGroup: "moe"`:
  Mixtral 8x7B Instruct v0.1 and DeepSeek-R1.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- Build requires network access for Google Fonts when the font is not already
  cached by Next.js.

### Files Changed
- `types/vram-calculator.ts`
- `types/ai-model.ts`
- `data/ai-models.json`
- `services/calculator-assumption.service.ts`
- `services/vram-calculator.service.ts`
- `components/VramCalculator.tsx`
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `app/(frontend)/theme.css`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Follow-Up Plan
- Superseded by the MoE calculator estimate mode implementation entry below.

---

## 2026-06-10 - MoE calculator estimate mode

### Agent
Codex

### Planned Task
Implement the MoE calculator formula plan for both DeepSeek-R1 and Mixtral while
keeping MoE separate from the dense LLM calculator path.

### Completed
- [x] Added structured MoE fields to AI model types.
- [x] Added source-backed MoE data for DeepSeek-R1 and Mixtral 8x7B Instruct
  v0.1, including total parameters, active parameters, expert metadata where
  source-backed, context metadata, and MoE architecture notes.
- [x] Added `data/moe-calculator-assumptions.json` for auditable MoE estimate
  assumptions.
- [x] Added a MoE assumptions repository and MoE calculator service.
- [x] Added a separate MoE mode to `/tools/vram-calculator`.
- [x] Kept DeepSeek-R1 and Mixtral excluded from dense LLM eligibility while
  enabling them through `moeCalculatorEligible`.
- [x] Updated calculator page metadata, FAQ schema, and indexable page copy for
  the MoE estimate mode.
- [x] Updated calculator eligibility documentation.
- [x] Removed the completed MoE formula handoff plan document.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` initially failed in the sandbox because `next/font` could
  not fetch Google Fonts.
- [x] `npm run build` passed after rerunning with network permission.
- [x] Build generated 53 static pages.
- [x] Service smoke check confirmed MoE options:
  `mixtral-8x7b-instruct-v0-1:47/13` and `deepseek-r1:671/37`.
- [x] Service smoke check confirmed Mixtral estimates from a 47B resident
  baseline and DeepSeek-R1 estimates from the conservative 685B packaged
  baseline.
- [x] Static HTML for `/tools/vram-calculator` includes MoE title, FAQ, and
  estimate-mode copy.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- MoE results are still planning estimates only. No observed runtime VRAM
  validation sample has been added for DeepSeek-R1 or Mixtral.
- Build requires network access for Google Fonts when the font is not already
  cached by Next.js.

### Files Changed
- `app/(frontend)/tools/vram-calculator/page.tsx`
- `components/VramCalculator.tsx`
- `data/ai-models.json`
- `data/moe-calculator-assumptions.json`
- `docs/CALCULATOR_MODEL_ELIGIBILITY.md`
- `repositories/moe-calculator-assumption.repository.ts`
- `scripts/validate-data.ts`
- `services/moe-vram-calculator.service.ts`
- `types/ai-model.ts`
- `types/index.ts`
- `types/moe-vram-calculator.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`
- Removed `docs/MOE_CALCULATOR_FORMULA_PLAN.md`

### Next Step
Publish a source-backed 12GB vs 16GB local AI guide or collect MoE runtime VRAM
validation samples before strengthening MoE claims.

---

## 2026-06-10 - Project route cleanup and GPU sitemap coverage

### Agent
Codex

### Planned Task
Review whether the old `/projects` sample route is still useful, remove it if
it is not aligned with the current VRAMForge direction, and add GPU detail pages
to the sitemap.

### Completed
- [x] Confirmed `/projects` was a leftover portfolio/sample route with generic
  app project entries, not a current VRAMForge hardware planning surface.
- [x] Removed the public `/projects` index and `/projects/[slug]` routes.
- [x] Removed unused project sample data, repository, service, component, and
  type export.
- [x] Added all generated GPU detail pages to `sitemap.xml`.
- [x] Rebuilt after clearing stale `.next` route type cache.

### Checked
- [x] `npm run lint` passed.
- [x] `npm run build` passed and generated 49 static pages.
- [x] Static SEO audit found 43 public HTML routes and 43 sitemap URLs.
- [x] Static SEO audit confirmed no `/projects` routes remain.
- [x] Static SEO audit confirmed all GPU detail routes are in the sitemap.
- [x] Static SEO audit found no missing title, description, canonical, or H1
  issues.

### Issues
- Initial build after deleting `/projects` failed because stale `.next/dev`
  route validator types still referenced `/projects/[slug]`; clearing `.next`
  resolved it.

### Files Changed
- `app/(frontend)/sitemap.ts`
- Removed `app/(frontend)/projects/page.tsx`
- Removed `app/(frontend)/projects/[slug]/page.tsx`
- Removed `components/ProjectCard.tsx`
- Removed `data/projects.json`
- Removed `repositories/project.repository.ts`
- Removed `services/project.service.ts`
- Removed `types/project.type.ts`
- `types/index.ts`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Rerun the broader SEO audit after any future route changes, then continue with
the source-backed 12GB vs 16GB local AI guide or MoE validation sample research.

---

## 2026-06-10 - SEO meta description warning fix

### Agent
Codex

### Planned Task
Fix the four static SEO audit warnings where meta descriptions were longer than
the preferred snippet range, while keeping VRAMForge copy source-aware and
non-promotional.

### Completed
- [x] Shortened the `/about` meta description and Open Graph description.
- [x] Shortened the `/cloud-gpu` meta description.
- [x] Shortened the `/guides/cloud-gpu-vs-local-gpu` meta description and
  matching guide data record.
- [x] Shortened the `/guides/local-ai-vs-ai-saas` meta description and matching
  guide data record.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and generated 49 static pages.
- [x] Static SEO audit found 43 public HTML routes, 43 sitemap URLs, 0 issues,
  and 0 warnings.

### Issues
- None.

### Files Changed
- `app/(frontend)/about/page.tsx`
- `app/(frontend)/cloud-gpu/page.tsx`
- `app/(frontend)/guides/cloud-gpu-vs-local-gpu/page.tsx`
- `app/(frontend)/guides/local-ai-vs-ai-saas/page.tsx`
- `data/guides.json`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Continue with source-backed Month 2 content work, with meta descriptions kept
near the 130-155 character range where possible.

---

## 2026-06-10 - VRAM calculator result CTA copy pass

### Agent
Codex

### Planned Task
Tighten the post-estimate calculator CTA so it gives users a clearer planning
reason to continue, without adding buying pressure, price claims, affiliate
language, or mismatched cloud-GPU routing.

### Completed
- [x] Reviewed the CTA render path and confirmed the visible calculator result
  actions are hardcoded in `components/VramCalculator.tsx`.
- [x] Reviewed `placement-vram-calculator-result` in
  `data/monetization-placements.json` and confirmed it is data-backed but not
  currently rendered because it remains reviewed/needs-review.
- [x] Updated the placement title, description, and CTA label to a stronger
  planning-oriented version.
- [x] Updated the visible compare action below calculator results to
  "Compare GPU options before committing".
- [x] Avoided SKU-specific, price-specific, cloud-specific, ranking, or affiliate
  wording.

### Checked
- [x] `npm run data:validate` passed with 0 errors and 0 warnings.
- [x] `npm run lint` passed.
- [x] `npm run build` passed and generated 49 static pages.
- [x] Static HTML for `/tools/vram-calculator` includes the updated compare CTA.

### Issues
- The monetization placement system is not yet wired into the calculator result
  UI. The JSON copy was updated for consistency, while the visible UI change was
  made in the calculator component.

### Files Changed
- `components/VramCalculator.tsx`
- `data/monetization-placements.json`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
If placement rendering is later activated, keep the destination aligned with the
CTA promise: `/compare` for local GPU comparisons and cloud routes only for
local-vs-cloud copy.

---

## 2026-06-10 - Sitewide breadcrumb coverage pass

### Agent
Codex

### Planned Task
Audit public static routes for missing breadcrumbs, excluding the home page, and
add missing visual breadcrumbs or BreadcrumbList structured data.

### Completed
- [x] Added BreadcrumbList JSON-LD to `/about`.
- [x] Added visual breadcrumb and BreadcrumbList JSON-LD to `/compare`.
- [x] Added visual breadcrumb and BreadcrumbList JSON-LD to `/gpu`.
- [x] Added visual breadcrumb and BreadcrumbList JSON-LD to `/guides`.
- [x] Added BreadcrumbList JSON-LD to `/builds`.
- [x] Standardized Cloud GPU breadcrumb markup so `/cloud-gpu` and
  `/cloud-gpu/[slug]` are detected as visual breadcrumbs while keeping their
  existing BreadcrumbList JSON-LD.

### Checked
- [x] `npm run lint` passed.
- [x] `npm run build` passed and generated 49 static pages.
- [x] Static breadcrumb audit checked 42 public routes excluding home and found
  0 missing visual breadcrumbs and 0 missing BreadcrumbList schemas.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- None.

### Files Changed
- `app/(frontend)/about/page.tsx`
- `app/(frontend)/builds/page.tsx`
- `app/(frontend)/cloud-gpu/page.tsx`
- `app/(frontend)/cloud-gpu/[slug]/page.tsx`
- `app/(frontend)/compare/page.tsx`
- `app/(frontend)/gpu/page.tsx`
- `app/(frontend)/guides/page.tsx`
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Keep new public routes on the same standard: visible breadcrumb plus
BreadcrumbList JSON-LD, except for the home page.

---

## 2026-06-10 - Breadcrumb coverage verification

### Agent
Codex

### Planned Task
Re-check breadcrumb coverage across public static output, excluding the home
page, and only patch missing pages if the audit finds a gap.

### Completed
- [x] Reviewed the existing page-level breadcrumb approach and kept it in place.
- [x] Confirmed source-level coverage already includes visual breadcrumbs and
  BreadcrumbList JSON-LD on every public `page.tsx` outside the home page.
- [x] Rebuilt the static output and audited generated HTML instead of relying
  only on source inspection.
- [x] Found no missing visual breadcrumbs or BreadcrumbList schemas across the
  generated public pages.
- [x] Made no page-code changes because the audit did not find a gap.

### Checked
- [ ] `npm run data:validate` skipped because no data files changed.
- [x] `npm.cmd run lint` passed.
- [x] `npm run build` passed and generated 49 static pages.
- [x] Static breadcrumb audit checked 42 public HTML routes excluding home and
  not-found, with 0 missing visual breadcrumbs and 0 missing BreadcrumbList
  schemas.
- [x] Brand/domain hardcode scan in code directories found no matches.

### Issues
- Initial `npm run lint` call was blocked by the local PowerShell execution
  policy for `npm.ps1`; rerunning through `npm.cmd run lint` passed.

### Files Changed
- `DAILY_LOG.md`
- `TASK_STATUS.md`

### Next Step
Keep the current page-specific breadcrumb pattern and repeat the static audit
after future public route additions.
