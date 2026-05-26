import imageData from "@/data/images/image-manifest.json";
import type { ImageCategory, ImageManifestEntry } from "@/types";

const images = imageData as ImageManifestEntry[];

export const imageRepository = {
  getAllImages(): ImageManifestEntry[] {
    return images;
  },

  getImageById(id: string): ImageManifestEntry | undefined {
    return images.find((image) => image.id === id);
  },

  getImagesByCategory(category: ImageCategory): ImageManifestEntry[] {
    return images.filter((image) => image.category === category);
  },

  getImageForPage(path: string): ImageManifestEntry | undefined {
    return images.find(
      (image) => Array.isArray(image.used_in_pages) && image.used_in_pages.includes(path),
    );
  },

  getHeroImage(): ImageManifestEntry | undefined {
    return images.find((image) => image.category === "hero");
  },
};
