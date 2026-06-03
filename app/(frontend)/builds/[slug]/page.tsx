import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuildCta from "@/components/BuildCta";
import BuildGpuOptions from "@/components/BuildGpuOptions";
import BuildPlanningChecklist from "@/components/BuildPlanningChecklist";
import BuildPlanningStack from "@/components/BuildPlanningStack";
import BuildRelatedComparisons from "@/components/BuildRelatedComparisons";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { buildService } from "@/services/build.service";

interface BuildDetailPageProps {
  params: Promise<{ slug: string }>;
}

function cleanBuildSeoTitle(title: string): string {
  return title.replace(/\s+-\s+Draft$/i, "");
}

function isCloudVsLocalBuild(slug: string): boolean {
  return slug === "cloud-vs-local-ai-build-planning";
}

function getBuildSpecificNotes(slug: string): { title: string; body: string }[] {
  switch (slug) {
    case "local-llm-starter-build":
      return [
        {
          title: "Calculator-first starter workflow",
          body:
            "This route is for first local LLM experiments. Start by estimating model memory, then treat 12GB to 16GB GPUs as a planning tier rather than purchase advice.",
        },
        {
          title: "Validate model size before local hardware commitment",
          body:
            "Starter builds can be sensitive to model size, context length, quantization, and runtime overhead. Verify the actual model path before committing to local hardware.",
        },
      ];
    case "local-ai-16gb-vram-build":
      return [
        {
          title: "16GB headroom checkpoint",
          body:
            "This route focuses on whether a 16GB VRAM tier has enough headroom after runtime overhead, context growth, and future workload changes.",
        },
        {
          title: "Borderline workload handling",
          body:
            "If the estimate sits close to the tier limit, cloud testing can reduce risk before narrowing local GPU profiles or comparison pages.",
        },
      ];
    case "high-vram-local-ai-workstation":
      return [
        {
          title: "System stability before GPU ranking",
          body:
            "High-VRAM planning should include power delivery, connector checks, cooling, case clearance, and sustained system behavior before treating any GPU as a final fit.",
        },
        {
          title: "Evidence before purchase fit",
          body:
            "The page can organize a high-VRAM route, but benchmark evidence and exact-part compatibility are still required before hardware decisions.",
        },
      ];
    case "image-workflow-ai-build":
      return [
        {
          title: "Storage is part of the workflow",
          body:
            "Image workflows can involve model files, cache, datasets, generated outputs, and scratch space. VRAM planning alone does not validate the full workstation route.",
        },
        {
          title: "Runtime and driver caveats",
          body:
            "Extensions, image pipelines, driver support, and runtime settings can change practical fit. Verify the exact workflow before committing to parts.",
        },
      ];
    case "cloud-vs-local-ai-build-planning":
      return [
        {
          title: "Decision framework, not a GPU shortlist",
          body:
            "This route helps decide whether cloud testing should happen before local hardware planning. It does not include provider pricing or provider recommendations.",
        },
        {
          title: "Local hardware only after risk checks",
          body:
            "Move toward local planning only when workload frequency, data-control needs, VRAM estimates, runtime support, and system constraints are acceptable.",
        },
      ];
    default:
      return [
        {
          title: "Planning route",
          body:
            "Use this build page to organize workload assumptions, system constraints, GPU profile checks, and validation steps before hardware decisions.",
        },
      ];
  }
}

function getBuildFaqItems(build: { slug: string; uniqueFaq: { question: string; answer: string } }) {
  switch (build.slug) {
    case "local-llm-starter-build":
      return [
        build.uniqueFaq,
        {
          question: "What should I validate after the first VRAM estimate?",
          answer:
            "Validate the exact model size, quantization, context length, and runtime overhead before treating a starter route as locally viable.",
        },
        {
          question: "When should a starter route use cloud testing?",
          answer:
            "Use cloud testing when the target model is near the memory limit or when runtime support is still uncertain.",
        },
      ];
    case "local-ai-16gb-vram-build":
      return [
        build.uniqueFaq,
        {
          question: "What makes a 16GB plan different from a starter plan?",
          answer:
            "A 16GB route gives more capacity to evaluate, but future model growth, extensions, and runtime overhead can still reduce usable headroom.",
        },
        {
          question: "How should I compare 16GB GPU candidates?",
          answer:
            "Compare source-backed VRAM, memory, power, and runtime notes first, then validate the workload before narrowing the hardware plan.",
        },
      ];
    case "high-vram-local-ai-workstation":
      return [
        build.uniqueFaq,
        {
          question: "Why does the checklist emphasize power and cooling?",
          answer:
            "High-VRAM GPUs can raise system-level requirements, so PSU, connector, thermal, and case checks matter before any local fit conclusion.",
        },
        {
          question: "Should high VRAM replace workload testing?",
          answer:
            "No. VRAM capacity is only one planning input; runtime behavior and workload evidence still need validation.",
        },
      ];
    case "image-workflow-ai-build":
      return [
        build.uniqueFaq,
        {
          question: "What should image workflow planning check besides VRAM?",
          answer:
            "Check model files, cache, generated outputs, extensions, driver support, and the exact runtime pipeline.",
        },
        {
          question: "Can this page predict image generation speed?",
          answer:
            "No. This page avoids speed claims and keeps image workflow fit as a source-aware planning checklist.",
        },
      ];
    case "cloud-vs-local-ai-build-planning":
      return [
        build.uniqueFaq,
        {
          question: "What does this route leave unresolved?",
          answer:
            "It does not validate provider pricing, availability, exact local parts, or final workload fit.",
        },
        {
          question: "When does local hardware planning become more reasonable?",
          answer:
            "Local planning becomes more reasonable when workload frequency, data-control needs, VRAM fit, runtime support, and system constraints are all acceptable.",
        },
      ];
    default:
      return [
        build.uniqueFaq,
        {
          question: "How should I use this build route?",
          answer:
            "Use it to organize workload assumptions, system constraints, GPU profile checks, and validation steps before hardware decisions.",
        },
      ];
  }
}

function getPlanningOutcome(slug: string): string {
  switch (slug) {
    case "local-llm-starter-build":
      return "This route helps you decide whether a 12GB to 16GB local LLM planning tier is worth testing further. It does not validate exact parts, prices, benchmark speed, or final hardware fit; the next step is calculator-first model validation, then GPU profile review.";
    case "local-ai-16gb-vram-build":
      return "This route helps you decide whether 16GB VRAM has enough headroom for a broader local AI workflow. If the estimate is close to the limit, verify with cloud testing before narrowing GPU profiles or comparison pages.";
    case "high-vram-local-ai-workstation":
      return "This route helps you decide whether a 24GB+ planning tier is worth deeper system validation. The next checks are power, cooling, connector, runtime, and workload evidence rather than a GPU ranking.";
    case "image-workflow-ai-build":
      return "This route helps you decide whether an image workflow needs more than a simple VRAM shortlist. Verify storage, cache, generated output handling, driver support, and the exact image runtime before hardware decisions.";
    case "cloud-vs-local-ai-build-planning":
      return "This route helps you decide whether cloud GPU testing should come before local hardware planning. It does not validate provider pricing, provider fit, exact local parts, or final hardware readiness.";
    default:
      return "This route helps organize workload assumptions, system constraints, and validation steps. It does not validate exact parts, prices, benchmark speed, or final hardware fit.";
  }
}

export async function generateStaticParams() {
  return buildService.getBuildStaticParams();
}

export async function generateMetadata({ params }: BuildDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const resolved = buildService.getResolvedBuildBySlug(slug);

  if (!resolved) {
    return buildMetadata({
      title: "Build plan not found",
      description: "The requested AI workstation build planning page was not found.",
      path: `/builds/${slug}`,
    });
  }

  return buildMetadata({
    title: cleanBuildSeoTitle(resolved.build.seoTitle),
    description: resolved.build.seoDescription,
    path: `/builds/${resolved.build.slug}`,
    type: "article",
  });
}

export default async function BuildDetailPage({ params }: BuildDetailPageProps) {
  const { slug } = await params;
  const resolved = buildService.getResolvedBuildBySlug(slug);

  if (!resolved) {
    notFound();
  }

  const { build, gpus, comparisons, missingGpuSlugs, missingComparisonSlugs } = resolved;
  const settings = getSiteSettings();
  const pagePath = `/builds/${build.slug}`;
  const pageUrl = buildCanonicalPath(pagePath);
  const seoTitle = cleanBuildSeoTitle(build.seoTitle);
  const buildSpecificNotes = getBuildSpecificNotes(build.slug);
  const isCloudVsLocal = isCloudVsLocalBuild(build.slug);
  const faqItems = getBuildFaqItems(build);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: buildCanonicalPath("/") },
      { "@type": "ListItem", position: 2, name: "Builds", item: buildCanonicalPath("/builds") },
      { "@type": "ListItem", position: 3, name: build.title, item: pageUrl },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seoTitle,
    description: build.seoDescription,
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
            <Link href="/builds">Builds</Link>
            <span>/</span>
            <span aria-current="page">{build.title}</span>
          </nav>

          <header className="tool-hero build-detail-hero">
            <p className="eyebrow">Build planning</p>
            <h1>{build.title}</h1>
            <p className="tool-lead">{build.shortDescription}</p>
            <DataConfidenceBadge gpu={build} />
          </header>

          <p className="tool-disclaimer">{buildService.getBuildWarning()}</p>
          <p className="tool-disclaimer">
            This page does not validate motherboard, case, PSU connector, cooling clearance, OS, driver, or runtime
            compatibility. Treat it as a planning checklist and verify exact parts before hardware decisions.
          </p>

          <section className="tool-section">
            <h2>Quick planning summary</h2>
            <div className="build-summary-grid">
              <div>
                <span>Use case</span>
                <p>{build.targetUseCase}</p>
              </div>
              <div>
                <span>VRAM tier</span>
                <p>{build.vramTier}</p>
              </div>
              <div>
                <span>GPU class</span>
                <p>{build.suggestedGpuClass}</p>
              </div>
              <div>
                <span>Data status</span>
                <p>{build.needsReview ? "Planning draft, needs verification" : "Source-backed GPU specs available"}</p>
              </div>
            </div>
          </section>

          <section className="tool-section">
            <h2>Planning stack</h2>
            <BuildPlanningStack build={build} />
          </section>

          <section className="tool-section build-outcome">
            <h2>Planning outcome</h2>
            <p>{getPlanningOutcome(build.slug)}</p>
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>Who this is for</h2>
              <p>{build.notes ?? build.shortDescription}</p>
            </div>
            <div>
              <h2>Planning boundaries</h2>
              <p>
                This page avoids exact part lists, prices, benchmark rankings, speed claims, and purchase
                guidance. Treat it as a checklist route before verification.
              </p>
            </div>
          </section>

          <section className="tool-section">
            <h2>Build planning checklist</h2>
            <BuildPlanningChecklist build={build} />
          </section>

          <section className="tool-section">
            <h2>Build-specific planning notes</h2>
            <div className="build-note-grid">
              {buildSpecificNotes.map((note) => (
                <div key={note.title}>
                  <h3>{note.title}</h3>
                  <p>{note.body}</p>
                </div>
              ))}
            </div>
          </section>

          {isCloudVsLocal ? (
            <section className="tool-section">
              <h2>Cloud vs local decision framework</h2>
              <div className="build-decision-grid">
                <div>
                  <h3>Choose cloud testing first when</h3>
                  <ul>
                    <li>The workload is occasional.</li>
                    <li>The VRAM estimate is uncertain.</li>
                    <li>Benchmark evidence is missing.</li>
                    <li>High-memory testing is needed before local hardware commitment.</li>
                    <li>Local hardware purchase risk is high.</li>
                  </ul>
                </div>
                <div>
                  <h3>Consider local hardware planning when</h3>
                  <ul>
                    <li>The workload is frequent.</li>
                    <li>Data, privacy, or local control matters.</li>
                    <li>Estimated VRAM fits a local GPU tier.</li>
                    <li>Runtime support can be verified.</li>
                    <li>Power, cooling, and system requirements are acceptable.</li>
                  </ul>
                </div>
              </div>
            </section>
          ) : (
            <section className="tool-section explanation-grid">
              <div>
                <h2>Local planning notes</h2>
                <p>
                  Local hardware planning should include VRAM headroom, system RAM, storage, power delivery, cooling,
                  driver support, runtime compatibility, and room for future workload changes.
                </p>
              </div>
              <div>
                <h2>Cloud GPU checkpoint</h2>
                <p>
                  Consider cloud GPU testing when the workload is temporary, when local VRAM estimates are uncertain, or
                  when you need evidence before committing to local hardware.
                </p>
              </div>
            </section>
          )}

          <section className="tool-section">
            <h2>
              {isCloudVsLocal
                ? "Local hardware tiers to compare against cloud testing"
                : "GPU planning candidates"}
            </h2>
            <p className="related-note">
              These GPUs may fit this planning tier. Treat them as secondary planning references and verify sources,
              exact variants, runtime support, and benchmark evidence before hardware decisions.
            </p>
            <BuildGpuOptions gpus={gpus} missingGpuSlugs={missingGpuSlugs} />
          </section>

          <section className="tool-section">
            <h2>Related GPU comparisons</h2>
            <BuildRelatedComparisons
              comparisons={comparisons}
              missingComparisonSlugs={missingComparisonSlugs}
            />
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
            <h2>Continue planning</h2>
            <div className="related-links">
              <Link href="/tools/vram-calculator">
                Estimate VRAM first <span>&rarr;</span>
              </Link>
              <Link href="/gpu">
                View matching GPU profiles <span>&rarr;</span>
              </Link>
              <Link href="/compare">
                Compare source-backed GPU planning profiles <span>&rarr;</span>
              </Link>
              <Link href="/guides">
                Read practical guides <span>&rarr;</span>
              </Link>
            </div>
          </section>

          <BuildCta />
        </div>
      </article>
    </>
  );
}
