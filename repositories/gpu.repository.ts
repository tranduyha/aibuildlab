import gpuData from "@/data/gpus.json";
import type { Gpu } from "@/types";

const gpus = gpuData as Gpu[];

export function getAllGpus(): Gpu[] {
  return [...gpus];
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
