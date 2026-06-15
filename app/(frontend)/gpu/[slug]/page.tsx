import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AffiliateCta from "@/components/AffiliateCta";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import GpuSpecTable from "@/components/GpuSpecTable";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { gpuRepository } from "@/repositories/gpu.repository";
import { comparisonService } from "@/services/comparison.service";
import { gpuProfileService } from "@/services/gpu-profile.service";
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

  const capacity = gpu.vramGb !== null ? `${gpu.vramGb}GB VRAM` : "VRAM planning";
  const platform = gpu.architecture ?? gpu.vendor;

  return buildMetadata({
    title: `${gpu.name}: ${capacity} for Local AI`,
    description: `${gpu.name} ${capacity} profile for ${platform} local AI planning, with source-backed specs, main constraint, and nearby GPU comparisons.`,
    path: `/gpu/${gpu.slug}`,
    type: "article",
  });
}

function hasSourceType(type: string, gpuSources: { type: string }[]) {
  return gpuSources.some((source) => source.type === type);
}

function getExactCardNote(gpu: {
  name: string;
  powerConnectors?: string | null;
  cardDimensionsMm?: string | null;
  sources: { scope?: string }[];
}): string {
  const details = [
    gpu.powerConnectors ? `connector guidance (${gpu.powerConnectors})` : "power connectors",
    gpu.cardDimensionsMm ? `listed dimensions (${gpu.cardDimensionsMm})` : "board dimensions",
    "cooling design",
    "slot thickness",
  ];
  const hasVariantSource = gpu.sources.some((source) => source.scope === "variant-specific");
  const sourceContext = hasVariantSource
    ? "Some attached fields describe a named board-partner variant."
    : "Reference specifications do not describe every add-in-card model.";

  return `${sourceContext} Verify ${details.join(", ")} for the exact ${gpu.name} SKU before case and PSU planning.`;
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
  const editorial = gpuProfileService.getEditorialProfile(gpu);
  const depthProfile = gpuProfileService.getDepthProfile(gpu);
  const nearbyGpus = gpuProfileService.getNearbyGpus(gpu);
  const relatedComparisons = comparisonService.getComparisonsForGpuSlug(gpu.slug);
  const sourceSummary = {
    official: hasSourceType("official", gpu.sources),
    manufacturer: hasSourceType("manufacturer", gpu.sources),
    database: hasSourceType("database", gpu.sources),
    benchmark: hasSourceType("benchmark", gpu.sources),
  };

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
    name: `${gpu.name}: ${gpu.vramGb !== null ? `${gpu.vramGb}GB VRAM` : "VRAM"} for Local AI`,
    description: editorial.role,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: settings.name,
      url: settings.siteUrl,
    },
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

      <article className="tool-page gpu-detail-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/gpu">GPU</Link>
            <span>/</span>
            <span aria-current="page">{gpu.name}</span>
          </nav>

          <header className="tool-hero gpu-profile-hero">
            <p className="eyebrow">
              {gpu.vramGb !== null ? `${gpu.vramGb}GB VRAM planning profile` : "GPU planning profile"}
            </p>
            <h1>{gpu.name} for local AI planning</h1>
            <p className="tool-lead">{editorial.role}</p>
            <DataConfidenceBadge gpu={gpu} />
          </header>

          {warning ? <p className="tool-disclaimer">{warning}</p> : null}

          <section className="tool-section gpu-decision-section">
            <p className="eyebrow">Decision snapshot</p>
            <h2>Where {gpu.name} fits in a shortlist</h2>
            <div className="gpu-decision-grid">
              <div>
                <span>Profile role</span>
                <p>{editorial.role}</p>
              </div>
              <div>
                <span>Reason to consider</span>
                <p>{editorial.reasonToConsider}</p>
              </div>
              <div>
                <span>Main constraint</span>
                <p>{editorial.mainConstraint}</p>
              </div>
            </div>
            <div className="gpu-primary-actions">
              <Link href="/tools/vram-calculator">Check workload VRAM first</Link>
              <Link href="/guides/how-to-choose-a-gpu-for-local-llms">
                Follow the GPU selection workflow
              </Link>
            </div>
          </section>

          <section className="tool-section">
            <h2>{gpu.name} source-backed specification snapshot</h2>
            <p className="related-note">
              Use these values to compare capacity, platform, and board requirements. A specification
              difference is not presented as a benchmark result.
            </p>
            <GpuSpecTable gpu={gpu} />
          </section>

          <section className="tool-section gpu-interpretation-section">
            <div>
              <p className="eyebrow">Interpretation</p>
              <h2>How to read this profile</h2>
              <ul className="gpu-checklist">
                {editorial.interpretation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <aside>
              <h3>{editorial.runtimeQuestion}</h3>
              <p>{editorial.runtimeAnswer}</p>
              <h3>Exact-card verification</h3>
              <p>{getExactCardNote(gpu)}</p>
            </aside>
          </section>

          {depthProfile ? (
            <section className="tool-section gpu-depth-section">
              <p className="eyebrow">Decision depth</p>
              <h2>When {gpu.name} should stay on your shortlist</h2>
              <p className="related-note">{depthProfile.userIntent}</p>
              <div className="gpu-depth-grid">
                <div>
                  <h3>Use this profile when</h3>
                  <ul className="gpu-checklist">
                    {depthProfile.useWhen.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Skip or test first when</h3>
                  <ul className="gpu-checklist">
                    {depthProfile.skipWhen.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="gpu-depth-compare">
                <h3>Compare against these profiles next</h3>
                <div className="gpu-depth-compare-grid">
                  {depthProfile.compareAgainst.map((item) => (
                    <Link href={`/gpu/${item.gpu.slug}`} key={item.gpu.slug}>
                      <span>{item.gpu.name}</span>
                      <small>{item.reason}</small>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}

          <section className="tool-section">
            <p className="eyebrow">Compare path</p>
            <h2>Next GPU profiles to compare with {gpu.name}</h2>
            <p className="related-note">
              These routes are selected to keep the decision moving: same-tier comparisons,
              capacity step-ups, or runtime alternatives. They are not ranked buying
              recommendations.
            </p>
            <div className="gpu-nearby-grid">
              {nearbyGpus.map((item) => (
                <article key={item.gpu.slug}>
                  <span>
                    {item.gpu.vramGb !== null ? `${item.gpu.vramGb}GB` : "VRAM unresolved"} -{" "}
                    {item.gpu.architecture ?? item.gpu.vendor}
                  </span>
                  <h3>
                    <Link href={`/gpu/${item.gpu.slug}`}>{item.gpu.name}</Link>
                  </h3>
                  <p>{item.relationship}</p>
                  <Link href={`/gpu/${item.gpu.slug}`}>
                    Compare this profile <span aria-hidden="true">&rarr;</span>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          <AffiliateCta
            affiliate={gpu.affiliate}
            ctaLabel="View partner hardware options"
            entitySlug={gpu.slug}
            entityType="gpu"
            merchant={gpu.name}
            placement="gpu-detail-after-nearby-options"
            settings={settings}
          />

          <section className="tool-section">
            <h2>Sources behind the {gpu.name} profile</h2>
            <p className="related-note">
              Source coverage includes {sourceSummary.official ? "official vendor material" : "no official source"}
              {sourceSummary.manufacturer ? ", board-partner documentation" : ""}
              {sourceSummary.database ? ", database cross-checks" : ""}
              {sourceSummary.benchmark ? ", and benchmark evidence" : ""}. Variant-specific values
              apply only to the named card.
            </p>
            {gpu.sources.length > 0 ? (
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
                      {` | checked ${source.accessedAt}`}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="related-note">Sources are not attached yet.</p>
            )}
            {gpu.notes ? <p className="gpu-source-note">Profile note: {gpu.notes}</p> : null}
          </section>

          <section className="tool-section">
            <h2>Available comparisons featuring {gpu.name}</h2>
            <div className="related-links">
              {relatedComparisons.length > 0 ? (
                relatedComparisons.map((item) => (
                  <Link href={`/compare/${item.comparison.slug}`} key={item.comparison.slug}>
                    {item.comparison.title} <span>&rarr;</span>
                  </Link>
                ))
              ) : (
                <Link href="/compare">
                  Browse source-aware GPU comparisons <span>&rarr;</span>
                </Link>
              )}
            </div>
          </section>

          <section className="tool-section related-section">
            <p className="eyebrow">Next step</p>
            <h2>Continue from the question you still need to answer</h2>
            <div className="related-links">
              <Link href="/tools/vram-calculator">
                Need a memory estimate? Open the calculator <span>&rarr;</span>
              </Link>
              <Link href="/gpu">
                Need a wider shortlist? Browse GPU tiers <span>&rarr;</span>
              </Link>
              <Link href="/cloud-gpu">
                Need temporary capacity? Review cloud GPU paths <span>&rarr;</span>
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
