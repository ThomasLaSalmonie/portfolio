import projects from '../../db/projects';
import skills from '../../db/skills';

export default defineEventHandler((event) => {
  const slug = event.context.params?.slug;
  if (!slug) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Slug is mandatory'
    });
  }
  const project = projects.find((project) => project.slug === slug);
  if (!project) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Project not found'
    });
  }
  if (project.technologiesUsed) {
    project.skills = skills.filter((skill) => project.technologiesUsed?.includes(skill.key));
  }
  return project;
});
