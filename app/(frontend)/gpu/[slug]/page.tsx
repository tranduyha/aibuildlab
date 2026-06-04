import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import GpuSpecTable from "@/components/GpuSpecTable";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { gpuRepository } from "@/repositories/gpu.repository";
import { comparisonService } from "@/services/comparison.service";
import { gpuService } from "@/services/gpu.service";

interface GpuProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return gpuRepository.getAllGpus().map((gpu) => ({ slug: gpu.slug }));
}

export async function generateMetadata({ params }: GpuProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: gpu } = gpuService.getGpuProfileBySlug(slug);

  if (!gpu) {
    return buildMetadata({
      title: "GPU profile not found",
      description: "The requested GPU planning profile was not found.",
      path: `/gpu/${slug}`,
    });
  }

  return buildMetadata({
    title: gpu.seoTitle,
    description: gpu.seoDescription,
    path: `/gpu/${gpu.slug}`,
    type: "article",
  });
}

const relatedLinks = [
  { href: "/tools/vram-calculator", label: "Use VRAM Calculator" },
  { href: "/gpu", label: "Browse all GPU profiles" },
  { href: "/builds", label: "Review build planning pages" },
  { href: "/guides", label: "Read local AI guides" },
];

function hasSourceType(type: string, gpuSources: { type: string }[]) {
  return gpuSources.some((source) => source.type === type);
}

function getPlanningFitLine(vendor: string, architecture: string | null) {
  if (vendor === "NVIDIA") {
    return architecture
      ? `${architecture} generation planning profile for local AI workflows that may be researched for LLM and creator stacks.`
      : "NVIDIA planning profile that may be researched for local AI workflows after source verification.";
  }

  if (vendor === "AMD") {
    return architecture
      ? `${architecture} planning profile for local AI experiments on AMD workflows and memory-heavy testing.`
      : "AMD planning profile that may be researched for local AI workloads after verification.";
  }

  if (vendor === "Intel") {
    return architecture
      ? `${architecture} planning profile for Intel-based local AI experiments and compatibility checks.`
      : "Intel planning profile that may be researched for local AI experiments after source verification.";
  }

  return "Planning profile for local AI research with verification-first workflow.";
}

function getVramClassNote(vramGb: number | null): { title: string; body: string } | null {
  if (vramGb === 12) {
    return {
      title: "12GB planning note",
      body: "12GB class cards may be researched for lighter local AI planning. Final fit depends on model size, quantization, runtime, and context length.",
    };
  }

  if (vramGb === 16) {
    return {
      title: "16GB planning note",
      body: "16GB class cards may be researched for broader local AI planning, but memory headroom should still be validated with your exact stack.",
    };
  }

  if (vramGb === 24) {
    return {
      title: "24GB planning note",
      body: "24GB class cards may be researched for heavier local AI planning and longer-context experiments. Verify runtime overhead before buying.",
    };
  }

  if (vramGb === 32) {
    return {
      title: "32GB planning note",
      body: "32GB class cards may be researched for larger-memory planning scenarios, but this page is still not a benchmark or buying advice.",
    };
  }

  return null;
}

export default async function GpuProfilePage({ params }: GpuProfilePageProps) {
  const { slug } = await params;
  const { data: gpu, warning } = gpuService.getGpuProfileBySlug(slug);

  if (!gpu) {
    notFound();
  }

  const settings = getSiteSettings();
  const pagePath = `/gpu/${gpu.slug}`;
  const pageUrl = buildCanonicalPath(pagePath);

  const sourceSummary = {
    official: hasSourceType("official", gpu.sources),
    manufacturer: hasSourceType("manufacturer", gpu.sources),
    database: hasSourceType("database", gpu.sources),
    benchmark: hasSourceType("benchmark", gpu.sources),
  };
  const vramClassNote = getVramClassNote(gpu.vramGb);
  const relatedComparisons = comparisonService.getComparisonsForGpuSlug(gpu.slug);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: buildCanonicalPath("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "GPU",
        item: buildCanonicalPath("/gpu"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: gpu.name,
        item: pageUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: gpu.seoTitle,
    description: gpu.seoDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: settings.name,
      url: settings.siteUrl,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: `Is ${gpu.name} enough for local AI?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "This planning profile helps shortlist hardware research, but final fit depends on model size, quantization, runtime, context length, and overhead.",
        },
      },
      {
        "@type": "Question",
        name: `Can ${gpu.name} run local LLMs?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use VRAM estimates first, then validate with your exact runtime setup. This page does not claim benchmark throughput or guaranteed model compatibility.",
        },
      },
      {
        "@type": "Question",
        name: `What should I verify before buying ${gpu.name}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "Verify official GPU specs, board-partner variant specs, power requirements, connectors, and software/runtime support before any purchase decision.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/gpu">GPU</Link>
            <span>/</span>
            <span aria-current="page">{gpu.name}</span>
          </nav>

          <header className="tool-hero gpu-profile-hero">
            <p className="eyebrow">GPU planning profile</p>
            <h1>{gpu.name}</h1>
            <p className="tool-lead">{gpu.shortDescription}</p>
            <DataConfidenceBadge gpu={gpu} />
          </header>

          {warning ? <p className="tool-disclaimer">{warning}</p> : null}

          <section className="tool-section">
            <h2>Quick planning summary</h2>
            <div className="explanation-grid">
              <div>
                <h3>What this profile helps with</h3>
                <p>
                  {gpu.name} is tracked as a planning profile with {gpu.vramGb ? `${gpu.vramGb} GB VRAM` : "unverified VRAM"}, {gpu.memoryType ?? "unverified memory type"}, and {gpu.vendor} platform notes.
                </p>
                <p>{getPlanningFitLine(gpu.vendor, gpu.architecture ?? null)}</p>
              </div>
              <div>
                <h3>What still needs verification</h3>
                <p>
                  Final fit depends on model size, quantization, runtime, context length, KV cache, batch size, and OS or driver overhead.
                </p>
                <p className="gpu-calc-cta-inline">
                  <Link href="/tools/vram-calculator">Estimate VRAM before comparing this GPU</Link>
                </p>
              </div>
            </div>
          </section>

          <section className="tool-section">
            <h2>Source-backed spec snapshot</h2>
            <p className="related-note">
              This table hides vendor-irrelevant fields. Rows marked variant-specific come from board-partner cards and are not universal across all SKUs.
            </p>
            <GpuSpecTable gpu={gpu} />
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>Planning fit</h2>
              <p>
                This GPU may be researched for {gpu.useCases.length > 0 ? gpu.useCases.join(", ") : "local AI workflows"}. Final fit depends on your exact model, quantization, runtime, and context strategy.
              </p>
            </div>
            <div>
              <h2>Local AI notes</h2>
              <p>
                Use this as a planning profile. Verify runtime compatibility, driver support, memory headroom, and workflow stability with your own stack.
              </p>
              {gpu.notes ? <p className="related-note">Research note: {gpu.notes}</p> : null}
            </div>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>VRAM limitations</h2>
              <p>
                {gpu.vramGb
                  ? `Use ${gpu.vramGb} GB as a memory boundary against calculator output, then reserve overhead for runtime and context growth.`
                  : "VRAM value is not attached yet. Keep this card in draft planning until capacity is verified from trusted sources."}
              </p>
              <p className="gpu-calc-cta-inline">
                <Link href="/tools/vram-calculator">Estimate VRAM before comparing this GPU</Link>
              </p>
            </div>
            <div>
              <h2>When to choose cloud GPU instead</h2>
              <p>
                Consider cloud testing when your estimate exceeds local VRAM, when you need occasional high-memory trials, or when you want to test before buying.
              </p>
            </div>
          </section>

          <section className="tool-section">
            <h2>Technical verification checklist</h2>
            <ul className="gpu-checklist">
              <li>Verify official GPU core specifications.</li>
              <li>Verify board-partner variant specs for the exact card model.</li>
              <li>Verify VRAM capacity and memory configuration.</li>
              <li>Verify power connectors and PSU requirement.</li>
              <li>Verify software/runtime support for your OS and stack.</li>
              <li>Verify model/runtime memory needs with calculator + real test.</li>
              <li>Use benchmark results only when source and test context are clear.</li>
            </ul>
          </section>

          <section className="tool-section">
            <h2>Sources and data confidence</h2>
            <p className="related-note">
              Variant-specific means the value was sourced from a specific MSI/ASUS/Gigabyte/PNY/ASRock or other board-partner card page, so it may differ on other variants.
            </p>
            {gpu.sources.length > 0 ? (
              <>
                <p className="related-note">
                  Source types in this profile: {sourceSummary.official ? "official, " : ""}
                  {sourceSummary.manufacturer ? "manufacturer/AIB, " : ""}
                  {sourceSummary.database ? "database cross-check, " : ""}
                  {sourceSummary.benchmark ? "benchmark" : ""}
                </p>
                <ul className="source-list">
                  {gpu.sources.map((source) => (
                    <li key={`${source.name}-${source.url}`}>
                      <a href={source.url} target="_blank" rel="noopener noreferrer">
                        {source.name}
                      </a>
                      <span>
                        {source.type}
                        {source.type === "manufacturer" ? " | board-partner source" : ""}
                        {source.scope === "variant-specific" ? " | variant-specific" : ""}
                        {source.variantName ? ` | ${source.variantName}` : ""}
                        {` | verified ${source.accessedAt}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="related-note">Sources not attached yet.</p>
            )}
          </section>

          <section className="tool-section faq-section">
            <h2>FAQ</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Is {gpu.name} enough for local AI?</h3>
                <p>
                  It may be researched for local AI planning, but final fit depends on your exact model, quantization, runtime, and context choices.
                </p>
              </div>
              <div className="faq-item">
                <h3>Can {gpu.name} run local LLMs?</h3>
                <p>
                  Start with VRAM estimates and then test your real stack. This page does not claim tokens per second or guaranteed model outcomes.
                </p>
              </div>
              <div className="faq-item">
                <h3>How should I use VRAM estimates with {gpu.name}?</h3>
                <p>
                  Compare estimated VRAM against the card capacity, then reserve headroom for runtime behavior, context growth, and system overhead.
                </p>
              </div>
              <div className="faq-item">
                <h3>What should I verify before buying {gpu.name}?</h3>
                <p>
                  Verify official specs, board-partner variant details, power/connector requirements, and runtime support before buying.
                </p>
              </div>
              <div className="faq-item">
                <h3>When should I choose cloud GPU instead?</h3>
                <p>
                  Choose cloud when local VRAM is below estimate, when you need occasional high-memory testing, or when you want to test before buying.
                </p>
              </div>
              {vramClassNote ? (
                <div className="faq-item">
                  <h3>{vramClassNote.title}</h3>
                  <p>{vramClassNote.body}</p>
                </div>
              ) : null}
            </div>
          </section>

          <section className="tool-section">
            <h2>Related comparisons</h2>
            <p className="related-note">
              Compare this GPU against nearby planning options after estimating VRAM and reviewing source notes.
            </p>
            <div className="related-links">
              {relatedComparisons.length > 0 ? (
                relatedComparisons.map((item) => (
                  <Link href={`/compare/${item.comparison.slug}`} key={item.comparison.slug}>
                    {item.comparison.title} <span>&rarr;</span>
                  </Link>
                ))
              ) : (
                <Link href="/compare">
                  Browse all source-aware GPU comparisons <span>&rarr;</span>
                </Link>
              )}
            </div>
          </section>

          <section className="tool-section related-section">
            <p className="eyebrow">Related planning routes</p>
            <h2>Continue your research path</h2>
            <div className="related-links">
              {relatedLinks.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label} <span>&rarr;</span>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
