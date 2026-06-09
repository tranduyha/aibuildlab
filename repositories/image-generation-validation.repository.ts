import validationData from "@/data/image-generation-validation-samples.json";
import type { ImageGenerationValidationSample } from "@/types";

const samples = validationData as ImageGenerationValidationSample[];

export const imageGenerationValidationRepository = {
  getAllSamples(): ImageGenerationValidationSample[] {
    return [...samples];
  },

  getSamplesByModelSlug(modelSlug: string): ImageGenerationValidationSample[] {
    return samples.filter((sample) => sample.modelSlug === modelSlug);
  },

  getValidatedSamples(): ImageGenerationValidationSample[] {
    return samples.filter(
      (sample) => sample.status === "validated" && sample.observedPeakVramGb !== null,
    );
  },
};
