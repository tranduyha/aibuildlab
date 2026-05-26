import { buildRepository } from "@/repositories/build.repository";
import type { Build } from "@/types";

export interface BuildResult {
  data: Build[];
  warning: string | null;
}

const PRICE_WARNING =
  "Seed builds do not include verified component pricing or workload recommendations.";

export const buildService = {
  listBuildsByUseCase(useCase: string): BuildResult {
    return {
      data: buildRepository.getBuildsByUseCase(useCase),
      warning: PRICE_WARNING,
    };
  },

  listBuildsByBudget(minBudget: number, maxBudget: number): BuildResult {
    return {
      data: buildRepository.getBuildsByBudgetRange(minBudget, maxBudget),
      warning: PRICE_WARNING,
    };
  },

  getBuildBySlug(slug: string): Build | null {
    return buildRepository.getBuildBySlug(slug);
  },
};
