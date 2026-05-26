import { projectRepository } from "@/repositories/project.repository";

export const projectService = {
  listProjects() {
    return projectRepository.getAll();
  },

  listFeaturedProjects() {
    return projectRepository.getFeatured();
  },

  getProject(slug: string) {
    return projectRepository.getBySlug(slug);
  },
};
