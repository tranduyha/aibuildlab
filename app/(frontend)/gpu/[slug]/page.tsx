import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import GpuSpecTable from "@/components/GpuSpecTable";
import { buildCanonicalPath, buildMetadata, getSiteSettings } from "@/lib/seo";
import { gpuRepository } from "@/repositories/gpu.repository";
import { gpuService } from "@/services/gpu.service";

interface GpuProfilePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return gpuRepository.getAllGpus().map((gpu) => ({ slug: gpu.slug }));
}

export async function generateMetadata({ params }: GpuProfilePageProps): Promise<Metadata> {
  const { slug } = await params;
  const { data: gpu } = gpuService.getGpuProfileBySlug(slug);

  if (!gpu) {
    return buildMetadata({
      title: "GPU profile not found",
      description: "The requested GPU planning profile was not found.",
      path: `/gpu/${slug}`,
    });
  }

  return buildMetadata({
    title: gpu.seoTitle,
    description: gpu.seoDescription,
    path: `/gpu/${gpu.slug}`,
    type: "article",
  });
}

const relatedLinks = [
  { href: "/tools/vram-calculator", label: "Use VRAM Calculator" },
  { href: "/gpu", label: "Back to GPU index" },
  { href: "/builds", label: "Browse build planning pages" },
  { href: "/guides", label: "Read local AI guides" },
];

const faqItems = [
  {
    question: "Can I treat this page as a final buying recommendation?",
    answer:
      "No. This profile is a planning record and remains draft until specs and workload evidence are verified from trusted sources.",
  },
  {
    question: "Why are many fields marked Needs verification?",
    answer:
      "Seed data keeps uncertain fields null by design. Missing values prevent accidental claims before official source checks.",
  },
  {
    question: "What should I do before buying hardware?",
    answer:
      "Use the VRAM Calculator for a first estimate, then confirm official specs, compatibility, power, and software runtime requirements.",
  },
];

export default async function GpuProfilePage({ params }: GpuProfilePageProps) {
  const { slug } = await params;
  const { data: gpu, warning } = gpuService.getGpuProfileBySlug(slug);

  if (!gpu) {
    notFound();
  }

  const settings = getSiteSettings();
  const pagePath = `/gpu/${gpu.slug}`;
  const pageUrl = buildCanonicalPath(pagePath);

  const breadcrumbSchema = {
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
        name: "GPU",
        item: buildCanonicalPath("/gpu"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: gpu.name,
        item: pageUrl,
      },
    ],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: gpu.seoTitle,
    description: gpu.seoDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: settings.name,
      url: settings.siteUrl,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />

      <article className="tool-page">
        <div className="shell">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/gpu">GPU</Link>
            <span>/</span>
            <span aria-current="page">{gpu.name}</span>
          </nav>

          <header className="tool-hero gpu-profile-hero">
            <p className="eyebrow">GPU planning profile</p>
            <h1>{gpu.name}</h1>
            <p className="tool-lead">{gpu.shortDescription}</p>
            <DataConfidenceBadge gpu={gpu} />
          </header>

          {warning ? <p className="tool-disclaimer">{warning}</p> : null}

          <section className="tool-section">
            <h2>Specification snapshot</h2>
            <p className="related-note">
              Null or incomplete specs remain intentionally unresolved until
              reviewed against official vendor or manufacturer sources.
            </p>
            <GpuSpecTable gpu={gpu} />
          </section>

          <section className="tool-section explanation-grid">
            <div>
              <h2>AI workload fit</h2>
              <p>
                This profile tracks potential local AI workload alignment using
                seed use-case tags. It does not confirm throughput, quality, or
                runtime-specific stability.
              </p>
              <p className="related-note">
                Tagged planning areas: {gpu.useCases.join(", ") || "Needs verification"}.
              </p>
            </div>
            <div>
              <h2>VRAM suitability</h2>
              <p>
                VRAM suitability must be validated per runtime, model format,
                context length, and operating overhead. Treat this page as a
                planning checkpoint, not benchmark evidence.
              </p>
              <p className="related-note">
                Use the VRAM calculator first, then test your exact stack before
                hardware purchase decisions.
              </p>
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
            <p className="eyebrow">Related planning routes</p>
            <h2>Continue your research path</h2>
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