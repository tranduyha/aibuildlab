import buildProfileData from "@/data/build-profiles.json";
import type { BuildProfile } from "@/types/build-profile";

function isString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringList(value: unknown): value is string[] {
  return Array.isArray(value) && value.every(isString);
}

function isProfileItem(value: unknown): value is BuildProfile["quickVerdicts"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<BuildProfile["quickVerdicts"][number]>;
  return isString(item.title) && isString(item.description);
}

function isDecisionRow(value: unknown): value is BuildProfile["decisionRows"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<BuildProfile["decisionRows"][number]>;
  return isString(item.signal) && isString(item.localPath) && isString(item.testFirstPath);
}

function isWorkloadRow(value: unknown): value is BuildProfile["workloadRows"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<BuildProfile["workloadRows"][number]>;
  return isString(item.workload) && isString(item.usefulWhen) && isString(item.riskSignal);
}

function isGpuPath(value: unknown): value is BuildProfile["gpuPaths"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<BuildProfile["gpuPaths"][number]>;
  return isString(item.slug) && isString(item.label) && isString(item.role) && isString(item.watchout);
}

function isNextRoute(value: unknown): value is BuildProfile["nextRoutes"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<BuildProfile["nextRoutes"][number]>;
  return isString(item.title) && isString(item.description) && isString(item.href) && isString(item.cta);
}

function isFaq(value: unknown): value is BuildProfile["faq"][number] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const item = value as Partial<BuildProfile["faq"][number]>;
  return isString(item.question) && isString(item.answer);
}

function isBuildProfile(value: unknown): value is BuildProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const profile = value as Partial<BuildProfile>;
  return (
    isString(profile.slug) &&
    isString(profile.intentSummary) &&
    isStringList(profile.decisionPrompts) &&
    Array.isArray(profile.quickVerdicts) &&
    profile.quickVerdicts.every(isProfileItem) &&
    Array.isArray(profile.decisionRows) &&
    profile.decisionRows.every(isDecisionRow) &&
    Array.isArray(profile.workloadRows) &&
    profile.workloadRows.every(isWorkloadRow) &&
    Array.isArray(profile.gpuPaths) &&
    profile.gpuPaths.every(isGpuPath) &&
    Array.isArray(profile.systemConstraints) &&
    profile.systemConstraints.every(isProfileItem) &&
    isStringList(profile.validationWorkflow) &&
    Array.isArray(profile.nextRoutes) &&
    profile.nextRoutes.every(isNextRoute) &&
    Array.isArray(profile.faq) &&
    profile.faq.every(isFaq)
  );
}

const rawBuildProfileData: unknown = buildProfileData;

const buildProfiles: BuildProfile[] = Array.isArray(rawBuildProfileData)
  ? rawBuildProfileData.filter(isBuildProfile)
  : [];

export function getAllBuildProfiles(): BuildProfile[] {
  return [...buildProfiles];
}

export function getBuildProfileBySlug(slug: string): BuildProfile | null {
  return buildProfiles.find((profile) => profile.slug === slug) ?? null;
}

export const buildProfileRepository = {
  getAllBuildProfiles,
  getBuildProfileBySlug,
};
