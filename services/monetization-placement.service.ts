import { monetizationPlacementRepository } from "@/repositories/monetization-placement.repository";
import type {
  MonetizationPlacement,
  MonetizationPlacementDataConfidence,
  MonetizationPlacementType,
} from "@/types/monetization-placement";

export interface MonetizationPlacementListItem {
  placement: MonetizationPlacement;
  warnings: string[];
  dataConfidence: MonetizationPlacementDataConfidence;
  disclosure: string;
  isActionable: boolean;
}

export interface MonetizationPlacementCtaModel {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  tone: MonetizationPlacement["tone"];
  typeLabel: string;
}

const REVIEW_WARNING =
  "Placement copy is planning-only and should be reviewed before production monetization use.";
const AFFILIATE_NOT_CONFIGURED_WARNING =
  "Affiliate links are not configured for this placement.";
const DISCLOSURE_WARNING =
  "This placement requires transparent disclosure if future monetization links are added.";
const forbiddenCtaCopyPattern =
  /\b(buy now|sign up now|get deal|claim deal|best offer|cheapest|recommended|discount|commission)\b/i;
const aiToolsRouteExists = false;

const placementTypeLabels: Record<MonetizationPlacementType, string> = {
  "vram-calculator-result": "VRAM calculator follow-up",
  "gpu-profile-sidebar": "GPU profile planning",
  "comparison-verdict": "GPU comparison next step",
  "build-page-components": "Build planning bridge",
  "cloud-vs-local-guide": "Cloud vs local guide bridge",
  "ai-saas-guide": "Local vs SaaS guide bridge",
  "footer-disclosure": "Footer disclosure",
};

function createListItem(placement: MonetizationPlacement): MonetizationPlacementListItem {
  return {
    placement,
    warnings: getMonetizationPlacementWarnings(placement),
    dataConfidence: placement.dataConfidence,
    disclosure: getMonetizationPlacementDisclosure(placement),
    isActionable: Boolean(placement.href),
  };
}

export function getMonetizationPlacementWarnings(placement: MonetizationPlacement): string[] {
  const warnings = new Set<string>();

  if (placement.status === "draft" || placement.needsReview) {
    warnings.add(REVIEW_WARNING);
  }

  if (!placement.affiliateConfigured) {
    warnings.add(AFFILIATE_NOT_CONFIGURED_WARNING);
  }

  if (placement.requiresDisclosure) {
    warnings.add(DISCLOSURE_WARNING);
  }

  return Array.from(warnings);
}

export function getMonetizationPlacementDisclosure(placement: MonetizationPlacement): string {
  if (!placement.affiliateConfigured) {
    return "This is an internal planning placement. No affiliate link is configured.";
  }

  return "This placement requires clear disclosure before any monetized use.";
}

function hasForbiddenCtaCopy(placement: MonetizationPlacement): boolean {
  return forbiddenCtaCopyPattern.test(
    [placement.title, placement.description, placement.ctaLabel, placement.notes]
      .filter((value): value is string => typeof value === "string")
      .join(" "),
  );
}

function hasSafeHref(placement: MonetizationPlacement): boolean {
  if (!placement.href) {
    return false;
  }

  if (!placement.href.startsWith("/")) {
    return false;
  }

  return placement.href !== "/ai-tools" || aiToolsRouteExists;
}

export function isPlacementSafeToRender(placement: MonetizationPlacement): boolean {
  return (
    placement.status === "published" &&
    !placement.needsReview &&
    !placement.affiliateConfigured &&
    !placement.requiresDisclosure &&
    hasSafeHref(placement) &&
    !hasForbiddenCtaCopy(placement)
  );
}

export function getPlacementTypeLabel(type: MonetizationPlacementType): string {
  return placementTypeLabels[type];
}

export function getPlacementCtaModel(placement: MonetizationPlacement): MonetizationPlacementCtaModel | null {
  if (!isPlacementSafeToRender(placement) || !placement.href) {
    return null;
  }

  return {
    title: placement.title,
    description: placement.description,
    ctaLabel: placement.ctaLabel,
    href: placement.href,
    tone: placement.tone,
    typeLabel: getPlacementTypeLabel(placement.placementType),
  };
}

export function getMonetizationPlacementListItems(): MonetizationPlacementListItem[] {
  return monetizationPlacementRepository.getAllMonetizationPlacements().map(createListItem);
}

export function getMonetizationPlacementBySlug(slug: string): MonetizationPlacementListItem | null {
  const placement = monetizationPlacementRepository.getMonetizationPlacementBySlug(slug);

  if (!placement) {
    return null;
  }

  return createListItem(placement);
}

export function getMonetizationPlacementById(id: string): MonetizationPlacementListItem | null {
  const placement = monetizationPlacementRepository.getMonetizationPlacementById(id);

  if (!placement) {
    return null;
  }

  return createListItem(placement);
}

export function getMonetizationPlacementsForType(
  placementType: MonetizationPlacementType,
): MonetizationPlacementListItem[] {
  return monetizationPlacementRepository
    .getMonetizationPlacementsByType(placementType)
    .map(createListItem);
}

export function getSafePlacementsForRoute(route: string): MonetizationPlacementCtaModel[] {
  return monetizationPlacementRepository
    .getSafePlacementsForRoute(route)
    .map(getPlacementCtaModel)
    .filter((item): item is MonetizationPlacementCtaModel => item !== null);
}

export const monetizationPlacementService = {
  getMonetizationPlacementWarnings,
  getMonetizationPlacementDisclosure,
  getMonetizationPlacementListItems,
  getMonetizationPlacementBySlug,
  getMonetizationPlacementById,
  getMonetizationPlacementsForType,
  getPlacementCtaModel,
  getPlacementTypeLabel,
  getSafePlacementsForRoute,
  isPlacementSafeToRender,
};
