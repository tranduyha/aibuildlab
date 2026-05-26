import type { ContentStatus, DataConfidence, DataSource } from "./gpu";

export interface Comparison {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  useCases: string[];
  gpuSlugs: string[];
  featured: boolean;
  verdict: string | null;
  benchmarkSummary: string | null;
  status: ContentStatus;
  needsReview: boolean;
  dataConfidence: DataConfidence;
  sources: DataSource[];
  lastVerifiedAt: string | null;
  notes?: string;
}
