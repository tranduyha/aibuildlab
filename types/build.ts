import type { ContentStatus, DataConfidence, DataSource } from "./gpu";

export interface Build {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[];
  useCases: string[];
  intent: string;
  targetUseCase: string;
  vramTier: string;
  suggestedGpuClass: string;
  suggestedGpuSlugs: string[];
  relatedComparisonSlugs: string[];
  checklistFocus: string[];
  uniqueFaq: {
    question: string;
    answer: string;
  };
  budgetMinUsd: number | null;
  budgetMaxUsd: number | null;
  recommendedGpuSlugs: string[];
  components: null;
  status: ContentStatus;
  needsReview: boolean;
  dataConfidence: DataConfidence;
  sources: DataSource[];
  lastVerifiedAt: string | null;
  notes?: string;
}
