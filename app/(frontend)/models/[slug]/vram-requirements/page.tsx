import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { aiModelService } from "@/services/ai-model.service";

interface ModelVramRequirementsPageProps {
  params: Promise<{ slug: string }>;
}

function formatNullableValue(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === "") {
    return "Needs verification";
  }

  return String(value);
}

function getContextLabel(contextLength: number | null | undefined): string {
  if (!contextLength) {
    return "Context length is not claimed on this page until a source is mapped.";
  }

  return `${contextLength.toLocaleString()} tokens source-backed model context metadata.`;
}

function getConfidenceLabel(dataConfidence: "low" | "medium" | "high"): string {
  if (dataConfidence === "high") return "High confidence";
  if (dataConfidence === "medium") return "Medium confidence";
  return "Low confidence";
}

export async function generateStaticParams() {
  return aiModelService.getModelVramPageSlugs();
}

export async function generateMetadata({
  params,
}: ModelVramRequirementsPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = aiModelService.getModelVramPageBySlug(slug);

  if (!page) {
    return buildMetadata({
      title: "Model VRAM page not found",
      description: "The requested source-backed model VRAM planning page was not found.",
      path: `/models/${slug}/vram-requirements`,
    });
  }

  return buildMetadata({
    title: `${page.model.name} VRAM Requirements`,
    description: `Source-backed ${page.model.name} VRAM planning for 8GB, 12GB, 16GB, and larger GPU tiers with calculator estimates and source notes.`,
    path: page.path,
    type: "article",
  });
}

export default async function ModelVramRequirementsPage({
  params,
}: ModelVramRequirementsPageProps) {
  const { slug } = await params;
  const page = aiModelService.getModelVramPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const { model, estimates } = page;
  const settings = getSiteSettings();
  const pageUrl = buildCanonicalPath(page.path);
  const int4Estimate = estimates.find((estimate) => estimate.quantization === "int4");
  const sourceBackedGpuMatches = int4Estimate?.result.sourceBackedGpuMatches.slice(0, 4) ?? [];
  const relatedModelPages = aiModelService
    .listModelVramPages()
    .filter((relatedPage) => relatedPage.model.slug !== model.slug);
  const comparisonPages = [page, ...relatedModelPages].map((comparisonPage) => ({
    model: comparisonPage.model,
    path: comparisonPage.path,
    int4Estimate: comparisonPage.estimates.find((estimate) => estimate.quantization === "int4"),
    comparisonNote: comparisonPage.comparisonNote,
  }));

  const faqItems = [
    {
      question: `How much VRAM does ${model.name} need?`,
      answer:
        "Use the table as a planning estimate, not an exact requirement. Actual VRAM depends on quantization, runtime, context length, KV cache behavior, batching, drivers, and implementation details.",
    },
    {
      question: `Is ${model.name} supported by the calculator?`,
      answer:
        "Yes. This page is generated only for dense text LLM records that are explicitly calculator eligible and source-backed enough for planning use.",
    },
    {
      question: `Can this page recommend a GPU for ${model.name}?`,
      answer:
        "No. GPU links are planning references only. Verify official specs, runtime compatibility, and benchmark context before hardware decisions.",
    },
    ...page.faqItems,
  ];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildCanonicalPath("/") },
      { "@type": "ListItem", position: 2, name: `${model.name} VRAM Requirements`, item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${model.name} VRAM Requirements`,
    description: model.seoDescription,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: settings.name, url: settings.siteUrl },
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <article className="tool-page model-vram-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">{model.name} VRAM Requirements</span>
          </nav>

          <header className="tool-hero">
            <p className="eyebrow">Model VRAM planning</p>
            <h1>{model.name} VRAM Requirements</h1>
            <p className="tool-lead">{page.planningSummary}</p>
            <div className="data-confidence-badges" aria-label="Model data confidence">
              <span className="data-confidence-badge data-confidence-badge-confidence">
                Calculator eligible
              </span>
              <span className="data-confidence-badge data-confidence-badge-confidence">
                {getConfidenceLabel(model.dataConfidence)}
              </span>
              {model.needsReview ? (
                <span className="data-confidence-badge data-confidence-badge-review">Needs verification</span>
              ) : null}
            </div>
          </header>

          <p className="tool-disclaimer">{page.warning}</p>

          <section className="tool-section">
            <h2>Quick model facts</h2>
            <div className="build-summary-grid">
              <div>
                <span>Developer</span>
                <p>{formatNullableValue(model.developer)}</p>
              </div>
              <div>
                <span>Family</span>
                <p>{formatNullableValue(model.modelFamily)}</p>
              </div>
              <div>
                <span>Parameters</span>
                <p>{formatNullableValue(model.parameterCount)}</p>
              </div>
              <div>
                <span>License</span>
                <p>{formatNullableValue(model.license)}</p>
              </div>
            </div>
            <p className="related-note">{getContextLabel(model.contextLengthTokens ?? model.contextLength)}</p>
            <p className="related-note">{page.contextNote}</p>
          </section>

          <section className="tool-section">
            <h2>What the sources confirm</h2>
            <p className="related-note">
              This section separates source-backed model facts from calculator assumptions so the page does not turn
              unverified runtime behavior into a hardware claim.
            </p>
            <div className="build-summary-grid">
              {page.sourceConfirmations.map((confirmation) => (
                <div key={confirmation.label}>
                  <span>{confirmation.label}</span>
                  <p>{confirmation.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>VRAM planning estimates</h2>
            <p className="related-note">
              The table uses the current dense LLM calculator assumptions with medium context, llama.cpp / GGUF
              planning overhead, and a 20% safety margin.
            </p>
            <div className="guide-card-grid">
              {estimates.map((estimate) => (
                <div className="guide-card guide-card-featured" key={estimate.quantization}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">{estimate.label}</span>
                    <span className="guide-card-topic">{estimate.gpuTier}</span>
                  </div>
                  <strong>{estimate.estimatedVramGb.toFixed(1)} GB estimate</strong>
                  <span>{estimate.recommendedMinimumVramGb} GB rounded planning minimum.</span>
                  <p className="related-note">
                    {estimate.result.assumptionsUsed.runtimeLabel}; {estimate.result.assumptionsUsed.contextLabel};
                    assumption version {estimate.result.assumptionVersion}.
                  </p>
                </div>
              ))}
            </div>
            <p className="gpu-calc-cta-inline">
              <Link href="/tools/vram-calculator">Open the VRAM Calculator to change runtime and context assumptions</Link>
            </p>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>How to read these numbers</h2>
              <p>
                Treat the estimate as a first planning boundary. Runtime implementation, context length, KV cache,
                offload behavior, and quantization format can move actual memory use.
              </p>
            </div>
            <div>
              <h2>What this page avoids</h2>
              <p>
                This framework does not claim tokens per second, image speed, price, stock, best GPU, or guaranteed
                compatibility. It keeps model facts and planning estimates separate.
              </p>
            </div>
          </section>

          <section className="tool-section">
            <h2>Which workload tier fits this model?</h2>
            <p className="related-note">
              Use this section before comparing GPU cards. It translates the VRAM estimate into local testing scenarios
              without turning the page into a performance benchmark.
            </p>
            <div className="guide-card-grid">
              {page.workloadFits.map((item) => (
                <div className="guide-card guide-card-featured" key={item.workload}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Workload</span>
                    <span className="guide-card-topic">{item.workload}</span>
                  </div>
                  <strong>{item.fit}</strong>
                  <span>{item.caution}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>What changes the estimate most?</h2>
            <p className="related-note">
              These are the first assumptions to revisit when a local run does not match the planning number.
            </p>
            <div className="build-summary-grid">
              {page.estimateDrivers.map((driver) => (
                <div key={driver.factor}>
                  <span>{driver.factor}</span>
                  <p>{driver.impact}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>Direct answer for first-time builders</h2>
            <p className="tool-lead">{page.beginnerAnswer}</p>
          </section>

          <section className="tool-section">
            <h2>Can it fit on 8GB, 12GB, or 16GB VRAM?</h2>
            <p className="related-note">
              Treat these as testing tiers, not hardware recommendations. The answer changes with quantization,
              context length, runtime, offload behavior, and system overhead.
            </p>
            <div className="guide-card-grid">
              {page.tierDecisions.map((item) => (
                <div className="guide-card guide-card-featured" key={item.tier}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">VRAM tier</span>
                    <span className="guide-card-topic">{item.tier}</span>
                  </div>
                  <strong>{item.verdict}</strong>
                  <span>{item.nextStep}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>Validation workflow before choosing hardware</h2>
            <p className="related-note">
              Use this order after reading the estimate. It keeps model facts, calculator assumptions, and real local
              validation separate.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {page.validationSteps.map((step) => (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5" key={step.title}>
                  <span className="font-mono text-xs font-extrabold text-[var(--primary)]">{step.label}</span>
                  <h3 className="mt-2 text-[17px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">{step.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>Model-specific planning notes</h2>
            <div className="guide-card-grid">
              {page.fitNotes.map((note) => (
                <div className="guide-card guide-card-featured" key={note.title}>
                  <strong>{note.title}</strong>
                  <span>{note.body}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>How this model differs from nearby pages</h2>
            <p className="related-note">
              These notes are required before a model VRAM page is published. They keep the page from being a simple
              keyword swap of another model profile.
            </p>
            <div className="guide-card-grid">
              {page.differentiators.map((item) => (
                <div className="guide-card guide-card-featured" key={item.label}>
                  <strong>{item.label}</strong>
                  <span>{item.body}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>GPU planning references</h2>
            <p className="related-note">
              These links come from the 4-bit planning estimate and source-backed GPU specs. They are research
              references, not buying recommendations.
            </p>
            <div className="related-links">
              {sourceBackedGpuMatches.length > 0 ? (
                sourceBackedGpuMatches.map((gpu) => (
                  <Link href={`/gpu/${gpu.slug}`} key={gpu.slug}>
                    {gpu.name} ({gpu.vramGb} GB VRAM) <span>&rarr;</span>
                  </Link>
                ))
              ) : (
                <Link href="/gpu">
                  Browse source-aware GPU profiles <span>&rarr;</span>
                </Link>
              )}
            </div>
          </section>

          <section className="tool-section">
            <h2>Sources</h2>
            {model.sources.length > 0 ? (
              <ul className="source-list">
                {model.sources.map((source) => (
                  <li key={`${source.name}-${source.url}`}>
                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                      {source.name}
                    </a>
                    <span>
                      {source.type} | fields: {source.fields.join(", ")} | verified {source.accessedAt}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="related-note">Sources are not attached yet, so this model should not be used for public VRAM guidance.</p>
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
            <h2>Compare nearby model planning pages</h2>
            <p className="related-note">{page.comparisonNote}</p>
            <p className="related-note">
              These pages use the same calculator assumption set, which makes them useful for comparing 7B and
              8B-class planning tiers before changing runtime settings.
            </p>
            <div className="guide-card-grid model-compare-grid">
              {comparisonPages.map((comparisonPage) => (
                <div className="guide-card guide-card-featured" key={comparisonPage.model.slug}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">4-bit baseline</span>
                    <span className="guide-card-topic">
                      {comparisonPage.int4Estimate
                        ? comparisonPage.int4Estimate.gpuTier
                        : "Needs verification"}
                    </span>
                  </div>
                  <strong>{comparisonPage.model.name}</strong>
                  <span>
                    {comparisonPage.int4Estimate
                      ? `${comparisonPage.int4Estimate.estimatedVramGb.toFixed(1)} GB estimate; ${comparisonPage.int4Estimate.recommendedMinimumVramGb} GB rounded planning minimum.`
                      : "No calculator estimate is published for this model yet."}
                  </span>
                  <Link href={comparisonPage.path}>Open model page <span>&rarr;</span></Link>
                </div>
              ))}
            </div>
            <div className="related-links model-compare-links">
              {relatedModelPages.map((relatedPage) => (
                <Link href={relatedPage.path} key={relatedPage.model.slug}>
                  {relatedPage.model.name} VRAM requirements <span>&rarr;</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="tool-section related-section">
            <p className="eyebrow">Continue planning</p>
            <h2>Related routes</h2>
            <div className="related-links">
              <Link href="/tools/vram-calculator">
                Estimate another model <span>&rarr;</span>
              </Link>
              <Link href="/gpu">
                Review GPU profiles <span>&rarr;</span>
              </Link>
              <Link href="/guides">
                Read planning guides <span>&rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
