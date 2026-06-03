import type { CloudGpuProvider } from "@/types/cloud-gpu-provider";

interface CloudGpuProviderFactsProps {
  provider: CloudGpuProvider;
  showPlanningNotices?: boolean;
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

const affiliateStatusLabels: Record<CloudGpuProvider["affiliateStatus"], string> = {
  available_unverified: "Affiliate program unverified",
  available_verified: "Affiliate program verified",
  not_applicable: "Not applicable",
  referral_verified: "Referral verified",
  unavailable: "No program verified",
  unknown: "Unknown",
};

function formatValue(value: string | null): string {
  return value && value.trim().length > 0 ? value : "Needs verification";
}

export default function CloudGpuProviderFacts({
  provider,
  showPlanningNotices = true,
}: CloudGpuProviderFactsProps) {
  const hasVerifiedReferral =
    provider.affiliateStatus === "referral_verified" ||
    provider.affiliateStatus === "available_verified";

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="provider-facts-heading">
      <h2 id="provider-facts-heading" className="text-lg font-semibold tracking-normal text-slate-950">
        Provider facts
      </h2>

      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Official website</dt>
          <dd className="mt-1 break-words text-slate-700">
            <a
              className="text-sky-700 underline-offset-4 hover:underline"
              href={provider.officialWebsiteUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {provider.officialWebsiteUrl}
            </a>
          </dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Provider type</dt>
          <dd className="mt-1 text-slate-700">{providerTypeLabels[provider.providerType]}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Pricing model</dt>
          <dd className="mt-1 text-slate-700">{pricingModelLabels[provider.pricingModel]}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Affiliate status</dt>
          <dd className="mt-1 text-slate-700">{affiliateStatusLabels[provider.affiliateStatus]}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Last verified</dt>
          <dd className="mt-1 text-slate-700">{formatValue(provider.lastVerifiedAt)}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3">
          <dt className="font-semibold text-slate-950">Data confidence</dt>
          <dd className="mt-1 capitalize text-slate-700">{provider.dataConfidence}</dd>
        </div>
        <div className="rounded-md bg-slate-50 p-3 sm:col-span-2">
          <dt className="font-semibold text-slate-950">Status</dt>
          <dd className="mt-1 capitalize text-slate-700">{provider.status}</dd>
        </div>
      </dl>

      <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
        {showPlanningNotices && provider.pricingNotes === null ? (
          <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-900">
            Exact pricing is not stored. Check the official provider pricing page before cost planning.
          </p>
        ) : null}
        {showPlanningNotices && provider.affiliateStatus === "unknown" ? (
          <p className="rounded-md border border-amber-200 bg-amber-50 p-3 text-amber-900">
            Affiliate or referral status has not been verified from an official source.
          </p>
        ) : null}
        {showPlanningNotices && hasVerifiedReferral ? (
          <p className="rounded-md border border-sky-200 bg-sky-50 p-3 text-sky-900">
            Referral or affiliate status is linked to an official source, but terms should be rechecked before use.
          </p>
        ) : null}
        {provider.affiliateProgramUrl ? (
          <p className="text-xs leading-5 text-slate-600">
            Referral reference:{" "}
            <a
              className="text-sky-700 underline-offset-4 hover:underline"
              href={provider.affiliateProgramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              official program page
            </a>
          </p>
        ) : null}
      </div>
    </section>
  );
}
