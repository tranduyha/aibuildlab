import Link from "next/link";

export default function BuildCta() {
  return (
    <section
      className="build-cta-block !grid-cols-1 !items-start !gap-0 shadow-[0_16px_34px_rgba(15,23,42,0.06)]"
      aria-label="Continue build planning"
    >
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[var(--primary)]">NEXT STEP</p>
        <h2 className="mt-2 max-w-4xl text-2xl font-semibold leading-tight tracking-normal text-[var(--foreground)] sm:text-3xl">
          Start with memory needs before comparing hardware paths
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--muted)] sm:text-base sm:leading-7">
          Use the VRAM Calculator to frame capacity needs before comparing GPU profiles, comparison pages, and build
          planning notes.
        </p>
      </div>
      <div className="mt-5 flex">
        <Link className="primary-button w-full justify-center sm:w-auto" href="/tools/vram-calculator">
          Estimate VRAM first
        </Link>
      </div>
    </section>
  );
}
