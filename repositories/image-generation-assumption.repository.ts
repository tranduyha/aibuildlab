import imageGenerationAssumptionData from "@/data/image-generation-assumptions.json";
import type { ImageGenerationAssumption } from "@/types";

const assumptions = imageGenerationAssumptionData as ImageGenerationAssumption;

export const imageGenerationAssumptionRepository = {
  getAssumptions(): ImageGenerationAssumption {
    return assumptions;
  },
};
