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
  "terms",
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
  "affiliateStatus",
  "affiliateProgramUrl",
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
  "affiliateStatus",
  "affiliateProgramUrl",
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

const cloudGpuAllowedAffiliateStatuses = new Set([
  "unknown",
  "unavailable",
  "available_unverified",
  "available_verified",
  "referral_verified",
  "not_applicable",
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
    checkEnumValue(file, rec, "affiliateStatus", cloudGpuAllowedAffiliateStatuses);
    checkEnumValue(file, rec, "status", cloudGpuAllowedStatuses);
    checkEnumValue(file, rec, "dataConfidence", cloudGpuAllowedDataConfidences);
    checkSources(file, rec);

    if (!isNonEmptyStringArray(rec.useCases)) {
      logError(`${file}:${label}: useCases must be a non-empty string array`);
    }

    if (!Array.isArray(rec.unsafeToPublishFields)) {
      logError(`${file}:${label}: unsafeToPublishFields must be an array`);
    }

    if (rec.affiliateStatus === "unknown" && rec.affiliateProgramUrl !== null) {
      logError(`${file}:${label}: affiliateStatus=unknown must not include affiliateProgramUrl`);
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

checkFile("data/gpus.json", gpuSourceRequiredFields);
checkFile("data/ai-models.json", aiModelSourceRequiredFields);
checkFile("data/comparisons.json");
checkFile("data/builds.json");
checkFile("data/guides.json");
checkFile("data/calculator-assumptions.json");
checkFile("data/calculator-validation.json");
checkCloudGpuProviders();

console.log(`Data validation completed with ${errors} error(s) and ${warnings} warning(s).`);
if (errors > 0) process.exit(1);
