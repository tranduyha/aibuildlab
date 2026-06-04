import monetizationPlacementData from "@/data/monetization-placements.json";
import type {
  MonetizationPlacement,
  MonetizationPlacementSource,
  MonetizationPlacementStatus,
  MonetizationPlacementTone,
  MonetizationPlacementType,
} from "@/types/monetization-placement";

const allowedPlacementTypes: MonetizationPlacementType[] = [
  "vram-calculator-result",
  "gpu-profile-sidebar",
  "comparison-verdict",
  "build-page-components",
  "cloud-vs-local-guide",
  "ai-saas-guide",
  "footer-disclosure",
];

const allowedTones: MonetizationPlacementTone[] = ["primary", "secondary", "disclosure", "neutral"];
const allowedStatuses: MonetizationPlacementStatus[] = ["draft", "reviewed", "published"];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSource(value: unknown): value is MonetizationPlacementSource {
  if (!value || typeof value !== "object") {
    return false;
  }

  const source = value as Partial<MonetizationPlacementSource>;
  return (
    typeof source.name === "string" &&
    typeof source.url === "string" &&
    typeof source.type === "string" &&
    isStringArray(source.fields) &&
    typeof source.accessedAt === "string"
  );
}

function isMonetizationPlacement(value: unknown): value is MonetizationPlacement {
  if (!value || typeof value !== "object") {
    return false;
  }

  const placement = value as Partial<MonetizationPlacement>;
  return (
    typeof placement.id === "string" &&
    typeof placement.slug === "string" &&
    typeof placement.placementType === "string" &&
    allowedPlacementTypes.includes(placement.placementType as MonetizationPlacementType) &&
    typeof placement.title === "string" &&
    typeof placement.description === "string" &&
    typeof placement.ctaLabel === "string" &&
    (typeof placement.href === "string" || placement.href === null) &&
    typeof placement.tone === "string" &&
    allowedTones.includes(placement.tone as MonetizationPlacementTone) &&
    typeof placement.affiliateConfigured === "boolean" &&
    typeof placement.requiresDisclosure === "boolean" &&
    typeof placement.status === "string" &&
    allowedStatuses.includes(placement.status as MonetizationPlacementStatus) &&
    typeof placement.needsReview === "boolean" &&
    typeof placement.dataConfidence === "string" &&
    Array.isArray(placement.sources) &&
    placement.sources.every(isSource) &&
    (typeof placement.lastVerifiedAt === "string" || placement.lastVerifiedAt === null) &&
    (typeof placement.notes === "string" || placement.notes === null) &&
    isStringArray(placement.unsafeToPublishFields)
  );
}

function assertUniqueSlugs(placements: MonetizationPlacement[]): void {
  const seen = new Set<string>();

  for (const placement of placements) {
    if (seen.has(placement.slug)) {
      throw new Error(`Duplicate monetization placement slug detected: ${placement.slug}`);
    }

    seen.add(placement.slug);
  }
}

const rawPlacementData: unknown = monetizationPlacementData;
const monetizationPlacements: MonetizationPlacement[] = Array.isArray(rawPlacementData)
  ? rawPlacementData.filter(isMonetizationPlacement)
  : [];

assertUniqueSlugs(monetizationPlacements);

export function getAllMonetizationPlacements(): MonetizationPlacement[] {
  return [...monetizationPlacements];
}

export function getMonetizationPlacementBySlug(slug: string): MonetizationPlacement | null {
  return monetizationPlacements.find((placement) => placement.slug === slug) ?? null;
}

export function getMonetizationPlacementsByType(
  placementType: MonetizationPlacementType,
): MonetizationPlacement[] {
  return monetizationPlacements.filter((placement) => placement.placementType === placementType);
}

export function getReviewedMonetizationPlacements(): MonetizationPlacement[] {
  return monetizationPlacements.filter((placement) => placement.status === "reviewed");
}

export function getPublishedMonetizationPlacements(): MonetizationPlacement[] {
  return monetizationPlacements.filter((placement) => placement.status === "published" && !placement.needsReview);
}

export const monetizationPlacementRepository = {
  getAllMonetizationPlacements,
  getMonetizationPlacementBySlug,
  getMonetizationPlacementsByType,
  getReviewedMonetizationPlacements,
  getPublishedMonetizationPlacements,
};
