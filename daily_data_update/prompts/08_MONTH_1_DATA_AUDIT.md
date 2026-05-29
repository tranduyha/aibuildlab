# 08 — Month 1 data audit

Task: audit whether Month 1 data targets are met.

Check:

- 10 source-backed GPU profiles.
- 15–20 AI model/use-case records.
- 8–12 calculatorEligible models.
- calculator assumptions version exists.
- calculator model -> VRAM -> GPU matching works.
- candidate queues are not replacing production enrichment.
- no important null field is silently ignored.
- no benchmark/price/availability claim without proper source.

Run:

```sh
npm run data:validate
npm run lint
npm run build
```

Update `DAILY_LOG.md` and `TASK_STATUS.md` with gaps and next action.
