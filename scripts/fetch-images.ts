import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

type ImageCategory = "hero" | "gpu" | "builds" | "guides" | "tools";

interface ImageManifestEntry {
  id: string;
  local_path: string;
  source: "pexels";
  source_url: string;
  author: string;
  license: "Pexels License";
  license_url: string;
  downloaded_at: string;
  alt_text: string;
  used_in_pages: string[];
  category: ImageCategory;
  width: number | null;
  height: number | null;
  needsReview: boolean;
}

interface PexelsPhoto {
  id: number;
  url: string;
  photographer: string;
  alt?: string;
  src: {
    large2x?: string;
    large?: string;
    original: string;
  };
}

interface PexelsSearchResponse {
  photos: PexelsPhoto[];
}

interface CategoryConfig {
  query: string;
  fallbackAlt: string;
  usedInPages: string[];
}

const ROOT_DIR = process.cwd();
const ENV_FILE = path.join(ROOT_DIR, ".env.local");
const DEFAULT_DOWNLOAD_DIR = "public/images";
const DEFAULT_MANIFEST_PATH = "data/images/image-manifest.json";
const PEXELS_LICENSE_URL = "https://www.pexels.com/license/";

const CATEGORY_CONFIG: Record<ImageCategory, CategoryConfig> = {
  hero: {
    query: "artificial intelligence workstation computer desk",
    fallbackAlt: "AI workstation desk setup",
    usedInPages: ["/"],
  },
  gpu: {
    query: "computer graphics card hardware",
    fallbackAlt: "Computer hardware for AI workloads",
    usedInPages: ["/gpu"],
  },
  builds: {
    query: "desktop computer workstation setup",
    fallbackAlt: "Desktop workstation build",
    usedInPages: ["/builds"],
  },
  guides: {
    query: "developer working on computer hardware",
    fallbackAlt: "Developer researching computer hardware",
    usedInPages: ["/guides"],
  },
  tools: {
    query: "data analysis computer screen",
    fallbackAlt: "Hardware calculation tool workspace",
    usedInPages: ["/tools/vram-calculator"],
  },
};

function parseEnv(contents: string): Record<string, string> {
  const values: Record<string, string> = {};

  for (const line of contents.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) {
      continue;
    }

    const separator = trimmed.indexOf("=");
    if (separator < 1) {
      continue;
    }

    const key = trimmed.slice(0, separator).trim();
    let value = trimmed.slice(separator + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    values[key] = value;
  }

  return values;
}

function isUsableKey(value: string | undefined): value is string {
  return Boolean(value && !value.toLowerCase().includes("your_") && value.length > 10);
}

function resolveWithinDirectory(relativePath: string, allowedDirectory: string): string {
  const allowedPath = path.resolve(ROOT_DIR, allowedDirectory);
  const resolvedPath = path.resolve(ROOT_DIR, relativePath);

  if (resolvedPath !== allowedPath && !resolvedPath.startsWith(`${allowedPath}${path.sep}`)) {
    throw new Error(`${relativePath} must stay inside ${allowedDirectory}.`);
  }

  return resolvedPath;
}

async function loadEnvironment(): Promise<Record<string, string>> {
  try {
    return parseEnv(await readFile(ENV_FILE, "utf8"));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      console.error("Missing .env.local. Create it from .env.example and set PEXELS_API_KEY.");
      console.error("The script never reads API credentials from committed files or templates.");
      process.exitCode = 1;
      return {};
    }

    throw error;
  }
}

function getArguments() {
  const args = process.argv.slice(2);
  let category: ImageCategory | "all" = "all";
  let count = 1;

  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === "--category" && args[index + 1]) {
      const requested = args[index + 1];
      if (requested !== "all" && !(requested in CATEGORY_CONFIG)) {
        throw new Error(
          `Unknown category "${requested}". Use hero, gpu, builds, guides, tools, or all.`,
        );
      }
      category = requested as ImageCategory | "all";
      index += 1;
    } else if (args[index] === "--count" && args[index + 1]) {
      count = Number.parseInt(args[index + 1], 10);
      if (!Number.isInteger(count) || count < 1 || count > 5) {
        throw new Error("--count must be an integer from 1 to 5.");
      }
      index += 1;
    } else {
      throw new Error(`Unknown argument "${args[index]}".`);
    }
  }

  return { category, count };
}

async function readManifest(manifestPath: string): Promise<ImageManifestEntry[]> {
  try {
    const parsed: unknown = JSON.parse(await readFile(manifestPath, "utf8"));
    if (!Array.isArray(parsed)) {
      throw new Error("Image manifest must contain a JSON array.");
    }
    return parsed as ImageManifestEntry[];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await mkdir(path.dirname(manifestPath), { recursive: true });
      await writeFile(manifestPath, "[]\n", "utf8");
      return [];
    }
    throw error;
  }
}

async function searchPexels(
  apiKey: string,
  query: string,
  count: number,
): Promise<PexelsPhoto[]> {
  const params = new URLSearchParams({
    query,
    per_page: String(count),
    orientation: "landscape",
  });
  const response = await fetch(`https://api.pexels.com/v1/search?${params}`, {
    headers: {
      Authorization: apiKey,
    },
  });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error("Pexels rejected PEXELS_API_KEY. Check the value in .env.local.");
    }
    throw new Error(`Pexels request failed with HTTP ${response.status}.`);
  }

  const result = (await response.json()) as PexelsSearchResponse;
  return result.photos;
}

async function downloadPhoto(url: string, outputPath: string): Promise<void> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Image download failed with HTTP ${response.status}.`);
  }

  const data = Buffer.from(await response.arrayBuffer());
  await writeFile(outputPath, data);
}

async function main() {
  const env = await loadEnvironment();
  if (process.exitCode) {
    return;
  }

  if (!isUsableKey(env.PEXELS_API_KEY)) {
    console.error("Missing PEXELS_API_KEY in .env.local.");
    console.error("Add a Pexels API key locally, then run npm run images:fetch again.");
    process.exitCode = 1;
    return;
  }

  const { category, count } = getArguments();
  const relativeDownloadDir = env.IMAGE_DOWNLOAD_DIR || DEFAULT_DOWNLOAD_DIR;
  const relativeManifestPath = env.IMAGE_MANIFEST_PATH || DEFAULT_MANIFEST_PATH;
  const downloadsEnabled = env.IMAGE_FETCH_ENABLE_DOWNLOAD !== "false";
  const downloadDir = resolveWithinDirectory(relativeDownloadDir, "public/images");
  const manifestPath = resolveWithinDirectory(relativeManifestPath, "data/images");
  const publicImagePrefix = `/${path.relative(path.join(ROOT_DIR, "public"), downloadDir).replaceAll("\\", "/")}`;
  const manifest = await readManifest(manifestPath);
  const categories =
    category === "all"
      ? (Object.keys(CATEGORY_CONFIG) as ImageCategory[])
      : [category];
  const newEntries: ImageManifestEntry[] = [];

  if (!downloadsEnabled) {
    console.log("IMAGE_FETCH_ENABLE_DOWNLOAD=false; results will be previewed only.");
  }

  for (const currentCategory of categories) {
    const config = CATEGORY_CONFIG[currentCategory];
    const photos = await searchPexels(env.PEXELS_API_KEY, config.query, count);
    const categoryDir = path.join(downloadDir, currentCategory);
    await mkdir(categoryDir, { recursive: true });

    for (const photo of photos) {
      const id = `pexels-${currentCategory}-${photo.id}`;
      const fileName = `${id}.jpg`;
      const localPath = `${publicImagePrefix}/${currentCategory}/${fileName}`;
      const existing = manifest.find((entry) => entry.id === id);

      if (existing) {
        console.log(`Skipping existing manifest entry: ${id}`);
        continue;
      }

      if (!downloadsEnabled) {
        console.log(`[preview] ${currentCategory}: ${photo.url}`);
        continue;
      }

      const imageUrl = photo.src.large2x || photo.src.large || photo.src.original;
      await downloadPhoto(imageUrl, path.join(categoryDir, fileName));
      newEntries.push({
        id,
        local_path: localPath,
        source: "pexels",
        source_url: photo.url,
        author: photo.photographer,
        license: "Pexels License",
        license_url: PEXELS_LICENSE_URL,
        downloaded_at: new Date().toISOString(),
        alt_text: photo.alt?.trim() || config.fallbackAlt,
        used_in_pages: config.usedInPages,
        category: currentCategory,
        width: null,
        height: null,
        needsReview: false,
      });
      console.log(`Downloaded ${localPath}`);
    }
  }

  if (newEntries.length > 0) {
    await writeFile(
      manifestPath,
      `${JSON.stringify([...manifest, ...newEntries], null, 2)}\n`,
      "utf8",
    );
    console.log(`Added ${newEntries.length} entries to ${relativeManifestPath}.`);
  } else if (downloadsEnabled) {
    console.log("No new image entries were added.");
  }
}

main().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Image fetch failed: ${message}`);
  process.exitCode = 1;
});
