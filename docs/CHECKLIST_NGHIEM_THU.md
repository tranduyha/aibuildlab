# Month 2 QA Checklist

Use this checklist before publishing new Month 2 work or marking a task done.

## 1. Architecture

- [ ] No `src/` directory was created.
- [ ] Public pages are under `app/(frontend)/`.
- [ ] Shared components are under `components/`.
- [ ] Static production data is under `data/`.
- [ ] Data reads are in `repositories/`.
- [ ] Business logic is in `services/`.
- [ ] Types are in `types/`.
- [ ] SEO helpers stay in `lib/seo.ts` or adjacent `lib/` helpers.
- [ ] No production database, auth, payment, Payload, or SaaS dashboard was added.
- [ ] Static export compatibility is preserved.

## 2. Verification Commands

Run as applicable:

```sh
npm run data:validate
npm run lint
npm run build
```

Required:

- [ ] `npm run data:validate` ran when data changed.
- [ ] `npm run lint` passed or failure is logged.
- [ ] `npm run build` passed or failure is logged.
- [ ] `DAILY_LOG.md` was updated.
- [ ] `TASK_STATUS.md` was updated.

## 3. SEO Technical

- [ ] Page has a unique title and description.
- [ ] Page has a clean canonical URL.
- [ ] Page has exactly one visible H1.
- [ ] Page is reachable through internal links.
- [ ] Sitemap includes the page if it should be indexable.
- [ ] Robots rules do not block the page by mistake.
- [ ] Structured data is valid and not misleading.
- [ ] Breadcrumb or clear navigation is present where useful.
- [ ] Mobile layout is usable.
- [ ] No broken internal links were introduced.
- [ ] `html lang="en"` remains present in the root layout.

## 4. Content Quality

- [ ] Page answers a real user intent.
- [ ] Content is not a thin keyword swap.
- [ ] Claims are source-aware.
- [ ] Draft or estimated data is clearly labeled.
- [ ] FAQs are useful and not filler.
- [ ] CTAs are helpful, not spammy.
- [ ] No unsupported "best", "guaranteed", price, availability, or benchmark
  claims were introduced.

## 5. Data Quality

- [ ] Important GPU/model fields have field-level sources when displayed as facts.
- [ ] Missing important fields remain `null` or render as "Needs verification".
- [ ] `needsReview`, `dataConfidence`, `sources`, and `lastVerifiedAt` are
  accurate.
- [ ] Calculator-eligible AI model records meet the calculator data policy.
- [ ] Price and availability are hidden unless timestamped from approved sources.
- [ ] Affiliate or referral fields are not guessed.

## 6. Brand and Domain

- [ ] Brand/domain text comes from site settings or helpers.
- [ ] No hardcoded current brand/domain strings were added in:
  - `app/(frontend)/`
  - `components/`
  - `lib/`
  - `services/`
  - `repositories/`

## 7. Images

- [ ] No Google Images source was used.
- [ ] Real images have manifest metadata.
- [ ] Image alt text comes from manifest when applicable.
- [ ] Missing image metadata has a safe fallback.

## 8. Monetization

- [ ] No live affiliate link was added unless explicitly requested.
- [ ] Affiliate disclosure is enabled before affiliate CTAs render.
- [ ] CTA copy is neutral.
- [ ] No commission, discount, price, or stock claim appears without a valid
  source.

## 9. Month 2 Release Gate

Before scaling new SEO pages:

- [ ] Core GPU source-field warnings are reduced or tracked.
- [ ] Calculator data is source-backed enough for the intended feature.
- [ ] New pages are connected through internal links.
- [ ] Sitemap and build output confirm indexable routes.
- [ ] The page adds real value beyond existing pages.

