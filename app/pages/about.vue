<script setup lang="ts">
  import { useDisplay } from 'vuetify';
  import { getAboutTimeline } from '~/utils/portfolio';

  const { mobile } = useDisplay();
  const items = getAboutTimeline();
</script>

<template>
  <Html lang="en">
    <Head>
      <Title>About - Thomas La Salmonie</Title>
      <Meta name="description" content="Timeline about my work life as a web developer" />
    </Head>
  </Html>
  <h1 class="text-center">More about my carreer</h1>
  <v-container>
    <v-timeline class="mb-15 px-5" align="start" :side="mobile ? 'end' : undefined">
      <v-timeline-item
        v-for="(item, index) in items"
        :key="index"
        :dot-color="item.color"
        :icon="item.icon"
        size="x-large"
        fill-dot
      >
        <template v-if="item.date" #opposite>
          <span>{{ item.date }}</span>
        </template>
        <v-card>
          <v-card-title class="font-weight-bold">{{ item.title }}</v-card-title>
          <v-card-text>
            <a :href="item.link" target="_blank">{{ item.company }}</a>
          </v-card-text>
          <v-card-text class="text--primary">
            <ul>
              <li v-for="(task, key) in item.tasks" :key="key" v-html="task" />
            </ul>
          </v-card-text>
          <template v-if="item.projects && item.projects.length > 0">
            <v-card-title>Projects:</v-card-title>
            <v-card-text class="text--primary">
              <ul>
                <li v-for="(project, key) in item.projects" :key="key">
                  <NuxtLink :to="`/projects/${project.slug}`">
                    {{ project.name }}
                  </NuxtLink>
                </li>
              </ul>
            </v-card-text>
          </template>
          <template v-if="item.skills && item.skills.length > 0">
            <v-card-title>Technologies:</v-card-title>
            <v-card-text>
              <div class="grid-container">
                <SkillItem
                  v-for="(skill, key) in item.skills"
                  :key="key"
                  class="block-element"
                  :skill="skill"
                  icon-only
                />
              </div>
            </v-card-text>
          </template>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </v-container>
</template>

<style scoped>
  .project-container {
    max-width: 900px;
  }
  .grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(50px, 1fr));
    gap: 10px;
  }
  .block-element {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 50px;
  }
</style>
