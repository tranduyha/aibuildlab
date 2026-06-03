import Link from "next/link";

const planningLinks = [
  {
    href: "/tools/vram-calculator",
    label: "Estimate VRAM first",
    primary: true,
  },
  {
    href: "/guides/cloud-gpu-vs-local-gpu",
    label: "Read Cloud GPU vs Local GPU guide",
  },
  {
    href: "/builds",
    label: "Review local build planning",
  },
  {
    href: "/cloud-gpu",
    label: "Back to Cloud GPU providers",
    backLink: true,
  },
];

interface CloudGpuProviderCtaProps {
  includeBackLink?: boolean;
}

export default function CloudGpuProviderCta({
  includeBackLink = true,
}: CloudGpuProviderCtaProps) {
  const visibleLinks = includeBackLink
    ? planningLinks
    : planningLinks.filter((link) => !link.backLink);

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm" aria-labelledby="cloud-gpu-cta-heading">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Planning next steps</p>
      <h2 id="cloud-gpu-cta-heading" className="mt-2 text-lg font-semibold tracking-normal text-slate-950">
        Continue with source-aware planning
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {visibleLinks.map((link) => (
          <Link
            key={link.href}
            className={
              link.primary
                ? "inline-flex items-center justify-between rounded-md border border-sky-700 bg-sky-700 px-4 py-3 text-sm font-semibold !text-white transition hover:border-sky-800 hover:bg-sky-800 hover:!text-white focus-visible:!text-white"
                : "inline-flex items-center justify-between rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-300 hover:bg-white"
            }
            href={link.href}
          >
            <span>{link.label}</span>
            <span className="ml-3" aria-hidden="true">-&gt;</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
