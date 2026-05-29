# 02 — GPU enrichment: 10 publishable/source-backed profiles

Task: prepare the first 10 GPU profiles for public display.

Read first:

- daily_data_update/README.md
- daily_data_update/docs/FIELD_SOURCE_POLICY.md
- daily_data_update/docs/GPU_FIELD_COVERAGE_MATRIX.md
- daily_data_update/data/enriched-seeds/gpu-specs-source-backed.v1.json
- data/gpus.json
- data/update-candidates/gpu-candidates.json
- data/update-candidates/source-gap-candidates.json

Goal:

- At least 10 GPU records with source-backed core fields where possible.
- `/gpu` shows source-backed records first.
- Draft profiles remain visible only as planning profiles with warning.

Target GPU set:

- RTX 3060 12GB
- RTX 4060 Ti 16GB
- RTX 4070
- RTX 4070 Ti SUPER
- RTX 4080 SUPER
- RTX 4090
- RTX 3090
- RX 7900 XTX
- RTX 5090
- Intel Arc A770 16GB

Use bundled seed first:

```txt
daily_data_update/data/enriched-seeds/gpu-specs-source-backed.v1.json
```

Merge rules:

- Do not copy blindly.
- Merge by slug/name.
- Preserve repo schema.
- Add/extend TypeScript types only when needed.
- Preserve field-level sources.
- If bundled data conflicts with existing stronger source-backed data, keep the stronger data.

For remaining null fields:

- Use official vendor first.
- Use AIB/manufacturer for variant-specific fields.
- Use reputable database/cross-check if official source lacks the field.
- Keep null + source gap if no reliable source.

Do not add:

- benchmark numbers
- tokens/s
- image speed
- price
- availability
- affiliate links

Run:

```sh
npm run data:validate
npm run lint
npm run build
```

Update `DAILY_LOG.md` and `TASK_STATUS.md`.
