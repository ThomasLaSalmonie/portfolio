import projects from '../../db/projects';

type QueryParams = {
  limit: number;
};

export default defineEventHandler((event) => {
  const query: QueryParams = getQuery(event);
  let results = projects;
  if (!isNaN(query.limit) && Number(query.limit) > 0) {
    results = results.sort(() => Math.random() - 0.5).slice(0, query.limit);
  }
  return results;
});
