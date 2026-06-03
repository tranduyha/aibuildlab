import type { Build } from "@/types";

interface BuildPlanningStackProps {
  build: Build;
}

function getSystemConstraints(build: Build): string {
  switch (build.slug) {
    case "local-llm-starter-build":
      return "System RAM, runtime overhead, and model-size validation before hardware commitment.";
    case "local-ai-16gb-vram-build":
      return "Memory headroom, runtime overhead, storage growth, and cloud testing for borderline workloads.";
    case "high-vram-local-ai-workstation":
      return "PSU headroom, connector verification, cooling, case clearance, and sustained system stability.";
    case "image-workflow-ai-build":
      return "Storage, cache, generated outputs, runtime extensions, driver stack, and scratch workspace.";
    case "cloud-vs-local-ai-build-planning":
      return "Workload frequency, data control, validation risk, local power/cooling limits, and cloud test fit.";
    default:
      return "System RAM, storage, power, cooling, driver stack, and exact-part compatibility.";
  }
}

function getValidationPath(build: Build): string {
  switch (build.slug) {
    case "cloud-vs-local-ai-build-planning":
      return "Estimate VRAM, test uncertain workloads in cloud, then compare local hardware tiers only if risk is acceptable.";
    case "image-workflow-ai-build":
      return "Estimate VRAM, verify runtime and workflow storage, then test the exact image pipeline before hardware decisions.";
    case "high-vram-local-ai-workstation":
      return "Estimate VRAM, verify power and thermal limits, then require workload evidence before final purchase fit.";
    default:
      return "Start with the calculator, review GPU profiles, compare close options, then validate the actual workload.";
  }
}

export default function BuildPlanningStack({ build }: BuildPlanningStackProps) {
  const stackItems = [
    { icon: "WL", label: "Workload", value: build.targetUseCase },
    { icon: "VR", label: "VRAM tier", value: build.vramTier },
    { icon: "GP", label: "GPU class", value: build.suggestedGpuClass },
    { icon: "SY", label: "System checks", value: getSystemConstraints(build) },
    { icon: "OK", label: "Validation path", value: getValidationPath(build) },
  ];

  return (
    <div className="build-planning-stack" aria-label="Build planning stack">
      {stackItems.map((item, index) => (
        <div className="build-stack-step" key={item.label}>
          <div className="build-stack-marker">
            <span aria-hidden="true">{item.icon}</span>
            <small>{String(index + 1).padStart(2, "0")}</small>
          </div>
          <h3>{item.label}</h3>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  );
}
