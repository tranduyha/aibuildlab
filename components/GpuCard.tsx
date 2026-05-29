import Link from "next/link";
import type { Gpu } from "@/types";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";

interface GpuCardProps {
  gpu: Gpu;
}

function getPlanningFocus(gpu: Gpu): string {
  if (gpu.useCases.length > 0) {
    return gpu.useCases.slice(0, 2).join(" + ");
  }

  return "Needs verification";
}

export default function GpuCard({ gpu }: GpuCardProps) {
  return (
    <article className="gpu-card">
      <DataConfidenceBadge gpu={gpu} />
      <h2>
        <Link href={`/gpu/${gpu.slug}`}>{gpu.name}</Link>
      </h2>
      <p>{gpu.shortDescription}</p>
      <dl className="gpu-card-meta">
        <div>
          <dt>VRAM</dt>
          <dd>{gpu.vramGb !== null ? `${gpu.vramGb} GB` : "Needs verification"}</dd>
        </div>
        <div>
          <dt>Memory</dt>
          <dd>{gpu.memoryType ?? "Needs verification"}</dd>
        </div>
        <div>
          <dt>Planning focus</dt>
          <dd>{getPlanningFocus(gpu)}</dd>
        </div>
      </dl>
      <Link className="gpu-card-cta" href={`/gpu/${gpu.slug}`}>
        View planning profile <span>&rarr;</span>
      </Link>
    </article>
  );
}
