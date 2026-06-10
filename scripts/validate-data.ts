import fs from "node:fs";
import path from "node:path";

type Source = {
  name?: string;
  url?: string;
  type?: string;
  fields?: string[];
  accessedAt?: string;
};

type RecordLike = {
  slug?: string;
  id?: string;
  name?: string;
  title?: string;
  status?: string;
  needsReview?: boolean;
  dataConfidence?: string;
  sources?: Source[];
  lastVerifiedAt?: string | null;
  [key: string]: unknown;
};

const root = process.cwd();

const allowedSourceTypes = new Set([
  "official",
  "manufacturer",
  "database",
  "benchmark",
  "model-card",
  "documentation",
  "paper",
  "affiliate-api",
  "affiliate",
  "marketplace-api",
  "manual-check",
  "pricing-page",
  "pricing",
  "referral",
  "partner",
  "terms",
  "help",
]);

const blockedPrimaryDomains = [
  "google.com/search",
  "reddit.com",
  "facebook.com",
  "x.com",
  "twitter.com",
];

const gpuSourceRequiredFields = [
  "vramGb",
  "memoryType",
  "memoryBusBit",
  "memoryBandwidthGbps",
  "cudaCores",
  "streamProcessors",
  "computeUnits",
  "xeCores",
  "tensorCores",
  "rtCores",
  "baseClockGhz",
  "boostClockGhz",
  "tgpWatts",
  "tbpWatts",
  "boardPowerWatts",
  "recommendedPsuWatts",
  "architecture",
  "launchDate",
  "launchYear",
  "msrp",
];

const aiModelSourceRequiredFields = [
  "parameterCountB",
  "totalParameterCountB",
  "activeParameterCountB",
  "packagedParameterCountB",
  "expertCount",
  "routedExpertCount",
  "sharedExpertCount",
  "activeExpertCount",
  "moeArchitectureNotes",
  "contextLengthTokens",
  "license",
  "family",
  "modelFamily",
  "modality",
  "developer",
  "officialRuntime",
  "quantizationFormats",
  "recommendedUseCases",
];

const cloudGpuProviderRequiredFields = [
  "id",
  "slug",
  "name",
  "shortDescription",
  "seoTitle",
  "seoDescription",
  "officialWebsiteUrl",
  "providerType",
  "useCases",
  "pricingModel",
  "pricingNotes",
  "affiliate",
  "commissionNotes",
  "status",
  "needsReview",
  "dataConfidence",
  "sources",
  "lastVerifiedAt",
  "notes",
  "unsafeToPublishFields",
];

const cloudGpuProviderSourceBackedFields = [
  "officialWebsiteUrl",
  "providerType",
  "useCases",
  "pricingModel",
  "notes",
];

const cloudGpuAllowedProviderTypes = new Set([
  "cloud_gpu_marketplace",
  "cloud_gpu_provider",
  "cloud_compute_provider",
  "serverless_gpu",
  "ai_inference_platform",
  "unknown",
]);

const cloudGpuAllowedPricingModels = new Set([
  "hourly",
  "per_second",
  "usage_based",
  "subscription",
  "credits",
  "custom",
  "unknown",
]);

const cloudGpuAllowedStatuses = new Set(["draft", "reviewed", "published", "archived"]);
const cloudGpuAllowedDataConfidences = new Set(["low", "medium", "high"]);
const cloudGpuOfficialSourceTypes = new Set([
  "official",
  "documentation",
  "pricing",
  "affiliate",
  "referral",
  "terms",
]);

const cloudGpuDisallowedExactPricingFields = [
  "price",
  "priceUsd",
  "hourlyPriceUsd",
  "minHourlyPriceUsd",
  "maxHourlyPriceUsd",
  "monthlyPriceUsd",
  "currency",
  "region",
  "availability",
  "availableRegions",
  "gpuAvailability",
];

const aiToolRequiredFields = [
  "id",
  "slug",
  "name",
  "category",
  "shortDescription",
  "seoTitle",
  "seoDescription",
  "officialWebsiteUrl",
  "pricingModel",
  "pricingNotes",
  "affiliateStatus",
  "affiliateProgramUrl",
  "affiliate",
  "recommendedPlacements",
  "status",
  "needsReview",
  "dataConfidence",
  "sources",
  "lastVerifiedAt",
  "notes",
  "unsafeToPublishFields",
];

const aiToolSourceBackedFields = [
  "officialWebsiteUrl",
  "category",
  "shortDescription",
  "pricingModel",
  "affiliateStatus",
  "affiliateProgramUrl",
  "notes",
];

const aiToolAllowedCategories = new Set([
  "ai_coding",
  "image_generation",
  "video_generation",
  "llm_api",
  "agent_platform",
  "vector_database",
  "automation",
  "seo_ai",
  "productivity",
]);

const aiToolAllowedPricingModels = new Set([
  "free",
  "freemium",
  "subscription",
  "usage_based",
  "enterprise",
  "open_source",
  "unknown",
]);

const aiToolAllowedAffiliateStatuses = new Set([
  "unknown",
  "not_available",
  "referral_verified",
  "affiliate_verified",
  "partner_program_verified",
  "needs_review",
]);

const aiToolAllowedStatuses = new Set(["draft", "reviewed", "published"]);
const aiToolAllowedDataConfidences = new Set(["low", "medium", "high"]);
const aiToolAllowedSourceTypes = new Set([
  "official",
  "documentation",
  "pricing",
  "affiliate",
  "referral",
  "partner",
  "terms",
  "help",
  "manual-check",
]);

const monetizationPlacementRequiredFields = [
  "id",
  "slug",
  "placementType",
  "title",
  "description",
  "ctaLabel",
  "href",
  "intent",
  "tone",
  "affiliateConfigured",
  "requiresDisclosure",
  "status",
  "needsReview",
  "dataConfidence",
  "sources",
  "lastVerifiedAt",
  "notes",
  "unsafeToPublishFields",
];

const monetizationPlacementSourceBackedFields = [
  "href",
  "intent",
  "placementType",
  "requiresDisclosure",
  "notes",
];

const monetizationAllowedPlacementTypes = new Set([
  "vram-calculator-result",
  "gpu-profile-sidebar",
  "comparison-verdict",
  "build-page-components",
  "cloud-vs-local-guide",
  "ai-saas-guide",
  "footer-disclosure",
]);

const monetizationAllowedTones = new Set(["primary", "secondary", "disclosure", "neutral"]);
const monetizationAllowedStatuses = new Set(["draft", "reviewed", "published", "disabled"]);
const monetizationAllowedDataConfidences = new Set(["low", "medium", "high"]);
const monetizationAllowedSourceTypes = new Set(["manual-check", "documentation", "official"]);
const monetizationAllowedIntents = new Set(["planning", "disclosure", "internal-link"]);
const forbiddenMonetizationCtaLabels = [
  "buy now",
  "sign up now",
  "get deal",
  "claim deal",
  "best offer",
  "cheapest",
  "recommended",
];

let errors = 0;
let warnings = 0;

function logError(message: string) {
  errors += 1;
  console.error(`ERROR: ${message}`);
}

function logWarning(message: string) {
  warnings += 1;
  console.warn(`WARN: ${message}`);
}

function readJsonMaybe(file: string): unknown | null {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    logWarning(`${file} not found; skipping`);
    return null;
  }
  try {
    return JSON.parse(fs.readFileSync(full, "utf8"));
  } catch (error) {
    logError(`${file} is not valid JSON: ${(error as Error).message}`);
    return null;
  }
}

function asRecords(data: unknown): RecordLike[] {
  if (Array.isArray(data)) return data as RecordLike[];
  if (data && typeof data === "object" && Array.isArray((data as { items?: unknown }).items)) {
    return (data as { items: RecordLike[] }).items;
  }
  return [];
}

function checkUniqueSlugs(file: string, records: RecordLike[]) {
  const seen = new Set<string>();
  for (const rec of records) {
    const slug = rec.slug || rec.id;
    if (!slug) {
      logWarning(`${file}: record missing slug/id (${rec.name || rec.title || "unknown"})`);
      continue;
    }
    if (seen.has(slug)) logError(`${file}: duplicate slug/id "${slug}"`);
    seen.add(slug);
  }
}

function checkUniqueField(file: string, records: RecordLike[], field: string) {
  const seen = new Set<string>();
  for (const rec of records) {
    const value = rec[field];
    if (typeof value !== "string" || value.length === 0) {
      logWarning(`${file}: record missing ${field} (${rec.name || rec.title || rec.slug || "unknown"})`);
      continue;
    }
    if (seen.has(value)) logError(`${file}: duplicate ${field} "${value}"`);
    seen.add(value);
  }
}

function hasSourceForField(rec: RecordLike, field: string): boolean {
  return Array.isArray(rec.sources) && rec.sources.some((source) => Array.isArray(source.fields) && source.fields.includes(field));
}

function checkSources(file: string, rec: RecordLike) {
  const label = rec.slug || rec.id || rec.name || rec.title || "unknown";
  const sources = Array.isArray(rec.sources) ? rec.sources : [];

  if ((rec.status === "published" || rec.status === "reviewed") && sources.length === 0) {
    logError(`${file}:${label}: ${rec.status} record must have sources[]`);
  }

  if (rec.needsReview === false && sources.length === 0) {
    logError(`${file}:${label}: needsReview=false requires sources[]`);
  }

  if ((rec.dataConfidence === "medium" || rec.dataConfidence === "high") && sources.length === 0) {
    logError(`${file}:${label}: dataConfidence=${rec.dataConfidence} requires sources[]`);
  }

  if ((rec.status === "published" || rec.status === "reviewed") && !rec.lastVerifiedAt) {
    logError(`${file}:${label}: ${rec.status} record must have lastVerifiedAt`);
  }

  for (const source of sources) {
    if (!source.name || !source.url || !source.type || !source.accessedAt) {
      logError(`${file}:${label}: source is missing name/url/type/accessedAt`);
    }
    if (!Array.isArray(source.fields) || source.fields.length === 0) {
      logError(`${file}:${label}: source.fields must be a non-empty array`);
    }
    if (source.type && !allowedSourceTypes.has(source.type)) {
      logError(`${file}:${label}: source type "${source.type}" is not allowed`);
    }
    if (source.url && blockedPrimaryDomains.some((blocked) => source.url!.includes(blocked))) {
      logError(`${file}:${label}: blocked source URL used: ${source.url}`);
    }
  }
}

function checkFieldSources(file: string, records: RecordLike[], fields: string[]) {
  for (const rec of records) {
    const label = rec.slug || rec.id || rec.name || rec.title || "unknown";
    for (const field of fields) {
      const value = rec[field];
      if (value !== null && value !== undefined && value !== "" && !hasSourceForField(rec, field)) {
        logWarning(`${file}:${label}: field "${field}" has a value but no source.fields entry`);
      }
    }
  }
}

function checkFile(file: string, sourceFields: string[] = []) {
  const data = readJsonMaybe(file);
  if (!data) return;
  const records = asRecords(data);
  if (records.length === 0) {
    if (Array.isArray(data)) logWarning(`${file}: no records`);
    return;
  }
  checkUniqueSlugs(file, records);
  for (const rec of records) checkSources(file, rec);
  if (sourceFields.length > 0) checkFieldSources(file, records, sourceFields);
}

function checkRequiredFields(file: string, records: RecordLike[], fields: string[]) {
  for (const rec of records) {
    const label = rec.slug || rec.id || rec.name || rec.title || "unknown";
    for (const field of fields) {
      if (!(field in rec)) {
        logError(`${file}:${label}: missing required field "${field}"`);
      }
    }
  }
}

function isNonEmptyStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && value.every((item) => typeof item === "string");
}

function checkEnumValue(file: string, rec: RecordLike, field: string, allowed: Set<string>) {
  const label = rec.slug || rec.id || rec.name || rec.title || "unknown";
  const value = rec[field];
  if (typeof value !== "string" || !allowed.has(value)) {
    logError(`${file}:${label}: field "${field}" has unsupported value "${String(value)}"`);
  }
}

function isHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function getAffiliateUrl(rec: RecordLike): string | null | undefined {
  const affiliate = rec.affiliate;

  if (!affiliate || typeof affiliate !== "object" || Array.isArray(affiliate)) {
    return undefined;
  }

  const url = (affiliate as { url?: unknown }).url;
  if (url === null || typeof url === "string") {
    return url;
  }

  return undefined;
}

function checkInlineAffiliate(file: string, rec: RecordLike, cleanUrls: Array<unknown> = []) {
  const label = rec.slug || rec.id || rec.name || rec.title || "unknown";
  const affiliate = rec.affiliate;

  if (!affiliate || typeof affiliate !== "object" || Array.isArray(affiliate)) {
    logError(`${file}:${label}: affiliate must be an object with url`);
    return;
  }

  if (!("url" in affiliate)) {
    logError(`${file}:${label}: affiliate.url is required`);
    return;
  }

  const affiliateUrl = getAffiliateUrl(rec);
  if (affiliateUrl === undefined) {
    logError(`${file}:${label}: affiliate.url must be a string URL or null`);
    return;
  }

  if (affiliateUrl === null) {
    return;
  }

  if (affiliateUrl.length === 0 || !isHttpUrl(affiliateUrl)) {
    logError(`${file}:${label}: affiliate.url must be a valid http(s) URL or null`);
  }

  for (const cleanUrl of cleanUrls) {
    if (typeof cleanUrl === "string" && cleanUrl.length > 0 && affiliateUrl === cleanUrl) {
      logError(`${file}:${label}: affiliate.url must not equal official or program source URLs`);
    }
  }
}

function checkCloudGpuProviders() {
  const file = "data/cloud-gpu-providers.json";
  const data = readJsonMaybe(file);
  if (!data) return;

  if (!Array.isArray(data)) {
    logError(`${file}: must be a JSON array`);
    return;
  }

  const records = data as RecordLike[];
  if (records.length === 0) {
    logWarning(`${file}: no records`);
    return;
  }

  checkUniqueSlugs(file, records);
  checkRequiredFields(file, records, cloudGpuProviderRequiredFields);

  for (const rec of records) {
    const label = rec.slug || rec.id || rec.name || rec.title || "unknown";

    checkEnumValue(file, rec, "providerType", cloudGpuAllowedProviderTypes);
    checkEnumValue(file, rec, "pricingModel", cloudGpuAllowedPricingModels);
    checkEnumValue(file, rec, "status", cloudGpuAllowedStatuses);
    checkEnumValue(file, rec, "dataConfidence", cloudGpuAllowedDataConfidences);
    checkSources(file, rec);
    checkInlineAffiliate(file, rec, [rec.officialWebsiteUrl]);

    if (!isNonEmptyStringArray(rec.useCases)) {
      logError(`${file}:${label}: useCases must be a non-empty string array`);
    }

    if (!Array.isArray(rec.unsafeToPublishFields)) {
      logError(`${file}:${label}: unsafeToPublishFields must be an array`);
    }

    if (typeof rec.commissionNotes === "string" && /\d|%|\$/.test(rec.commissionNotes)) {
      if (!hasSourceForField(rec, "commissionNotes")) {
        logError(`${file}:${label}: numeric commissionNotes require a source.fields commissionNotes mapping`);
      }
    }

    for (const field of cloudGpuDisallowedExactPricingFields) {
      if (field in rec && rec[field] !== null && rec[field] !== undefined) {
        logError(`${file}:${label}: exact pricing/availability field "${field}" is not supported by schema`);
      }
    }

    const sourceBackedFieldNames = new Set<string>();
    const sources = Array.isArray(rec.sources) ? rec.sources : [];
    for (const source of sources) {
      if (Array.isArray(source.fields)) {
        for (const field of source.fields) {
          if (!cloudGpuProviderRequiredFields.includes(field) && !cloudGpuProviderSourceBackedFields.includes(field)) {
            logError(`${file}:${label}: source.fields entry "${field}" does not map to a cloud provider field`);
          }
          if (cloudGpuProviderSourceBackedFields.includes(field)) {
            sourceBackedFieldNames.add(field);
          }
        }
      }
    }

    if ((rec.status === "reviewed" || rec.status === "published") && sourceBackedFieldNames.size < 2) {
      logError(`${file}:${label}: reviewed/published records need at least 2 source-backed core fields`);
    }

    if (rec.status === "reviewed" || rec.status === "published") {
      const hasOfficialSource = sources.some(
        (source) => source.type && cloudGpuOfficialSourceTypes.has(source.type),
      );
      if (!hasOfficialSource) {
        logError(`${file}:${label}: reviewed/published records must include at least one official source`);
      }
    }

    const searchableText = [
      rec.name,
      rec.shortDescription,
      rec.seoTitle,
      rec.seoDescription,
      rec.notes,
      rec.pricingNotes,
      rec.commissionNotes,
    ]
      .filter((value): value is string => typeof value === "string")
      .join(" ")
      .toLowerCase();

    if (searchableText.includes("best cloud gpu")) {
      logError(`${file}:${label}: unsupported "best cloud gpu" wording`);
    }
    if (searchableText.includes("cheapest")) {
      logError(`${file}:${label}: unsupported "cheapest" wording`);
    }
    if (searchableText.includes("recommended provider")) {
      logError(`${file}:${label}: unsupported "recommended provider" wording`);
    }
  }
}

function checkAiTools() {
  const file = "data/ai-tools.json";
  const data = readJsonMaybe(file);
  if (!data) return;

  if (!Array.isArray(data)) {
    logError(`${file}: must be a JSON array`);
    return;
  }

  const records = data as RecordLike[];
  if (records.length === 0) {
    logWarning(`${file}: no records`);
    return;
  }

  checkUniqueSlugs(file, records);
  checkRequiredFields(file, records, aiToolRequiredFields);

  for (const rec of records) {
    const label = rec.slug || rec.id || rec.name || rec.title || "unknown";

    checkEnumValue(file, rec, "category", aiToolAllowedCategories);
    checkEnumValue(file, rec, "pricingModel", aiToolAllowedPricingModels);
    checkEnumValue(file, rec, "affiliateStatus", aiToolAllowedAffiliateStatuses);
    checkEnumValue(file, rec, "status", aiToolAllowedStatuses);
    checkEnumValue(file, rec, "dataConfidence", aiToolAllowedDataConfidences);
    checkSources(file, rec);
    checkInlineAffiliate(file, rec, [rec.officialWebsiteUrl, rec.affiliateProgramUrl]);

    if (!Array.isArray(rec.unsafeToPublishFields)) {
      logError(`${file}:${label}: unsafeToPublishFields must be an array`);
    }

    if (!Array.isArray(rec.recommendedPlacements)) {
      logError(`${file}:${label}: recommendedPlacements must be an array`);
    }

    if (rec.affiliateStatus === "unknown" && rec.affiliateProgramUrl !== null) {
      logError(`${file}:${label}: affiliateStatus=unknown must not include affiliateProgramUrl`);
    }

    const sources = Array.isArray(rec.sources) ? rec.sources : [];
    const sourceBackedFieldNames = new Set<string>();

    for (const source of sources) {
      if (source.type && !aiToolAllowedSourceTypes.has(source.type)) {
        logError(`${file}:${label}: source type "${source.type}" is not allowed for AI tools`);
      }

      if (Array.isArray(source.fields)) {
        for (const field of source.fields) {
          if (!aiToolRequiredFields.includes(field) && !aiToolSourceBackedFields.includes(field)) {
            logError(`${file}:${label}: source.fields entry "${field}" does not map to an AI tool field`);
          }
          if (aiToolSourceBackedFields.includes(field)) {
            sourceBackedFieldNames.add(field);
          }
        }
      }
    }

    if ((rec.status === "reviewed" || rec.status === "published") && sourceBackedFieldNames.size < 2) {
      logError(`${file}:${label}: reviewed/published records need at least 2 source-backed core fields`);
    }

    if (rec.status === "reviewed" || rec.status === "published") {
      const hasOfficialSource = sources.some(
        (source) => source.type && aiToolAllowedSourceTypes.has(source.type) && source.type !== "manual-check",
      );
      if (!hasOfficialSource) {
        logError(`${file}:${label}: reviewed/published records must include at least one official source`);
      }
    }

    const searchableText = [
      rec.name,
      rec.shortDescription,
      rec.seoTitle,
      rec.seoDescription,
      rec.notes,
      rec.pricingNotes,
    ]
      .filter((value): value is string => typeof value === "string")
      .join(" ")
      .toLowerCase();

    for (const blockedPhrase of ["best ai", "cheapest", "fastest", "top-rated", "recommended tool"]) {
      if (searchableText.includes(blockedPhrase)) {
        logError(`${file}:${label}: unsupported "${blockedPhrase}" wording`);
      }
    }
  }
}

function checkMonetizationPlacements() {
  const file = "data/monetization-placements.json";
  const data = readJsonMaybe(file);
  if (!data) return;

  if (!Array.isArray(data)) {
    logError(`${file}: must be a JSON array`);
    return;
  }

  const records = data as RecordLike[];
  if (records.length === 0) {
    logWarning(`${file}: no records`);
    return;
  }

  checkUniqueSlugs(file, records);
  checkUniqueField(file, records, "id");
  checkUniqueField(file, records, "slug");
  checkRequiredFields(file, records, monetizationPlacementRequiredFields);

  for (const rec of records) {
    const label = rec.slug || rec.id || rec.name || rec.title || "unknown";

    checkEnumValue(file, rec, "placementType", monetizationAllowedPlacementTypes);
    checkEnumValue(file, rec, "intent", monetizationAllowedIntents);
    checkEnumValue(file, rec, "tone", monetizationAllowedTones);
    checkEnumValue(file, rec, "status", monetizationAllowedStatuses);
    checkEnumValue(file, rec, "dataConfidence", monetizationAllowedDataConfidences);
    checkSources(file, rec);

    if (typeof rec.affiliateConfigured !== "boolean") {
      logError(`${file}:${label}: affiliateConfigured must be a boolean`);
    }

    if (rec.affiliateConfigured !== false) {
      logError(`${file}:${label}: affiliateConfigured must remain false until affiliate links are approved`);
    }

    if (typeof rec.requiresDisclosure !== "boolean") {
      logError(`${file}:${label}: requiresDisclosure must be a boolean`);
    }

    if (!(typeof rec.href === "string" || rec.href === null)) {
      logError(`${file}:${label}: href must be a string or null`);
    }

    if (typeof rec.href === "string" && !rec.href.startsWith("/")) {
      logError(`${file}:${label}: href must be an internal route while affiliate links are unconfigured`);
    }

    if (typeof rec.href === "string" && rec.href === "/ai-tools" && !fs.existsSync(path.join(root, "app/(frontend)/ai-tools"))) {
      logError(`${file}:${label}: /ai-tools href is not allowed until the /ai-tools route exists`);
    }

    if (!Array.isArray(rec.unsafeToPublishFields)) {
      logError(`${file}:${label}: unsafeToPublishFields must be an array`);
    }

    const sources = Array.isArray(rec.sources) ? rec.sources : [];
    const sourceBackedFieldNames = new Set<string>();

    for (const source of sources) {
      if (source.type && !monetizationAllowedSourceTypes.has(source.type)) {
        logError(`${file}:${label}: source type "${source.type}" is not allowed for monetization placements`);
      }

      if (Array.isArray(source.fields)) {
        for (const field of source.fields) {
          if (
            !monetizationPlacementRequiredFields.includes(field) &&
            !monetizationPlacementSourceBackedFields.includes(field)
          ) {
            logError(`${file}:${label}: source.fields entry "${field}" does not map to a monetization placement field`);
          }
          if (monetizationPlacementSourceBackedFields.includes(field)) {
            sourceBackedFieldNames.add(field);
          }
        }
      }
    }

    if ((rec.status === "reviewed" || rec.status === "published") && sourceBackedFieldNames.size < 2) {
      logError(`${file}:${label}: reviewed/published records need at least 2 source-backed core fields`);
    }

    const searchableText = [
      rec.title,
      rec.description,
      rec.ctaLabel,
      rec.notes,
    ]
      .filter((value): value is string => typeof value === "string")
      .join(" ")
      .toLowerCase();

    for (const blockedPhrase of [
      "commission",
      "discount",
      "buy now",
      "sign up now",
      "get deal",
      "claim deal",
      "best offer",
      "cheapest",
      "fastest",
      "top-rated",
      "recommended",
      "recommended provider",
      "recommended tool",
      "best ai",
      "best cloud",
      "product schema",
      "offer schema",
      "review schema",
    ]) {
      if (searchableText.includes(blockedPhrase)) {
        logError(`${file}:${label}: unsupported "${blockedPhrase}" wording`);
      }
    }

    if (typeof rec.ctaLabel === "string") {
      const ctaLabel = rec.ctaLabel.toLowerCase();
      for (const blockedLabel of forbiddenMonetizationCtaLabels) {
        if (ctaLabel.includes(blockedLabel)) {
          logError(`${file}:${label}: forbidden CTA label wording "${blockedLabel}"`);
        }
      }
    }

    if (rec.affiliateConfigured === false && searchableText.includes("commission")) {
      logError(`${file}:${label}: affiliateConfigured=false must not include commission copy`);
    }
  }
}

checkFile("data/gpus.json", gpuSourceRequiredFields);
for (const rec of asRecords(readJsonMaybe("data/gpus.json"))) {
  checkInlineAffiliate("data/gpus.json", rec);
}
checkFile("data/ai-models.json", aiModelSourceRequiredFields);
checkFile("data/comparisons.json");
checkFile("data/builds.json");
checkFile("data/guides.json");
checkFile("data/calculator-assumptions.json");
checkFile("data/calculator-validation.json");
checkFile("data/moe-calculator-assumptions.json");
checkFile("data/image-generation-assumptions.json");
checkFile("data/image-generation-validation-samples.json");
checkCloudGpuProviders();
checkAiTools();
checkMonetizationPlacements();

console.log(`Data validation completed with ${errors} error(s) and ${warnings} warning(s).`);
if (errors > 0) process.exit(1);
