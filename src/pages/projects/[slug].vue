<script setup lang="ts">
  import { useRoute } from 'nuxt/app';
  import { watch } from 'vue';
  import type { Project } from '~/utils/types/projects.types';
  import useFetchData from '~/utils/useFetchData';

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
  <AsyncLoader :is-loading="isLoading" :error="error">
    <Html lang="en">
      <Head>
        <Title>{{ project?.name }} - Thomas La Salmonie</Title>
        <Meta name="description" :content="project?.shortDescription" />
      </Head>
    </Html>
    <ParallaxItem
      :title="project?.name || ''"
      :description="project?.shortDescription"
      :img="project?.banner"
    />
    <v-container fluid class="project-container">
      <v-row v-for="(block, index) in project?.blocks" :key="index">
        <v-col v-if="block.image && block.imagePosition === 'left'" cols="12" md="3">
          <v-img :src="block.image" alt="Project Image" width="100%" />
        </v-col>

        <v-col cols="12" :md="block.image ? 9 : false">
          <v-card>
            <template v-if="block.title" #title>{{ block.title }}</template>
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
    <v-container v-if="project?.links && project.links?.length > 0" fluid class="project-container">
      <v-row>
        <v-col>
          <v-card prepend-icon="mdi-link">
            <template #title> External Links </template>
            <v-card-text>
              <li v-for="(link, index) in project?.links" :key="index">
                <a :href="link">{{ link }}</a>
              </li>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-if="project?.skills && project.skills?.length > 0"
      fluid
      class="project-container"
    >
      <v-row>
        <v-col>
          <v-card>
            <template #title> Technologies Used </template>
            <v-card-text>
              <div class="grid-container">
                <SkillItem
                  v-for="(skill, index) in project?.skills"
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
  </AsyncLoader>
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
~/utils/useFetchData