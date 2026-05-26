import { aiModelRepository } from "@/repositories/ai-model.repository";
import type { AiModel } from "@/types";

export interface AiModelResult {
  model: AiModel | null;
  warning: string | null;
}

export const aiModelService = {
  getModelBySlug(slug: string): AiModelResult {
    const model = aiModelRepository.getAiModelBySlug(slug);
    const warning =
      model?.vramEstimateGb === null
        ? "VRAM estimate has not been verified for this model and runtime."
        : null;

    return { model, warning };
  },

  groupModelsByUseCase(): Record<string, AiModel[]> {
    return aiModelRepository.getAllAiModels().reduce<Record<string, AiModel[]>>(
      (groups, model) => {
        model.useCases.forEach((useCase) => {
          groups[useCase] = [...(groups[useCase] ?? []), model];
        });
        return groups;
      },
      {},
    );
  },

  listModelsByUseCase(useCase: string): AiModel[] {
    return aiModelRepository.getAiModelsByUseCase(useCase);
  },
};
