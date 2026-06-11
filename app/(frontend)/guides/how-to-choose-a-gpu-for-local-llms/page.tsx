import Link from "next/link";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { aiModelService } from "@/services/ai-model.service";

const PAGE_TITLE = "How to Choose a GPU for Local LLMs";
const PAGE_DESCRIPTION =
  "Choose a GPU for local LLM planning by working from model size, quantization, context length, MoE behavior, VRAM tier, and validation steps instead of unsupported benchmark or buying claims.";
const PAGE_PATH = "/guides/how-to-choose-a-gpu-for-local-llms";

const starterQuestions = [
  {
    label: "Model",
    question: "Which exact model or model family are you testing first?",
    body:
      "Start from a real model page or calculator record. A generic local LLM goal is too broad to choose a useful GPU tier.",
  },
  {
    label: "Architecture",
    question: "Is it a dense LLM, MoE model, or mixed image workflow?",
    body:
      "Dense models, MoE models, and image-generation pipelines need different estimate paths and different validation checks.",
  },
  {
    label: "Format",
    question: "What quantization format are you actually planning to run?",
    body:
      "4-bit, 8-bit, and FP16/BF16 can land in very different memory bands, even when the model name stays the same.",
  },
  {
    label: "Context",
    question: "How much context does your real workflow need?",
    body:
      "Short chat prompts, coding sessions, retrieval context, and long documents create different KV-cache pressure.",
  },
  {
    label: "Risk",
    question: "Is the estimate close enough to the limit that you should validate first?",
    body:
      "If the estimate lands near a VRAM boundary, use a runtime test or cloud validation before narrowing local hardware.",
  },
] as const;

const diagnosticFlow = [
  {
    label: "01",
    title: "Name the model",
    body:
      "Pick the exact model family or page first. If the page exists, use it as the starting context before opening GPU profiles.",
    href: "/guides#planned-guides",
    cta: "Browse model pages",
  },
  {
    label: "02",
    title: "Choose dense or MoE path",
    body:
      "Use dense LLM assumptions for ordinary dense models. Switch to MoE mode when total parameters, active parameters, and packaging differ.",
    href: "/tools/vram-calculator",
    cta: "Use calculator modes",
  },
  {
    label: "03",
    title: "Lock the quantization target",
    body:
      "Write down whether you are planning for 4-bit, 8-bit, or FP16/BF16. Do not compare GPUs from a vague model-size guess.",
    href: "/tools/vram-calculator",
    cta: "Set quantization",
  },
  {
    label: "04",
    title: "Stress the context assumption",
    body:
      "Move the estimate toward your real prompt shape: short chat, code context, retrieval context, or longer multi-turn work.",
    href: "/tools/vram-calculator",
    cta: "Adjust context",
  },
  {
    label: "05",
    title: "Check the memory boundary",
    body:
      "If the estimate is close to 8GB, 12GB, 16GB, or 24GB, treat that tier as a validation target instead of a comfortable answer.",
    href: "/guides/12gb-vs-16gb-vram-local-ai",
    cta: "Review tier tradeoffs",
  },
  {
    label: "06",
    title: "Read GPU profiles last",
    body:
      "Once the memory target is visible, compare source-aware GPU records. At this point GPU pages become useful research, not guessing.",
    href: "/gpu",
    cta: "Review GPUs",
  },
] as const;

const modelExampleUses = [
  {
    fallback: "Long-context caution",
    body:
      "Use this page to understand why a model's context metadata should not automatically become the local VRAM target.",
  },
  {
    fallback: "Compact 7B planning",
    body:
      "Use this page to see how a compact dense 7B model can still need context and runtime validation.",
  },
  {
    fallback: "Baseline 7B comparison",
    body:
      "Use this page as a clean 7B baseline before assuming another 7B or 8B model behaves identically.",
  },
] as const;

const whenNotToBuyYet = [
  {
    title: "The estimate sits near a VRAM boundary",
    body:
      "A result close to a tier limit is a signal to test the exact runtime, not a signal to immediately pick the cheapest card that crosses the line.",
  },
  {
    title: "You have not picked a runtime",
    body:
      "llama.cpp, Ollama, vLLM, Transformers-style paths, and offload settings can allocate memory differently.",
  },
  {
    title: "The model is MoE or unusually packaged",
    body:
      "MoE models need the separate estimate mode. Active parameters alone are not the resident VRAM requirement.",
  },
  {
    title: "You need long-context coding or retrieval",
    body:
      "Code files, retrieval chunks, and long chats can make context the dominant uncertainty.",
  },
  {
    title: "The same machine must also do image generation",
    body:
      "Image-generation memory drivers are separate. Validate the image workflow before assuming a local LLM GPU choice covers both jobs.",
  },
] as const;

const gpuProfileChecks = [
  {
    title: "Verified VRAM capacity",
    body:
      "Use the profile to confirm the card's memory capacity from source-backed fields before comparing a tier against your estimate.",
  },
  {
    title: "Source confidence",
    body:
      "Prefer records with reviewed source fields. Treat low-confidence or incomplete records as planning candidates, not facts.",
  },
  {
    title: "Comparison context",
    body:
      "Use comparison pages after the estimate so you compare realistic candidates instead of every GPU in the index.",
  },
  {
    title: "Non-memory constraints",
    body:
      "After VRAM, review physical fit, power, platform compatibility, drivers, and workflow setup outside this guide's scope.",
  },
] as const;

const avoidMistakes = [
  "Do not choose a GPU only from parameter count.",
  "Do not read active MoE parameters as a complete VRAM requirement.",
  "Do not treat one successful prompt as proof that longer context will fit.",
  "Do not compare GPU prices or stock from this guide; no live commerce data is used here.",
  "Do not treat calculator output as tokens-per-second, image-speed, or official hardware support evidence.",
] as const;

const nextToolRoutes = [
  {
    title: "Need a memory estimate?",
    body:
      "Use the calculator before any GPU comparison. It separates dense LLM, MoE, and image-generation estimate paths.",
    href: "/tools/vram-calculator",
    cta: "Run an estimate",
  },
  {
    title: "Need tier tradeoffs?",
    body:
      "Use the 12GB vs 16GB guide when the main uncertainty is whether a starter tier or buffer tier makes more sense.",
    href: "/guides/12gb-vs-16gb-vram-local-ai",
    cta: "Compare tiers",
  },
  {
    title: "Need model-specific facts?",
    body:
      "Use the model pages when the question is about a specific dense 7B or 8B planning target.",
    href: "/guides#planned-guides",
    cta: "Browse model pages",
  },
  {
    title: "Need to reduce local risk?",
    body:
      "Use the cloud guide when a temporary validation run is safer than committing to local hardware first.",
    href: "/guides/cloud-gpu-vs-local-gpu",
    cta: "Open cloud guide",
  },
] as const;

const faqItems = [
  {
    question: "What is the first thing to check when choosing a GPU for local LLMs?",
    answer:
      "Start with the model family and workload shape. Dense LLMs, MoE models, long-context coding use, and image-generation crossover should be estimated through separate assumptions before comparing GPUs.",
  },
  {
    question: "How much VRAM should a first local LLM GPU have?",
    answer:
      "For compact dense 7B and 8B 4-bit planning, 12GB is a practical first testing tier and 16GB is a more comfortable experimentation buffer. The exact runtime, quantization, and context still need validation.",
  },
  {
    question: "Should I choose the fastest GPU or the GPU with more VRAM?",
    answer:
      "This guide does not rank performance. For local LLM planning, first confirm that the workload fits the VRAM tier, then review source-aware GPU profiles and validate the exact runtime.",
  },
  {
    question: "Can the same GPU choice cover local LLMs and image generation?",
    answer:
      "Sometimes, but do not assume it. Image generation has separate memory drivers such as resolution, VAE, LoRA, ControlNet, runtime, and offload settings.",
  },
  {
    question: "Do MoE models need a different GPU planning method?",
    answer:
      "Yes. MoE models should not be estimated with dense LLM shortcuts or active parameters alone. Use the separate MoE estimate mode and treat the result as a planning baseline.",
  },
  {
    question: "Is this guide buying advice?",
    answer:
      "No. It avoids price, stock, affiliate, benchmark, speed, and guaranteed-fit claims. Use it to choose a validation path before making a hardware decision.",
  },
] as const;

const continuePlanningLinks = [
  {
    title: "Estimate VRAM first",
    description: "Use dense LLM, MoE, and image-generation modes before comparing GPU profiles.",
    href: "/tools/vram-calculator",
    tone: "primary",
  },
  {
    title: "Compare 12GB and 16GB",
    description: "Decide whether a starter tier or experimentation buffer better matches your workload.",
    href: "/guides/12gb-vs-16gb-vram-local-ai",
    tone: "secondary",
  },
  {
    title: "Review GPU profiles",
    description: "Move to source-aware GPU pages only after you have a memory target.",
    href: "/gpu",
    tone: "secondary",
  },
  {
    title: "Use cloud as a validation route",
    description: "Check cloud vs local planning when the local estimate is close to the edge.",
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

export default function ChooseGpuForLocalLlmsGuidePage() {
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
            <span aria-current="page">Choose a GPU for Local LLMs</span>
          </nav>

          <header className="tool-hero guide-hero">
            <p className="eyebrow">Local LLM GPU guide</p>
            <h1>{PAGE_TITLE}</h1>
            <p className="tool-lead">
              Use this guide to choose the right GPU planning path for local LLMs by starting from workload fit,
              model assumptions, quantization, context length, MoE behavior, and validation risk.
            </p>
            <div className="guide-hero-summary">
              <p>
                The practical answer is to choose a GPU last: estimate the model first, map the result to a VRAM tier,
                then compare source-aware GPU profiles after the workload has a memory target.
              </p>
              <div className="guide-hero-links">
                <Link href="/tools/vram-calculator">Estimate VRAM first</Link>
                <Link href="/guides/12gb-vs-16gb-vram-local-ai">Compare 12GB and 16GB</Link>
              </div>
            </div>
          </header>

          <p className="tool-disclaimer">
            Planning notice: this guide avoids benchmark, tokens-per-second, price, stock, affiliate, and guaranteed-fit
            claims. Use it to choose a validation path before making any hardware decision.
          </p>

          <section className="tool-section guide-primary-section">
            <h2>Start with these 5 questions</h2>
            <p className="related-note">
              Answer these before opening a GPU profile. The goal is to turn a vague hardware question into a
              specific validation path.
            </p>
            <div className="guide-point-grid">
              {starterQuestions.map((item) => (
                <div className="guide-point-card" key={item.question}>
                  <span>{item.label}</span>
                  <h3>{item.question}</h3>
                  <p>{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>Decision flow: from model to GPU profile</h2>
            <p className="related-note">
              This is the main purpose of the guide. Follow the sequence before you compare specific cards.
            </p>
            <div className="guide-workflow-grid guide-workflow-grid-three">
              {diagnosticFlow.map((step) => (
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
            <h2>Start from these model examples</h2>
            <p className="guide-section-lead">
              Use the current dense LLM pages as examples of decision types, not as generic proof that every nearby
              model will fit the same GPU tier.
            </p>
            <div className="guide-card-grid model-compare-grid">
              {modelVramPages.map((page, index) => (
                <div className="guide-card guide-card-featured" key={page.model.slug}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Example</span>
                    <span className="guide-card-topic">{modelExampleUses[index]?.fallback ?? "Model planning"}</span>
                  </div>
                  <strong>{page.model.name}</strong>
                  <span>{modelExampleUses[index]?.body ?? page.planningSummary}</span>
                  <Link href={page.path}>
                    Open model page <span>&rarr;</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section explanation-grid guide-readability-grid">
            <div>
              <h2>What matters more than the GPU name</h2>
              <p className="guide-section-copy">
                The useful inputs are model family, parameter size, quantization, context length, runtime, offload
                behavior, and tolerance for troubleshooting. A GPU model name is only useful after those inputs produce
                a memory target.
              </p>
              <p className="guide-section-copy">
                This is why the page links into the calculator and model pages before the GPU index. It keeps the
                reader from comparing cards without knowing the workload boundary.
              </p>
            </div>
            <div>
              <h2>When to move beyond local-first planning</h2>
              <p className="guide-section-copy">
                Move to cloud validation when the estimate is close to the card limit, the runtime is unfamiliar, the
                model is MoE or larger than your first dense LLM target, or the workload needs heavier image-generation
                crossover.
              </p>
              <p className="guide-section-copy">
                Cloud testing is not a provider ranking here. It is a way to reduce uncertainty before committing to a
                local hardware path.
              </p>
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>When not to buy yet</h2>
            <p className="related-note">
              These are validation triggers. They mean the next step should be testing or narrowing assumptions, not
              jumping straight to a purchase decision.
            </p>
            <div className="guide-card-grid">
              {whenNotToBuyYet.map((check) => (
                <div className="guide-card guide-card-featured" key={check.title}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Pause</span>
                    <span className="guide-card-topic">Validate first</span>
                  </div>
                  <strong>{check.title}</strong>
                  <span>{check.body}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="tool-section guide-primary-section">
            <h2>How to read GPU profiles after estimating VRAM</h2>
            <p className="related-note">
              Once the workload has a memory target, GPU profiles become useful. Read them as evidence records, not as
              rankings.
            </p>
            <div className="guide-card-grid">
              {gpuProfileChecks.map((check) => (
                <div className="guide-card guide-card-featured" key={check.title}>
                  <div className="guide-card-meta">
                    <span className="guide-card-label">Profile check</span>
                    <span className="guide-card-topic">After estimate</span>
                  </div>
                  <strong>{check.title}</strong>
                  <span>{check.body}</span>
                </div>
              ))}
            </div>
            <div className="related-links model-compare-links">
              <Link href="/gpu">
                Open GPU profiles <span>&rarr;</span>
              </Link>
              <Link href="/compare">
                Compare narrowed options <span>&rarr;</span>
              </Link>
            </div>
          </section>

          <section className="tool-section">
            <h2>Mistakes to avoid</h2>
            <p className="guide-section-lead">
              These are the patterns that most often turn a useful planning question into a weak GPU recommendation.
            </p>
            <ul className="guide-factor-list">
              {avoidMistakes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="tool-section">
            <h2>Choose your next tool</h2>
            <p className="guide-section-lead">
              Pick the next route based on the uncertainty you still need to reduce.
            </p>
            <div className="guide-point-grid">
              {nextToolRoutes.map((card) => (
                <div className="guide-point-card" key={card.title}>
                  <span>Next</span>
                  <h3>{card.title}</h3>
                  <p>{card.body}</p>
                  <Link className="guide-card-action" href={card.href}>
                    {card.cta} &rarr;
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
