import type { LocalizedText } from './common.types';
import type { Skill } from './skills.types';

type ImagePosition = 'left' | 'right';

export enum StatusColor {
  pause = 'orange',
  stop = 'red',
  play = 'green'
}

/** A content block after locale resolution (what components receive). */
export type Block = {
  title?: string;
  content: string;
  image?: string;
  imagePosition?: ImagePosition;
};

/** A content block as authored in `app/data/projects.ts`. */
export type RawBlock = Omit<Block, 'title' | 'content'> & {
  title?: LocalizedText;
  content: LocalizedText;
};

/** A project after locale resolution — `portfolio.ts` returns this shape. */
export type Project = {
  name: string;
  slug: string;
  shortDescription?: string;
  links?: string[];
  status?: 'pause' | 'stop' | 'play';
  banner?: string;
  blocks?: Block[];
  technologiesUsed?: string[];
  skills?: Skill[];
};

/** A project as authored in `app/data/projects.ts` (translatable fields are `LocalizedText`). */
export type RawProject = Omit<Project, 'shortDescription' | 'blocks'> & {
  shortDescription?: LocalizedText;
  blocks?: RawBlock[];
};
