import type { ContentStatus, DataConfidence, DataSource } from "./gpu";

export interface Guide {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  useCases: string[];
  relatedGpuSlugs: string[];
  relatedToolPaths: string[];
  status: ContentStatus;
  needsReview: boolean;
  dataConfidence: DataConfidence;
  sources: DataSource[];
  lastVerifiedAt: string | null;
  notes?: string;
}
