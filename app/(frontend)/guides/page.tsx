import Link from "next/link";
import { guideRepository } from "@/repositories/guide.repository";
import { buildMetadata } from "@/lib/seo";

const plannedGuideTopics = [
  "How much VRAM do you need for AI workloads",
  "Local AI vs SaaS tools for output-first teams",
  "GPU memory planning for Stable Diffusion workflows",
] as const;

export const metadata = buildMetadata({
  title: "Local AI Hardware Guides",
  description: "Browse the planned guide hub for GPU memory, local LLMs, image generation, and workstation planning.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  const publishedGuides = guideRepository.getPublishedGuides();

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
                  <span className="guide-card-topic">Cloud vs Local planning</span>
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
          <div className="compare-workflow-grid">
            <div>
              <span>01</span>
              <h3>Estimate workload size</h3>
              <p>Start with VRAM planning before assuming a local or cloud route will fit.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Review hardware context</h3>
              <p>Check GPU profiles, build routes, and comparisons before narrowing an option set.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Use guides for tradeoffs</h3>
              <p>Guide pages help compare control, setup effort, and workflow direction without provider ranking.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Verify the exact path</h3>
              <p>Validate your runtime, storage, privacy, and operational requirements before committing.</p>
            </div>
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
