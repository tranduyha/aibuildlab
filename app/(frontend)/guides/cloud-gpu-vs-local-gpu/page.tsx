import Link from "next/link";
import CloudVsLocalTable from "@/components/CloudVsLocalTable";
import DecisionMatrix from "@/components/DecisionMatrix";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { cloudGpuProviderService } from "@/services/cloud-gpu-provider.service";

const PAGE_TITLE = "Cloud GPU vs Local GPU for AI Workloads";
const PAGE_DESCRIPTION =
  "Compare cloud GPU testing and local GPU planning for AI workloads, including VRAM uncertainty, setup time, privacy, scalability, and cost checks.";
const PAGE_PATH = "/guides/cloud-gpu-vs-local-gpu";

const faqItems = [
  {
    question: "Is cloud GPU cheaper than buying a GPU?",
    answer:
      "Not always. Cloud testing can reduce upfront commitment, but repeated use, storage, data movement, and changing provider terms can shift the picture over time. Compare the decision against workload frequency, validation needs, and how long you expect the workflow to stay active.",
  },
  {
    question: "Should I test cloud GPU before buying hardware?",
    answer:
      "It may help when VRAM needs are uncertain, when the project is temporary, or when you want evidence before making a local hardware commitment. Testing first can also reveal whether setup effort, storage flow, or runtime behavior matter more than raw GPU memory.",
  },
  {
    question: "Is local GPU better for privacy?",
    answer:
      "It may be better for workflows that need tighter local control, offline handling, or fewer external service dependencies. You still need to verify the exact software stack, storage workflow, backup process, and operational requirements before assuming local is the safer path.",
  },
  {
    question: "Can cloud GPU replace a local AI workstation?",
    answer:
      "Sometimes, especially for testing, short projects, or temporary high-VRAM work. It does not always replace a local workstation when you need repeated usage, stronger privacy control, offline access, or a predictable long-term environment that stays available on your schedule.",
  },
  {
    question: "Should I use the VRAM Calculator first?",
    answer:
      "Yes. It is a useful first planning step because the estimate can show whether local planning looks realistic or whether cloud testing may reduce risk before any hardware decision. It also helps you avoid comparing options without a basic memory target.",
  },
  {
    question: "What matters more: GPU VRAM or workload frequency?",
    answer:
      "Both matter, but they answer different parts of the decision. VRAM helps size the technical requirement, while workload frequency helps decide whether repeated use may justify local planning or whether short-term testing still makes more sense.",
  },
  {
    question: "When should I choose SaaS or API tools instead?",
    answer:
      "Consider that path when you mainly need outputs rather than infrastructure control, custom runtimes, or hardware-level tuning. SaaS or API tools may also be simpler when the team wants less setup work and can accept external service constraints.",
  },
] as const;

const quickVerdicts = [
  {
    title: "Local GPU planning",
    description:
      "Choose local GPU planning when workloads are repeated, privacy or control matters, and setup effort is acceptable after validation.",
  },
  {
    title: "Cloud GPU testing",
    description:
      "Choose cloud GPU testing when VRAM needs are uncertain, high-VRAM needs are temporary, or you want to avoid upfront hardware commitment at the start.",
  },
  {
    title: "SaaS or API tools",
    description:
      "Consider SaaS or API tools when you need outputs more than hardware ownership, runtime customization, or low-level infrastructure control.",
  },
] as const;

const workloadPatternRoutes = [
  {
    pattern: "One-time validation",
    betterPath: "Cloud GPU first",
    reasoning:
      "Use cloud when the main job is to prove VRAM fit, runtime setup, or model behavior before narrowing a local hardware tier.",
    nextStep: "Run a short validation session, record peak memory and setup notes, then decide whether local hardware still makes sense.",
    href: "/cloud-gpu",
    ctaLabel: "Review provider profiles",
  },
  {
    pattern: "Repeated private workflow",
    betterPath: "Local GPU after validation",
    reasoning:
      "Use local planning when the workload repeats often, the model/data path is sensitive, and you want fewer external service dependencies.",
    nextStep: "Estimate VRAM, inspect GPU profiles, and validate the exact runtime before treating a workstation plan as stable.",
    href: "/builds/high-vram-local-ai-workstation",
    ctaLabel: "Open high-VRAM build planning",
  },
  {
    pattern: "Bursty inference or team demo",
    betterPath: "Cloud or serverless test",
    reasoning:
      "Use cloud-style deployment when requests arrive in bursts, the team needs a shareable endpoint, or idle local hardware would be hard to justify.",
    nextStep: "Check provider billing scope, cold-start/setup behavior, storage flow, and whether the workload can tolerate external infrastructure.",
    href: "/guides/local-ai-vs-ai-saas",
    ctaLabel: "Compare local AI and SaaS",
  },
  {
    pattern: "Output-first workflow",
    betterPath: "SaaS or API path",
    reasoning:
      "Use a hosted tool when output delivery matters more than custom drivers, local model files, GPU tuning, or infrastructure ownership.",
    nextStep: "Keep local/cloud GPU planning only if you need control over runtime, weights, privacy, or repeatable hardware-level testing.",
    href: "/guides/local-ai-vs-ai-saas",
    ctaLabel: "Review SaaS tradeoffs",
  },
] as const;

const comparisonModes = [
  {
    title: "Local GPU workstation planning",
    description:
      "This path focuses on building or validating a repeatable local environment where GPU memory, storage, thermals, runtime compatibility, and maintenance all matter together.",
  },
  {
    title: "Cloud GPU testing",
    description:
      "This path is useful for temporary experiments, uncertain VRAM tiers, or short validation cycles where you want evidence before committing to local hardware.",
  },
  {
    title: "SaaS or API tools",
    description:
      "This path is different because the goal is usually fast output delivery with less infrastructure responsibility, not workstation ownership or runtime-level control.",
  },
] as const;

const validationRunChecklist = [
  {
    title: "Define the exact workload",
    detail:
      "Record model, quantization or precision, context length or image settings, runtime, framework version, driver path, and expected data size.",
  },
  {
    title: "Measure peak memory and setup friction",
    detail:
      "Use the validation run to capture whether the workload fails from VRAM, storage, dependency setup, data movement, or runtime compatibility.",
  },
  {
    title: "Separate compute from surrounding costs",
    detail:
      "Cloud decisions can involve compute, storage, data movement, idle time, reserved capacity, and team workflow overhead; local decisions involve hardware, power, cooling, maintenance, and upgrade risk.",
  },
  {
    title: "Convert the result into a route",
    detail:
      "If the test is rare, keep the cloud path. If it repeats and the environment is predictable, move to local GPU or build planning.",
  },
] as const;

const sourceBackedDecisionInsights = [
  {
    title: "Cloud helps most when uncertainty is the job",
    decision:
      "Use cloud first when the main question is whether the model, runtime, or VRAM tier works at all.",
    detail:
      "AWS reserved-capacity guidance and RunPod serverless documentation both point to a cloud pattern that is useful for short validation windows, bursty inference, and setup discovery. In that case, the outcome you want is evidence: peak memory, install friction, storage movement, and whether the workload should become a local build later.",
    sources: [
      {
        label: "AWS EC2 Capacity Blocks for ML",
        href: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-capacity-blocks.html",
      },
      {
        label: "RunPod Serverless overview",
        href: "https://docs.runpod.io/serverless/overview",
      },
    ],
  },
  {
    title: "Stable repeated workloads need a cost model",
    decision:
      "Move beyond hourly GPU comparison when the workload will run repeatedly.",
    detail:
      "Azure and Google Cloud both frame ML infrastructure around workload cost and optimization, not a single headline GPU number. For repeated work, compare utilization, storage, data movement, idle time, team setup effort, local power/cooling, and upgrade risk before deciding that cloud or local is cheaper.",
    sources: [
      {
        label: "Azure Machine Learning pricing",
        href: "https://azure.microsoft.com/en-us/pricing/details/machine-learning/",
      },
      {
        label: "Google Cloud ML cost optimization",
        href: "https://cloud.google.com/blog/products/ai-machine-learning/machine-learning-performance-and-cost-optimization-best-practices",
      },
    ],
  },
  {
    title: "Idle assumptions can break cloud economics",
    decision:
      "Check billing behavior before treating managed or serverless GPU as zero-commitment.",
    detail:
      "Some GPU-backed services still have instance-based billing, minimum instances, storage, or availability tradeoffs. If a workload sits idle between bursts, the planning question is not only compute time; it is whether the service charges for readiness, storage, redundancy, or reserved capacity.",
    sources: [
      {
        label: "Google Cloud Run GPU billing notes",
        href: "https://docs.cloud.google.com/run/docs/configuring/services/gpu",
      },
    ],
  },
  {
    title: "Local builds still need workload-specific validation",
    decision:
      "Do not turn local ownership into a universal answer before the workload is measured.",
    detail:
      "NVIDIA's system configuration guidance treats GPU server configuration as workload-dependent. For a local AI workstation, that means VRAM is only one part of the decision; power, cooling, storage, driver path, runtime compatibility, and future model growth still need validation.",
    sources: [
      {
        label: "NVIDIA Certified Systems configuration guide",
        href: "https://docs.nvidia.com/certification-programs/latest/nvidia-certified-configuration-guide.html",
      },
    ],
  },
] as const;

const localReasons = [
  {
    label: "Repeated usage",
    description: "The same workflow is likely to run often after validation.",
  },
  {
    label: "Privacy and control",
    description: "Local control or offline access may matter more than external-service flexibility.",
  },
  {
    label: "Stable local environment",
    description: "Storage, runtime, and tooling can stay consistent over time.",
  },
  {
    label: "Runtime learning",
    description: "Learning the local driver and runtime stack is part of the workflow goal.",
  },
  {
    label: "Long-term planning",
    description: "The workload is understood well enough to size hardware carefully.",
  },
  {
    label: "Local experimentation",
    description: "A workstation path supports broader experiments beyond one short project.",
  },
] as const;

const cloudReasons = [
  {
    label: "Test before buying",
    description: "The memory target is still uncertain and needs practical validation.",
  },
  {
    label: "Temporary high VRAM",
    description: "A short project may need more memory than you want to plan locally yet.",
  },
  {
    label: "Batch or team experiments",
    description: "Short-term flexibility matters more than owning the hardware.",
  },
  {
    label: "Less setup complexity",
    description: "You want to avoid early driver, cooling, and hardware setup while validating.",
  },
  {
    label: "Runtime behavior",
    description: "A model, runtime, or image workflow needs to be checked before a build decision.",
  },
  {
    label: "Workstation validation",
    description: "A local build plan needs evidence before narrowing the final GPU tier.",
  },
] as const;

const tradeoffPrinciples = [
  {
    title: "Size the workload first",
    description: "Start with memory planning, then decide whether you are dealing with repeated usage or short tests.",
  },
  {
    title: "Measure effort, not only hardware",
    description: "Consider setup time, maintenance, and data movement instead of comparing only the GPU tier on paper.",
  },
  {
    title: "Match the path to the workflow",
    description:
      "Local may fit stable repeated use, while cloud may fit uncertainty and temporary scale. SaaS may fit output-first teams with less infrastructure interest.",
  },
  {
    title: "Validate before committing",
    description: "Use the next step that reduces uncertainty rather than forcing an immediate hardware choice.",
  },
] as const;

const saasReasons = [
  "Output matters more than infrastructure ownership or runtime customization.",
  "You do not need a custom local runtime, model management workflow, or hardware tuning path.",
  "Less setup work is a priority for the user or team.",
  "External service constraints are acceptable for the current workflow.",
] as const;

const commonMistakes = [
  "Buying hardware before estimating VRAM for the actual workload.",
  "Assuming cloud is always cheaper without checking workload frequency and ongoing usage.",
  "Assuming local is always cheaper without accounting for setup, maintenance, power, and upgrade effort.",
  "Ignoring storage and data movement when comparing where the workload will run.",
  "Ignoring setup time, troubleshooting, and maintenance follow-up.",
  "Comparing only GPU VRAM instead of the broader workflow, including privacy, control, and utilization.",
] as const;

const workflowSteps = [
  {
    number: "01",
    title: "Estimate VRAM",
    description:
      "Start with a memory estimate so you are not comparing local and cloud options without a planning target.",
    ctaLabel: "Open calculator →",
    href: "/tools/vram-calculator",
    secondaryCtaLabel: null,
    secondaryHref: null,
  },
  {
    number: "02",
    title: "Review GPU profiles",
    description:
      "Use local GPU profiles to understand which memory tiers may fit and which records still need deeper validation.",
    ctaLabel: "Review profiles →",
    href: "/gpu",
    secondaryCtaLabel: null,
    secondaryHref: null,
  },
  {
    number: "03",
    title: "Compare local GPU options",
    description:
      "Use comparison pages to narrow the local direction before making a workstation plan.",
    ctaLabel: "Compare GPUs →",
    href: "/compare",
    secondaryCtaLabel: null,
    secondaryHref: null,
  },
  {
    number: "04",
    title: "Test cloud if uncertain",
    description:
      "If VRAM or workflow fit still feels unclear, consider cloud testing first, then use provider profiles as source-aware planning references.",
    ctaLabel: null,
    href: null,
    secondaryCtaLabel: "Review Cloud GPU provider profiles",
    secondaryHref: "/cloud-gpu",
  },
  {
    number: "05",
    title: "Plan a local build after validation",
    description:
      "Move into build planning after you understand the workload, the likely VRAM tier, and the local constraints you are willing to manage.",
    ctaLabel: "Open builds →",
    href: "/builds",
    secondaryCtaLabel: "View build route →",
    secondaryHref: "/builds/cloud-vs-local-ai-build-planning",
  },
] as const;

const suggestedWorkflowStep = {
  number: "06",
  title: "Suggested next step",
  description:
    "If you are unsure where to start, estimate VRAM first. If the estimate is close to a local GPU tier, compare GPUs or test cloud before committing to hardware.",
  ctaLabel: "Start with VRAM Calculator",
  href: "/tools/vram-calculator",
} as const;

const continuePlanningLinks = [
  {
    title: "Use VRAM Calculator",
    description: "Estimate a rough memory target before comparing local or cloud paths.",
    href: "/tools/vram-calculator",
    ctaLabel: "Estimate VRAM →",
    tone: "primary",
  },
  {
    title: "Review local AI build planning",
    description: "Explore build routes after you understand the likely workload and system constraints.",
    href: "/builds",
    ctaLabel: "Open builds →",
    tone: "secondary",
  },
  {
    title: "Compare GPU options",
    description: "Use source-aware comparison pages to narrow local hardware planning.",
    href: "/compare",
    ctaLabel: "Review comparisons →",
    tone: "secondary",
  },
  {
    title: "Cloud vs Local build planning",
    description: "Use the dedicated build route if you are still deciding how much local commitment makes sense.",
    href: "/builds/cloud-vs-local-ai-build-planning",
    ctaLabel: "Open build route →",
    tone: "secondary",
  },
] as const;

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: "article",
});

export default function CloudGpuVsLocalGpuGuidePage() {
  const settings = getSiteSettings();
  const pageUrl = buildCanonicalPath(PAGE_PATH);
  const providerCount = cloudGpuProviderService.getCloudGpuProviderListItems().length;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildCanonicalPath("/") },
      { "@type": "ListItem", position: 2, name: "Guides", item: buildCanonicalPath("/guides") },
      { "@type": "ListItem", position: 3, name: PAGE_TITLE, item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
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
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <span aria-current="page">Cloud GPU vs Local GPU</span>
          </nav>

          <header className="tool-hero guide-hero">
            <p className="eyebrow">Planning guide</p>
            <h1>{PAGE_TITLE}</h1>
            <p className="tool-lead">
              Decide whether your next AI workload is better handled by local GPU workstation planning, cloud GPU
              testing, or a simpler SaaS/API path. The answer usually depends on workload frequency, VRAM uncertainty,
              privacy or control needs, and how much setup effort you are willing to manage.
            </p>
            <div className="guide-hero-summary">
              <p>
                This guide is for people sizing local LLM, image generation, AI workstation, and validation workflows
                who want a clearer decision path before committing to hardware.
              </p>
              <div className="guide-hero-links">
                <Link href="/tools/vram-calculator">Estimate VRAM first</Link>
                <Link href="/builds">Review build planning</Link>
              </div>
            </div>
          </header>

          <p className="tool-disclaimer">
            Source-aware planning notice: this page avoids provider ranking, affiliate links, exact prices,
            availability claims, benchmarks, tokens per second, image speed claims, and buying advice. Verify your
            exact workflow before committing to a local or cloud path.
          </p>

          <section className="tool-section guide-primary-section">
            <h2>Quick verdict</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {quickVerdicts.map((item) => (
                <div
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                  key={item.title}
                >
                  <h3 className="text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Fast answer by workload pattern</h2>
            <p className="related-note">
              Start from the shape of the workload, not from a provider name or GPU label. The right next step is the
              route that reduces the biggest uncertainty first.
            </p>
            <div className="guide-card-grid">
              {workloadPatternRoutes.map((route) => (
                <div className="guide-card guide-card-featured" key={route.pattern}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Workload pattern</span>
                    <span className="guide-card-topic">{route.betterPath}</span>
                  </div>
                  <strong>{route.pattern}</strong>
                  <span>{route.reasoning}</span>
                  <p className="related-note">{route.nextStep}</p>
                  <Link className="guide-card-action" href={route.href}>
                    {route.ctaLabel} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>What this guide compares</h2>
            <p className="guide-section-lead">
              This page compares three different planning paths because they solve different problems. A local
              workstation is about repeated use and control, cloud testing is about validation and flexibility, and
              SaaS/API tools are about getting outputs with less infrastructure ownership.
            </p>
            <div className="guide-mode-grid">
              {comparisonModes.map((mode) => (
                <div className="guide-mode-card" key={mode.title}>
                  <h3>{mode.title}</h3>
                  <p>{mode.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>When local GPU hardware may make sense</h2>
            <p className="guide-section-lead">
              Local planning may make more sense after workload validation when you expect repeat use and want more
              direct control over the environment.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {localReasons.map((reason) => (
                <div
                  className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                  key={reason.label}
                >
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-[16px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                      {reason.label}
                    </h3>
                    <p className="mt-1 text-[15px] leading-7 text-[var(--muted)]">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>When cloud GPU testing may make sense</h2>
            <p className="guide-section-lead">
              Cloud testing may make more sense when you still need evidence, when the memory target is unclear, or
              when you want flexibility before a hardware commitment.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {cloudReasons.map((reason) => (
                <div
                  className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4"
                  key={reason.label}
                >
                  <span
                    className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]"
                    aria-hidden="true"
                  />
                  <div>
                    <h3 className="text-[16px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                      {reason.label}
                    </h3>
                    <p className="mt-1 text-[15px] leading-7 text-[var(--muted)]">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section explanation-grid guide-readability-grid">
            <div>
              <h2>When SaaS or API tools may be simpler</h2>
              <p className="guide-section-copy">
                SaaS or API tools may be simpler when your goal is to ship output rather than manage hardware,
                runtimes, storage, and infrastructure choices.
              </p>
              <ul className="guide-factor-list">
                {saasReasons.map((reason) => (
                  <li key={reason}>{reason}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Common mistakes when choosing cloud or local GPU</h2>
              <p className="guide-section-copy">
                Most bad decisions happen when people compare only one factor. Use these checks to keep the planning
                process grounded in workflow reality.
              </p>
              <ul className="guide-factor-list">
                {commonMistakes.map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Cloud GPU vs local GPU planning table</h2>
            <p className="related-note">
              Use this table for planning tradeoffs only. It does not rank providers, predict final cost, or guarantee
              fit for your workflow.
            </p>
            <CloudVsLocalTable />
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Decision matrix</h2>
            <p className="related-note">
              These answers stay cautious on purpose. Use them to choose the next validation step, not as a final
              hardware or provider verdict.
            </p>
            <DecisionMatrix />
          </section>

          <section className="tool-section guide-primary-section">
            <h2>How to run a useful cloud validation test</h2>
            <p className="related-note">
              A short cloud test is only useful if it produces evidence you can reuse. Treat it as a measurement pass,
              not as a casual demo.
            </p>
            <div className="guide-card-grid">
              {validationRunChecklist.map((item) => (
                <div className="guide-card guide-card-featured" key={item.title}>
                  <strong>{item.title}</strong>
                  <span>{item.detail}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Suggested planning workflow</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {workflowSteps.map((step) => (
                <div
                  className="flex h-full min-h-[232px] flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                  key={step.number}
                >
                  <span className="font-mono text-xs font-extrabold text-[var(--primary)]">{step.number}</span>
                  <h3 className="mt-2 text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <div className="flex-1 pt-2">
                    <p className="text-[15px] leading-7 text-[var(--muted)]">{step.description}</p>
                  </div>
                  {step.href && step.ctaLabel && !step.secondaryHref ? (
                    <Link
                      className="mt-auto inline-flex w-fit items-center rounded-full border border-[var(--primary)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:!bg-[var(--primary)] hover:!text-white"
                      href={step.href}
                    >
                      {step.ctaLabel}
                    </Link>
                  ) : null}
                  {step.secondaryHref && step.secondaryCtaLabel ? (
                    <div className="mt-auto flex flex-wrap gap-2">
                      {step.href && step.ctaLabel ? (
                        <Link
                          className="inline-flex w-fit items-center rounded-full border border-[var(--primary)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:!bg-[var(--primary)] hover:!text-white"
                          href={step.href}
                        >
                          {step.ctaLabel}
                        </Link>
                      ) : null}
                      <Link
                        className="inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--foreground)] transition-colors hover:!border-[var(--primary)] hover:!bg-[var(--primary)] hover:!text-white"
                        href={step.secondaryHref}
                      >
                        {step.secondaryCtaLabel}
                      </Link>
                    </div>
                  ) : null}
                </div>
              ))}
              <div className="flex h-full min-h-[232px] flex-col rounded-2xl border border-[#bdd8ea] bg-[#f4fafe] p-5 shadow-[0_16px_34px_rgba(20,93,143,0.08)]">
                <span className="font-mono text-xs font-extrabold text-[var(--primary)]">
                  {suggestedWorkflowStep.number}
                </span>
                <h3 className="mt-2 text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                  {suggestedWorkflowStep.title}
                </h3>
                <div className="flex-1 pt-2">
                  <p className="text-[15px] leading-7 text-[var(--muted)]">
                    {suggestedWorkflowStep.description}
                  </p>
                </div>
                <Link
                  className="mt-auto inline-flex w-fit items-center rounded-full border border-[var(--primary)] bg-[var(--primary)] px-3 py-1.5 text-sm font-semibold !text-white transition-colors hover:!bg-[var(--primary-dark)] hover:!text-white focus-visible:!text-white"
                  href={suggestedWorkflowStep.href}
                >
                  {suggestedWorkflowStep.ctaLabel}
                </Link>
              </div>
            </div>
          </section>

          <section className="tool-section guide-provider-note">
            <h2>Why this guide does not rank cloud GPU providers</h2>
            <p>
              {settings.name} currently has {providerCount} source-aware cloud GPU provider profiles available as
              planning references, but this guide does not rank providers or point users toward one platform over
              another.
            </p>
            <p>
              That is intentional because pricing, capacity, billing scope, and referral terms can change. Provider
              profiles use source-backed records, but users should still verify official provider pages before making
              workload or cost decisions.
            </p>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Rules that change the cloud vs local choice</h2>
            <p className="related-note">
              Use these rules to decide whether the next step should be a short cloud validation run, a local build
              plan, or a hosted tool path.
            </p>
            <div className="guide-card-grid">
              {sourceBackedDecisionInsights.map((item) => (
                <div className="guide-card guide-card-featured" key={item.title}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Cloud/local rule</span>
                    <span className="guide-card-topic">Infrastructure evidence</span>
                  </div>
                  <strong>{item.title}</strong>
                  <span>{item.decision}</span>
                  <p className="related-note">{item.detail}</p>
                  <div className="guide-source-inline-links" aria-label={`Sources for ${item.title}`}>
                    {item.sources.map((source) => (
                      <Link className="guide-card-action" href={source.href} key={source.href} rel="noreferrer" target="_blank">
                        {source.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section related-section guide-primary-section">
            <h2>Continue planning</h2>
            <div className="guide-cta-grid">
              {continuePlanningLinks.map((item) => (
                <div className={`guide-cta-card guide-cta-card-${item.tone}`} key={item.title}>
                  <span className="guide-cta-label">{item.tone === "primary" ? "Primary next step" : "Related route"}</span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <Link href={item.href}>{item.ctaLabel}</Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>How to think about the tradeoff</h2>
            <p className="guide-section-lead">
              VRAM size matters, but it is only part of the choice. Workload frequency, storage movement, setup time,
              maintenance effort, and privacy needs often shape the decision just as much as the memory tier itself.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {tradeoffPrinciples.map((principle) => (
                <div
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                  key={principle.title}
                >
                  <div className="mb-3 h-1.5 w-10 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <h3 className="text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">{principle.description}</p>
                </div>
              ))}
            </div>
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
        </div>
      </article>
    </>
  );
}
