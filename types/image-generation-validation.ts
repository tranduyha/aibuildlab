import type {
  ImageBatchSize,
  ImagePrecisionKey,
  ImageResolutionKey,
  ImageRuntimeKey,
  ImageWorkflowKey,
} from "./image-generation-calculator";

export type ImageGenerationValidationStatus = "needs-source" | "estimate-only" | "validated";

export interface ImageGenerationValidationSource {
  name: string;
  url: string;
  type: string;
  fields: string[];
  accessedAt: string;
}

export interface ImageGenerationValidationSample {
  id: string;
  modelSlug: string;
  runtime: ImageRuntimeKey;
  workflow: ImageWorkflowKey;
  resolution: ImageResolutionKey;
  batchSize: ImageBatchSize;
  precision: ImagePrecisionKey;
  gpuSlug: string | null;
  estimatedVramGb: number | null;
  observedPeakVramGb: number | null;
  absoluteDeltaGb: number | null;
  percentDelta: number | null;
  status: ImageGenerationValidationStatus;
  source: ImageGenerationValidationSource | null;
  notes: string;
}

export interface ImageGenerationValidationComparison {
  sample: ImageGenerationValidationSample;
  currentEstimateGb: number;
  observedPeakVramGb: number | null;
  absoluteDeltaGb: number | null;
  percentDelta: number | null;
  status: ImageGenerationValidationStatus;
}
