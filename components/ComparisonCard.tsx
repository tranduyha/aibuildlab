import Link from "next/link";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import { comparisonService } from "@/services/comparison.service";
import type { Comparison, Gpu } from "@/types";

interface ComparisonCardProps {
  comparison: Comparison;
  gpus: Gpu[];
  gpuNames: string[];
}

export default function ComparisonCard({ comparison, gpus, gpuNames }: ComparisonCardProps) {
  const intent = comparisonService.getComparisonIntent(comparison, gpus);

  return (
    <article className="comparison-card">
      <DataConfidenceBadge gpu={comparison} />
      <h2>
        <Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link>
      </h2>
      <p>{comparison.shortDescription}</p>
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
