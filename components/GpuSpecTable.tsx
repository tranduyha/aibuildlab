import type { Gpu } from "@/types";

interface SpecRow {
  label: string;
  value: string;
}

interface GpuSpecTableProps {
  gpu: Gpu;
}

function withFallback(value: number | string | null, suffix?: string): string {
  if (value === null || value === "") {
    return "Needs verification";
  }

  return suffix ? `${value} ${suffix}` : String(value);
}

export default function GpuSpecTable({ gpu }: GpuSpecTableProps) {
  const rows: SpecRow[] = [
    { label: "Vendor", value: gpu.vendor },
    { label: "VRAM", value: withFallback(gpu.vramGb, "GB") },
    { label: "Memory type", value: withFallback(gpu.memoryType) },
    { label: "Memory bus", value: withFallback(gpu.memoryBusBit, "bit") },
    { label: "Memory bandwidth", value: withFallback(gpu.memoryBandwidthGbps ?? null, "GB/s") },
    { label: "CUDA cores", value: withFallback(gpu.cudaCores) },
    { label: "Stream processors", value: withFallback(gpu.streamProcessors) },
    { label: "Compute units", value: withFallback(gpu.computeUnits) },
    { label: "Xe cores", value: withFallback(gpu.xeCores ?? null) },
    { label: "Tensor cores", value: withFallback(gpu.tensorCores ?? null) },
    { label: "RT cores", value: withFallback(gpu.rtCores ?? null) },
    { label: "Base clock", value: withFallback(gpu.baseClockGhz ?? null, "GHz") },
    { label: "Boost clock", value: withFallback(gpu.boostClockGhz ?? null, "GHz") },
    { label: "TGP", value: withFallback(gpu.tgpWatts, "W") },
    { label: "TBP", value: withFallback(gpu.tbpWatts, "W") },
    { label: "Board power", value: withFallback(gpu.boardPowerWatts ?? null, "W") },
    { label: "Recommended PSU", value: withFallback(gpu.recommendedPsuWatts ?? null, "W") },
    { label: "Architecture", value: withFallback(gpu.architecture) },
    { label: "Launch date", value: withFallback(gpu.launchDate ?? null) },
    { label: "Launch year", value: withFallback(gpu.launchYear) },
    { label: "MSRP", value: withFallback(gpu.msrp ?? null, "USD") },
    { label: "AI TOPS", value: withFallback(gpu.aiTops) },
  ];

  return (
    <div className="gpu-spec-table-wrap">
      <table className="gpu-spec-table">
        <caption>Seed specifications for planning only</caption>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
