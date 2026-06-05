import type { AffiliateLinkConfig } from "./affiliate";

export type CloudGpuProviderType =
  | "cloud_gpu_marketplace"
  | "cloud_gpu_provider"
  | "cloud_compute_provider"
  | "serverless_gpu"
  | "ai_inference_platform"
  | "unknown";

export type CloudGpuUseCase =
  | "local_llm_testing"
  | "stable_diffusion"
  | "fine_tuning"
  | "batch_jobs"
  | "serverless_inference"
  | "notebooks"
  | "gpu_workstation_alternative"
  | "model_deployment"
  | "cloud_vs_local_validation";

export type CloudGpuPricingModel =
  | "hourly"
  | "per_second"
  | "usage_based"
  | "subscription"
  | "credits"
  | "custom"
  | "unknown";

export type CloudGpuAffiliateStatus =
  | "unknown"
  | "unavailable"
  | "available_unverified"
  | "available_verified"
  | "referral_verified"
  | "not_applicable";

export type CloudGpuProviderStatus = "draft" | "reviewed" | "published" | "archived";

export type CloudGpuDataConfidence = "low" | "medium" | "high";

export type CloudGpuProviderSourceType =
  | "official"
  | "documentation"
  | "pricing"
  | "affiliate"
  | "referral"
  | "terms"
  | "manual-check";

export interface CloudGpuProviderSource {
  name: string;
  url: string;
  type: CloudGpuProviderSourceType;
  fields: string[];
  accessedAt: string;
  notes?: string;
}

export interface CloudGpuProvider {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  officialWebsiteUrl: string;
  providerType: CloudGpuProviderType;
  useCases: CloudGpuUseCase[];
  pricingModel: CloudGpuPricingModel;
  pricingNotes: string | null;
  affiliateStatus: CloudGpuAffiliateStatus;
  affiliateProgramUrl: string | null;
  affiliate: AffiliateLinkConfig;
  commissionNotes: string | null;
  status: CloudGpuProviderStatus;
  needsReview: boolean;
  dataConfidence: CloudGpuDataConfidence;
  sources: CloudGpuProviderSource[];
  lastVerifiedAt: string | null;
  notes: string | null;
  unsafeToPublishFields: string[];
}
