import { comparisonRepository } from "@/repositories/comparison.repository";
import { gpuRepository } from "@/repositories/gpu.repository";
import type { Comparison, Gpu } from "@/types";

export interface ComparisonVerdict {
  verdict: string | null;
  warning: string | null;
}

export interface ComparisonListItem {
  comparison: Comparison;
  gpuNames: string[];
  gpus: Gpu[];
  missingGpuSlugs: string[];
}

export interface ResolvedComparison {
  comparison: Comparison;
  gpus: Gpu[];
  missingGpuSlugs: string[];
}

function resolveComparedGpus(comparison: Comparison): { gpus: Gpu[]; missingGpuSlugs: string[] } {
  const gpus = comparison.gpuSlugs
    .map((gpuSlug) => gpuRepository.getGpuBySlug(gpuSlug))
    .filter((gpu): gpu is Gpu => Boolean(gpu));

  const foundGpuSlugs = new Set(gpus.map((gpu) => gpu.slug));
  const missingGpuSlugs = comparison.gpuSlugs.filter((gpuSlug) => !foundGpuSlugs.has(gpuSlug));

  return { gpus, missingGpuSlugs };
}

function getComparisonIntent(comparison: Comparison, gpus: Gpu[]): string {
  if (comparison.useCases.includes("local-llm")) {
    return "Local LLM planning";
  }

  if (comparison.useCases.includes("stable-diffusion")) {
    return "Image workflow planning";
  }

  if (gpus.some((gpu) => gpu.vramGb !== null && gpu.vramGb >= 24)) {
    return "High-VRAM local AI planning";
  }

  return "Source-aware GPU planning";
}

function getSourceBackedHint(gpu: Gpu): string {
  const details = [
    gpu.vramGb !== null ? `${gpu.vramGb} GB VRAM` : null,
    gpu.memoryType,
    gpu.memoryBandwidthGbps !== null && gpu.memoryBandwidthGbps !== undefined
      ? `${gpu.memoryBandwidthGbps} GB/s bandwidth`
      : null,
  ].filter(Boolean);

  return details.length > 0 ? details.join(" | ") : "Needs verification";
}

export const comparisonService = {
  getComparisonBySlug(slug: string): Comparison | null {
    return comparisonRepository.getComparisonBySlug(slug);
  },

  getAllComparisons(): Comparison[] {
    return comparisonRepository.getAllComparisons();
  },

  getComparisonStaticParams(): Array<{ slug: string }> {
    return comparisonRepository.getComparisonStaticParams();
  },

  getComparisonListItems(): ComparisonListItem[] {
    return comparisonRepository.getComparisonListItems().map((comparison) => {
      const { gpus, missingGpuSlugs } = resolveComparedGpus(comparison);
      const gpuNames = gpus.map((gpu) => gpu.name);
      const unresolvedNames = missingGpuSlugs.map((missingSlug) => missingSlug.replaceAll("-", " "));

      return {
        comparison,
        gpuNames: [...gpuNames, ...unresolvedNames],
        gpus,
        missingGpuSlugs,
      };
    });
  },

  getResolvedComparisonBySlug(slug: string): ResolvedComparison | null {
    const comparison = comparisonRepository.getComparisonBySlug(slug);
    if (!comparison) {
      return null;
    }

    const { gpus, missingGpuSlugs } = resolveComparedGpus(comparison);
    return { comparison, gpus, missingGpuSlugs };
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

  getComparisonsForGpuSlug(gpuSlug: string): ComparisonListItem[] {
    return comparisonRepository
      .getAllComparisons()
      .filter((comparison) => comparison.gpuSlugs.includes(gpuSlug))
      .map((comparison) => {
        const { gpus, missingGpuSlugs } = resolveComparedGpus(comparison);

        return {
          comparison,
          gpuNames: gpus.map((gpu) => gpu.name),
          gpus,
          missingGpuSlugs,
        };
      });
  },

  getComparisonIntent(comparison: Comparison, gpus: Gpu[]): string {
    return getComparisonIntent(comparison, gpus);
  },

  getGpuHint(gpu: Gpu): string {
    return getSourceBackedHint(gpu);
  },

};
