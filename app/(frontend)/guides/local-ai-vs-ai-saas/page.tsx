import Link from "next/link";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { aiToolService } from "@/services/ai-tool.service";

const PAGE_TITLE = "Local AI vs AI SaaS for Workflow Planning";
const PAGE_DESCRIPTION =
  "Compare local AI hardware with AI SaaS and API tools across cost, privacy, setup time, quality control, reliability, and team workflow.";
const PAGE_PATH = "/guides/local-ai-vs-ai-saas";

const faqItems = [
  {
    question: "Is local AI better than AI SaaS?",
    answer:
      "Not by default. Local AI can offer more control over hardware, data handling, and runtime choices, while SaaS or API tools may reduce setup work and move faster for output-focused workflows. The better path depends on privacy needs, customization requirements, team process, and how often the workflow will run.",
  },
  {
    question: "When should I start with local AI hardware planning?",
    answer:
      "Start with local planning when you expect repeated use, need tighter control over data or runtime behavior, want to learn the stack, or need a workflow that can keep running without relying entirely on an external service.",
  },
  {
    question: "When should I use AI SaaS or an API instead?",
    answer:
      "Use SaaS or API tools when the outcome matters more than infrastructure ownership, when setup time must stay low, or when your team can accept external service constraints for the current project.",
  },
  {
    question: "Should I buy hardware before trying SaaS or cloud tools?",
    answer:
      "Usually it is safer to estimate VRAM, test the workflow shape, and compare setup effort before committing to hardware. A short validation step can reduce the risk of buying hardware for a workload that is better served by cloud testing or SaaS.",
  },
  {
    question: "Does this guide choose specific AI tools?",
    answer:
      "No. The AI tool records are planning references only. They are not scored lists or selection advice, and monetized status is not configured yet.",
  },
  {
    question: "Are AI SaaS price amounts stored here?",
    answer:
      "No. Price amounts are not stored in this guide. Pricing pages and terms change, so cost planning should always be checked against official tool or provider pages.",
  },
] as const;

const quickVerdicts = [
  {
    title: "Local AI",
    description:
      "Plan local AI when control, repeated use, privacy handling, and runtime ownership matter enough to justify hardware and maintenance work.",
  },
  {
    title: "AI SaaS or API",
    description:
      "Use SaaS or APIs when the output matters more than owning infrastructure, and the workflow can accept external service constraints.",
  },
  {
    title: "Cloud GPU bridge",
    description:
      "Use cloud GPU testing when the workload needs validation before choosing between local hardware and hosted tools.",
  },
] as const;

const tradeoffRows = [
  {
    factor: "Cost planning",
    local: "Local hardware has upfront planning, power, upgrade, and maintenance considerations.",
    saas: "SaaS and APIs shift cost toward ongoing service usage and plan limits that should be checked officially.",
  },
  {
    factor: "Privacy and data handling",
    local: "Local workflows may offer more direct control over where data is stored and processed.",
    saas: "Hosted tools require review of vendor terms, data handling policies, account controls, and team access.",
  },
  {
    factor: "Setup time",
    local: "Local setups can involve drivers, runtimes, models, storage, and troubleshooting.",
    saas: "Hosted tools can reduce setup time, but may limit runtime customization or model-level control.",
  },
  {
    factor: "Quality and consistency",
    local: "Local quality depends on selected models, runtime settings, and the team's ability to tune the workflow.",
    saas: "Hosted tools may provide polished outputs, but the underlying system behavior can change over time.",
  },
  {
    factor: "Reliability",
    local: "Local reliability depends on your hardware, storage, cooling, backups, and maintenance.",
    saas: "Hosted reliability depends on vendor uptime, plan constraints, service terms, and account access.",
  },
  {
    factor: "Control",
    local: "Local setups support more control over runtime, model files, updates, and offline workflows.",
    saas: "SaaS can trade control for speed, collaboration, and reduced operational responsibility.",
  },
  {
    factor: "Team workflow",
    local: "Local can fit technical teams that want shared internal infrastructure or reproducible experiments.",
    saas: "SaaS can fit teams that need faster onboarding, collaboration, and fewer machine-specific steps.",
  },
] as const;

const localSignals = [
  "The same workload will run repeatedly after validation.",
  "Data handling, offline access, or internal control matters.",
  "The team wants to manage the runtime and model stack directly.",
  "You need a stable environment that does not depend entirely on a hosted interface.",
  "Learning or customizing the local AI stack is part of the project value.",
  "You already have enough evidence to size VRAM and storage carefully.",
] as const;

const saasSignals = [
  "The project mainly needs outputs rather than infrastructure ownership.",
  "Low setup time matters more than runtime customization.",
  "The team can accept vendor terms and external service constraints.",
  "Collaboration, account access, and workflow speed matter more than local control.",
  "The workload is occasional, uncertain, or not worth a dedicated local setup yet.",
  "A hosted API or app can cover the workflow without custom GPU management.",
] as const;

const validationSteps = [
  {
    title: "Estimate the workload shape",
    description:
      "Start with VRAM, model size, context, storage, and expected usage frequency before choosing a path.",
    href: "/tools/vram-calculator",
    cta: "Estimate VRAM",
  },
  {
    title: "Compare local constraints",
    description:
      "Review GPU profiles and build routes to understand what a local path would require.",
    href: "/gpu",
    cta: "Review GPU profiles",
  },
  {
    title: "Use cloud GPU as a test step",
    description:
      "If the workload is uncertain, cloud testing can validate memory and runtime needs before hardware planning.",
    href: "/guides/cloud-gpu-vs-local-gpu",
    cta: "Read cloud vs local guide",
  },
  {
    title: "Review AI tool records internally",
    description:
      "Use the source-aware AI tool data layer as planning context only. A public AI tools index has not been created yet.",
    href: null,
    cta: null,
  },
] as const;

const mistakes = [
  "Treating SaaS pricing, plans, or availability as stable without checking official pages.",
  "Buying a local GPU before estimating VRAM or validating the actual workflow.",
  "Ignoring privacy, data retention, account access, or team policy constraints.",
  "Comparing only output quality while ignoring setup time, maintenance, and operational risk.",
  "Assuming local AI always has lower long-term effort or SaaS is always simpler.",
  "Choosing tools from generic lists instead of mapping the workflow requirements first.",
] as const;

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: "article",
});

export default function LocalAiVsAiSaasGuidePage() {
  const settings = getSiteSettings();
  const pageUrl = buildCanonicalPath(PAGE_PATH);
  const aiToolItems = aiToolService.getAiToolListItems();
  const categoryLabels = Array.from(new Set(aiToolItems.map((item) => item.categoryLabel)));

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
            <span aria-current="page">Local AI vs AI SaaS</span>
          </nav>

          <header className="tool-hero guide-hero">
            <p className="eyebrow">Planning guide</p>
            <h1>{PAGE_TITLE}</h1>
            <p className="tool-lead">
              Decide whether to run AI locally, validate on cloud GPU, or use hosted AI SaaS and API tools. This guide
              focuses on workflow fit, not scored lists, prices, or monetized placements.
            </p>
            <div className="guide-hero-summary">
              <p>
                Use this page after estimating the workload shape. Local AI, cloud GPU testing, and SaaS tools are
                different planning paths, and each path changes control, setup effort, privacy review, and team
                workflow.
              </p>
              <div className="guide-hero-links">
                <Link href="/tools/vram-calculator">Estimate VRAM first</Link>
                <Link href="/guides/cloud-gpu-vs-local-gpu">Compare cloud vs local GPU</Link>
              </div>
            </div>
          </header>

          <p className="tool-disclaimer">
            Source-aware planning notice: this guide does not include monetized outbound links, payout claims, price
            amounts, availability claims, scored lists, benchmarks, commerce structured data, tool-evaluation structured
            data, or tool selection advice. Verify official tool and provider terms before cost or workflow planning.
          </p>

          <section className="tool-section guide-primary-section">
            <h2>Quick verdict</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {quickVerdicts.map((item) => (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5" key={item.title}>
                  <h3 className="text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Local AI vs AI SaaS tradeoff table</h2>
            <p className="related-note">
              Use this table to choose the next validation step. It does not score, rank, or recommend a tool path.
            </p>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Factor</th>
                    <th scope="col">Local AI planning</th>
                    <th scope="col">AI SaaS or API planning</th>
                  </tr>
                </thead>
                <tbody>
                  {tradeoffRows.map((row) => (
                    <tr key={row.factor}>
                      <th scope="row">{row.factor}</th>
                      <td>{row.local}</td>
                      <td>{row.saas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="tool-section">
            <h2>When local AI may make sense</h2>
            <p className="guide-section-lead">
              Local AI planning is strongest when the workflow benefits from control, repeat use, and a stable
              environment you can manage directly.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {localSignals.map((signal) => (
                <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4" key={signal}>
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <p className="text-[15px] leading-7 text-[var(--muted)]">{signal}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>When AI SaaS or API tools may make sense</h2>
            <p className="guide-section-lead">
              Hosted tools can fit when the team wants output, collaboration, and lower setup effort more than local
              runtime ownership.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {saasSignals.map((signal) => (
                <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4" key={signal}>
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <p className="text-[15px] leading-7 text-[var(--muted)]">{signal}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-provider-note">
            <h2>How AI tool data is used here</h2>
            <p>
              {settings.name} currently has {aiToolItems.length} source-aware AI tool planning records across{" "}
              {categoryLabels.length} categories: {categoryLabels.join(", ")}.
            </p>
            <p>
              Those records are internal planning references only. They keep affiliate or referral status unconfigured
              unless verified from official sources, and cost figures are not stored. A public AI tools index has not
              been created yet.
            </p>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Suggested validation workflow</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {validationSteps.map((step, index) => (
                <div className="flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5" key={step.title}>
                  <span className="font-mono text-xs font-extrabold text-[var(--primary)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[15px] leading-7 text-[var(--muted)]">{step.description}</p>
                  {step.href && step.cta ? (
                    <Link
                      className="mt-4 inline-flex w-fit items-center rounded-full border border-[var(--primary)] bg-white px-3 py-1.5 text-sm font-semibold text-[var(--primary)] transition-colors hover:!bg-[var(--primary)] hover:!text-white"
                      href={step.href}
                    >
                      {step.cta} <span className="ml-2" aria-hidden="true">-&gt;</span>
                    </Link>
                  ) : (
                    <span className="mt-4 inline-flex w-fit items-center rounded-full border border-[var(--border)] bg-[var(--surface-alt)] px-3 py-1.5 text-sm font-semibold text-[var(--muted)]">
                      Planned data layer only
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section explanation-grid guide-readability-grid">
            <div>
              <h2>Common mistakes</h2>
              <ul className="guide-factor-list">
                {mistakes.map((mistake) => (
                  <li key={mistake}>{mistake}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>Continue planning safely</h2>
              <p className="guide-section-copy">
                Use the next link that reduces uncertainty. Start with VRAM if hardware sizing is unclear, then compare
                local, cloud, and SaaS paths against your actual workflow constraints.
              </p>
              <div className="guide-hero-links">
                <Link href="/tools/vram-calculator">Open VRAM Calculator</Link>
                <Link href="/cloud-gpu">Review Cloud GPU providers</Link>
                <Link href="/builds">Open build planning</Link>
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
