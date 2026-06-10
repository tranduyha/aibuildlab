# Calculator Model Eligibility

Last reviewed: 2026-06-09

This note tracks which AI model records are allowed into each VRAM Calculator
mode and which records stay hidden until a better formula or workflow exists.

## Current Calculator Mode

The calculator currently supports:

- Dense text LLM planning.
- Separate MoE planning estimates for source-backed Mixture-of-Experts records.
- Separate Image Generation planning estimates.

It does not yet support:

- embedding-specific workload estimates
- benchmark-backed runtime performance claims

MoE, dense LLM, and image diffusion estimates use separate formula paths on
`/tools/vram-calculator`.

## Eligible Dense LLM Models

These records are allowed in the calculator dropdown because they have
source-backed model identity, developer/family, modality, parameter size, and
field-level sources.

| Slug | Reason |
|---|---|
| `llama-3-8b` | Dense LLM with source-backed 8B profile. |
| `llama-3-1-8b-instruct` | Dense LLM with source-backed 8B and 128K context metadata. |
| `llama-3-1-70b-instruct` | Dense LLM with source-backed 70B and 128K context metadata. |
| `qwen2-5-7b-instruct` | Dense LLM with source-backed Qwen2.5 model table coverage. |
| `qwen2-5-14b-instruct` | Dense LLM with source-backed Qwen2.5 model table coverage. |
| `qwen2-5-32b-instruct` | Dense LLM with source-backed Qwen2.5 model table coverage. |
| `qwen2-5-72b-instruct` | Dense LLM with source-backed Qwen2.5 model table coverage. |
| `mistral-7b-instruct-v0-3` | Dense LLM with source-backed Mistral model-card coverage. |
| `gemma-2-9b` | Dense LLM with source-backed model identity and license metadata. |
| `gemma-2-27b` | Dense LLM with source-backed model identity and license metadata. |
| `deepseek-r1-distill-qwen-7b` | Dense DeepSeek reasoning distill with source-backed parameter size and MIT license metadata. |
| `deepseek-r1-distill-llama-8b` | Dense DeepSeek reasoning distill with source-backed parameter size and MIT license metadata. |
| `deepseek-r1-distill-qwen-14b` | Dense DeepSeek reasoning distill with source-backed parameter size and MIT license metadata. |
| `deepseek-r1-distill-qwen-32b` | Dense DeepSeek reasoning distill with source-backed parameter size and MIT license metadata. |

## Image Generation Mode Models

These records remain excluded from the dense LLM dropdown, but are available in
the Image Generation mode through separate workflow presets.

| Slug | Inclusion reason | Next step |
|---|---|---|
| `sdxl-base-1-0` | Image diffusion model with an SDXL planning preset. | Validate against source-backed runtime memory samples. |
| `stable-diffusion-3-5-large` | Image diffusion model with a larger image workflow planning preset. | Validate Diffusers/ComfyUI memory behavior before stronger claims. |
| `flux-1-dev` | Image diffusion model with a high-memory FLUX planning preset. | Validate exact runtime, offload, and precision behavior before stronger claims. |

## Image Validation Samples

Image-generation validation samples are tracked in:

```txt
data/image-generation-validation-samples.json
```

Current sample slots:

| Sample | Status | Public use |
|---|---|---|
| SDXL Base 1.0 + Diffusers + 1024 + FP16 + batch 1 | `validated` | May be used as one source-backed observed sample with caution. |
| Stable Diffusion 3.5 Large + Diffusers + BF16 + batch 1 | `validated` | May be used as one third-party approximate VRAM sample with caution. |
| FLUX.1 dev + Diffusers + FP16 + batch 1 | `validated` | May be used as one third-party benchmark sample with caution. |

Validated samples may be used as cautious observed references. Records that
remain `needs-source` have source-backed workflow/model references but not
measured peak VRAM values.

## MoE Estimate Mode Models

These records remain excluded from the dense LLM dropdown, but are available in
the MoE mode through a separate planning formula that uses total parameters, or
a higher source-backed packaged model size when available, as the resident
weight-memory baseline.

| Slug | Inclusion reason | Caveat |
|---|---|---|
| `mixtral-8x7b-instruct-v0-1` | Source-backed MoE profile with 47B total parameters, 13B active parameters, 8 experts, 2 active experts, Apache 2.0 license, and 32K context metadata. | Planning estimate only; actual VRAM depends on runtime, quantization, offload, and package format. |
| `deepseek-r1` | Source-backed MoE profile with 671B main model total parameters, 37B active parameters, 128K context metadata, MIT license, and DeepSeek-V3 architecture references. | Uses the higher 685B Hugging Face displayed model size as a conservative resident baseline; not a single-GPU guarantee. |

## Hidden Models

These records remain in `data/ai-models.json`, but should not appear in the
current calculator dropdown.

| Slug | Hidden reason | Next step |
|---|---|---|
| `bge-large-en-v1-5` | Embedding model; workload and batching behavior need a separate estimate policy. | Add embedding/retrieval workload mode if this becomes a calculator target. |
| `nomic-embed-text-v1-5` | Embedding model; workload and batching behavior need a separate estimate policy. | Add embedding/retrieval workload mode if this becomes a calculator target. |

## Add-Or-Remove Guidance

Do not delete hidden records while they still support future guide/software
bridge content. Remove a record only if it is duplicate, obsolete for the site
strategy, or cannot be source-backed after audit.

If the calculator dropdown falls below 8 eligible dense LLMs, add more
source-backed dense LLMs before re-enabling image, embedding, or MoE records.

Suggested future dense LLM candidates:

- Llama 3.2 3B Instruct
- Qwen2.5 3B Instruct
- Ministral 3 8B
- DeepSeek-R1-Distill-Qwen-1.5B
- DeepSeek-R1-Distill-Llama-70B
- Gemma 3 12B
- Phi-3.5 mini instruct

Add only when official/model-card sources support the required fields.
