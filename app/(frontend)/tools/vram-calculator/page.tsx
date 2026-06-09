import Link from "next/link";
import VramCalculator from "@/components/VramCalculator";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";

const PAGE_TITLE = "VRAM Calculator for Local AI and Image Generation";
const PAGE_DESCRIPTION =
  "Estimate how much GPU VRAM you may need for local LLMs, quantized models, Stable Diffusion, FLUX, and image-generation workflows.";
const PAGE_PATH = "/tools/vram-calculator";

export const metadata = buildMetadata({
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  path: PAGE_PATH,
});

const faqItems = [
  {
    question: "How much VRAM do I need for a 7B model?",
    answer:
      "It depends on quantization, context length, runtime, and overhead. A quantized 7B configuration may require far less memory than FP16, so use the calculator as an initial estimate and validate the intended runtime.",
  },
  {
    question: "Is 8GB VRAM enough for local AI?",
    answer:
      "It may be sufficient for some smaller or quantized workloads, but it is not a universal threshold. Image generation, longer contexts, larger batches, and different runtimes can increase memory demand.",
  },
  {
    question: "How much VRAM do I need for SDXL or FLUX?",
    answer:
      "Image-generation VRAM depends on the model family, resolution, batch size, runtime, VAE, and adapters such as LoRA or ControlNet. Use the image-generation mode as a planning estimate, then validate the exact workflow.",
  },
  {
    question: "Does quantization reduce VRAM usage?",
    answer:
      "Quantization generally reduces weight memory compared with higher precision formats, but actual VRAM use also includes context, KV cache, runtime overhead, and other implementation details.",
  },
];

const relatedLinks = [
  { label: "Compare source-backed GPU profiles", href: "/compare" },
  { label: "Local LLM GPU planning guides", href: "/guides#planned-guides" },
  { label: "Image generation VRAM planning", href: "/guides/image-generation-vram-planning" },
  { label: "View matching GPU profiles", href: "/gpu" },
  { label: "Budget AI Workstation", href: "/builds#planned-builds" },
];

export default function VramCalculatorPage() {
  const settings = getSiteSettings();
  const pageUrl = buildCanonicalPath(PAGE_PATH);
  const schemas = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: PAGE_TITLE,
      url: pageUrl,
      applicationCategory: "UtilityApplication",
      operatingSystem: "Web",
    },
    {
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
    },
    {
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
          name: "VRAM Calculator",
          item: pageUrl,
        },
      ],
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

      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Tools</span>
            <span>/</span>
            <span aria-current="page">VRAM Calculator</span>
          </nav>

          <header className="tool-hero">
            <p className="eyebrow">Free planning tool</p>
            <h1>{PAGE_TITLE}</h1>
            <p className="tool-lead">{PAGE_DESCRIPTION}</p>
          </header>

          <VramCalculator />

          <p className="tool-disclaimer">
            This calculator provides a rough estimate only. Use runtime-specific
            validation before selecting hardware: actual VRAM usage depends on
            quantization, context length, KV cache, runtime, batch size, drivers,
            and model architecture.
          </p>

          <section className="tool-section">
            <h2>Estimate GPU VRAM for LLMs and AI workloads</h2>
            <div className="intro-copy">
              <p>
                A VRAM calculator for LLM planning is useful when you are deciding
                whether a local AI workflow is realistic on a single GPU. Model size
                alone is not enough to answer that question. A local language model
                loaded in FP16 can need substantially more memory than a quantized
                version of the same model, while longer prompts and conversations
                add memory pressure through the context window and KV cache. This
                estimator gives you a starting range before you test a specific
                model, runtime, and GPU configuration.
              </p>
              <p>
                Choose a model size, a rough quantization level, and the context
                preset that most closely represents your intended workload. The output is
                meant for early GPU memory planning: exploring local LLM GPU memory,
                evaluating whether a build should target a larger VRAM tier, or
                deciding where further benchmarking is necessary. The same caution
                applies when researching Stable Diffusion VRAM needs and other AI
                image workloads, where resolution, batch size, model pipeline, and
                extensions can materially alter usage.
              </p>
              <p>
                The LLM estimate is deliberately conservative and transparent. It uses
                simple memory assumptions for FP16, INT8, and INT4 weights, adds a
                context allowance, then applies your selected safety margin. It does
                not report tokens per second, generation speed, or official hardware
                support. Use it to narrow your initial options, then verify the
                selected runtime, quantization format, driver stack, and actual
                model on the hardware you plan to run.
              </p>
              <p>
                The image-generation mode uses separate workflow presets for SDXL,
                Stable Diffusion 3.5, and FLUX-style planning. Resolution, batch
                size, runtime, VAE, LoRA, and ControlNet can change memory use, so
                the output remains a planning tier rather than a benchmark-backed
                support claim.
              </p>
              <p className="gpu-calc-cta-inline">
                <Link href="/guides/image-generation-vram-planning">
                  Read the image-generation VRAM planning guide
                </Link>
              </p>
            </div>
          </section>

          <section className="tool-section process-section" aria-label="VRAM estimate workflow">
            <div>
              <p className="eyebrow">Visual workflow</p>
              <h2>Turn workload assumptions into a planning tier</h2>
              <p className="section-copy">
                Each input changes the rough estimate. The output is a direction
                for further validation, not a verified performance claim.
              </p>
            </div>
            <ol className="estimate-flow">
              <li>
                <strong>Model size</strong>
                <span>Parameter scale</span>
              </li>
              <li>
                <strong>Quantization</strong>
                <span>Weight format</span>
              </li>
              <li>
                <strong>Context</strong>
                <span>Memory overhead</span>
              </li>
              <li>
                <strong>VRAM estimate</strong>
                <span>Rough output</span>
              </li>
              <li>
                <strong>GPU tier</strong>
                <span>Research next</span>
              </li>
            </ol>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>How this VRAM estimate works</h2>
              <p>
                The MVP estimate applies approximately 2 GB per billion parameters
                for FP16, 1 GB for INT8, or 0.5 GB for INT4, plus a short, medium,
                or long context overhead and a configurable safety margin. These
                assumptions are a planning heuristic only and require validation
                against the target runtime.
              </p>
            </div>
            <div>
              <h2>GPU VRAM planning tiers</h2>
              <p>
                Results are grouped into planning tiers such as 8 GB, 12 GB, 16 GB,
                or 24 GB and above. A tier is not a GPU endorsement. GPU records and
                model requirements remain draft until sourced specifications and
                controlled workload tests are available.
              </p>
            </div>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>How to read this estimate</h2>
              <p>
                Treat the estimate as a planning baseline. First review whether
                your selected model, runtime, and context are realistic for your
                workflow, then compare source-backed GPU profiles before testing
                the exact setup on your own environment.
              </p>
              <p className="gpu-calc-cta-inline">
                <Link href="/compare">After estimating VRAM, compare source-backed GPU profiles</Link>
              </p>
            </div>
            <div>
              <h2>Source-backed vs planning-only matches</h2>
              <p>
                Source-backed matches prioritize GPUs with verified core fields.
                Planning-only candidates can still appear when needed, but they
                are not benchmark claims and require additional verification.
              </p>
            </div>
          </section>

          <section className="tool-section faq-section">
            <h2>Frequently asked questions</h2>
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
            <p className="eyebrow">Continue researching</p>
            <h2>Related AI hardware guides</h2>
            <p className="related-note">
              These planned guides remain draft until their hardware data and
              guidance scope is verified for publication by {settings.name}.
            </p>
            <div className="related-links">
              {relatedLinks.map((link) => (
                <Link href={link.href} key={link.label}>
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
