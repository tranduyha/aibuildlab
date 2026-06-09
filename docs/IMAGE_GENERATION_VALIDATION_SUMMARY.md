# Image Generation Validation Summary

Last reviewed: 2026-06-09

This summary tracks the current image-generation VRAM planning samples used to
check the Image Generation mode on `/tools/vram-calculator`.

The samples are setup-specific. They are not guarantees, buying advice, speed
claims, or universal model requirements.

## Current Samples

| Model | Runtime | Precision | Estimate | Observed | Delta | Source strength |
|---|---|---:|---:|---:|---:|---|
| SDXL Base 1.0 | Diffusers | FP16 | 14.4 GB | 10.47 GB | +3.9 GB | Official runtime docs with printed memory value |
| Stable Diffusion 3.5 Large | Diffusers | BF16 | 19.2 GB | ~20 GB | -0.8 GB | Third-party approximate VRAM guide |
| FLUX.1 dev | Diffusers | FP16 | 24.0 GB | 22 GB | +2.0 GB | Third-party benchmark with setup notes |

## Interpretation

- The image calculator is conservative for SDXL and FLUX in the current sample
  set.
- The SD3.5 Large estimate is close to the third-party approximate value, but
  the source is weaker than a printed runtime memory counter.
- Keep assumptions at draft/low confidence until more runtime-specific samples
  are collected.

## Source Notes

SDXL uses Hugging Face Diffusers documentation that prints a max memory reserved
value. This is currently the strongest sample.

SD3.5 Large uses a GIGAGPU self-hosted guide. The guide reports approximate VRAM
and includes a Diffusers snippet, but does not print a framework memory counter.

FLUX.1 dev uses a GIGAGPU benchmark with setup details. Treat it as one
third-party benchmark sample, not official vendor documentation.

## Next Samples Needed

- SDXL + ComfyUI + 1024 + FP16
- SDXL + ControlNet + 1024 + FP16
- Stable Diffusion 3.5 Large + Diffusers with printed memory counter
- Stable Diffusion 3.5 Large + ComfyUI
- FLUX.1 dev + Diffusers with offload
- FLUX.1 dev + ComfyUI

## Public Copy Rules

Allowed:

- "observed sample"
- "setup-specific"
- "planning estimate"
- "not a guarantee"
- "source-backed sample"

Avoid:

- "guaranteed to run"
- "best GPU"
- "recommended GPU to buy"
- "exact requirement"
- speed claims without full benchmark setup
