import type { Comparison, Gpu } from "@/types";

interface ComparisonVerdictProps {
  comparison: Comparison;
  gpus: Gpu[];
}

function getPlanningLabels(gpus: Gpu[]): string[] {
  if (gpus.length < 2) {
    return ["Not enough verified data for a clear planning preference."];
  }

  const labels: string[] = [];
  const [first, second] = gpus;

  if (first.vramGb !== null && second.vramGb !== null && first.vramGb !== second.vramGb) {
    labels.push(
      first.vramGb > second.vramGb
        ? `${first.name}: Better VRAM headroom`
        : `${second.name}: Better VRAM headroom`,
    );
  }

  if (
    first.memoryBandwidthGbps !== null &&
    first.memoryBandwidthGbps !== undefined &&
    second.memoryBandwidthGbps !== null &&
    second.memoryBandwidthGbps !== undefined &&
    first.memoryBandwidthGbps !== second.memoryBandwidthGbps
  ) {
    labels.push(
      first.memoryBandwidthGbps > second.memoryBandwidthGbps
        ? `${first.name}: Higher memory bandwidth`
        : `${second.name}: Higher memory bandwidth`,
    );
  }

  if (
    first.powerConsumptionWatts !== null &&
    first.powerConsumptionWatts !== undefined &&
    second.powerConsumptionWatts !== null &&
    second.powerConsumptionWatts !== undefined &&
    first.powerConsumptionWatts !== second.powerConsumptionWatts
  ) {
    labels.push(
      first.powerConsumptionWatts < second.powerConsumptionWatts
        ? `${first.name}: Lower power planning profile`
        : `${second.name}: Lower power planning profile`,
    );
  }

  labels.push("Needs benchmark evidence");
  return labels;
}

export default function ComparisonVerdict({ comparison, gpus }: ComparisonVerdictProps) {
  const labels = getPlanningLabels(gpus);

  return (
    <section className="comparison-verdict">
      <h2>Cautious verdict</h2>
      <div className="comparison-verdict-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      {comparison.verdict ? <p>{comparison.verdict}</p> : null}
      <p>
        {gpus.length < 2
          ? "One or more GPU records are unresolved in this seed entry, so treat this page as a draft planning scaffold."
          : "Benchmark-specific claims are intentionally excluded until controlled benchmark sources are attached."}
      </p>
    </section>
  );
}
