import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Local AI Hardware Guides",
  description: "Browse the planned guide hub for GPU memory, local LLMs, image generation, and workstation planning.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <section className="shell section landing-placeholder" id="planned-guides">
      <p className="eyebrow">Guides</p>
      <h1>Source-aware local AI guides are being prepared</h1>
      <p>
        Upcoming guides will cover local LLM GPU planning, image-generation
        workflows, VRAM interpretation, and workstation decisions. Claims remain
        draft until supporting data is verified.
      </p>
      <Link className="primary-button" href="/tools/vram-calculator">
        Estimate VRAM first
      </Link>
    </section>
  );
}
