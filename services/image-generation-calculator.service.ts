import { gpuRepository } from "@/repositories/gpu.repository";
import { aiModelRepository } from "@/repositories/ai-model.repository";
import { imageGenerationAssumptionRepository } from "@/repositories/image-generation-assumption.repository";
import type {
  ImageBatchSize,
  ImageGenerationCalculatorInput,
  ImageGenerationEstimateResult,
  ImageGenerationModelOption,
  ImagePrecisionKey,
  ImageResolutionKey,
  ImageRuntimeKey,
  ImageWorkflowKey,
} from "@/types";

const IMAGE_ESTIMATE_WARNING =
  "This is an image-generation planning estimate, not benchmark data. Validate the exact model, resolution, runtime, VAE, adapters, batch size, and driver stack before hardware decisions.";

const assumptions = imageGenerationAssumptionRepository.getAssumptions();

function clampMargin(value: number): number {
  return Math.min(Math.max(value, 0), 100);
}

function roundToSingleDecimal(value: number): number {
  return Math.ceil(value * 10) / 10;
}

export function getImageGenerationModelOptions(): ImageGenerationModelOption[] {
  return assumptions.modelProfiles
    .map((profile) => {
      const model = aiModelRepository.getAiModelBySlug(profile.modelSlug);
      if (!model || model.calculatorGroup !== "image-diffusion") return null;

      return {
        slug: model.slug,
        name: model.name,
        family: model.family ?? model.modelFamily ?? "Image generation",
        baseVramGb: profile.baseVramGb,
        dataConfidence: model.dataConfidence,
        needsReview: model.needsReview,
      };
    })
    .filter((model): model is ImageGenerationModelOption => model !== null)
    .sort((a, b) => a.family.localeCompare(b.family) || a.name.localeCompare(b.name));
}

export function getImageGenerationProfiles() {
  return {
    workflowProfiles: assumptions.workflowProfiles,
    resolutionProfiles: assumptions.resolutionProfiles,
    precisionProfiles: assumptions.precisionProfiles,
    runtimeProfiles: assumptions.runtimeProfiles,
    batchProfiles: assumptions.batchProfiles,
    safetyMarginDefaultPercent: assumptions.safetyMarginDefaultPercent,
    assumptionVersion: assumptions.version,
  };
}

export function getDefaultImageGenerationInput(): ImageGenerationCalculatorInput {
  const model = getImageGenerationModelOptions()[0];

  return {
    modelSlug: model?.slug ?? "",
    workflow: "text-to-image",
    resolution: "1024",
    precision: "fp16",
    runtime: "diffusers",
    batchSize: 1,
    safetyMarginPercent: assumptions.safetyMarginDefaultPercent,
  };
}

export function calculateImageGenerationVram(
  input: ImageGenerationCalculatorInput,
): ImageGenerationEstimateResult {
  const margin = clampMargin(input.safetyMarginPercent);
  const modelProfile =
    assumptions.modelProfiles.find((item) => item.modelSlug === input.modelSlug) ??
    assumptions.modelProfiles[0];
  const workflowProfile =
    assumptions.workflowProfiles.find((item) => item.key === input.workflow) ??
    assumptions.workflowProfiles[0];
  const resolutionProfile =
    assumptions.resolutionProfiles.find((item) => item.key === input.resolution) ??
    assumptions.resolutionProfiles[0];
  const precisionProfile =
    assumptions.precisionProfiles.find((item) => item.key === input.precision) ??
    assumptions.precisionProfiles[0];
  const runtimeProfile =
    assumptions.runtimeProfiles.find((item) => item.key === input.runtime) ??
    assumptions.runtimeProfiles[0];
  const batchProfile =
    assumptions.batchProfiles.find((item) => item.batchSize === input.batchSize) ??
    assumptions.batchProfiles[0];

  const estimatedCore =
    (modelProfile.baseVramGb +
      workflowProfile.overheadGb +
      resolutionProfile.overheadGb +
      runtimeProfile.overheadGb +
      batchProfile.overheadGb) *
    precisionProfile.multiplier;

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
          ? "Source-backed GPU specs available. Verify image workflow behavior."
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
    gpuTier: getImageGenerationGpuTier(estimatedVramGb),
    assumptionVersion: assumptions.version,
    confidence: assumptions.dataConfidence,
    warning: IMAGE_ESTIMATE_WARNING,
    warnings: [IMAGE_ESTIMATE_WARNING, assumptions.notes],
    needsReview: true,
    notes: [
      assumptions.purpose,
      "Image-generation matches are planning candidates only and are not benchmark-based buying advice.",
      "Resolution, VAE, adapters, ControlNet, batch size, and offload settings can materially change memory use.",
    ],
    assumptionsUsed: {
      modelLabel: modelProfile.label,
      modelBaseVramGb: modelProfile.baseVramGb,
      workflowLabel: workflowProfile.label,
      workflowOverheadGb: workflowProfile.overheadGb,
      resolutionLabel: resolutionProfile.label,
      resolutionOverheadGb: resolutionProfile.overheadGb,
      precisionLabel: precisionProfile.label,
      precisionMultiplier: precisionProfile.multiplier,
      runtimeLabel: runtimeProfile.label,
      runtimeOverheadGb: runtimeProfile.overheadGb,
      batchSize: batchProfile.batchSize,
      batchOverheadGb: batchProfile.overheadGb,
      safetyMarginPercent: margin,
    },
    sourceBackedGpuMatches,
    planningGpuCandidates,
  };
}

export function getImageGenerationGpuTier(estimatedVramGb: number): string {
  if (estimatedVramGb <= 8) return "8 GB VRAM image workflow planning tier";
  if (estimatedVramGb <= 12) return "12 GB VRAM image workflow planning tier";
  if (estimatedVramGb <= 16) return "16 GB VRAM image workflow planning tier";
  if (estimatedVramGb <= 24) return "24 GB VRAM image workflow planning tier";
  return "More than 24 GB VRAM, multi-GPU, or cloud GPU planning tier";
}

export function isImageWorkflowKey(value: string): value is ImageWorkflowKey {
  return value === "text-to-image" || value === "img2img" || value === "lora" || value === "controlnet";
}

export function isImageResolutionKey(value: string): value is ImageResolutionKey {
  return value === "512" || value === "768" || value === "1024" || value === "wide";
}

export function isImagePrecisionKey(value: string): value is ImagePrecisionKey {
  return value === "fp16" || value === "bf16";
}

export function isImageRuntimeKey(value: string): value is ImageRuntimeKey {
  return value === "diffusers" || value === "comfyui";
}

export function isImageBatchSize(value: number): value is ImageBatchSize {
  return value === 1 || value === 2 || value === 4;
}
