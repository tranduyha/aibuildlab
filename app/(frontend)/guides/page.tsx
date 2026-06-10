import Link from "next/link";
import { guideRepository } from "@/repositories/guide.repository";
import { buildMetadata } from "@/lib/seo";
import { aiModelService } from "@/services/ai-model.service";

const plannedGuideTopics = [
  "How much VRAM do you need for AI workloads",
  "AI workstation software stack planning",
  "12GB vs 16GB VRAM for image generation",
] as const;

const hubSteps = [
  {
    label: "Size",
    title: "Estimate workload size",
    description: "Start with VRAM planning before assuming a local or cloud route will fit.",
  },
  {
    label: "Context",
    title: "Review hardware context",
    description: "Check GPU profiles, build routes, and comparisons before narrowing an option set.",
  },
  {
    label: "Tradeoffs",
    title: "Use guides for tradeoffs",
    description: "Guide pages help compare control, setup effort, and workflow direction without provider ranking.",
  },
  {
    label: "Verify",
    title: "Verify the exact path",
    description: "Validate your runtime, storage, privacy, and operational requirements before committing.",
  },
] as const;

function getGuideTopicLabel(slug: string): string {
  if (slug === "cloud-gpu-vs-local-gpu") {
    return "Cloud vs Local planning";
  }

  if (slug === "local-ai-vs-ai-saas") {
    return "Local vs SaaS planning";
  }

  if (slug === "image-generation-vram-planning") {
    return "Image generation planning";
  }

  return "Planning guide";
}

export const metadata = buildMetadata({
  title: "Local AI Hardware Guides",
  description: "Browse the planned guide hub for GPU memory, local LLMs, image generation, and workstation planning.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const publishedGuides = guideRepository.getPublishedGuides();
  const modelVramPages = aiModelService.listModelVramPages();

  return (
    <article className="tool-page">
      <div className="shell">
        <header className="tool-hero guide-hero" id="planned-guides">
          <p className="eyebrow">Guides</p>
          <h1>Source-aware local AI planning guides</h1>
          <p className="tool-lead">
            Use these guides to compare local hardware planning, cloud testing, and workflow tradeoffs without turning
            draft assumptions into buying advice.
          </p>
        </header>

        <section className="tool-section">
          <h2>Published planning guides</h2>
          <div className="guide-card-grid">
            {publishedGuides.map((guide) => (
              <Link className="guide-card guide-card-featured" href={`/guides/${guide.slug}`} key={guide.slug}>
                <div className="guide-card-meta">
                  <span className="guide-card-label">Published guide</span>
                  <span className="guide-card-topic">{getGuideTopicLabel(guide.slug)}</span>
                </div>
                <strong>{guide.title}</strong>
                <span>{guide.shortDescription}</span>
                <small className="guide-card-action">Read guide &rarr;</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="tool-section">
          <h2>How to use the guide hub</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            {hubSteps.map((step) => (
              <div
                className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5"
                key={step.title}
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[var(--primary)]" aria-hidden="true" />
                  <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[var(--primary)]">
                    {step.label}
                  </span>
                </div>
                <h3 className="text-[18px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">{step.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="tool-section">
          <h2>Model VRAM requirement pages</h2>
          <p className="guide-section-lead">
            Start here when the question is model-specific: how a dense 7B or 8B model maps to planning tiers before
            runtime validation.
          </p>
          <div className="guide-card-grid">
            {modelVramPages.map((page) => (
              <Link className="guide-card guide-card-featured" href={page.path} key={page.model.slug}>
                <div className="guide-card-meta">
                  <span className="guide-card-label">Model VRAM</span>
                  <span className="guide-card-topic">{page.model.family ?? page.model.modelFamily}</span>
                </div>
                <strong>{page.model.name}</strong>
                <span>{page.model.shortDescription}</span>
                <small className="guide-card-action">Open model page &rarr;</small>
              </Link>
            ))}
          </div>
        </section>

        <section className="tool-section related-section">
          <h2>Start from core planning routes</h2>
          <div className="related-links">
            <Link href="/tools/vram-calculator">
              Estimate VRAM first <span>&rarr;</span>
            </Link>
            <Link href="/gpu">
              Review GPU profiles <span>&rarr;</span>
            </Link>
            <Link href="/compare">
              Compare GPU options <span>&rarr;</span>
            </Link>
            <Link href="/builds">
              Open build planning <span>&rarr;</span>
            </Link>
          </div>
        </section>

        <section className="tool-section">
          <h2>Cloud GPU planning route</h2>
          <Link
            className="mt-4 block rounded-lg border border-slate-200 bg-white p-5 text-slate-900 shadow-sm transition hover:border-sky-300 hover:bg-sky-50"
            href="/cloud-gpu"
          >
            <span className="text-xs font-semibold uppercase tracking-wide text-sky-700">
              Related planning route
            </span>
            <strong className="mt-2 block text-xl font-semibold tracking-normal">
              Cloud GPU provider profiles
            </strong>
            <span className="mt-2 block text-sm leading-6 text-slate-700">
              Review source-aware provider planning profiles after deciding whether cloud testing makes sense.
            </span>
            <small className="mt-3 block text-sm font-semibold text-sky-700">
              Review Cloud GPU provider profiles &rarr;
            </small>
          </Link>
        </section>

        <section className="tool-section guide-planned-section">
          <h2>Planned guide topics</h2>
          <p className="guide-section-lead">
            These topics remain in the planning backlog until the route, data quality, and source-backed scope are
            ready.
          </p>
          <div className="guide-planned-grid">
            {plannedGuideTopics.map((topic, index) => (
              <div className="guide-planned-card" key={topic}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{topic}</strong>
                <p>Planning backlog item.</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  );
}
