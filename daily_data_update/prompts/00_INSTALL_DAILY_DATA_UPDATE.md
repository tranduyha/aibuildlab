# 00 — Install daily_data_update

Task: install the data operations layer for `aibuildlab`.

Read first:

- AGENTS.md
- TASK_STATUS.md
- DAILY_LOG.md
- docs/DATA_SOURCES.md
- daily_data_update/README.md

Do:

1. Do not create `src`.
2. Do not reinstall the project.
3. Copy or create these production support files if missing:
   - `data/source-registry.json` from `daily_data_update/data/source-registry.json`
   - `data/update-candidates/*.json` from `daily_data_update/data/update-candidates/`
   - `scripts/validate-data.ts` from `daily_data_update/scripts/validate-data.ts`
   - `scripts/generate-daily-data-report.ts` if useful
4. Add `"data:validate": "tsx scripts/validate-data.ts"` to `package.json` only if the repo supports `tsx` or already uses it. If not, document the gap.
5. Do not copy enriched seed files into production JSON blindly.
6. Run:
   - `npm run data:validate` if installed
   - `npm run lint`
   - `npm run build`
7. Update `DAILY_LOG.md` and `TASK_STATUS.md`.

Definition of Done:

- Data ops files exist.
- Validation command exists or limitation is logged.
- No production data is overwritten blindly.
