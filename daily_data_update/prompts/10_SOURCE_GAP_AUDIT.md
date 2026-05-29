# 10 — Source gap audit

Task: audit null/missing/weakly sourced fields before enrichment.

Read first:

- daily_data_update/README.md
- daily_data_update/docs/SOURCE_EXPANSION_POLICY.md
- daily_data_update/docs/GPU_FIELD_COVERAGE_MATRIX.md
- daily_data_update/docs/CALCULATOR_DATA_POLICY.md
- data/gpus.json
- data/ai-models.json
- data/calculator-assumptions.json if it exists

Do:

1. Inspect production data files.
2. For every important null/missing/weak field, classify it as:
   - required-for-page
   - required-for-calculator
   - useful-but-optional
   - unsafe-to-fill-without-api
3. Do not fill fields in this task unless the user explicitly asks.
4. Write source gaps to:
   - `data/update-candidates/source-gap-candidates.json`
5. Include:
   - dataset
   - slug
   - field
   - currentValue
   - priority
   - neededSourceType
   - suggestedSourceOrder
   - reason
   - status: source-gap

Definition of Done:

- No important null field is silently ignored.
- Gaps are tracked for next enrichment task.
- `DAILY_LOG.md` and `TASK_STATUS.md` are updated.
