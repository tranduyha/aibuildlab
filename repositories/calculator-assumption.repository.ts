import assumptionData from "@/data/calculator-assumptions.json";
import validationData from "@/data/calculator-validation.json";
import type { CalculatorAssumption } from "@/types/calculator-assumption";
import type { CalculatorValidationSample } from "@/types/calculator-validation";

const assumptions = assumptionData as CalculatorAssumption;
const validations = validationData as CalculatorValidationSample[];

export const calculatorAssumptionRepository = {
  getAssumptions(): CalculatorAssumption {
    return assumptions;
  },

  getValidationSamples(): CalculatorValidationSample[] {
    return [...validations];
  },
};
