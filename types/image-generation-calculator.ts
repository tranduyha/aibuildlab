import type { DataConfidence, DataSource } from "./gpu";
import type { VramGpuMatch } from "./vram-calculator";

export type ImageWorkflowKey = "text-to-image" | "img2img" | "lora" | "controlnet";
export type ImageResolutionKey = "512" | "768" | "1024" | "wide";
export type ImagePrecisionKey = "fp16" | "bf16";
export type ImageRuntimeKey = "diffusers" | "comfyui";
export type ImageBatchSize = 1 | 2 | 4;

export interface ImageGenerationModelProfile {
  modelSlug: string;
  label: string;
  baseVramGb: number;
  notes: string;
}

export interface ImageGenerationProfile<Key extends string = string> {
  key: Key;
  label: string;
  overheadGb: number;
  notes: string;
}

export interface ImageGenerationPrecisionProfile {
  key: ImagePrecisionKey;
  label: string;
  multiplier: number;
  notes: string;
}

export interface ImageGenerationBatchProfile {
  batchSize: ImageBatchSize;
  overheadGb: number;
  notes: string;
}

export interface ImageGenerationAssumption {
  version: string;
  status: "draft" | "published" | "reviewed";
  dataConfidence: DataConfidence;
  needsReview: boolean;
  lastReviewedAt: string;
  purpose: string;
  modelProfiles: ImageGenerationModelProfile[];
  workflowProfiles: ImageGenerationProfile<ImageWorkflowKey>[];
  resolutionProfiles: ImageGenerationProfile<ImageResolutionKey>[];
  precisionProfiles: ImageGenerationPrecisionProfile[];
  runtimeProfiles: ImageGenerationProfile<ImageRuntimeKey>[];
  batchProfiles: ImageGenerationBatchProfile[];
  safetyMarginDefaultPercent: number;
  gpuSuggestionPolicy: {
    minHeadroomPercent: number;
    preferDataConfidence: DataConfidence[];
    allowDraftGpuCandidates: boolean;
    draftGpuLabel: string;
  };
  sources: DataSource[];
  notes: string;
}

export interface ImageGenerationModelOption {
  slug: string;
  name: string;
  family: string;
  baseVramGb: number;
  dataConfidence: DataConfidence;
  needsReview: boolean;
}

export interface ImageGenerationCalculatorInput {
  modelSlug: string;
  workflow: ImageWorkflowKey;
  resolution: ImageResolutionKey;
  precision: ImagePrecisionKey;
  runtime: ImageRuntimeKey;
  batchSize: ImageBatchSize;
  safetyMarginPercent: number;
}

export interface ImageGenerationAssumptionsUsed {
  modelLabel: string;
  modelBaseVramGb: number;
  workflowLabel: string;
  workflowOverheadGb: number;
  resolutionLabel: string;
  resolutionOverheadGb: number;
  precisionLabel: string;
  precisionMultiplier: number;
  runtimeLabel: string;
  runtimeOverheadGb: number;
  batchSize: ImageBatchSize;
  batchOverheadGb: number;
  safetyMarginPercent: number;
}

export interface ImageGenerationEstimateResult extends ImageGenerationCalculatorInput {
  estimatedVramGb: number;
  recommendedMinimumVramGb: number;
  gpuTier: string;
  assumptionVersion: string;
  confidence: DataConfidence;
  warning: string;
  warnings: string[];
  notes: string[];
  needsReview: boolean;
  assumptionsUsed: ImageGenerationAssumptionsUsed;
  sourceBackedGpuMatches: VramGpuMatch[];
  planningGpuCandidates: VramGpuMatch[];
}
