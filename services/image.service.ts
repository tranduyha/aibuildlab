import { imageRepository } from "@/repositories/image.repository";
import type { ImageCategory, ImageManifestEntry } from "@/types";

function hasUsableMetadata(image: ImageManifestEntry): boolean {
  return Boolean(
    typeof image.id === "string" &&
      typeof image.local_path === "string" &&
      image.local_path.startsWith("/images/") &&
      typeof image.source === "string" &&
      typeof image.source_url === "string" &&
      image.source_url.startsWith("https://") &&
      typeof image.author === "string" &&
      typeof image.license === "string" &&
      typeof image.license_url === "string" &&
      image.license_url.startsWith("https://") &&
      typeof image.alt_text === "string" &&
      image.alt_text.trim() &&
      image.needsReview === false,
  );
}

export const imageService = {
  validateImageEntry(image: ImageManifestEntry): boolean {
    return hasUsableMetadata(image);
  },

  getSafeImageById(id: string): ImageManifestEntry | null {
    const image = imageRepository.getImageById(id);
    return image && hasUsableMetadata(image) ? image : null;
  },

  getHomepageHeroImage(): ImageManifestEntry | null {
    const image = imageRepository.getHeroImage();
    return image && hasUsableMetadata(image) ? image : null;
  },

  getToolPageImage(toolSlug: string): ImageManifestEntry | null {
    const pagePath = `/tools/${toolSlug}`;
    const image = imageRepository.getImagesByCategory("tools").find((entry) =>
      Array.isArray(entry.used_in_pages) && entry.used_in_pages.includes(pagePath),
    );
    return image && hasUsableMetadata(image) ? image : null;
  },

  getImagesByCategory(category: ImageCategory): ImageManifestEntry[] {
    return imageRepository.getImagesByCategory(category).filter(hasUsableMetadata);
  },

  getImageAltText(image: ImageManifestEntry | null): string {
    return image?.alt_text.trim() || "Technical planning illustration";
  },
};
