export type MonetizationPlacementType =
  | "vram-calculator-result"
  | "gpu-profile-sidebar"
  | "comparison-verdict"
  | "build-page-components"
  | "cloud-vs-local-guide"
  | "ai-saas-guide"
  | "footer-disclosure";

export type MonetizationPlacementTone = "primary" | "secondary" | "disclosure" | "neutral";

export type MonetizationPlacementStatus = "draft" | "reviewed" | "published" | "disabled";

export type MonetizationPlacementDataConfidence = "low" | "medium" | "high";

export type MonetizationPlacementSourceType = "manual-check" | "documentation" | "official";

export type MonetizationPlacementIntent = "planning" | "disclosure" | "internal-link";

export interface MonetizationPlacementSource {
  name: string;
  url: string;
  type: MonetizationPlacementSourceType;
  fields: string[];
  accessedAt: string;
}

export interface MonetizationPlacement {
  id: string;
  slug: string;
  placementType: MonetizationPlacementType;
  title: string;
  description: string;
  ctaLabel: string;
  href: string | null;
  intent: MonetizationPlacementIntent;
  tone: MonetizationPlacementTone;
  affiliateConfigured: boolean;
  requiresDisclosure: boolean;
  status: MonetizationPlacementStatus;
  needsReview: boolean;
  dataConfidence: MonetizationPlacementDataConfidence;
  sources: MonetizationPlacementSource[];
  lastVerifiedAt: string | null;
  notes: string | null;
  unsafeToPublishFields: string[];
}
