"""
Manual image-generation VRAM measurement helper.

This script is intentionally not part of the production build. Run it only on a
machine with an NVIDIA GPU, CUDA PyTorch, and the required model access.

Example:
  python scripts/measure-image-generation-vram.py --model sdxl --resolution 1024 --precision fp16
"""

from __future__ import annotations

import argparse
import json
import platform
from dataclasses import asdict, dataclass


MODEL_IDS = {
    "sdxl": "stabilityai/stable-diffusion-xl-base-1.0",
    "sd35-large": "stabilityai/stable-diffusion-3.5-large",
    "flux-dev": "black-forest-labs/FLUX.1-dev",
}


@dataclass
class Measurement:
    model_key: str
    model_id: str
    resolution: int
    batch_size: int
    precision: str
    runtime: str
    observed_peak_vram_gb: float
    python: str
    platform: str
    torch: str
    diffusers: str
    cuda_available: bool
    gpu_name: str | None
    notes: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser()
    parser.add_argument("--model", choices=MODEL_IDS.keys(), required=True)
    parser.add_argument("--resolution", choices=["512", "768", "1024"], default="1024")
    parser.add_argument("--batch-size", type=int, choices=[1, 2, 4], default=1)
    parser.add_argument("--precision", choices=["fp16", "bf16"], default="fp16")
    parser.add_argument("--prompt", default="A product-style photo of a compact AI workstation on a desk")
    return parser.parse_args()


def main() -> None:
    args = parse_args()

    import torch
    import diffusers
    from diffusers import AutoPipelineForText2Image

    if not torch.cuda.is_available():
      raise SystemExit("CUDA is not available; cannot measure NVIDIA peak VRAM.")

    dtype = torch.float16 if args.precision == "fp16" else torch.bfloat16
    model_id = MODEL_IDS[args.model]
    height = width = int(args.resolution)

    torch.cuda.empty_cache()
    torch.cuda.reset_peak_memory_stats()

    pipe = AutoPipelineForText2Image.from_pretrained(
        model_id,
        torch_dtype=dtype,
        use_safetensors=True,
    ).to("cuda")

    pipe(
        prompt=[args.prompt] * args.batch_size,
        height=height,
        width=width,
    ).images

    observed_peak_vram_gb = torch.cuda.max_memory_reserved() / 1024**3

    measurement = Measurement(
        model_key=args.model,
        model_id=model_id,
        resolution=height,
        batch_size=args.batch_size,
        precision=args.precision,
        runtime="diffusers",
        observed_peak_vram_gb=round(observed_peak_vram_gb, 2),
        python=platform.python_version(),
        platform=platform.platform(),
        torch=torch.__version__,
        diffusers=diffusers.__version__,
        cuda_available=torch.cuda.is_available(),
        gpu_name=torch.cuda.get_device_name(0),
        notes="Manual local measurement using torch.cuda.max_memory_reserved().",
    )

    print(json.dumps(asdict(measurement), indent=2))


if __name__ == "__main__":
    main()
