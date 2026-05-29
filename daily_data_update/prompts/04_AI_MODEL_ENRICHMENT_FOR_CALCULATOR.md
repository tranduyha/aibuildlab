# 04 — AI model enrichment for calculator

Task: create or maintain a calculator-ready AI model dataset.

Read first:

- daily_data_update/README.md
- daily_data_update/docs/FIELD_SOURCE_POLICY.md
- daily_data_update/docs/CALCULATOR_DATA_POLICY.md
- daily_data_update/data/enriched-seeds/ai-models-source-backed.v1.json
- data/ai-models.json
- data/update-candidates/ai-model-candidates.json

Goal:

- 15–20 source-backed AI model/use-case records in `data/ai-models.json`.
- 8–12 records with `calculatorEligible: true`.
- Calculator dropdown must not be a thin demo list.

Required coverage:

1. Local LLM 7B–9B class.
2. Local LLM 13B–14B class.
3. Local LLM 27B–34B class.
4. Large LLM 70B+ class.
5. Image generation models.
6. Embedding/reranker/utility models if source-backed.

Use bundled seed first:

```txt
daily_data_update/data/enriched-seeds/ai-models-source-backed.v1.json
```

Merge rules:

- Merge by slug/name.
- Preserve existing schema.
- Do not copy blindly.
- Add field-level sources.
- Do not show weakly sourced models in calculator dropdown.

A model may be `calculatorEligible: true` only if it has:

- slug
- name
- family/developer
- modality
- parameterCountB or source-backed model size class
- sources[] with field-level mapping
- dataConfidence medium/high
- lastVerifiedAt

If image generation formula is not ready:

- keep image models as planning profiles, or
- label image estimate mode experimental, or
- disable exact GPU matching for image models until formula support exists.

Run validation/lint/build and update logs.
