import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComparisonCta from "@/components/ComparisonCta";
import ComparisonHeroVisual from "@/components/ComparisonHeroVisual";
import ComparisonSourceNotice from "@/components/ComparisonSourceNotice";
import ComparisonTable from "@/components/ComparisonTable";
import ComparisonVerdict from "@/components/ComparisonVerdict";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { comparisonService } from "@/services/comparison.service";
import type { Gpu } from "@/types";

interface CompareDetailPageProps {
  params: Promise<{ slug: string }>;
}

const SUMMARY_SOURCE_REQUIRED_FIELDS = new Set<keyof Gpu>([
  "vramGb",
  "memoryBandwidthGbps",
  "powerConsumptionWatts",
]);

function hasSourceForSummaryField(gpu: Gpu, key: keyof Gpu): boolean {
  if (!SUMMARY_SOURCE_REQUIRED_FIELDS.has(key)) {
    return true;
  }

  return gpu.sources.some((source) => source.fields.includes(String(key)));
}

function formatValue(gpu: Gpu, key: keyof Gpu, suffix = ""): string {
  const value = gpu[key] as number | string | null | undefined;

  if (value === null || value === undefined || value === "") {
    return "Needs verification";
  }

  if (!hasSourceForSummaryField(gpu, key)) {
    return "Needs verification";
  }

  return `${value}${suffix}`;
}

function getDifferenceLine(gpus: Gpu[], key: keyof Gpu, suffix = ""): string {
  if (gpus.length < 2) {
    return "Needs verification";
  }

  const [first, second] = gpus;

  return `${first.name}: ${formatValue(first, key, suffix)} | ${second.name}: ${formatValue(second, key, suffix)}`;
}

function getPairNames(gpus: Gpu[], fallback: string): { first: string; second: string; pair: string } {
  const first = gpus[0]?.name ?? "the first GPU";
  const second = gpus[1]?.name ?? "the second GPU";
  return { first, second, pair: gpus.length >= 2 ? `${first} and ${second}` : fallback };
}

function getPairSpecificFaq(slug: string, gpus: Gpu[]): { question: string; answer: string } {
  const pairNames = getPairNames(gpus, "these GPUs");

  switch (slug) {
    case "rtx-3060-12gb-vs-rtx-4060-ti-16gb-for-ai":
      return {
        question: "Why compare an older 12 GB GPU with a newer 16 GB GPU for local AI?",
        answer:
          "This pair is useful for separating VRAM capacity from generation changes. The comparison should still be verified against runtime support and workload testing before any hardware decision.",
      };
    case "rtx-3090-vs-rtx-4090-for-local-llm":
      return {
        question: "Why compare two 24 GB NVIDIA GPUs for local LLM planning?",
        answer:
          "Both profiles can fit into a high-VRAM shortlist, so the planning question shifts toward memory bandwidth, power, architecture, and tested runtime behavior rather than capacity alone.",
      };
    case "rtx-4070-super-vs-rtx-4070-ti-super-for-ai":
      return {
        question: "Why compare two close Ada-generation GPUs for AI planning?",
        answer:
          "Close-generation comparisons help identify whether extra VRAM or memory subsystem differences matter for the target workload. Draft or unsourced fields should be verified before treating the comparison as guidance.",
      };
    case "rx-7900-xtx-vs-rtx-4090-for-ai":
      return {
        question: "Why does runtime support matter when comparing AMD and NVIDIA GPUs for local AI?",
        answer:
          "VRAM and bandwidth are only part of the planning picture. Framework support, driver maturity, and model runtime compatibility can change real-world fit across vendors.",
      };
    case "rtx-4080-super-vs-rtx-4090-for-stable-diffusion":
      return {
        question: "Why compare 16 GB and 24 GB NVIDIA GPUs for image-generation planning?",
        answer:
          "The comparison helps separate capacity headroom from unsupported speed assumptions. Larger workflows may need more VRAM, but image-generation speed still requires benchmark evidence for the exact setup.",
      };
    default:
      return {
        question: `What makes ${pairNames.pair} worth comparing for AI planning?`,
        answer:
          "The pair can highlight planning differences in VRAM, memory bandwidth, power, source confidence, and runtime caveats before benchmark evidence is available.",
      };
  }
}

function cleanComparisonSeoTitle(title: string): string {
  return title.replace(/\s+-\s+Draft$/i, "");
}

export async function generateStaticParams() {
  return comparisonService.getComparisonStaticParams();
}

export async function generateMetadata({ params }: CompareDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = comparisonService.getResolvedComparisonBySlug(slug);

  if (!resolved) {
    return buildMetadata({
      title: "Comparison not found",
      description: "The requested GPU comparison page was not found.",
      path: `/compare/${slug}`,
    });
  }

  return buildMetadata({
    title: cleanComparisonSeoTitle(resolved.comparison.seoTitle),
    description: resolved.comparison.seoDescription,
    path: `/compare/${resolved.comparison.slug}`,
    type: "article",
  });
}

export default async function CompareDetailPage({ params }: CompareDetailPageProps) {
  const { slug } = await params;
  const resolved = comparisonService.getResolvedComparisonBySlug(slug);

  if (!resolved) {
    notFound();
  }

  const { comparison, gpus, missingGpuSlugs } = resolved;
  const settings = getSiteSettings();
  const pagePath = `/compare/${comparison.slug}`;
  const pageUrl = buildCanonicalPath(pagePath);
  const pairSpecificFaq = getPairSpecificFaq(comparison.slug, gpus);
  const comparisonIntent = comparisonService.getComparisonIntent(comparison, gpus);
  const seoTitle = cleanComparisonSeoTitle(comparison.seoTitle);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildCanonicalPath("/") },
      { "@type": "ListItem", position: 2, name: "Compare", item: buildCanonicalPath("/compare") },
      { "@type": "ListItem", position: 3, name: comparison.title, item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoTitle,
    description: comparison.seoDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: settings.name, url: settings.siteUrl },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: pairSpecificFaq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: pairSpecificFaq.answer,
        },
      },
      {
        "@type": "Question",
        name: "When should I use the VRAM Calculator with this comparison?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Use the VRAM Calculator before comparing cards so the shortlist is based on estimated memory requirements rather than GPU names alone.",
        },
      },
      {
        "@type": "Question",
        name: "When should I choose cloud GPU instead?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Choose cloud GPU for occasional high-memory workloads, when local VRAM is below estimate, or to validate workload fit before buying hardware.",
        },
      },
      {
        "@type": "Question",
        name: "Should I rely on this comparison as purchase guidance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. This page is planning guidance and intentionally avoids unsupported benchmark, price, availability, and buying claims.",
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/compare">Compare</Link>
            <span>/</span>
            <span aria-current="page">{comparison.title}</span>
          </nav>

          <header className="tool-hero">
            <p className="eyebrow">GPU comparison</p>
            <h1>{comparison.title}</h1>
            <p className="tool-lead">{comparison.shortDescription}</p>
            <DataConfidenceBadge gpu={comparison} />
          </header>

          <p className="tool-disclaimer">
            Planning summary only. Verify exact GPU variants, runtime support, and workload behavior before making
            purchase decisions.
          </p>

          <ComparisonHeroVisual gpus={gpus} />

          <section className="tool-section">
            <h2>Quick planning summary</h2>
            <div className="comparison-summary-grid">
              <div>
                <span>VRAM</span>
                <p>{getDifferenceLine(gpus, "vramGb", " GB")}</p>
              </div>
              <div>
                <span>Memory bandwidth</span>
                <p>{getDifferenceLine(gpus, "memoryBandwidthGbps", " GB/s")}</p>
              </div>
              <div>
                <span>Power planning</span>
                <p>{getDifferenceLine(gpus, "powerConsumptionWatts", " W")}</p>
              </div>
              <div>
                <span>Intent</span>
                <p>{comparisonIntent}</p>
              </div>
              <div>
                <span>Source confidence</span>
                <p>
                  {gpus.length > 0
                    ? gpus.map((gpu) => `${gpu.name}: ${gpu.dataConfidence}`).join(" | ")
                    : "Needs verification"}
                </p>
              </div>
              <div>
                <span>Needs verification</span>
                <p>Benchmark evidence, exact board-partner variant, runtime compatibility, and workload fit.</p>
              </div>
            </div>
          </section>

          <section className="tool-section">
            <h2>Comparison table</h2>
            <ComparisonTable gpus={gpus} />
            {missingGpuSlugs.length > 0 ? (
              <p className="related-note">Missing linked GPU records: {missingGpuSlugs.join(", ")}.</p>
            ) : null}
          </section>

          <ComparisonVerdict comparison={comparison} gpus={gpus} />

          <section className="tool-section">
            <h2>How to interpret this comparison</h2>
            <div className="intro-copy">
              <p>
                VRAM is capacity headroom, not guaranteed speed. Memory bandwidth can matter, but benchmark evidence is
                still needed before drawing performance conclusions.
              </p>
              <p>
                Runtime support, drivers, and exact board-partner variants can change practical results. Use the VRAM
                Calculator before treating this comparison as purchase guidance.
              </p>
            </div>
          </section>

          <section className="comparison-cta-block" aria-label="Estimate your model before deciding">
            <div>
              <p className="eyebrow">RECOMMENDED NEXT STEP</p>
              <h2>Check model memory before choosing between these GPUs</h2>
              <p>
                Run your model assumptions through the VRAM Calculator, then return to GPU profiles for source
                notes and board-partner verification.
              </p>
            </div>
            <div className="comparison-cta-actions">
              <Link className="primary-button" href="/tools/vram-calculator">
                Estimate your model first
              </Link>
              <Link className="secondary-button" href="/gpu">
                Browse GPU profiles
              </Link>
            </div>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>Use case notes</h2>
              <p>
                For local LLM planning, prioritize VRAM headroom and runtime compatibility. For image workflows,
                avoid assuming performance until benchmark evidence is attached.
              </p>
            </div>
            <div>
              <h2>When to choose cloud GPU instead</h2>
              <p>
                Consider cloud testing when memory estimates exceed local cards, when workloads are infrequent, or
                when validating before hardware purchase.
              </p>
            </div>
          </section>

          <section className="tool-section faq-section">
            <h2>FAQ</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>{pairSpecificFaq.question}</h3>
                <p>{pairSpecificFaq.answer}</p>
              </div>
              <div className="faq-item">
                <h3>When should I use the VRAM Calculator first?</h3>
                <p>Use it before comparing cards so your shortlist matches estimated memory requirements.</p>
              </div>
              <div className="faq-item">
                <h3>When should I choose cloud GPU instead?</h3>
                <p>When local VRAM is below estimate, testing is occasional, or you need validation before buying.</p>
              </div>
              <div className="faq-item">
                <h3>Should I rely on this comparison as purchase guidance?</h3>
                <p>
                  No. This page is planning guidance and intentionally avoids unsupported benchmark, price,
                  availability, and buying claims.
                </p>
              </div>
            </div>
          </section>

          <section className="tool-section">
            <h2>Related GPU profiles</h2>
            <div className="related-links">
              {gpus.map((gpu) => (
                <Link href={`/gpu/${gpu.slug}`} key={gpu.slug}>
                  {gpu.name} profile <span>&rarr;</span>
                </Link>
              ))}
            </div>
          </section>

          <ComparisonSourceNotice comparison={comparison} gpus={gpus} missingGpuSlugs={missingGpuSlugs} />
          <ComparisonCta />
        </div>
      </article>
    </>
  );
}
