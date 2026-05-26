export type ModelSizeBillion = 7 | 8 | 13 | 32 | 70;
export type Quantization = "fp16" | "int8" | "int4";
export type ContextPreset = "short" | "medium" | "long";

export interface VramCalculatorInput {
  modelSizeBillion: ModelSizeBillion;
  quantization: Quantization;
  contextPreset: ContextPreset;
  safetyMarginPercent: number;
}

export interface VramEstimateResult extends VramCalculatorInput {
  estimatedVramGb: number;
  recommendedMinimumVramGb: number;
  warning: string;
  confidence: "low";
  needsReview: true;
  notes: string[];
}

export interface VramRecommendation {
  gpuTier: string;
  summary: string;
  warning: string;
}
