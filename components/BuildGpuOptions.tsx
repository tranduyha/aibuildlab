import Link from "next/link";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import type { Gpu } from "@/types";

interface BuildGpuOptionsProps {
  gpus: Gpu[];
  missingGpuSlugs: string[];
}

function hasSourceForField(gpu: Gpu, field: keyof Gpu): boolean {
  return gpu.sources.some((source) => source.fields.includes(String(field)));
}

function formatGpuField(gpu: Gpu, field: keyof Gpu, suffix = ""): string {
  const value = gpu[field] as string | number | null | undefined;
  if (value === null || value === undefined || value === "" || !hasSourceForField(gpu, field)) {
    return "Needs verification";
  }

  return `${value}${suffix}`;
}

export default function BuildGpuOptions({ gpus, missingGpuSlugs }: BuildGpuOptionsProps) {
  return (
    <div className="build-gpu-grid">
      {gpus.map((gpu) => (
        <article className="build-gpu-card" key={gpu.slug}>
          <DataConfidenceBadge gpu={gpu} />
          <h3>
            <Link href={`/gpu/${gpu.slug}`}>{gpu.name}</Link>
          </h3>
          <dl>
            <div>
              <dt>VRAM</dt>
              <dd>{formatGpuField(gpu, "vramGb", " GB")}</dd>
            </div>
            <div>
              <dt>Memory</dt>
              <dd>{formatGpuField(gpu, "memoryType")}</dd>
            </div>
            <div>
              <dt>Planning focus</dt>
              <dd>{gpu.useCases.slice(0, 2).join(" + ") || "Needs verification"}</dd>
            </div>
          </dl>
          <Link className="build-card-cta" href={`/gpu/${gpu.slug}`}>
            View GPU profile <span>&rarr;</span>
          </Link>
        </article>
      ))}
      {missingGpuSlugs.length > 0 ? (
        <p className="related-note">Missing linked GPU profiles: {missingGpuSlugs.join(", ")}.</p>
      ) : null}
    </div>
  );
}
