import { calculatorAssumptionService } from "@/services/calculator-assumption.service";
import { gpuRepository } from "@/repositories/gpu.repository";
import type {
  CalculatorModelOption,
  ContextPreset,
  Quantization,
  RuntimeKey,
  VramCalculatorInput,
  VramEstimateResult,
  VramRecommendation,
} from "@/types";

const ESTIMATE_WARNING =
  "This is a planning estimate, not a benchmark. Validate your exact model, runtime, context, and driver stack before hardware decisions.";

const assumptions = calculatorAssumptionService.getAssumptions();

function clampMargin(value: number): number {
  return Math.min(Math.max(value, 0), 100);
}

function roundToSingleDecimal(value: number): number {
  return Math.ceil(value * 10) / 10;
}

export function getCalculatorModelOptions(): CalculatorModelOption[] {
  return calculatorAssumptionService
    .getModelOptions()
    .filter((model) => model.calculatorEligible && model.modelSizeBillion !== null)
    .sort((a, b) => {
      const groupOrder = { llm: 0, "image-diffusion": 1, other: 2 };
      const groupScore = groupOrder[a.group] - groupOrder[b.group];
      if (groupScore !== 0) return groupScore;
      return a.family.localeCompare(b.family) || a.name.localeCompare(b.name);
    });
}

export function getCalculatorModelGroups() {
  const groups: Record<string, CalculatorModelOption[]> = {
    llm: [],
    "image-diffusion": [],
    other: [],
  };

  getCalculatorModelOptions().forEach((model) => {
    groups[model.group].push(model);
  });

  return groups;
}

export function getCalculatorProfiles() {
  return {
    quantizationProfiles: assumptions.quantizationProfiles,
    contextPresets: assumptions.contextPresets,
    runtimeProfiles: assumptions.runtimeProfiles,
    safetyMarginDefaultPercent: assumptions.safetyMarginDefaultPercent,
    assumptionVersion: assumptions.version,
  };
}

export function getDefaultCalculatorInput(): VramCalculatorInput {
  const model = getCalculatorModelOptions()[0];
  return {
    modelSlug: model?.slug ?? "",
    modelSizeBillion: model?.modelSizeBillion ?? 8,
    quantization: "int4",
    contextPreset: "medium",
    runtime: "llama-cpp",
    safetyMarginPercent: assumptions.safetyMarginDefaultPercent,
  };
}

export function calculateEstimatedVram(input: VramCalculatorInput): VramEstimateResult {
  const margin = clampMargin(input.safetyMarginPercent);

  const quantProfile =
    assumptions.quantizationProfiles.find((item) => item.key === input.quantization) ??
    assumptions.quantizationProfiles[0];
  const contextProfile =
    assumptions.contextPresets.find((item) => item.key === input.contextPreset) ??
    assumptions.contextPresets[0];
  const runtimeProfile =
    assumptions.runtimeProfiles.find((item) => item.key === input.runtime) ??
    assumptions.runtimeProfiles[0];

  const estimatedCore =
    ((input.modelSizeBillion * quantProfile.bitsPerParameter) / 8) *
      quantProfile.overheadMultiplier +
    contextProfile.contextOverheadGb +
    runtimeProfile.runtimeOverheadGb;

  const estimatedVramGb = roundToSingleDecimal(estimatedCore * (1 + margin / 100));
  const recommendedMinimumVramGb = Math.ceil(estimatedVramGb);

  const minHeadroomMultiplier = 1 + assumptions.gpuSuggestionPolicy.minHeadroomPercent / 100;
  const requiredForMatch = estimatedVramGb * minHeadroomMultiplier;

  const allMatches = gpuRepository
    .getAllGpus()
    .filter((gpu) => gpu.vramGb !== null && gpu.vramGb >= requiredForMatch)
    .map((gpu) => {
      const isSourceBacked =
        (gpu.status === "published" || gpu.status === "reviewed") &&
        !gpu.needsReview &&
        (gpu.dataConfidence === "medium" || gpu.dataConfidence === "high");

      return {
        slug: gpu.slug,
        name: gpu.name,
        vramGb: gpu.vramGb,
        status: gpu.status,
        dataConfidence: gpu.dataConfidence,
        needsReview: gpu.needsReview,
        isSourceBacked,
        note: isSourceBacked
          ? "Source-backed GPU specs available. Verify compatibility and workload behavior."
          : assumptions.gpuSuggestionPolicy.draftGpuLabel,
      };
    });

  const sourceBackedGpuMatches = allMatches.filter((gpu) => gpu.isSourceBacked).slice(0, 6);
  const planningGpuCandidates = allMatches.filter((gpu) => !gpu.isSourceBacked).slice(0, 6);

  return {
    ...input,
    safetyMarginPercent: margin,
    estimatedVramGb,
    recommendedMinimumVramGb,
    assumptionVersion: assumptions.version,
    confidence: assumptions.dataConfidence,
    warning: ESTIMATE_WARNING,
    warnings: [ESTIMATE_WARNING, assumptions.llmEstimatePolicy.warning],
    needsReview: true,
    notes: [
      assumptions.purpose,
      "GPU matches are planning candidates only and are not benchmark-based recommendations.",
      "Observed validation samples are tracked separately and are currently estimate-only unless sourced.",
    ],
    assumptionsUsed: {
      quantizationLabel: quantProfile.label,
      quantizationBits: quantProfile.bitsPerParameter,
      overheadMultiplier: quantProfile.overheadMultiplier,
      contextLabel: contextProfile.label,
      contextTokens: contextProfile.contextTokens,
      contextOverheadGb: contextProfile.contextOverheadGb,
      runtimeLabel: runtimeProfile.label,
      runtimeOverheadGb: runtimeProfile.runtimeOverheadGb,
      safetyMarginPercent: margin,
    },
    sourceBackedGpuMatches,
    planningGpuCandidates,
  };
}

export function getSuitableGpuTier(estimatedVramGb: number): string {
  if (estimatedVramGb <= 8) return "8 GB VRAM planning tier";
  if (estimatedVramGb <= 12) return "12 GB VRAM planning tier";
  if (estimatedVramGb <= 16) return "16 GB VRAM planning tier";
  if (estimatedVramGb <= 24) return "24 GB VRAM planning tier";
  return "More than 24 GB VRAM or multi-device/cloud planning tier";
}

export function getVramRecommendation(result: VramEstimateResult): VramRecommendation {
  const gpuTier = getSuitableGpuTier(result.estimatedVramGb);
  return {
    gpuTier,
    summary: `Initial planning target: ${gpuTier.toLowerCase()} and validate runtime-specific behavior before purchase decisions.`,
    warning: result.warning,
  };
}

export function formatVramResult(result: VramEstimateResult): string {
  return `${result.estimatedVramGb.toFixed(1)} GB planning estimate with assumption profile ${result.assumptionVersion}; validate on your exact runtime.`;
}

export function isContextPreset(value: string): value is ContextPreset {
  return value === "basic" || value === "medium" || value === "large";
}

export function isQuantization(value: string): value is Quantization {
  return value === "fp16" || value === "int8" || value === "int4";
}

export function isRuntimeKey(value: string): value is RuntimeKey {
  return value === "llama-cpp" || value === "ollama" || value === "vllm" || value === "transformers";
}
