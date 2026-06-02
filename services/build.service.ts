import { buildRepository } from "@/repositories/build.repository";
import { comparisonRepository } from "@/repositories/comparison.repository";
import { gpuRepository } from "@/repositories/gpu.repository";
import type { Build, Comparison, Gpu } from "@/types";

export interface BuildResult {
  data: Build[];
  warning: string | null;
}

export interface BuildListItem {
  build: Build;
  gpus: Gpu[];
  comparisons: Comparison[];
  missingGpuSlugs: string[];
  missingComparisonSlugs: string[];
}

export interface ResolvedBuild extends BuildListItem {
  build: Build;
}

const BUILD_WARNING =
  "Build pages are planning routes only. Verify VRAM needs, exact GPU variants, component compatibility, power, cooling, runtime support, and benchmark evidence before buying parts.";

function resolveBuild(build: Build): BuildListItem {
  const gpuSlugs = build.suggestedGpuSlugs.length > 0 ? build.suggestedGpuSlugs : build.recommendedGpuSlugs;
  const gpus = gpuSlugs
    .map((gpuSlug) => gpuRepository.getGpuBySlug(gpuSlug))
    .filter((gpu): gpu is Gpu => Boolean(gpu));
  const foundGpuSlugs = new Set(gpus.map((gpu) => gpu.slug));

  const comparisons = build.relatedComparisonSlugs
    .map((comparisonSlug) => comparisonRepository.getComparisonBySlug(comparisonSlug))
    .filter((comparison): comparison is Comparison => Boolean(comparison));
  const foundComparisonSlugs = new Set(comparisons.map((comparison) => comparison.slug));

  return {
    build,
    gpus,
    comparisons,
    missingGpuSlugs: gpuSlugs.filter((gpuSlug) => !foundGpuSlugs.has(gpuSlug)),
    missingComparisonSlugs: build.relatedComparisonSlugs.filter(
      (comparisonSlug) => !foundComparisonSlugs.has(comparisonSlug),
    ),
  };
}

export const buildService = {
  listAllBuilds(): BuildResult {
    return {
      data: buildRepository.getAllBuilds(),
      warning: BUILD_WARNING,
    };
  },

  getBuildListItems(): BuildListItem[] {
    return buildRepository.getAllBuilds().map(resolveBuild);
  },

  getBuildStaticParams(): Array<{ slug: string }> {
    return buildRepository.getBuildStaticParams();
  },

  listBuildsByUseCase(useCase: string): BuildResult {
    return {
      data: buildRepository.getBuildsByUseCase(useCase),
      warning: BUILD_WARNING,
    };
  },

  listBuildsByBudget(minBudget: number, maxBudget: number): BuildResult {
    return {
      data: buildRepository.getBuildsByBudgetRange(minBudget, maxBudget),
      warning: BUILD_WARNING,
    };
  },

  getBuildBySlug(slug: string): Build | null {
    return buildRepository.getBuildBySlug(slug);
  },

  getResolvedBuildBySlug(slug: string): ResolvedBuild | null {
    const build = buildRepository.getBuildBySlug(slug);
    if (!build) {
      return null;
    }

    return resolveBuild(build);
  },

  getBuildWarning(): string {
    return BUILD_WARNING;
  },
};
