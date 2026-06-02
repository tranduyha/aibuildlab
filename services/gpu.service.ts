import { gpuRepository } from "@/repositories/gpu.repository";
import type { Gpu } from "@/types";

export interface ReviewedResult<T> {
  data: T;
  warning: string | null;
}

const REVIEW_WARNING =
  "Planning data only. Verify specifications and workload evidence before publishing recommendations.";

function getGpuReviewWarning(gpu: Gpu): string | null {
  if (gpu.status === "draft" || gpu.needsReview || gpu.dataConfidence === "low") {
    return REVIEW_WARNING;
  }

  return null;
}

export const gpuService = {
  listAllGpus(): ReviewedResult<Gpu[]> {
    return {
      data: gpuRepository.getAllGpus(),
      warning: REVIEW_WARNING,
    };
  },

  getGpuProfileBySlug(slug: string): ReviewedResult<Gpu | null> {
    const gpu = gpuRepository.getGpuBySlug(slug);
    return {
      data: gpu,
      warning: gpu ? getGpuReviewWarning(gpu) : null,
    };
  },

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
