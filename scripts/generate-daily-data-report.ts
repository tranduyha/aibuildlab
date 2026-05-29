import fs from "node:fs";
import path from "node:path";

const today = new Date().toISOString().slice(0, 10);
const reportDir = path.join(process.cwd(), "daily_data_update", "reports");
fs.mkdirSync(reportDir, { recursive: true });

const categories = [
  "gpu-candidates",
  "ai-model-candidates",
  "calculator-assumption-candidates",
  "runtime-benchmark-candidates",
  "benchmark-candidates",
  "cloud-gpu-candidates",
  "price-candidates",
  "affiliate-product-candidates",
  "comparison-candidates",
  "build-candidates",
  "guide-candidates",
];

function readCount(name: string): number {
  const file = path.join(process.cwd(), "data", "update-candidates", `${name}.json`);
  if (!fs.existsSync(file)) return 0;
  const parsed = JSON.parse(fs.readFileSync(file, "utf8"));
  return Array.isArray(parsed) ? parsed.length : 0;
}

const lines = [
  `# Daily data report - ${today}`,
  "",
  "## Candidate counts",
  "",
  "| Queue | Count |",
  "|---|---:|",
  ...categories.map((name) => `| ${name} | ${readCount(name)} |`),
  "",
  "## Notes",
  "",
  "- Add sources reviewed.",
  "- Add records enriched.",
  "- Add validation/build result.",
  "- Add remaining blockers.",
  "",
];

const out = path.join(reportDir, `${today}.md`);
fs.writeFileSync(out, lines.join("\n"), "utf8");
console.log(`Wrote ${out}`);
