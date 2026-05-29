import gpuData from "@/data/gpus.json";
import type { Gpu } from "@/types";

const gpus = gpuData as Gpu[];

export function getAllGpus(): Gpu[] {
  return [...gpus].sort((a, b) => {
    const score = (gpu: Gpu) => {
      if ((gpu.status === "published" || gpu.status === "reviewed") && !gpu.needsReview) {
        return 2;
      }
      if (!gpu.needsReview && gpu.dataConfidence === "medium") {
        return 1;
      }
      return 0;
    };

    return score(b) - score(a);
  });
}

export function getGpuBySlug(slug: string): Gpu | null {
  return gpus.find((gpu) => gpu.slug === slug) ?? null;
}

export function getPublishedGpus(): Gpu[] {
  return gpus.filter((gpu) => gpu.status === "published" && !gpu.needsReview);
}

export function getFeaturedGpus(): Gpu[] {
  return gpus.filter((gpu) => gpu.featured);
}

export function getGpusByUseCase(useCase: string): Gpu[] {
  return gpus.filter((gpu) => gpu.useCases.includes(useCase));
}

export const gpuRepository = {
  getAllGpus,
  getGpuBySlug,
  getPublishedGpus,
  getFeaturedGpus,
  getGpusByUseCase,
};
