import type { Comparison, Gpu } from "@/types";

interface ComparisonVerdictProps {
  comparison: Comparison;
  gpus: Gpu[];
}

const SOURCE_REQUIRED_FIELDS = new Set<keyof Gpu>([
  "vramGb",
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

function getNumberField(gpu: Gpu, key: keyof Gpu): number | null {
  const value = gpu[key];

  if (typeof value !== "number" || !hasSourceForField(gpu, key)) {
    return null;
  }

  return value;
}

function getPowerValue(gpu: Gpu): number | null {
  const fields: Array<keyof Gpu> = [
    "powerConsumptionWatts",
    "tgpWatts",
    "tbpWatts",
    "boardPowerWatts",
  ];

  for (const field of fields) {
    const value = getNumberField(gpu, field);
    if (value !== null) {
      return value;
    }
  }

  return null;
}

function compareHigher(first: Gpu, second: Gpu, key: keyof Gpu, label: string): string | null {
  const firstValue = getNumberField(first, key);
  const secondValue = getNumberField(second, key);

  if (firstValue === null || secondValue === null || firstValue === secondValue) {
    return null;
  }

  return firstValue > secondValue
    ? `${first.name}: ${label}`
    : `${second.name}: ${label}`;
}

function getPlanningLabels(gpus: Gpu[]): string[] {
  if (gpus.length < 2) {
    return ["Needs more resolved GPU data"];
  }

  const [first, second] = gpus;
  const labels = [
    compareHigher(first, second, "vramGb", "More VRAM headroom"),
    compareHigher(first, second, "memoryBandwidthGbps", "Higher listed memory bandwidth"),
  ].filter((label): label is string => Boolean(label));

  const firstPower = getPowerValue(first);
  const secondPower = getPowerValue(second);
  if (firstPower !== null && secondPower !== null && firstPower !== secondPower) {
    labels.push(
      firstPower < secondPower
        ? `${first.name}: Lower listed power planning`
        : `${second.name}: Lower listed power planning`,
    );
  }

  return labels;
}

function getVerdictCopy(gpus: Gpu[]): string[] {
  if (gpus.length < 2) {
    return [
      "One or more GPU records are unresolved in this seed entry, so this page should be treated as a planning scaffold.",
      "No benchmark conclusion is available until the compared records and workload evidence are attached.",
    ];
  }

  const [first, second] = gpus;
  const observations: string[] = [];
  const firstVram = getNumberField(first, "vramGb");
  const secondVram = getNumberField(second, "vramGb");
  const firstBandwidth = getNumberField(first, "memoryBandwidthGbps");
  const secondBandwidth = getNumberField(second, "memoryBandwidthGbps");
  const firstPower = getPowerValue(first);
  const secondPower = getPowerValue(second);

  if (firstVram !== null && secondVram !== null && firstVram !== secondVram) {
    observations.push(
      firstVram > secondVram
        ? `${first.name} has more source-backed VRAM headroom than ${second.name}.`
        : `${second.name} has more source-backed VRAM headroom than ${first.name}.`,
    );
  }

  if (firstBandwidth !== null && secondBandwidth !== null && firstBandwidth !== secondBandwidth) {
    observations.push(
      firstBandwidth > secondBandwidth
        ? `${first.name} has higher listed memory bandwidth than ${second.name}.`
        : `${second.name} has higher listed memory bandwidth than ${first.name}.`,
    );
  }

  if (firstPower !== null && secondPower !== null && firstPower !== secondPower) {
    observations.push(
      firstPower < secondPower
        ? `${first.name} has the lower listed power planning figure.`
        : `${second.name} has the lower listed power planning figure.`,
    );
  }

  const summary =
    observations.length > 0
      ? observations.slice(0, 2).join(" ")
      : "Available source-backed planning fields do not create a clear split between these GPUs yet.";

  return [summary];
}

export default function ComparisonVerdict({ comparison, gpus }: ComparisonVerdictProps) {
  const labels = getPlanningLabels(gpus);
  const paragraphs = comparison.verdict ? [comparison.verdict] : getVerdictCopy(gpus);
  const pairName = gpus.length >= 2 ? `${gpus[0].name} vs ${gpus[1].name}` : comparison.title;

  return (
    <section className="comparison-verdict">
      <h2>Source-backed planning signals</h2>
      <div className="comparison-verdict-labels">
        {labels.map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      <p>
        Use the {pairName} signals as prompts for the validation sections below; this component does not add
        benchmark, price, availability, or purchase claims.
      </p>
    </section>
  );
}
