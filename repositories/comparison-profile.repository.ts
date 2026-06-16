import comparisonProfileData from "@/data/comparison-profiles.json";
import type { ComparisonProfile } from "@/types/comparison-profile";

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isProfileItem(value: unknown): value is ComparisonProfile["whyThisPairMatters"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<ComparisonProfile["whyThisPairMatters"][number]>;
  return isString(item.title) && isString(item.description);
}

function isProfileLink(value: unknown): value is ComparisonProfile["nearbyComparisons"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<ComparisonProfile["nearbyComparisons"][number]>;
  return isString(item.slug) && isString(item.label) && isString(item.reason);
}

function isProfileFaq(value: unknown): value is ComparisonProfile["faq"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<ComparisonProfile["faq"][number]>;
  return isString(item.question) && isString(item.answer);
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isComparisonProfile(value: unknown): value is ComparisonProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const profile = value as Partial<ComparisonProfile>;
  return (
    isString(profile.slug) &&
    isString(profile.decisionSummary) &&
    Array.isArray(profile.whyThisPairMatters) &&
    profile.whyThisPairMatters.every(isProfileItem) &&
    Array.isArray(profile.bestFitQuestions) &&
    profile.bestFitQuestions.every(isProfileItem) &&
    Array.isArray(profile.watchouts) &&
    profile.watchouts.every(isProfileItem) &&
    isStringList(profile.sourceBackedDifferences) &&
    isStringList(profile.unresolvedQuestions) &&
    Array.isArray(profile.nearbyComparisons) &&
    profile.nearbyComparisons.every(isProfileLink) &&
    Array.isArray(profile.faq) &&
    profile.faq.every(isProfileFaq)
  );
}

const rawComparisonProfileData: unknown = comparisonProfileData;

const comparisonProfiles: ComparisonProfile[] = Array.isArray(rawComparisonProfileData)
  ? rawComparisonProfileData.filter(isComparisonProfile)
  : [];

export function getAllComparisonProfiles(): ComparisonProfile[] {
  return [...comparisonProfiles];
}

export function getComparisonProfileBySlug(slug: string): ComparisonProfile | null {
  return comparisonProfiles.find((profile) => profile.slug === slug) ?? null;
}

export const comparisonProfileRepository = {
  getAllComparisonProfiles,
  getComparisonProfileBySlug,
};
