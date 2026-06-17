import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateCta from "@/components/AffiliateCta";
import ComparisonCta from "@/components/ComparisonCta";
import ComparisonHeroVisual from "@/components/ComparisonHeroVisual";
import ComparisonSourceNotice from "@/components/ComparisonSourceNotice";
import ComparisonTable from "@/components/ComparisonTable";
import ComparisonVerdict from "@/components/ComparisonVerdict";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { canRenderAffiliateUrl } from "@/services/affiliate.service";
import { comparisonProfileService } from "@/services/comparison-profile.service";
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
  const profile = comparisonProfileService.getComparisonProfile(comparison);
  const settings = getSiteSettings();
  const pagePath = `/compare/${comparison.slug}`;
  const pageUrl = buildCanonicalPath(pagePath);
  const comparisonIntent = comparisonService.getComparisonIntent(comparison, gpus);
  const seoTitle = cleanComparisonSeoTitle(comparison.seoTitle);
  const affiliateGpus = gpus.filter((gpu) => canRenderAffiliateUrl(gpu.affiliate, settings));

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
    mainEntity: profile.faq.map((item) => ({
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

          <section className="comparison-fast-answer" aria-labelledby="comparison-fast-answer-heading">
            <div>
              <p className="eyebrow">FAST ANSWER</p>
              <h2 id="comparison-fast-answer-heading">Start with the decision that actually changes your workflow</h2>
              <p>{profile.decisionSummary}</p>
            </div>
            <div className="comparison-fast-answer-grid">
              <article>
                <span>Use the page for</span>
                <h3>{profile.bestFitQuestions[0]?.title ?? "Workflow fit"}</h3>
                <p>{profile.bestFitQuestions[0]?.description ?? "Validate the workload before treating the table as enough."}</p>
              </article>
              <article>
                <span>Main risk</span>
                <h3>{profile.watchouts[0]?.title ?? "Validation gap"}</h3>
                <p>{profile.watchouts[0]?.description ?? "Specs alone do not settle runtime, benchmark, or exact-card questions."}</p>
              </article>
            </div>
          </section>

          <section className="tool-section">
            <h2>Why this comparison matters</h2>
            <p className="related-note">{profile.decisionSummary}</p>
            <div className="comparison-summary-grid">
              {profile.whyThisPairMatters.map((item) => (
                <div key={item.title}>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

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
            <h2>Use this page when these questions match your workflow</h2>
            <div className="comparison-summary-grid">
              {profile.bestFitQuestions.map((item) => (
                <div key={item.title}>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>Before you trust the comparison</h2>
            <div className="comparison-summary-grid">
              {profile.watchouts.map((item) => (
                <div key={item.title}>
                  <span>{item.title}</span>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {affiliateGpus.length > 0 ? (
            <section className="tool-section" aria-labelledby="comparison-affiliate-heading">
              <p className="eyebrow">Partner hardware options</p>
              <h2 id="comparison-affiliate-heading">Check partner options after comparing</h2>
              <p className="related-note">
                These links appear only for GPU records with an affiliate URL and site disclosure enabled. Verify exact card variant, seller, price, and availability before purchase.
              </p>
              <div className={affiliateGpus.length >= 2 ? "affiliate-product-grid affiliate-product-grid-two" : "affiliate-product-grid"}>
                {affiliateGpus.map((gpu) => (
                  <AffiliateCta
                    affiliate={gpu.affiliate}
                    ctaLabel={`View ${gpu.name} partner options`}
                    entitySlug={gpu.slug}
                    entityType="comparison-gpu"
                    key={gpu.slug}
                    merchant={gpu.name}
                    placement="comparison-after-verdict"
                    settings={settings}
                    variant="compact"
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="tool-section explanation-grid">
            <div>
              <h2>What the source-backed data shows</h2>
              <ul className="source-list">
                {profile.sourceBackedDifferences.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2>What still needs validation</h2>
              <ul className="source-list">
                {profile.unresolvedQuestions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </section>

          <section className="comparison-cta-block" aria-label="Estimate your model before deciding">
            <div>
              <p className="eyebrow">PLANNING NEXT STEP</p>
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

          {profile.nearbyComparisons.length > 0 ? (
            <section className="tool-section">
              <h2>Compare nearby GPU decisions next</h2>
              <div className="comparison-summary-grid">
                {profile.nearbyComparisons.map((item) => (
                  <div key={item.slug}>
                    <span>
                      <Link href={`/compare/${item.slug}`}>{item.label}</Link>
                    </span>
                    <p>{item.reason}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          <section className="tool-section faq-section">
            <h2>FAQ</h2>
            <div className="faq-grid">
              {profile.faq.map((item) => (
                <div className="faq-item" key={item.question}>
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
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
