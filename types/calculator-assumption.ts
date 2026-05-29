import type { DataConfidence, DataSource } from "./gpu";

export type CalculatorModelType = "llm" | "image-diffusion";

export interface QuantizationProfile {
  key: string;
  label: string;
  bitsPerParameter: number;
  overheadMultiplier: number;
  confidence: DataConfidence;
  notes: string;
}

export interface ContextPresetProfile {
  key: string;
  label: string;
  contextTokens: number;
  contextOverheadGb: number;
  notes: string;
}

export interface RuntimeProfile {
  key: string;
  label: string;
  runtimeOverheadGb: number;
  confidence: DataConfidence;
  notes: string;
}

export interface CalculatorAssumption {
  version: string;
  status: "draft" | "published" | "reviewed";
  dataConfidence: DataConfidence;
  needsReview: boolean;
  lastReviewedAt: string;
  purpose: string;
  supportedModelTypes: CalculatorModelType[];
  llmEstimatePolicy: {
    description: string;
    formula: string;
    warning: string;
  };
  quantizationProfiles: QuantizationProfile[];
  contextPresets: ContextPresetProfile[];
  runtimeProfiles: RuntimeProfile[];
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
