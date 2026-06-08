# 08 - Legacy Month 1 data audit

Task: audit whether the closed Month 1 data baseline is still valid before
Month 2 expansion.

Use this prompt only when you need to compare the current site against the
foundation targets summarized in `docs/MONTH_1_SUMMARY.md`.

Check:

- 10 source-backed GPU profiles or a clearly tracked source-gap backlog.
- 15-20 AI model/use-case records or a clear enrichment backlog.
- 8-12 calculator-eligible models or a clear eligibility gap list.
- Calculator assumptions version exists or is scheduled in Month 2.
- Calculator model -> VRAM -> GPU matching remains planning-safe.
- Candidate queues are not replacing production enrichment.
- No important null field is silently ignored.
- No benchmark, price, availability, or affiliate claim appears without proper
  source coverage.

Run:

```sh
npm run data:validate
npm run lint
npm run build
```

Update:

- `DAILY_LOG.md`
- `TASK_STATUS.md`

Report:

- Baseline pass/fail result.
- Source gaps remaining.
- Data warnings remaining.
- Whether the next task should be data cleanup, calculator work, or SEO page
  expansion.

