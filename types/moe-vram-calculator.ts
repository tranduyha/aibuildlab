import type { DataConfidence, DataSource } from "./gpu";
import type { ContextPreset, Quantization, RuntimeKey, VramGpuMatch } from "./vram-calculator";

export interface MoeQuantizationProfile {
  key: Quantization;
  label: string;
  bitsPerParameter: number;
  weightOverheadMultiplier: number;
  confidence: DataConfidence;
  notes: string;
}

export interface MoeContextPresetProfile {
  key: ContextPreset;
  label: string;
  contextTokens: number;
  contextOverheadGb: number;
  moeContextMultiplier: number;
  notes: string;
}

export interface MoeRuntimeProfile {
  key: RuntimeKey;
  label: string;
  runtimeOverheadGb: number;
  moeRuntimeMultiplier: number;
  confidence: DataConfidence;
  notes: string;
}

export interface MoeCalculatorAssumption {
  version: string;
  status: "draft" | "published" | "reviewed";
  dataConfidence: DataConfidence;
  needsReview: boolean;
  lastReviewedAt: string;
  purpose: string;
  moeEstimatePolicy: {
    description: string;
    formula: string;
    warning: string;
    residentWeightPolicy: string;
  };
  quantizationProfiles: MoeQuantizationProfile[];
  contextPresets: MoeContextPresetProfile[];
  runtimeProfiles: MoeRuntimeProfile[];
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

export interface MoeModelOption {
  slug: string;
  name: string;
  family: string;
  totalParameterCountB: number;
  activeParameterCountB: number;
  packagedParameterCountB: number | null;
  expertCount: number | null;
  routedExpertCount: number | null;
  sharedExpertCount: number | null;
  activeExpertCount: number | null;
  contextLengthTokens: number | null;
  architectureNotes: string | null;
  dataConfidence: DataConfidence;
  needsReview: boolean;
}

export interface MoeVramCalculatorInput {
  modelSlug: string;
  quantization: Quantization;
  contextPreset: ContextPreset;
  runtime: RuntimeKey;
  safetyMarginPercent: number;
}

export interface MoeAssumptionsUsed {
  modelLabel: string;
  totalParameterCountB: number;
  activeParameterCountB: number;
  packagedParameterCountB: number | null;
  residentParameterCountB: number;
  residentParameterSource: "total-parameters" | "packaged-parameters";
  quantizationLabel: string;
  quantizationBits: number;
  weightOverheadMultiplier: number;
  weightMemoryGb: number;
  contextLabel: string;
  contextTokens: number;
  contextOverheadGb: number;
  moeContextMultiplier: number;
  runtimeLabel: string;
  runtimeOverheadGb: number;
  moeRuntimeMultiplier: number;
  safetyMarginPercent: number;
}

export interface MoeEstimateResult extends MoeVramCalculatorInput {
  estimatedVramGb: number;
  recommendedMinimumVramGb: number;
  gpuTier: string;
  assumptionVersion: string;
  confidence: DataConfidence;
  warning: string;
  warnings: string[];
  notes: string[];
  needsReview: boolean;
  assumptionsUsed: MoeAssumptionsUsed;
  sourceBackedGpuMatches: VramGpuMatch[];
  planningGpuCandidates: VramGpuMatch[];
}
