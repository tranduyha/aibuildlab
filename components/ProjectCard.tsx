import Link from "next/link";
import { formatDate } from "@/lib/format";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="project-card">
      <div className="card-header">
        <span className={`status status-${project.status}`}>{project.status}</span>
        <span className="muted">{formatDate(project.updatedAt)}</span>
      </div>
      <p className="category">{project.category}</p>
      <h3>
        <Link href={`/projects/${project.slug}`}>{project.name}</Link>
      </h3>
      <p className="muted">{project.summary}</p>
      <div className="tag-list">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </article>
  );
}
