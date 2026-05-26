import SiteImage from "@/components/SiteImage";
import type { ImageManifestEntry } from "@/types";

interface HeroVisualProps {
  image: ImageManifestEntry | null;
}

export default function HeroVisual({ image }: HeroVisualProps) {
  return (
    <aside className="hero-visual" aria-label="Local AI workstation planning visual">
      <SiteImage
        className="hero-photo"
        fallbackAlt="Illustrated local AI workstation planning dashboard"
        image={image}
        priority
      />
      <div className="planning-preview">
        <p className="panel-label">Planning workflow</p>
        <div className="preview-row">
          <span>Model + format</span>
          <strong>VRAM estimate</strong>
        </div>
        <div className="preview-track" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <p className="preview-note">Illustrative flow only. Validate actual runtime usage.</p>
      </div>
      {image ? (
        <p className="image-credit">
          Photo:{" "}
          <a href={image.source_url} rel="noreferrer" target="_blank">
            {image.author}
          </a>{" "}
          /{" "}
          <a href={image.license_url} rel="noreferrer" target="_blank">
            {image.license}
          </a>
        </p>
      ) : null}
    </aside>
  );
}
