import { comparisonRepository } from "@/repositories/comparison.repository";
import type { Comparison } from "@/types";

export interface ComparisonVerdict {
  verdict: string | null;
  warning: string | null;
}

export const comparisonService = {
  getComparisonBySlug(slug: string): Comparison | null {
    return comparisonRepository.getComparisonBySlug(slug);
  },

  getRelatedComparisons(slug: string): Comparison[] {
    const current = comparisonRepository.getComparisonBySlug(slug);
    if (!current) {
      return [];
    }

    return comparisonRepository
      .getAllComparisons()
      .filter(
        (comparison) =>
          comparison.slug !== current.slug &&
          comparison.useCases.some((useCase) => current.useCases.includes(useCase)),
      );
  },

  getBasicVerdict(slug: string): ComparisonVerdict {
    const comparison = comparisonRepository.getComparisonBySlug(slug);
    if (!comparison) {
      return { verdict: null, warning: "Comparison record not found." };
    }

    if (!comparison.verdict || comparison.needsReview) {
      return {
        verdict: comparison.verdict,
        warning: "No source-backed verdict is available until this comparison is verified.",
      };
    }

    return { verdict: comparison.verdict, warning: null };
  },
};
