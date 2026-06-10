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

export default function CloudGpuPage() {
  const siteSettings = getSiteSettings();
  const providerItems = cloudGpuProviderService.getCloudGpuProviderListItems();
  const providerCount = providerItems.length;

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
