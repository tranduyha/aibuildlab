const scenarios = [
  {
    title: "I do not know how much VRAM I need yet",
    direction: "Start with estimation instead of committing to hardware immediately.",
    nextStep:
      "Use the VRAM Calculator, then consider cloud testing if the estimate still feels close to the edge of your local GPU tier.",
  },
  {
    title: "I will run the workload often",
    direction: "Local GPU planning may make more sense after validation.",
    nextStep:
      "Review GPU profiles and compare local options so repeated usage is weighed against setup effort and system constraints.",
  },
  {
    title: "I need high VRAM for a short project",
    direction: "Cloud GPU testing may reduce commitment for temporary high-memory work.",
    nextStep:
      "Estimate VRAM first, then consider a short cloud validation path before turning the project into a local hardware plan.",
  },
  {
    title: "I need privacy or offline control",
    direction: "Local planning may fit better when control requirements are higher.",
    nextStep:
      "Verify the model, storage, runtime, and VRAM needs before assuming a local workstation is the right long-term fit.",
  },
  {
    title: "I do not want to manage drivers or hardware",
    direction: "Cloud GPU or SaaS/API tools may be simpler when infrastructure effort is a blocker.",
    nextStep:
      "Decide whether you still need runtime control. If not, a SaaS or API path may be simpler than local workstation planning.",
  },
  {
    title: "I am choosing a workstation build",
    direction: "Use build planning only after workload shape is clearer.",
    nextStep:
      "Start from Builds, compare GPU profiles, and validate the workload with the calculator before narrowing a local system plan.",
  },
  {
    title: "I need to validate a model before committing to hardware",
    direction: "Reduce uncertainty first instead of sizing a workstation from assumptions.",
    nextStep:
      "Use the calculator for a rough memory target, then consider cloud testing if you still need practical evidence before a build decision.",
  },
] as const;

export default function DecisionMatrix() {
  return (
    <div className="decision-matrix-grid">
      {scenarios.map((scenario, index) => (
        <div className="decision-matrix-card" key={scenario.title}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{scenario.title}</h3>
          <dl className="decision-matrix-detail">
            <div>
              <dt>Planning direction</dt>
              <dd>{scenario.direction}</dd>
            </div>
            <div>
              <dt>Next step</dt>
              <dd>{scenario.nextStep}</dd>
            </div>
          </dl>
        </div>
      ))}
    </div>
  );
}
