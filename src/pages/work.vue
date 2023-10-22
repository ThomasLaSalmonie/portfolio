<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';
  import useFetchData from '~/utils/useFetch';

  const { result, isLoading, error, fetchData } = useFetchData<Project[]>(`/api/projects/`);

  await fetchData();
</script>

<template>
  <async-loader :is-loading="isLoading" :error="error">
    <v-container fluid class="project-container">
      <div class="grid-container">
        <ProjectCard v-for="(project, index) in result" :key="index" icon-only :project="project" />
      </div>
    </v-container>
  </async-loader>
</template>

<style scoped>
  .project-container {
    max-width: 900px;
  }

  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px;
  }
  .block-element {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100px;
  }
</style>
