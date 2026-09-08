import type { Skill } from './skills.types';

type ImagePosition = 'left' | 'right';

export enum StatusColor {
  pause = 'orange',
  stop = 'red',
  play = 'green'
}

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
  links?: string[];
  status?: 'pause' | 'stop' | 'play';
  banner?: string;
  blocks?: Block[];
  technologiesUsed?: string[];
  skills?: Skill[];
};
