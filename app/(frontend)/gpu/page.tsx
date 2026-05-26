import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "GPU Planning Hub",
  description: "Explore the planned GPU research hub for local AI hardware and source-reviewed specifications.",
  path: "/gpu",
});

export default function GpuIndexPage() {
  return (
    <section className="shell section landing-placeholder">
      <p className="eyebrow">GPUs</p>
      <h1>GPU profiles are being prepared for source review</h1>
      <p>
        This section will contain hardware profiles and comparison paths once
        specifications have been checked against appropriate sources. Draft seed
        records are not presented here as verified purchasing advice.
      </p>
      <Link className="primary-button" href="/tools/vram-calculator">
        Start with a VRAM estimate
      </Link>
    </section>
  );
}
