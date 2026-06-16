import { buildProfileRepository } from "@/repositories/build-profile.repository";
import type { Build } from "@/types";
import type { BuildProfile } from "@/types/build-profile";

export function getBuildProfile(build: Build): BuildProfile | null {
  return buildProfileRepository.getBuildProfileBySlug(build.slug);
}

export const buildProfileService = {
  getBuildProfile,
};
