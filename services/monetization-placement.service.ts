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

const REVIEW_WARNING =
  "Placement copy is planning-only and should be reviewed before production monetization use.";
const AFFILIATE_NOT_CONFIGURED_WARNING =
  "Affiliate links are not configured for this placement.";
const DISCLOSURE_WARNING =
  "This placement requires transparent disclosure if future monetization links are added.";

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

export function getMonetizationPlacementsForType(
  placementType: MonetizationPlacementType,
): MonetizationPlacementListItem[] {
  return monetizationPlacementRepository
    .getMonetizationPlacementsByType(placementType)
    .map(createListItem);
}

export const monetizationPlacementService = {
  getMonetizationPlacementWarnings,
  getMonetizationPlacementDisclosure,
  getMonetizationPlacementListItems,
  getMonetizationPlacementBySlug,
  getMonetizationPlacementsForType,
};
