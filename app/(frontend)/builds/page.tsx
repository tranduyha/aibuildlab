import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI Workstation Builds",
  description: "Plan AI workstation build research with transparent estimates and future source-reviewed component guidance.",
  path: "/builds",
});

export default function BuildsIndexPage() {
  return (
    <section className="shell section landing-placeholder" id="planned-builds">
      <p className="eyebrow">Builds</p>
      <h1>AI workstation build guides are in preparation</h1>
      <p>
        Build recommendations require verified compatibility, availability, and
        pricing context. Until that review is complete, use the calculator as an
        initial memory planning aid rather than a purchase recommendation.
      </p>
      <Link className="primary-button" href="/tools/vram-calculator">
        Try VRAM Calculator
      </Link>
    </section>
  );
}
