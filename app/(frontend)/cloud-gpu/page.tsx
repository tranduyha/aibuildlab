import Link from "next/link";
import type { Metadata } from "next";
import CloudGpuProviderCard from "@/components/CloudGpuProviderCard";
import CloudGpuProviderCta from "@/components/CloudGpuProviderCta";
import CloudGpuProviderNotice from "@/components/CloudGpuProviderNotice";
import { buildCanonicalUrl, buildMetadata, getSiteSettings } from "@/lib/seo";
import { cloudGpuProviderService } from "@/services/cloud-gpu-provider.service";
import type { CloudGpuUseCase } from "@/types/cloud-gpu-provider";

const PAGE_TITLE = "Cloud GPU Providers for AI Workload Planning";
const PAGE_DESCRIPTION =
  "Review source-aware Cloud GPU provider profiles for AI workload planning, with provider types, use cases, pricing notes, and verification warnings.";
const PAGE_PATH = "/cloud-gpu";

const sourceNotices = [
  "Cloud GPU provider pricing and capacity can change, so cost planning should be checked against official provider pages.",
  "Provider terms, referral policies, and billing details should be verified on official pages before use.",
  "These provider records are planning references, not rankings, pricing tables, or buying advice.",
  "No provider ranking is provided on this page.",
];

const planningSteps = [
  {
    title: "Estimate VRAM first",
    description:
      "Start with a memory target so provider research is tied to the workload rather than a vague hardware label.",
  },
  {
    title: "Compare local vs cloud tradeoffs",
    description:
      "Think about setup time, privacy, repeat usage, storage movement, and whether cloud testing reduces early uncertainty.",
  },
  {
    title: "Review provider profile",
    description:
      "Use each provider card as a neutral planning snapshot of provider type, use cases, pricing model, and data status.",
  },
  {
    title: "Verify provider terms before use",
    description:
      "Check official pages for current billing details, terms, and workload constraints before making operational plans.",
  },
] as const;

const decisionSignals = [
  {
    title: "Use cloud first",
    description:
      "Use cloud testing when the model, image workflow, or runtime stack is still uncertain and a short validation run can reduce hardware commitment risk.",
  },
  {
    title: "Use local first",
    description:
      "Plan local hardware first when the workload is repeated, data movement is sensitive, and the VRAM target is already clear from calculator and profile checks.",
  },
  {
    title: "Use a hybrid path",
    description:
      "Test the uncertain parts in cloud, then compare the result against local GPU tiers before treating a workstation purchase as justified.",
  },
] as const;

const useCaseOrder: Array<{
  key: CloudGpuUseCase;
  label: string;
  description: string;
}> = [
  {
    key: "local_llm_testing",
    label: "Local LLM testing",
    description: "Short validation runs for model memory needs, runtime setup, and workflow fit.",
  },
  {
    key: "stable_diffusion",
    label: "Stable Diffusion / image workflow",
    description: "Image workflow experiments where runtime setup, storage, and repeatability matter.",
  },
  {
    key: "fine_tuning",
    label: "Fine-tuning",
    description: "Training-adjacent work that needs careful source checks before planning infrastructure.",
  },
  {
    key: "batch_jobs",
    label: "Batch jobs",
    description: "Temporary or repeatable queued workloads where usage pattern matters more than provider labels.",
  },
  {
    key: "serverless_inference",
    label: "Serverless inference",
    description: "Hosted execution patterns where billing model, deployment flow, and terms need verification.",
  },
  {
    key: "cloud_vs_local_validation",
    label: "Cloud vs local validation",
    description: "Testing a workload before deciding whether local hardware planning is practical.",
  },
];

const workloadFitRows: Array<{
  intent: string;
  useCase: CloudGpuUseCase;
  route: string;
  routeLabel: string;
  check: string;
}> = [
  {
    intent: "Local LLM memory test",
    useCase: "local_llm_testing",
    route: "/tools/vram-calculator",
    routeLabel: "Estimate VRAM",
    check: "Start from a model and context estimate, then validate provider terms and runtime setup.",
  },
  {
    intent: "Image generation workflow",
    useCase: "stable_diffusion",
    route: "/guides/image-generation-vram-planning",
    routeLabel: "Plan image VRAM",
    check: "Check resolution, precision, batch size, storage movement, and whether the provider supports your workflow.",
  },
  {
    intent: "Cloud vs local decision",
    useCase: "cloud_vs_local_validation",
    route: "/guides/cloud-gpu-vs-local-gpu",
    routeLabel: "Compare cloud vs local",
    check: "Use cloud as a validation step when workload duration, VRAM fit, or setup risk is unclear.",
  },
  {
    intent: "Temporary batch or hosted execution",
    useCase: "batch_jobs",
    route: "/guides/local-ai-vs-ai-saas",
    routeLabel: "Compare hosted options",
    check: "Review billing model, deployment flow, acceptable-use terms, and repeatability before relying on a provider.",
  },
] as const;

const faqItems = [
  {
    question: "Are these cloud GPU providers ranked?",
    answer:
      "No. This page is a source-aware planning hub, not a ranked list. Provider cards are presented as neutral references so you can compare fit, data status, and verification needs.",
  },
  {
    question: "Does this page show current cloud GPU prices?",
    answer:
      "No. Exact provider prices are not stored here because billing details can change quickly. Check the official provider pricing page before cost planning.",
  },
  {
    question: "Should I test cloud GPU before buying local hardware?",
    answer:
      "It can be useful when VRAM needs, runtime behavior, or project duration are uncertain. Use the VRAM calculator and the cloud-vs-local guide first so testing has a clear planning target.",
  },
  {
    question: "Why should I verify provider terms?",
    answer:
      "Cloud GPU billing, capacity, referral policies, acceptable-use terms, and workload constraints can change over time. Official provider pages should be the final source before you rely on a provider for real work.",
  },
  {
    question: "Are affiliate links used here?",
    answer:
      "This hub does not use affiliate CTAs. If a provider record has referral information in the data model, it should remain transparent and secondary to official source checks.",
  },
] as const;

export const metadata: Metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

function countProvidersForUseCase(
  providers: ReturnType<typeof cloudGpuProviderService.getCloudGpuProviderListItems>,
  useCase: CloudGpuUseCase,
): number {
  return providers.filter((item) => item.provider.useCases.includes(useCase)).length;
}

function formatReviewDate(value: string | null): string {
  if (!value) {
    return "Needs verification";
  }

  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function CloudGpuPage() {
  const siteSettings = getSiteSettings();
  const providerItems = cloudGpuProviderService.getCloudGpuProviderListItems();
  const providerCount = providerItems.length;
  const reviewedProviderCount = providerItems.filter(
    ({ provider }) => provider.status === "reviewed" || provider.status === "published",
  ).length;
  const sourceCount = providerItems.reduce((total, { provider }) => total + provider.sources.length, 0);
  const latestVerifiedAt = providerItems
    .map(({ provider }) => provider.lastVerifiedAt)
    .filter((value): value is string => Boolean(value))
    .sort()
    .at(-1) ?? null;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: buildCanonicalUrl(PAGE_PATH),
      isPartOf: {
        "@type": "WebSite",
        name: siteSettings.name,
        url: siteSettings.siteUrl,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteSettings.siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Cloud GPU",
          item: buildCanonicalUrl(PAGE_PATH),
        },
      ],
    },
    {
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
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "Cloud GPU provider planning profiles",
      itemListElement: providerItems.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.provider.name,
        url: buildCanonicalUrl(`/cloud-gpu/${item.provider.slug}`),
      })),
    },
  ];

  return (
    <div className="bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 py-8 sm:px-6 lg:px-8">
        <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Cloud GPU</span>
        </nav>

        <header className="grid gap-5 rounded-lg border border-slate-200 bg-white p-6 shadow-sm lg:grid-cols-[1fr_280px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
              Cloud GPU planning hub
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              Cloud GPU Providers for AI Workload Planning
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-slate-700">
              Review source-aware Cloud GPU provider profiles after estimating VRAM and comparing cloud versus local tradeoffs. This hub is not a ranking page, pricing table, or buying advice.
            </p>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-semibold text-slate-950">Provider records</p>
            <p className="mt-2 text-4xl font-semibold tracking-normal text-slate-950">{providerCount}</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Source-aware planning profiles currently available in the data layer.
            </p>
          </div>
        </header>

        <CloudGpuProviderNotice notices={sourceNotices} />

        <section aria-labelledby="cloud-gpu-decision-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Decision route
          </p>
          <h2 id="cloud-gpu-decision-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Decide whether cloud GPU testing belongs before local hardware
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {decisionSignals.map((signal) => (
              <article key={signal.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-semibold tracking-normal text-slate-950">{signal.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{signal.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="cloud-gpu-providers-heading">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Provider cards
              </p>
              <h2 id="cloud-gpu-providers-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
                Source-aware provider profiles
              </h2>
            </div>
            <p className="text-sm text-slate-600">{providerCount} providers shown</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {providerItems.map((item) => (
              <CloudGpuProviderCard key={item.provider.slug} item={item} />
            ))}
          </div>
        </section>

        <section aria-labelledby="how-to-use-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            How to use this page
          </p>
          <h2 id="how-to-use-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Plan from workload to provider terms
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {planningSteps.map((step) => (
              <article key={step.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-semibold tracking-normal text-slate-950">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{step.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="cloud-gpu-workload-fit-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Workload fit
          </p>
          <h2 id="cloud-gpu-workload-fit-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Match the cloud GPU profile to the job you are validating
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200">
            <div className="grid gap-0 bg-slate-200 text-sm md:grid-cols-[1.1fr_0.7fr_1fr_1.3fr]">
              <div className="bg-slate-100 p-3 font-semibold text-slate-950">Planning intent</div>
              <div className="bg-slate-100 p-3 font-semibold text-slate-950">Matching profiles</div>
              <div className="bg-slate-100 p-3 font-semibold text-slate-950">Next route</div>
              <div className="bg-slate-100 p-3 font-semibold text-slate-950">What to verify</div>
              {workloadFitRows.map((row) => (
                <div key={row.intent} className="contents">
                  <div className="bg-white p-3 text-slate-800">{row.intent}</div>
                  <div className="bg-white p-3 text-slate-700">{countProvidersForUseCase(providerItems, row.useCase)} providers</div>
                  <div className="bg-white p-3">
                    <Link className="font-semibold text-sky-700 hover:text-sky-800" href={row.route}>
                      {row.routeLabel}
                    </Link>
                  </div>
                  <div className="bg-white p-3 text-slate-700">{row.check}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section aria-labelledby="cloud-gpu-use-cases-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Neutral use cases
          </p>
          <h2 id="cloud-gpu-use-cases-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Cloud GPU use-case categories
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {useCaseOrder.map((useCase) => (
              <article key={useCase.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-base font-semibold tracking-normal text-slate-950">{useCase.label}</h3>
                  <span className="shrink-0 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {countProvidersForUseCase(providerItems, useCase.key)} providers
                  </span>
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">{useCase.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="cloud-gpu-source-snapshot-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Source coverage
          </p>
          <h2 id="cloud-gpu-source-snapshot-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            What the hub currently verifies
          </h2>
          <dl className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-sm font-semibold text-slate-950">Reviewed profiles</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">{reviewedProviderCount}</dd>
              <p className="mt-2 text-sm leading-6 text-slate-700">Provider records with reviewed or published status.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-sm font-semibold text-slate-950">Source references</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">{sourceCount}</dd>
              <p className="mt-2 text-sm leading-6 text-slate-700">Official, documentation, pricing, terms, referral, and manual-check references in provider data.</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <dt className="text-sm font-semibold text-slate-950">Latest provider review</dt>
              <dd className="mt-2 text-3xl font-semibold tracking-normal text-slate-950">{formatReviewDate(latestVerifiedAt)}</dd>
              <p className="mt-2 text-sm leading-6 text-slate-700">Use this as a data freshness signal, not as proof of current price or availability.</p>
            </div>
          </dl>
        </section>

        <CloudGpuProviderCta includeBackLink={false} />

        <section aria-labelledby="cloud-gpu-faq-heading" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            FAQ
          </p>
          <h2 id="cloud-gpu-faq-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Cloud GPU provider planning questions
          </h2>
          <div className="mt-5 grid gap-4">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-semibold tracking-normal text-slate-950">{item.question}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </div>
    </div>
  );
}
