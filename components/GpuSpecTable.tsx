import type { DataSource, Gpu } from "@/types";

interface SpecRow {
  label: string;
  key: string;
  value: string;
  needsVerification: boolean;
  variantSpecific: boolean;
  variantLabel: string | null;
}

interface GpuSpecTableProps {
  gpu: Gpu;
}

function formatValue(value: number | string | null, suffix?: string): string {
  if (value === null || value === "") {
    return "Needs verification";
  }

  return suffix ? `${value} ${suffix}` : String(value);
}

function getVariantSourceForField(sources: DataSource[], field: string): DataSource | null {
  return (
    sources.find(
      (source) => source.scope === "variant-specific" && source.fields.includes(field),
    ) ?? null
  );
}

function buildRow(
  gpu: Gpu,
  label: string,
  key: string,
  value: number | string | null,
  suffix?: string,
): SpecRow {
  const variantSource = getVariantSourceForField(gpu.sources, key);

  return {
    label,
    key,
    value: formatValue(value, suffix),
    needsVerification: value === null || value === "",
    variantSpecific: Boolean(variantSource),
    variantLabel: variantSource?.variantName ?? null,
  };
}

function getVendorCoreRows(gpu: Gpu): SpecRow[] {
  if (gpu.vendor === "NVIDIA") {
    return [buildRow(gpu, "CUDA cores", "cudaCores", gpu.cudaCores)];
  }

  if (gpu.vendor === "AMD") {
    return [
      buildRow(gpu, "Compute units", "computeUnits", gpu.computeUnits),
      buildRow(gpu, "Stream processors", "streamProcessors", gpu.streamProcessors),
    ];
  }

  if (gpu.vendor === "Intel") {
    return [buildRow(gpu, "Xe cores", "xeCores", gpu.xeCores ?? null)];
  }

  return [];
}

function getVendorPowerRows(gpu: Gpu): SpecRow[] {
  if (gpu.vendor === "NVIDIA") {
    return [
      buildRow(gpu, "TGP", "tgpWatts", gpu.tgpWatts, "W"),
      buildRow(gpu, "Board power", "boardPowerWatts", gpu.boardPowerWatts ?? null, "W"),
    ];
  }

  if (gpu.vendor === "AMD" || gpu.vendor === "Intel") {
    return [buildRow(gpu, "TBP", "tbpWatts", gpu.tbpWatts, "W")];
  }

  return [];
}

export default function GpuSpecTable({ gpu }: GpuSpecTableProps) {
  const rows: SpecRow[] = [
    buildRow(gpu, "Vendor", "vendor", gpu.vendor),
    buildRow(gpu, "Architecture", "architecture", gpu.architecture),
    buildRow(gpu, "VRAM", "vramGb", gpu.vramGb, "GB"),
    buildRow(gpu, "Memory type", "memoryType", gpu.memoryType),
    buildRow(gpu, "Memory bus", "memoryBusBit", gpu.memoryBusBit, "bit"),
    buildRow(gpu, "Memory bandwidth", "memoryBandwidthGbps", gpu.memoryBandwidthGbps ?? null, "GB/s"),
    buildRow(gpu, "Memory speed", "memorySpeedGbps", gpu.memorySpeedGbps ?? null, "Gbps"),
    ...getVendorCoreRows(gpu),
    buildRow(gpu, "Base clock", "baseClockGhz", gpu.baseClockGhz ?? null, "GHz"),
    buildRow(gpu, "Boost clock", "boostClockGhz", gpu.boostClockGhz ?? null, "GHz"),
    ...getVendorPowerRows(gpu),
    buildRow(gpu, "Power consumption", "powerConsumptionWatts", gpu.powerConsumptionWatts ?? null, "W"),
    buildRow(gpu, "Power connectors", "powerConnectors", gpu.powerConnectors ?? null),
    buildRow(gpu, "PSU guidance", "recommendedPsuWatts", gpu.recommendedPsuWatts ?? null, "W"),
    buildRow(gpu, "Card dimensions", "cardDimensionsMm", gpu.cardDimensionsMm ?? null),
    buildRow(gpu, "Display outputs", "displayOutputs", gpu.displayOutputs ?? null),
    buildRow(gpu, "Launch date", "launchDate", gpu.launchDate ?? null),
    buildRow(gpu, "Launch year", "launchYear", gpu.launchYear),
  ];

  const optionalWhenMissing = new Set(["cardDimensionsMm", "displayOutputs", "launchDate", "launchYear"]);
  const visibleRows = rows.filter(
    (row) => !(optionalWhenMissing.has(row.key) && row.needsVerification),
  );

  return (
    <div className="gpu-spec-table-wrap">
      <table className="gpu-spec-table">
        <caption>Planning specifications with source-aware confidence labels</caption>
        <tbody>
          {visibleRows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>
                <span>{row.value}</span>
                {row.variantSpecific ? (
                  <p className="spec-meta">
                    Variant-specific. Verify exact card.
                  </p>
                ) : null}
                {row.needsVerification ? (
                  <p className="spec-meta">
                    Needs verification from official vendor or trusted manufacturer documentation.
                  </p>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
