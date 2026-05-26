import { gpuRepository } from "@/repositories/gpu.repository";
import type { Gpu } from "@/types";

export interface ReviewedResult<T> {
  data: T;
  warning: string | null;
}

const REVIEW_WARNING =
  "Seed data only. Verify specifications and workload evidence before publishing recommendations.";

export const gpuService = {
  listGpusByMinimumVram(minimumVramGb: number): ReviewedResult<Gpu[]> {
    const data = gpuRepository
      .getAllGpus()
      .filter((gpu) => gpu.vramGb !== null && gpu.vramGb >= minimumVramGb);

    return { data, warning: REVIEW_WARNING };
  },

  listGpusByUseCase(useCase: string): ReviewedResult<Gpu[]> {
    return {
      data: gpuRepository.getGpusByUseCase(useCase),
      warning: REVIEW_WARNING,
    };
  },

  listLocalAiCandidates(): ReviewedResult<Gpu[]> {
    return {
      data: gpuRepository.getGpusByUseCase("local-llm"),
      warning: REVIEW_WARNING,
    };
  },
};
