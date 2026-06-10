import moeAssumptionData from "@/data/moe-calculator-assumptions.json";
import type { MoeCalculatorAssumption } from "@/types";

const assumptions = moeAssumptionData as MoeCalculatorAssumption;

export const moeCalculatorAssumptionRepository = {
  getAssumptions(): MoeCalculatorAssumption {
    return assumptions;
  },
};
