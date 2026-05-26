const layers = [
  {
    name: "JSON data",
    detail: "Editable records in data/*.json",
  },
  {
    name: "Repositories",
    detail: "Read and query local records",
  },
  {
    name: "Services",
    detail: "Expose application use cases",
  },
  {
    name: "Pages",
    detail: "Render content in the App Router",
  },
];

export default function ArchitectureFlow() {
  return (
    <div className="architecture-grid">
      {layers.map((layer, index) => (
        <div className="architecture-card" key={layer.name}>
          <span>{String(index + 1).padStart(2, "0")}</span>
          <h3>{layer.name}</h3>
          <p className="muted">{layer.detail}</p>
        </div>
      ))}
    </div>
  );
}
