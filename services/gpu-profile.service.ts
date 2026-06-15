import { gpuRepository } from "@/repositories/gpu.repository";
import type { Gpu } from "@/types";

export interface GpuEditorialProfile {
  role: string;
  reasonToConsider: string;
  mainConstraint: string;
  interpretation: string[];
  runtimeQuestion: string;
  runtimeAnswer: string;
}

export interface NearbyGpu {
  gpu: Gpu;
  relationship: string;
}

export interface GpuDepthCompareTarget {
  gpu: Gpu;
  reason: string;
}

export interface GpuDepthProfile {
  userIntent: string;
  useWhen: string[];
  skipWhen: string[];
  compareAgainst: GpuDepthCompareTarget[];
}

interface CuratedNearbyGpu {
  slug: string;
  relationship: string;
}

interface RawGpuDepthProfile {
  userIntent: string;
  useWhen: string[];
  skipWhen: string[];
  compareAgainst: Array<{
    slug: string;
    reason: string;
  }>;
}

const curatedNearbyGpus: Record<string, CuratedNearbyGpu[]> = {
  "rtx-3060-12gb": [
    {
      slug: "rtx-4070",
      relationship: "Same 12GB capacity in a newer NVIDIA generation for users comparing age and platform support.",
    },
    {
      slug: "rtx-5070",
      relationship: "Same 12GB capacity in the Blackwell catalog path when newer runtime support matters.",
    },
    {
      slug: "rtx-4060-ti-16gb",
      relationship: "16GB step-up when the estimate leaves too little headroom on a 12GB card.",
    },
  ],
  "rtx-4060-ti-16gb": [
    {
      slug: "rtx-4070-ti-super",
      relationship: "Same 16GB Ada capacity with a higher source-backed power and memory-bus class.",
    },
    {
      slug: "rtx-5060-ti-16gb",
      relationship: "Same 16GB capacity in the newer Blackwell mainstream path.",
    },
    {
      slug: "rtx-4070",
      relationship: "12GB alternative when the workload fits a lower memory tier and other specifications matter more.",
    },
  ],
  "rtx-4070": [
    {
      slug: "rtx-4070-super",
      relationship: "Same 12GB Ada tier; compare source-backed specification differences without changing capacity.",
    },
    {
      slug: "rtx-5070",
      relationship: "Same 12GB capacity in a newer Blackwell generation for platform-path comparison.",
    },
    {
      slug: "rtx-4060-ti-16gb",
      relationship: "16GB capacity-first alternative when 12GB is too close to the estimate.",
    },
  ],
  "rtx-4070-super": [
    {
      slug: "rtx-4070",
      relationship: "Same 12GB Ada tier; compare whether the Super specification changes the planning case.",
    },
    {
      slug: "rtx-5070",
      relationship: "Same 12GB capacity in the Blackwell catalog path.",
    },
    {
      slug: "rtx-4070-ti-super",
      relationship: "16GB Ada step-up when memory headroom is the constraint.",
    },
  ],
  "rtx-4070-ti-super": [
    {
      slug: "rtx-4080-super",
      relationship: "Same 16GB Ada tier with a higher source-backed power and core specification class.",
    },
    {
      slug: "rtx-4060-ti-16gb",
      relationship: "Same 16GB Ada capacity with a lower-power capacity-first planning angle.",
    },
    {
      slug: "rtx-5070-ti",
      relationship: "Same 16GB capacity in the newer Blackwell generation.",
    },
  ],
  "rtx-4080-super": [
    {
      slug: "rtx-4070-ti-super",
      relationship: "Same 16GB Ada tier when capacity is equal but power and source-backed specifications differ.",
    },
    {
      slug: "rtx-5080",
      relationship: "Same 16GB capacity in the Blackwell high-power path.",
    },
    {
      slug: "rtx-4090",
      relationship: "24GB step-up when the estimate is too close to the 16GB ceiling.",
    },
  ],
  "rtx-4090": [
    {
      slug: "rtx-3090",
      relationship: "Same 24GB NVIDIA capacity across different generations.",
    },
    {
      slug: "rx-7900-xtx",
      relationship: "Same 24GB capacity through a non-CUDA AMD runtime path.",
    },
    {
      slug: "rtx-5090",
      relationship: "32GB step-up when a validated workload exceeds a comfortable 24GB budget.",
    },
  ],
  "rtx-3090": [
    {
      slug: "rtx-4090",
      relationship: "Same 24GB NVIDIA capacity in a newer architecture and board class.",
    },
    {
      slug: "rx-7900-xtx",
      relationship: "Same 24GB capacity with AMD runtime compatibility as the central question.",
    },
    {
      slug: "rtx-5090",
      relationship: "32GB step-up when the target workload needs more than 24GB.",
    },
  ],
  "rx-7900-xtx": [
    {
      slug: "rtx-4090",
      relationship: "Same 24GB capacity on a CUDA-oriented NVIDIA path.",
    },
    {
      slug: "rtx-3090",
      relationship: "Same 24GB capacity in an older NVIDIA workstation planning path.",
    },
    {
      slug: "intel-arc-a770-16gb",
      relationship: "Non-CUDA alternative when runtime support is the main research question.",
    },
  ],
  "rtx-5090": [
    {
      slug: "rtx-4090",
      relationship: "24GB high-end NVIDIA alternative when 32GB is not required by the estimate.",
    },
    {
      slug: "rx-7900-xtx",
      relationship: "24GB AMD alternative when non-CUDA runtime validation is acceptable.",
    },
    {
      slug: "rtx-5080",
      relationship: "16GB Blackwell alternative when the workload fits a lower memory tier.",
    },
  ],
  "rtx-5080": [
    {
      slug: "rtx-5070-ti",
      relationship: "Same 16GB Blackwell and 256-bit tier; compare power, core, and exact-card requirements.",
    },
    {
      slug: "rtx-4080-super",
      relationship: "Same 16GB capacity in the Ada high-power path.",
    },
    {
      slug: "rtx-4090",
      relationship: "24GB step-up when a 16GB Blackwell card leaves too little memory headroom.",
    },
  ],
  "rtx-5070-ti": [
    {
      slug: "rtx-5080",
      relationship: "Same 16GB Blackwell and 256-bit tier; compare whether higher specifications matter.",
    },
    {
      slug: "rtx-5060-ti-16gb",
      relationship: "Same 16GB Blackwell capacity with a mainstream capacity-first angle.",
    },
    {
      slug: "rtx-4070-ti-super",
      relationship: "Same 16GB capacity in the Ada generation.",
    },
  ],
  "rtx-5070": [
    {
      slug: "rtx-4070-super",
      relationship: "Same 12GB capacity in the Ada generation for same-tier comparison.",
    },
    {
      slug: "rtx-4070",
      relationship: "Same 12GB capacity with an established Ada reference profile.",
    },
    {
      slug: "rtx-5060-ti-16gb",
      relationship: "16GB Blackwell step-up when 12GB leaves too little working headroom.",
    },
  ],
  "rtx-5060-ti-16gb": [
    {
      slug: "rtx-5070-ti",
      relationship: "Same 16GB Blackwell capacity with a higher source-backed bus and power class.",
    },
    {
      slug: "rtx-4060-ti-16gb",
      relationship: "Same 16GB capacity in the older Ada mainstream path.",
    },
    {
      slug: "rtx-5060",
      relationship: "8GB lower-tier alternative only when the workload is proven to fit a smaller memory budget.",
    },
  ],
  "rtx-5060": [
    {
      slug: "rtx-5050",
      relationship: "Same 8GB Blackwell tier; compare minimum-boundary specifications.",
    },
    {
      slug: "rtx-5070",
      relationship: "12GB step-up when the estimate is close to or above the 8GB ceiling.",
    },
    {
      slug: "rtx-5060-ti-16gb",
      relationship: "16GB step-up when the workload needs substantially more memory headroom.",
    },
  ],
  "rtx-5050": [
    {
      slug: "rtx-5060",
      relationship: "Same 8GB Blackwell tier with a higher source-backed core and power class.",
    },
    {
      slug: "rtx-5070",
      relationship: "12GB step-up when the workload does not fit an entry 8GB boundary.",
    },
    {
      slug: "rtx-5060-ti-16gb",
      relationship: "16GB step-up when local AI planning needs more than entry-tier memory.",
    },
  ],
  "intel-arc-a770-16gb": [
    {
      slug: "rtx-4060-ti-16gb",
      relationship: "Same 16GB capacity on a CUDA-oriented NVIDIA path.",
    },
    {
      slug: "rtx-5060-ti-16gb",
      relationship: "Same 16GB capacity in a newer NVIDIA generation.",
    },
    {
      slug: "rx-7900-xtx",
      relationship: "Non-CUDA higher-memory alternative when runtime validation remains the central task.",
    },
  ],
};

const depthProfiles: Record<string, RawGpuDepthProfile> = {
  "rtx-5050": {
    userIntent:
      "Use this page to decide whether an entry 8GB Blackwell card is only a minimum local test path, or whether the workload should move up immediately.",
    useWhen: [
      "Your calculator estimate is comfortably below 8GB after safety margin and runtime overhead.",
      "You mainly need a local smoke-test card for smaller AI-coding or image workflows before committing to a higher tier.",
      "You want the lowest Blackwell reference in the catalog to understand the entry boundary.",
    ],
    skipWhen: [
      "The workload is uncertain, growing, or already near the 8GB ceiling.",
      "You want this page to answer general local LLM suitability; it only supports entry-boundary planning.",
      "The next step is a durable local AI build rather than a constrained test setup.",
    ],
    compareAgainst: [
      {
        slug: "rtx-5060",
        reason: "Same 8GB tier, but with stronger source-backed specifications for a direct entry-class comparison.",
      },
      {
        slug: "rtx-5070",
        reason: "12GB step-up when the user needs more memory but still wants a Blackwell NVIDIA path.",
      },
      {
        slug: "rtx-5060-ti-16gb",
        reason: "16GB step-up when the main problem is memory headroom rather than minimum local testing.",
      },
    ],
  },
  "rtx-5060": {
    userIntent:
      "Use this page to decide whether a stronger 8GB Blackwell profile is enough, or whether the memory tier is the wrong starting point.",
    useWhen: [
      "The workload is proven to fit 8GB and you still want a newer NVIDIA runtime path.",
      "You are comparing the upper end of the current 8GB tier against the RTX 5050 minimum boundary.",
      "You need an entry image or AI-coding planning profile, not a broad local LLM answer.",
    ],
    skipWhen: [
      "The estimate is close to 8GB before adapters, context growth, or image workflow extras.",
      "You expect to test multiple model sizes and do not want memory capacity to be the first blocker.",
      "The page is being used as a buying recommendation instead of a workload-fit checkpoint.",
    ],
    compareAgainst: [
      {
        slug: "rtx-5050",
        reason: "Same 8GB Blackwell tier for checking whether the extra source-backed specs change the shortlist.",
      },
      {
        slug: "rtx-5070",
        reason: "12GB step-up when the workload needs a modest increase in local headroom.",
      },
      {
        slug: "rtx-5060-ti-16gb",
        reason: "16GB step-up when the current question is capacity rather than entry-tier positioning.",
      },
    ],
  },
  "rtx-5070": {
    userIntent:
      "Use this page to decide whether a 12GB Blackwell route is enough, or whether the memory target should move to 16GB.",
    useWhen: [
      "You want a newer NVIDIA platform path but the workload still fits inside a 12GB planning tier.",
      "You are comparing 12GB Blackwell against 12GB Ada options rather than shopping by product tier.",
      "The main decision is runtime generation versus memory capacity.",
    ],
    skipWhen: [
      "The calculator estimate leaves little room below 12GB after context or image settings.",
      "You are assuming Blackwell makes workloads above 12GB fit without offload or workflow changes.",
      "The profile is being used for heavy local LLM planning before checking 16GB and 24GB alternatives.",
    ],
    compareAgainst: [
      {
        slug: "rtx-4070-super",
        reason: "Same 12GB capacity in the Ada generation for a clean same-tier generation comparison.",
      },
      {
        slug: "rtx-4070",
        reason: "Established 12GB Ada reference when the user wants a simpler same-capacity baseline.",
      },
      {
        slug: "rtx-5060-ti-16gb",
        reason: "16GB Blackwell step-up when capacity is more important than staying in the 12GB tier.",
      },
    ],
  },
  "rtx-5080": {
    userIntent:
      "Use this page to decide whether a higher-power 16GB Blackwell profile is enough, or whether the workload actually needs 24GB.",
    useWhen: [
      "The workload fits 16GB and the user wants to compare higher source-backed specifications inside that tier.",
      "You are deciding between RTX 5080 and RTX 5070 Ti with capacity held equal.",
      "A newer Blackwell path matters, but 32GB is not justified by the estimate.",
    ],
    skipWhen: [
      "The workload is memory-bound above a comfortable 16GB budget.",
      "You are treating product tier as a substitute for extra VRAM.",
      "Power, PSU, connector, or case fit cannot be verified for the exact card.",
    ],
    compareAgainst: [
      {
        slug: "rtx-5070-ti",
        reason: "Same 16GB Blackwell and 256-bit tier; best first comparison for capacity-equal decisions.",
      },
      {
        slug: "rtx-4080-super",
        reason: "Same 16GB capacity in the Ada high-power path when generation is the open question.",
      },
      {
        slug: "rtx-4090",
        reason: "24GB step-up when the estimate shows the 16GB tier is the wrong constraint.",
      },
    ],
  },
  "rtx-5060-ti-16gb": {
    userIntent:
      "Use this page to decide whether mainstream 16GB capacity is enough, or whether higher 16GB specifications matter.",
    useWhen: [
      "The estimate needs more than 12GB but does not clearly require a 24GB profile.",
      "Capacity is the primary issue and the user wants a newer mainstream Blackwell path.",
      "The exact SKU can be verified as the 16GB variant before planning around it.",
    ],
    skipWhen: [
      "The exact card might be the separate 8GB variant from the same product family.",
      "The decision depends on memory bus, power class, or higher-tier specifications more than capacity.",
      "The workload is already close to 16GB and should be tested or moved to a higher tier.",
    ],
    compareAgainst: [
      {
        slug: "rtx-5070-ti",
        reason: "Same 16GB Blackwell capacity with a higher source-backed bus and power class.",
      },
      {
        slug: "rtx-4060-ti-16gb",
        reason: "Same 16GB capacity in the older Ada mainstream path for capacity-first comparison.",
      },
      {
        slug: "rtx-5070",
        reason: "12GB alternative only when the estimate shows 16GB is unnecessary.",
      },
    ],
  },
  "rtx-5070-ti": {
    userIntent:
      "Use this page to decide whether a balanced 16GB Blackwell tier is enough, or whether RTX 5080 or 24GB profiles are more logical.",
    useWhen: [
      "The workload fits 16GB and the user wants a newer-generation profile above mainstream 16GB options.",
      "You are comparing capacity-equal Blackwell cards before considering higher memory tiers.",
      "The decision should separate product tier, bus width, and capacity instead of mixing them together.",
    ],
    skipWhen: [
      "The workload estimate already points beyond a comfortable 16GB plan.",
      "You only need capacity and do not care about higher source-backed specifications within 16GB.",
      "Exact-card dimensions, connector path, and PSU planning cannot be verified yet.",
    ],
    compareAgainst: [
      {
        slug: "rtx-5080",
        reason: "Same 16GB Blackwell and 256-bit tier for checking whether higher specifications matter.",
      },
      {
        slug: "rtx-5060-ti-16gb",
        reason: "Same 16GB Blackwell capacity with a mainstream capacity-first angle.",
      },
      {
        slug: "rtx-4070-ti-super",
        reason: "Same 16GB capacity in Ada when generation and runtime path are the comparison question.",
      },
    ],
  },
  "rtx-3090": {
    userIntent:
      "Use this page to decide whether older 24GB capacity is enough, or whether age, board condition, and generation make a newer route safer.",
    useWhen: [
      "The workload needs 24GB capacity and the user is comparing older workstation-class planning data.",
      "You want a capacity-first NVIDIA reference before evaluating newer high-end cards.",
      "You can verify exact card condition, cooling, power setup, and board-partner details outside this profile.",
    ],
    skipWhen: [
      "The user needs current-condition, used-market, price, or availability guidance.",
      "Runtime support, power, cooling, or exact board condition cannot be validated.",
      "The estimate requires more than 24GB or has a high risk of growing past that tier.",
    ],
    compareAgainst: [
      {
        slug: "rtx-4090",
        reason: "Same 24GB NVIDIA capacity in a newer architecture and board class.",
      },
      {
        slug: "rx-7900-xtx",
        reason: "Same 24GB capacity when the user is willing to validate a non-CUDA AMD path.",
      },
      {
        slug: "rtx-5090",
        reason: "32GB step-up when 24GB is no longer a comfortable memory tier.",
      },
    ],
  },
  "rtx-4090": {
    userIntent:
      "Use this page to decide whether newer 24GB NVIDIA capacity is enough, or whether the workload should move beyond 24GB.",
    useWhen: [
      "The estimate exceeds 16GB but remains comfortably inside a 24GB single-GPU plan.",
      "You are comparing 24GB NVIDIA options and want a newer architecture than RTX 3090.",
      "Power, connector, cooling, and exact-card requirements can be validated before build planning.",
    ],
    skipWhen: [
      "The workload estimate is already close to 24GB before runtime overhead or future growth.",
      "You need a claim about price, stock, or benchmark speed; this profile does not provide those.",
      "A temporary high-memory test would answer the workload question before local hardware commitment.",
    ],
    compareAgainst: [
      {
        slug: "rtx-3090",
        reason: "Same 24GB NVIDIA capacity across a different generation and board era.",
      },
      {
        slug: "rx-7900-xtx",
        reason: "Same 24GB capacity through a non-CUDA AMD runtime path.",
      },
      {
        slug: "rtx-5090",
        reason: "32GB step-up when the estimate shows 24GB is not enough.",
      },
    ],
  },
};

const editorialProfiles: Record<string, GpuEditorialProfile> = {
  "rtx-3060-12gb": {
    role: "An older 12GB reference point for smaller local LLM and image workflow planning.",
    reasonToConsider:
      "Its 12GB capacity gives a more useful memory baseline than many entry cards, while the Ampere platform provides a distinct older-generation comparison point.",
    mainConstraint:
      "The page should not be read as proof of current speed or value. Exact board condition, power behavior, and workload performance still need separate checks.",
    interpretation: [
      "Treat the 12GB capacity as the main planning fact, not the model name or age.",
      "Compare it with newer 12GB cards when architecture support matters more than capacity alone.",
      "Check the exact board-partner card because connector, cooling, and dimensions are not universal.",
    ],
    runtimeQuestion: "What is the main software check for an RTX 3060 12GB?",
    runtimeAnswer:
      "Confirm that the intended CUDA, driver, and framework versions still support the Ampere path you plan to use. Capacity and runtime compatibility are separate checks.",
  },
  "rtx-4060-ti-16gb": {
    role: "A 16GB capacity-first option for users comparing memory headroom with higher-tier 12GB cards.",
    reasonToConsider:
      "The distinguishing planning fact is 16GB of VRAM in a lower-power Ada profile, not an unsupported claim that it is faster than nearby GPUs.",
    mainConstraint:
      "Its 128-bit memory bus and workload-specific performance still matter. Extra capacity alone does not establish throughput or overall suitability.",
    interpretation: [
      "Use this profile when the estimate crosses 12GB but remains within a 16GB planning range.",
      "Compare it with the RTX 4070 family when deciding between capacity and other source-backed specifications.",
      "Do not infer benchmark performance from VRAM capacity or CUDA core count alone.",
    ],
    runtimeQuestion: "Why might 16GB matter more than GPU tier for this card?",
    runtimeAnswer:
      "A workload that cannot remain inside a 12GB memory budget may benefit from the larger capacity even when another card occupies a higher product tier. Validate the actual model and runtime before deciding.",
  },
  "rtx-4070": {
    role: "A newer 12GB Ada reference for creator and AI-coding workflow research.",
    reasonToConsider:
      "It provides a useful same-capacity contrast with older 12GB cards while keeping the decision focused on architecture, power class, and exact workflow support.",
    mainConstraint:
      "The 12GB ceiling remains the first constraint for memory-heavy local LLM work, regardless of the card's higher product tier.",
    interpretation: [
      "Start with the 12GB ceiling before considering the rest of the specification table.",
      "Compare against the RTX 4070 Super when the same VRAM tier makes architecture-level specifications the deciding evidence.",
      "NVIDIA lists more than one memory type across the family, so verify the exact card.",
    ],
    runtimeQuestion: "Is the RTX 4070 mainly a 12GB or architecture decision?",
    runtimeAnswer:
      "For model fit it is first a 12GB decision. After the workload fits, architecture, exact memory configuration, power, and runtime support become useful comparison factors.",
  },
  "rtx-4070-super": {
    role: "A 12GB Ada profile best used in direct comparison with the RTX 4070 rather than as a separate VRAM tier.",
    reasonToConsider:
      "Its value on this site is the source-backed specification contrast inside the same 12GB family.",
    mainConstraint:
      "Because VRAM capacity does not increase over the RTX 4070, it does not change the memory ceiling for larger local workloads.",
    interpretation: [
      "Use the RTX 4070 comparison first because both cards occupy the same 12GB planning tier.",
      "Treat core count, power class, and board design as comparison inputs, not standalone performance claims.",
      "Reference-card connector and dimension guidance may not match a partner model.",
    ],
    runtimeQuestion: "Does RTX 4070 Super change the 12GB workload ceiling?",
    runtimeAnswer:
      "No. It remains a 12GB planning profile. Source-backed specifications may distinguish it from the RTX 4070, but they do not create additional VRAM capacity.",
  },
  "rtx-4070-ti-super": {
    role: "A 16GB Ada option for users who need more memory headroom than the 12GB RTX 4070 profiles.",
    reasonToConsider:
      "Its clearest planning distinction is the move to a 16GB and 256-bit memory configuration.",
    mainConstraint:
      "Board power, connector, and physical implementation can vary by partner card, and 16GB still does not guarantee fit for every long-context or image workflow.",
    interpretation: [
      "Use it as a step-up comparison when a calculator estimate is too close to 12GB.",
      "Compare with other 16GB cards on runtime support, power class, and exact board requirements.",
      "Several attached fields are variant-specific and should not be generalized to every SKU.",
    ],
    runtimeQuestion: "When is RTX 4070 Ti Super a clearer step than a 12GB card?",
    runtimeAnswer:
      "It becomes relevant when the estimated working set needs more than a comfortable 12GB budget but still fits a cautiously planned 16GB range.",
  },
  "rtx-4080-super": {
    role: "A high-power 16GB Ada profile for creator and workstation planning.",
    reasonToConsider:
      "It offers a different power and core specification class from lower 16GB cards while retaining the same 16GB capacity ceiling.",
    mainConstraint:
      "Its higher product tier must not be confused with additional VRAM. Memory-heavy workloads still face the same 16GB capacity boundary.",
    interpretation: [
      "Compare it with other 16GB GPUs only after confirming the workload fits inside that tier.",
      "Use the specification table to evaluate power and memory bandwidth differences without converting them into unsupported speed claims.",
      "Move to a 24GB profile or cloud test when the estimate is already near 16GB.",
    ],
    runtimeQuestion: "What does RTX 4080 Super add over lower 16GB profiles?",
    runtimeAnswer:
      "The source-backed differences are in specifications such as core count, bandwidth, and power class. It does not add capacity beyond the shared 16GB tier.",
  },
  "rtx-4090": {
    role: "A 24GB Ada profile for heavier local AI experiments that remain within a single-GPU memory budget.",
    reasonToConsider:
      "The 24GB capacity is the primary planning advantage over 16GB cards, with a newer architecture than the RTX 3090.",
    mainConstraint:
      "High board power, physical fit, and exact workload memory behavior remain material checks. A 24GB label is not a guarantee for every large model.",
    interpretation: [
      "Use it when a validated estimate exceeds 16GB but remains comfortably below 24GB.",
      "Compare with the RTX 3090 to separate shared capacity from architecture and board requirements.",
      "Verify the exact card's connector, dimensions, PSU, and cooling path before local build planning.",
    ],
    runtimeQuestion: "How should RTX 4090 be compared with RTX 3090 for AI?",
    runtimeAnswer:
      "Both provide a 24GB capacity reference. Compare their source-backed architecture, power, and board details separately, and use workload evidence for any performance conclusion.",
  },
  "rtx-3090": {
    role: "An Ampere 24GB workstation reference for capacity-first local LLM planning.",
    reasonToConsider:
      "It preserves the same broad 24GB memory tier as newer high-end cards while representing an older architecture and board generation.",
    mainConstraint:
      "Age, exact card condition, cooling, and board-specific power details require more attention than the VRAM number alone.",
    interpretation: [
      "Use this page primarily as a 24GB capacity reference.",
      "Compare with RTX 4090 when choosing between the same memory tier across different generations.",
      "Do not infer current market value, condition, or performance from this profile.",
    ],
    runtimeQuestion: "What needs extra verification on an RTX 3090 profile?",
    runtimeAnswer:
      "Beyond CUDA compatibility, verify the exact board model, power setup, cooling, and physical condition. This page contains planning specifications, not a condition assessment.",
  },
  "rx-7900-xtx": {
    role: "A 24GB AMD alternative for users willing to validate a non-CUDA runtime path.",
    reasonToConsider:
      "Its 24GB capacity creates a meaningful high-memory option outside NVIDIA, making software compatibility the central decision.",
    mainConstraint:
      "ROCm, operating-system, and framework support must be confirmed for the exact workflow before treating capacity as usable in practice.",
    interpretation: [
      "Start with runtime support, then evaluate the 24GB memory tier.",
      "Compare against 24GB NVIDIA profiles when software portability is uncertain.",
      "Treat AMD and NVIDIA core-count labels as different metrics that should not be compared directly.",
    ],
    runtimeQuestion: "Is 24GB enough reason to choose RX 7900 XTX for local AI?",
    runtimeAnswer:
      "No. The capacity is relevant only when the intended runtime and framework support the AMD path on your operating system. Validate software compatibility before hardware fit.",
  },
  "rtx-5090": {
    role: "A 32GB Blackwell profile for workloads that need more single-card headroom than 24GB options.",
    reasonToConsider:
      "Its unique planning distinction in this catalog is the 32GB memory tier.",
    mainConstraint:
      "Very high power requirements, exact board fit, and newer-generation runtime support must be checked. Capacity alone does not prove that a large workload will run well.",
    interpretation: [
      "Use this profile only after a model or image workflow estimate establishes a need beyond 24GB.",
      "Check current driver and framework support for Blackwell before relying on the hardware.",
      "Validate the exact partner card's power connector, dimensions, PSU, and cooling requirements.",
    ],
    runtimeQuestion: "When does the RTX 5090's 32GB tier become relevant?",
    runtimeAnswer:
      "It becomes relevant when a source-aware estimate or real test exceeds a comfortable 24GB budget. It should not be selected solely because it is the highest product tier.",
  },
  "rtx-5080": {
    role: "A higher-power Blackwell 16GB profile for creator and workstation research.",
    reasonToConsider:
      "It is useful when comparing newer-generation specifications inside the 16GB tier, especially against RTX 5070 Ti.",
    mainConstraint:
      "Despite its product position, it retains a 16GB capacity ceiling and therefore does not replace a 24GB option for memory-bound workloads.",
    interpretation: [
      "Confirm the workload fits 16GB before weighing its other specifications.",
      "Compare directly with RTX 5070 Ti because both share Blackwell and a 16GB, 256-bit memory configuration.",
      "Check Blackwell driver and framework readiness plus the exact board's power requirements.",
    ],
    runtimeQuestion: "What is the key RTX 5080 versus RTX 5070 Ti question?",
    runtimeAnswer:
      "Both occupy the same 16GB planning tier. The decision therefore moves to source-backed power, core, clock, board, and workload evidence rather than memory capacity.",
  },
  "rtx-5070-ti": {
    role: "A 16GB Blackwell profile positioned between mainstream capacity options and the higher-power RTX 5080.",
    reasonToConsider:
      "Its main planning value is 16GB capacity with a 256-bit memory bus in the newer Blackwell family.",
    mainConstraint:
      "It shares the same memory ceiling as several cheaper-tier and higher-tier profiles, so product naming alone does not settle the decision.",
    interpretation: [
      "Compare with RTX 5080 when both capacity and architecture are held constant.",
      "Compare with RTX 5060 Ti 16GB when capacity is the priority and other specifications are secondary.",
      "Verify partner-card dimensions because the reference data intentionally omits a universal board size.",
    ],
    runtimeQuestion: "Why compare RTX 5070 Ti in two directions?",
    runtimeAnswer:
      "RTX 5080 tests the value of higher specifications within the same 16GB family, while RTX 5060 Ti 16GB tests whether capacity alone meets the planning need.",
  },
  "rtx-5070": {
    role: "A 12GB Blackwell profile for users prioritizing a newer runtime path over additional VRAM.",
    reasonToConsider:
      "It provides a newer-generation comparison point within the established 12GB planning tier.",
    mainConstraint:
      "The 12GB ceiling can become restrictive before the architecture does, especially for longer context or larger image workflows.",
    interpretation: [
      "Treat this as a 12GB decision first and a Blackwell decision second.",
      "Compare with RTX 4070-class cards for same-capacity generation differences.",
      "Move to a 16GB profile when the calculator estimate leaves little working headroom.",
    ],
    runtimeQuestion: "Does Blackwell make the RTX 5070 suitable for workloads above 12GB?",
    runtimeAnswer:
      "No. Architecture does not increase physical VRAM capacity. Workloads above a comfortable 12GB budget need offload, workflow changes, cloud testing, or a higher-memory card.",
  },
  "rtx-5060-ti-16gb": {
    role: "A mainstream Blackwell profile where 16GB capacity is more important than product tier.",
    reasonToConsider:
      "It creates a capacity-first comparison against both 8GB mainstream cards and higher-tier 16GB cards.",
    mainConstraint:
      "The 128-bit bus and other specifications differ from higher 16GB tiers, so capacity should not be translated into an overall performance claim.",
    interpretation: [
      "Confirm that the exact card is the 16GB variant, not the separate 8GB configuration.",
      "Use it when the estimate needs more than 12GB but does not justify assumptions about higher-tier throughput.",
      "Compare with RTX 5070 Ti to separate equal capacity from bus, core, and power differences.",
    ],
    runtimeQuestion: "Why must the RTX 5060 Ti memory variant be verified?",
    runtimeAnswer:
      "NVIDIA lists both 16GB and 8GB configurations for the family. This profile is specifically scoped to 16GB, so the exact SKU must match before using its capacity in a plan.",
  },
  "rtx-5060": {
    role: "An 8GB Blackwell entry profile for constrained AI-coding and image workflow experiments.",
    reasonToConsider:
      "It offers a newer NVIDIA runtime path for workloads that have already been shown to fit inside 8GB.",
    mainConstraint:
      "VRAM is the dominant limitation. Larger models, longer context, higher resolution, or multiple pipeline components can exceed the tier quickly.",
    interpretation: [
      "Use the calculator before comparing any other specification.",
      "Compare with RTX 5050 to evaluate same-capacity Blackwell differences.",
      "Move to 12GB or 16GB when the estimate is already close to 8GB.",
    ],
    runtimeQuestion: "What should be proven before planning around RTX 5060?",
    runtimeAnswer:
      "Prove that the complete workload, including runtime overhead and safety margin, fits inside 8GB. Newer architecture does not remove that physical limit.",
  },
  "rtx-5050": {
    role: "The lowest-tier 8GB Blackwell reference in the current GPU catalog.",
    reasonToConsider:
      "It is useful for defining the minimum local NVIDIA planning path when the workload is already known to fit inside 8GB.",
    mainConstraint:
      "Its memory ceiling and lower source-backed core specification make it unsuitable as a generic answer for local AI without workload validation.",
    interpretation: [
      "Treat it as a minimum-boundary profile, not a default recommendation.",
      "Compare with RTX 5060 because both share 8GB but differ in source-backed core and power specifications.",
      "Use cloud testing or a higher-memory tier when the workload has uncertain growth.",
    ],
    runtimeQuestion: "How is RTX 5050 different from a general local AI recommendation?",
    runtimeAnswer:
      "It is an entry planning reference for workloads proven to fit 8GB. The profile does not claim that 8GB is sufficient for local AI in general.",
  },
  "intel-arc-a770-16gb": {
    role: "A 16GB Intel alternative where runtime compatibility matters as much as capacity.",
    reasonToConsider:
      "It provides a non-CUDA 16GB path for users researching Intel-supported inference or creator stacks.",
    mainConstraint:
      "Driver, operating-system, oneAPI, SYCL, OpenVINO, and framework support must be checked for the exact workflow.",
    interpretation: [
      "Validate the software path before using 16GB as evidence of practical fit.",
      "Compare with NVIDIA 16GB cards when the intended application assumes CUDA.",
      "Keep ASRock board-specific connector and power details scoped to that exact variant.",
    ],
    runtimeQuestion: "What comes first when evaluating Intel Arc A770 16GB?",
    runtimeAnswer:
      "Runtime support comes first. Once the intended framework and operating system support the Intel path, the 16GB capacity can be evaluated against the workload estimate.",
  },
};

function getFallbackProfile(gpu: Gpu): GpuEditorialProfile {
  const capacity = gpu.vramGb !== null ? `${gpu.vramGb}GB` : "unresolved";

  return {
    role: `${capacity} ${gpu.vendor} planning profile for source-aware local AI research.`,
    reasonToConsider:
      "Use the attached specifications to place this card in a memory and platform shortlist.",
    mainConstraint:
      "The current record does not support benchmark, price, availability, or universal workload-fit conclusions.",
    interpretation: [
      "Estimate workload memory before comparing product tiers.",
      "Confirm the exact runtime supports the vendor platform.",
      "Verify the exact board-partner card before system planning.",
    ],
    runtimeQuestion: `What should be verified first for ${gpu.name}?`,
    runtimeAnswer:
      "Verify workload memory, runtime support, and exact-card requirements before treating the profile as a hardware fit.",
  };
}

function getNearbyScore(current: Gpu, candidate: Gpu): number {
  let score = 0;

  if (current.vramGb !== null && candidate.vramGb !== null) {
    const difference = Math.abs(current.vramGb - candidate.vramGb);
    if (difference === 0) score += 20;
    else if (candidate.vramGb > current.vramGb && difference <= 4) score += 12;
    else if (candidate.vramGb > current.vramGb && difference <= 8) score += 8;
    else if (candidate.vramGb < current.vramGb && difference <= 4) score += 5;
    else if (difference <= 8) score += 3;
  }

  if (current.vendor === candidate.vendor) score += 5;
  if (current.architecture && current.architecture === candidate.architecture) score += 4;
  score += current.useCases.filter((useCase) => candidate.useCases.includes(useCase)).length * 2;
  return score;
}

function getRelationship(current: Gpu, candidate: Gpu): string {
  if (
    current.vramGb !== null &&
    candidate.vramGb === current.vramGb &&
    current.architecture === candidate.architecture
  ) {
    return `Same ${current.vramGb}GB and ${current.architecture} tier; compare power, core, and board specifications.`;
  }

  if (current.vramGb !== null && candidate.vramGb === current.vramGb) {
    return `Same ${current.vramGb}GB capacity across a different architecture or vendor path.`;
  }

  if (
    current.vramGb !== null &&
    candidate.vramGb !== null &&
    candidate.vramGb > current.vramGb
  ) {
    return `${candidate.vramGb}GB step-up when ${current.vramGb}GB leaves too little working headroom.`;
  }

  if (
    current.vramGb !== null &&
    candidate.vramGb !== null &&
    candidate.vramGb < current.vramGb
  ) {
    return `${candidate.vramGb}GB alternative when the workload fits a lower memory tier.`;
  }

  return "Nearby source-backed profile for a broader hardware comparison.";
}

export const gpuProfileService = {
  getEditorialProfile(gpu: Gpu): GpuEditorialProfile {
    return editorialProfiles[gpu.slug] ?? getFallbackProfile(gpu);
  },

  getDepthProfile(gpu: Gpu): GpuDepthProfile | null {
    const depthProfile = depthProfiles[gpu.slug];

    if (!depthProfile) {
      return null;
    }

    const compareAgainst = depthProfile.compareAgainst
      .map((item) => {
        const compareGpu = gpuRepository.getGpuBySlug(item.slug);

        if (!compareGpu) {
          return null;
        }

        return {
          gpu: compareGpu,
          reason: item.reason,
        };
      })
      .filter((item): item is GpuDepthCompareTarget => Boolean(item));

    return {
      userIntent: depthProfile.userIntent,
      useWhen: depthProfile.useWhen,
      skipWhen: depthProfile.skipWhen,
      compareAgainst,
    };
  },

  getNearbyGpus(gpu: Gpu, limit = 3): NearbyGpu[] {
    const curated = (curatedNearbyGpus[gpu.slug] ?? [])
      .map((item) => {
        const nearbyGpu = gpuRepository.getGpuBySlug(item.slug);

        if (!nearbyGpu) {
          return null;
        }

        return {
          gpu: nearbyGpu,
          relationship: item.relationship,
        };
      })
      .filter((item): item is NearbyGpu => Boolean(item))
      .slice(0, limit);

    if (curated.length >= limit) {
      return curated;
    }

    const curatedSlugs = new Set(curated.map((item) => item.gpu.slug));
    const fallback = gpuRepository
      .getAllGpus()
      .filter((candidate) => candidate.slug !== gpu.slug && !curatedSlugs.has(candidate.slug))
      .sort((a, b) => {
        const scoreDifference = getNearbyScore(gpu, b) - getNearbyScore(gpu, a);
        if (scoreDifference !== 0) return scoreDifference;

        const aVramDifference =
          gpu.vramGb !== null && a.vramGb !== null
            ? Math.abs(gpu.vramGb - a.vramGb)
            : Number.MAX_SAFE_INTEGER;
        const bVramDifference =
          gpu.vramGb !== null && b.vramGb !== null
            ? Math.abs(gpu.vramGb - b.vramGb)
            : Number.MAX_SAFE_INTEGER;

        return aVramDifference - bVramDifference;
      })
      .slice(0, limit - curated.length)
      .map((candidate) => ({
        gpu: candidate,
        relationship: getRelationship(gpu, candidate),
      }));

    return [...curated, ...fallback];
  },
};
