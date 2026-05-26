import ArchitectureFlow from "@/components/ArchitectureFlow";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "About",
  description: "The organization and data approach used by this AI hardware workspace.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <section className="shell section page-section about-content">
      <p className="eyebrow">Architecture</p>
      <h1>Simple storage today, stable boundaries for tomorrow.</h1>
      <p className="detail-lead">
        The initial application reads JSON fixtures from the local data directory.
        Components remain independent of that choice because repositories and
        services own data access.
      </p>
      <ArchitectureFlow />
    </section>
  );
}
