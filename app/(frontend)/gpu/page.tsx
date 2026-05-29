import Link from "next/link";
import GpuCard from "@/components/GpuCard";
import { buildMetadata } from "@/lib/seo";
import { gpuService } from "@/services/gpu.service";

export const metadata = buildMetadata({
  title: "GPU Planning Profiles for Local AI",
  description:
    "Browse draft GPU planning profiles for local AI workloads. Use these seed records to shortlist options before source verification.",
  path: "/gpu",
});

export default function GpuIndexPage() {
  const { data: gpus, warning } = gpuService.listAllGpus();

  return (
    <article className="tool-page">
      <div className="shell">
        <header className="tool-hero gpu-index-hero">
          <p className="eyebrow">GPU planning database</p>
          <h1>GPU planning profiles for local AI workloads</h1>
          <p className="tool-lead">
            Use this index to shortlist GPUs for local LLM and image workflow
            planning. These records are seed entries for structured research,
            not buying recommendations.
          </p>
        </header>

        {warning ? <p className="tool-disclaimer">{warning}</p> : null}

        <p className="gpu-index-cta-note">
          Start with <Link href="/tools/vram-calculator">VRAM Calculator</Link>{" "}
          to estimate memory range, then review each GPU profile and verify
          official specs before any purchase.
        </p>

        <section className="gpu-card-grid" aria-label="GPU planning profiles">
          {gpus.map((gpu) => (
            <GpuCard key={gpu.id} gpu={gpu} />
          ))}
        </section>
      </div>
    </article>
  );
}