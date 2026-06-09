# Image Generation Validation Protocol

Last reviewed: 2026-06-09

Use this protocol before converting an image-generation validation record from
`needs-source` to `validated`.

## Required Evidence

Each validated sample needs:

- exact model slug
- runtime and runtime version when available
- workflow
- resolution
- batch size
- precision
- GPU or accelerator details when available
- observed peak VRAM or max memory reserved
- source URL
- accessed or tested date
- notes about offload, VAE, adapters, ControlNet, LoRA, or other workflow extras

## Source Priority

Use this order:

1. Official runtime documentation with measured memory output.
2. Official model card or vendor documentation with measured memory output.
3. Reputable benchmark or engineering write-up with complete setup details.
4. Controlled manual local test with environment metadata.

Do not validate from Reddit/forum comments, social posts, marketplace listings,
or blog posts that do not show setup details.

## Manual Test Shape

For local validation, record the environment:

```txt
OS:
GPU:
driver:
CUDA:
Python:
PyTorch:
Diffusers:
Transformers:
Accelerate:
model:
runtime:
workflow:
resolution:
batch size:
precision:
offload:
adapters/controlnet/lora:
observed peak VRAM:
```

If the machine does not expose NVIDIA telemetry, do not mark the sample
validated. Keep it as `needs-source`.

## Current Status

`sdxl-base-1-0-diffusers-1024-fp16-batch-1` is validated from Hugging Face
Diffusers documentation that includes a printed max memory reserved value of
10.47 GB.

`stable-diffusion-3-5-large-diffusers-bf16-batch-1` is validated from a
third-party GIGAGPU guide that reports approximately 20 GB total VRAM for FP16
and includes a Diffusers BF16 deployment snippet. Treat it as approximate
benchmark evidence because it does not print a framework max-memory counter.

`flux-1-dev-diffusers-fp16-batch-1` is validated from a third-party benchmark
with full setup notes from GIGAGPU. Treat it as benchmark evidence, not official
vendor documentation.
