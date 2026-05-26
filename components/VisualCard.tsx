import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import type { ImageManifestEntry } from "@/types";

interface VisualCardProps {
  title: string;
  description: string;
  href: string;
  marker: string;
  visual?: "memory" | "compare" | "model" | "image" | "workstation" | "cloud";
  image?: ImageManifestEntry | null;
  compact?: boolean;
}

export default function VisualCard({
  title,
  description,
  href,
  marker,
  visual = "memory",
  image = null,
  compact = false,
}: VisualCardProps) {
  return (
    <Link className={`visual-card${compact ? " visual-card-compact" : ""}`} href={href}>
      {image ? (
        <SiteImage
          className="visual-card-image"
          fallbackAlt={`${title} technical illustration`}
          image={image}
          sizes="(max-width: 900px) 100vw, 28vw"
        />
      ) : (
        <div className={`visual-marker visual-marker-${visual}`} aria-hidden="true">
          <strong>{marker}</strong>
          <div className="visual-symbol">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="visual-link">Explore &rarr;</span>
    </Link>
  );
}
