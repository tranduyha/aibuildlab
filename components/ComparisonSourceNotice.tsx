import type { Comparison, Gpu } from "@/types";

interface ComparisonSourceNoticeProps {
  comparison: Comparison;
  gpus: Gpu[];
  missingGpuSlugs: string[];
}

export default function ComparisonSourceNotice({
  comparison,
  gpus,
  missingGpuSlugs,
}: ComparisonSourceNoticeProps) {
  const hasBenchmarkSource =
    comparison.sources.some((source) => source.type === "benchmark") ||
    gpus.some((gpu) => gpu.sources.some((source) => source.type === "benchmark"));

  return (
    <section className="tool-section">
      <h2>Sources and data confidence</h2>
      {comparison.sources.length > 0 ? (
        <ul className="source-list">
          {comparison.sources.map((source) => (
            <li key={`${source.name}-${source.url}`}>
              <a href={source.url} target="_blank" rel="noopener noreferrer">
                {source.name}
              </a>
              <span>{`${source.type} | verified ${source.accessedAt}`}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="related-note">
          This comparison uses source-backed GPU profile data where available. Benchmark-specific claims are
          not included.
        </p>
      )}
      <p className="related-note">
        Resolved GPU profiles: {gpus.length}. Missing linked GPU records:{" "}
        {missingGpuSlugs.length > 0 ? missingGpuSlugs.join(", ") : "none"}.
      </p>
      <div className="comparison-source-grid">
        {gpus.map((gpu) => {
          const sourceTypes = Array.from(new Set(gpu.sources.map((source) => source.type)));
          const hasVariantSpecific = gpu.sources.some((source) => source.scope === "variant-specific");

          return (
            <div key={gpu.slug}>
              <h3>{gpu.name}</h3>
              <p>Confidence: {gpu.dataConfidence}</p>
              <p>Source types: {sourceTypes.length > 0 ? sourceTypes.join(", ") : "none attached"}</p>
              {hasVariantSpecific ? <p>Includes manufacturer / variant-specific fields.</p> : null}
            </div>
          );
        })}
      </div>
      {!hasBenchmarkSource ? (
        <p className="tool-disclaimer">
          No benchmark source is attached to this comparison, so benchmark claims are not included.
        </p>
      ) : null}
    </section>
  );
}
