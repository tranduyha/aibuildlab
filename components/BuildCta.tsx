import Link from "next/link";

export default function BuildCta() {
  return (
    <section className="build-cta-block" aria-label="Continue build planning">
      <div>
        <p className="eyebrow">NEXT STEP</p>
        <h2>Start with memory needs, then review source-backed GPU planning profiles</h2>
        <p>
          Use the VRAM Calculator to frame capacity needs before comparing GPU profiles, comparison pages, and build
          planning notes.
        </p>
      </div>
      <div className="comparison-cta-actions">
        <Link className="primary-button" href="/tools/vram-calculator">
          Estimate VRAM first
        </Link>
        <Link className="secondary-button" href="/gpu">
          View matching GPU profiles
        </Link>
        <Link className="secondary-button" href="/compare">
          Compare source-backed GPU planning profiles
        </Link>
      </div>
    </section>
  );
}
