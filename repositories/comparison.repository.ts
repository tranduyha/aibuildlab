import comparisonData from "@/data/comparisons.json";
import type { Comparison } from "@/types";

const comparisons = comparisonData as Comparison[];

export function getAllComparisons(): Comparison[] {
  return [...comparisons];
}

export function getComparisonBySlug(slug: string): Comparison | null {
  return comparisons.find((comparison) => comparison.slug === slug) ?? null;
}

export function getPublishedComparisons(): Comparison[] {
  return comparisons.filter(
    (comparison) => comparison.status === "published" && !comparison.needsReview,
  );
}

export function getFeaturedComparisons(): Comparison[] {
  return comparisons.filter((comparison) => comparison.featured);
}

export const comparisonRepository = {
  getAllComparisons,
  getComparisonBySlug,
  getPublishedComparisons,
  getFeaturedComparisons,
};
