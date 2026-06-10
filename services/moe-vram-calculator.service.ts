import { aiModelRepository } from "@/repositories/ai-model.repository";
import { gpuRepository } from "@/repositories/gpu.repository";
import { moeCalculatorAssumptionRepository } from "@/repositories/moe-calculator-assumption.repository";
import type {
  ContextPreset,
  MoeEstimateResult,
  MoeModelOption,
  MoeVramCalculatorInput,
  Quantization,
  RuntimeKey,
} from "@/types";

const MOE_ESTIMATE_WARNING =
  "This is a MoE planning estimate, not benchmark data. Validate the exact model package, quantization, runtime, context, offload, and device topology before hardware decisions.";

const assumptions = moeCalculatorAssumptionRepository.getAssumptions();

function clampMargin(value: number): number {
  return Math.min(Math.max(value, 0), 100);
}

function roundToSingleDecimal(value: number): number {
  return Math.ceil(value * 10) / 10;
}

function resolveResidentParameterCount(model: MoeModelOption): {
  residentParameterCountB: number;
  residentParameterSource: "total-parameters" | "packaged-parameters";
} {
  if (
    model.packagedParameterCountB !== null &&
    model.packagedParameterCountB > model.totalParameterCountB
  ) {
    return {
      residentParameterCountB: model.packagedParameterCountB,
      residentParameterSource: "packaged-parameters",
    };
  }

  return {
    residentParameterCountB: model.totalParameterCountB,
    residentParameterSource: "total-parameters",
  };
}

export function getMoeModelOptions(): MoeModelOption[] {
  return aiModelRepository
    .getAllAiModels()
    .filter(
      (model) =>
        model.calculatorGroup === "moe" &&
        model.moeCalculatorEligible === true &&
        typeof model.totalParameterCountB === "number" &&
        typeof model.activeParameterCountB === "number",
    )
    .map((model) => ({
      slug: model.slug,
      name: model.name,
      family: model.family ?? model.modelFamily ?? "Mixture-of-Experts",
      totalParameterCountB: model.totalParameterCountB ?? 0,
      activeParameterCountB: model.activeParameterCountB ?? 0,
      packagedParameterCountB: model.packagedParameterCountB ?? null,
      expertCount: model.expertCount ?? null,
      routedExpertCount: model.routedExpertCount ?? null,
      sharedExpertCount: model.sharedExpertCount ?? null,
      activeExpertCount: model.activeExpertCount ?? null,
      contextLengthTokens: model.contextLengthTokens ?? null,
      architectureNotes: model.moeArchitectureNotes ?? null,
      dataConfidence: model.dataConfidence,
      needsReview: model.needsReview,
    }))
    .sort((a, b) => {
      const sizeScore = a.totalParameterCountB - b.totalParameterCountB;
      if (sizeScore !== 0) return sizeScore;
      return a.family.localeCompare(b.family) || a.name.localeCompare(b.name);
    });
}

export function getMoeCalculatorProfiles() {
  return {
    quantizationProfiles: assumptions.quantizationProfiles,
    contextPresets: assumptions.contextPresets,
    runtimeProfiles: assumptions.runtimeProfiles,
    safetyMarginDefaultPercent: assumptions.safetyMarginDefaultPercent,
    assumptionVersion: assumptions.version,
  };
}

export function getDefaultMoeCalculatorInput(): MoeVramCalculatorInput {
  const model = getMoeModelOptions()[0];

  return {
    modelSlug: model?.slug ?? "",
    quantization: "int4",
    contextPreset: "medium",
    runtime: "llama-cpp",
    safetyMarginPercent: assumptions.safetyMarginDefaultPercent,
  };
}

export function calculateMoeEstimatedVram(input: MoeVramCalculatorInput): MoeEstimateResult {
  const margin = clampMargin(input.safetyMarginPercent);
  const modelOptions = getMoeModelOptions();
  const model = modelOptions.find((item) => item.slug === input.modelSlug) ?? modelOptions[0];
  if (!model) {
    throw new Error("No MoE calculator model options are available.");
  }
  const quantProfile =
    assumptions.quantizationProfiles.find((item) => item.key === input.quantization) ??
    assumptions.quantizationProfiles[0];
  const contextProfile =
    assumptions.contextPresets.find((item) => item.key === input.contextPreset) ??
    assumptions.contextPresets[0];
  const runtimeProfile =
    assumptions.runtimeProfiles.find((item) => item.key === input.runtime) ??
    assumptions.runtimeProfiles[0];

  const resident = resolveResidentParameterCount(model);
  const weightMemoryGb =
    ((resident.residentParameterCountB * quantProfile.bitsPerParameter) / 8) *
    quantProfile.weightOverheadMultiplier;
  const contextMemoryGb = contextProfile.contextOverheadGb * contextProfile.moeContextMultiplier;
  const runtimeMemoryGb = runtimeProfile.runtimeOverheadGb * runtimeProfile.moeRuntimeMultiplier;
  const estimatedCore = weightMemoryGb + contextMemoryGb + runtimeMemoryGb;
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
          ? "Source-backed GPU specs available. Verify MoE runtime behavior."
          : assumptions.gpuSuggestionPolicy.draftGpuLabel,
      };
    });

  const residentNote =
    resident.residentParameterSource === "packaged-parameters"
      ? "The estimate uses the higher source-backed packaged parameter count as the resident weight-memory baseline."
      : "The estimate uses total parameters as the conservative resident weight-memory baseline.";

  return {
    ...input,
    modelSlug: model.slug,
    safetyMarginPercent: margin,
    estimatedVramGb,
    recommendedMinimumVramGb,
    gpuTier: getMoeGpuTier(estimatedVramGb),
    assumptionVersion: assumptions.version,
    confidence: assumptions.dataConfidence,
    warning: MOE_ESTIMATE_WARNING,
    warnings: [MOE_ESTIMATE_WARNING, assumptions.moeEstimatePolicy.warning],
    needsReview: true,
    notes: [
      assumptions.purpose,
      residentNote,
      "Active parameters are shown for architecture context only and are not used as the VRAM floor.",
      "GPU matches are planning references only and are not benchmark-based buying advice.",
    ],
    assumptionsUsed: {
      modelLabel: model.name,
      totalParameterCountB: model.totalParameterCountB,
      activeParameterCountB: model.activeParameterCountB,
      packagedParameterCountB: model.packagedParameterCountB,
      residentParameterCountB: resident.residentParameterCountB,
      residentParameterSource: resident.residentParameterSource,
      quantizationLabel: quantProfile.label,
      quantizationBits: quantProfile.bitsPerParameter,
      weightOverheadMultiplier: quantProfile.weightOverheadMultiplier,
      weightMemoryGb: roundToSingleDecimal(weightMemoryGb),
      contextLabel: contextProfile.label,
      contextTokens: contextProfile.contextTokens,
      contextOverheadGb: contextProfile.contextOverheadGb,
      moeContextMultiplier: contextProfile.moeContextMultiplier,
      runtimeLabel: runtimeProfile.label,
      runtimeOverheadGb: runtimeProfile.runtimeOverheadGb,
      moeRuntimeMultiplier: runtimeProfile.moeRuntimeMultiplier,
      safetyMarginPercent: margin,
    },
    sourceBackedGpuMatches: allMatches.filter((gpu) => gpu.isSourceBacked).slice(0, 6),
    planningGpuCandidates: allMatches.filter((gpu) => !gpu.isSourceBacked).slice(0, 6),
  };
}

export function getMoeGpuTier(estimatedVramGb: number): string {
  if (estimatedVramGb <= 24) return "24 GB VRAM MoE planning tier";
  if (estimatedVramGb <= 48) return "48 GB VRAM MoE planning tier";
  if (estimatedVramGb <= 96) return "96 GB VRAM MoE planning tier";
  if (estimatedVramGb <= 192) return "192 GB VRAM or multi-device MoE planning tier";
  return "More than 192 GB VRAM, multi-device, unified-memory, or cloud GPU planning tier";
}

export function formatMoeVramResult(result: MoeEstimateResult): string {
  return `${result.estimatedVramGb.toFixed(1)} GB MoE planning estimate with assumption profile ${result.assumptionVersion}; validate on the exact runtime before hardware decisions.`;
}

export function isMoeContextPreset(value: string): value is ContextPreset {
  return value === "basic" || value === "medium" || value === "large";
}

export function isMoeQuantization(value: string): value is Quantization {
  return value === "fp16" || value === "int8" || value === "int4";
}

export function isMoeRuntimeKey(value: string): value is RuntimeKey {
  return value === "llama-cpp" || value === "ollama" || value === "vllm" || value === "transformers";
}
