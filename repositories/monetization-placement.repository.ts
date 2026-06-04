import monetizationPlacementData from "@/data/monetization-placements.json";
import type {
  MonetizationPlacement,
  MonetizationPlacementIntent,
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
const allowedStatuses: MonetizationPlacementStatus[] = ["draft", "reviewed", "published", "disabled"];
const allowedIntents: MonetizationPlacementIntent[] = ["planning", "disclosure", "internal-link"];

const routePlacements: Record<MonetizationPlacementType, string[]> = {
  "vram-calculator-result": ["/tools/vram-calculator"],
  "gpu-profile-sidebar": ["/gpu"],
  "comparison-verdict": ["/compare"],
  "build-page-components": ["/builds"],
  "cloud-vs-local-guide": ["/guides/cloud-gpu-vs-local-gpu"],
  "ai-saas-guide": ["/guides/local-ai-vs-ai-saas"],
  "footer-disclosure": ["/"],
};

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
    typeof placement.intent === "string" &&
    allowedIntents.includes(placement.intent as MonetizationPlacementIntent) &&
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

function isInternalHref(href: string | null): boolean {
  return href === null || href.startsWith("/");
}

function routeMatchesPlacement(route: string, placement: MonetizationPlacement): boolean {
  const allowedRoutes = routePlacements[placement.placementType];

  return allowedRoutes.some((allowedRoute) => route === allowedRoute || route.startsWith(`${allowedRoute}/`));
}

function isRepositorySafePlacement(placement: MonetizationPlacement): boolean {
  return (
    placement.status === "published" &&
    !placement.needsReview &&
    !placement.affiliateConfigured &&
    !placement.requiresDisclosure &&
    isInternalHref(placement.href) &&
    placement.href !== "/ai-tools"
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

export function getMonetizationPlacementById(id: string): MonetizationPlacement | null {
  return monetizationPlacements.find((placement) => placement.id === id) ?? null;
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

export function getSafePlacementsForRoute(route: string): MonetizationPlacement[] {
  return monetizationPlacements.filter(
    (placement) => routeMatchesPlacement(route, placement) && isRepositorySafePlacement(placement),
  );
}

export function getEnabledPlacementForRoute(
  route: string,
  placementType: MonetizationPlacementType,
): MonetizationPlacement | null {
  return (
    getSafePlacementsForRoute(route).find((placement) => placement.placementType === placementType) ?? null
  );
}

export const monetizationPlacementRepository = {
  getAllMonetizationPlacements,
  getEnabledPlacementForRoute,
  getMonetizationPlacementBySlug,
  getMonetizationPlacementById,
  getMonetizationPlacementsByType,
  getReviewedMonetizationPlacements,
  getPublishedMonetizationPlacements,
  getSafePlacementsForRoute,
};
