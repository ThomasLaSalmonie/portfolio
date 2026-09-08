<script setup lang="ts">
  import { getProjects } from '~/utils/portfolio';

  const projects = getProjects();
</script>

<template>
  <Html lang="en">
    <Head>
      <Title>My projects - Thomas La Salmonie</Title>
      <Meta name="description" content="Projects I work on as a web developer" />
    </Head>
  </Html>
  <h1 class="text-center">My projects</h1>
  <v-container fluid class="project-container">
    <div class="grid-container">
      <ProjectCard v-for="project in projects" :key="project.slug" icon-only :project="project" />
    </div>
  </v-container>
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
