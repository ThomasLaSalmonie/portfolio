/** Self-assessed proficiency tier — replaces the old numeric `progress` (RENOVATION.md #9, item 5). */
export type SkillLevel = 'core' | 'working' | 'familiar';

/** Grouping bucket for the Skills page. */
export type SkillCategory = 'languages' | 'frameworks' | 'ai' | 'data' | 'platforms' | 'testing';

export type Skill = {
  key: string;
  icon?: string;
  name: string;
  level?: SkillLevel;
  category?: SkillCategory;
  show?: boolean;
  related?: string[];
};
