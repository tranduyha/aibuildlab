# 03 — Calculator data foundation

Task: make calculator assumptions versioned and source-aware.

Read first:

- daily_data_update/docs/CALCULATOR_DATA_POLICY.md
- daily_data_update/data/enriched-seeds/calculator-assumptions.v1.json
- services/vram-calculator.service.ts
- components/VramCalculator.tsx
- app/(frontend)/tools/vram-calculator/page.tsx

Do:

1. Inspect current calculator service/component.
2. Add or update `data/calculator-assumptions.json` if appropriate.
3. Use bundled seed as the starting point, but do not copy blindly if schema differs.
4. Include:
   - version
   - status
   - dataConfidence
   - needsReview
   - sources[]
   - quantization profiles
   - context presets
   - runtime profiles
   - safety margin defaults
   - notes
5. UI/page should expose assumption version and warning.

Do not:

- claim estimates are benchmarks.
- add tokens/s or image speed.
- add buying recommendations.

Run validation/lint/build and update logs.
