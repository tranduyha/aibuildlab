# Data update workflow

This workflow prevents accidental publication of weak or invented data.

## Modes

### 1. Research mode

Use for daily scanning.

Prompt:

```txt
prompts/01_DAILY_ALL_RESEARCH.md
```

Writes to:

```txt
data/update-candidates/*.json
```

Does not write directly to production JSON unless explicitly instructed and source evidence is already complete.

### 2. Source-gap audit mode

Use before enrichment.

Prompt:

```txt
prompts/10_SOURCE_GAP_AUDIT.md
```

Writes missing/weak fields to:

```txt
data/update-candidates/source-gap-candidates.json
```

### 3. Enrichment mode

Use to merge source-backed data into production files.

Prompts:

```txt
prompts/02_GPU_ENRICHMENT_10_PUBLISHABLE.md
prompts/04_AI_MODEL_ENRICHMENT_FOR_CALCULATOR.md
prompts/11_GPU_MULTI_SOURCE_ENRICHMENT.md
```

Writes to:

```txt
data/gpus.json
data/ai-models.json
data/calculator-assumptions.json
```

Rules:

- Merge by slug/name.
- Preserve existing schema.
- Preserve existing values if they have stronger/newer source evidence.
- Add field-level `sources[]` mapping.
- Set `lastVerifiedAt`.
- Never fill from guesses.

### 4. Calculator mode

Use after GPU/model data is source-backed enough.

Prompt:

```txt
prompts/05_CALCULATOR_GPU_MATCHING.md
```

The calculator should use production JSON only, not candidate files.

### 5. Validation and handoff

Every data session ends with:

```sh
npm run data:validate
npm run lint
npm run build
```

Then update:

```txt
DAILY_LOG.md
TASK_STATUS.md
```
