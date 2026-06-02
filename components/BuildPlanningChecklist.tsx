import type { Build } from "@/types";

interface BuildPlanningChecklistProps {
  build: Build;
}

const CHECKLIST_GROUPS = [
  {
    title: "Memory planning",
    items: [
      "VRAM estimate from the calculator",
      "System RAM for runtime and workload overhead",
      "Context length, runtime overhead, and loaded model assumptions",
      "Memory safety margin before treating a tier as usable",
    ],
  },
  {
    title: "GPU planning",
    items: [
      "VRAM tier fit",
      "GPU profile source confidence",
      "Exact board-partner variant",
      "Fields marked as draft or needing verification",
    ],
  },
  {
    title: "Power and thermals",
    items: [
      "PSU verification",
      "Connector requirements",
      "Cooling capacity",
      "Case clearance",
      "Total system load",
    ],
  },
  {
    title: "Storage and workflow",
    items: [
      "Model files",
      "Cache",
      "Datasets",
      "Generated outputs",
      "Working directory or scratch space",
    ],
  },
  {
    title: "Runtime validation",
    items: [
      "OS support",
      "Driver support",
      "CUDA, ROCm, DirectML, or runtime compatibility",
      "Framework support for the target workload",
    ],
  },
  {
    title: "Evidence",
    items: [
      "Benchmark evidence missing until attached",
      "Test before purchase",
      "Validate the actual workload before final hardware decisions",
    ],
  },
];

export default function BuildPlanningChecklist({ build }: BuildPlanningChecklistProps) {
  return (
    <div className="build-checklist-wrap">
      <div className="build-checklist-focus">
        <h3>Route-specific checks</h3>
        <ul>
          {build.checklistFocus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="build-checklist-groups">
        {CHECKLIST_GROUPS.map((group) => (
          <section className="build-checklist-group" key={group.title}>
            <h3>{group.title}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
