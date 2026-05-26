import type { Metadata } from "next";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projectService } from "@/services/project.service";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse AI Build Lab projects.",
};

export default function ProjectsPage() {
  const projects = projectService.listProjects();

  return (
    <section className="shell section page-section">
      <SectionHeading eyebrow="Portfolio" title="All projects" />
      <div className="project-grid">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
