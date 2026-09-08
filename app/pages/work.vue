<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';
  import useFetchData from '~/utils/useFetchData';

  const { result, isLoading, error, fetchData } = useFetchData<Project[]>(`/api/projects/`);

  await fetchData();
</script>

<template>
  <Html lang="en">
    <Head>
      <Title>My projects - Thomas La Salmonie</Title>
      <Meta name="description" content="Projects I work on as a web developer" />
    </Head>
  </Html>
  <h1 class="text-center">My projects</h1>
  <AsyncLoader :is-loading="isLoading" :error="error">
    <v-container fluid class="project-container">
      <div class="grid-container">
        <ProjectCard v-for="(project, index) in result" :key="index" icon-only :project="project" />
      </div>
    </v-container>
  </AsyncLoader>
</template>

<style scoped>
  .project-container {
    max-width: 900px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;
  }
</style>
