import type { Metadata } from "next";
import Link from "next/link";
import { buildCanonicalUrl, getSiteSettings } from "@/lib/seo";

const settings = getSiteSettings();

export const metadata: Metadata = {
  title: {
    absolute: `About ${settings.name} | GPU, VRAM, and AI Hardware Planning`,
  },
  description: `Learn how ${settings.name} reviews GPU, VRAM, cloud GPU, and local AI planning data with source trails, editorial standards, and clear corrections.`,
  alternates: {
    canonical: buildCanonicalUrl("/about"),
  },
  openGraph: {
    title: `About ${settings.name} | GPU, VRAM, and AI Hardware Planning`,
    description: `Learn how ${settings.name} reviews GPU, VRAM, cloud GPU, and local AI planning data with source trails, editorial standards, and clear corrections.`,
    type: "website",
    url: buildCanonicalUrl("/about"),
    siteName: settings.name,
  },
};

const audienceCards = [
  {
    title: "Local AI users",
    description:
      "Choosing GPUs for local LLMs, image generation, video generation, inference testing, and AI experimentation.",
  },
  {
    title: "Developers",
    description:
      "Comparing local GPU setups with cloud GPU providers before testing workloads or planning infrastructure.",
  },
  {
    title: "PC builders",
    description:
      "Checking GPU specifications, VRAM limits, power planning, and practical hardware trade-offs.",
  },
  {
    title: "Creators",
    description:
      "Planning AI-assisted workflows where VRAM, runtime support, and repeatable testing matter.",
  },
  {
    title: "Technical beginners",
    description:
      "Looking for clear GPU explanations without marketing hype or unsupported purchase claims.",
  },
];

const coverageItems = [
  { label: "GPU profiles", href: "/gpu" },
  { label: "VRAM-focused GPU comparisons", href: "/compare" },
  { label: "VRAM calculator guidance", href: "/tools/vram-calculator" },
  { label: "Local AI build planning", href: "/builds" },
  { label: "Cloud GPU provider profiles", href: "/cloud-gpu" },
  { label: "AI hardware and software planning guides", href: "/guides" },
];

const evaluationFactors = [
  "VRAM capacity",
  "Memory bandwidth",
  "GPU generation",
  "Local AI compatibility",
  "Cloud GPU availability",
  "Model size",
  "Quantization",
  "Context length",
  "Batch size",
  "Framework overhead",
  "Inference workloads",
  "Image, video, and experimentation use cases",
];

const reviewWorkflowItems = [
  "Start with official manufacturer pages, provider documentation, pricing pages, product specifications, and provider terms.",
  "Keep source trails visible where pages rely on specific data points.",
  "Use verification dates and review flags when fields are incomplete, uncertain, or likely to change.",
  "Avoid turning estimates, draft records, or incomplete sources into confirmed buying claims.",
];

const editorialStandards = [
  "Official website links, source links, and affiliate or referral links are treated as separate link types.",
  "Official links must not be replaced with monetized links.",
  "Source trails should remain non-affiliate.",
  "Unsupported claims such as best, cheapest, guaranteed, or recommended are avoided unless the context and source support the statement.",
  "Assumptions should be explained where they affect planning guidance.",
];

const boundaries = [
  "No guaranteed pricing.",
  "No guaranteed availability.",
  "No guaranteed benchmark results.",
  "No guaranteed model compatibility.",
  "Not financial, legal, or procurement advice.",
  "Important decisions should be verified with official vendor documentation, product pages, and provider terms.",
];

export default function AboutPage() {
  const siteName = settings.name;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: settings.siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "About",
        item: buildCanonicalUrl("/about"),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <article className="tool-page">
        <div className="shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">About</span>
        </nav>

        <header className="tool-hero">
          <p className="eyebrow">About</p>
          <h1>About {siteName}</h1>
          <p className="tool-lead">
            {siteName} is an independent GPU and AI hardware planning resource built to help users
            understand VRAM, compare graphics cards, and plan local or cloud GPU setups for AI workloads.
          </p>
          <p className="mt-5 text-sm font-semibold text-slate-700">
            Maintained by the {siteName} team.
          </p>
        </header>

        <section className="about-first-section rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="eyebrow">Purpose</p>
          <h2>Why {siteName} exists</h2>
          <div className="intro-copy">
            <p>
              GPU selection for AI workloads can be confusing because raw specifications do not always
              show practical limits. VRAM, model size, software support, cloud cost, and deployment
              constraints can matter as much as the product name.
            </p>
            <p>
              {siteName} helps users make practical GPU and VRAM decisions without relying only on
              marketing labels, benchmark headlines, or unsupported claims.
            </p>
          </div>
        </section>

        <section className="tool-section">
          <p className="eyebrow">Who it helps</p>
          <h2>Built for GPU planning questions</h2>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {audienceCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                <h3 className="text-lg font-semibold tracking-normal text-slate-950">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-700">{card.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="tool-section rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="eyebrow">Coverage</p>
          <h2>What {siteName} covers</h2>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            {siteName} publishes GPU profiles, VRAM-focused specifications, comparison pages,
            calculator guidance, local AI build planning pages, cloud GPU provider profiles, and
            practical guides for choosing between local hardware and cloud GPU options.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {coverageItems.map((item) => (
              <Link
                className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-950 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-800"
                href={item.href}
                key={item.href}
              >
                {item.label} <span aria-hidden="true">-&gt;</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="tool-section rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="eyebrow">Evaluation</p>
          <h2>How {siteName} evaluates GPU data</h2>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            {siteName} looks at practical AI and hardware planning factors rather than treating a GPU
            name as a complete answer. The useful signals can change by workload, runtime, and software
            configuration.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {evaluationFactors.map((factor) => (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold text-slate-800" key={factor}>
                {factor}
              </div>
            ))}
          </div>
        </section>

        <section className="tool-section rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="eyebrow">Review workflow</p>
          <h2>Source-first review workflow</h2>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            {siteName} prioritizes source-backed planning. Data can change over time, especially
            prices, availability, driver support, provider regions, and AI model requirements.
          </p>
          <ol className="mt-5 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
            {reviewWorkflowItems.map((item) => (
              <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={item}>
                {item}
              </li>
            ))}
          </ol>
        </section>

        <section className="tool-section rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="eyebrow">Editorial standards</p>
          <h2>Explaining trade-offs without pushing blindly</h2>
          <p className="max-w-3xl text-base leading-7 text-slate-700">
            {siteName} aims to explain planning trade-offs with neutral, practical wording. The site
            should separate source references, official destinations, and monetized links so users can
            understand what each link type is for.
          </p>
          <ul className="mt-5 grid gap-3 text-sm leading-6 text-slate-700 md:grid-cols-2">
            {editorialStandards.map((standard) => (
              <li className="rounded-2xl border border-slate-200 bg-slate-50 p-4" key={standard}>
                {standard}
              </li>
            ))}
          </ul>
        </section>

        <section className="tool-section grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="eyebrow">Independence</p>
            <h2>Independently maintained</h2>
            <p className="text-base leading-7 text-slate-700">
              {siteName} is independently maintained and is not owned by a GPU manufacturer, cloud GPU
              provider, hardware retailer, or affiliate network.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="eyebrow">Transparency</p>
            <h2>Affiliate and referral links</h2>
            <p className="text-base leading-7 text-slate-700">
              Some future pages may include affiliate or referral links. When used, they will be
              disclosed clearly and will not affect the price users pay. Affiliate links do not change
              {` ${siteName}'s `}source policy, official links, or editorial explanations.
            </p>
          </article>
        </section>

        <section className="tool-section grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="eyebrow">Workflow</p>
            <h2>AI-assisted workflow</h2>
            <p className="text-base leading-7 text-slate-700">
              {siteName} may use AI-assisted workflows to organize research, structure data, draft
              summaries, or check consistency. Important technical claims should be reviewed against
              source material before publication.
            </p>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="eyebrow">Boundaries</p>
            <h2>What {siteName} does not do</h2>
            <ul className="space-y-2 text-sm leading-6 text-slate-700">
              {boundaries.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="tool-section grid gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="eyebrow">Corrections</p>
            <h2>Corrections</h2>
            <div className="space-y-4 text-base leading-7 text-slate-700">
              <p>
                GPU specifications, pricing, driver support, cloud provider availability, and AI model
                requirements can change over time. {siteName} may add a dedicated contact or feedback
                path as the site grows.
              </p>
              <p>
                Until then, users should verify important purchase, deployment, or production decisions
                with official vendor documentation, product pages, and provider terms.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="eyebrow">Limitations</p>
            <h2>Planning resource, not final approval</h2>
            <p className="text-base leading-7 text-slate-700">
              {siteName} is an informational planning resource. Specs, prices, availability, and AI
              model requirements can vary by quantization, batch size, context length, driver stack, and
              software configuration. Final purchase, deployment, or production decisions should be
              verified with official vendor documentation, product pages, and provider terms.
            </p>
          </article>
        </section>
        </div>
      </article>
    </>
  );
}
