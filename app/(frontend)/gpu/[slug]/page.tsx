import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateCta from "@/components/AffiliateCta";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import GpuSpecTable from "@/components/GpuSpecTable";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { gpuRepository } from "@/repositories/gpu.repository";
import { comparisonService } from "@/services/comparison.service";
import { gpuService } from "@/services/gpu.service";

interface GpuProfilePageProps {
  params: Promise<{ slug: string }>;
}

interface FaqItem {
  question: string;
  answer: string;
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

function getSpecContext(gpu: {
  cudaCores: number | null;
  streamProcessors: number | null;
  computeUnits: number | null;
  xeCores?: number | null;
  memoryType: string | null;
  memoryBusBit: number | null;
  tgpWatts: number | null;
  tbpWatts: number | null;
}): string {
  const coreLabel =
    gpu.cudaCores !== null
      ? `${gpu.cudaCores.toLocaleString("en-US")} CUDA cores`
      : gpu.streamProcessors !== null
        ? `${gpu.streamProcessors.toLocaleString("en-US")} stream processors`
        : gpu.computeUnits !== null
          ? `${gpu.computeUnits} compute units`
          : gpu.xeCores
            ? `${gpu.xeCores} Xe cores`
            : "unresolved core-count metadata";
  const memoryLabel =
    gpu.memoryType && gpu.memoryBusBit
      ? `${gpu.memoryType} on a ${gpu.memoryBusBit}-bit bus`
      : gpu.memoryType ?? "unresolved memory configuration";
  const powerValue = gpu.tgpWatts ?? gpu.tbpWatts;
  const powerLabel = powerValue ? `${powerValue}W board-power class` : "unresolved board-power class";

  return `${coreLabel}, ${memoryLabel}, and a ${powerLabel}`;
}

function getVramTierBody(gpu: {
  name: string;
  vramGb: number | null;
  cudaCores: number | null;
  streamProcessors: number | null;
  computeUnits: number | null;
  xeCores?: number | null;
  memoryType: string | null;
  memoryBusBit: number | null;
  tgpWatts: number | null;
  tbpWatts: number | null;
}): string {
  const specContext = getSpecContext(gpu);

  if (gpu.vramGb === 8) {
    return `${gpu.name} should be treated as an entry-level 8GB planning card. Its source-backed context is ${specContext}, so compare it with smaller model, lower-resolution, and shorter-context workloads before treating it as a local fit.`;
  }

  if (gpu.vramGb === 12) {
    return `${gpu.name} sits in the 12GB planning tier with ${specContext}. Use it for lighter local AI research after the calculator confirms headroom, especially when context length and batch size stay modest.`;
  }

  if (gpu.vramGb === 16) {
    return `${gpu.name} sits in the 16GB planning tier with ${specContext}. That gives more room than 8GB or 12GB cards, but exact fit still depends on quantization, runtime overhead, adapters, and context settings.`;
  }

  if (gpu.vramGb === 24) {
    return `${gpu.name} sits in the 24GB planning tier with ${specContext}. It is more relevant for heavier local AI experiments, but runtime overhead, model packaging, and workload stability still need direct validation.`;
  }

  if (gpu.vramGb === 32) {
    return `${gpu.name} sits in the 32GB planning tier with ${specContext}. Treat it as a high-memory local planning profile, not proof that every large model or long-context workload will fit without offload or workflow changes.`;
  }

  return `${gpu.name} does not have a resolved VRAM planning tier yet, so use the source table before making any workload assumptions.`;
}

function getVendorRuntimeNote(gpu: { name: string; vendor: string; architecture: string | null }): string {
  if (gpu.vendor === "NVIDIA") {
    const generation = gpu.architecture ? `${gpu.architecture} ` : "";
    const newerGenerationNote =
      gpu.architecture === "Blackwell"
        ? " Because this is a newer RTX 50-class profile, driver, runtime, and framework support should be checked against the exact software stack."
        : "";

    return `${gpu.name} is an NVIDIA ${generation}profile, so many local AI workflows will be planned around CUDA-oriented tooling. Verify the exact CUDA, driver, PyTorch, llama.cpp, Ollama, or image-generation runtime path before relying on the card.${newerGenerationNote}`;
  }

  if (gpu.vendor === "AMD") {
    return `${gpu.name} is an AMD profile, so runtime support needs a different check than CUDA-first NVIDIA planning. Confirm ROCm or the specific AMD-supported inference/image stack for your operating system before treating the card as a fit.`;
  }

  if (gpu.vendor === "Intel") {
    return `${gpu.name} is an Intel Arc profile, so compatibility should be checked against the exact driver, OS, and runtime path, including oneAPI, SYCL, OpenVINO, or framework-specific support where relevant.`;
  }

  return `${gpu.name} needs runtime compatibility checks for the exact vendor stack, driver path, and AI framework before hardware decisions.`;
}

function getExactCardVerificationNote(gpu: {
  name: string;
  powerConnectors?: string | null;
  cardDimensionsMm?: string | null;
  sources: { scope?: string }[];
}): string {
  const hasVariantSpecificSource = gpu.sources.some((source) => source.scope === "variant-specific");
  const connectorNote = gpu.powerConnectors
    ? ` The current profile lists power connector guidance as ${gpu.powerConnectors}, but partner cards can differ.`
    : " Power connector details still need exact-card verification.";
  const dimensionNote = gpu.cardDimensionsMm
    ? ` The listed size is ${gpu.cardDimensionsMm}; confirm the actual board length, width, and slot thickness before case planning.`
    : " Board dimensions are not universal here, so check the exact SKU before case planning.";
  const sourceNote = hasVariantSpecificSource
    ? " Some fields come from board-partner sources, so do not treat them as universal for every model with the same GPU name."
    : " Even when reference data is official, add-in-card models can change cooling, connectors, dimensions, and factory power behavior.";

  return `${gpu.name} should be checked at the exact-card level.${connectorNote}${dimensionNote}${sourceNote}`;
}

function getCloudDecisionNote(gpuName: string, vramGb: number | null): string {
  if (vramGb !== null && vramGb <= 8) {
    return `Cloud testing becomes attractive when ${gpuName}'s 8GB tier is below the calculator estimate, when you need a temporary high-memory run, or when you want evidence before changing local hardware.`;
  }

  if (vramGb !== null && vramGb <= 16) {
    return `Use cloud testing when the estimate is close to ${gpuName}'s ${vramGb}GB ceiling, when image resolution or context length may grow, or when a one-off workload would force an expensive local upgrade.`;
  }

  return `Use cloud testing when the workload exceeds ${gpuName}'s local memory tier, when multi-GPU or very high-memory validation is needed, or when you want to test the workflow before committing to a local build.`;
}

function getGpuFaqItems(gpu: {
  name: string;
  vendor: string;
  architecture: string | null;
  vramGb: number | null;
  cudaCores: number | null;
  streamProcessors: number | null;
  computeUnits: number | null;
  xeCores?: number | null;
  memoryType: string | null;
  memoryBusBit: number | null;
  tgpWatts: number | null;
  tbpWatts: number | null;
  powerConnectors?: string | null;
  cardDimensionsMm?: string | null;
  sources: { scope?: string }[];
}): FaqItem[] {
  return [
    {
      question:
        gpu.vramGb !== null
          ? `What does ${gpu.vramGb}GB VRAM mean for ${gpu.name}?`
          : `How should I treat unresolved VRAM on ${gpu.name}?`,
      answer: getVramTierBody(gpu),
    },
    {
      question: `What runtime compatibility matters for ${gpu.name}?`,
      answer: getVendorRuntimeNote(gpu),
    },
    {
      question: `Which exact-card details matter most for ${gpu.name}?`,
      answer: getExactCardVerificationNote(gpu),
    },
    {
      question: `When is cloud testing safer than planning around ${gpu.name}?`,
      answer: getCloudDecisionNote(gpu.name, gpu.vramGb),
    },
  ];
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
  const faqItems = getGpuFaqItems(gpu);
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
    mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
    })),
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
              <p>{getVendorRuntimeNote(gpu)}</p>
              {gpu.notes ? <p className="related-note">Research note: {gpu.notes}</p> : null}
            </div>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>VRAM limitations</h2>
              <p>{getVramTierBody(gpu)}</p>
              <p className="gpu-calc-cta-inline">
                <Link href="/tools/vram-calculator">Estimate VRAM before comparing this GPU</Link>
              </p>
            </div>
            <div>
              <h2>When to choose cloud GPU instead</h2>
              <p>{getCloudDecisionNote(gpu.name, gpu.vramGb)}</p>
            </div>
          </section>

          <section className="tool-section">
            <h2>Technical verification checklist</h2>
            <ul className="gpu-checklist">
              <li>Verify official GPU core specifications.</li>
              <li>Verify board-partner variant specs for the exact card model.</li>
              <li>Verify VRAM capacity and memory configuration.</li>
              <li>Verify power connectors and PSU requirement.</li>
              <li>{getVendorRuntimeNote(gpu)}</li>
              <li>Verify model/runtime memory needs with calculator + real test.</li>
              <li>Use benchmark results only when source and test context are clear.</li>
            </ul>
          </section>

          <AffiliateCta
            affiliate={gpu.affiliate}
            ctaLabel="View partner hardware options"
            entitySlug={gpu.slug}
            entityType="gpu"
            merchant={gpu.name}
            placement="gpu-detail-after-checklist"
            settings={settings}
          />

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
              {faqItems.map((item) => (
                <div className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
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

          <AffiliateCta
            affiliate={gpu.affiliate}
            ctaLabel="View partner hardware options"
            entitySlug={gpu.slug}
            entityType="gpu"
            merchant={gpu.name}
            placement="gpu-detail-bottom"
            settings={settings}
            variant="compact"
          />

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
