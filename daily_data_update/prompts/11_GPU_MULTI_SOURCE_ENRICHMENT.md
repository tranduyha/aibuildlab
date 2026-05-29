# Prompt: GPU Multi-Source Enrichment

## Task

Use multi-source research to enrich GPU records while preserving source safety.

This task is used when GPU records still have too many `null`, weakly sourced, or draft fields.

---

## Read first

Before editing data, read:

```txt
AGENTS.md
TASK_STATUS.md
DAILY_LOG.md
docs/DATA_SOURCES.md
daily_data_update/README.md
daily_data_update/docs/DATA_UPDATE_WORKFLOW.md
daily_data_update/docs/FIELD_SOURCE_POLICY.md
daily_data_update/docs/SOURCE_EXPANSION_POLICY.md
daily_data_update/docs/GPU_FIELD_COVERAGE_MATRIX.md
daily_data_update/data/source-registry.json
daily_data_update/data/field-coverage/gpu-field-coverage.json
data/gpus.json
```

---

## Goal

Enrich GPU data using approved multi-source coverage.

Target:

```txt
At least 10 Month 1 GPU records with source-backed core fields.
Important null fields either filled or tracked as source gaps.
No invented specs.
No unverified benchmark, price, availability, affiliate, tokens/s, or image speed claims.
```

---

## Required source order

For each missing GPU field, use this source order:

```txt
1. Official GPU vendor source
2. Official AIB/manufacturer source if the field is variant-specific
3. Reputable database/cross-check source
4. Benchmark/review source only for performance fields
5. Approved affiliate/API source only for price/availability
6. Keep null + source gap if no reliable source exists
```

Approved official GPU vendor sources:

```txt
NVIDIA official GeForce pages
AMD official Radeon graphics pages
Intel Arc / Intel ARK official product pages
```

Approved AIB/manufacturer sources:

```txt
MSI
ASUS
Gigabyte
Sapphire
PowerColor
PNY
Zotac
ASRock
```

Approved database/cross-check sources:

```txt
TechPowerUp GPU Database
NotebookCheck GPU database
VideoCardz database/news
```

Approved benchmark/review sources:

```txt
Puget Systems
Gamers Nexus
Tom's Hardware
Phoronix
ServeTheHome
TechPowerUp Reviews
```

---

## MSI / AIB enrichment rule

If official vendor pages are incomplete, check AIB/manufacturer pages.

MSI must be considered an important enrichment source for NVIDIA GPU variants because MSI pages often include:

```txt
memoryBusBit
memorySpeedGbps
cudaCores
boostClockMhz / boostClockGhz
powerConsumptionWatts
powerConnectors
recommendedPsuWatts
cardDimensionsMm
displayOutputs
```

When using MSI or another AIB source:

```txt
- mark the source as type: "manufacturer"
- mark scope as "variant-specific"
- record the exact variantName
- map fields precisely in sources[].fields
- add a note that the data is variant-specific if it may vary by board partner
```

Do not turn a variant-specific value into a universal GPU claim.

Example source object:

```json
{
  "name": "MSI GeForce RTX 4070 GAMING X TRIO 12G Specification",
  "url": "https://www.msi.com/Graphics-Card/GeForce-RTX-4070-GAMING-X-TRIO-12G/Specification",
  "type": "manufacturer",
  "scope": "variant-specific",
  "variantName": "MSI GeForce RTX 4070 GAMING X TRIO 12G",
  "fields": [
    "memoryBusBit",
    "memorySpeedGbps",
    "cudaCores",
    "boostClockMhz",
    "powerConsumptionWatts",
    "powerConnectors",
    "recommendedPsuWatts",
    "cardDimensionsMm"
  ],
  "accessedAt": "YYYY-MM-DD"
}
```

If current schema does not support `scope` or `variantName`, add them only if safe and update TypeScript types. Otherwise store the scope in `notes` and keep field-level source mapping.

---

## Target Month 1 GPU set

Prioritize the existing Month 1 GPU records.

Preferred target set:

```txt
RTX 3060 12GB
RTX 4060 Ti 16GB
RTX 4070
RTX 4070 Ti SUPER
RTX 4080 SUPER
RTX 4090
RTX 3090
RX 7900 XTX
RTX 5090
Intel Arc A770 16GB
```

Use existing records if present.

Do not create thin new records just to hit a number.

---

## Fields to enrich

Fill only source-backed fields.

Core page/calculator fields:

```txt
vramGb
memoryType
memoryBusBit
memoryBandwidthGbps
cudaCores / computeUnits / xeCores
architecture
launchDate / launchYear
```

Useful GPU profile fields:

```txt
baseClockGhz / baseClockMhz
boostClockGhz / boostClockMhz
tgpWatts / tbpWatts / boardPowerWatts
powerConsumptionWatts
recommendedPsuWatts
powerConnectors
memorySpeedGbps
cardDimensionsMm
displayOutputs
```

Do not add unless properly sourced:

```txt
benchmark
tokens/s
image generation speed
price
availability
affiliate link
buying recommendation
```

---

## Null handling

For every important field that remains null:

```txt
1. Classify the missing field:
   - required-for-page
   - required-for-calculator
   - useful-but-optional
   - unsafe-to-fill-without-api

2. Try approved sources in order.

3. If source-backed data is found:
   - fill the field
   - add sources[] field-level mapping
   - set lastVerifiedAt
   - update dataConfidence if justified

4. If no reliable source is found:
   - keep null
   - add/update notes
   - write/update data/update-candidates/source-gap-candidates.json
   - make sure UI renders Needs verification or omits the field
```

No important null field should be ignored silently.

---

## Production data merge rule

Patch:

```txt
data/gpus.json
```

Do not copy sample files blindly.

Merge by:

```txt
slug
id
name
```

Preserve:

```txt
existing slugs
existing schema
existing stronger source-backed values
existing notes unless outdated
```

If a field conflicts:

```txt
official vendor source beats AIB for generic GPU facts
AIB/manufacturer source is acceptable for variant-specific facts
database source is cross-check unless official is unavailable
do not overwrite with weaker or unclear source
```

---

## Data confidence rule

Set confidence carefully:

```txt
high
= official vendor source covers core fields and no important displayed field is unverified

medium
= source-backed by official/AIB/database, but some fields are variant-specific or some optional fields remain missing

low
= seed/draft/estimate or important fields remain unverified
```

Status rule:

```txt
published/reviewed
= core displayed specs are source-backed

draft
= important displayed fields remain unverified
```

If schema only supports `draft` and `published`, use `published` only for source-backed basic profiles.

---

## UI rule

If changing components/pages:

```txt
- show source-backed GPUs first
- show draft records separately as planning profiles needing verification if needed
- do not hide all draft records if fewer than 10 records are published
- show data confidence badges
- show Needs verification for unverified fields or omit the field
```

Do not present GPU matches or GPU profiles as buying recommendations.

---

## Validation

Run:

```sh
npm run data:validate
npm run lint
npm run build
```

If `npm run data:validate` is unavailable:

```txt
inspect scripts/validate-data.ts
inspect package.json
add script only if safe
otherwise document limitation in DAILY_LOG.md
```

---

## Documentation updates

Update:

```txt
DAILY_LOG.md
TASK_STATUS.md
```

DAILY_LOG.md must include:

```txt
- audit result before enrichment
- GPU records enriched
- sources used
- MSI/AIB variant-specific fields, if any
- source gaps remaining
- validation/lint/build result
- limitations
```

TASK_STATUS.md must include:

```txt
- Current Day as Day 4.x if still before Day 5
- Done Today
- Last Completed Task only if checks pass
- Open Limitations
```

---

## Final report

Report briefly:

```txt
- GPU count
- source-backed GPU count
- GPU records enriched
- MSI/AIB sources used
- fields filled from MSI/AIB
- fields still null and why
- files changed
- checks run
- remaining limitations
```
