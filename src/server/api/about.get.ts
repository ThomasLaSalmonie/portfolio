import aboutItems from '../db/about';
import projects from '../db/projects';
import skills from '../db/skills';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  console.log({ query });
  for (const item of aboutItems) {
    item.projects = projects
      .filter((project) => item.retatedProjects?.includes(project.slug))
      .map((project) => {
        return { name: project.name, slug: project.slug };
      });
    item.skills = skills.filter((skill) => item.technologiesUsed?.includes(skill.key));
  }
  return aboutItems;
});
