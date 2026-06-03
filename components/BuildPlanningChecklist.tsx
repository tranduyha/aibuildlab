import type { Build } from "@/types";

interface BuildPlanningChecklistProps {
  build: Build;
}

const CHECKLIST_GROUPS = [
  {
    marker: "01",
    title: "Memory planning",
    summary: "Start from workload memory, then keep headroom for runtime overhead.",
    items: [
      "Calculator VRAM estimate",
      "System RAM headroom",
      "Context and runtime overhead",
      "Loaded model assumptions",
    ],
  },
  {
    marker: "02",
    title: "GPU planning",
    summary: "Use GPU profiles as planning inputs, not final hardware verdicts.",
    items: [
      "VRAM tier fit",
      "Source confidence",
      "Exact board-partner variant",
      "Draft fields that need verification",
    ],
  },
  {
    marker: "03",
    title: "Power and thermals",
    summary: "Confirm the exact system can handle the GPU safely and consistently.",
    items: [
      "PSU headroom",
      "Power connectors",
      "Cooling path",
      "Case clearance",
      "Sustained system load",
    ],
  },
  {
    marker: "04",
    title: "Storage and workflow",
    summary: "Account for files and working space outside GPU memory.",
    items: [
      "Model files",
      "Cache",
      "Datasets",
      "Generated outputs",
      "Scratch workspace",
    ],
  },
  {
    marker: "05",
    title: "Runtime validation",
    summary: "Check the software stack before treating the plan as usable.",
    items: [
      "OS support",
      "Driver support",
      "CUDA, ROCm, DirectML, or runtime fit",
      "Framework support",
    ],
  },
  {
    marker: "06",
    title: "Evidence and testing",
    summary: "Keep final decisions open until workload evidence exists.",
    items: [
      "Benchmark evidence gap",
      "Exact workload test",
      "Compatibility review",
      "Decision notes for unresolved risks",
    ],
  },
];

export default function BuildPlanningChecklist({ build }: BuildPlanningChecklistProps) {
  return (
    <div className="build-checklist-wrap">
      <div className="build-checklist-focus">
        <h3>Route-specific priority checks</h3>
        <ul>
          {build.checklistFocus.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="build-checklist-groups">
        {CHECKLIST_GROUPS.map((group) => (
          <section className="build-checklist-group" key={group.title}>
            <div className="build-checklist-heading">
              <span>{group.marker}</span>
              <h3>{group.title}</h3>
            </div>
            <p>{group.summary}</p>
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
