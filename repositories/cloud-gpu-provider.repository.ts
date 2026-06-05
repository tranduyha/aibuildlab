import cloudGpuProviderData from "@/data/cloud-gpu-providers.json";
import type {
  CloudGpuAffiliateStatus,
  CloudGpuProvider,
  CloudGpuProviderSource,
  CloudGpuProviderStatus,
  CloudGpuProviderType,
  CloudGpuUseCase,
} from "@/types/cloud-gpu-provider";

const providerStatuses: CloudGpuProviderStatus[] = ["draft", "reviewed", "published", "archived"];
const affiliateStatuses: CloudGpuAffiliateStatus[] = [
  "unknown",
  "unavailable",
  "available_unverified",
  "available_verified",
  "referral_verified",
  "not_applicable",
];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSource(value: unknown): value is CloudGpuProviderSource {
  if (!value || typeof value !== "object") {
    return false;
  }

  const source = value as Partial<CloudGpuProviderSource>;
  return (
    typeof source.name === "string" &&
    typeof source.url === "string" &&
    typeof source.type === "string" &&
    isStringArray(source.fields) &&
    typeof source.accessedAt === "string"
  );
}

function isAffiliateConfig(value: unknown): value is CloudGpuProvider["affiliate"] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const affiliate = value as Partial<CloudGpuProvider["affiliate"]>;
  return typeof affiliate.url === "string" || affiliate.url === null;
}

function isCloudGpuProvider(value: unknown): value is CloudGpuProvider {
  if (!value || typeof value !== "object") {
    return false;
  }

  const provider = value as Partial<CloudGpuProvider>;
  return (
    typeof provider.id === "string" &&
    typeof provider.slug === "string" &&
    typeof provider.name === "string" &&
    typeof provider.shortDescription === "string" &&
    typeof provider.seoTitle === "string" &&
    typeof provider.seoDescription === "string" &&
    typeof provider.officialWebsiteUrl === "string" &&
    typeof provider.providerType === "string" &&
    isStringArray(provider.useCases) &&
    typeof provider.pricingModel === "string" &&
    (typeof provider.pricingNotes === "string" || provider.pricingNotes === null) &&
    typeof provider.affiliateStatus === "string" &&
    (typeof provider.affiliateProgramUrl === "string" || provider.affiliateProgramUrl === null) &&
    isAffiliateConfig(provider.affiliate) &&
    (typeof provider.commissionNotes === "string" || provider.commissionNotes === null) &&
    typeof provider.status === "string" &&
    providerStatuses.includes(provider.status as CloudGpuProviderStatus) &&
    typeof provider.needsReview === "boolean" &&
    typeof provider.dataConfidence === "string" &&
    Array.isArray(provider.sources) &&
    provider.sources.every(isSource) &&
    (typeof provider.lastVerifiedAt === "string" || provider.lastVerifiedAt === null) &&
    (typeof provider.notes === "string" || provider.notes === null) &&
    isStringArray(provider.unsafeToPublishFields) &&
    affiliateStatuses.includes(provider.affiliateStatus as CloudGpuAffiliateStatus)
  );
}

const rawCloudGpuProviderData: unknown = cloudGpuProviderData;

const cloudGpuProviders: CloudGpuProvider[] = Array.isArray(rawCloudGpuProviderData)
  ? rawCloudGpuProviderData.filter(isCloudGpuProvider)
  : [];

export function getAllCloudGpuProviders(): CloudGpuProvider[] {
  return [...cloudGpuProviders];
}

export function getCloudGpuProviderBySlug(slug: string): CloudGpuProvider | null {
  return cloudGpuProviders.find((provider) => provider.slug === slug) ?? null;
}

export function getCloudGpuProviderSlugs(): string[] {
  return cloudGpuProviders.map((provider) => provider.slug);
}

export function getCloudGpuProvidersByUseCase(useCase: CloudGpuUseCase): CloudGpuProvider[] {
  return cloudGpuProviders.filter((provider) => provider.useCases.includes(useCase));
}

export function getCloudGpuProvidersByType(providerType: CloudGpuProviderType): CloudGpuProvider[] {
  return cloudGpuProviders.filter((provider) => provider.providerType === providerType);
}

export function getCloudGpuProvidersByAffiliateStatus(
  affiliateStatus: CloudGpuAffiliateStatus,
): CloudGpuProvider[] {
  return cloudGpuProviders.filter((provider) => provider.affiliateStatus === affiliateStatus);
}

export function getDraftCloudGpuProviders(): CloudGpuProvider[] {
  return cloudGpuProviders.filter((provider) => provider.status === "draft");
}

export function getReviewedCloudGpuProviders(): CloudGpuProvider[] {
  return cloudGpuProviders.filter((provider) => provider.status === "reviewed");
}

export function getPublishedCloudGpuProviders(): CloudGpuProvider[] {
  return cloudGpuProviders.filter((provider) => provider.status === "published" && !provider.needsReview);
}

export const cloudGpuProviderRepository = {
  getAllCloudGpuProviders,
  getCloudGpuProviderBySlug,
  getCloudGpuProviderSlugs,
  getCloudGpuProvidersByUseCase,
  getCloudGpuProvidersByType,
  getCloudGpuProvidersByAffiliateStatus,
  getDraftCloudGpuProviders,
  getReviewedCloudGpuProviders,
  getPublishedCloudGpuProviders,
};
