import Link from "next/link";
import BuildCard from "@/components/BuildCard";
import BuildCta from "@/components/BuildCta";
import { buildMetadata } from "@/lib/seo";
import { buildService } from "@/services/build.service";

export const metadata = buildMetadata({
  title: "Local AI Workstation Build Planning",
  description:
    "Planning pages for local LLM, image workflow, and high-VRAM AI workstation builds with clearly labelled draft data.",
  path: "/builds",
});

export default function BuildsIndexPage() {
  const buildItems = buildService.getBuildListItems();

  return (
    <main className="tool-page">
      <div className="shell">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span aria-current="page">Builds</span>
        </nav>

        <header className="tool-hero build-index-hero">
          <p className="eyebrow">Build planning</p>
          <h1>Local AI workstation build planning pages</h1>
          <p className="tool-lead">
            Draft planning routes for local LLM, image workflow, and high-VRAM workstation decisions. These pages help
            organize questions before hardware evidence, compatibility checks, and benchmark sources are attached.
          </p>
        </header>

        <p className="tool-disclaimer">{buildService.getBuildWarning()}</p>

        <section className="tool-section">
          <h2>Choose a planning route</h2>
          <p className="related-note">
            Builds are full workstation planning routes. Use this section to pick the right system-level checklist
            before opening GPU profiles or GPU comparison pages.
          </p>
          <div className="build-route-grid">
            <Link href="/builds/local-llm-starter-build">
              <strong>Starter build</strong>
              <span>First local LLM experiments with calculator-first validation.</span>
            </Link>
            <Link href="/builds/local-ai-16gb-vram-build">
              <strong>16GB VRAM build</strong>
              <span>Mid-range local AI planning where headroom may be borderline.</span>
            </Link>
            <Link href="/builds/high-vram-local-ai-workstation">
              <strong>High-VRAM workstation</strong>
              <span>Heavier local workloads with power, cooling, and stability checks.</span>
            </Link>
            <Link href="/builds/image-workflow-ai-build">
              <strong>Image workflow build</strong>
              <span>Creator and image-generation planning with storage/cache checks.</span>
            </Link>
            <Link href="/builds/cloud-vs-local-ai-build-planning">
              <strong>Cloud vs Local</strong>
              <span>Validate cloud testing before local hardware commitment.</span>
            </Link>
          </div>
        </section>

        <section className="tool-section">
          <h2>Build planning routes</h2>
          <div className="build-card-grid">
            {buildItems.map((item) => (
              <BuildCard build={item.build} gpus={item.gpus} key={item.build.slug} />
            ))}
          </div>
        </section>

        <section className="tool-section">
          <h2>How to use these build pages</h2>
          <div className="compare-workflow-grid">
            <div>
              <span>01</span>
              <h3>Estimate memory first</h3>
              <p>Use the calculator to frame VRAM needs before comparing GPU names or workstation routes.</p>
            </div>
            <div>
              <span>02</span>
              <h3>Review GPU planning profiles</h3>
              <p>Check source-backed GPU specs where available and keep draft fields marked for verification.</p>
            </div>
            <div>
              <span>03</span>
              <h3>Compare close options</h3>
              <p>Use comparison pages for capacity, memory, power, and runtime caveats without benchmark claims.</p>
            </div>
            <div>
              <span>04</span>
              <h3>Verify the exact build</h3>
              <p>Confirm part compatibility, power, cooling, OS, drivers, and workload evidence before hardware decisions.</p>
            </div>
          </div>
        </section>

        <section className="tool-section related-section">
          <h2>Related planning tools</h2>
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
    </main>
  );
}
