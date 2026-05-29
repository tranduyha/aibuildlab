import Link from "next/link";
import GpuCard from "@/components/GpuCard";
import { buildMetadata } from "@/lib/seo";
import { gpuService } from "@/services/gpu.service";

export const metadata = buildMetadata({
  title: "GPU Planning Profiles for Local AI",
  description:
    "Browse source-backed and draft GPU planning profiles for local AI. Start with VRAM estimates, then verify official and board-partner specs before purchase.",
  path: "/gpu",
});

export default function GpuIndexPage() {
  const { data: gpus, warning } = gpuService.listAllGpus();

  const verified = gpus.filter(
    (gpu) => (gpu.status === "published" || gpu.status === "reviewed") && !gpu.needsReview,
  );
  const drafts = gpus.filter(
    (gpu) => gpu.status === "draft" || gpu.needsReview || gpu.dataConfidence === "low",
  );

  return (
    <article className="tool-page">
      <div className="shell">
        <header className="tool-hero gpu-index-hero">
          <p className="eyebrow">GPU planning database</p>
          <h1>GPU planning profiles for local AI workloads</h1>
          <p className="tool-lead">
            Use these profiles to plan local AI hardware research. Start from VRAM requirements, then validate the exact GPU and board-partner card specs before buying.
          </p>
        </header>

        {warning ? <p className="tool-disclaimer">{warning}</p> : null}

        <section className="tool-section">
          <h2>How to use these profiles</h2>
          <ol className="gpu-howto-list">
            <li>Estimate VRAM need first with the calculator.</li>
            <li>Check source-backed specs on each GPU profile.</li>
            <li>Verify board-partner variant specs before purchase.</li>
            <li>Compare local GPU path with cloud GPU testing options.</li>
          </ol>
          <p className="gpu-index-cta-note">
            Start with <Link href="/tools/vram-calculator">VRAM Calculator</Link> to estimate memory range, then review each GPU profile.
          </p>
        </section>

        <section className="tool-section" aria-label="Source-backed GPU profiles">
          <h2>Source-backed GPU planning profiles</h2>
          <p className="related-note">
            These profiles have attached sources and are prioritized for planning, but still require final compatibility checks before purchase.
          </p>
          <div className="gpu-card-grid">
            {verified.map((gpu) => (
              <GpuCard key={gpu.id} gpu={gpu} />
            ))}
          </div>
        </section>

        {drafts.length > 0 ? (
          <section className="tool-section" aria-label="Draft GPU profiles">
            <h2>Planning profiles needing verification</h2>
            <p className="related-note">
              These records remain draft or low confidence. Treat them as placeholders until official or trusted manufacturer data is attached.
            </p>
            <div className="gpu-card-grid">
              {drafts.map((gpu) => (
                <GpuCard key={gpu.id} gpu={gpu} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </article>
  );
}
