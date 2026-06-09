import Link from "next/link";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";

const PAGE_TITLE = "Image Generation VRAM Planning";
const PAGE_DESCRIPTION =
  "Plan GPU VRAM for SDXL, Stable Diffusion 3.5 Large, and FLUX image-generation workflows using setup-specific validation samples and cautious planning tiers.";
const PAGE_PATH = "/guides/image-generation-vram-planning";

const validationSamples = [
  {
    model: "SDXL Base 1.0",
    runtime: "Diffusers",
    precision: "FP16",
    estimate: "14.4 GB",
    observed: "10.47 GB",
    source: "Official Diffusers documentation",
    note: "Strongest current sample because the runtime docs print a max memory reserved value.",
  },
  {
    model: "Stable Diffusion 3.5 Large",
    runtime: "Diffusers",
    precision: "BF16",
    estimate: "19.2 GB",
    observed: "~20 GB",
    source: "Third-party self-hosting guide",
    note: "Approximate sample; useful for planning but weaker than a framework memory counter.",
  },
  {
    model: "FLUX.1 dev",
    runtime: "Diffusers",
    precision: "FP16",
    estimate: "24.0 GB",
    observed: "22 GB",
    source: "Third-party benchmark",
    note: "Benchmark sample with setup notes; treat as setup-specific evidence.",
  },
] as const;

const workflowFactors = [
  "Model family changes the baseline memory target.",
  "Resolution increases latent and activation memory pressure.",
  "Batch size multiplies parts of the image pipeline workload.",
  "LoRA, ControlNet, refiner, and VAE choices can add overhead.",
  "Runtime choices such as Diffusers and ComfyUI can behave differently.",
  "Offload and attention implementations can shift peak VRAM.",
] as const;

const planningTiers = [
  {
    tier: "8 GB",
    use: "Light SDXL-class experiments only when settings are conservative and verified.",
  },
  {
    tier: "12 GB",
    use: "More realistic for SDXL planning, but still tight for heavier workflows.",
  },
  {
    tier: "16 GB",
    use: "A stronger planning tier for SDXL and some optimized larger-model workflows.",
  },
  {
    tier: "24 GB+",
    use: "The current planning target for heavier SD3.5 Large or FLUX-style workflows.",
  },
] as const;

const faqItems = [
  {
    question: "Is the image-generation calculator a benchmark?",
    answer:
      "No. It is a planning estimate. The observed samples are setup-specific references used to sanity-check the estimate, not guarantees for every runtime or workflow.",
  },
  {
    question: "Why do SDXL, SD3.5, and FLUX need separate planning?",
    answer:
      "They are different model families with different pipeline behavior. Resolution, batch size, adapters, VAE, runtime, precision, and offload choices can change peak memory.",
  },
  {
    question: "Can I treat one observed sample as the exact VRAM requirement?",
    answer:
      "No. A single sample is evidence for one setup. Use it to decide which VRAM tier deserves testing, then validate your exact workflow.",
  },
] as const;

const relatedLinks = [
  { label: "Use the VRAM Calculator", href: "/tools/vram-calculator" },
  { label: "Review GPU profiles", href: "/gpu" },
  { label: "Compare GPU planning profiles", href: "/compare" },
  { label: "Cloud GPU vs local GPU", href: "/guides/cloud-gpu-vs-local-gpu" },
] as const;

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: "article",
});

export default function ImageGenerationVramPlanningGuidePage() {
  const settings = getSiteSettings();
  const pageUrl = buildCanonicalPath(PAGE_PATH);
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildCanonicalPath("/") },
      { "@type": "ListItem", position: 2, name: "Guides", item: buildCanonicalPath("/guides") },
      { "@type": "ListItem", position: 3, name: PAGE_TITLE, item: pageUrl },
    ],
  };
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: PAGE_TITLE,
    description: PAGE_DESCRIPTION,
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

      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <span aria-current="page">Image Generation VRAM Planning</span>
          </nav>

          <header className="tool-hero guide-hero">
            <p className="eyebrow">Image generation guide</p>
            <h1>{PAGE_TITLE}</h1>
            <p className="tool-lead">
              Use this guide to plan GPU VRAM for SDXL, Stable Diffusion 3.5 Large, and FLUX workflows without turning
              setup-specific samples into buying advice.
            </p>
            <div className="guide-hero-summary">
              <p>
                Start with the calculator, review observed samples cautiously, and validate the exact image pipeline
                before choosing a local GPU or cloud test path.
              </p>
              <div className="guide-hero-links">
                <Link href="/tools/vram-calculator">Open calculator</Link>
                <Link href="/gpu">Review GPU profiles</Link>
              </div>
            </div>
          </header>

          <p className="tool-disclaimer">
            Planning notice: this guide avoids speed claims, provider ranking, exact price claims, stock claims, and
            guaranteed hardware support. Observed samples are setup-specific.
          </p>

          <section className="tool-section">
            <h2>Why image VRAM planning is different</h2>
            <p className="guide-section-lead">
              Image generation is not sized like a dense text LLM. The model matters, but so do resolution, batch size,
              VAE behavior, adapters, ControlNet, runtime memory handling, and whether parts of the pipeline are
              offloaded.
            </p>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {workflowFactors.map((factor) => (
                <div className="flex gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4" key={factor}>
                  <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <p className="text-[15px] leading-7 text-[var(--muted)]">{factor}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Current validation samples</h2>
            <p className="related-note">
              These samples are used to sanity-check the Image Generation mode. They do not prove that every similar
              setup will use the same memory.
            </p>
            <div className="guide-card-grid">
              {validationSamples.map((sample) => (
                <div className="guide-card guide-card-featured" key={sample.model}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">{sample.runtime}</span>
                    <span className="guide-card-topic">{sample.precision}</span>
                  </div>
                  <strong>{sample.model}</strong>
                  <span>
                    Estimate {sample.estimate}; observed {sample.observed}.
                  </span>
                  <small>{sample.source}</small>
                  <p className="related-note">{sample.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>How to use planning tiers</h2>
              <p>
                Treat a VRAM tier as a shortlist for testing. If a workflow estimate lands close to the edge of a GPU
                tier, test the workflow before assuming the local card is enough.
              </p>
            </div>
            <div>
              <h2>When cloud testing helps</h2>
              <p>
                Cloud GPU testing can reduce hardware risk when a workflow is near the limit of a local card, when
                model setup is still changing, or when a one-time high-memory image project is not worth a local build.
              </p>
            </div>
          </section>

          <section className="tool-section">
            <h2>Planning tiers for image generation</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {planningTiers.map((tier) => (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5" key={tier.tier}>
                  <span className="font-mono text-xs font-extrabold text-[var(--primary)]">{tier.tier}</span>
                  <p className="mt-3 text-[15px] leading-7 text-[var(--muted)]">{tier.use}</p>
                </div>
              ))}
            </div>
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

          <section className="tool-section related-section">
            <p className="eyebrow">Continue planning</p>
            <h2>Related routes</h2>
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
