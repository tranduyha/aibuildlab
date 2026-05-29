# Field source policy

## Source order

Use this order before leaving a field null:

1. Official vendor / official model card.
2. Official manufacturer/AIB page for variant-specific hardware fields.
3. Reputable database/cross-check source.
4. Benchmark/review source only for performance fields with test conditions.
5. Affiliate/API source only for price and availability.

## Disallowed primary sources

Do not use these as primary sources for specs or model facts:

- Google snippets.
- Reddit/forum/social comments.
- Marketplace listings for hardware specs.
- AI-generated lists.
- Affiliate blogs without source trail.
- YouTube comments.
- Screenshots without original source.

## GPU fields that require sources

If displayed as facts, these need source-backed evidence:

```txt
vramGb
memoryType
memoryBusBit
memoryBandwidthGbps
cudaCores
streamProcessors
computeUnits
xeCores
tensorCores
rtCores
baseClockGhz
boostClockGhz
tgpWatts
tbpWatts
boardPowerWatts
recommendedPsuWatts
architecture
launchDate
launchYear
msrp
price
availability
```

## AI model fields that require sources

```txt
name
family
developer
parameterCountB
modelSizeClass
contextLengthTokens
modality
license
official model card URL
intended use / limitations if displayed as facts
runtime-specific notes if displayed as facts
```

## Calculator eligibility rule

A model cannot have `calculatorEligible: true` unless the fields needed by calculator are source-backed.
