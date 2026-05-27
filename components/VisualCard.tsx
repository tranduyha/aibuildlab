import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import type { ImageManifestEntry } from "@/types";

interface VisualCardProps {
  title: string;
  description: string;
  href: string;
  marker?: string;
  visual?: "memory" | "compare" | "model" | "image" | "workstation" | "cloud";
  image?: ImageManifestEntry | null;
  compact?: boolean;
}

function VisualGlyph({ visual }: { visual: NonNullable<VisualCardProps["visual"]> }) {
  switch (visual) {
    case "compare":
      return (
        <svg className="visual-glyph" viewBox="0 0 48 48">
          <rect x="6" y="10" width="15" height="27" rx="3.5" />
          <rect className="visual-glyph-accent" x="27" y="7" width="15" height="30" rx="3.5" />
          <path className="visual-glyph-divider" d="M10 16h7m-7 6h7m21-8h-7m7 6h-7" />
          <path className="visual-glyph-strong" d="M19 42h10" />
        </svg>
      );
    case "model":
      return (
        <svg className="visual-glyph" viewBox="0 0 48 48">
          <path className="visual-glyph-divider" d="M12 13l12 11 12-12M12 35l12-11 12 11" />
          <circle className="visual-glyph-accent" cx="12" cy="13" r="5" />
          <circle className="visual-glyph-accent" cx="12" cy="35" r="5" />
          <circle className="visual-glyph-strong" cx="24" cy="24" r="6" />
          <circle cx="36" cy="12" r="5" />
          <circle cx="36" cy="35" r="5" />
        </svg>
      );
    case "image":
      return (
        <svg className="visual-glyph" viewBox="0 0 48 48">
          <rect x="6" y="7" width="36" height="34" rx="5" />
          <circle className="visual-glyph-accent" cx="16" cy="17" r="4" />
          <path className="visual-glyph-accent" d="M10 34l10-10 7 7 6-9 7 12" />
          <path className="visual-glyph-divider" d="M11 12h4m22 24h-4" />
        </svg>
      );
    case "workstation":
      return (
        <svg className="visual-glyph" viewBox="0 0 48 48">
          <rect x="5" y="10" width="26" height="19" rx="3.5" />
          <path className="visual-glyph-accent" d="M18 29v5m-8 0h16" />
          <rect className="visual-glyph-accent" x="35" y="8" width="9" height="29" rx="2.5" />
          <circle className="visual-glyph-strong" cx="39.5" cy="32" r="1.2" />
        </svg>
      );
    case "cloud":
      return (
        <svg className="visual-glyph" viewBox="0 0 48 48">
          <path d="M6 20h21a6 6 0 0 0-3-11 8 8 0 0 0-14 5 6 6 0 0 0-4 6Z" />
          <path className="visual-glyph-divider" d="M25 25v13" />
          <rect className="visual-glyph-accent" x="30" y="25" width="13" height="13" rx="3" />
          <path className="visual-glyph-divider" d="M33 22v3m7-3v3M33 38v3m7-3v3" />
        </svg>
      );
    case "memory":
    default:
      return (
        <svg className="visual-glyph" viewBox="0 0 48 48">
          <rect x="8" y="12" width="32" height="24" rx="5" />
          <path className="visual-glyph-divider" d="M14 8v4m10-4v4m10-4v4M14 36v4m10-4v4m10-4v4" />
          <rect className="visual-glyph-accent" x="13" y="18" width="7" height="12" rx="1.5" />
          <rect className="visual-glyph-accent" x="22" y="18" width="7" height="12" rx="1.5" />
          <rect className="visual-glyph-strong" x="31" y="18" width="4" height="12" rx="1.5" />
        </svg>
      );
  }
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
          {marker ? <strong>{marker}</strong> : null}
          <VisualGlyph visual={visual} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
      <span className="visual-link">Explore &rarr;</span>
    </Link>
  );
}
