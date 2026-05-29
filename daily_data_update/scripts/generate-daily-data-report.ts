import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "daily_data_update", "reports");
fs.mkdirSync(outDir, { recursive: true });

function countArray(file: string): number | string {
  const abs = path.join(root, file);
  if (!fs.existsSync(abs)) return "missing";
  const parsed = JSON.parse(fs.readFileSync(abs, "utf8"));
  return Array.isArray(parsed) ? parsed.length : "not-array";
}

const date = new Date().toISOString().slice(0, 10);
const report = `# Daily data report — ${date}\n\n` +
  `| File | Count |\n|---|---:|\n` +
  [
    "data/gpus.json",
    "data/ai-models.json",
    "data/update-candidates/gpu-candidates.json",
    "data/update-candidates/ai-model-candidates.json",
    "data/update-candidates/source-gap-candidates.json"
  ].map((file) => `| ${file} | ${countArray(file)} |`).join("\n") +
  `\n\nAdd notes, validation result, and next action manually.\n`;

const file = path.join(outDir, `${date}.md`);
fs.writeFileSync(file, report);
console.log(`Wrote ${file}`);
