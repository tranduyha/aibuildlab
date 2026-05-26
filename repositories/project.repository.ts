import projectsData from "@/data/projects.json";
import type { Project } from "@/types";

const projects = projectsData as Project[];

export const projectRepository = {
  getAll(): Project[] {
    return [...projects].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
  },

  getBySlug(slug: string): Project | null {
    return projects.find((project) => project.slug === slug) ?? null;
  },

  getFeatured(): Project[] {
    return projects.filter((project) => project.featured);
  },
};
