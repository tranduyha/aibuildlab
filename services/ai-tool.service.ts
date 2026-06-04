import { aiToolRepository } from "@/repositories/ai-tool.repository";
import type {
  AiTool,
  AiToolCategory,
  AiToolDataConfidence,
  AiToolPricingModel,
} from "@/types/ai-tool";

export interface AiToolListItem {
  tool: AiTool;
  warnings: string[];
  dataConfidence: AiToolDataConfidence;
  affiliateNotice: string;
  pricingNotice: string;
  placementNotice: string;
  categoryLabel: string;
  pricingModelLabel: string;
}

export interface AiToolDetailModel extends AiToolListItem {
  tool: AiTool;
}

const UNKNOWN_AFFILIATE_NOTICE =
  "Affiliate or referral status has not been verified from an official source.";
const EXACT_PRICING_NOTICE =
  "Exact pricing is not stored. Check the official tool pricing page before cost planning.";
const REVIEW_WARNING =
  "AI tool details should be verified against official tool pages before workflow, cost, or monetization planning.";
const LOW_CONFIDENCE_WARNING =
  "AI tool details are draft planning data and should be verified before public use.";

const categoryLabels: Record<AiToolCategory, string> = {
  ai_coding: "AI coding",
  image_generation: "Image generation",
  video_generation: "Video generation",
  llm_api: "LLM API",
  agent_platform: "Agent platform",
  vector_database: "Vector database",
  automation: "Automation",
  seo_ai: "SEO AI",
  productivity: "Productivity",
};

const pricingModelLabels: Record<AiToolPricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  subscription: "Subscription",
  usage_based: "Usage-based",
  enterprise: "Enterprise",
  open_source: "Open source",
  unknown: "Unknown",
};

function hasExactPricing(tool: AiTool): boolean {
  return Boolean(tool.pricingNotes && tool.pricingNotes.trim().length > 0);
}

function createListItem(tool: AiTool): AiToolListItem {
  return {
    tool,
    warnings: getAiToolWarnings(tool),
    dataConfidence: tool.dataConfidence,
    affiliateNotice: getAiToolAffiliateNotice(tool),
    pricingNotice: getAiToolPricingNotice(tool),
    placementNotice: getAiToolPlacementNotice(tool),
    categoryLabel: getAiToolCategoryLabel(tool.category),
    pricingModelLabel: getAiToolPricingModelLabel(tool.pricingModel),
  };
}

export function getAiToolWarnings(tool: AiTool): string[] {
  const warnings = new Set<string>();

  if (tool.status === "draft" || tool.needsReview) {
    warnings.add(REVIEW_WARNING);
  }

  if (tool.dataConfidence === "low") {
    warnings.add(LOW_CONFIDENCE_WARNING);
  }

  if (tool.affiliateStatus === "unknown") {
    warnings.add(UNKNOWN_AFFILIATE_NOTICE);
  }

  if (tool.pricingModel === "unknown" || !hasExactPricing(tool)) {
    warnings.add(EXACT_PRICING_NOTICE);
  }

  return Array.from(warnings);
}

export function getAiToolAffiliateNotice(tool: AiTool): string {
  if (tool.affiliateStatus === "unknown") {
    return UNKNOWN_AFFILIATE_NOTICE;
  }

  if (tool.affiliateStatus === "needs_review") {
    return "Affiliate or referral status needs official review before use.";
  }

  if (
    tool.affiliateStatus === "referral_verified" ||
    tool.affiliateStatus === "affiliate_verified" ||
    tool.affiliateStatus === "partner_program_verified"
  ) {
    return "Affiliate or referral status is linked to an official source, but terms should be rechecked before use.";
  }

  return "Affiliate or referral status is not configured for this planning record.";
}

export function getAiToolPricingNotice(tool: AiTool): string {
  if (tool.pricingModel === "unknown" || tool.pricingNotes === null) {
    return EXACT_PRICING_NOTICE;
  }

  return "Pricing notes are present, but official tool pricing should still be checked before cost planning.";
}

export function getAiToolPlacementNotice(tool: AiTool): string {
  if (tool.recommendedPlacements.length === 0) {
    return "No editorial placement has been assigned for this planning record yet.";
  }

  return "Placement labels are internal planning hints only, not tool recommendations or rankings.";
}

export function getAiToolCategoryLabel(category: AiToolCategory): string {
  return categoryLabels[category];
}

export function getAiToolPricingModelLabel(pricingModel: AiToolPricingModel): string {
  return pricingModelLabels[pricingModel];
}

export function getAiToolListItems(): AiToolListItem[] {
  return aiToolRepository.getAllAiTools().map(createListItem);
}

export function getAiToolDetailModel(slug: string): AiToolDetailModel | null {
  const tool = aiToolRepository.getAiToolBySlug(slug);

  if (!tool) {
    return null;
  }

  return createListItem(tool);
}

export const aiToolService = {
  getAiToolWarnings,
  getAiToolAffiliateNotice,
  getAiToolPricingNotice,
  getAiToolPlacementNotice,
  getAiToolCategoryLabel,
  getAiToolPricingModelLabel,
  getAiToolListItems,
  getAiToolDetailModel,
};
