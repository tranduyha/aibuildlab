import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateCta from "@/components/AffiliateCta";
import CloudGpuProviderCta from "@/components/CloudGpuProviderCta";
import CloudGpuProviderFacts from "@/components/CloudGpuProviderFacts";
import CloudGpuProviderNotice from "@/components/CloudGpuProviderNotice";
import { buildCanonicalUrl, buildMetadata, getSiteSettings } from "@/lib/seo";
import { cloudGpuProviderRepository } from "@/repositories/cloud-gpu-provider.repository";
import { cloudGpuProviderService } from "@/services/cloud-gpu-provider.service";
import type {
  CloudGpuDataConfidence,
  CloudGpuProvider,
  CloudGpuProviderStatus,
  CloudGpuUseCase,
} from "@/types/cloud-gpu-provider";

interface CloudGpuProviderDetailPageProps {
  params: Promise<{ slug: string }>;
}

const providerTypeLabels: Record<CloudGpuProvider["providerType"], string> = {
  ai_inference_platform: "AI inference platform",
  cloud_compute_provider: "Cloud compute provider",
  cloud_gpu_marketplace: "Cloud GPU marketplace",
  cloud_gpu_provider: "Cloud GPU provider",
  serverless_gpu: "Serverless GPU",
  unknown: "Needs verification",
};

const pricingModelLabels: Record<CloudGpuProvider["pricingModel"], string> = {
  credits: "Credits",
  custom: "Custom",
  hourly: "Hourly",
  per_second: "Per second",
  subscription: "Subscription",
  unknown: "Needs verification",
  usage_based: "Usage based",
};

const useCaseLabels: Record<CloudGpuUseCase, string> = {
  batch_jobs: "Batch jobs",
  cloud_vs_local_validation: "Cloud vs local validation",
  fine_tuning: "Fine-tuning",
  gpu_workstation_alternative: "GPU workstation alternative",
  local_llm_testing: "Local LLM testing",
  model_deployment: "Model deployment",
  notebooks: "Notebooks",
  serverless_inference: "Serverless inference",
  stable_diffusion: "Stable Diffusion / image workflow",
};

const useCaseDescriptions: Record<CloudGpuUseCase, string> = {
  batch_jobs: "Planning reference for queued or temporary workloads when source checks and billing terms still matter.",
  cloud_vs_local_validation: "Planning reference for testing workload fit before narrowing local hardware assumptions.",
  fine_tuning: "Planning reference for training-adjacent work that needs careful provider and terms verification.",
  gpu_workstation_alternative: "Planning reference for comparing external compute against local workstation constraints.",
  local_llm_testing: "Planning reference for checking model memory needs, runtime setup, and workflow friction.",
  model_deployment: "Planning reference for hosted model execution where deployment flow and terms should be checked.",
  notebooks: "Planning reference for notebook-style experiments where environment setup and persistence matter.",
  serverless_inference: "Planning reference for hosted execution patterns where billing model and runtime terms need review.",
  stable_diffusion: "Planning reference for image workflows where runtime setup, storage, and repeatability should be checked.",
};

const confidenceLabels: Record<CloudGpuDataConfidence, string> = {
  high: "High confidence",
  low: "Low confidence",
  medium: "Medium confidence",
};

const statusLabels: Record<CloudGpuProviderStatus, string> = {
  archived: "Archived",
  draft: "Draft",
  published: "Published",
  reviewed: "Reviewed",
};

const canTellItems = [
  "Source-backed provider type",
  "Broad planning use cases from the provider record",
  "Pricing model category when sourced",
  "Official source links and accessed dates",
] as const;

const cannotTellItems = [
  "Current GPU capacity or inventory",
  "Exact current cost for a workload",
  "Expected workload performance",
  "Whether this provider is the right fit for your situation",
] as const;

const profileUseSteps = [
  "Check whether the provider type matches your workflow.",
  "Compare the listed use cases with your workload.",
  "Estimate VRAM before cost planning.",
  "Verify pricing, capacity, and terms on official sources.",
] as const;

const faqItems = [
  {
    question: "Does this profile choose a provider?",
    answer:
      "No. This profile is a planning reference based on the current provider record and its listed sources. It does not rank providers or tell you which provider to choose.",
  },
  {
    question: "Does this page include current prices?",
    answer:
      "No. Exact current costs are not stored here unless a future record includes source-backed, timestamped pricing notes. Use the official provider pricing page before cost planning.",
  },
  {
    question: "What should I verify before using this provider?",
    answer:
      "Verify official pricing pages, terms, billing scope, data handling needs, workload constraints, and whether the provider still supports the type of work you plan to run.",
  },
  {
    question: "When should I test cloud before buying local hardware?",
    answer:
      "Testing can help when VRAM needs, runtime behavior, project duration, or setup effort are uncertain. Start with a VRAM estimate, then use cloud testing only as evidence for your own planning workflow.",
  },
  {
    question: "What source data does this profile use?",
    answer:
      "This profile uses the source entries listed on the page, including each source name, URL, type, field mapping, and accessed date. Treat those sources as the audit trail for what the profile can safely show.",
  },
] as const;

export async function generateStaticParams() {
  return cloudGpuProviderRepository
    .getCloudGpuProviderSlugs()
    .map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: CloudGpuProviderDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const detail = cloudGpuProviderService.getCloudGpuProviderDetail(slug);

  if (!detail) {
    return buildMetadata({
      title: "Cloud GPU provider profile not found",
      description: "The requested Cloud GPU provider planning profile was not found.",
      path: `/cloud-gpu/${slug}`,
    });
  }

  return buildMetadata({
    title: detail.provider.seoTitle,
    description: detail.provider.seoDescription,
    path: `/cloud-gpu/${detail.provider.slug}`,
    type: "article",
  });
}

export default async function CloudGpuProviderDetailPage({
  params,
}: CloudGpuProviderDetailPageProps) {
  const { slug } = await params;
  const detail = cloudGpuProviderService.getCloudGpuProviderDetail(slug);

  if (!detail) {
    notFound();
  }

  const { provider, dataConfidence } = detail;
  const siteSettings = getSiteSettings();
  const pagePath = `/cloud-gpu/${provider.slug}`;
  const pageUrl = buildCanonicalUrl(pagePath);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: provider.seoTitle,
      description: provider.seoDescription,
      url: pageUrl,
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
          item: buildCanonicalUrl("/cloud-gpu"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: provider.name,
          item: pageUrl,
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
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-5 py-8 sm:px-6 lg:px-8">
        <nav className="text-sm text-slate-600" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link className="text-sky-700 underline-offset-4 hover:underline" href="/">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link className="text-sky-700 underline-offset-4 hover:underline" href="/cloud-gpu">
                Cloud GPU
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-slate-900">
              {provider.name}
            </li>
          </ol>
        </nav>

        <header className="rounded-2xl border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 sm:py-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className="flex flex-wrap justify-center gap-2" aria-label="Provider data status">
              <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
                {statusLabels[provider.status]}
              </span>
              <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-800">
                {confidenceLabels[dataConfidence]}
              </span>
              {provider.needsReview ? (
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                  Needs verification
                </span>
              ) : null}
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-tight tracking-normal text-slate-950 sm:text-5xl">
              {provider.name}
            </h1>
            <p className="mt-4 max-w-2xl text-center text-base leading-7 text-slate-700">
              {provider.shortDescription}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-5 text-left">
            <dl className="grid gap-3 text-sm sm:grid-cols-2">
              <div className="rounded-md bg-slate-50 p-3">
                <dt className="font-semibold text-slate-950">Provider type</dt>
                <dd className="mt-1 text-slate-700">{providerTypeLabels[provider.providerType]}</dd>
              </div>
              <div className="rounded-md bg-slate-50 p-3">
                <dt className="font-semibold text-slate-950">Pricing model</dt>
                <dd className="mt-1 text-slate-700">{pricingModelLabels[provider.pricingModel]}</dd>
              </div>
            </dl>

            <p className="rounded-md border border-sky-200 bg-sky-50 p-4 text-sm leading-6 text-sky-950">
              This is a source-aware planning profile. Verify official provider pages before using this profile for workload or cost planning.
            </p>
          </div>
        </header>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="profile-use-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            How to use this profile
          </p>
          <h2 id="profile-use-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Use it as a planning checkpoint
          </h2>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {profileUseSteps.map((step) => (
              <div key={step} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-700">
                {step}
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="planning-fit-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Planning fit
          </p>
          <h2 id="planning-fit-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Listed use cases
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {provider.useCases.map((useCase) => (
              <article key={useCase} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-base font-semibold tracking-normal text-slate-950">
                  {useCaseLabels[useCase]}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {useCaseDescriptions[useCase]}
                </p>
              </article>
            ))}
          </div>
        </section>

        <CloudGpuProviderFacts provider={provider} showPlanningNotices={false} />
        <CloudGpuProviderNotice provider={provider} />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="profile-scope-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Profile scope
          </p>
          <h2 id="profile-scope-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            What this profile can and cannot tell you
          </h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
              <h3 className="text-base font-semibold tracking-normal text-emerald-950">Can tell you</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-emerald-950">
                {canTellItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="text-base font-semibold tracking-normal text-slate-950">Cannot tell you</h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-slate-700">
                {cannotTellItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <AffiliateCta
          affiliate={provider.affiliate}
          entitySlug={provider.slug}
          entityType="cloud-gpu-provider"
          merchant={provider.name}
          placement="cloud-provider-after-profile-scope"
          settings={siteSettings}
        />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="provider-sources-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sources
          </p>
          <h2 id="provider-sources-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Source trail for this profile
          </h2>
          <div className="mt-5 grid gap-4">
            {provider.sources.map((source) => (
              <article key={`${source.name}-${source.url}`} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-base font-semibold tracking-normal text-slate-950">
                      <a
                        className="text-sky-700 underline-offset-4 hover:underline"
                        href={source.url}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {source.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-slate-600">Type: {source.type}</p>
                  </div>
                  <p className="text-sm text-slate-600">Accessed: {source.accessedAt}</p>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-700">
                  Fields: {source.fields.join(", ")}
                </p>
                {source.notes ? (
                  <p className="mt-2 text-sm leading-6 text-slate-700">{source.notes}</p>
                ) : null}
              </article>
            ))}
          </div>
        </section>

        <CloudGpuProviderCta />
        <AffiliateCta
          affiliate={provider.affiliate}
          entitySlug={provider.slug}
          entityType="cloud-gpu-provider"
          merchant={provider.name}
          placement="cloud-provider-before-faq"
          settings={siteSettings}
          variant="compact"
        />

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm" aria-labelledby="provider-faq-heading">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            FAQ
          </p>
          <h2 id="provider-faq-heading" className="mt-2 text-2xl font-semibold tracking-normal text-slate-950">
            Provider planning questions
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
