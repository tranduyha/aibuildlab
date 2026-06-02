import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import type { Gpu } from "@/types";

interface ComparisonHeroVisualProps {
  gpus: Gpu[];
}

type DisplayValue = string | number | null | undefined;

const SOURCE_REQUIRED_FIELDS = new Set<keyof Gpu>([
  "vramGb",
  "memoryType",
  "memoryBandwidthGbps",
  "powerConsumptionWatts",
  "tgpWatts",
  "tbpWatts",
  "boardPowerWatts",
]);

function hasSourceForField(gpu: Gpu, key: keyof Gpu): boolean {
  if (!SOURCE_REQUIRED_FIELDS.has(key)) {
    return true;
  }

  return gpu.sources.some((source) => source.fields.includes(String(key)));
}

function formatField(gpu: Gpu, key: keyof Gpu, suffix = ""): string {
  const value = gpu[key] as DisplayValue;

  if (value === null || value === undefined || value === "" || !hasSourceForField(gpu, key)) {
    return "Needs verification";
  }

  return `${value}${suffix}`;
}

function getPowerValue(gpu: Gpu): string {
  const fields: Array<{ key: keyof Gpu; suffix: string }> = [
    { key: "powerConsumptionWatts", suffix: " W" },
    { key: "tgpWatts", suffix: " W" },
    { key: "tbpWatts", suffix: " W" },
    { key: "boardPowerWatts", suffix: " W" },
  ];

  for (const field of fields) {
    const value = formatField(gpu, field.key, field.suffix);
    if (value !== "Needs verification") {
      return value;
    }
  }

  return "Needs verification";
}

export default function ComparisonHeroVisual({ gpus }: ComparisonHeroVisualProps) {
  if (gpus.length === 0) {
    return null;
  }

  return (
    <section className="comparison-hero-visual" aria-label="At-a-glance GPU comparison">
      <div className="comparison-hero-track" aria-hidden="true">
        <span />
        <strong>VS</strong>
        <span />
      </div>
      <div className="comparison-hero-cards">
        {gpus.slice(0, 2).map((gpu, index) => (
          <article className="comparison-hero-card" key={gpu.slug}>
            <div className="comparison-hero-card-top">
              <span>{index === 0 ? "GPU A" : "GPU B"}</span>
              <DataConfidenceBadge gpu={gpu} />
            </div>
            <h2>{gpu.name}</h2>
            <dl>
              <div>
                <dt>VRAM</dt>
                <dd>{formatField(gpu, "vramGb", " GB")}</dd>
              </div>
              <div>
                <dt>Memory type</dt>
                <dd>{formatField(gpu, "memoryType")}</dd>
              </div>
              <div>
                <dt>Bandwidth</dt>
                <dd>{formatField(gpu, "memoryBandwidthGbps", " GB/s")}</dd>
              </div>
              <div>
                <dt>Board power / TGP</dt>
                <dd>{getPowerValue(gpu)}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}
