# Month 2 Roadmap

Active phase:

```txt
Month 2 - Data Authority, SEO Expansion, and Monetization Readiness
```

Month 2 starts after the Month 1 foundation closed in
`docs/MONTH_1_SUMMARY.md`.

## Strategy

Do not scale page count before data quality.

Month 2 should improve the site in this order:

```txt
source-backed data
-> calculator authority
-> internal linking
-> high-quality SEO pages
-> Cloud GPU / software bridge
-> monetization readiness
```

Google-oriented principle:

```txt
Helpful, reliable, people-first content beats thin programmatic expansion.
```

## Non-Negotiables

- Keep Cloudflare static export compatibility.
- Do not create `src/`.
- Do not hardcode brand/domain in code directories.
- Do not publish unsupported specs, benchmarks, prices, availability, or
  affiliate claims.
- Do not create keyword-swap thin pages.
- Do not enable affiliate links unless explicitly approved.
- Data work must follow `docs/DATA_SOURCES.md` and `daily_data_update/README.md`.

## Month 2 Success Metrics

By the end of Month 2, target:

- Core GPU source-field warnings substantially reduced and tracked.
- 10-12 core GPU records source-backed enough for calculator matching.
- 15-20 AI model/use-case records reviewed.
- 8-12 calculator-eligible AI model records.
- VRAM Calculator has stronger model-aware data and warnings.
- 5-10 new high-quality SEO pages, not dozens of thin pages.
- Better internal link graph across calculator, GPU, models, guides, and Cloud
  GPU pages.
- GSC/PageSpeed/manual QA checklist ready for production monitoring.
- Monetization remains safe and disclosure-first.

## Week 1 - Readiness and Data Cleanup

Goal:

```txt
Close Month 1 cleanly, audit the current site, and start source-field cleanup.
```

### Day 16 - Month 2 Readiness Audit

Tasks:

- Confirm docs point to Month 2.
- Run `npm run data:validate`.
- Run `npm run lint`.
- Run `npm run build`.
- Count generated routes from build output.
- Check sitemap includes public indexable routes.
- Check canonical output for key pages.
- Check no unexpected hardcoded brand/domain strings in code directories.

Definition of Done:

- `DAILY_LOG.md` updated.
- `TASK_STATUS.md` updated.
- Any warnings are listed as Month 2 backlog.

### Day 17 - GPU Source Gap Audit

Tasks:

- Read `daily_data_update/prompts/10_SOURCE_GAP_AUDIT.md`.
- Audit `data/gpus.json` source-field mapping warnings.
- Classify gaps:
  - required for page
  - required for calculator
  - useful optional
  - unsafe without API
- Create or update source-gap candidates if supported by the existing workflow.

Definition of Done:

- Clear list of GPU fields to fix first.
- No guessed data added.

### Day 18 - Core GPU Enrichment Batch 1

Tasks:

- Enrich 5 core GPU records from official/vendor/database sources.
- Add field-level `sources[]`.
- Update `lastVerifiedAt`.
- Set `dataConfidence` only when justified.
- Keep unsupported fields `null`.

Suggested focus:

- RTX 3060 12GB.
- RTX 4060 Ti 16GB.
- RTX 4070.
- RTX 4090.
- RTX 3090.

Definition of Done:

- `npm run data:validate` passes with fewer relevant warnings or clearly logged
  residual warnings.
- GPU pages still render safely.

### Day 19 - Core GPU Enrichment Batch 2

Tasks:

- Enrich 5-7 more core GPU records.
- Preserve schema.
- Do not add price/availability.
- Ensure UI omits or labels unverified fields.

Suggested focus:

- RTX 4070 Ti SUPER.
- RTX 4080 SUPER.
- RX 7900 XTX.
- RTX 5090 if official source coverage is adequate.
- Intel Arc A770 16GB if included in data.

Definition of Done:

- Source-backed core GPU set is strong enough for calculator matching.

### Day 20 - GPU UI Source-Aware Polish

Tasks:

- Review GPU profile UI.
- Ensure source-backed fields are visually distinct from planning-only notes.
- Avoid showing null/unsafe fields as facts.
- Improve source trail if needed.

Definition of Done:

- GPU pages communicate confidence clearly.

## Week 2 - Calculator Authority Upgrade

Goal:

```txt
Make the VRAM Calculator a stronger source-backed utility and SEO asset.
```

### Day 21 - Calculator Assumptions Foundation

Tasks:

- Add or update `data/calculator-assumptions.json` if needed.
- Document formula assumptions.
- Keep estimates labeled as planning estimates.
- Add source references for assumptions where possible.

Definition of Done:

- Calculator assumptions are versioned and auditable.

### Day 22 - AI Model Source Gap Audit

Tasks:

- Audit `data/ai-models.json`.
- Identify records eligible for exact calculator selection.
- Keep `calculatorEligible: false` for under-sourced records.
- Track missing model-card/source gaps.

Definition of Done:

- Clear path to 8-12 eligible calculator records.

### Day 23 - AI Model Enrichment Batch 1

Tasks:

- Enrich 8-10 AI model/use-case records.
- Use official model cards/docs.
- Add field-level sources.
- Add `lastVerifiedAt`.
- Keep runtime/VRAM claims cautious.

Definition of Done:

- Several model records can safely support calculator selection.

### Day 24 - Calculator Matching Upgrade

Tasks:

- Use source-backed GPU VRAM first.
- Label results:
  - Source-backed GPU matches.
  - Planning-only GPU candidates.
- Avoid buying recommendations.
- Preserve canonical and SEO metadata.

Definition of Done:

- Calculator output is more useful and more defensible.

## Week 3 - Source-Backed SEO Expansion

Goal:

```txt
Publish a small number of high-quality pages that deepen topical authority.
```

### Day 25 - Model VRAM Page Framework

Tasks:

- Create a route pattern only if data is ready.
- Use repository/service data flow.
- Add `generateStaticParams`.
- Add `generateMetadata`.
- Add canonical.
- Add FAQ and internal links.

Candidate route:

```txt
/models/[slug]/vram-requirements
```

Definition of Done:

- Framework supports source-backed pages without thin content.

### Day 26 - Publish First Model VRAM Pages

Tasks:

- Publish 2-3 model VRAM pages only for source-backed models.
- Include calculator link.
- Link to relevant GPU profiles and Cloud GPU alternative.
- Avoid exact benchmark/performance claims.

Candidate topics:

- Llama 3.1 8B VRAM requirements.
- Qwen 2.5 7B VRAM requirements.
- Mistral 7B VRAM requirements.

Definition of Done:

- Pages add real information and pass build.

### Day 27 - High-Intent Guide Batch 1

Tasks:

- Publish 1-2 guide pages with strong internal linking.
- Prefer decision guides over "best" affiliate-style pages unless data supports
  stronger claims.

Candidate topics:

- 12GB vs 16GB VRAM for local AI.
- How to choose a GPU for local LLMs.

Definition of Done:

- Guides are helpful, source-aware, and not thin.

## Week 4 - Cloud/Software Bridge and Monetization Readiness

Goal:

```txt
Expand the local -> cloud -> software decision path while keeping trust intact.
```

### Day 28 - Cloud GPU Provider Re-Audit

Tasks:

- Recheck provider source coverage.
- Review referral/affiliate statuses.
- Keep unknown statuses hidden or neutral.
- Do not add live pricing/availability.

Definition of Done:

- Cloud GPU pages remain trustworthy and current enough for planning use.

### Day 29 - Cloud GPU Planning Guide

Tasks:

- Add one useful Cloud GPU planning guide if source coverage is adequate.

Candidate topics:

- Rent GPU vs buy GPU for AI workloads.
- Cloud GPU for local LLM testing.

Definition of Done:

- Guide connects calculator, GPU, builds, and provider profiles.

### Day 30 - AI Software Bridge Planning

Tasks:

- Decide whether `/ai-tools` is ready or should remain private data.
- If not ready, create a guide first.

Candidate topic:

- AI workstation software stack.

Definition of Done:

- No SaaS directory spam.
- Internal links support the local/cloud/software funnel.

### Day 31 - Monetization Safety Audit

Tasks:

- Review affiliate CTA rendering rules.
- Review disclosure toggle.
- Review placement statuses.
- Confirm no unsafe live affiliate CTA renders.

Definition of Done:

- Monetization can be activated later without refactoring page copy.

### Day 32 - Month 2 SEO QA Pass

Tasks:

- Crawl generated routes from sitemap.
- Check title/canonical/H1 patterns.
- Check broken internal links.
- Check mobile layouts.
- Run final commands.
- Update docs with Month 2 findings.

Definition of Done:

- Month 2 work is ready for production deploy and GSC monitoring.

## Ongoing Daily Requirements

Every day:

- Start from `TASK_STATUS.md`.
- Use this roadmap for scope.
- Update `DAILY_LOG.md`.
- Update `TASK_STATUS.md`.
- Run `npm run lint` and `npm run build`.
- Run `npm run data:validate` when data changed.

## Backlog

Technical SEO:

- Add automated sitemap route checks.
- Add a simple internal-link audit script if link count grows.
- Add schema validation notes per template.
- Add PageSpeed/GSC checklist after production deploy.

Data:

- Continue GPU source coverage.
- Add calculator validation samples.
- Improve AI model family/source coverage.
- Track source gaps in candidate files.

Content:

- Model VRAM requirements.
- GPU VRAM tier guides.
- Cloud GPU decision guides.
- AI software workflow guides.

Monetization:

- Add approved affiliate URLs only after disclosure is enabled.
- Add price/availability only through approved timestamped API/feed.
- Keep calculator results non-spammy.

