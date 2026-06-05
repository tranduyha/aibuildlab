import { cloudGpuProviderRepository } from "@/repositories/cloud-gpu-provider.repository";
import type {
  CloudGpuDataConfidence,
  CloudGpuProvider,
  CloudGpuUseCase,
} from "@/types/cloud-gpu-provider";

export interface CloudGpuProviderListItem {
  provider: CloudGpuProvider;
  warnings: string[];
  dataConfidence: CloudGpuDataConfidence;
  pricingNotice: string;
}

export interface CloudGpuProviderDetail extends CloudGpuProviderListItem {
  provider: CloudGpuProvider;
}

const LOW_CONFIDENCE_WARNING =
  "Provider details are draft planning data and should be verified before use.";
const UNKNOWN_PRICING_NOTICE =
  "Pricing model should be verified from the provider before planning workloads.";
const EXACT_PRICING_NOTICE =
  "Exact pricing is not stored in this record. Check the official provider pricing page before cost planning.";
const REVIEW_WARNING =
  "Cloud GPU provider details should be verified against official provider pages before workload or cost planning.";

const buildIntentUseCaseMap: Array<{ tokens: string[]; useCases: CloudGpuUseCase[] }> = [
  {
    tokens: ["local-vs-cloud", "cloud decision", "cloud"],
    useCases: ["cloud_vs_local_validation", "gpu_workstation_alternative", "local_llm_testing"],
  },
  {
    tokens: ["image", "stable diffusion", "creator"],
    useCases: ["stable_diffusion", "serverless_inference", "batch_jobs"],
  },
  {
    tokens: ["high vram", "24gb", "workstation"],
    useCases: ["gpu_workstation_alternative", "local_llm_testing", "fine_tuning"],
  },
  {
    tokens: ["llm", "16gb", "starter"],
    useCases: ["local_llm_testing", "notebooks", "cloud_vs_local_validation"],
  },
];

function hasExactPricing(provider: CloudGpuProvider): boolean {
  return Boolean(provider.pricingNotes && provider.pricingNotes.trim().length > 0);
}

function createListItem(provider: CloudGpuProvider): CloudGpuProviderListItem {
  return {
    provider,
    warnings: getCloudGpuProviderWarnings(provider),
    dataConfidence: getCloudGpuProviderDataConfidence(provider),
    pricingNotice: getCloudGpuProviderPricingNotice(provider),
  };
}

function uniqueProviders(providers: CloudGpuProvider[]): CloudGpuProvider[] {
  const seen = new Set<string>();
  return providers.filter((provider) => {
    if (seen.has(provider.slug)) {
      return false;
    }

    seen.add(provider.slug);
    return true;
  });
}

function resolveUseCasesForBuildIntent(intent: string): CloudGpuUseCase[] {
  const normalizedIntent = intent.toLowerCase();
  const matched = buildIntentUseCaseMap
    .filter(({ tokens }) => tokens.some((token) => normalizedIntent.includes(token)))
    .flatMap(({ useCases }) => useCases);

  if (matched.length > 0) {
    return Array.from(new Set(matched));
  }

  return ["cloud_vs_local_validation", "local_llm_testing"];
}

export function getCloudGpuProviderWarnings(provider: CloudGpuProvider): string[] {
  const warnings = new Set<string>();

  if (provider.status === "draft" || provider.needsReview) {
    warnings.add(REVIEW_WARNING);
  }

  if (provider.dataConfidence === "low") {
    warnings.add(LOW_CONFIDENCE_WARNING);
  }

  if (provider.pricingModel === "unknown") {
    warnings.add(UNKNOWN_PRICING_NOTICE);
  }

  if (!hasExactPricing(provider)) {
    warnings.add(EXACT_PRICING_NOTICE);
  }

  return Array.from(warnings);
}

export function getCloudGpuProviderDataConfidence(
  provider: CloudGpuProvider,
): CloudGpuDataConfidence {
  return provider.dataConfidence;
}

export function getCloudGpuProviderPricingNotice(provider: CloudGpuProvider): string {
  if (provider.pricingModel === "unknown") {
    return UNKNOWN_PRICING_NOTICE;
  }

  if (!hasExactPricing(provider)) {
    return EXACT_PRICING_NOTICE;
  }

  return "Pricing notes are present, but official provider pricing should still be checked before cost planning.";
}

export function getCloudGpuProviderListItems(): CloudGpuProviderListItem[] {
  return cloudGpuProviderRepository.getAllCloudGpuProviders().map(createListItem);
}

export function getCloudGpuProviderDetail(slug: string): CloudGpuProviderDetail | null {
  const provider = cloudGpuProviderRepository.getCloudGpuProviderBySlug(slug);

  if (!provider) {
    return null;
  }

  return createListItem(provider);
}

export function getCloudGpuProvidersForUseCase(useCase: CloudGpuUseCase): CloudGpuProviderListItem[] {
  return cloudGpuProviderRepository.getCloudGpuProvidersByUseCase(useCase).map(createListItem);
}

export function getCloudGpuProvidersForBuildIntent(intent: string): CloudGpuProviderListItem[] {
  const useCases = resolveUseCasesForBuildIntent(intent);
  const providers = uniqueProviders(
    useCases.flatMap((useCase) => cloudGpuProviderRepository.getCloudGpuProvidersByUseCase(useCase)),
  );

  return providers.map(createListItem);
}

export const cloudGpuProviderService = {
  getCloudGpuProviderListItems,
  getCloudGpuProviderDetail,
  getCloudGpuProvidersForUseCase,
  getCloudGpuProviderWarnings,
  getCloudGpuProviderDataConfidence,
  getCloudGpuProviderPricingNotice,
  getCloudGpuProvidersForBuildIntent,
};
