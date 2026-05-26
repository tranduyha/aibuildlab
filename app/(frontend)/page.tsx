import Link from "next/link";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import ProjectCard from "@/components/ProjectCard";
import SectionHeading from "@/components/SectionHeading";
import { projectService } from "@/services/project.service";
import { siteSettingsService } from "@/services/site-settings.service";

export default function HomePage() {
  const settings = siteSettingsService.getSettings();
  const featuredProjects = projectService.listFeaturedProjects();

  return (
    <>
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <p className="eyebrow">AI product workspace</p>
            <h1>{settings.heroTitle}</h1>
            <p className="hero-copy">{settings.heroDescription}</p>
            <div className="hero-actions">
              <Link className="primary-button" href="/projects">
                Browse projects
              </Link>
              <Link className="secondary-button" href="/about">
                Explore structure
              </Link>
            </div>
          </div>
          <div className="hero-panel" aria-label="Project architecture">
            <p className="panel-label">Current data pipeline</p>
            <code>data/*.json</code>
            <span>&darr;</span>
            <code>repositories</code>
            <span>&darr;</span>
            <code>services</code>
            <span>&darr;</span>
            <code>app / components</code>
          </div>
        </div>
      </section>

      <section className="shell section">
        <SectionHeading
          eyebrow="Featured work"
          title="Projects under development"
          href="/projects"
        />
        <div className="project-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      <section className="section surface">
        <div className="shell">
          <SectionHeading eyebrow="Organization" title="A replaceable data boundary" />
          <ArchitectureFlow />
        </div>
      </section>
    </>
  );
}
