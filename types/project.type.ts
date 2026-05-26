export type ProjectStatus = "concept" | "building" | "released";

export interface Project {
  id: number;
  slug: string;
  name: string;
  summary: string;
  description: string;
  category: string;
  status: ProjectStatus;
  featured: boolean;
  technologies: string[];
  updatedAt: string;
}
