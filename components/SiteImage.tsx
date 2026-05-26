import Image from "next/image";
import type { ImageManifestEntry } from "@/types";

interface SiteImageProps {
  image: ImageManifestEntry | null;
  fallbackAlt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function SiteImage({
  image,
  fallbackAlt,
  className = "",
  priority = false,
  sizes = "(max-width: 900px) 100vw, 42vw",
}: SiteImageProps) {
  return (
    <div className={`site-image ${className}`.trim()}>
      {image ? (
        <Image
          alt={image.alt_text}
          fill
          priority={priority}
          sizes={sizes}
          src={image.local_path}
        />
      ) : (
        <div className="site-image-fallback" role="img" aria-label={fallbackAlt}>
          <svg aria-hidden="true" viewBox="0 0 240 160">
            <rect height="118" rx="12" width="204" x="18" y="16" />
            <path d="M45 133h150M88 133l8-17h48l8 17" />
            <path d="M52 90l28-28 25 21 35-42 45 49" />
          </svg>
        </div>
      )}
    </div>
  );
}
