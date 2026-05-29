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
  name?: string;
  title?: string;
  status?: string;
  needsReview?: boolean;
  dataConfidence?: string;
  lastVerifiedAt?: string | null;
  sources?: Source[];
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
  "marketplace-api",
  "manual-check"
]);

const blockedPrimaryHosts = [
  "reddit.com",
  "facebook.com",
  "x.com",
  "twitter.com",
  "quora.com"
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
  "baseClockGhz",
  "boostClockGhz",
  "tgpWatts",
  "tbpWatts",
  "boardPowerWatts",
  "recommendedPsuWatts",
  "architecture",
  "launchDate",
  "launchYear"
];

const aiModelSourceRequiredFields = [
  "parameterCountB",
  "modelSizeClass",
  "contextLengthTokens",
  "family",
  "developer",
  "modality",
  "license"
];

function readJsonArray(relativePath: string): RecordLike[] | null {
  const file = path.join(root, relativePath);
  if (!fs.existsSync(file)) return null;
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  if (!Array.isArray(parsed)) {
    throw new Error(`${relativePath} must be a JSON array for this validator.`);
  }
  return parsed as RecordLike[];
}

function hasSourceForField(item: RecordLike, field: string): boolean {
  return Array.isArray(item.sources) && item.sources.some((source) => Array.isArray(source.fields) && source.fields.includes(field));
}

function validateDataset(relativePath: string, requiredFields: string[]): { warnings: string[]; errors: string[] } {
  const warnings: string[] = [];
  const errors: string[] = [];
  const records = readJsonArray(relativePath);
  if (!records) return { warnings, errors };

  const seen = new Set<string>();

  for (const item of records) {
    const label = item.slug || item.name || item.title || "<unknown>";

    if (!item.slug) {
      errors.push(`${relativePath}: record ${label} is missing slug.`);
    } else if (seen.has(item.slug)) {
      errors.push(`${relativePath}: duplicate slug ${item.slug}.`);
    } else {
      seen.add(item.slug);
    }

    if (!item.name && !item.title) {
      errors.push(`${relativePath}: record ${label} is missing name/title.`);
    }

    if ((item.status === "published" || item.status === "reviewed") && (!Array.isArray(item.sources) || item.sources.length === 0)) {
      errors.push(`${relativePath}: ${label} is ${item.status} but has no sources.`);
    }

    if ((item.status === "published" || item.status === "reviewed") && !item.lastVerifiedAt) {
      errors.push(`${relativePath}: ${label} is ${item.status} but has no lastVerifiedAt.`);
    }

    if (item.needsReview === false && (!Array.isArray(item.sources) || item.sources.length === 0)) {
      errors.push(`${relativePath}: ${label} has needsReview=false but no sources.`);
    }

    if ((item.dataConfidence === "medium" || item.dataConfidence === "high") && (!Array.isArray(item.sources) || item.sources.length === 0)) {
      errors.push(`${relativePath}: ${label} has ${item.dataConfidence} confidence but no sources.`);
    }

    if (Array.isArray(item.sources)) {
      for (const source of item.sources) {
        if (!source.name || !source.url || !source.type || !source.accessedAt) {
          errors.push(`${relativePath}: ${label} has incomplete source object.`);
        }
        if (source.type && !allowedSourceTypes.has(source.type)) {
          errors.push(`${relativePath}: ${label} uses unsupported source type ${source.type}.`);
        }
        if (source.url && blockedPrimaryHosts.some((host) => source.url!.includes(host))) {
          warnings.push(`${relativePath}: ${label} uses blocked/weak source host in ${source.url}. Check source role.`);
        }
      }
    }

    for (const field of requiredFields) {
      const value = item[field];
      if (value !== null && value !== undefined && value !== "" && !hasSourceForField(item, field)) {
        warnings.push(`${relativePath}: ${label} has ${field}=${String(value)} but no source.fields mapping.`);
      }
    }

    if (item.calculatorEligible === true) {
      const missing = ["slug", "modality", "dataConfidence", "lastVerifiedAt"].filter((field) => !item[field]);
      if (missing.length > 0) {
        errors.push(`${relativePath}: ${label} is calculatorEligible but missing ${missing.join(", ")}.`);
      }
      if (!hasSourceForField(item, "parameterCountB") && !hasSourceForField(item, "modelSizeClass")) {
        warnings.push(`${relativePath}: ${label} is calculatorEligible but parameter/model size source mapping is missing.`);
      }
    }
  }

  return { warnings, errors };
}

const checks = [
  validateDataset("data/gpus.json", gpuSourceRequiredFields),
  validateDataset("data/ai-models.json", aiModelSourceRequiredFields),
  validateDataset("data/comparisons.json", []),
  validateDataset("data/builds.json", []),
  validateDataset("data/guides.json", [])
];

const warnings = checks.flatMap((check) => check.warnings);
const errors = checks.flatMap((check) => check.errors);

for (const warning of warnings) {
  console.warn(`WARN: ${warning}`);
}
for (const error of errors) {
  console.error(`ERROR: ${error}`);
}

console.log(`Data validation complete: ${errors.length} error(s), ${warnings.length} warning(s).`);
if (errors.length > 0) process.exit(1);
