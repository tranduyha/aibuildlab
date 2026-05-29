# 01 — Daily all research

Task: daily data research scan.

Goal: discover new source-backed opportunities without directly publishing them.

Read first:

- daily_data_update/README.md
- daily_data_update/docs/DATA_UPDATE_WORKFLOW.md
- daily_data_update/docs/FIELD_SOURCE_POLICY.md
- daily_data_update/data/source-registry.json
- data/update-candidates/*.json

Research categories:

- GPU source updates.
- AI model/model-card updates.
- Calculator assumption/runtime docs.
- Benchmark/review candidates.
- Cloud GPU provider/pricing candidates.
- Comparison/build/guide topic opportunities.

Output only to candidate files:

```txt
data/update-candidates/gpu-candidates.json
data/update-candidates/ai-model-candidates.json
data/update-candidates/benchmark-candidates.json
data/update-candidates/cloud-gpu-candidates.json
data/update-candidates/comparison-candidates.json
data/update-candidates/build-candidates.json
data/update-candidates/guide-candidates.json
data/update-candidates/source-gap-candidates.json
```

Do not update `data/gpus.json` or `data/ai-models.json` unless the user explicitly asks for enrichment.

Candidate object should include:

```txt
date
topic
slugSuggestion
candidateType
reason
sourceName
sourceUrl
sourceType
affectedFields
confidence
recommendedAction
status: candidate
notes
```

AI model research target:

- prioritize gaps toward 15–20 source-backed model/use-case records.
- prioritize gaps toward 8–12 calculatorEligible models.
- do not add weakly sourced models directly to the calculator dropdown.

End:

- Run `npm run data:validate` if candidate schema validation is enabled.
- Update `DAILY_LOG.md` and `TASK_STATUS.md`.
