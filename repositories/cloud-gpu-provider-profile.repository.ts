import cloudGpuProviderProfileData from "@/data/cloud-gpu-provider-profiles.json";
import type { CloudGpuProviderProfile } from "@/types/cloud-gpu-provider-profile";

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isScenario(value: unknown): value is CloudGpuProviderProfile["bestFitScenarios"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const scenario = value as Partial<CloudGpuProviderProfile["bestFitScenarios"][number]>;
  return isString(scenario.title) && isString(scenario.description);
}

function isAlternative(value: unknown): value is CloudGpuProviderProfile["nearbyAlternatives"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const alternative = value as Partial<CloudGpuProviderProfile["nearbyAlternatives"][number]>;
  return isString(alternative.slug) && isString(alternative.label) && isString(alternative.reason);
}

function isFaq(value: unknown): value is CloudGpuProviderProfile["faq"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const faq = value as Partial<CloudGpuProviderProfile["faq"][number]>;
  return isString(faq.question) && isString(faq.answer);
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isCloudGpuProviderProfile(value: unknown): value is CloudGpuProviderProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const profile = value as Partial<CloudGpuProviderProfile>;
  return (
    isString(profile.slug) &&
    isString(profile.decisionSummary) &&
    Array.isArray(profile.bestFitScenarios) &&
    profile.bestFitScenarios.every(isScenario) &&
    Array.isArray(profile.watchouts) &&
    profile.watchouts.every(isScenario) &&
    isStringList(profile.sourceConfirmedFacts) &&
    isStringList(profile.unresolvedQuestions) &&
    Array.isArray(profile.nearbyAlternatives) &&
    profile.nearbyAlternatives.every(isAlternative) &&
    Array.isArray(profile.faq) &&
    profile.faq.every(isFaq)
  );
}

const rawCloudGpuProviderProfileData: unknown = cloudGpuProviderProfileData;

const cloudGpuProviderProfiles: CloudGpuProviderProfile[] = Array.isArray(rawCloudGpuProviderProfileData)
  ? rawCloudGpuProviderProfileData.filter(isCloudGpuProviderProfile)
  : [];

export function getAllCloudGpuProviderProfiles(): CloudGpuProviderProfile[] {
  return [...cloudGpuProviderProfiles];
}

export function getCloudGpuProviderProfileBySlug(slug: string): CloudGpuProviderProfile | null {
  return cloudGpuProviderProfiles.find((profile) => profile.slug === slug) ?? null;
}

export const cloudGpuProviderProfileRepository = {
  getAllCloudGpuProviderProfiles,
  getCloudGpuProviderProfileBySlug,
};
