import { Skill } from './skills.types';

type ImagePosition = 'left' | 'right';

export type Block = {
  title?: string;
  content: string;
  image?: string;
  imagePosition?: ImagePosition;
};

export type Project = {
  name: string;
  slug: string;
  shortDescription?: string;
  blocks: Block[];
  technologiesUsed?: string[];
  skills?: Skill[];
};
