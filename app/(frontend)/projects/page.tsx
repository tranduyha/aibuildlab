import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";
import { projectService } from "@/services/project.service";

export const metadata = buildMetadata({
  title: "Projects",
  description: "Browse practical AI hardware and utility projects.",
  path: "/projects",
});

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
