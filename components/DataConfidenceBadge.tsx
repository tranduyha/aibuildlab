import type { Gpu } from "@/types";

interface DataConfidenceBadgeProps {
  gpu: Pick<Gpu, "status" | "needsReview" | "dataConfidence">;
}

export default function DataConfidenceBadge({ gpu }: DataConfidenceBadgeProps) {
  const badges: { label: string; tone: "draft" | "review" | "confidence" }[] = [];

  if (gpu.status === "draft") {
    badges.push({ label: "Seed data", tone: "draft" });
  }

  if (gpu.status === "published" || gpu.status === "reviewed") {
    badges.push({ label: "Source-backed profile", tone: "confidence" });
  }

  if (gpu.needsReview) {
    badges.push({ label: "Needs verification", tone: "review" });
  }

  if (gpu.dataConfidence === "low") {
    badges.push({ label: "Low confidence", tone: "draft" });
  }

  if (gpu.dataConfidence === "medium") {
    badges.push({ label: "Medium confidence", tone: "confidence" });
  }

  if (gpu.dataConfidence === "high") {
    badges.push({ label: "High confidence", tone: "confidence" });
  }

  return (
    <div className="data-confidence-badges" aria-label="Data confidence">
      {badges.map((badge) => (
        <span
          key={badge.label}
          className={`data-confidence-badge data-confidence-badge-${badge.tone}`}
        >
          {badge.label}
        </span>
      ))}
    </div>
  );
}
