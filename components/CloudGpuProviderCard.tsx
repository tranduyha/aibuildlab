import Link from "next/link";
import type { CloudGpuProviderListItem } from "@/services/cloud-gpu-provider.service";
import type {
  CloudGpuDataConfidence,
  CloudGpuProvider,
  CloudGpuProviderStatus,
} from "@/types/cloud-gpu-provider";

interface CloudGpuProviderCardProps {
  item: CloudGpuProviderListItem;
  profileHref?: string | null;
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

const useCaseLabels: Record<CloudGpuProvider["useCases"][number], string> = {
  batch_jobs: "Batch jobs",
  cloud_vs_local_validation: "Cloud vs local validation",
  fine_tuning: "Fine-tuning",
  gpu_workstation_alternative: "GPU workstation alternative",
  local_llm_testing: "Local LLM testing",
  model_deployment: "Model deployment",
  notebooks: "Notebooks",
  serverless_inference: "Serverless inference",
  stable_diffusion: "Stable Diffusion",
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

function formatUseCases(provider: CloudGpuProvider): string {
  if (provider.useCases.length === 0) {
    return "Needs verification";
  }

  return provider.useCases.map((useCase) => useCaseLabels[useCase]).join(", ");
}

export default function CloudGpuProviderCard({
  item,
  profileHref,
}: CloudGpuProviderCardProps) {
  const { provider, dataConfidence } = item;
  const resolvedProfileHref = profileHref === undefined ? `/cloud-gpu/${provider.slug}` : profileHref;

  const statusText = [
    statusLabels[provider.status],
    confidenceLabels[dataConfidence],
    provider.needsReview ? "Needs verification" : null,
  ]
    .filter((value): value is string => Boolean(value))
    .join(" · ");

  return (
    <article className="flex h-full min-w-0 flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="truncate whitespace-nowrap text-xl font-semibold tracking-normal text-slate-950">
        {resolvedProfileHref ? (
          <Link className="hover:text-sky-700" href={resolvedProfileHref}>
            {provider.name}
          </Link>
        ) : (
          provider.name
        )}
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-700">{provider.shortDescription}</p>
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        {statusText}
      </p>

      <dl className="mt-5 grid gap-3 text-sm">
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Provider type</dt>
          <dd className="mt-1 text-slate-700">{providerTypeLabels[provider.providerType]}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Use cases</dt>
          <dd className="mt-1 text-slate-700">{formatUseCases(provider)}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Pricing model</dt>
          <dd className="mt-1 text-slate-700">{pricingModelLabels[provider.pricingModel]}</dd>
        </div>
      </dl>

      <div className="mt-auto pt-5">
        {resolvedProfileHref ? (
          <Link
            className="inline-flex w-fit items-center rounded-md border border-sky-700 bg-sky-700 px-4 py-2 text-sm font-semibold !text-white transition hover:border-sky-800 hover:bg-sky-800 hover:!text-white focus-visible:!text-white"
            href={resolvedProfileHref}
          >
            View planning profile <span className="ml-2" aria-hidden="true">-&gt;</span>
          </Link>
        ) : (
          <span className="inline-flex w-fit items-center rounded-md border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-600">
            View planning profile
          </span>
        )}
      </div>
    </article>
  );
}
