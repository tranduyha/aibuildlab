import Link from "next/link";
import type { Gpu } from "@/types";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";

interface GpuCardProps {
  gpu: Gpu;
}

export default function GpuCard({ gpu }: GpuCardProps) {
  return (
    <article className="gpu-card">
      <DataConfidenceBadge gpu={gpu} />
      <h2>
        <Link href={`/gpu/${gpu.slug}`}>{gpu.name}</Link>
      </h2>
      <p>{gpu.shortDescription}</p>
      <Link className="gpu-card-cta" href={`/gpu/${gpu.slug}`}>
        View planning profile <span>&rarr;</span>
      </Link>
    </article>
  );
}