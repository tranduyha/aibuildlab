import Link from "next/link";
import GpuCard from "@/components/GpuCard";
import { buildCanonicalUrl, buildMetadata, getSiteSettings } from "@/lib/seo";
import { gpuService } from "@/services/gpu.service";

const PAGE_PATH = "/gpu";

interface GpuTier {
  id: string;
  title: string;
  range: string;
  description: string;
  gpus: ReturnType<typeof gpuService.listAllGpus>["data"];
}

export const metadata = buildMetadata({
  title: "GPU VRAM Tiers for Local AI Planning",
  description:
    "Browse source-backed GPUs by 8GB, 12GB, 16GB, and 24GB+ VRAM tiers, then compare runtime, power, and exact-card requirements for local AI.",
  path: PAGE_PATH,
});

export default function GpuIndexPage() {
  const settings = getSiteSettings();
  const { data: gpus, warning } = gpuService.listAllGpus();
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: settings.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "GPU",
        item: buildCanonicalUrl(PAGE_PATH),
      },
    ],
  };

  const verified = gpus.filter(
    (gpu) => (gpu.status === "published" || gpu.status === "reviewed") && !gpu.needsReview,
  );
  const drafts = gpus.filter(
    (gpu) => gpu.status === "draft" || gpu.needsReview || gpu.dataConfidence === "low",
  );
  const tiers: GpuTier[] = [
    {
      id: "8gb",
      title: "8GB entry planning tier",
      range: "8GB",
      description:
        "Start here only when the complete workload is already shown to fit inside 8GB, including runtime overhead and safety margin.",
      gpus: verified.filter((gpu) => gpu.vramGb !== null && gpu.vramGb <= 8),
    },
    {
      id: "12gb",
      title: "12GB planning tier",
      range: "12GB",
      description:
        "A middle tier for lighter local models and image workflows where context, resolution, and batch settings remain controlled.",
      gpus: verified.filter((gpu) => gpu.vramGb !== null && gpu.vramGb > 8 && gpu.vramGb <= 12),
    },
    {
      id: "16gb",
      title: "16GB headroom tier",
      range: "16GB",
      description:
        "Compare these profiles when the workload needs more room than 12GB but does not establish a need for a 24GB card.",
      gpus: verified.filter((gpu) => gpu.vramGb !== null && gpu.vramGb > 12 && gpu.vramGb <= 16),
    },
    {
      id: "24gb-plus",
      title: "24GB and higher-memory tier",
      range: "24GB+",
      description:
        "Use these profiles for heavier single-GPU planning after checking runtime support, power, physical fit, and the real memory estimate.",
      gpus: verified.filter((gpu) => gpu.vramGb !== null && gpu.vramGb > 16),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">GPU</span>
          </nav>

          <header className="tool-hero gpu-index-hero">
            <p className="eyebrow">GPU VRAM catalog</p>
            <h1>Compare GPU memory tiers for local AI</h1>
            <p className="tool-lead">
              Start with the amount of VRAM your workload needs, then compare platform support,
              power, and exact-card requirements inside that tier.
            </p>
          </header>

          {warning ? <p className="tool-disclaimer">{warning}</p> : null}

          <section className="tool-section gpu-catalog-start" id="top">
            <div>
              <p className="eyebrow">Start with the constraint</p>
              <h2>Choose a VRAM tier before a product name</h2>
              <p>
                Product tier does not override physical memory capacity. Use the calculator to
                establish a range, then jump to the closest tier below.
              </p>
            </div>
            <div className="gpu-tier-nav" aria-label="Jump to GPU VRAM tier">
              {tiers.map((tier) => (
                <a href={`#${tier.id}`} key={tier.id}>
                  <strong>{tier.range}</strong>
                  <span>{tier.gpus.length} profiles</span>
                </a>
              ))}
            </div>
            <div className="gpu-primary-actions">
              <Link href="/tools/vram-calculator">Estimate workload VRAM</Link>
              <Link href="/guides/12gb-vs-16gb-vram-local-ai">Compare 12GB and 16GB</Link>
              <Link href="/compare">Open side-by-side comparisons</Link>
            </div>
          </section>

          <section className="tool-section">
            <h2>How to narrow the catalog</h2>
            <div className="gpu-catalog-workflow">
              <div>
                <span>01</span>
                <h3>Estimate memory</h3>
                <p>Include model weights, runtime overhead, context or image settings, and safety margin.</p>
              </div>
              <div>
                <span>02</span>
                <h3>Check the platform</h3>
                <p>Confirm CUDA, ROCm, Intel, operating-system, and framework support for the workflow.</p>
              </div>
              <div>
                <span>03</span>
                <h3>Compare within a tier</h3>
                <p>Use power, memory configuration, architecture, and source confidence to refine the shortlist.</p>
              </div>
              <div>
                <span>04</span>
                <h3>Verify the exact card</h3>
                <p>Partner-card connectors, cooling, dimensions, and factory settings can differ.</p>
              </div>
            </div>
          </section>

          {tiers.map((tier) => (
            <section className="tool-section gpu-tier-section" id={tier.id} key={tier.id}>
              <div className="gpu-tier-heading">
                <div>
                  <p className="eyebrow">{tier.range} profiles</p>
                  <h2>{tier.title}</h2>
                  <p className="related-note">{tier.description}</p>
                </div>
                <a href="#top" className="gpu-tier-top-link">
                  Back to catalog start
                </a>
              </div>
              <div className="gpu-card-grid">
                {tier.gpus.map((gpu) => (
                  <GpuCard key={gpu.id} gpu={gpu} />
                ))}
              </div>
            </section>
          ))}

          <section className="tool-section gpu-runtime-routing">
            <div>
              <h2>Do not choose by VRAM alone</h2>
              <p>
                Capacity creates the shortlist. Runtime support determines whether that capacity is
                practical for your software stack.
              </p>
            </div>
            <div className="related-links">
              <Link href="/guides/how-to-choose-a-gpu-for-local-llms">
                Follow the local LLM GPU workflow <span>&rarr;</span>
              </Link>
              <Link href="/guides/image-generation-vram-planning">
                Plan an image-generation workflow <span>&rarr;</span>
              </Link>
              <Link href="/cloud-gpu">
                Test uncertain workloads in the cloud <span>&rarr;</span>
              </Link>
            </div>
          </section>

          {drafts.length > 0 ? (
            <section className="tool-section" aria-label="Planning draft GPU profiles">
              <h2>Profiles needing verification</h2>
              <p className="related-note">
                These records remain planning drafts or need stronger source coverage.
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
    </>
  );
}
