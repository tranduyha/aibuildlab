const rows = [
  {
    label: "Upfront cost",
    local: "Higher hardware commitment before you know whether the workload will stay in use.",
    cloud: "Lower starting commitment for short validation, but ongoing use still needs cost review.",
  },
  {
    label: "Recurring cost",
    local: "Power, maintenance, upgrades, and storage still continue after setup.",
    cloud: "Usage-based spend can scale with experiments, team usage, and repeated sessions.",
  },
  {
    label: "Setup time",
    local: "Driver, runtime, and system setup may take more effort before the first real test.",
    cloud: "Can reduce local setup work, but runtime choices and workflow validation still matter.",
  },
  {
    label: "Privacy/control",
    local: "May be easier when you need tighter local control, offline access, or private data handling.",
    cloud: "Can work for many experiments, but verify data-handling and account requirements first.",
  },
  {
    label: "Scalability",
    local: "Scaling usually means more hardware planning, power, cooling, and physical space.",
    cloud: "May be easier for temporary scale or short bursts, but terms and supply can change.",
  },
  {
    label: "Maintenance",
    local: "You own the hardware, thermal, driver, and compatibility follow-up.",
    cloud: "Less physical hardware maintenance, but provider terms and runtime fit still need review.",
  },
  {
    label: "VRAM flexibility",
    local: "Bound to the VRAM tier of the GPU you plan and validate locally.",
    cloud: "May help when you need to test more than one VRAM tier before local commitment.",
  },
  {
    label: "Storage and data movement",
    local: "Local files, checkpoints, and datasets may stay closer to the workstation once the workflow is set up.",
    cloud: "Uploads, downloads, and workflow movement still need planning, especially when experiments repeat.",
  },
  {
    label: "Availability risk",
    local: "Local access is steadier once the system is working, but failed parts still disrupt work.",
    cloud: "Capacity, regions, and billing terms can change, so verify before relying on a workflow.",
  },
  {
    label: "Best planning use",
    local: "Frequent workloads, privacy-sensitive testing, and long-term local workflow planning.",
    cloud: "Uncertain VRAM needs, temporary high-memory tests, or validation before local hardware.",
  },
] as const;

export default function CloudVsLocalTable() {
  return (
    <div className="cloud-vs-local-table-block">
      <div className="cloud-vs-local-table-intro">
        <h3>Local workstation planning vs cloud GPU testing</h3>
        <p>
          Use this comparison to frame the tradeoffs before you commit to a build or rely on cloud testing. The table
          stays intentionally qualitative so it can support planning without drifting into unsupported pricing or
          provider claims.
        </p>
      </div>

      <div className="comparison-table-wrap cloud-vs-local-table-wrap">
        <table className="comparison-table cloud-vs-local-table">
          <thead>
            <tr>
              <th scope="col">Planning factor</th>
              <th scope="col">Local GPU</th>
              <th scope="col">Cloud GPU</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td data-label="Local GPU">{row.local}</td>
                <td data-label="Cloud GPU">{row.cloud}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="cloud-vs-local-mobile-cards">
        {rows.map((row) => (
          <div className="cloud-vs-local-mobile-card" key={row.label}>
            <strong>{row.label}</strong>
            <div>
              <span>Local GPU</span>
              <p>{row.local}</p>
            </div>
            <div>
              <span>Cloud GPU</span>
              <p>{row.cloud}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
