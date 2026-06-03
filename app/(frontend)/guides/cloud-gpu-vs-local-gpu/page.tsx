import Link from "next/link";
import CloudVsLocalTable from "@/components/CloudVsLocalTable";
import DecisionMatrix from "@/components/DecisionMatrix";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { cloudGpuProviderService } from "@/services/cloud-gpu-provider.service";

const PAGE_TITLE = "Cloud GPU vs Local GPU for AI Workloads";
const PAGE_DESCRIPTION =
  "Compare cloud GPU testing and local GPU workstation planning for AI workloads, including VRAM uncertainty, setup time, privacy, scalability, and cost factors without provider ranking.";
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
    number: "01",
    title: "Local GPU planning",
    description:
      "Choose local GPU planning when workloads are repeated, privacy or control matters, and setup effort is acceptable after validation.",
  },
  {
    number: "02",
    title: "Cloud GPU testing",
    description:
      "Choose cloud GPU testing when VRAM needs are uncertain, high-VRAM needs are temporary, or you want to avoid upfront hardware commitment at the start.",
  },
  {
    number: "03",
    title: "SaaS or API tools",
    description:
      "Consider SaaS or API tools when you need outputs more than hardware ownership, runtime customization, or low-level infrastructure control.",
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

const localReasons = [
  "Repeated usage where the same workflow is likely to run often after validation.",
  "Privacy, control, or offline access needs that may be harder to satisfy through external services.",
  "A stable local environment where storage, runtime, and tooling can stay consistent over time.",
  "Learning the local driver and runtime stack as part of the workflow goal.",
  "Predictable long-term planning where the workload is already understood well enough to size hardware carefully.",
  "A workstation path that supports broader local experimentation beyond one short project.",
] as const;

const cloudReasons = [
  "Testing before buying hardware when the memory target is still uncertain.",
  "Temporary high-VRAM work that may not justify local commitment yet.",
  "Batch or team experiments where short-term flexibility matters more than owning the hardware.",
  "Avoiding early driver, cooling, and hardware setup while you validate the workload.",
  "Checking whether a model, runtime, or image workflow behaves as expected before a build decision.",
  "Validating a local workstation plan before narrowing the final GPU tier.",
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
      "If VRAM or workflow fit still feels unclear, consider cloud testing first. The provider directory is not public yet because provider terms and planning details still need careful handling.",
    ctaLabel: null,
    href: null,
    secondaryCtaLabel: "Provider pages planned later",
    secondaryHref: null,
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

const recommendedWorkflowStep = {
  number: "06",
  title: "Recommended next step",
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
            <div className="guide-verdict-grid">
              {quickVerdicts.map((item) => (
                <div className="guide-verdict-card" key={item.title}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
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
            <div className="guide-point-grid">
              {localReasons.map((reason, index) => (
                <div className="guide-point-card" key={reason}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{reason}</p>
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
            <div className="guide-point-grid">
              {cloudReasons.map((reason, index) => (
                <div className="guide-point-card" key={reason}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <p>{reason}</p>
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
                  {step.secondaryCtaLabel && !step.secondaryHref ? (
                    <span className="mt-auto inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 text-sm font-semibold text-[var(--muted)]">
                      {step.secondaryCtaLabel}
                    </span>
                  ) : null}
                  {step.secondaryHref && step.secondaryCtaLabel ? (
                    <div className="mt-auto flex flex-wrap gap-2">
                      <Link
                        className="inline-flex w-fit items-center rounded-full border border-[var(--primary)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:!bg-[var(--primary)] hover:!text-white"
                        href={step.href}
                      >
                        {step.ctaLabel}
                      </Link>
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
                  {recommendedWorkflowStep.number}
                </span>
                <h3 className="mt-2 text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                  {recommendedWorkflowStep.title}
                </h3>
                <div className="flex-1 pt-2">
                  <p className="text-[15px] leading-7 text-[var(--muted)]">
                    {recommendedWorkflowStep.description}
                  </p>
                </div>
                <Link
                  className="mt-auto inline-flex w-fit items-center rounded-full border border-[var(--primary)] bg-[var(--primary)] px-3 py-1.5 text-sm font-semibold !text-white transition-colors hover:!bg-[var(--primary-dark)] hover:!text-white focus-visible:!text-white"
                  href={recommendedWorkflowStep.href}
                >
                  {recommendedWorkflowStep.ctaLabel}
                </Link>
              </div>
            </div>
          </section>

          <section className="tool-section guide-provider-note">
            <h2>Why this guide does not rank cloud GPU providers yet</h2>
            <p>
              {settings.name} currently has {providerCount} source-aware cloud GPU provider planning records prepared
              from Day 8 work, but this guide does not rank providers, recommend one platform over another, or publish
              a provider directory yet.
            </p>
            <p>
              That is intentional because pricing, availability, billing scope, and referral terms can change. Future
              provider pages may use source-backed records, but users should still verify official provider pages
              before making workload or cost decisions.
            </p>
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
            <div className="compare-workflow-grid guide-tradeoff-grid">
              <div>
                <span>01</span>
                <h3>Size the workload first</h3>
                <p>Start with memory planning, then decide whether you are dealing with repeated usage or short tests.</p>
              </div>
              <div>
                <span>02</span>
                <h3>Measure the effort, not only the hardware</h3>
                <p>
                  Consider setup time, maintenance, and data movement instead of comparing only the GPU tier on paper.
                </p>
              </div>
              <div>
                <span>03</span>
                <h3>Match the path to the workflow</h3>
                <p>
                  Local may fit stable repeated use, while cloud may fit uncertainty and temporary scale. SaaS may fit
                  output-first teams with less infrastructure interest.
                </p>
              </div>
              <div>
                <span>04</span>
                <h3>Validate before committing</h3>
                <p>Use the next step that reduces uncertainty rather than forcing an immediate hardware choice.</p>
              </div>
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
