export type ModelSizeBillion = number;
export type Quantization = "fp16" | "int8" | "int4";
export type ContextPreset = "basic" | "medium" | "large";
export type RuntimeKey = "llama-cpp" | "ollama" | "vllm" | "transformers";
export type CalculatorModelGroup = "llm" | "image-diffusion" | "other";

export interface VramCalculatorInput {
  modelSlug: string;
  modelSizeBillion: ModelSizeBillion;
  quantization: Quantization;
  contextPreset: ContextPreset;
  runtime: RuntimeKey;
  safetyMarginPercent: number;
}

export interface VramAssumptionsUsed {
  quantizationLabel: string;
  quantizationBits: number;
  overheadMultiplier: number;
  contextLabel: string;
  contextTokens: number;
  contextOverheadGb: number;
  runtimeLabel: string;
  runtimeOverheadGb: number;
  safetyMarginPercent: number;
}

export interface VramGpuMatch {
  slug: string;
  name: string;
  vramGb: number | null;
  status: "published" | "reviewed" | "draft";
  dataConfidence: "low" | "medium" | "high";
  needsReview: boolean;
  note: string;
  isSourceBacked: boolean;
}

export interface CalculatorModelOption {
  slug: string;
  name: string;
  modelSizeBillion: number | null;
  status: "draft" | "published" | "reviewed";
  needsReview: boolean;
  dataConfidence: "low" | "medium" | "high";
  group: CalculatorModelGroup;
  family: string;
  calculatorEligible: boolean;
}

export interface VramEstimateResult extends VramCalculatorInput {
  estimatedVramGb: number;
  recommendedMinimumVramGb: number;
  assumptionVersion: string;
  confidence: "low" | "medium" | "high";
  warning: string;
  warnings: string[];
  notes: string[];
  needsReview: boolean;
  assumptionsUsed: VramAssumptionsUsed;
  sourceBackedGpuMatches: VramGpuMatch[];
  planningGpuCandidates: VramGpuMatch[];
}

export interface VramRecommendation {
  gpuTier: string;
  summary: string;
  warning: string;
}
