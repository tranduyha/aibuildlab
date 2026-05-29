# Calculator data policy

The VRAM Calculator is a planning tool, not a benchmark database.

## Required data files

Recommended production files:

```txt
data/ai-models.json
data/gpus.json
data/calculator-assumptions.json
data/calculator-validation.json optional
```

## Calculator model target

Month 1 target:

```txt
15–20 source-backed AI model/use-case records
8–12 calculatorEligible records in dropdown
```

A model can appear in the calculator dropdown only if it has:

```txt
slug
name
family/developer
modality
parameterCountB or source-backed size class
sources[] with field-level mapping
calculatorEligible: true
dataConfidence: medium or high
lastVerifiedAt
```

## Estimate warning

Calculator output must clearly say:

```txt
This is a planning estimate, not a benchmark.
Actual VRAM depends on model architecture, quantization format, runtime, context length, KV cache, batch size, OS/driver overhead, and implementation details.
```

## GPU matching wording

Allowed:

```txt
Source-backed GPU matches
Planning-only GPU candidates
Verify official specs before purchase
```

Disallowed unless benchmark/source-backed:

```txt
best GPU
recommended GPU to buy
guaranteed to run
tokens/s
images/minute
```

## Image-generation models

LLM and image-generation estimates may need separate formula modes. Do not force image models through an LLM formula without warning.
