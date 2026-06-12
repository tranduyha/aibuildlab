import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateCta from "@/components/AffiliateCta";
import BuildCta from "@/components/BuildCta";
import BuildGpuOptions from "@/components/BuildGpuOptions";
import BuildPlanningChecklist from "@/components/BuildPlanningChecklist";
import BuildPlanningStack from "@/components/BuildPlanningStack";
import BuildRelatedComparisons from "@/components/BuildRelatedComparisons";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { canRenderAffiliateUrl } from "@/services/affiliate.service";
import { buildService } from "@/services/build.service";

interface BuildDetailPageProps {
  params: Promise<{ slug: string }>;
}

function cleanBuildSeoTitle(title: string): string {
  return title.replace(/\s+-\s+Draft$/i, "");
}

function isCloudVsLocalBuild(slug: string): boolean {
  return slug === "cloud-vs-local-ai-build-planning";
}

function isLocalLlmStarterBuild(slug: string): boolean {
  return slug === "local-llm-starter-build";
}

function isLocalAi16gbBuild(slug: string): boolean {
  return slug === "local-ai-16gb-vram-build";
}

function getBuildSpecificNotes(slug: string): { title: string; body: string }[] {
  switch (slug) {
    case "local-llm-starter-build":
      return [
        {
          title: "Calculator-first starter workflow",
          body:
            "This route is for first local LLM experiments. Start by estimating model memory, then treat 12GB to 16GB GPUs as a planning tier rather than purchase advice.",
        },
        {
          title: "Validate model size before local hardware commitment",
          body:
            "Starter builds can be sensitive to model size, context length, quantization, and runtime overhead. Verify the actual model path before committing to local hardware.",
        },
      ];
    case "local-ai-16gb-vram-build":
      return [
        {
          title: "16GB headroom checkpoint",
          body:
            "This route focuses on whether a 16GB VRAM tier has enough headroom after runtime overhead, context growth, and future workload changes.",
        },
        {
          title: "Borderline workload handling",
          body:
            "If the estimate sits close to the tier limit, cloud testing can reduce risk before narrowing local GPU profiles or comparison pages.",
        },
      ];
    case "high-vram-local-ai-workstation":
      return [
        {
          title: "System stability before GPU ranking",
          body:
            "High-VRAM planning should include power delivery, connector checks, cooling, case clearance, and sustained system behavior before treating any GPU as a final fit.",
        },
        {
          title: "Evidence before purchase fit",
          body:
            "The page can organize a high-VRAM route, but benchmark evidence and exact-part compatibility are still required before hardware decisions.",
        },
      ];
    case "image-workflow-ai-build":
      return [
        {
          title: "Storage is part of the workflow",
          body:
            "Image workflows can involve model files, cache, datasets, generated outputs, and scratch space. VRAM planning alone does not validate the full workstation route.",
        },
        {
          title: "Runtime and driver caveats",
          body:
            "Extensions, image pipelines, driver support, and runtime settings can change practical fit. Verify the exact workflow before committing to parts.",
        },
      ];
    case "cloud-vs-local-ai-build-planning":
      return [
        {
          title: "Decision framework, not a GPU shortlist",
          body:
            "This route helps decide whether cloud testing should happen before local hardware planning. It does not include provider pricing or provider selection advice.",
        },
        {
          title: "Local hardware only after risk checks",
          body:
            "Move toward local planning only when workload frequency, data-control needs, VRAM estimates, runtime support, and system constraints are acceptable.",
        },
      ];
    default:
      return [
        {
          title: "Planning route",
          body:
            "Use this build page to organize workload assumptions, system constraints, GPU profile checks, and validation steps before hardware decisions.",
        },
      ];
  }
}

function getBuildFaqItems(build: { slug: string; uniqueFaq: { question: string; answer: string } }) {
  switch (build.slug) {
    case "local-llm-starter-build":
      return [
        build.uniqueFaq,
        {
          question: "What CPU should I plan around for a starter local LLM build?",
          answer:
            "Treat the CPU as a support component for a GPU-backed starter build. Validate the target model, GPU tier, runtime path, and multitasking needs before over-optimizing CPU selection.",
        },
        {
          question: "How much should RAM and storage matter for local LLM planning?",
          answer:
            "System RAM and storage matter outside GPU VRAM because local work can involve the OS, tooling, model files, quantized variants, caches, offload paths, and multiple apps running together.",
        },
        {
          question: "When should a starter build use cloud testing first?",
          answer:
            "Use cloud testing first when the target model is near the memory limit, runtime support is uncertain, or the local build would depend on guesswork rather than workload evidence.",
        },
      ];
    case "local-ai-16gb-vram-build":
      return [
        build.uniqueFaq,
        {
          question: "What makes a 16GB local AI plan different from a starter build?",
          answer:
            "A 16GB plan is about headroom, not just entry access. It should test whether the model, context, runtime overhead, extensions, system RAM, and storage path still leave usable margin.",
        },
        {
          question: "When is 16GB not enough for local AI planning?",
          answer:
            "Treat 16GB as risky when the estimate barely fits, the workload needs long context or high-memory image settings, runtime behavior is unknown, or repeated tests fail near the memory ceiling.",
        },
        {
          question: "How should I compare 16GB GPU candidates without turning it into a ranking?",
          answer:
            "Compare source-backed VRAM, memory type, memory bus, power class, exact-variant constraints, and runtime notes first, then validate the workload before narrowing the local hardware plan.",
        },
      ];
    case "high-vram-local-ai-workstation":
      return [
        build.uniqueFaq,
        {
          question: "Why does the checklist emphasize power and cooling?",
          answer:
            "High-VRAM GPUs can raise system-level requirements, so PSU, connector, thermal, and case checks matter before any local fit conclusion.",
        },
        {
          question: "Should high VRAM replace workload testing?",
          answer:
            "No. VRAM capacity is only one planning input; runtime behavior and workload evidence still need validation.",
        },
      ];
    case "image-workflow-ai-build":
      return [
        build.uniqueFaq,
        {
          question: "What should image workflow planning check besides VRAM?",
          answer:
            "Check model files, cache, generated outputs, extensions, driver support, and the exact runtime pipeline.",
        },
        {
          question: "Can this page predict image generation speed?",
          answer:
            "No. This page avoids speed claims and keeps image workflow fit as a source-aware planning checklist.",
        },
      ];
    case "cloud-vs-local-ai-build-planning":
      return [
        build.uniqueFaq,
        {
          question: "What should I record during a cloud GPU validation test?",
          answer:
            "Record the exact model or workflow, context length or image settings, runtime stack, peak memory behavior, setup friction, and any failure modes before comparing local GPU tiers.",
        },
        {
          question: "When does local hardware planning become more reasonable than cloud testing?",
          answer:
            "Local planning becomes more reasonable when the workload is frequent, data-control needs are strong, VRAM fit has headroom, runtime support is verified, and system constraints are acceptable.",
        },
        {
          question: "Does this page recommend a cloud provider or a local GPU?",
          answer:
            "No. It helps choose the validation path first. Provider pricing, availability, exact GPU variants, and final purchase fit still need separate source-backed review.",
        },
      ];
    default:
      return [
        build.uniqueFaq,
        {
          question: "How should I use this build route?",
          answer:
            "Use it to organize workload assumptions, system constraints, GPU profile checks, and validation steps before hardware decisions.",
        },
      ];
  }
}

function getPlanningOutcome(slug: string): string {
  switch (slug) {
    case "local-llm-starter-build":
      return "This route helps you decide whether a 12GB to 16GB local LLM planning tier is worth testing further. It does not validate exact parts, prices, benchmark speed, or final hardware fit; the next step is calculator-first model validation, then GPU profile review.";
    case "local-ai-16gb-vram-build":
      return "This route helps you decide whether 16GB VRAM has enough headroom for a broader local AI workflow. If the estimate is close to the limit, verify with cloud testing before narrowing GPU profiles or comparison pages.";
    case "high-vram-local-ai-workstation":
      return "This route helps you decide whether a 24GB+ planning tier is worth deeper system validation. The next checks are power, cooling, connector, runtime, and workload evidence rather than a GPU ranking.";
    case "image-workflow-ai-build":
      return "This route helps you decide whether an image workflow needs more than a simple VRAM shortlist. Verify storage, cache, generated output handling, driver support, and the exact image runtime before hardware decisions.";
    case "cloud-vs-local-ai-build-planning":
      return "This route helps you decide whether cloud GPU testing should come before local hardware planning. It does not validate provider pricing, provider fit, exact local parts, or final hardware readiness.";
    default:
      return "This route helps organize workload assumptions, system constraints, and validation steps. It does not validate exact parts, prices, benchmark speed, or final hardware fit.";
  }
}

const LOCAL_LLM_STARTER_COMPONENTS = [
  {
    part: "GPU",
    role: "Primary planning constraint",
    guidance:
      "Start with VRAM because the loaded model, quantization choice, context length, and runtime overhead decide whether a local run is realistic.",
    check: "Compare 12GB and 16GB planning paths, then verify exact runtime support before treating any card as a fit.",
  },
  {
    part: "CPU",
    role: "Support component for a GPU-first build",
    guidance:
      "For a first GPU-backed local LLM setup, the CPU usually supports loading, tokenization, multitasking, and general system responsiveness rather than replacing GPU VRAM.",
    check: "Avoid over-optimizing CPU before you know the target model, runtime, and GPU tier.",
  },
  {
    part: "System RAM",
    role: "Headroom outside VRAM",
    guidance:
      "System RAM matters for the OS, browser, tooling, model files, CPU/offload paths, and multitasking while a model is loaded.",
    check: "Compare 32GB and 64GB planning paths if you expect larger model files, offload, or multiple tools open at once.",
  },
  {
    part: "Storage",
    role: "Model and workspace capacity",
    guidance:
      "Local LLM work can accumulate model files, quantized variants, caches, datasets, logs, and experiment outputs quickly.",
    check: "Prefer a planning path with enough NVMe space for several model variants instead of only the first download.",
  },
  {
    part: "Motherboard and case",
    role: "Compatibility gate",
    guidance:
      "The build is not viable if the GPU cannot physically fit, the slot layout blocks airflow, or the upgrade path is too constrained.",
    check: "Verify PCIe slot position, GPU length/thickness, case clearance, RAM slots, and NVMe slots before buying parts.",
  },
  {
    part: "PSU and cooling",
    role: "Stability check",
    guidance:
      "A starter build still needs safe power delivery and airflow, especially when comparing older used GPUs with newer efficient cards.",
    check: "Check PSU headroom, PCIe power connectors, thermal path, and sustained load behavior for the exact GPU variant.",
  },
];

const LOCAL_LLM_GPU_TIERS = [
  {
    title: "12GB starter path",
    body:
      "Use this as an entry planning tier for smaller quantized models and first experiments. Treat close fits as validation work, not proof that every local LLM workflow will be comfortable.",
    href: "/gpu/rtx-3060-12gb",
    cta: "Review RTX 3060 12GB profile",
  },
  {
    title: "16GB safer starter path",
    body:
      "Use this when you want more headroom for context growth, runtime overhead, and model experiments while staying in the starter-build mindset.",
    href: "/gpu/rtx-4060-ti-16gb",
    cta: "Review RTX 4060 Ti 16GB profile",
  },
  {
    title: "Runtime-check path",
    body:
      "Use this when the VRAM number looks attractive but the software stack needs extra validation, especially outside the easiest CUDA-first route.",
    href: "/gpu/intel-arc-a770-16gb",
    cta: "Review Intel Arc A770 profile",
  },
];

const LOCAL_LLM_COMPATIBILITY_TRAPS = [
  "Choosing a GPU only by VRAM and missing runtime support differences between CUDA, ROCm, DirectML, Intel runtimes, and framework-specific paths.",
  "Assuming a board-partner GPU will fit without checking length, thickness, power connector placement, and case airflow.",
  "Treating system RAM as irrelevant because the model runs on GPU VRAM.",
  "Buying local hardware before testing a borderline model, context length, or quantization path.",
  "Ignoring storage growth from multiple model files, quantized variants, caches, and local experiment outputs.",
];

const LOCAL_LLM_USER_PATHS = [
  {
    title: "Private assistant or coding helper",
    body:
      "Start with the calculator, choose a source-backed 7B to 14B model path, then compare 12GB and 16GB GPU profiles before thinking about the rest of the parts.",
    href: "/tools/vram-calculator",
    cta: "Estimate model VRAM",
  },
  {
    title: "Unsure whether starter hardware is enough",
    body:
      "Read the 12GB vs 16GB guide before committing. If the estimate is close to the tier limit, validate the workload before buying parts.",
    href: "/guides/12gb-vs-16gb-vram-local-ai",
    cta: "Compare VRAM tiers",
  },
  {
    title: "One-time experiment or high-risk model",
    body:
      "Use cloud testing first when you only need a short validation run or the local build would be based on guesswork.",
    href: "/builds/cloud-vs-local-ai-build-planning",
    cta: "Use cloud-vs-local decision path",
  },
];

const LOCAL_AI_16GB_VERDICTS = [
  {
    title: "Comfortable 16GB planning zone",
    body:
      "Use this path when the calculator estimate leaves clear headroom after quantization, context length, runtime overhead, and normal multitasking.",
  },
  {
    title: "Borderline 16GB zone",
    body:
      "Use this path when the estimate fits on paper but grows risky with longer context, image extensions, larger model variants, or multiple local tools.",
  },
  {
    title: "Move beyond 16GB or test first",
    body:
      "Use this path when the workload depends on high-memory models, uncertain runtime behavior, or repeated failures close to the memory ceiling.",
  },
];

const LOCAL_AI_16GB_DECISION_ROWS = [
  {
    signal: "Dense local LLM experiments",
    goodFit: "Smaller source-backed model paths with quantization and modest context needs.",
    warning: "Larger models, long context, MoE paths, or unknown package formats can exceed a simple 16GB assumption.",
  },
  {
    signal: "Image generation workflows",
    goodFit: "Basic image experiments where resolution, batch size, extensions, and runtime are kept conservative.",
    warning: "Large diffusion models, high resolutions, ControlNet-style extensions, or batch growth can push beyond 16GB.",
  },
  {
    signal: "AI coding and assistants",
    goodFit: "Single-user local assistant use when GPU VRAM, system RAM, and storage headroom are planned together.",
    warning: "Running multiple tools, browser-heavy workflows, local indexing, or offload paths can make system RAM matter more.",
  },
  {
    signal: "GPU candidate choice",
    goodFit: "Cards with source-backed VRAM fields and clear runtime expectations for the target software stack.",
    warning: "VRAM alone is not enough; memory bandwidth, power, connector, exact variant, and runtime support still need review.",
  },
];

const LOCAL_AI_16GB_HEADROOM_CHECKS = [
  "Run the calculator with the exact model class, quantization, and context preset instead of assuming every 16GB card behaves the same.",
  "Leave room for runtime overhead, KV cache, OS/driver overhead, browser tabs, and local tooling.",
  "Check whether the workload is actually 16GB-friendly or only barely fits under a narrow test setup.",
  "Compare memory type, memory bus, power class, and runtime notes before treating two 16GB GPUs as interchangeable.",
  "Use cloud testing or a higher-VRAM planning page when the estimate is close to the limit and the workload matters.",
];

const LOCAL_AI_16GB_GPU_PATHS = [
  {
    title: "RTX 4060 Ti 16GB",
    angle: "16GB entry planning reference",
    body:
      "Useful as a 16GB planning anchor when VRAM capacity matters more than treating the page as a performance ranking.",
    href: "/gpu/rtx-4060-ti-16gb",
  },
  {
    title: "RTX 4070 Ti Super",
    angle: "Higher-class 16GB reference",
    body:
      "Use as a step-up comparison point where the same VRAM tier has a different memory, power, and GPU-class profile.",
    href: "/gpu/rtx-4070-ti-super",
  },
  {
    title: "Intel Arc A770 16GB",
    angle: "Runtime-check reference",
    body:
      "Use as a reminder that 16GB VRAM can look attractive while runtime, framework, driver, and OS support still need careful validation.",
    href: "/gpu/intel-arc-a770-16gb",
  },
];

const LOCAL_AI_16GB_NEXT_PATHS = [
  {
    title: "Estimate is comfortably under 16GB",
    body: "Go deeper into GPU profiles and compare source-backed fields before deciding whether a local path is worth testing.",
    href: "/gpu",
    cta: "Browse GPU profiles",
  },
  {
    title: "Estimate is close to 16GB",
    body: "Read the 12GB vs 16GB guide and validate the exact workload before treating 16GB as enough.",
    href: "/guides/12gb-vs-16gb-vram-local-ai",
    cta: "Read VRAM tier guidance",
  },
  {
    title: "Estimate exceeds 16GB or keeps failing",
    body: "Move to higher-VRAM planning or use a cloud test to avoid buying into the wrong local tier.",
    href: "/builds/high-vram-local-ai-workstation",
    cta: "Review high-VRAM planning",
  },
];

const CLOUD_VS_LOCAL_INTENTS = [
  "Should I rent cloud GPU time before buying local hardware?",
  "Is a local AI workstation worth planning for this workload?",
  "Can I test model VRAM needs in cloud first?",
  "Which local GPU tier should a cloud test validate?",
];

const CLOUD_VS_LOCAL_VERDICTS = [
  {
    title: "Test cloud first",
    body:
      "Use this path when the workload is occasional, the model may exceed your local VRAM tier, or you need evidence before committing to hardware.",
  },
  {
    title: "Plan local first",
    body:
      "Use this path when the workload is frequent, private data control matters, and the calculator result fits a realistic local GPU tier with room for overhead.",
  },
  {
    title: "Use a hybrid validation path",
    body:
      "Use cloud for one controlled workload test, then use the result to decide whether 16GB, 24GB, or 32GB+ local planning is worth deeper review.",
  },
];

const CLOUD_VS_LOCAL_DECISION_ROWS = [
  {
    signal: "Workload frequency",
    cloudFirst: "Occasional experiments, one-time model tests, or short validation windows.",
    localFirst: "Daily coding, private assistant use, repeat image jobs, or recurring local automation.",
  },
  {
    signal: "VRAM uncertainty",
    cloudFirst: "The estimate is near a tier limit or the model/runtime path is not validated.",
    localFirst: "The estimate has comfortable headroom and the model path is already understood.",
  },
  {
    signal: "Data control",
    cloudFirst: "Synthetic, public, or disposable test data can be used safely for validation.",
    localFirst: "Private documents, client data, or sensitive workflows should stay on owned hardware.",
  },
  {
    signal: "Runtime risk",
    cloudFirst: "CUDA, ROCm, driver, extension, or framework support is still uncertain.",
    localFirst: "The target runtime is already verified on the intended GPU/vendor stack.",
  },
  {
    signal: "Commitment risk",
    cloudFirst: "You are trying to avoid buying a GPU before workload evidence exists.",
    localFirst: "You already have a clear recurring workload and can validate power, cooling, and parts.",
  },
];

const CLOUD_VS_LOCAL_SCENARIOS = [
  {
    title: "You want to try a high-VRAM model once",
    verdict: "Cloud-first validation",
    body:
      "Start with a cloud test so you can record actual memory behavior before treating a 24GB+ local GPU as necessary.",
    href: "/cloud-gpu",
    cta: "Review cloud GPU planning",
  },
  {
    title: "You run private AI workflows every week",
    verdict: "Local-first planning",
    body:
      "Estimate VRAM, check runtime support, then compare local GPU profiles because recurring private work may justify deeper local planning.",
    href: "/tools/vram-calculator",
    cta: "Estimate VRAM first",
  },
  {
    title: "You are unsure whether 16GB or 24GB is enough",
    verdict: "Hybrid path",
    body:
      "Use the calculator to find the likely tier, test the exact workload if it is borderline, then compare nearby local GPU options.",
    href: "/guides/12gb-vs-16gb-vram-local-ai",
    cta: "Read VRAM tier guidance",
  },
];

const CLOUD_VS_LOCAL_WORKFLOW = [
  "Estimate model or workflow VRAM before looking at providers or GPU cards.",
  "Choose a cloud test size that matches the local tier you are considering, such as 16GB, 24GB, or larger.",
  "Run the exact model, context length, image workflow, extension stack, or batch pattern you care about.",
  "Record peak memory behavior, runtime compatibility notes, failure modes, and any setup friction.",
  "Return to local GPU profiles only if the workload is frequent enough and the evidence supports a local tier.",
];

export async function generateStaticParams() {
  return buildService.getBuildStaticParams();
}

export async function generateMetadata({ params }: BuildDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = buildService.getResolvedBuildBySlug(slug);

  if (!resolved) {
    return buildMetadata({
      title: "Build plan not found",
      description: "The requested AI workstation build planning page was not found.",
      path: `/builds/${slug}`,
    });
  }

  return buildMetadata({
    title: cleanBuildSeoTitle(resolved.build.seoTitle),
    description: resolved.build.seoDescription,
    path: `/builds/${resolved.build.slug}`,
    type: "article",
  });
}

export default async function BuildDetailPage({ params }: BuildDetailPageProps) {
  const { slug } = await params;
  const resolved = buildService.getResolvedBuildBySlug(slug);

  if (!resolved) {
    notFound();
  }

  const { build, gpus, comparisons, missingGpuSlugs, missingComparisonSlugs } = resolved;
  const settings = getSiteSettings();
  const pagePath = `/builds/${build.slug}`;
  const pageUrl = buildCanonicalPath(pagePath);
  const seoTitle = cleanBuildSeoTitle(build.seoTitle);
  const buildSpecificNotes = getBuildSpecificNotes(build.slug);
  const isCloudVsLocal = isCloudVsLocalBuild(build.slug);
  const isLocalLlmStarter = isLocalLlmStarterBuild(build.slug);
  const isLocalAi16gb = isLocalAi16gbBuild(build.slug);
  const faqItems = getBuildFaqItems(build);
  const affiliateGpus = gpus.filter((gpu) => canRenderAffiliateUrl(gpu.affiliate, settings));

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildCanonicalPath("/") },
      { "@type": "ListItem", position: 2, name: "Builds", item: buildCanonicalPath("/builds") },
      { "@type": "ListItem", position: 3, name: build.title, item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoTitle,
    description: build.seoDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: settings.name, url: settings.siteUrl },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/builds">Builds</Link>
            <span>/</span>
            <span aria-current="page">{build.title}</span>
          </nav>

          <header className="tool-hero build-detail-hero">
            <p className="eyebrow">Build planning</p>
            <h1>{build.title}</h1>
            <p className="tool-lead">{build.shortDescription}</p>
            <DataConfidenceBadge gpu={build} />
          </header>

          <p className="tool-disclaimer">{buildService.getBuildWarning()}</p>
          <p className="tool-disclaimer">
            This page does not validate motherboard, case, PSU connector, cooling clearance, OS, driver, or runtime
            compatibility. Treat it as a planning checklist and verify exact parts before hardware decisions.
          </p>

          <section className="tool-section">
            <h2>Quick planning summary</h2>
            <div className="build-summary-grid">
              <div>
                <span>Use case</span>
                <p>{build.targetUseCase}</p>
              </div>
              <div>
                <span>VRAM tier</span>
                <p>{build.vramTier}</p>
              </div>
              <div>
                <span>GPU class</span>
                <p>{build.suggestedGpuClass}</p>
              </div>
              <div>
                <span>Data status</span>
                <p>{build.needsReview ? "Planning draft, needs verification" : "Source-backed GPU specs available"}</p>
              </div>
            </div>
          </section>

          <section className="tool-section">
            <h2>Planning stack</h2>
            <BuildPlanningStack build={build} />
          </section>

          <section className="tool-section build-outcome">
            <h2>Planning outcome</h2>
            <p>{getPlanningOutcome(build.slug)}</p>
          </section>

          {isLocalLlmStarter ? (
            <>
              <section className="tool-section local-starter-intro">
                <div>
                  <p className="eyebrow">Starter build intent</p>
                  <h2>Start with a GPU-first local LLM build shape, not a random part list</h2>
                  <p>
                    This page is for first-time local LLM builders who need to understand what matters before
                    choosing parts. The goal is to narrow the build shape: model target, VRAM tier, runtime path,
                    system headroom, and compatibility checks. It is not a live shopping list or a benchmark-backed
                    purchase recommendation.
                  </p>
                </div>
                <div className="local-starter-intro-card">
                  <strong>Starter priority order</strong>
                  <span>Model target</span>
                  <span>GPU VRAM tier</span>
                  <span>Runtime compatibility</span>
                  <span>System RAM and storage</span>
                  <span>Power, cooling, case fit</span>
                </div>
              </section>

              <section className="tool-section">
                <h2>Starter component map</h2>
                <p className="related-note">
                  Use this as planning guidance only. CPU, motherboard, RAM, SSD, PSU, and case records are not a
                  source-backed product database in this project yet, so this section explains roles and checks
                  instead of naming exact parts.
                </p>
                <div className="local-starter-component-grid">
                  {LOCAL_LLM_STARTER_COMPONENTS.map((item) => (
                    <article key={item.part}>
                      <p>{item.role}</p>
                      <h3>{item.part}</h3>
                      <span>{item.guidance}</span>
                      <strong>{item.check}</strong>
                    </article>
                  ))}
                </div>
              </section>

              <section className="tool-section">
                <h2>GPU tier paths for a first local LLM build</h2>
                <p className="related-note">
                  The starter build should stay GPU-first, but not GPU-only. Use these paths to decide what to
                  validate next before thinking about exact components.
                </p>
                <div className="local-starter-tier-grid">
                  {LOCAL_LLM_GPU_TIERS.map((tier) => (
                    <article key={tier.title}>
                      <h3>{tier.title}</h3>
                      <p>{tier.body}</p>
                      <Link href={tier.href}>{tier.cta} <span>&rarr;</span></Link>
                    </article>
                  ))}
                </div>
              </section>

              <section className="tool-section local-starter-traps">
                <div>
                  <h2>Compatibility traps that can break a starter build</h2>
                  <p>
                    A starter local LLM build can fail even when the GPU VRAM looks right. Check these before
                    treating the plan as ready for hardware commitment.
                  </p>
                </div>
                <ul>
                  {LOCAL_LLM_COMPATIBILITY_TRAPS.map((trap) => (
                    <li key={trap}>{trap}</li>
                  ))}
                </ul>
              </section>

              <section className="tool-section">
                <h2>Choose the next path by your actual use case</h2>
                <div className="local-starter-path-grid">
                  {LOCAL_LLM_USER_PATHS.map((path) => (
                    <article key={path.title}>
                      <h3>{path.title}</h3>
                      <p>{path.body}</p>
                      <Link href={path.href}>{path.cta} <span>&rarr;</span></Link>
                    </article>
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {isLocalAi16gb ? (
            <>
              <section className="tool-section local-16gb-intro">
                <div>
                  <p className="eyebrow">16GB decision intent</p>
                  <h2>Use 16GB VRAM as a headroom decision, not a magic build label</h2>
                  <p>
                    This page is for users who already know 8GB to 12GB may be tight and want to understand whether
                    16GB is enough for broader local AI work. The goal is to separate comfortable 16GB workloads from
                    borderline cases that need validation, cloud testing, or a higher-VRAM planning path.
                  </p>
                </div>
                <div className="local-16gb-intro-card">
                  <strong>16GB planning question</strong>
                  <span>Does the workload fit with real headroom?</span>
                  <span>Does the runtime stack support the GPU?</span>
                  <span>Can system RAM/storage absorb offload and tooling?</span>
                  <span>Is 24GB+ safer before hardware commitment?</span>
                </div>
              </section>

              <section className="tool-section">
                <h2>Quick verdict for 16GB local AI planning</h2>
                <div className="local-16gb-verdict-grid">
                  {LOCAL_AI_16GB_VERDICTS.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="tool-section">
                <h2>16GB workload fit matrix</h2>
                <p className="related-note">
                  Use this matrix to decide whether 16GB is a practical planning tier for the workload, or whether
                  the page should route you toward validation before local hardware commitment.
                </p>
                <div className="local-16gb-matrix" role="table" aria-label="16GB local AI workload fit matrix">
                  <div className="local-16gb-matrix-row local-16gb-matrix-head" role="row">
                    <span role="columnheader">Workload signal</span>
                    <span role="columnheader">16GB can make sense when</span>
                    <span role="columnheader">Watch out when</span>
                  </div>
                  {LOCAL_AI_16GB_DECISION_ROWS.map((row) => (
                    <div className="local-16gb-matrix-row" role="row" key={row.signal}>
                      <span role="cell">{row.signal}</span>
                      <span role="cell">{row.goodFit}</span>
                      <span role="cell">{row.warning}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="tool-section local-16gb-headroom">
                <div>
                  <h2>Headroom checks before treating 16GB as enough</h2>
                  <p>
                    A 16GB label is only useful after the actual model, runtime, context, extensions, and system
                    overhead are accounted for. Use these checks before narrowing GPU candidates.
                  </p>
                </div>
                <ol>
                  {LOCAL_AI_16GB_HEADROOM_CHECKS.map((check) => (
                    <li key={check}>{check}</li>
                  ))}
                </ol>
              </section>

              <section className="tool-section">
                <h2>16GB GPU paths to compare</h2>
                <p className="related-note">
                  These are planning references, not rankings. The useful question is why each 16GB path might need
                  different validation before local hardware commitment.
                </p>
                <div className="local-16gb-gpu-grid">
                  {LOCAL_AI_16GB_GPU_PATHS.map((gpuPath) => (
                    <article key={gpuPath.title}>
                      <p>{gpuPath.angle}</p>
                      <h3>{gpuPath.title}</h3>
                      <span>{gpuPath.body}</span>
                      <Link href={gpuPath.href}>Open GPU profile <span>&rarr;</span></Link>
                    </article>
                  ))}
                </div>
              </section>

              <section className="tool-section">
                <h2>Route after your 16GB estimate</h2>
                <div className="local-16gb-next-grid">
                  {LOCAL_AI_16GB_NEXT_PATHS.map((path) => (
                    <article key={path.title}>
                      <h3>{path.title}</h3>
                      <p>{path.body}</p>
                      <Link href={path.href}>{path.cta} <span>&rarr;</span></Link>
                    </article>
                  ))}
                </div>
              </section>
            </>
          ) : null}

          {isCloudVsLocal ? (
            <>
              <section className="tool-section cloud-local-intent-panel">
                <div>
                  <p className="eyebrow">Decision intent</p>
                  <h2>Decide whether to test cloud GPU before buying local AI hardware</h2>
                  <p>
                    This page is for searches around cloud GPU vs local GPU for AI, renting GPU time before
                    buying workstation hardware, and local LLM build planning when the workload is still uncertain.
                    The goal is not to pick a provider or a card immediately; it is to reduce the chance of buying
                    the wrong local tier.
                  </p>
                </div>
                <ul aria-label="Common cloud versus local AI planning questions">
                  {CLOUD_VS_LOCAL_INTENTS.map((intent) => (
                    <li key={intent}>{intent}</li>
                  ))}
                </ul>
              </section>

              <section className="tool-section">
                <h2>Quick verdict: cloud first, local first, or hybrid?</h2>
                <div className="cloud-local-verdict-grid">
                  {CLOUD_VS_LOCAL_VERDICTS.map((item) => (
                    <article key={item.title}>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              </section>

              <section className="tool-section">
                <h2>Decision matrix for AI workload planning</h2>
                <p className="related-note">
                  Use this matrix before comparing GPUs. It keeps the decision focused on workload evidence,
                  privacy, runtime risk, and commitment risk rather than unsupported price or performance claims.
                </p>
                <div className="cloud-local-matrix" role="table" aria-label="Cloud GPU versus local AI hardware decision matrix">
                  <div className="cloud-local-matrix-row cloud-local-matrix-head" role="row">
                    <span role="columnheader">Decision signal</span>
                    <span role="columnheader">Cloud test first when</span>
                    <span role="columnheader">Local planning first when</span>
                  </div>
                  {CLOUD_VS_LOCAL_DECISION_ROWS.map((row) => (
                    <div className="cloud-local-matrix-row" role="row" key={row.signal}>
                      <span role="cell">{row.signal}</span>
                      <span role="cell">{row.cloudFirst}</span>
                      <span role="cell">{row.localFirst}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="tool-section">
                <h2>Common scenarios and the next useful route</h2>
                <div className="cloud-local-scenario-grid">
                  {CLOUD_VS_LOCAL_SCENARIOS.map((scenario) => (
                    <article key={scenario.title}>
                      <p>{scenario.verdict}</p>
                      <h3>{scenario.title}</h3>
                      <span>{scenario.body}</span>
                      <Link href={scenario.href}>{scenario.cta} <span>&rarr;</span></Link>
                    </article>
                  ))}
                </div>
              </section>

              <section className="tool-section cloud-local-workflow">
                <div>
                  <h2>Cloud GPU validation workflow before local commitment</h2>
                  <p>
                    A useful cloud test should answer one question: does the exact workload justify a local GPU
                    tier? Keep the test narrow, document what happened, then return to local hardware planning only
                    when the evidence is strong enough.
                  </p>
                </div>
                <ol>
                  {CLOUD_VS_LOCAL_WORKFLOW.map((step) => (
                    <li key={step}>{step}</li>
                  ))}
                </ol>
              </section>
            </>
          ) : null}

          <section className="tool-section explanation-grid">
            <div>
              <h2>Who this is for</h2>
              <p>{build.notes ?? build.shortDescription}</p>
            </div>
            <div>
              <h2>Planning boundaries</h2>
              <p>
                This page avoids exact part lists, prices, benchmark rankings, speed claims, and purchase
                guidance. Treat it as a checklist route before verification.
              </p>
            </div>
          </section>

          <section className="tool-section">
            <h2>Build planning checklist</h2>
            <BuildPlanningChecklist build={build} />
          </section>

          <section className="tool-section">
            <h2>Build-specific planning notes</h2>
            <div className="build-note-grid">
              {buildSpecificNotes.map((note) => (
                <div key={note.title}>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                </div>
              ))}
            </div>
          </section>

          {isCloudVsLocal ? (
            <section className="tool-section">
              <h2>Cloud vs local decision framework</h2>
              <div className="build-decision-grid">
                <div>
                  <h3>Choose cloud testing first when</h3>
                  <ul>
                    <li>The workload is occasional.</li>
                    <li>The VRAM estimate is uncertain.</li>
                    <li>Benchmark evidence is missing.</li>
                    <li>High-memory testing is needed before local hardware commitment.</li>
                    <li>Local hardware purchase risk is high.</li>
                  </ul>
                </div>
                <div>
                  <h3>Consider local hardware planning when</h3>
                  <ul>
                    <li>The workload is frequent.</li>
                    <li>Data, privacy, or local control matters.</li>
                    <li>Estimated VRAM fits a local GPU tier.</li>
                    <li>Runtime support can be verified.</li>
                    <li>Power, cooling, and system requirements are acceptable.</li>
                  </ul>
                </div>
              </div>
            </section>
          ) : (
            <section className="tool-section explanation-grid">
              <div>
                <h2>Local planning notes</h2>
                <p>
                  Local hardware planning should include VRAM headroom, system RAM, storage, power delivery, cooling,
                  driver support, runtime compatibility, and room for future workload changes.
                </p>
              </div>
              <div>
                <h2>Cloud GPU checkpoint</h2>
                <p>
                  Consider cloud GPU testing when the workload is temporary, when local VRAM estimates are uncertain, or
                  when you need evidence before committing to local hardware.
                </p>
              </div>
            </section>
          )}

          <section className="tool-section">
            <h2>
              {isCloudVsLocal
                ? "Local hardware tiers to compare against cloud testing"
                : "GPU planning candidates"}
            </h2>
            <p className="related-note">
              These GPUs may fit this planning tier. Treat them as secondary planning references and verify sources,
              exact variants, runtime support, and benchmark evidence before hardware decisions.
            </p>
            <BuildGpuOptions gpus={gpus} missingGpuSlugs={missingGpuSlugs} />
            {affiliateGpus.length > 0 ? (
              <div className={affiliateGpus.length >= 2 ? "affiliate-product-grid affiliate-product-grid-two mt-5" : "affiliate-product-grid mt-5"}>
                {affiliateGpus.map((gpu) => (
                  <AffiliateCta
                    affiliate={gpu.affiliate}
                    ctaLabel={`View ${gpu.name} partner options`}
                    entitySlug={gpu.slug}
                    entityType="build-gpu-candidate"
                    key={gpu.slug}
                    merchant={gpu.name}
                    placement="build-gpu-candidate-list"
                    settings={settings}
                    variant="compact"
                  />
                ))}
              </div>
            ) : null}
          </section>

          <section className="tool-section">
            <h2>Related GPU comparisons</h2>
            <BuildRelatedComparisons
              comparisons={comparisons}
              missingComparisonSlugs={missingComparisonSlugs}
            />
          </section>

          <section className="tool-section faq-section">
            <h2>FAQ</h2>
            <div className="faq-grid">
              {faqItems.map((item) => (
                <div className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section related-section">
            <h2>Continue planning</h2>
            <div className="related-links">
              <Link href="/tools/vram-calculator">
                Estimate VRAM first <span>&rarr;</span>
              </Link>
              {isCloudVsLocal ? (
                <>
                  <Link href="/cloud-gpu">
                    Review cloud GPU provider profiles <span>&rarr;</span>
                  </Link>
                  <Link href="/guides/cloud-gpu-vs-local-gpu">
                    Read the cloud vs local guide <span>&rarr;</span>
                  </Link>
                </>
              ) : null}
              <Link href="/gpu">
                View matching GPU profiles <span>&rarr;</span>
              </Link>
              <Link href="/compare">
                Compare source-backed GPU planning profiles <span>&rarr;</span>
              </Link>
              <Link href="/guides">
                Read practical guides <span>&rarr;</span>
              </Link>
            </div>
          </section>

          <BuildCta />
        </div>
      </article>
    </>
  );
}
