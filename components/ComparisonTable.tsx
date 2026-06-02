import type { Gpu } from "@/types";

interface ComparisonTableProps {
  gpus: Gpu[];
}

interface TableRow {
  label: string;
  values: string[];
  noteFields?: Array<keyof Gpu | null>;
}

interface TableSection {
  title: string;
  rows: TableRow[];
}

type DisplayValue = string | number | null | undefined;

const SOURCE_REQUIRED_FIELDS = new Set<keyof Gpu>([
  "architecture",
  "vramGb",
  "memoryType",
  "memoryBusBit",
  "memoryBandwidthGbps",
  "cudaCores",
  "computeUnits",
  "xeCores",
  "powerConsumptionWatts",
  "tgpWatts",
  "tbpWatts",
  "boardPowerWatts",
  "powerConnectors",
  "recommendedPsuWatts",
]);

function hasSourceForField(gpu: Gpu, key: keyof Gpu): boolean {
  if (!SOURCE_REQUIRED_FIELDS.has(key)) {
    return true;
  }

  return gpu.sources.some((source) => source.fields.includes(String(key)));
}

function formatValue(value: DisplayValue, suffix = ""): string {
  if (value === null || value === undefined || value === "") {
    return "Needs verification";
  }

  return `${value}${suffix}`;
}

function getFieldValue(gpu: Gpu, key: keyof Gpu, suffix = ""): string {
  if (!hasSourceForField(gpu, key)) {
    return "Needs verification";
  }

  return formatValue(gpu[key] as DisplayValue, suffix);
}

function getCoreField(gpu: Gpu): { key: keyof Gpu; label: string; suffix?: string } | null {
  if (gpu.vendor === "NVIDIA") {
    return { key: "cudaCores", label: "CUDA cores" };
  }

  if (gpu.vendor === "AMD") {
    return { key: "computeUnits", label: "compute units" };
  }

  if (gpu.vendor === "Intel") {
    return { key: "xeCores", label: "Xe cores" };
  }

  return null;
}

function getCoreValue(gpu: Gpu): { value: string; field: keyof Gpu | null } {
  const field = getCoreField(gpu);
  if (!field) {
    return { value: "Needs verification", field: null };
  }

  const value = getFieldValue(gpu, field.key, field.suffix);
  return {
    value: value === "Needs verification" ? value : `${value} ${field.label}`,
    field: field.key,
  };
}

function getPowerField(gpu: Gpu): { key: keyof Gpu; suffix: string } | null {
  const candidates: Array<{ key: keyof Gpu; suffix: string }> = [
    { key: "powerConsumptionWatts", suffix: " W" },
    { key: "tgpWatts", suffix: " W" },
    { key: "tbpWatts", suffix: " W" },
    { key: "boardPowerWatts", suffix: " W" },
  ];

  return candidates.find((candidate) => getFieldValue(gpu, candidate.key, candidate.suffix) !== "Needs verification") ?? null;
}

function getPowerValue(gpu: Gpu): { value: string; field: keyof Gpu | null } {
  const field = getPowerField(gpu);
  if (!field) {
    return { value: "Needs verification", field: null };
  }

  return { value: getFieldValue(gpu, field.key, field.suffix), field: field.key };
}

function hasVariantSpecificSource(gpu: Gpu, field: keyof Gpu | null): boolean {
  if (!field) {
    return false;
  }

  return gpu.sources.some(
    (source) => source.scope === "variant-specific" && source.fields.includes(String(field)),
  );
}

function hasUsableRow(row: TableRow): boolean {
  return row.values.some((value) => value !== "Needs verification");
}

function repeatedField(gpus: Gpu[], field: keyof Gpu): Array<keyof Gpu> {
  return gpus.map(() => field);
}

function buildSections(gpus: Gpu[]): TableSection[] {
  const coreValues = gpus.map(getCoreValue);
  const powerValues = gpus.map(getPowerValue);

  const sections: TableSection[] = [
    {
      title: "Memory planning",
      rows: [
        {
          label: "VRAM",
          values: gpus.map((gpu) => getFieldValue(gpu, "vramGb", " GB")),
          noteFields: repeatedField(gpus, "vramGb"),
        },
        {
          label: "Memory type",
          values: gpus.map((gpu) => getFieldValue(gpu, "memoryType")),
          noteFields: repeatedField(gpus, "memoryType"),
        },
        {
          label: "Memory bus",
          values: gpus.map((gpu) => getFieldValue(gpu, "memoryBusBit", "-bit")),
          noteFields: repeatedField(gpus, "memoryBusBit"),
        },
        {
          label: "Memory bandwidth",
          values: gpus.map((gpu) => getFieldValue(gpu, "memoryBandwidthGbps", " GB/s")),
          noteFields: repeatedField(gpus, "memoryBandwidthGbps"),
        },
      ],
    },
    {
      title: "Compute / architecture",
      rows: [
        {
          label: "Vendor",
          values: gpus.map((gpu) => gpu.vendor || "Needs verification"),
        },
        {
          label: "Architecture",
          values: gpus.map((gpu) => getFieldValue(gpu, "architecture")),
          noteFields: repeatedField(gpus, "architecture"),
        },
        {
          label: "Core / execution units",
          values: coreValues.map(({ value }) => value),
          noteFields: coreValues.map(({ field }) => field),
        },
      ],
    },
    {
      title: "Power planning",
      rows: [
        {
          label: "Board power / TGP",
          values: powerValues.map(({ value }) => value),
          noteFields: powerValues.map(({ field }) => field),
        },
        {
          label: "Power connector",
          values: gpus.map((gpu) => getFieldValue(gpu, "powerConnectors")),
          noteFields: repeatedField(gpus, "powerConnectors"),
        },
        {
          label: "Recommended PSU",
          values: gpus.map((gpu) => getFieldValue(gpu, "recommendedPsuWatts", " W")),
          noteFields: repeatedField(gpus, "recommendedPsuWatts"),
        },
      ].filter(hasUsableRow),
    },
    {
      title: "Verification",
      rows: [
        {
          label: "Status",
          values: gpus.map((gpu) =>
            gpu.needsReview ? "Needs verification" : "Source-backed GPU specs available",
          ),
        },
        {
          label: "Data confidence",
          values: gpus.map((gpu) => gpu.dataConfidence),
        },
        {
          label: "Last verified",
          values: gpus.map((gpu) => gpu.lastVerifiedAt ?? "Needs verification"),
        },
      ],
    },
  ];

  return sections.map((section) => ({
    ...section,
    rows: section.rows.filter(hasUsableRow),
  }));
}

export default function ComparisonTable({ gpus }: ComparisonTableProps) {
  if (gpus.length === 0) {
    return <p className="related-note">No source-backed GPU records were resolved for this comparison.</p>;
  }

  const sections = buildSections(gpus);

  return (
    <div className="comparison-table-wrap">
      <table className="comparison-table">
        <thead>
          <tr>
            <th>Field</th>
            {gpus.map((gpu) => (
              <th key={gpu.slug}>{gpu.name}</th>
            ))}
          </tr>
        </thead>
        {sections.map((section) => (
          <tbody key={section.title}>
            <tr className="comparison-table-section-row">
              <th colSpan={gpus.length + 1}>{section.title}</th>
            </tr>
            {section.rows.map((row) => (
              <tr key={`${section.title}-${row.label}`}>
                <th>{row.label}</th>
                {gpus.map((gpu, index) => {
                  const noteField = row.noteFields?.[index] ?? null;

                  return (
                    <td data-label={`${gpu.name} ${row.label}`} key={`${gpu.slug}-${row.label}`}>
                      {row.values[index]}
                      {hasVariantSpecificSource(gpu, noteField) ? (
                        <p className="spec-meta">Variant-specific. Verify exact card.</p>
                      ) : null}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  );
}
