export type ContentStatus = "draft" | "published";
export type DataConfidence = "low" | "medium" | "high";

export interface DataSource {
  name: string;
  url: string;
  type:
    | "official"
    | "manufacturer"
    | "database"
    | "benchmark"
    | "model-card"
    | "documentation"
    | "paper"
    | "affiliate-api"
    | "marketplace-api"
    | "manual-check";
  fields: string[];
  accessedAt: string;
}

export interface Gpu {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  useCases: string[];
  featured: boolean;
  vendor: string;
  vramGb: number | null;
  memoryType: string | null;
  memoryBusBit: number | null;
  cudaCores: number | null;
  streamProcessors: number | null;
  computeUnits: number | null;
  tgpWatts: number | null;
  tbpWatts: number | null;
  architecture: string | null;
  launchYear: number | null;
  aiTops: number | null;
  benchmark: null;
  tokensPerSecond: number | null;
  status: ContentStatus;
  needsReview: boolean;
  dataConfidence: DataConfidence;
  sources: DataSource[];
  lastVerifiedAt: string | null;
  notes?: string;
}
