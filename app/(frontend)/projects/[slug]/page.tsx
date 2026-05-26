import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/format";
import { projectService } from "@/services/project.service";

export function generateStaticParams() {
  return projectService.listProjects().map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = projectService.getProject(slug);

  if (!project) {
    return { title: "Project not found" };
  }

  return {
    title: project.name,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = projectService.getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="shell project-detail">
      <Link className="back-link" href="/projects">
        &larr; Back to projects
      </Link>
      <p className="eyebrow">{project.category}</p>
      <h1>{project.name}</h1>
      <div className="detail-meta">
        <span className={`status status-${project.status}`}>{project.status}</span>
        <span className="muted">Updated {formatDate(project.updatedAt)}</span>
      </div>
      <p className="detail-lead">{project.summary}</p>
      <p className="detail-body">{project.description}</p>
      <h2>Technologies</h2>
      <div className="tag-list detail-tags">
        {project.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </article>
  );
}
