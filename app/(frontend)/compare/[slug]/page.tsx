import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ComparisonCta from "@/components/ComparisonCta";
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

function formatValue(value: number | string | null | undefined, suffix = ""): string {
  if (value === null || value === undefined || value === "") {
    return "Needs verification";
  }

  return `${value}${suffix}`;
}

function getDifferenceLine(gpus: Gpu[], key: keyof Gpu, suffix = ""): string {
  if (gpus.length < 2) {
    return "Needs verification";
  }

  const [first, second] = gpus;
  const firstValue = first[key];
  const secondValue = second[key];

  return `${first.name}: ${formatValue(firstValue as number | string | null | undefined, suffix)} | ${
    second.name
  }: ${formatValue(secondValue as number | string | null | undefined, suffix)}`;
}

function getPairNames(gpus: Gpu[], fallback: string): { first: string; second: string; pair: string } {
  const first = gpus[0]?.name ?? "the first GPU";
  const second = gpus[1]?.name ?? "the second GPU";
  return { first, second, pair: gpus.length >= 2 ? `${first} and ${second}` : fallback };
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
    title: resolved.comparison.seoTitle,
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
  const pairNames = getPairNames(gpus, comparison.title);
  const comparisonIntent = comparisonService.getComparisonIntent(comparison, gpus);

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
    name: comparison.seoTitle,
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
        name: `Why compare ${pairNames.pair} for local AI planning?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "The comparison helps plan around VRAM headroom, memory subsystem, power constraints, and source confidence before any benchmark or purchase decision.",
        },
      },
      {
        "@type": "Question",
        name: `Is more VRAM more important than newer architecture between ${pairNames.first} and ${pairNames.second}?`,
        acceptedAnswer: {
          "@type": "Answer",
          text: "More VRAM can matter for larger models and context headroom, but architecture, runtime support, memory bandwidth, drivers, and workload type also matter.",
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

          <section className="comparison-cta-block" aria-label="Estimate your model before deciding">
            <div>
              <p className="eyebrow">Estimate first</p>
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
                <h3>Why compare {pairNames.pair} for local AI planning?</h3>
                <p>
                  This pair helps compare memory headroom, source confidence, power planning, and runtime caveats
                  before you look for benchmark evidence.
                </p>
              </div>
              <div className="faq-item">
                <h3>Is more VRAM more important than newer architecture?</h3>
                <p>
                  More VRAM can matter for model size and context headroom, but architecture, bandwidth, software
                  support, and drivers can change practical fit.
                </p>
              </div>
              <div className="faq-item">
                <h3>Should I rely on this comparison as a buying recommendation?</h3>
                <p>No. This page is planning guidance and intentionally avoids unsupported benchmark claims.</p>
              </div>
              <div className="faq-item">
                <h3>When should I use the VRAM Calculator first?</h3>
                <p>Use it before comparing cards so your shortlist matches estimated memory requirements.</p>
              </div>
              <div className="faq-item">
                <h3>When should I choose cloud GPU instead?</h3>
                <p>When local VRAM is below estimate, testing is occasional, or you need validation before buying.</p>
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
