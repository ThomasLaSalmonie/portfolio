import skills from '../../db/skills';

export default defineEventHandler((event) => {
  const query = getQuery(event);
  console.log({ query });
  return skills;
});
