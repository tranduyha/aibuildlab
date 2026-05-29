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
  "marketplace-api",
  "manual-check",
  "pricing-page",
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

checkFile("data/gpus.json", gpuSourceRequiredFields);
checkFile("data/ai-models.json", aiModelSourceRequiredFields);
checkFile("data/comparisons.json");
checkFile("data/builds.json");
checkFile("data/guides.json");
checkFile("data/calculator-assumptions.json");
checkFile("data/calculator-validation.json");

console.log(`Data validation completed with ${errors} error(s) and ${warnings} warning(s).`);
if (errors > 0) process.exit(1);
