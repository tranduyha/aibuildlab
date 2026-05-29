# 05 — Calculator exact model -> GPU matching

Task: connect exact AI model selection to VRAM estimate and GPU matching.

Read first:

- daily_data_update/docs/CALCULATOR_DATA_POLICY.md
- data/gpus.json
- data/ai-models.json
- data/calculator-assumptions.json
- repositories/ai-model.repository.ts if exists
- services/ai-model.service.ts if exists
- services/vram-calculator.service.ts
- components/VramCalculator.tsx
- app/(frontend)/tools/vram-calculator/page.tsx

Pre-check:

- `data/ai-models.json` should have 15–20 source-backed records.
- At least 8 records should be `calculatorEligible: true`.
- `data/gpus.json` should have source-backed `vramGb` for 10 target GPUs where possible.

If the pre-check fails, do not mark this task complete; run model/GPU enrichment first.

Required calculator flow:

```txt
User selects exact AI model
→ quantization
→ runtime
→ context preset
→ safety margin
→ estimated VRAM
→ assumptions used
→ source-backed GPU matches
```

GPU matching rule:

- Use source-backed `vramGb` only.
- If estimate already includes headroom, match `vramGb >= estimatedVramGb`.
- If headroom is separate, match `vramGb >= estimatedVramGb + headroom`.

Wording:

Allowed:

```txt
Source-backed GPU matches
Planning-only GPU candidates
Verify official specs before purchase
Not a benchmark
```

Disallowed:

```txt
best GPU
buy this GPU
guaranteed to run
tokens/s
```

Run validation/lint/build and update logs.
