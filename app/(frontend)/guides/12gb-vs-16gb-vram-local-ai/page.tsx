import Link from "next/link";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { aiModelService } from "@/services/ai-model.service";

const PAGE_TITLE = "12GB vs 16GB VRAM for Local AI";
const PAGE_DESCRIPTION =
  "Compare 12GB and 16GB GPU VRAM for local LLMs, image generation, MoE planning, and first local AI hardware decisions without unsupported benchmark claims.";
const PAGE_PATH = "/guides/12gb-vs-16gb-vram-local-ai";

const quickVerdicts = [
  {
    tier: "12GB VRAM",
    verdict: "Practical first testing tier",
    body:
      "Use 12GB when your main goal is source-backed 7B or 8B dense LLM planning, modest context testing, and cautious SDXL-class image experiments.",
  },
  {
    tier: "16GB VRAM",
    verdict: "Better buffer for experimentation",
    body:
      "Use 16GB when you want more room for context growth, runtime overhead, image-generation settings, and less edge-of-memory troubleshooting.",
  },
  {
    tier: "24GB+ or cloud",
    verdict: "Use when the workload is clearly larger",
    body:
      "Move beyond 16GB when planning heavier image workflows, larger dense models, MoE experiments, long-context tests, or uncertain setups that need validation first.",
  },
] as const;

const decisionRows = [
  {
    workload: "Dense 7B LLM, 4-bit planning",
    twelve: "Good first testing tier when context stays modest.",
    sixteen: "More comfortable if you compare runtimes or longer prompts.",
    nextStep: "Review Qwen2.5 7B or Mistral 7B pages, then test the exact quantized artifact.",
  },
  {
    workload: "Dense 8B LLM, 4-bit planning",
    twelve: "Reasonable for first local testing, but long context can narrow the buffer.",
    sixteen: "Safer experimentation tier for prompt growth and runtime overhead.",
    nextStep: "Start from the Llama 3.1 8B page and rerun the calculator with your context target.",
  },
  {
    workload: "Dense 14B or 32B planning",
    twelve: "Often becomes constrained as quantization, context, and runtime overhead stack up.",
    sixteen: "May still be only an early planning tier depending on quantization.",
    nextStep: "Use the calculator before narrowing a GPU tier; avoid treating size class alone as proof.",
  },
  {
    workload: "SDXL-class image generation",
    twelve: "A realistic planning tier for conservative SDXL tests.",
    sixteen: "Better buffer for resolution, VAE, LoRA, ControlNet, and runtime differences.",
    nextStep: "Use the image-generation guide and validate your exact workflow.",
  },
  {
    workload: "SD3.5 Large, FLUX, or heavier image workflows",
    twelve: "Usually not the right planning target for heavier workflows.",
    sixteen: "Still may be below the needed local tier without offload or careful testing.",
    nextStep: "Consider 24GB+ or cloud validation before local hardware commitment.",
  },
  {
    workload: "MoE models such as Mixtral or DeepSeek-R1",
    twelve: "Do not estimate by dense LLM shortcuts.",
    sixteen: "Still not a guarantee because MoE memory depends on packaging and runtime behavior.",
    nextStep: "Use the calculator MoE mode and treat active parameters as architecture context, not the VRAM floor.",
  },
] as const;

const fastRoutingCards = [
  {
    estimate: "Below 8GB",
    read: "Constraint test",
    body:
      "Retest assumptions before treating an 8GB-class setup as comfortable. Context, runtime overhead, and exact artifact choice can erase the margin.",
    href: "/tools/vram-calculator",
    cta: "Retest assumptions",
  },
  {
    estimate: "Around 9-12GB",
    read: "12GB first test",
    body:
      "Use 12GB as a practical first testing tier for compact dense LLM or conservative image experiments, then validate the exact runtime.",
    href: "/models/qwen2-5-7b-instruct/vram-requirements",
    cta: "Open a 7B model page",
  },
  {
    estimate: "Around 13-16GB",
    read: "16GB buffer",
    body:
      "Use 16GB as the experimentation buffer when prompt length, runtime comparison, or mixed local AI work is likely to grow.",
    href: "/gpu",
    cta: "Review GPU profiles",
  },
  {
    estimate: "Close to 16GB limit",
    read: "Validate before local commitment",
    body:
      "If the estimate nearly fills 16GB, use a smaller context test, cloud validation, or a higher tier before narrowing local hardware.",
    href: "/guides/cloud-gpu-vs-local-gpu",
    cta: "Compare cloud vs local",
  },
  {
    estimate: "Above 16GB or uncertain",
    read: "24GB+ or separate workflow",
    body:
      "Move beyond the 12GB vs 16GB question when MoE, heavier image workflows, larger dense models, or unknown runtime behavior dominate.",
    href: "/tools/vram-calculator",
    cta: "Use the right estimate mode",
  },
] as const;

const planningSteps = [
  {
    label: "01",
    title: "Pick the workload family",
    body:
      "Separate dense text LLMs, MoE models, and image generation before comparing 12GB and 16GB. They use different calculator paths.",
    href: "/tools/vram-calculator",
    cta: "Open calculator",
  },
  {
    label: "02",
    title: "Choose the exact model page when available",
    body:
      "Use source-backed model pages for the first 7B and 8B planning targets instead of relying on a generic parameter-size guess.",
    href: "/guides#planned-guides",
    cta: "Open guide hub",
  },
  {
    label: "03",
    title: "Adjust quantization and context",
    body:
      "The jump from 4-bit to 8-bit or from modest prompts to larger context can matter more than the difference between nearby model families.",
    href: "/tools/vram-calculator",
    cta: "Test assumptions",
  },
  {
    label: "04",
    title: "Compare GPU profiles after the estimate",
    body:
      "Use source-aware GPU pages after you have a memory target. Do not turn the guide into a buying recommendation.",
    href: "/gpu",
    cta: "Review GPUs",
  },
] as const;

const tierCards = [
  {
    tier: "8GB",
    role: "Constraint tier",
    body:
      "Useful for learning and tight tests, but the margin can disappear quickly with context, runtime overhead, or image settings.",
  },
  {
    tier: "12GB",
    role: "First practical local tier",
    body:
      "A strong starting point for compact dense LLM testing and cautious SDXL planning when the exact workflow is validated.",
  },
  {
    tier: "16GB",
    role: "Experimentation buffer",
    body:
      "A better fit when you expect longer prompts, more image workflow variation, or repeated local testing across runtimes.",
  },
  {
    tier: "24GB+",
    role: "Large-workload tier",
    body:
      "More appropriate for heavier image models, larger dense LLMs, MoE exploration, and local tests that do not fit comfortably below 16GB.",
  },
] as const;

const cautionCards = [
  {
    title: "Do not use active MoE parameters as the VRAM floor",
    body:
      "Active parameters describe per-token routing context. They do not prove that only those weights need to live in GPU memory.",
  },
  {
    title: "Do not treat one image sample as universal",
    body:
      "SDXL, SD3.5, and FLUX samples are setup-specific. Resolution, VAE, LoRA, ControlNet, offload, and runtime version can shift memory.",
  },
  {
    title: "Do not compare only headline VRAM",
    body:
      "A 12GB or 16GB decision also depends on model artifact, quantization format, context length, driver stack, storage flow, and tolerance for testing.",
  },
] as const;

const firstBuyerChecks = [
  "If you only want compact 7B or 8B dense LLM testing, 12GB is a defensible first target after calculator validation.",
  "If you want fewer memory-edge surprises, 16GB is the better buffer for local experimentation.",
  "If image generation is a major goal, read image workflow guidance before assuming a dense LLM tier applies.",
  "If MoE or 70B-class work is the goal, compare 12GB and 16GB only as learning tiers, not final targets.",
  "If the estimate lands close to the card limit, cloud testing can be a cleaner validation step than buying first.",
] as const;

const personaRoutes = [
  {
    persona: "First local LLM builder",
    likelyTier: "12GB then compare",
    reason:
      "You are probably testing dense 7B or 8B models first, so the key risk is context and runtime overhead rather than a large model family jump.",
    href: "/models/llama-3-1-8b-instruct/vram-requirements",
    cta: "Open an 8B model page",
  },
  {
    persona: "Image-generation user",
    likelyTier: "16GB buffer",
    reason:
      "SDXL-class work can be plausible below 16GB, but VAE, LoRA, ControlNet, resolution, and runtime choices make extra buffer more valuable.",
    href: "/guides/image-generation-vram-planning",
    cta: "Open image VRAM guide",
  },
  {
    persona: "MoE or large-model explorer",
    likelyTier: "Beyond 16GB",
    reason:
      "MoE models need the separate calculator mode because total parameters, packaged size, active parameters, and offload behavior do not map to dense LLM shortcuts.",
    href: "/tools/vram-calculator",
    cta: "Use MoE mode",
  },
  {
    persona: "Unsure or budget-sensitive planner",
    likelyTier: "Estimate first",
    reason:
      "If the estimate lands near a memory boundary, cloud testing or a smaller model page can reduce the risk of committing too early.",
    href: "/guides/cloud-gpu-vs-local-gpu",
    cta: "Compare cloud vs local",
  },
] as const;

const scopeBoundaries = [
  {
    title: "Use this guide for VRAM tier choice",
    body:
      "This page answers whether 12GB or 16GB is the better planning tier for a workload shape. It does not try to replace model-specific pages or runtime validation.",
    href: "/tools/vram-calculator",
    cta: "Estimate the tier",
  },
  {
    title: "Use the GPU selection guide for the broader workflow",
    body:
      "If the question is not just 12GB vs 16GB, start from the local LLM GPU guide to decide model, quantization, context, tier, validation, and GPU profile order.",
    href: "/guides/how-to-choose-a-gpu-for-local-llms",
    cta: "Choose GPU path",
  },
  {
    title: "Use model pages for exact dense LLM context",
    body:
      "The Llama, Qwen, and Mistral pages hold model-specific 7B and 8B guidance, source confirmations, and first-builder answers.",
    href: "/guides#planned-guides",
    cta: "Browse model pages",
  },
  {
    title: "Use the image guide for SDXL, SD3.5, and FLUX",
    body:
      "Image generation needs separate workflow evidence because resolution, adapters, VAE, runtime, and offload choices can dominate the result.",
    href: "/guides/image-generation-vram-planning",
    cta: "Open image guide",
  },
  {
    title: "Use the cloud guide when local fit is uncertain",
    body:
      "Cloud GPU planning belongs in its own guide because provider choice, temporary testing, data movement, and setup effort are separate decisions.",
    href: "/guides/cloud-gpu-vs-local-gpu",
    cta: "Open cloud guide",
  },
] as const;

const faqItems = [
  {
    question: "Is 12GB VRAM enough for local AI?",
    answer:
      "It can be enough for many compact dense LLM tests and cautious SDXL-style experiments, especially with quantization and modest context. It is not a universal requirement or guarantee.",
  },
  {
    question: "Is 16GB VRAM worth planning around instead of 12GB?",
    answer:
      "16GB is often the more comfortable planning tier when you expect longer prompts, runtime comparisons, image workflow variation, or repeated local experimentation. It still needs workload-specific validation.",
  },
  {
    question: "Can I run 7B or 8B models on 12GB VRAM?",
    answer:
      "The current source-backed model pages treat 12GB as a practical first testing tier for 4-bit dense 7B and 8B planning. Exact runtime, quantization format, and context length still matter.",
  },
  {
    question: "Does 16GB VRAM handle FLUX or Stable Diffusion 3.5 Large?",
    answer:
      "Do not assume that. The current image-generation guidance treats heavier SD3.5 Large and FLUX-style workflows as candidates for 24GB-class or carefully validated offload/cloud testing.",
  },
  {
    question: "Should MoE models be judged by active parameters only?",
    answer:
      "No. The calculator uses a separate MoE mode because total parameters, packaged model size, active parameters, routing, offload, and runtime behavior all matter.",
  },
  {
    question: "Should I buy a 12GB or 16GB GPU from this guide?",
    answer:
      "This guide is not buying advice. Use it to choose a validation path, then compare source-backed GPU profiles and test the exact workload before making a hardware decision.",
  },
] as const;

const continuePlanningLinks = [
  {
    title: "Use the VRAM Calculator",
    description: "Estimate dense LLM, MoE, and image-generation memory before comparing GPU tiers.",
    href: "/tools/vram-calculator",
    tone: "primary",
  },
  {
    title: "Choose a local LLM GPU path",
    description: "Use the broader workflow when you need to choose model, assumptions, VRAM tier, and validation order.",
    href: "/guides/how-to-choose-a-gpu-for-local-llms",
    tone: "secondary",
  },
  {
    title: "Review GPU profiles",
    description: "Check source-aware GPU pages after the estimate gives you a memory target.",
    href: "/gpu",
    tone: "secondary",
  },
  {
    title: "Compare local GPU options",
    description: "Use comparison pages to narrow local planning without turning results into buying advice.",
    href: "/compare",
    tone: "secondary",
  },
  {
    title: "Cloud GPU vs local GPU",
    description: "Use cloud testing when 12GB or 16GB is close to the edge of your workload.",
    href: "/guides/cloud-gpu-vs-local-gpu",
    tone: "secondary",
  },
] as const;

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
  type: "article",
});

export default function TwelveVsSixteenVramGuidePage() {
  const settings = getSiteSettings();
  const pageUrl = buildCanonicalPath(PAGE_PATH);
  const modelVramPages = aiModelService.listModelVramPages();

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
            <span aria-current="page">12GB vs 16GB VRAM</span>
          </nav>

          <header className="tool-hero guide-hero">
            <p className="eyebrow">Local AI VRAM guide</p>
            <h1>{PAGE_TITLE}</h1>
            <p className="tool-lead">
              Use this guide to decide whether 12GB or 16GB is the better local AI planning tier for dense LLMs,
              image generation, MoE experiments, and first workstation decisions.
            </p>
            <div className="guide-hero-summary">
              <p>
                The short version: 12GB is a practical first testing tier for compact source-backed local AI workloads,
                while 16GB gives more room for context, runtime overhead, and image workflow variation. Neither tier is
                a guarantee.
              </p>
              <div className="guide-hero-links">
                <Link href="/tools/vram-calculator">Estimate your workload first</Link>
                <Link href="/gpu">Review source-aware GPU profiles</Link>
              </div>
            </div>
          </header>

          <p className="tool-disclaimer">
            Planning notice: this page does not include benchmark, tokens-per-second, image-speed, price, stock, or
            buying recommendation claims. Use it to choose a validation path before comparing hardware.
          </p>

          <section className="tool-section guide-primary-section">
            <h2>Quick answer</h2>
            <div className="guide-verdict-grid">
              {quickVerdicts.map((item) => (
                <div className="guide-verdict-card" key={item.tier}>
                  <span>{item.tier}</span>
                  <h3>{item.verdict}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>12GB vs 16GB decision table</h2>
            <p className="related-note">
              Use this table to pick the next test, not to pick a final GPU. The exact model artifact, runtime,
              quantization, context length, and image pipeline can change the result.
            </p>
            <div className="comparison-table-wrap">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Workload</th>
                    <th>12GB planning read</th>
                    <th>16GB planning read</th>
                    <th>Next validation step</th>
                  </tr>
                </thead>
                <tbody>
                  {decisionRows.map((row) => (
                    <tr key={row.workload}>
                      <th scope="row">{row.workload}</th>
                      <td data-label="12GB planning read">{row.twelve}</td>
                      <td data-label="16GB planning read">{row.sixteen}</td>
                      <td data-label="Next validation step">{row.nextStep}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Fast routing after your estimate</h2>
            <p className="related-note">
              Match your calculator result to the closest band, then open the route that reduces the next uncertainty.
            </p>
            <div className="guide-card-grid">
              {fastRoutingCards.map((card) => (
                <div className="guide-card guide-card-featured" key={card.estimate}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Estimate band</span>
                    <span className="guide-card-topic">{card.estimate}</span>
                  </div>
                  <strong>{card.read}</strong>
                  <span>{card.body}</span>
                  <Link className="guide-card-action" href={card.href}>
                    {card.cta} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>Use source-backed model pages before generalizing</h2>
            <p className="guide-section-lead">
              The current model VRAM pages cover the first dense local LLM batch. They are better starting points than
              a generic 7B-size shortcut because each page keeps source-backed model facts separate from
              calculator assumptions.
            </p>
            <div className="guide-card-grid model-compare-grid">
              {modelVramPages.map((page) => (
                <div className="guide-card guide-card-featured" key={page.model.slug}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Model VRAM</span>
                    <span className="guide-card-topic">{page.model.parameterCount ?? "Dense LLM"}</span>
                  </div>
                  <strong>{page.model.name}</strong>
                  <span>{page.beginnerAnswer}</span>
                  <Link href={page.path}>
                    Open model page <span>&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Planning workflow</h2>
            <div className="guide-workflow-grid guide-workflow-grid-four">
              {planningSteps.map((step) => (
                <div className="guide-workflow-card" key={step.label}>
                  <span>{step.label}</span>
                  <h3>{step.title}</h3>
                  <div className="guide-workflow-copy">
                    <p>{step.body}</p>
                  </div>
                  <Link href={step.href}>{step.cta}</Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>How the tiers should be interpreted</h2>
            <p className="guide-section-lead">
              VRAM tiers are planning bands. A workload that barely fits a tier on paper deserves a runtime test before
              the tier becomes a hardware target.
            </p>
            <div className="guide-point-grid">
              {tierCards.map((card) => (
                <div className="guide-point-card" key={card.tier}>
                  <span>{card.tier}</span>
                  <h3>{card.role}</h3>
                  <p>{card.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section explanation-grid guide-readability-grid">
            <div>
              <h2>When 12GB is the cleaner answer</h2>
              <p className="guide-section-copy">
                Choose 12GB as the first planning tier when the workload is compact, source-backed, and easy to test:
                dense 7B or 8B models in 4-bit form, modest context, and image workflows that you can validate without
                extra adapters or high-resolution settings.
              </p>
              <p className="guide-section-copy">
                The risk is edge behavior. A setup can move from comfortable to constrained when runtime overhead,
                context length, batch size, or offload behavior changes.
              </p>
            </div>
            <div>
              <h2>When 16GB is the better buffer</h2>
              <p className="guide-section-copy">
                Choose 16GB as the planning tier when you expect to compare runtimes, test longer prompts, keep more
                local headroom, or move between dense LLM and image-generation workflows on the same machine.
              </p>
              <p className="guide-section-copy">
                The caveat is that 16GB is still not a large-model guarantee. Larger dense models, MoE models, and
                heavier image pipelines can move beyond this tier.
              </p>
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Image generation and MoE cautions</h2>
            <p className="related-note">
              These two categories are where simple 12GB vs 16GB answers most often become misleading.
            </p>
            <div className="guide-card-grid">
              {cautionCards.map((card) => (
                <div className="guide-card guide-card-featured" key={card.title}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Guardrail</span>
                    <span className="guide-card-topic">Planning only</span>
                  </div>
                  <strong>{card.title}</strong>
                  <span>{card.body}</span>
                </div>
              ))}
            </div>
            <div className="related-links model-compare-links">
              <Link href="/guides/image-generation-vram-planning">
                Image-generation VRAM planning <span>&rarr;</span>
              </Link>
              <Link href="/tools/vram-calculator">
                Use MoE estimate mode <span>&rarr;</span>
              </Link>
              <Link href="/guides/cloud-gpu-vs-local-gpu">
                Cloud GPU vs local GPU <span>&rarr;</span>
              </Link>
            </div>
          </section>

          <section className="tool-section">
            <h2>First local GPU buyer checks</h2>
            <p className="guide-section-lead">
              Use these checks to avoid turning a memory tier into a premature purchase decision.
            </p>
            <ul className="guide-factor-list">
              {firstBuyerChecks.map((check) => (
                <li key={check}>{check}</li>
              ))}
            </ul>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Recommended next click by user type</h2>
            <p className="related-note">
              Pick the row that sounds closest to your situation. The goal is to keep the next step narrow instead of
              sending every reader to every route.
            </p>
            <div className="guide-card-grid">
              {personaRoutes.map((route) => (
                <div className="guide-card guide-card-featured" key={route.persona}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">User path</span>
                    <span className="guide-card-topic">{route.likelyTier}</span>
                  </div>
                  <strong>{route.persona}</strong>
                  <span>{route.reason}</span>
                  <Link className="guide-card-action" href={route.href}>
                    {route.cta} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section">
            <h2>What this guide does not replace</h2>
            <p className="guide-section-lead">
              This page is intentionally narrow. It should help users choose a VRAM tier, then hand them to the deeper
              page that matches their next uncertainty.
            </p>
            <div className="guide-point-grid">
              {scopeBoundaries.map((item) => (
                <div className="guide-point-card" key={item.title}>
                  <span>Scope</span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                  <Link className="guide-card-action" href={item.href}>
                    {item.cta} &rarr;
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section related-section guide-primary-section">
            <p className="eyebrow">Continue planning</p>
            <h2>Next routes</h2>
            <div className="guide-cta-grid">
              {continuePlanningLinks.map((item) => (
                <div className={`guide-cta-card guide-cta-card-${item.tone}`} key={item.title}>
                  <span className="guide-cta-label">{item.tone === "primary" ? "Primary next step" : "Related route"}</span>
                  <strong>{item.title}</strong>
                  <p>{item.description}</p>
                  <Link href={item.href}>Open route</Link>
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
        </div>
      </article>
    </>
  );
}
