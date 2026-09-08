import { aboutItems } from '~/data/about';
import { projects } from '~/data/projects';
import { skills } from '~/data/skills';
import type { AboutItem, ProjectRef } from '~/utils/types/about.types';
import type { Project } from '~/utils/types/projects.types';
import type { Skill } from '~/utils/types/skills.types';

/**
 * Pure read helpers over the static portfolio data in `app/data/`.
 * These replace the old `server/api/**` routes — same joins (skill/project
 * lookups by `key` / `slug`), no HTTP round-trip, and no mutation of the
 * source arrays.
 */

export function getSkills(): Skill[] {
  return skills;
}

export function getVisibleSkills(): Skill[] {
  return skills.filter((skill) => skill.show);
}

export function getSkill(key: string): Skill | undefined {
  return skills.find((skill) => skill.key === key);
}

/** Resolve skill keys to `Skill` objects, preserving order and dropping unknowns. */
export function resolveSkills(keys: string[] = []): Skill[] {
  return keys.map((key) => getSkill(key)).filter((skill): skill is Skill => skill !== undefined);
}

export function getProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** A project with its `skills` resolved from `technologiesUsed`. */
export function getProjectWithSkills(slug: string): Project | undefined {
  const project = getProject(slug);
  if (!project) return undefined;
  return { ...project, skills: resolveSkills(project.technologiesUsed) };
}

/** `limit` projects picked at random (Fisher–Yates on a copy — source is untouched). */
export function getFeaturedProjects(limit: number): Project[] {
  const pool = [...projects];
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const a = pool[i];
    const b = pool[j];
    if (a !== undefined && b !== undefined) {
      pool[i] = b;
      pool[j] = a;
    }
  }
  return pool.slice(0, Math.max(0, limit));
}

const toProjectRef = (project: Project): ProjectRef => ({
  name: project.name,
  slug: project.slug
});

/** The about timeline with `projects` (refs) and `skills` resolved per entry. */
export function getAboutTimeline(): AboutItem[] {
  return aboutItems.map((item) => ({
    ...item,
    tasks: (item.tasks ?? []).filter((task) => task.trim().length > 0),
    projects: (item.relatedProjects ?? [])
      .map((slug) => getProject(slug))
      .filter((project): project is Project => project !== undefined)
      .map(toProjectRef),
    skills: resolveSkills(item.technologiesUsed)
  }));
}
