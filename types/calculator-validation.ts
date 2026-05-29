export interface CalculatorValidationSample {
  id: string;
  modelSlug: string;
  modelType: string;
  quantization: string;
  contextPreset: string;
  runtime: string;
  estimatedVramGb: number | null;
  observedVramGb: number | null;
  status: "estimate-only" | "validated";
  source: {
    name: string;
    url: string;
    type: string;
    fields: string[];
    accessedAt: string;
  } | null;
  notes: string;
}
