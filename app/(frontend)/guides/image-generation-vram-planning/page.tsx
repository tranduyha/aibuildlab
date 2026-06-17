import Link from "next/link";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { imageGenerationValidationService } from "@/services/image-generation-validation.service";
import type { ImageGenerationValidationComparison } from "@/types";

const PAGE_TITLE = "Image Generation VRAM Planning for SDXL, SD3.5, and FLUX";
const PAGE_DESCRIPTION =
  "Plan GPU VRAM for SDXL, Stable Diffusion 3.5 Large, and FLUX image-generation workflows with calculator steps, validation samples, and cautious testing tiers.";
const PAGE_PATH = "/guides/image-generation-vram-planning";

const workflowFactors = [
  "Model family changes the baseline memory target.",
  "Resolution increases latent and activation memory pressure.",
  "Batch size multiplies parts of the image pipeline workload.",
  "LoRA, ControlNet, refiner, and VAE choices can add overhead.",
  "Runtime choices such as Diffusers and ComfyUI can behave differently.",
  "Offload and attention implementations can shift peak VRAM.",
] as const;

const fastTierRoutes = [
  {
    tier: "8 GB",
    answer: "Treat as a constraint-solving tier.",
    useWhen: "Use only for conservative SDXL-class tests, lower resolutions, or workflows where offload is acceptable.",
    nextStep: "Start in the calculator, lower resolution or batch first, then validate before comparing GPUs.",
    href: "/gpu",
    cta: "Review low-VRAM GPU profiles",
  },
  {
    tier: "12 GB",
    answer: "A practical SDXL testing tier, not a universal comfort zone.",
    useWhen: "Use when SDXL is the main target and ControlNet, refiner, LoRA stacks, or larger models are not assumed by default.",
    nextStep: "Compare the estimate against the SDXL validation sample and test exact runtime settings.",
    href: "/guides/12gb-vs-16gb-vram-local-ai",
    cta: "Compare 12GB and 16GB planning",
  },
  {
    tier: "16 GB",
    answer: "The stronger local image-generation middle tier.",
    useWhen: "Use when SDXL needs more headroom or when a larger workflow might be optimized enough to test locally.",
    nextStep: "Check whether the workflow is capacity-bound or runtime-bound before moving to 24 GB.",
    href: "/builds/local-ai-16gb-vram-build",
    cta: "Open 16GB build planning",
  },
  {
    tier: "24 GB+",
    answer: "The current test-first tier for SD3.5 Large and FLUX-style workflows.",
    useWhen: "Use when the model family, resolution, or pipeline components push beyond the SDXL comfort zone.",
    nextStep: "Validate in cloud or on known hardware if setup risk is high.",
    href: "/compare/rtx-4080-super-vs-rtx-4090-for-stable-diffusion",
    cta: "Compare 16GB vs 24GB image paths",
  },
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

const oomTriageSteps = [
  {
    title: "Lower the image workload first",
    detail: "Reduce resolution, batch size, or multi-stage processing before assuming the GPU tier is wrong.",
  },
  {
    title: "Remove optional pipeline pressure",
    detail: "Temporarily disable LoRA stacks, ControlNet-style additions, refiner passes, or alternate VAE choices.",
  },
  {
    title: "Use runtime memory options",
    detail: "Diffusers documents model offload and memory optimization paths; use them as tests, not as universal guarantees.",
  },
  {
    title: "Retest the exact workflow",
    detail: "Record model, runtime, precision, resolution, batch, extensions, driver, and observed peak memory before changing hardware.",
  },
] as const;

const calculatorSteps = [
  {
    label: "Mode",
    value: "Choose Image Generation",
    detail: "This keeps SDXL, SD3.5, and FLUX out of the dense LLM formula.",
  },
  {
    label: "Model",
    value: "Select the image model",
    detail: "Start with the closest family instead of treating all image models alike.",
  },
  {
    label: "Workflow",
    value: "Set resolution, runtime, batch, and adapters",
    detail: "These are the controls most likely to move peak VRAM.",
  },
  {
    label: "Evidence",
    value: "Compare estimate with observed samples",
    detail: "Observed samples are setup-specific sanity checks, not guarantees.",
  },
] as const;

const sourceBackedDecisionInsights = [
  {
    title: "Treat VRAM as a test target, not a fixed requirement",
    decision:
      "Use the calculator to choose a tier, then validate the exact model, runtime, precision, resolution, and pipeline options.",
    detail:
      "Diffusers documents that memory behavior changes with model architecture and optimization choices. For planning, that means one observed sample can anchor a similar setup, but it should not become a universal SDXL, SD3.5, or FLUX requirement.",
    sources: [
      {
        label: "Diffusers memory optimization",
        href: "https://huggingface.co/docs/diffusers/optimization/memory",
      },
    ],
  },
  {
    title: "SDXL belongs in a validation-first local tier",
    decision:
      "Start SDXL planning around 12GB to 16GB, then test the exact VAE, LoRA, ControlNet, refiner, and runtime settings.",
    detail:
      "Diffusers treats SDXL as a large model that may need memory optimization on local hardware. That supports using 12GB/16GB as planning tiers, but the comfort level depends on the workflow around the base model.",
    sources: [
      {
        label: "Diffusers SDXL guide",
        href: "https://huggingface.co/docs/diffusers/using-diffusers/sdxl",
      },
    ],
  },
  {
    title: "SD3-style workflows need an offload and latency decision",
    decision:
      "Before treating 24GB as mandatory or sufficient, decide whether offload is acceptable for the workflow.",
    detail:
      "Diffusers documents model offloading for Stable Diffusion 3 pipelines. Offload can reduce GPU memory pressure, but it changes the practical workflow because latency and system RAM/storage behavior become part of the decision.",
    sources: [
      {
        label: "Diffusers Stable Diffusion 3 guide",
        href: "https://huggingface.co/docs/diffusers/api/pipelines/stable_diffusion/stable_diffusion_3",
      },
    ],
  },
  {
    title: "FLUX planning should separate loading from optimized inference",
    decision:
      "Use 24GB+ as a test-first tier, then verify whether the intended runtime loads everything on GPU or uses optimization/offload paths.",
    detail:
      "Diffusers documents Flux as a large pipeline where loading all components can require far more memory than optimized inference paths. For users, the key question is not only GPU capacity; it is how the chosen runtime stages model components.",
    sources: [
      {
        label: "Diffusers Flux guide",
        href: "https://huggingface.co/docs/diffusers/api/pipelines/flux",
      },
    ],
  },
] as const;

const testingMatrix = [
  {
    workflow: "SDXL 1024 FP16 text-to-image",
    startingTier: "12 GB to 16 GB",
    reason: "Current calculator estimate is conservative against the Diffusers observed sample.",
    nextCheck: "Test exact runtime, VAE, and any LoRA or ControlNet additions.",
  },
  {
    workflow: "Stable Diffusion 3.5 Large BF16",
    startingTier: "24 GB",
    reason: "The current estimate is close to a third-party approximate VRAM sample.",
    nextCheck: "Prefer a direct memory-counter test before treating this as a firm tier.",
  },
  {
    workflow: "FLUX.1 dev FP16",
    startingTier: "24 GB+",
    reason: "The current estimate is slightly conservative against one RTX 4090 benchmark sample.",
    nextCheck: "Verify offload, runtime version, and prompt settings before local hardware planning.",
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

const relatedGpuRoutes = [
  {
    label: "RTX 3060 12GB profile",
    href: "/gpu/rtx-3060-12gb",
    reason: "Use as a lower-bound SDXL planning reference, not as a guaranteed fit.",
  },
  {
    label: "RTX 4060 Ti 16GB profile",
    href: "/gpu/rtx-4060-ti-16gb",
    reason: "Use when the main question is whether 16 GB changes the image workflow margin.",
  },
  {
    label: "RTX 4090 profile",
    href: "/gpu/rtx-4090",
    reason: "Use as a 24 GB local image-generation validation reference.",
  },
] as const;

function getModelLabel(modelSlug: string): string {
  if (modelSlug === "sdxl-base-1-0") return "SDXL Base 1.0";
  if (modelSlug === "stable-diffusion-3-5-large") return "Stable Diffusion 3.5 Large";
  if (modelSlug === "flux-1-dev") return "FLUX.1 dev";
  return modelSlug.replaceAll("-", " ");
}

function formatRuntime(value: string): string {
  if (value === "diffusers") return "Diffusers";
  if (value === "comfyui") return "ComfyUI";
  return value;
}

function formatPrecision(value: string): string {
  return value.toUpperCase();
}

function formatObserved(sample: ImageGenerationValidationComparison): string {
  return sample.observedPeakVramGb === null ? "Needs verification" : `${sample.observedPeakVramGb} GB`;
}

function getSampleNote(sample: ImageGenerationValidationComparison): string {
  if (sample.sample.modelSlug === "sdxl-base-1-0") {
    return "Strongest current sample because the runtime docs print a max memory reserved value.";
  }

  if (sample.sample.modelSlug === "stable-diffusion-3-5-large") {
    return "Approximate third-party sample; useful for planning but weaker than a framework memory counter.";
  }

  if (sample.sample.modelSlug === "flux-1-dev") {
    return "Benchmark sample with setup notes; treat as setup-specific evidence.";
  }

  return sample.sample.notes;
}

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: "article",
});

export default function ImageGenerationVramPlanningGuidePage() {
  const settings = getSiteSettings();
  const pageUrl = buildCanonicalPath(PAGE_PATH);
  const validationSamples = imageGenerationValidationService.compareAllSamples();
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
                <Link href="/tools/vram-calculator">Open Image Generation mode</Link>
                <Link href="/gpu">Review GPU profiles</Link>
              </div>
            </div>
          </header>

          <p className="tool-disclaimer">
            Planning notice: this guide avoids speed claims, provider ranking, exact price claims, stock claims, and
            guaranteed hardware support. Observed samples are setup-specific.
          </p>

          <section className="tool-section guide-primary-section">
            <h2>Fast answer by VRAM tier</h2>
            <p className="related-note">
              Start with the tier that matches your estimate, then validate the exact image pipeline before treating a
              local GPU path as comfortable.
            </p>
            <div className="guide-card-grid">
              {fastTierRoutes.map((route) => (
                <div className="guide-card guide-card-featured" key={route.tier}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">VRAM tier</span>
                    <span className="guide-card-topic">{route.tier}</span>
                  </div>
                  <strong>{route.answer}</strong>
                  <span>{route.useWhen}</span>
                  <p className="related-note">{route.nextStep}</p>
                  <Link className="guide-card-action" href={route.href}>
                    {route.cta} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>How to use the calculator with this guide</h2>
            <p className="guide-section-lead">
              Use the calculator first, then read the validation samples as evidence for similar setups. The order
              matters because image workflows can change memory use before the GPU choice is even meaningful.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {calculatorSteps.map((step) => (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5" key={step.label}>
                  <span className="font-mono text-xs font-extrabold text-[var(--primary)]">{step.label}</span>
                  <h3 className="mt-2 text-[17px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {step.value}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">{step.detail}</p>
                </div>
              ))}
            </div>
            <p className="gpu-calc-cta-inline">
              <Link href="/tools/vram-calculator">Open the VRAM Calculator and switch to Image Generation mode</Link>
            </p>
          </section>

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
                <div className="guide-card guide-card-featured" key={sample.sample.id}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">{formatRuntime(sample.sample.runtime)}</span>
                    <span className="guide-card-topic">{formatPrecision(sample.sample.precision)}</span>
                  </div>
                  <strong>{getModelLabel(sample.sample.modelSlug)}</strong>
                  <span>
                    Estimate {sample.currentEstimateGb.toFixed(1)} GB; observed {formatObserved(sample)}.
                  </span>
                  {sample.sample.source ? (
                    <Link className="guide-card-action" href={sample.sample.source.url} rel="noreferrer" target="_blank">
                      {sample.sample.source.name} &rarr;
                    </Link>
                  ) : null}
                  <p className="related-note">{getSampleNote(sample)}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Which tier should you test first?</h2>
            <p className="related-note">
              This table is a testing shortcut, not a hardware recommendation. Use it to decide what to validate next.
            </p>
            <div className="guide-card-grid">
              {testingMatrix.map((item) => (
                <div className="guide-card guide-card-featured" key={item.workflow}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Test first</span>
                    <span className="guide-card-topic">{item.startingTier}</span>
                  </div>
                  <strong>{item.workflow}</strong>
                  <span>{item.reason}</span>
                  <p className="related-note">{item.nextCheck}</p>
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
            <h2>Before changing GPU, debug the workflow</h2>
            <p className="guide-section-lead">
              A memory error can come from settings, graph shape, model family, runtime behavior, or hardware limits.
              Work through these checks before turning the page into a hardware decision.
            </p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
              {oomTriageSteps.map((step) => (
                <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5" key={step.title}>
                  <h3 className="text-[17px] leading-snug font-semibold tracking-normal text-[var(--foreground)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-7 text-[var(--muted)]">{step.detail}</p>
                </div>
              ))}
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

          <section className="tool-section guide-primary-section">
            <h2>Rules that change the VRAM tier choice</h2>
            <p className="related-note">
              Use these rules to decide whether to lower workflow settings, test offload, move up a VRAM tier, or
              validate in cloud before choosing a GPU.
            </p>
            <div className="guide-card-grid">
              {sourceBackedDecisionInsights.map((item) => (
                <div className="guide-card guide-card-featured" key={item.title}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">VRAM planning rule</span>
                    <span className="guide-card-topic">Runtime evidence</span>
                  </div>
                  <strong>{item.title}</strong>
                  <span>{item.decision}</span>
                  <p className="related-note">{item.detail}</p>
                  <div className="guide-source-inline-links" aria-label={`Sources for ${item.title}`}>
                    {item.sources.map((source) => (
                      <Link className="guide-card-action" href={source.href} key={source.href} rel="noreferrer" target="_blank">
                        {source.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>GPU profiles to inspect after the estimate</h2>
            <p className="related-note">
              Use these profiles as planning references for different image-generation tiers. They are not rankings.
            </p>
            <div className="guide-card-grid">
              {relatedGpuRoutes.map((gpu) => (
                <Link className="guide-card guide-card-featured" href={gpu.href} key={gpu.href}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">GPU profile</span>
                    <span className="guide-card-topic">Next check</span>
                  </div>
                  <strong>{gpu.label}</strong>
                  <span>{gpu.reason}</span>
                </Link>
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
