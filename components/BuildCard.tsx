import Link from "next/link";
import DataConfidenceBadge from "@/components/DataConfidenceBadge";
import type { Build, Gpu } from "@/types";

interface BuildCardProps {
  build: Build;
  gpus: Gpu[];
}

function getKeyConstraints(build: Build): string {
  switch (build.slug) {
    case "local-llm-starter-build":
      return "RAM/headroom, model size, runtime stack, calculator-first validation";
    case "local-ai-16gb-vram-build":
      return "VRAM headroom, runtime overhead, future model growth, cloud validation";
    case "high-vram-local-ai-workstation":
      return "PSU/cooling, connector checks, case clearance, stability evidence";
    case "image-workflow-ai-build":
      return "Storage/cache, generated outputs, runtime extensions, driver caveats";
    case "cloud-vs-local-ai-build-planning":
      return "Cloud testing, workload frequency, local control needs, purchase risk";
    default:
      return "RAM, storage, power, thermals, OS, drivers, and runtime validation";
  }
}

export default function BuildCard({ build, gpus }: BuildCardProps) {
  return (
    <article className="build-card">
      <DataConfidenceBadge gpu={build} />
      <h2>
        <Link href={`/builds/${build.slug}`}>{build.title}</Link>
      </h2>
      <p>{build.shortDescription}</p>
      <dl className="build-card-meta">
        <div>
          <dt>Use case</dt>
          <dd>{build.targetUseCase}</dd>
        </div>
        <div>
          <dt>VRAM tier</dt>
          <dd>{build.vramTier}</dd>
        </div>
        <div>
          <dt>Key build constraints</dt>
          <dd>{getKeyConstraints(build)}</dd>
        </div>
        <div>
          <dt>GPU planning class</dt>
          <dd>
            {build.suggestedGpuClass}
            {gpus.length === 0 ? " (profiles need verification)" : ""}
          </dd>
        </div>
      </dl>
      <Link className="build-card-cta" href={`/builds/${build.slug}`}>
        View build plan <span>&rarr;</span>
      </Link>
    </article>
  );
}
