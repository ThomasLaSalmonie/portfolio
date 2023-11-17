import type { Project } from './projects.types';
import type { Skill } from './skills.types';

export type AboutItem = {
  color: string;
  icon: string;
  date: string;
  title: string;
  company: string;
  link?: string;
  tasks?: string[];
  projects?: Project[];
  retatedProjects?: string[];
  technologiesUsed?: string[];
  skills?: Skill[];
};
