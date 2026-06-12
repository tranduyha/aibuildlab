import gpuData from "@/data/gpus.json";
import type { Gpu } from "@/types";

const gpus = gpuData as Gpu[];

function getReviewScore(gpu: Gpu): number {
  if ((gpu.status === "published" || gpu.status === "reviewed") && !gpu.needsReview) {
    return 2;
  }
  if (!gpu.needsReview && gpu.dataConfidence === "medium") {
    return 1;
  }
  return 0;
}

function getVerifiedAtTimestamp(gpu: Gpu): number {
  if (!gpu.lastVerifiedAt) return 0;

  const timestamp = Date.parse(gpu.lastVerifiedAt);
  return Number.isNaN(timestamp) ? 0 : timestamp;
}

function sortByReviewAndRecency(a: Gpu, b: Gpu): number {
  const reviewDifference = getReviewScore(b) - getReviewScore(a);
  if (reviewDifference !== 0) return reviewDifference;

  const recencyDifference = getVerifiedAtTimestamp(b) - getVerifiedAtTimestamp(a);
  if (recencyDifference !== 0) return recencyDifference;

  return 0;
}

export function getAllGpus(): Gpu[] {
  return [...gpus].sort(sortByReviewAndRecency);
}

export function getGpuBySlug(slug: string): Gpu | null {
  return gpus.find((gpu) => gpu.slug === slug) ?? null;
}

export function getPublishedGpus(): Gpu[] {
  return getAllGpus().filter((gpu) => gpu.status === "published" && !gpu.needsReview);
}

export function getFeaturedGpus(): Gpu[] {
  return getAllGpus().filter((gpu) => gpu.featured);
}

export function getGpusByUseCase(useCase: string): Gpu[] {
  return getAllGpus().filter((gpu) => gpu.useCases.includes(useCase));
}

export const gpuRepository = {
  getAllGpus,
  getGpuBySlug,
  getPublishedGpus,
  getFeaturedGpus,
  getGpusByUseCase,
};
