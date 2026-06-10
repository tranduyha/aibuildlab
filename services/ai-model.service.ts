import { aiModelRepository } from "@/repositories/ai-model.repository";
import { calculateEstimatedVram } from "@/services/vram-calculator.service";
import type { AiModel, Quantization, VramEstimateResult } from "@/types";

export interface AiModelResult {
  model: AiModel | null;
  warning: string | null;
}

export interface ModelVramEstimateRow {
  quantization: Quantization;
  label: string;
  estimatedVramGb: number;
  recommendedMinimumVramGb: number;
  gpuTier: string;
  result: VramEstimateResult;
}

export interface ModelVramPage {
  model: AiModel;
  path: string;
  estimates: ModelVramEstimateRow[];
  warning: string;
  planningSummary: string;
  contextNote: string;
  sourceConfirmations: { label: string; body: string }[];
  differentiators: { label: string; body: string }[];
  tierDecisions: { tier: string; verdict: string; nextStep: string }[];
  validationSteps: { label: string; title: string; body: string }[];
  comparisonNote: string;
  workloadFits: { workload: string; fit: string; caution: string }[];
  estimateDrivers: { factor: string; impact: string }[];
  beginnerAnswer: string;
  fitNotes: { title: string; body: string }[];
  faqItems: { question: string; answer: string }[];
}

const MODEL_VRAM_PAGE_SLUGS = [
  "llama-3-1-8b-instruct",
  "qwen2-5-7b-instruct",
  "mistral-7b-instruct-v0-3",
] as const;

type ModelVramPageSlug = (typeof MODEL_VRAM_PAGE_SLUGS)[number];

interface ModelVramEditorialProfile {
  planningSummary: string;
  contextNote: string;
  differentiators: { label: string; body: string }[];
  tierDecisions: { tier: string; verdict: string; nextStep: string }[];
  validationSteps: { label: string; title: string; body: string }[];
  comparisonNote: string;
  workloadFits: { workload: string; fit: string; caution: string }[];
  estimateDrivers: { factor: string; impact: string }[];
  beginnerAnswer: string;
  fitNotes: { title: string; body: string }[];
  faqItems: { question: string; answer: string }[];
}

const MODEL_VRAM_EDITORIAL_PROFILES: Record<ModelVramPageSlug, ModelVramEditorialProfile> = {
  "llama-3-1-8b-instruct": {
    planningSummary:
      "Llama 3.1 8B Instruct is a source-backed 8B dense text model with long-context metadata. Treat the long context as a capability to plan around, not as a reason to ignore KV cache and runtime overhead.",
    contextNote:
      "The 128K context metadata is source-backed, but the default estimate uses the calculator's medium context preset so the page remains conservative and comparable across this first batch.",
    differentiators: [
      {
        label: "Higher 8B planning boundary",
        body:
          "It lands above the 7B pages in the default estimate, so the 8GB tier should be treated as more constrained even before long-context use is considered.",
      },
      {
        label: "Long-context caveat is central",
        body:
          "The source-backed 128K context is useful metadata, but this page deliberately separates that capability from the medium-context VRAM baseline.",
      },
      {
        label: "Best used as the 8B reference page",
        body:
          "In this first batch it acts as the 8B comparison point against compact 7B alternatives rather than a generic Llama-family placeholder.",
      },
    ],
    tierDecisions: [
      {
        tier: "8 GB VRAM",
        verdict: "Borderline for the default 4-bit planning estimate.",
        nextStep:
          "Use a smaller context preset, verify the exact quantized file and runtime, and keep cloud testing in mind if the setup is close to the limit.",
      },
      {
        tier: "12 GB VRAM",
        verdict: "Reasonable first local testing tier for the default 4-bit estimate.",
        nextStep:
          "Validate prompt length, KV cache growth, and runtime overhead before treating long-context work as locally comfortable.",
      },
      {
        tier: "16 GB VRAM",
        verdict: "More comfortable for 4-bit and a better buffer for experimentation.",
        nextStep:
          "Use the calculator to test larger context assumptions before moving toward heavier runtimes or serving scenarios.",
      },
    ],
    validationSteps: [
      {
        label: "Quantize",
        title: "Start with the exact quantized artifact",
        body:
          "Do not assume every 4-bit package has identical memory behavior. Record the quantization format and runtime before comparing GPU tiers.",
      },
      {
        label: "Context",
        title: "Re-test with realistic prompt length",
        body:
          "Llama 3.1 supports long-context planning, so the main risk is underestimating KV cache and runtime memory when prompts grow.",
      },
      {
        label: "Runtime",
        title: "Validate the local runtime path",
        body:
          "Check llama.cpp, Ollama, vLLM, or Transformers separately because runtime allocation and offload behavior can change the local fit.",
      },
      {
        label: "GPU tier",
        title: "Compare against source-backed GPU profiles",
        body:
          "Use GPU links as research references after the estimate, then verify the exact card, driver, and workload before buying hardware.",
      },
    ],
    comparisonNote:
      "Compared with the 7B pages, Llama 3.1 8B sits slightly higher in the default estimate and carries a stronger long-context planning caveat.",
    workloadFits: [
      {
        workload: "Casual local chat and prompt testing",
        fit: "Good 4-bit planning target on a 12GB or 16GB card.",
        caution: "8GB can be tight once runtime overhead and context growth are included.",
      },
      {
        workload: "Coding assistant experiments",
        fit: "Reasonable for local evaluation when prompts stay moderate.",
        caution: "Long files, retrieval context, or multi-turn sessions should be tested with larger context assumptions.",
      },
      {
        workload: "Long-context research",
        fit: "Possible only after deliberate context planning.",
        caution: "Do not treat the source-backed 128K context as a default local-memory target.",
      },
    ],
    estimateDrivers: [
      {
        factor: "Quantization",
        impact: "The biggest page-level lever: 4-bit is the practical local baseline, while 8-bit and FP16/BF16 move into higher VRAM tiers.",
      },
      {
        factor: "Context length",
        impact: "The main Llama-specific risk because long prompts increase KV cache memory beyond the medium-context baseline.",
      },
      {
        factor: "Runtime and offload",
        impact: "llama.cpp, Ollama, vLLM, and Transformers can allocate memory differently, so local smoke testing still matters.",
      },
    ],
    beginnerAnswer:
      "If you are choosing a first local GPU for Llama 3.1 8B, treat 12GB as the safer first testing tier for 4-bit use and 16GB as the more comfortable experimentation tier. Treat 8GB as a constraint to validate, not a comfortable target.",
    fitNotes: [
      {
        title: "Good first local LLM planning target",
        body:
          "An 8B dense model is a practical starting point for local LLM experiments, especially when you want a calculator page that keeps source-backed model identity separate from runtime-specific performance.",
      },
      {
        title: "Long-context caution",
        body:
          "The model card supports long-context planning, but very long prompts can move memory use beyond the medium-context estimate. Re-run the calculator with larger context assumptions before hardware decisions.",
      },
    ],
    faqItems: [
      {
        question: "Can Llama 3.1 8B run on 8GB VRAM?",
        answer:
          "The default 4-bit planning estimate is close to an 8GB boundary, so treat 8GB as borderline rather than comfortable. Use smaller context assumptions and validate the exact quantized runtime.",
      },
      {
        question: "Is 12GB VRAM enough for Llama 3.1 8B?",
        answer:
          "For the default 4-bit planning estimate, 12GB is a more reasonable first testing tier. Longer context, serving runtimes, or different quantization can still require more headroom.",
      },
      {
        question: "Why does this page use medium context for Llama 3.1 8B?",
        answer:
          "The model has source-backed long-context metadata, but this first page uses the calculator's medium context preset to keep the baseline comparable. Increase context in the calculator when your workload needs it.",
      },
      {
        question: "Is Llama 3.1 8B a dense LLM for calculator purposes?",
        answer:
          "Yes. It is handled as a dense text LLM in the current calculator path, unlike MoE, embedding, or image-generation records.",
      },
    ],
  },
  "qwen2-5-7b-instruct": {
    planningSummary:
      "Qwen2.5 7B Instruct is a source-backed 7B dense text model with Apache 2.0 licensing in the current data. Use it as a compact local LLM planning target, then validate runtime behavior.",
    contextNote:
      "Qwen2.5 context metadata is tracked from official/model-card sources, but this page still uses a medium-context baseline so the VRAM estimate stays comparable with other 7B/8B pages.",
    differentiators: [
      {
        label: "Compact Qwen-family planning target",
        body:
          "This page is the Qwen 7B reference in the first batch, useful for users comparing permissive licensing and compact local testing against Mistral and Llama options.",
      },
      {
        label: "8GB possible, 12GB saner",
        body:
          "The default 4-bit estimate rounds into the 8GB tier, but the page emphasizes 12GB as the more practical starting point because the buffer is narrow.",
      },
      {
        label: "Context metadata should not drive hardware alone",
        body:
          "Qwen2.5 has high-context metadata in the data record, but the page keeps the calculator baseline separate from high-context local deployment assumptions.",
      },
    ],
    tierDecisions: [
      {
        tier: "8 GB VRAM",
        verdict: "Possible planning tier for the default 4-bit estimate, but tight.",
        nextStep:
          "Keep context modest and validate the exact runtime before assuming an 8GB card is enough for repeated work.",
      },
      {
        tier: "12 GB VRAM",
        verdict: "More practical local testing tier for 4-bit planning.",
        nextStep:
          "Use the extra headroom to test prompt length, system overhead, and runtime differences before comparing GPUs.",
      },
      {
        tier: "16 GB VRAM",
        verdict: "Comfortable planning tier for 4-bit and useful for broader experimentation.",
        nextStep:
          "Test 8-bit or larger-context assumptions in the calculator if you want to use the card beyond compact 4-bit runs.",
      },
    ],
    validationSteps: [
      {
        label: "Artifact",
        title: "Match the Qwen model variant",
        body:
          "Confirm that the local file or runtime package maps to Qwen2.5 7B Instruct before using this page as the planning baseline.",
      },
      {
        label: "Context",
        title: "Check context against actual prompts",
        body:
          "The page uses a medium-context baseline. Longer Qwen2.5 sessions can increase memory pressure through KV cache behavior.",
      },
      {
        label: "Runtime",
        title: "Run a short local smoke test",
        body:
          "Use the same runtime, quantization, and context target you intend to keep. The page does not replace measured local behavior.",
      },
      {
        label: "Compare",
        title: "Compare against nearby 7B/8B pages",
        body:
          "Use Mistral 7B and Llama 3.1 8B pages to understand how a small parameter difference changes the planning tier.",
      },
    ],
    comparisonNote:
      "Qwen2.5 7B and Mistral 7B share the same default memory estimate in this calculator profile, while Llama 3.1 8B lands slightly higher because of its 8B size class.",
    workloadFits: [
      {
        workload: "Compact local assistant",
        fit: "Strong fit for 4-bit testing because the default estimate rounds into the 8GB tier.",
        caution: "Repeated work is more comfortable with 12GB because runtime overhead can consume the narrow 8GB buffer.",
      },
      {
        workload: "Structured prompting and light coding",
        fit: "Good candidate for comparing 7B-class behavior across local runtimes.",
        caution: "Validate tokenizer, prompt length, and context behavior before assuming it matches another 7B model exactly.",
      },
      {
        workload: "Longer Qwen context experiments",
        fit: "Use the calculator to test larger context assumptions before choosing hardware.",
        caution: "The source-backed context metadata should not be read as a promise that high-context local use fits the default estimate.",
      },
    ],
    estimateDrivers: [
      {
        factor: "Quantization",
        impact: "4-bit keeps the page in compact local planning territory; 8-bit raises the planning tier even for a 7B model.",
      },
      {
        factor: "Context length",
        impact: "Qwen2.5 has high-context metadata, but actual memory pressure depends on the context you really use.",
      },
      {
        factor: "Runtime package",
        impact: "Different Qwen files and local runtimes can vary, so match the exact artifact before comparing against GPU pages.",
      },
    ],
    beginnerAnswer:
      "For Qwen2.5 7B, 8GB is a possible 4-bit testing tier, but 12GB is the more practical starting point if you want fewer memory-edge surprises. Use 16GB if you expect larger context tests or broader runtime experiments.",
    fitNotes: [
      {
        title: "Compact Qwen planning route",
        body:
          "This page is useful when comparing a 7B Qwen-family model against nearby 7B and 8B local LLM options without turning the result into a benchmark claim.",
      },
      {
        title: "License and source checks",
        body:
          "The current record includes Apache 2.0 license metadata and field-level sources. Keep using those source links before expanding stronger deployment guidance.",
      },
    ],
    faqItems: [
      {
        question: "Can Qwen2.5 7B run on 8GB VRAM?",
        answer:
          "The default 4-bit planning estimate rounds to an 8GB minimum, so 8GB is possible but tight. Keep context modest and validate your exact runtime before relying on it.",
      },
      {
        question: "Is 12GB VRAM enough for Qwen2.5 7B?",
        answer:
          "For the default 4-bit planning profile, 12GB gives more practical headroom than 8GB. It still is not a benchmark guarantee.",
      },
      {
        question: "Why compare Qwen2.5 7B with 8B-class pages?",
        answer:
          "The calculator estimates by source-backed parameter size and runtime assumptions. A 7B model usually sits near the same planning tier as smaller 8B dense models, but exact runtime behavior still needs validation.",
      },
      {
        question: "Does this page claim Qwen2.5 7B speed?",
        answer:
          "No. It only estimates planning VRAM from calculator assumptions and source-backed model metadata. Speed claims need benchmark sources and test context.",
      },
    ],
  },
  "mistral-7b-instruct-v0-3": {
    planningSummary:
      "Mistral 7B Instruct v0.3 is a source-backed 7B dense text model with Apache 2.0 licensing in the current data. It is a useful baseline for local LLM planning and comparison against other 7B-class models.",
    contextNote:
      "The current record includes source-backed 32K context metadata. The default estimate still uses medium context so users can compare the first model-page batch on the same assumption set.",
    differentiators: [
      {
        label: "Clean 7B baseline",
        body:
          "This page is the non-Llama, non-Qwen 7B baseline in the batch, so it helps users separate size-class memory planning from model-family preference.",
      },
      {
        label: "Lower context caveat than the long-context pages",
        body:
          "The 32K context metadata still matters for KV cache planning, but it is a different risk profile from the 128K-class records in the batch.",
      },
      {
        label: "Variant-specific guardrail",
        body:
          "The page is scoped to Mistral 7B Instruct v0.3 and avoids generalizing the estimate to other Mistral releases or quality comparisons.",
      },
    ],
    tierDecisions: [
      {
        tier: "8 GB VRAM",
        verdict: "Possible for the default 4-bit planning estimate, but with little buffer.",
        nextStep:
          "Validate the exact quantized runtime and avoid treating 8GB as comfortable for long sessions or additional overhead.",
      },
      {
        tier: "12 GB VRAM",
        verdict: "Practical first local testing tier for 4-bit planning.",
        nextStep:
          "Use the extra headroom to test context growth and runtime overhead before narrowing hardware choices.",
      },
      {
        tier: "16 GB VRAM",
        verdict: "Comfortable for 4-bit planning and useful for broader runtime experiments.",
        nextStep:
          "Use the calculator to compare 8-bit or larger-context assumptions if the workflow may grow.",
      },
    ],
    validationSteps: [
      {
        label: "Variant",
        title: "Confirm v0.3 model identity",
        body:
          "Use this page for Mistral 7B Instruct v0.3 specifically. Other Mistral variants may have different context, tokenizer, or runtime behavior.",
      },
      {
        label: "Quant",
        title: "Choose the quantization target",
        body:
          "The default 4-bit estimate is a starting point. 8-bit and FP16/BF16 profiles move into higher planning tiers.",
      },
      {
        label: "Context",
        title: "Test context before long conversations",
        body:
          "The current data includes 32K context metadata, but memory still depends on the actual context used and runtime implementation.",
      },
      {
        label: "Route",
        title: "Compare with cloud or local testing",
        body:
          "If the estimate is close to a local card limit, use cloud GPU testing or a smaller context test before local hardware decisions.",
      },
    ],
    comparisonNote:
      "Mistral 7B Instruct v0.3 is the clean 7B baseline in this batch: it compares closely with Qwen2.5 7B and slightly below Llama 3.1 8B in the default estimate.",
    workloadFits: [
      {
        workload: "Baseline 7B local testing",
        fit: "Good reference model for understanding how a standard dense 7B profile maps to local VRAM tiers.",
        caution: "Do not use this page to infer quality or speed against Qwen or Llama.",
      },
      {
        workload: "Short chat and instruction-following tests",
        fit: "Practical 4-bit testing target, especially on 12GB or 16GB cards.",
        caution: "8GB can work as a tight test tier but leaves little room for context growth and runtime overhead.",
      },
      {
        workload: "Runtime comparison",
        fit: "Useful for checking how one 7B model behaves across llama.cpp, Ollama, or Transformers-style paths.",
        caution: "Keep the quantization file and context length fixed when comparing local results.",
      },
    ],
    estimateDrivers: [
      {
        factor: "Quantization",
        impact: "The difference between 4-bit, 8-bit, and FP16/BF16 is larger than the difference between nearby 7B model families.",
      },
      {
        factor: "Context length",
        impact: "The source-backed 32K context metadata still needs workload-specific testing because KV cache growth can change fit.",
      },
      {
        factor: "Runtime overhead",
        impact: "A close 8GB fit can fail if the runtime, driver, or offload path adds more overhead than expected.",
      },
    ],
    beginnerAnswer:
      "For Mistral 7B Instruct v0.3, use 12GB as the practical first local testing tier for 4-bit work. 8GB is possible but tight, while 16GB gives a better buffer for comparing runtimes and context settings.",
    fitNotes: [
      {
        title: "7B baseline for local experiments",
        body:
          "Mistral 7B Instruct v0.3 gives the batch a non-Llama, non-Qwen reference point for local dense LLM planning without adding MoE complexity.",
      },
      {
        title: "Runtime-specific validation still matters",
        body:
          "Model metadata is source-backed, but deployment characteristics depend on the exact runtime, quantization format, context length, and offload behavior.",
      },
    ],
    faqItems: [
      {
        question: "Can Mistral 7B Instruct v0.3 run on 8GB VRAM?",
        answer:
          "The default 4-bit planning estimate rounds to an 8GB minimum, so 8GB is a tight test tier. Validate the exact quantized runtime and context before relying on it.",
      },
      {
        question: "Is 12GB VRAM enough for Mistral 7B Instruct v0.3?",
        answer:
          "For the default 4-bit planning profile, 12GB is a more practical local testing tier. Larger context or different quantization can still require more memory.",
      },
      {
        question: "Why include Mistral 7B Instruct v0.3 in the first batch?",
        answer:
          "It is a source-backed dense 7B text model with clear local planning intent, so it broadens the first batch beyond one model family without needing a new calculator formula.",
      },
      {
        question: "Can this page compare Mistral 7B to Qwen or Llama quality?",
        answer:
          "No. This page focuses on memory planning. Model quality comparisons would need separate evaluation sources and methodology.",
      },
    ],
  },
};

const QUANTIZATION_LABELS: Record<Quantization, string> = {
  fp16: "FP16/BF16 planning",
  int8: "8-bit planning",
  int4: "4-bit planning",
};

const SOURCE_FIELD_LABELS: Record<string, string> = {
  parameterCountB: "Parameter size",
  contextLengthTokens: "Context length",
  license: "License",
  modelFamily: "Model family",
  developer: "Developer",
  calculatorEligible: "Calculator eligibility",
};

function getSourceNamesForField(model: AiModel, field: string): string {
  const sourceNames = Array.from(
    new Set(
      model.sources
        .filter((source) => source.fields.includes(field))
        .map((source) => source.name),
    ),
  );

  return sourceNames.length > 0 ? sourceNames.join(", ") : "the attached source list";
}

function buildSourceConfirmations(model: AiModel): { label: string; body: string }[] {
  const sourceFields = new Set(model.sources.flatMap((source) => source.fields));
  const confirmations: { label: string; body: string }[] = [];

  if (sourceFields.has("parameterCountB")) {
    confirmations.push({
      label: SOURCE_FIELD_LABELS.parameterCountB,
      body: `${model.parameterCount ?? "The parameter size"} is mapped from ${getSourceNamesForField(model, "parameterCountB")}; this is the model-size input used by the dense LLM calculator path.`,
    });
  }

  if (sourceFields.has("contextLengthTokens") && model.contextLengthTokens) {
    confirmations.push({
      label: SOURCE_FIELD_LABELS.contextLengthTokens,
      body: `${model.contextLengthTokens.toLocaleString()} tokens is tracked from ${getSourceNamesForField(model, "contextLengthTokens")}; the page still uses a medium-context calculator baseline for comparability.`,
    });
  }

  if (sourceFields.has("license") && model.license) {
    confirmations.push({
      label: SOURCE_FIELD_LABELS.license,
      body: `${model.license} is attached through ${getSourceNamesForField(model, "license")}; this page does not convert license metadata into deployment or commercial-use advice.`,
    });
  }

  if (sourceFields.has("modelFamily") && model.modelFamily) {
    confirmations.push({
      label: SOURCE_FIELD_LABELS.modelFamily,
      body: `${model.modelFamily} family metadata is present in the source-backed record, which helps separate this page from nearby model-family pages.`,
    });
  }

  return confirmations.slice(0, 4);
}

function getModelWarning(model: AiModel): string | null {
  if (model.vramEstimateGb === null) {
    return "VRAM estimate has not been verified for this model and runtime.";
  }

  return null;
}

function getGpuTier(estimatedVramGb: number): string {
  if (estimatedVramGb <= 8) return "8 GB planning tier";
  if (estimatedVramGb <= 12) return "12 GB planning tier";
  if (estimatedVramGb <= 16) return "16 GB planning tier";
  if (estimatedVramGb <= 24) return "24 GB planning tier";
  return "More than 24 GB or cloud/multi-device planning tier";
}

function canPublishModelVramPage(model: AiModel): boolean {
  return (
    model.status === "published" &&
    !model.needsReview &&
    model.calculatorEligible === true &&
    model.calculatorGroup === "llm" &&
    model.parameterCountB !== null &&
    model.parameterCountB !== undefined &&
    model.dataConfidence !== "low" &&
    model.sources.length > 0
  );
}

function assertCompleteModelVramEditorialProfile(model: AiModel, profile: ModelVramEditorialProfile): void {
  if (profile.differentiators.length < 3) {
    throw new Error(`Model ${model.slug} needs at least 3 differentiators before publishing a VRAM page.`);
  }

  if (profile.fitNotes.length < 2) {
    throw new Error(`Model ${model.slug} needs at least 2 model-specific planning notes.`);
  }

  if (profile.faqItems.length < 4) {
    throw new Error(`Model ${model.slug} needs at least 4 model-specific FAQ items.`);
  }
}

function buildModelVramPage(model: AiModel): ModelVramPage {
  const modelSizeBillion = model.defaultCalculatorProfile?.modelSizeB ?? model.parameterCountB;
  const editorialProfile = MODEL_VRAM_EDITORIAL_PROFILES[model.slug as ModelVramPageSlug];

  if (!modelSizeBillion) {
    throw new Error(`Model ${model.slug} is missing calculator model size.`);
  }

  if (!editorialProfile) {
    throw new Error(`Model ${model.slug} is missing model VRAM editorial profile.`);
  }

  assertCompleteModelVramEditorialProfile(model, editorialProfile);

  const estimates = (["int4", "int8", "fp16"] as Quantization[]).map((quantization) => {
    const result = calculateEstimatedVram({
      modelSlug: model.slug,
      modelSizeBillion,
      quantization,
      contextPreset: "medium",
      runtime: "llama-cpp",
      safetyMarginPercent: 20,
    });

    return {
      quantization,
      label: QUANTIZATION_LABELS[quantization],
      estimatedVramGb: result.estimatedVramGb,
      recommendedMinimumVramGb: result.recommendedMinimumVramGb,
      gpuTier: getGpuTier(result.estimatedVramGb),
      result,
    };
  });

  return {
    model,
    path: `/models/${model.slug}/vram-requirements`,
    estimates,
    sourceConfirmations: buildSourceConfirmations(model),
    warning:
      "These are dense LLM planning estimates from the calculator assumptions, not benchmarks or guaranteed runtime requirements.",
    ...editorialProfile,
  };
}

function getModelVramPageBySlug(slug: string): ModelVramPage | null {
  if (!MODEL_VRAM_PAGE_SLUGS.includes(slug as ModelVramPageSlug)) {
    return null;
  }

  const model = aiModelRepository.getPublishedAiModelBySlug(slug);

  if (!model || !canPublishModelVramPage(model)) {
    return null;
  }

  return buildModelVramPage(model);
}

export const aiModelService = {
  getModelBySlug(slug: string): AiModelResult {
    const model = aiModelRepository.getAiModelBySlug(slug);
    const warning = model ? getModelWarning(model) : null;

    return { model, warning };
  },

  getModelVramPageSlugs(): { slug: string }[] {
    return MODEL_VRAM_PAGE_SLUGS.map((slug) => ({ slug }));
  },

  listModelVramPages(): ModelVramPage[] {
    return MODEL_VRAM_PAGE_SLUGS.map((slug) => getModelVramPageBySlug(slug)).filter(
      (page): page is ModelVramPage => page !== null,
    );
  },

  getModelVramPageBySlug(slug: string): ModelVramPage | null {
    return getModelVramPageBySlug(slug);
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
