<script setup lang="ts">
  import { useRoute } from 'nuxt/app';
  import { watch } from 'vue';
  import type { Project } from '~/utils/types/projects.types';
  import useFetchData from '~/utils/useFetch';

  const route = useRoute();

  const {
    result: project,
    isLoading,
    error,
    fetchData
  } = useFetchData<Project>(`/api/projects/${route.params.slug}`);

  watch(() => route.params.slug, fetchData, { immediate: true });
</script>

<template>
  <async-loader :is-loading="isLoading" :error="error">
    <v-container fluid class="project-container">
      <v-row>
        <v-col class="d-flex justify-center">
          <h1>
            {{ project.name }}
          </h1>
        </v-col>
      </v-row>
      <v-row v-for="(block, index) in project.blocks" :key="index">
        <v-col v-if="block.image && block.imagePosition === 'left'" cols="12" md="3">
          <v-img :src="block.image" alt="Project Image" width="100%" />
        </v-col>

        <v-col cols="12" :md="block.image ? 9 : null">
          <v-card>
            <v-card-title v-if="block.title">
              {{ block.title }}
            </v-card-title>
            <v-card-text>
              <p>{{ block.content }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col v-if="block.image && block.imagePosition === 'right'" cols="12" md="3">
          <v-img :src="block.image" alt="Project Image" width="100%" />
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid class="project-container" v-if="project.skills?.length > 0">
      <v-row>
        <v-col>
          <v-card>
            <v-card-title> Technologies Used </v-card-title>
            <v-card-text>
              <div class="grid-container">
                <skill
                  v-for="(skill, index) in project.skills"
                  :key="index"
                  class="block-element"
                  :skill="skill"
                  icon-only
                />
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
