import aiModelData from "@/data/ai-models.json";
import type { AiModel } from "@/types";

const aiModels = aiModelData as AiModel[];

export function getAllAiModels(): AiModel[] {
  return [...aiModels];
}

export function getAiModelBySlug(slug: string): AiModel | null {
  return aiModels.find((model) => model.slug === slug) ?? null;
}

export function getPublishedAiModels(): AiModel[] {
  return aiModels.filter((model) => model.status === "published" && !model.needsReview);
}

export function getPublishedAiModelBySlug(slug: string): AiModel | null {
  return getPublishedAiModels().find((model) => model.slug === slug) ?? null;
}

export function getAiModelsByUseCase(useCase: string): AiModel[] {
  return aiModels.filter((model) => model.useCases.includes(useCase));
}

export const aiModelRepository = {
  getAllAiModels,
  getAiModelBySlug,
  getPublishedAiModelBySlug,
  getPublishedAiModels,
  getAiModelsByUseCase,
};
