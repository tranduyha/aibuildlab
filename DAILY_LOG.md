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
