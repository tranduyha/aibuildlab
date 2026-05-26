import guideData from "@/data/guides.json";
import type { Guide } from "@/types";

const guides = guideData as Guide[];

export function getAllGuides(): Guide[] {
  return [...guides];
}

export function getGuideBySlug(slug: string): Guide | null {
  return guides.find((guide) => guide.slug === slug) ?? null;
}

export function getPublishedGuides(): Guide[] {
  return guides.filter((guide) => guide.status === "published" && !guide.needsReview);
}

export function getGuidesByTag(tag: string): Guide[] {
  return guides.filter((guide) => guide.tags.includes(tag));
}

export const guideRepository = {
  getAllGuides,
  getGuideBySlug,
  getPublishedGuides,
  getGuidesByTag,
};
