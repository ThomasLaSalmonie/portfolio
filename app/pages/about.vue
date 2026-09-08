<script setup lang="ts">
  import { getAboutTimeline } from '~/utils/portfolio';

  const items = getAboutTimeline();
</script>

<template>
  <div class="flex flex-col gap-8">
    <Html lang="en">
      <Head>
        <Title>About — Thomas La Salmonie</Title>
        <Meta name="description" content="Career timeline of Thomas La Salmonie, web engineer." />
      </Head>
    </Html>

    <ol class="flex flex-col">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="grid gap-3 border-t py-8 sm:grid-cols-[9rem_1fr] sm:gap-8"
      >
        <div class="font-mono text-xs text-muted-foreground sm:pt-1">{{ item.date }}</div>

        <div class="flex flex-col gap-4">
          <div class="flex flex-col gap-0.5">
            <h2 class="font-display text-lg font-bold">{{ item.title }}</h2>
            <a
              v-if="item.link"
              :href="item.link"
              target="_blank"
              rel="noopener"
              class="link-accent w-fit text-sm"
            >
              {{ item.company }}
            </a>
            <span v-else class="text-sm text-muted-foreground">{{ item.company }}</span>
          </div>

          <ul
            v-if="item.tasks && item.tasks.length"
            class="prose-measure flex list-disc flex-col gap-1.5 pl-4 text-sm text-muted-foreground marker:text-border"
          >
            <!-- v-html: trusted static copy from app/data/about.ts; sanitised in Phase 3 -->
            <li v-for="(task, key) in item.tasks" :key="key" v-html="task" />
          </ul>

          <div v-if="item.projects && item.projects.length" class="flex flex-col gap-1.5">
            <span class="eyebrow">Projects</span>
            <div class="flex flex-wrap gap-x-4 gap-y-1 text-sm">
              <NuxtLink
                v-for="project in item.projects"
                :key="project.slug"
                :to="`/projects/${project.slug}`"
                class="link-accent"
              >
                {{ project.name }}
              </NuxtLink>
            </div>
          </div>

          <div v-if="item.skills && item.skills.length" class="flex flex-col gap-1.5">
            <span class="eyebrow">Stack</span>
            <div class="flex flex-wrap gap-1.5">
              <SkillItem v-for="skill in item.skills" :key="skill.key" :skill="skill" />
            </div>
          </div>
        </div>
      </li>
    </ol>
  </div>
</template>
