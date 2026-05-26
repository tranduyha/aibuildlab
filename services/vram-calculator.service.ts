import type {
  ContextPreset,
  Quantization,
  VramCalculatorInput,
  VramEstimateResult,
  VramRecommendation,
} from "@/types";

const MEMORY_PER_BILLION_PARAMETERS: Record<Quantization, number> = {
  fp16: 2,
  int8: 1,
  int4: 0.5,
};

const CONTEXT_OVERHEAD_GB: Record<ContextPreset, number> = {
  short: 1,
  medium: 2,
  long: 4,
};

const ESTIMATE_WARNING =
  "This is a rough estimate, not an official benchmark. Actual VRAM usage depends on runtime, quantization format, context length, KV cache, batch size, drivers, and model architecture.";

function roundToSingleDecimal(value: number): number {
  return Math.ceil(value * 10) / 10;
}

export function calculateEstimatedVram(input: VramCalculatorInput): VramEstimateResult {
  const margin = Math.min(Math.max(input.safetyMarginPercent, 0), 100);
  const modelMemoryGb =
    input.modelSizeBillion * MEMORY_PER_BILLION_PARAMETERS[input.quantization];
  const subtotalGb = modelMemoryGb + CONTEXT_OVERHEAD_GB[input.contextPreset];
  const estimatedVramGb = roundToSingleDecimal(subtotalGb * (1 + margin / 100));

  return {
    ...input,
    safetyMarginPercent: margin,
    estimatedVramGb,
    recommendedMinimumVramGb: Math.ceil(estimatedVramGb),
    quantization: input.quantization,
    contextPreset: input.contextPreset,
    warning: ESTIMATE_WARNING,
    confidence: "low",
    needsReview: true,
    notes: [
      "The estimate uses a simple parameter-memory multiplier plus a context overhead allowance.",
      "Quantization format and runtime implementation may change real memory use.",
      "Validate a chosen model and runtime on target hardware before purchasing a GPU.",
    ],
  };
}

export function getSuitableGpuTier(estimatedVramGb: number): string {
  if (estimatedVramGb <= 8) {
    return "8 GB VRAM planning tier";
  }
  if (estimatedVramGb <= 12) {
    return "12 GB VRAM planning tier";
  }
  if (estimatedVramGb <= 16) {
    return "16 GB VRAM planning tier";
  }
  if (estimatedVramGb <= 24) {
    return "24 GB VRAM planning tier";
  }

  return "More than 24 GB VRAM or a multi-device/cloud planning tier";
}

export function getVramRecommendation(result: VramEstimateResult): VramRecommendation {
  const gpuTier = getSuitableGpuTier(result.estimatedVramGb);

  return {
    gpuTier,
    summary: `For initial planning, consider the ${gpuTier.toLowerCase()} or higher, then validate the selected model and runtime.`,
    warning: result.warning,
  };
}

export function formatVramResult(result: VramEstimateResult): string {
  return `${result.estimatedVramGb.toFixed(1)} GB rough estimate; plan for at least ${result.recommendedMinimumVramGb} GB VRAM before runtime-specific validation.`;
}
