import { gpuRepository } from "@/repositories/gpu.repository";
import type { Gpu } from "@/types";

export interface ReviewedResult<T> {
  data: T;
  warning: string | null;
}

const REVIEW_WARNING =
  "Planning data only. Verify specifications and workload evidence before publishing guidance.";

function getGpuReviewWarning(gpu: Gpu): string | null {
  if (gpu.status === "draft" || gpu.needsReview || gpu.dataConfidence === "low") {
    return REVIEW_WARNING;
  }

  return null;
}

function getCatalogFamilyScore(gpu: Gpu): number {
  if (gpu.vendor === "NVIDIA" && /^RTX 50/.test(gpu.name)) return 500;
  if (gpu.vendor === "NVIDIA" && /^RTX 40/.test(gpu.name)) return 400;
  if (gpu.vendor === "NVIDIA" && /^RTX 30/.test(gpu.name)) return 300;
  if (gpu.vendor === "AMD") return 200;
  if (gpu.vendor === "Intel") return 100;
  return 0;
}

function getCatalogModelScore(gpu: Gpu): number {
  const modelNumber = Number(gpu.name.match(/\b(\d{4})\b/)?.[1] ?? 0);
  const variantScore =
    (/\bTi\b/i.test(gpu.name) ? 30 : 0) +
    (/\bSuper\b/i.test(gpu.name) ? 10 : 0);

  return modelNumber * 100 + variantScore;
}

function sortForGpuCatalog(gpus: Gpu[]): Gpu[] {
  return [...gpus].sort((a, b) => {
    const familyDifference = getCatalogFamilyScore(b) - getCatalogFamilyScore(a);
    if (familyDifference !== 0) return familyDifference;

    const modelDifference = getCatalogModelScore(b) - getCatalogModelScore(a);
    if (modelDifference !== 0) return modelDifference;

    return a.name.localeCompare(b.name);
  });
}

export const gpuService = {
  listAllGpus(): ReviewedResult<Gpu[]> {
    return {
      data: sortForGpuCatalog(gpuRepository.getAllGpus()),
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
