import buildData from "@/data/builds.json";
import type { Build } from "@/types";

const builds = buildData as Build[];

export function getAllBuilds(): Build[] {
  return [...builds];
}

export function getBuildBySlug(slug: string): Build | null {
  return builds.find((build) => build.slug === slug) ?? null;
}

export function getPublishedBuilds(): Build[] {
  return builds.filter((build) => build.status === "published" && !build.needsReview);
}

export function getBuildsByUseCase(useCase: string): Build[] {
  return builds.filter((build) => build.useCases.includes(useCase));
}

export function getBuildsByBudgetRange(minBudget: number, maxBudget: number): Build[] {
  return builds.filter(
    (build) =>
      build.budgetMinUsd !== null &&
      build.budgetMaxUsd !== null &&
      build.budgetMinUsd >= minBudget &&
      build.budgetMaxUsd <= maxBudget,
  );
}

export const buildRepository = {
  getAllBuilds,
  getBuildBySlug,
  getPublishedBuilds,
  getBuildsByUseCase,
  getBuildsByBudgetRange,
};
