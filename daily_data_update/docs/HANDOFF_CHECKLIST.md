# Handoff checklist

Before starting:

- Read `TASK_STATUS.md`.
- Read latest entry in `DAILY_LOG.md`.
- Read `daily_data_update/README.md`.
- Choose the correct prompt.

Before finishing:

- Run `npm run data:validate`.
- Run `npm run lint`.
- Run `npm run build`.
- Check `/gpu` and `/tools/vram-calculator` if data changed.
- Update `DAILY_LOG.md`.
- Update `TASK_STATUS.md`.

Never finish with silent validation/build failures.
