# daily_data_update v1

This folder is the data-operations playbook for `aibuildlab`.

It was created during the Month 1 foundation phase, but it remains active for
Month 2 data authority work.

It is intentionally separate from production data. The public site should keep reading from the normal project files such as `data/gpus.json`, `data/ai-models.json`, `data/calculator-assumptions.json`, services, components, and pages.

Use this folder to research, enrich, validate, and hand off source-backed data updates safely.

---

## 1. What this folder is for

Active Month 2 scope:

```txt
GPU data
AI model data
VRAM calculator assumptions
VRAM calculator exact model -> estimated VRAM -> GPU matching
Cloud GPU / benchmark / price candidates for later monetization
```

Out of scope for v1:

```txt
CPU data
motherboard data
RAM/SSD/PSU component data
live scraping
unapproved affiliate price ingestion
```

CPU/build-part data can be added later as a separate module.

---

## 2. Folder map

```txt
daily_data_update/
├─ README.md
├─ VERSION.md
├─ docs/
│  ├─ DATA_UPDATE_WORKFLOW.md
│  ├─ DATA_CADENCE.md
│  ├─ FIELD_SOURCE_POLICY.md
│  ├─ CALCULATOR_DATA_POLICY.md
│  ├─ SOURCE_EXPANSION_POLICY.md
│  ├─ GPU_FIELD_COVERAGE_MATRIX.md
│  └─ HANDOFF_CHECKLIST.md
├─ prompts/
│  ├─ 00_INSTALL_DAILY_DATA_UPDATE.md
│  ├─ 01_DAILY_ALL_RESEARCH.md
│  ├─ 02_GPU_ENRICHMENT_10_PUBLISHABLE.md
│  ├─ 03_CALCULATOR_DATA_FOUNDATION.md
│  ├─ 04_AI_MODEL_ENRICHMENT_FOR_CALCULATOR.md
│  ├─ 05_CALCULATOR_GPU_MATCHING.md
│  ├─ 06_WEEKLY_COMPARISON_BUILD_GUIDE.md
│  ├─ 07_PRICE_AFFILIATE_UPDATE_WHEN_READY.md
│  ├─ 08_MONTH_1_DATA_AUDIT.md
│  ├─ 10_SOURCE_GAP_AUDIT.md
│  └─ 11_GPU_MULTI_SOURCE_ENRICHMENT.md
├─ data/
│  ├─ source-registry.json
│  ├─ field-coverage/gpu-field-coverage.json
│  ├─ update-candidates/*.json
│  └─ enriched-seeds/
│     ├─ gpu-specs-source-backed.v1.json
│     ├─ ai-models-source-backed.v1.json
│     ├─ calculator-assumptions.v1.json
│     └─ calculator-validation-samples.v1.json
├─ scripts/
│  ├─ validate-data.ts
│  ├─ generate-daily-data-report.ts
│  ├─ research-gpu-candidates.template.ts
│  ├─ research-ai-model-candidates.template.ts
│  └─ research-calculator-candidates.template.ts
├─ schemas/candidate-schema.md
└─ reports/README.md
```

---

## 3. Golden rule

```txt
Candidate first.
Source-backed then merge.
Validate before done.
No source = no claim.
```

Do not fill null fields with guesses. A null field should become either:

```txt
source-backed value + sources[] field mapping
```

or:

```txt
still null + tracked in source-gap-candidates.json + UI says Needs verification or omits it
```

---

## 4. Full data update flow

```txt
Daily scan
→ data/update-candidates/*.json
→ enrichment prompt
→ production JSON files
→ data:validate
→ site/calculator consumes production data
→ lint/build
→ DAILY_LOG.md + TASK_STATUS.md
```

### Research mode

Prompt:

```txt
prompts/01_DAILY_ALL_RESEARCH.md
```

Output:

```txt
data/update-candidates/*.json
```

Rules:

```txt
Do not publish directly.
Do not overwrite production data.
Use this to collect signals, source URLs, source gaps, and update opportunities.
```

### Enrichment mode

Prompts:

```txt
prompts/02_GPU_ENRICHMENT_10_PUBLISHABLE.md
prompts/04_AI_MODEL_ENRICHMENT_FOR_CALCULATOR.md
prompts/11_GPU_MULTI_SOURCE_ENRICHMENT.md
```

Output:

```txt
data/gpus.json
data/ai-models.json
data/calculator-assumptions.json
```

Rules:

```txt
Start from existing production data.
Merge by slug/name.
Preserve existing schema.
Fill missing fields only when source-backed.
Preserve field-level sources.
Do not copy enriched seed files blindly.
```

### Calculator mode

Prompts:

```txt
prompts/03_CALCULATOR_DATA_FOUNDATION.md
prompts/05_CALCULATOR_GPU_MATCHING.md
```

Inputs:

```txt
data/gpus.json
data/ai-models.json
data/calculator-assumptions.json
```

Outputs:

```txt
exact AI model selection
estimated VRAM
assumption version
source-backed GPU matches
planning-only GPU candidates if needed
```

Rules:

```txt
Estimates are not benchmarks.
GPU matches are not buying recommendations.
Use source-backed GPU VRAM first.
Draft records may appear only with clear warning.
```

---

## 5. Which prompt should I use?

| Goal | Prompt | Frequency |
|---|---|---:|
| Install the data ops layer | `00_INSTALL_DAILY_DATA_UPDATE.md` | once |
| Daily scan for new candidates/signals | `01_DAILY_ALL_RESEARCH.md` | daily |
| Find nulls/source gaps before enrichment | `10_SOURCE_GAP_AUDIT.md` | before each enrichment session |
| Enrich 10 GPU records for public display | `02_GPU_ENRICHMENT_10_PUBLISHABLE.md` | 2–3x/week until complete |
| Enrich missing GPU fields with multi-source policy | `11_GPU_MULTI_SOURCE_ENRICHMENT.md` | after source-gap audit |
| Create/update calculator assumption file | `03_CALCULATOR_DATA_FOUNDATION.md` | weekly or formula change |
| Enrich 15–20 AI model records for calculator | `04_AI_MODEL_ENRICHMENT_FOR_CALCULATOR.md` | 2–3x/week until complete |
| Wire exact model -> VRAM -> GPU matching | `05_CALCULATOR_GPU_MATCHING.md` | after GPU/model data changes |
| Generate comparison/build/guide candidates | `06_WEEKLY_COMPARISON_BUILD_GUIDE.md` | weekly |
| Price/affiliate update | `07_PRICE_AFFILIATE_UPDATE_WHEN_READY.md` | only after approved API/feed |
| Legacy foundation audit | `08_MONTH_1_DATA_AUDIT.md` | use only when checking the closed Month 1 baseline |

---

## 6. Recommended order for Month 2

```txt
Step 1: Run 10_SOURCE_GAP_AUDIT.md.
Step 2: Run 02_GPU_ENRICHMENT_10_PUBLISHABLE.md for the first core GPU batch.
Step 3: Run 11_GPU_MULTI_SOURCE_ENRICHMENT.md if important GPU fields are still null or under-sourced.
Step 4: Run 03_CALCULATOR_DATA_FOUNDATION.md.
Step 5: Run 04_AI_MODEL_ENRICHMENT_FOR_CALCULATOR.md.
Step 6: Run 05_CALCULATOR_GPU_MATCHING.md.
Step 7: Run npm run data:validate, npm run lint, npm run build.
Step 8: Update DAILY_LOG.md and TASK_STATUS.md.
```

After this, continue with the active task in `docs/MONTH_2_ROADMAP.md`.

---

## 7. Month 2 production targets

### GPU

```txt
At least 10 GPU records with source-backed core specs.
/gpu displays source-backed records first.
Draft records may remain visible as planning profiles only with warning.
```

Preferred core GPU set:

```txt
RTX 3060 12GB
RTX 4060 Ti 16GB
RTX 4070
RTX 4070 Ti SUPER
RTX 4080 SUPER
RTX 4090
RTX 3090
RX 7900 XTX
RTX 5090
Intel Arc A770 16GB
```

### Calculator AI models

```txt
15–20 source-backed AI model/use-case records in data/ai-models.json.
8–12 records with calculatorEligible: true.
Calculator dropdown must not be a thin demo list.
```

Model coverage groups:

```txt
Local LLM 7B–9B
Local LLM 13B–14B
Local LLM 27B–34B
Large LLM 70B+
Image generation models
Embedding/reranker/utility models if source-backed
```

A model may appear in calculator dropdown only if it has:

```txt
slug
name
family/developer
modality
parameterCountB or source-backed model size class
sources[] with field-level mapping
calculatorEligible: true
dataConfidence: medium or high
lastVerifiedAt
```

---

## 8. Null handling rule

For every important null/missing field:

```txt
1. classify it:
   - required-for-page
   - required-for-calculator
   - useful-but-optional
   - unsafe-to-fill-without-api

2. try sources in this order:
   - official vendor/model card
   - official manufacturer/AIB
   - reputable database/cross-check
   - benchmark/review source only for performance fields
   - affiliate/API source only for price/availability

3. if source-backed data is found:
   - fill the field
   - add sources[] with field-level mapping
   - set lastVerifiedAt
   - update dataConfidence if justified

4. if no reliable source is found:
   - keep field null
   - update notes
   - add source-gap candidate
   - ensure UI renders Needs verification or omits field
```

No important null field should be silently ignored.

---

## 9. End-of-session checklist

Always run:

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

Manual check after GPU/model/calculator changes:

```txt
/gpu
/gpu/[slug] for at least 2 changed GPUs
/tools/vram-calculator
calculator dropdown count
calculator warnings
GPU match labels
```

Never finish with unlogged failures.
