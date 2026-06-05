import aiToolData from "@/data/ai-tools.json";
import type {
  AiTool,
  AiToolAffiliateStatus,
  AiToolCategory,
  AiToolPricingModel,
  AiToolSource,
  AiToolStatus,
} from "@/types/ai-tool";

const allowedCategories: AiToolCategory[] = [
  "ai_coding",
  "image_generation",
  "video_generation",
  "llm_api",
  "agent_platform",
  "vector_database",
  "automation",
  "seo_ai",
  "productivity",
];

const allowedPricingModels: AiToolPricingModel[] = [
  "free",
  "freemium",
  "subscription",
  "usage_based",
  "enterprise",
  "open_source",
  "unknown",
];

const allowedAffiliateStatuses: AiToolAffiliateStatus[] = [
  "unknown",
  "not_available",
  "referral_verified",
  "affiliate_verified",
  "partner_program_verified",
  "needs_review",
];

const allowedStatuses: AiToolStatus[] = ["draft", "reviewed", "published"];

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSource(value: unknown): value is AiToolSource {
  if (!value || typeof value !== "object") {
    return false;
  }

  const source = value as Partial<AiToolSource>;
  return (
    typeof source.name === "string" &&
    typeof source.url === "string" &&
    typeof source.type === "string" &&
    isStringArray(source.fields) &&
    typeof source.accessedAt === "string"
  );
}

function isAffiliateConfig(value: unknown): value is AiTool["affiliate"] {
  if (!value || typeof value !== "object") {
    return false;
  }

  const affiliate = value as Partial<AiTool["affiliate"]>;
  return typeof affiliate.url === "string" || affiliate.url === null;
}

function isAiTool(value: unknown): value is AiTool {
  if (!value || typeof value !== "object") {
    return false;
  }

  const tool = value as Partial<AiTool>;
  return (
    typeof tool.id === "string" &&
    typeof tool.slug === "string" &&
    typeof tool.name === "string" &&
    typeof tool.category === "string" &&
    allowedCategories.includes(tool.category as AiToolCategory) &&
    typeof tool.shortDescription === "string" &&
    typeof tool.seoTitle === "string" &&
    typeof tool.seoDescription === "string" &&
    typeof tool.officialWebsiteUrl === "string" &&
    typeof tool.pricingModel === "string" &&
    allowedPricingModels.includes(tool.pricingModel as AiToolPricingModel) &&
    (typeof tool.pricingNotes === "string" || tool.pricingNotes === null) &&
    typeof tool.affiliateStatus === "string" &&
    allowedAffiliateStatuses.includes(tool.affiliateStatus as AiToolAffiliateStatus) &&
    (typeof tool.affiliateProgramUrl === "string" || tool.affiliateProgramUrl === null) &&
    isAffiliateConfig(tool.affiliate) &&
    isStringArray(tool.recommendedPlacements) &&
    typeof tool.status === "string" &&
    allowedStatuses.includes(tool.status as AiToolStatus) &&
    typeof tool.needsReview === "boolean" &&
    typeof tool.dataConfidence === "string" &&
    Array.isArray(tool.sources) &&
    tool.sources.every(isSource) &&
    (typeof tool.lastVerifiedAt === "string" || tool.lastVerifiedAt === null) &&
    (typeof tool.notes === "string" || tool.notes === null) &&
    isStringArray(tool.unsafeToPublishFields)
  );
}

function assertUniqueSlugs(tools: AiTool[]): void {
  const seen = new Set<string>();

  for (const tool of tools) {
    if (seen.has(tool.slug)) {
      throw new Error(`Duplicate AI tool slug detected: ${tool.slug}`);
    }

    seen.add(tool.slug);
  }
}

const rawAiToolData: unknown = aiToolData;

const aiTools: AiTool[] = Array.isArray(rawAiToolData)
  ? rawAiToolData.filter(isAiTool)
  : [];

assertUniqueSlugs(aiTools);

export function getAllAiTools(): AiTool[] {
  return [...aiTools];
}

export function getAiToolBySlug(slug: string): AiTool | null {
  return aiTools.find((tool) => tool.slug === slug) ?? null;
}

export function getAiToolSlugs(): string[] {
  return aiTools.map((tool) => tool.slug);
}

export function getAiToolsByCategory(category: AiToolCategory): AiTool[] {
  return aiTools.filter((tool) => tool.category === category);
}

export function getAiToolsByAffiliateStatus(status: AiToolAffiliateStatus): AiTool[] {
  return aiTools.filter((tool) => tool.affiliateStatus === status);
}

export function getDraftAiTools(): AiTool[] {
  return aiTools.filter((tool) => tool.status === "draft");
}

export function getReviewedAiTools(): AiTool[] {
  return aiTools.filter((tool) => tool.status === "reviewed");
}

export function getPublishedAiTools(): AiTool[] {
  return aiTools.filter((tool) => tool.status === "published" && !tool.needsReview);
}

export function getAiToolCategories(): AiToolCategory[] {
  return Array.from(new Set(aiTools.map((tool) => tool.category)));
}

export const aiToolRepository = {
  getAllAiTools,
  getAiToolBySlug,
  getAiToolSlugs,
  getAiToolsByCategory,
  getAiToolsByAffiliateStatus,
  getDraftAiTools,
  getReviewedAiTools,
  getPublishedAiTools,
  getAiToolCategories,
};
