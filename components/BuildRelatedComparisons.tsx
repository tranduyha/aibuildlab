import Link from "next/link";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import type { Comparison } from "@/types";

interface BuildRelatedComparisonsProps {
  comparisons: Comparison[];
  missingComparisonSlugs: string[];
}

export default function BuildRelatedComparisons({
  comparisons,
  missingComparisonSlugs,
}: BuildRelatedComparisonsProps) {
  if (comparisons.length === 0 && missingComparisonSlugs.length === 0) {
    return <p className="related-note">No existing comparison pages are linked yet.</p>;
  }

  return (
    <div className="build-comparison-grid">
      {comparisons.map((comparison) => (
        <article className="build-comparison-card" key={comparison.slug}>
          <DataConfidenceBadge gpu={comparison} />
          <h3>
            <Link href={`/compare/${comparison.slug}`}>{comparison.title}</Link>
          </h3>
          <p>{comparison.shortDescription}</p>
          <Link className="build-card-cta" href={`/compare/${comparison.slug}`}>
            View comparison <span>&rarr;</span>
          </Link>
        </article>
      ))}
      {missingComparisonSlugs.length > 0 ? (
        <p className="related-note">Missing linked comparison pages: {missingComparisonSlugs.join(", ")}.</p>
      ) : null}
    </div>
  );
}
