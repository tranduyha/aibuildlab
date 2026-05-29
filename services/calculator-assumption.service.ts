import { aiModelRepository } from "@/repositories/ai-model.repository";
import { calculatorAssumptionRepository } from "@/repositories/calculator-assumption.repository";
import type { CalculatorModelOption } from "@/types";

function parseModelSizeBillion(name: string): number | null {
  const match = name.match(/(\d+(?:\.\d+)?)\s*B/i);
  return match ? Number(match[1]) : null;
}

function resolveGroup(model: { calculatorGroup?: string | null; modality?: string | null }): CalculatorModelOption["group"] {
  if (model.calculatorGroup === "llm" || model.calculatorGroup === "image-diffusion") {
    return model.calculatorGroup;
  }

  if (model.modality?.includes("image")) {
    return "image-diffusion";
  }

  if (model.modality?.includes("text")) {
    return "llm";
  }

  return "other";
}

export const calculatorAssumptionService = {
  getAssumptions() {
    return calculatorAssumptionRepository.getAssumptions();
  },

  getValidationSamples() {
    return calculatorAssumptionRepository.getValidationSamples();
  },

  getModelOptions(): CalculatorModelOption[] {
    return aiModelRepository.getAllAiModels().map((model) => ({
      slug: model.slug,
      name: model.name,
      modelSizeBillion:
        model.defaultCalculatorProfile?.modelSizeB ??
        model.parameterCountB ??
        parseModelSizeBillion(model.name),
      status: model.status,
      needsReview: model.needsReview,
      dataConfidence: model.dataConfidence,
      group: resolveGroup(model),
      family: model.family ?? model.modelFamily ?? "Other",
      calculatorEligible: model.calculatorEligible !== false,
    }));
  },
};
