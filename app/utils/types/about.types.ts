import type { Project } from './projects.types';
import type { Skill } from './skills.types';

/** Lightweight reference to a project, used when only name + link are needed. */
export type ProjectRef = Pick<Project, 'name' | 'slug'>;

export type AboutItem = {
  date: string;
  title: string;
  company: string;
  link?: string;
  tasks?: string[];
  /** Slugs of related projects; resolved to `projects` by `getAboutTimeline()`. */
  relatedProjects?: string[];
  projects?: ProjectRef[];
  technologiesUsed?: string[];
  skills?: Skill[];
};
