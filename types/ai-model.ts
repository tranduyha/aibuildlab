import type { ContentStatus, DataConfidence, DataSource } from "./gpu";

export type CalculatorModelGroup = "llm" | "image-diffusion" | "moe" | "other";

export interface AiModel {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  useCases: string[];
  modelFamily: string | null;
  parameterCount: string | null;
  contextLength: number | null;
  modality: string | null;
  license: string | null;
  officialRuntime: string | null;
  quantizationFormats: string[] | null;
  vramEstimateGb: number | null;
  benchmark: null;
  status: ContentStatus;
  needsReview: boolean;
  dataConfidence: DataConfidence;
  sources: DataSource[];
  lastVerifiedAt: string | null;
  notes?: string;

  developer?: string | null;
  family?: string | null;
  parameterCountB?: number | null;
  contextLengthTokens?: number | null;
  calculatorEligible?: boolean;
  calculatorGroup?: CalculatorModelGroup;
  totalParameterCountB?: number | null;
  activeParameterCountB?: number | null;
  packagedParameterCountB?: number | null;
  expertCount?: number | null;
  routedExpertCount?: number | null;
  sharedExpertCount?: number | null;
  activeExpertCount?: number | null;
  moeArchitectureNotes?: string | null;
  moeCalculatorEligible?: boolean;
  defaultCalculatorProfile?: {
    modelSizeB?: number;
    modelType?: CalculatorModelGroup;
    profileKey?: string;
  } | null;
}
