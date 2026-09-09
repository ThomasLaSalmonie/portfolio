import type { LocalizedText } from './common.types';
import type { Project } from './projects.types';
import type { Skill } from './skills.types';

/** Lightweight reference to a project, used when only name + link are needed. */
export type ProjectRef = Pick<Project, 'name' | 'slug'>;

/** A timeline entry after locale resolution — `getAboutTimeline()` returns this. */
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

/** A timeline entry as authored in `app/data/about.ts` (translatable fields are `LocalizedText`). */
export type RawAboutItem = Omit<AboutItem, 'date' | 'title' | 'company' | 'tasks'> & {
  date: LocalizedText;
  title: LocalizedText;
  company: LocalizedText;
  tasks?: LocalizedText[];
};
