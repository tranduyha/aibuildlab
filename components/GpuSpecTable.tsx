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
    { label: "CUDA cores", value: withFallback(gpu.cudaCores) },
    { label: "Stream processors", value: withFallback(gpu.streamProcessors) },
    { label: "Compute units", value: withFallback(gpu.computeUnits) },
    { label: "TGP", value: withFallback(gpu.tgpWatts, "W") },
    { label: "TBP", value: withFallback(gpu.tbpWatts, "W") },
    { label: "Architecture", value: withFallback(gpu.architecture) },
    { label: "Launch year", value: withFallback(gpu.launchYear) },
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