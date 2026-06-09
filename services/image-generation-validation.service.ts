import { imageGenerationValidationRepository } from "@/repositories/image-generation-validation.repository";
import { calculateImageGenerationVram } from "@/services/image-generation-calculator.service";
import type {
  ImageGenerationCalculatorInput,
  ImageGenerationValidationComparison,
  ImageGenerationValidationSample,
} from "@/types";

function toInput(sample: ImageGenerationValidationSample): ImageGenerationCalculatorInput {
  return {
    modelSlug: sample.modelSlug,
    runtime: sample.runtime,
    workflow: sample.workflow,
    resolution: sample.resolution,
    batchSize: sample.batchSize,
    precision: sample.precision,
    safetyMarginPercent: 20,
  };
}

function compareSample(sample: ImageGenerationValidationSample): ImageGenerationValidationComparison {
  const currentEstimateGb = calculateImageGenerationVram(toInput(sample)).estimatedVramGb;

  if (sample.observedPeakVramGb === null) {
    return {
      sample,
      currentEstimateGb,
      observedPeakVramGb: null,
      absoluteDeltaGb: null,
      percentDelta: null,
      status: sample.status,
    };
  }

  const absoluteDeltaGb = Number((currentEstimateGb - sample.observedPeakVramGb).toFixed(1));
  const percentDelta = Number(((absoluteDeltaGb / sample.observedPeakVramGb) * 100).toFixed(1));

  return {
    sample,
    currentEstimateGb,
    observedPeakVramGb: sample.observedPeakVramGb,
    absoluteDeltaGb,
    percentDelta,
    status: sample.status,
  };
}

export const imageGenerationValidationService = {
  getAllSamples(): ImageGenerationValidationSample[] {
    return imageGenerationValidationRepository.getAllSamples();
  },

  getValidatedSamples(): ImageGenerationValidationSample[] {
    return imageGenerationValidationRepository.getValidatedSamples();
  },

  compareAllSamples(): ImageGenerationValidationComparison[] {
    return imageGenerationValidationRepository.getAllSamples().map(compareSample);
  },

  compareSamplesByModelSlug(modelSlug: string): ImageGenerationValidationComparison[] {
    return imageGenerationValidationRepository.getSamplesByModelSlug(modelSlug).map(compareSample);
  },
};
