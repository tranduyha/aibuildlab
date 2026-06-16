import { cloudGpuProviderProfileRepository } from "@/repositories/cloud-gpu-provider-profile.repository";
import type { CloudGpuProvider } from "@/types/cloud-gpu-provider";
import type { CloudGpuProviderProfile } from "@/types/cloud-gpu-provider-profile";

function createFallbackProfile(provider: CloudGpuProvider): CloudGpuProviderProfile {
  return {
    slug: provider.slug,
    decisionSummary: `${provider.name} has provider data but still needs a dedicated editorial profile. Use the facts and source trail as a planning checkpoint, then verify official provider pages before workload or cost planning.`,
    bestFitScenarios: [
      {
        title: "Source-backed provider review",
        description: "Use the current provider type, use cases, and source trail to decide whether the provider deserves deeper research.",
      },
      {
        title: "Workload fit check",
        description: "Compare the listed use cases with your intended local AI, image, deployment, or validation workflow.",
      },
      {
        title: "Official-page verification",
        description: "Confirm current pricing, capacity, availability, and terms before relying on this provider for real work.",
      },
    ],
    watchouts: [
      {
        title: "Editorial profile pending",
        description: "This fallback content is intentionally conservative until a provider-specific profile is added in the data layer.",
      },
      {
        title: "Dynamic provider details",
        description: "Pricing, inventory, availability, and terms can change quickly and are not inferred from the static record.",
      },
      {
        title: "No ranking signal",
        description: "The fallback profile does not rank or recommend this provider over nearby options.",
      },
    ],
    sourceConfirmedFacts: [
      "The provider type, use cases, pricing model category, and source trail come from the production provider record.",
      "Exact current pricing, availability, inventory, and commission claims are not published unless source-backed.",
      "The page should be treated as a planning reference until a dedicated editorial profile is added.",
    ],
    unresolvedQuestions: [
      "Which current provider products, regions, and GPU resources match your workload?",
      "What billing, usage, and acceptable-use terms apply to your exact plan?",
      "Does the provider workflow fit your runtime, storage, and data movement needs?",
    ],
    nearbyAlternatives: [],
    faq: [
      {
        question: `Why is the ${provider.name} profile conservative?`,
        answer: "The provider has production data, but a dedicated editorial profile has not been added yet. The page therefore sticks to source-backed facts and verification steps.",
      },
      {
        question: `Does this page recommend ${provider.name}?`,
        answer: "No. It is a planning reference and source trail, not a provider ranking or buying recommendation.",
      },
      {
        question: `What should I verify before using ${provider.name}?`,
        answer: "Check official pricing, capacity, availability, billing scope, terms, and whether the provider supports your exact workload.",
      },
    ],
  };
}

export function getCloudGpuProviderProfile(provider: CloudGpuProvider): CloudGpuProviderProfile {
  return cloudGpuProviderProfileRepository.getCloudGpuProviderProfileBySlug(provider.slug) ?? createFallbackProfile(provider);
}

export const cloudGpuProviderProfileService = {
  getCloudGpuProviderProfile,
};
