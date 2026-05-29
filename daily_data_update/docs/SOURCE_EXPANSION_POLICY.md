# Source Expansion Policy

This document defines how data researchers, Codex, or any AI/dev should expand sources when official vendor pages do not provide enough field coverage.

The goal is to reduce unnecessary `null` fields without lowering data quality or inventing hardware/model facts.

---

## Core principle

Do not fill missing fields from guesses.

For every important missing field:

```txt
official source first
→ official manufacturer/AIB source if field is variant-specific
→ reputable database/cross-check
→ benchmark/review source only for performance fields
→ affiliate/API source only for price/availability
→ keep null + track source gap if no reliable source exists
```

If no reliable source exists, keep the field as `null`, add or update notes, and track it in:

```txt
data/update-candidates/source-gap-candidates.json
```

The UI must show `Needs verification` or omit the field. Never present an unverified field as fact.

---

## GPU source priority

### Priority 1 — Official GPU vendor

Use official vendor pages first.

Examples:

```txt
NVIDIA official GeForce product/spec pages
AMD official Radeon product/spec pages
Intel Arc / Intel ARK official product pages
```

Use these sources for generic/reference GPU facts when available:

```txt
GPU name
vendor
architecture
VRAM
memory type
CUDA cores / compute units / Xe cores
base clock
boost clock
memory interface / memory bus
memory bandwidth
board power / TGP / TBP if listed
launch date / launch year
official MSRP if listed
```

### Priority 2 — Official AIB / manufacturer sources

If official vendor source is incomplete, check official AIB/manufacturer pages.

Approved AIB/manufacturer examples:

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

Use AIB/manufacturer pages for variant-specific fields such as:

```txt
variant-specific base clock
variant-specific boost clock
memory size/type/speed when listed
memory bus when listed
CUDA cores when listed
power consumption
power connectors
recommended PSU
card dimensions
display outputs
cooler / physical design notes
```

Important rule:

```txt
Data from AIB/manufacturer pages must be marked as variant-specific.
Do not use AIB-specific values as universal GPU claims if the field can vary by board partner or SKU.
```

For GPU specs, if official vendor source is missing a field, check official AIB/manufacturer sources such as MSI, ASUS, Gigabyte, Sapphire, PowerColor, PNY, Zotac, and ASRock. Data from AIB sources must be marked `variant-specific`; do not use it as a universal GPU claim when the field depends on a specific card model.

---

## MSI enrichment rule

MSI official specification pages should be treated as an important AIB enrichment source because they often include rich card-level fields.

Use MSI pages for fields such as:

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

When using MSI:

```json
{
  "name": "MSI product specification page",
  "type": "manufacturer",
  "scope": "variant-specific",
  "variantName": "Exact MSI card model name",
  "fields": ["fieldOne", "fieldTwo"],
  "accessedAt": "YYYY-MM-DD"
}
```

Add a note when needed:

```txt
Variant-specific MSI spec. Do not treat as universal across all board partner cards.
```

Do not use MSI pages for:

```txt
generic benchmark claim
tokens per second
image generation speed
current market price
availability
affiliate claim
universal GPU recommendation
```

unless there is a separate approved source type for that exact field.

---

## Priority 3 — Reputable database / cross-check sources

Use database sources to cross-check or fill gaps when official/AIB sources are incomplete.

Examples:

```txt
TechPowerUp GPU Database
NotebookCheck GPU database
VideoCardz database/news
```

Use database sources carefully for:

```txt
memory bus
memory bandwidth
architecture
launch date
board power
die / process if relevant
cross-checking vendor/manufacturer specs
```

Database data should not override official/vendor data unless:

```txt
official source is missing the field
database source clearly cites/specifies the field
the field is not variant-specific
notes explain the source decision
```

---

## Priority 4 — Benchmark / review sources

Use benchmark/review sources only for performance fields.

Approved examples:

```txt
Puget Systems
Gamers Nexus
Tom's Hardware
Phoronix
ServeTheHome
TechPowerUp Reviews
```

Performance fields require test context:

```txt
test date
software/runtime version
driver version if available
model/workload
quantization/context if LLM-related
testbed hardware
settings
```

Do not add benchmark fields without test context.

Do not use benchmark sources to infer generic specs unless the review clearly lists a sourced specification table.

---

## Priority 5 — Price / availability / affiliate sources

Price and availability are highly dynamic.

Only use approved API/feed/manual timestamp sources such as:

```txt
Amazon Product Advertising API
eBay Browse API
Newegg affiliate/feed
B&H affiliate/feed
manual snapshot with timestamp and source URL
```

Do not use marketplace listing pages as primary hardware specs sources.

Do not add affiliate links unless the project has a clear affiliate program and disclosure.

---

## Null handling

For every important null field:

1. Classify the field:

```txt
required-for-page
required-for-calculator
useful-but-optional
unsafe-to-fill-without-api
```

2. Try approved sources in order.

3. If found:

```txt
fill the field
add sources[] with field-level mapping
set lastVerifiedAt
update dataConfidence if justified
```

4. If not found:

```txt
keep null
add or update notes
write source-gap candidate
make sure UI shows Needs verification or omits the field
```

No important null field should be ignored silently.

---

## Production merge rule

Do not copy enriched sample files blindly into production data.

Merge by:

```txt
slug
id
name
```

Preserve:

```txt
existing schema
existing route slugs
existing manually verified values
field-level source mappings
notes
```

If new data conflicts with existing data:

```txt
prefer official source over AIB
prefer AIB over database for variant-specific card fields
prefer newer source only when it is equally or more authoritative
otherwise keep existing value and log a source gap
```

---

## UI wording rule

If a field is not verified, UI must use safe wording:

```txt
Needs verification
Not yet source-backed
Planning data
Estimate only
Verify official specs before purchase
```

Avoid unsafe wording:

```txt
best
recommended
guaranteed
verified
benchmark shows
runs at X tokens/s
buy this GPU
```

unless the exact claim is source-backed and appropriate for the page.
