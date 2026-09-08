<script setup lang="ts">
  import { computed } from 'vue';
  import { useRoute } from 'nuxt/app';
  import { getProjectWithSkills } from '~/utils/portfolio';

  const route = useRoute();
  const project = computed(() => getProjectWithSkills(String(route.params.slug)));

  // At prerender / SSR an unknown slug is a 404; on the client the computed
  // stays reactive so in-app navigation between projects works.
  if (import.meta.server && !project.value) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' });
  }
</script>

<template>
  <div>
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
    <v-container v-if="project?.links && project.links.length > 0" fluid class="project-container">
      <v-row>
        <v-col>
          <v-card prepend-icon="mdi-link">
            <template #title> External Links </template>
            <v-card-text>
              <ul>
                <li v-for="(link, index) in project.links" :key="index">
                  <a :href="link">{{ link }}</a>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      v-if="project?.skills && project.skills.length > 0"
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
  </div>
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
