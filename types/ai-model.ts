import type { ContentStatus, DataConfidence, DataSource } from "./gpu";

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
}
