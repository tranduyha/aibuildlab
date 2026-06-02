import type { Gpu } from "@/types";

interface ComparisonTableProps {
  gpus: Gpu[];
}

const SOURCE_REQUIRED_FIELDS = new Set<keyof Gpu>([
  "architecture",
  "vramGb",
  "memoryType",
  "memoryBusBit",
  "memoryBandwidthGbps",
  "cudaCores",
  "computeUnits",
  "xeCores",
  "powerConsumptionWatts",
  "recommendedPsuWatts",
]);

function hasSourceForField(gpu: Gpu, key: keyof Gpu): boolean {
  if (!SOURCE_REQUIRED_FIELDS.has(key)) {
    return true;
  }

  return gpu.sources.some((source) => source.fields.includes(String(key)));
}

function getFieldValue(gpu: Gpu, key: keyof Gpu): string {
  if ((key === "cudaCores" && gpu.vendor !== "NVIDIA") || (key === "xeCores" && gpu.vendor !== "Intel")) {
    return "Not applicable";
  }

  if (key === "computeUnits" && gpu.vendor !== "AMD") {
    return "Not applicable";
  }

  const value = gpu[key];
  if (value === null || value === undefined || value === "") {
    return "Needs verification";
  }

  if (!hasSourceForField(gpu, key)) {
    return "Needs verification";
  }

  if (typeof value === "number") {
    return `${value}`;
  }

  return String(value);
}

function hasVariantSpecificSource(gpu: Gpu, field: keyof Gpu): boolean {
  return gpu.sources.some(
    (source) => source.scope === "variant-specific" && source.fields.includes(String(field)),
  );
}

const FIELDS: Array<{ label: string; key: keyof Gpu; suffix?: string }> = [
  { label: "Vendor", key: "vendor" },
  { label: "Architecture", key: "architecture" },
  { label: "VRAM", key: "vramGb", suffix: " GB" },
  { label: "Memory type", key: "memoryType" },
  { label: "Memory bus", key: "memoryBusBit", suffix: "-bit" },
  { label: "Memory bandwidth", key: "memoryBandwidthGbps", suffix: " GB/s" },
  { label: "CUDA cores", key: "cudaCores" },
  { label: "Compute units", key: "computeUnits" },
  { label: "Xe cores", key: "xeCores" },
  { label: "Board power (TGP/TBP)", key: "powerConsumptionWatts", suffix: " W" },
  { label: "Recommended PSU", key: "recommendedPsuWatts", suffix: " W" },
];

export default function ComparisonTable({ gpus }: ComparisonTableProps) {
  if (gpus.length === 0) {
    return <p className="related-note">No source-backed GPU records were resolved for this comparison.</p>;
  }

  return (
    <div className="comparison-table-wrap">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Field</th>
            {gpus.map((gpu) => (
              <th key={gpu.slug}>{gpu.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FIELDS.map((field) => (
            <tr key={field.key}>
              <th>{field.label}</th>
              {gpus.map((gpu) => {
                const value = getFieldValue(gpu, field.key);
                const output =
                  value === "Needs verification" || !field.suffix ? value : `${value}${field.suffix}`;
                const variantSpecific = hasVariantSpecificSource(gpu, field.key);

                return (
                  <td data-label={`${gpu.name} ${field.label}`} key={`${gpu.slug}-${field.key}`}>
                    {output}
                    {variantSpecific ? (
                      <p className="spec-meta">Variant-specific. Verify exact card.</p>
                    ) : null}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
