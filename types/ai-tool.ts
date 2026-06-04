export type AiToolCategory =
  | "ai_coding"
  | "image_generation"
  | "video_generation"
  | "llm_api"
  | "agent_platform"
  | "vector_database"
  | "automation"
  | "seo_ai"
  | "productivity";

export type AiToolPricingModel =
  | "free"
  | "freemium"
  | "subscription"
  | "usage_based"
  | "enterprise"
  | "open_source"
  | "unknown";

export type AiToolAffiliateStatus =
  | "unknown"
  | "not_available"
  | "referral_verified"
  | "affiliate_verified"
  | "partner_program_verified"
  | "needs_review";

export type AiToolStatus = "draft" | "reviewed" | "published";

export type AiToolDataConfidence = "low" | "medium" | "high";

export type AiToolSourceType =
  | "official"
  | "documentation"
  | "pricing"
  | "affiliate"
  | "referral"
  | "partner"
  | "terms"
  | "help"
  | "manual-check";

export interface AiToolSource {
  name: string;
  url: string;
  type: AiToolSourceType;
  fields: string[];
  accessedAt: string;
}

export interface AiTool {
  id: string;
  slug: string;
  name: string;
  category: AiToolCategory;
  shortDescription: string;
  seoTitle: string;
  seoDescription: string;
  officialWebsiteUrl: string;
  pricingModel: AiToolPricingModel;
  pricingNotes: string | null;
  affiliateStatus: AiToolAffiliateStatus;
  affiliateProgramUrl: string | null;
  recommendedPlacements: string[];
  status: AiToolStatus;
  needsReview: boolean;
  dataConfidence: AiToolDataConfidence;
  sources: AiToolSource[];
  lastVerifiedAt: string | null;
  notes: string | null;
  unsafeToPublishFields: string[];
}
