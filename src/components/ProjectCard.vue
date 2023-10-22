<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';

  export type ProjectProps = {
    project: Project;
  };

  const props = withDefaults(defineProps<ProjectProps>(), {
    // iconOnly: false,
  });
</script>

<template>
  <v-card class="mx-auto" max-width="400">
    <v-img
      class="align-end text-white"
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    >
      <v-card-title> {{ props.project.name }}</v-card-title>
    </v-img>

    <v-card-subtitle class="pt-4"> Number 10 </v-card-subtitle>

    <v-card-text v-if="props.project.shortDescription">
      <div>{{ props.project.shortDescription }}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        block
        rounded="xl"
        color="black"
        variant="flat"
        :to="`/projects/${props.project.slug}`"
      >
        See project
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
