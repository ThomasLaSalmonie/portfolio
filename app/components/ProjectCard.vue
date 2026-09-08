<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';
  import { StatusColor } from '~/utils/types/projects.types';

  export type ProjectProps = {
    project: Project;
  };

  defineProps<ProjectProps>();
</script>

<template>
  <v-card>
    <v-img class="align-end text-grey" height="200" :src="project.banner" cover>
      <v-card-title> {{ project.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4">
      <span v-if="project.status">
        Status
        <v-icon
          size="large"
          :color="`${StatusColor[project.status]}-darken-2`"
          :icon="`mdi-${project.status}`"
        />
      </span>
      <span v-else> Status <v-icon size="large" color="red-darken-2" icon="mdi-stop" /> </span>
    </v-card-subtitle>

    <v-card-text v-if="project.shortDescription">
      <div>{{ project.shortDescription }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn block rounded="xl" color="black" variant="flat" :to="`/projects/${project.slug}`">
        See project
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
