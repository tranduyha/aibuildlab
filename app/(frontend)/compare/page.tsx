import Link from "next/link";
import ComparisonCard from "@/components/ComparisonCard";
import { buildCanonicalUrl, buildMetadata, getSiteSettings } from "@/lib/seo";
import { comparisonService } from "@/services/comparison.service";

const PAGE_PATH = "/compare";

export const metadata = buildMetadata({
  title: "GPU Comparison Hub for Local AI Planning",
  description:
    "Source-aware GPU comparison pages for local AI planning. Compare VRAM, power and constraints with cautious, verification-first guidance.",
  path: PAGE_PATH,
});

export default function CompareIndexPage() {
  const settings = getSiteSettings();
  const items = comparisonService.getComparisonListItems();
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
        name: "Compare",
        item: buildCanonicalUrl(PAGE_PATH),
      },
    ],
  };
  const groupedItems = items.reduce<Record<string, typeof items>>((groups, item) => {
    const intent = comparisonService.getComparisonIntent(item.comparison, item.gpus);
    return {
      ...groups,
      [intent]: [...(groups[intent] ?? []), item],
    };
  }, {});

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span aria-current="page">Compare</span>
          </nav>

          <header className="tool-hero">
          <p className="eyebrow">Compare GPU options</p>
          <h1>GPU comparisons for local AI planning</h1>
          <p className="tool-lead">
            Use these source-aware comparisons to plan local AI hardware research. Treat verdicts as planning
            guidance, not benchmark-backed buying advice.
          </p>
          </header>

        <p className="tool-disclaimer">
          Comparison records may include planning drafts. Verify exact card variants, runtime requirements, and
          workload constraints before purchase.
        </p>

        <section className="tool-section">
          <h2>How to use comparisons</h2>
          <div className="compare-workflow-grid">
            <div>
              <span>01</span>
              <h3>Estimate VRAM first</h3>
              <p>Start with the calculator so your shortlist matches the memory range your model may need.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Check GPU profiles</h3>
              <p>Open individual GPU pages for source-backed specs and variant-specific caveats.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Compare planning specs</h3>
              <p>Use VRAM, bandwidth, power, and source confidence before treating any card as a fit.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Verify exact card</h3>
              <p>Board-partner values can differ, so verify the exact SKU before purchase.</p>
            </div>
          </div>
        </section>

        <section className="tool-section">
          <h2>Available comparisons</h2>
          <p className="related-note">
            Cards show source-backed hints where GPU profile data exists. Planning draft records remain clearly
            labelled until stronger sources or benchmark-specific evidence are attached.
          </p>
          {Object.entries(groupedItems).map(([intent, group]) => (
            <div className="comparison-group" key={intent}>
              <h3>{intent}</h3>
              <div className="comparison-card-grid">
                {group.map((item) => (
                  <ComparisonCard
                    key={item.comparison.id}
                    comparison={item.comparison}
                    gpus={item.gpus}
                    gpuNames={item.gpuNames}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        <section className="tool-section related-section">
          <h2>Related planning routes</h2>
          <div className="related-links">
            <Link href="/tools/vram-calculator">Open VRAM Calculator <span>&rarr;</span></Link>
            <Link href="/gpu">Browse GPU profiles <span>&rarr;</span></Link>
            <Link href="/builds">Review build pages <span>&rarr;</span></Link>
            <Link href="/guides">Read guides <span>&rarr;</span></Link>
          </div>
        </section>
        </div>
      </article>
    </>
  );
}
