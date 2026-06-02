import Link from "next/link";
import HeroVisual from "@/components/HeroVisual";
import VisualCard from "@/components/VisualCard";
import { buildMetadata, getSiteSettings } from "@/lib/seo";
import { imageService } from "@/services/image.service";

export const metadata = buildMetadata({
  title: "AI Hardware Planning Tools for Local LLMs and Workstations",
  description:
    "Plan local AI hardware with VRAM estimates, GPU comparison guides, and workstation build resources for LLMs, Stable Diffusion, Ollama, and creative AI workloads.",
  path: "/",
});

const helpTopics = [
  {
    title: "VRAM planning",
    description: "Estimate an initial memory tier from model size, quantization, and context assumptions.",
    href: "/tools/vram-calculator",
    marker: "VRAM",
    visual: "memory" as const,
  },
  {
    title: "GPU comparison",
    description: "Compare source-backed GPU planning profiles before choosing local hardware.",
    href: "/compare",
    marker: "GPU",
    visual: "compare" as const,
  },
  {
    title: "Local LLM hardware",
    description: "Understand which data matters when planning private, local language model workloads.",
    href: "/guides",
    marker: "LLM",
    visual: "model" as const,
  },
  {
    title: "Stable Diffusion builds",
    description: "Plan creator-focused hardware research around memory requirements and workflow testing.",
    href: "/builds",
    marker: "IMG",
    visual: "image" as const,
  },
  {
    title: "AI workstation planning",
    description: "Organize build decisions around workload, validation, compatibility, and budget checks.",
    href: "/builds",
    marker: "BUILD",
    visual: "workstation" as const,
  },
  {
    title: "Cloud or local decisions",
    description: "Evaluate future guides that compare control, cost validation, and workload fit.",
    href: "/guides",
    marker: "CLOUD",
    visual: "cloud" as const,
  },
];

const trustChips = [
  "Transparent VRAM estimates",
  "Source-aware hardware data",
  "No inflated affiliate claims",
  "Built for local AI planning",
];

const workflowSteps = [
  {
    title: "Choose your AI workload",
    description: "Start with an LLM, image workflow, or workstation objective.",
  },
  {
    title: "Estimate VRAM and GPU tier",
    description: "Use transparent assumptions to narrow the memory range to research.",
  },
  {
    title: "Compare hardware and plan a build",
    description: "Compare source-reviewed specifications and compatibility checks before planning a build.",
  },
];

const upcomingAreas = [
  {
    title: "GPU profiles",
    description: "Planning pages with source-aware specs and visible review status.",
    href: "/gpu",
    category: "gpu" as const,
  },
  {
    title: "Build guides",
    description: "Planning pages for validated workstation research.",
    href: "/builds",
    category: "builds" as const,
  },
  {
    title: "Research guides",
    description: "Evidence-led notes for local AI workflows.",
    href: "/guides",
    category: "guides" as const,
  },
];

const startingPoints = [
  { label: "VRAM Calculator", href: "/tools/vram-calculator" },
  { label: "GPU planning hub", href: "/gpu" },
  { label: "GPU comparisons", href: "/compare" },
  { label: "AI workstation builds", href: "/builds" },
];

export default function HomePage() {
  const settings = getSiteSettings();
  const heroImage = imageService.getHomepageHeroImage();
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: settings.name,
      url: settings.siteUrl,
      description: settings.description,
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: settings.name,
      url: settings.siteUrl,
    },
  ];

  return (
    <>
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      <section className="home-hero">
        <div className="shell home-hero-grid">
          <div>
            <p className="eyebrow">Local AI hardware planning</p>
            <h1>{settings.heroTitle}</h1>
            <p className="hero-copy">{settings.heroDescription}</p>
            <div className="hero-actions">
              <Link className="primary-button" href="/tools/vram-calculator">
                Try VRAM Calculator
              </Link>
              <Link className="secondary-button" href="/guides">
                Explore GPU Guides
              </Link>
            </div>
            <div className="trust-chips" aria-label="Planning principles">
              {trustChips.map((chip) => (
                <span key={chip}>{chip}</span>
              ))}
            </div>
            <p className="hero-trust">{settings.trust.planningNote}</p>
          </div>
          <HeroVisual image={heroImage} />
        </div>
      </section>

      <section className="shell home-section">
        <div className="home-heading">
          <p className="eyebrow">What this site helps with</p>
          <h2>Find a useful starting point for local AI hardware research</h2>
        </div>
        <div className="topic-grid">
          {helpTopics.map((topic) => (
            <VisualCard {...topic} key={topic.title} />
          ))}
        </div>
      </section>

      <section className="shell workflow-section">
        <div className="workflow-heading">
          <p className="eyebrow">How it works</p>
          <h2>Plan a local AI build in three practical steps</h2>
          <Link href="/tools/vram-calculator">Start with the calculator &rarr;</Link>
        </div>
        <ol className="workflow-grid">
          {workflowSteps.map((step, index) => (
            <li key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="home-section surface">
        <div className="shell calculator-promo">
          <div>
            <p className="eyebrow">Start with the calculator</p>
            <h2>Estimate a planning tier before comparing GPUs</h2>
            <p>
              Select a model size, quantization level, context preset, and safety
              margin. The tool provides a rough VRAM estimate so you can identify
              which hardware tiers deserve further validation.
            </p>
          </div>
          <div className="calculator-preview">
            <p className="panel-label">Estimate flow</p>
            <ol className="step-list">
              <li>Choose model size</li>
              <li>Select quantization</li>
              <li>Set context length</li>
              <li>Review VRAM tier</li>
            </ol>
          </div>
          <Link className="primary-button" href="/tools/vram-calculator">
            Open calculator
          </Link>
        </div>
      </section>

      <section className="shell home-section future-grid">
        <div>
          <p className="eyebrow">Hardware planning data</p>
          <h2>GPU profiles and comparisons with visible review status</h2>
          <p className="section-copy">
            GPU profiles and comparisons are available as planning pages. Draft or
            low-confidence records are clearly labelled until stronger sources or
            benchmark evidence are attached.
          </p>
        </div>
        <div className="future-visual-grid">
          {upcomingAreas.map((area) => (
            <VisualCard
              compact
              description={area.description}
              href={area.href}
              image={imageService.getImagesByCategory(area.category)[0] ?? null}
              key={area.title}
              title={area.title}
            />
          ))}
        </div>
      </section>

      <section className="home-section trust-section">
        <div className="shell">
          <div className="home-heading">
            <p className="eyebrow">Why trust this site?</p>
            <h2>Estimates are labelled and buying decisions stay yours</h2>
          </div>
          <div className="trust-grid">
            <p>{settings.trust.editorialNote}</p>
            <p>{settings.trust.dataDisclaimer}</p>
            <p>{settings.trust.affiliateDisclosure}</p>
          </div>
        </div>
      </section>

      <section className="shell home-section starting-section">
        <p className="eyebrow">Popular starting points</p>
        <h2>Continue planning</h2>
        <div className="starting-links">
          {startingPoints.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label} <span>&rarr;</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
