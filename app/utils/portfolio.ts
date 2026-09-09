import { aboutItems } from '~/data/about';
import { projects } from '~/data/projects';
import { skills } from '~/data/skills';
import { loc } from '~/utils/i18n';
import type { Lang } from '~/utils/types/common.types';
import type { AboutItem, ProjectRef } from '~/utils/types/about.types';
import type { Block, Project, RawBlock, RawProject } from '~/utils/types/projects.types';
import type { Skill, SkillCategory } from '~/utils/types/skills.types';

/**
 * Pure read helpers over the static portfolio data in `app/data/`.
 * These replace the old `server/api/**` routes — same joins (skill/project
 * lookups by `key` / `slug`), no HTTP round-trip, and no mutation of the
 * source arrays.
 *
 * Helpers that touch translatable fields take a `locale` and return the
 * resolved (`string`) `Project` / `AboutItem` shape, so components stay
 * locale-agnostic. UI chrome strings live in `i18n/locales/*.json`, not here.
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

/** Ordered category buckets for the Skills page. Labels come from i18n (`skills.categories.*`). */
export const SKILL_CATEGORY_ORDER: SkillCategory[] = [
  'languages',
  'frameworks',
  'ai',
  'data',
  'platforms',
  'testing'
];

const LEVEL_RANK: Record<NonNullable<Skill['level']>, number> = {
  core: 0,
  working: 1,
  familiar: 2
};

export type SkillGroup = {
  category: SkillCategory;
  skills: Skill[];
};

/** Visible skills grouped by category, each group sorted core → working → familiar. */
export function getSkillGroups(): SkillGroup[] {
  return SKILL_CATEGORY_ORDER.map((category) => ({
    category,
    skills: getVisibleSkills()
      .filter((skill) => skill.category === category)
      .sort((a, b) => LEVEL_RANK[a.level ?? 'familiar'] - LEVEL_RANK[b.level ?? 'familiar'])
  })).filter((group) => group.skills.length > 0);
}

function resolveBlock(block: RawBlock, locale: Lang): Block {
  return {
    ...block,
    title: block.title === undefined ? undefined : loc(block.title, locale),
    content: loc(block.content, locale)
  };
}

function resolveProject(project: RawProject, locale: Lang): Project {
  return {
    ...project,
    shortDescription:
      project.shortDescription === undefined ? undefined : loc(project.shortDescription, locale),
    blocks: project.blocks?.map((block) => resolveBlock(block, locale))
  };
}

export function getProjects(locale: Lang): Project[] {
  return projects.map((project) => resolveProject(project, locale));
}

export function getProject(slug: string, locale: Lang): Project | undefined {
  const project = projects.find((p) => p.slug === slug);
  return project ? resolveProject(project, locale) : undefined;
}

/** A project with its `skills` resolved from `technologiesUsed`. */
export function getProjectWithSkills(slug: string, locale: Lang): Project | undefined {
  const project = getProject(slug, locale);
  if (!project) return undefined;
  return { ...project, skills: resolveSkills(project.technologiesUsed) };
}

/** `limit` project slugs picked at random (Fisher–Yates on a copy — source is untouched). */
export function getFeaturedProjectSlugs(limit: number): string[] {
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
  return pool.slice(0, Math.max(0, limit)).map((project) => project.slug);
}

const toProjectRef = (project: RawProject): ProjectRef => ({
  name: project.name,
  slug: project.slug
});

/** The about timeline with `projects` (refs) and `skills` resolved per entry. */
export function getAboutTimeline(locale: Lang): AboutItem[] {
  return aboutItems.map((item) => ({
    ...item,
    date: loc(item.date, locale),
    title: loc(item.title, locale),
    company: loc(item.company, locale),
    tasks: (item.tasks ?? [])
      .map((task) => loc(task, locale))
      .filter((task) => task.trim().length > 0),
    projects: (item.relatedProjects ?? [])
      .map((slug) => projects.find((project) => project.slug === slug))
      .filter((project): project is RawProject => project !== undefined)
      .map(toProjectRef),
    skills: resolveSkills(item.technologiesUsed)
  }));
}
