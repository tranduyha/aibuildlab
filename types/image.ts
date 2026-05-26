export type ImageCategory = "hero" | "gpu" | "builds" | "guides" | "tools";

export interface ImageManifestEntry {
  id: string;
  local_path: string;
  source: string;
  source_url: string;
  author: string;
  license: string;
  license_url: string;
  downloaded_at: string;
  alt_text: string;
  used_in_pages: string[];
  category: ImageCategory;
  width: number | null;
  height: number | null;
  needsReview: boolean;
}
