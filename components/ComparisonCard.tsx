import Link from "next/link";
import { comparisonService } from "@/services/comparison.service";
import type { Comparison, ComparisonProfile, Gpu } from "@/types";

interface ComparisonCardProps {
  comparison: Comparison;
  gpus: Gpu[];
  gpuNames: string[];
  profile?: ComparisonProfile;
}

export default function ComparisonCard({ comparison, gpus, gpuNames, profile }: ComparisonCardProps) {
  const intent = comparisonService.getComparisonIntent(comparison, gpus);
  const cardDescription = profile?.decisionSummary ?? comparison.shortDescription;
  const firstReason = profile?.whyThisPairMatters[0]?.description;

  return (
    <article className="comparison-card">
      <p className="comparison-card-status">
        {comparison.status === "draft" ? "Draft planning page" : "Source-aware comparison"}
      </p>
      <h4>
        <Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link>
      </h4>
      <p>{cardDescription}</p>
      {firstReason ? <p className="comparison-card-reason">{firstReason}</p> : null}
      <p className="comparison-card-intent">{intent}</p>
      <p className="comparison-card-gpus">
        Compared GPUs: {gpuNames.length > 0 ? gpuNames.join(" vs ") : "Needs verification"}
      </p>
      {gpus.length > 0 ? (
        <dl className="comparison-card-specs">
          {gpus.map((gpu) => (
            <div key={gpu.slug}>
              <dt>{gpu.name}</dt>
              <dd>{comparisonService.getGpuHint(gpu)}</dd>
            </div>
          ))}
        </dl>
      ) : null}
      <Link className="comparison-card-cta" href={`/compare/${comparison.slug}`}>
        View comparison <span>&rarr;</span>
      </Link>
    </article>
  );
}
