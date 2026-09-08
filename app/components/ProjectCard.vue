<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';
  import { resolveSkills } from '~/utils/portfolio';

  const props = defineProps<{ project: Project }>();

  const MAX_TAGS = 5;
  const tags = computed(() => resolveSkills(props.project.technologiesUsed));
  const shownTags = computed(() => tags.value.slice(0, MAX_TAGS));
  const overflow = computed(() => Math.max(0, tags.value.length - MAX_TAGS));
</script>

<template>
  <NuxtLink
    :to="`/projects/${project.slug}`"
    class="group flex flex-col overflow-hidden rounded-lg border bg-card shadow-sm transition-[transform,box-shadow,border-color] duration-[280ms] ease-[var(--ease-standard)] hover:-translate-y-[3px] hover:border-primary/40 hover:shadow-md"
  >
    <div class="relative aspect-[16/9] overflow-hidden border-b bg-muted">
      <NuxtImg
        v-if="project.banner"
        :src="project.banner"
        :alt="`${project.name} — screenshot`"
        class="size-full object-cover"
        loading="lazy"
        sizes="sm:100vw md:50vw lg:380px"
      />
      <div
        v-else
        class="flex size-full items-center justify-center font-mono text-xs text-muted-foreground"
      >
        {{ project.slug }}
      </div>
    </div>

    <div class="flex flex-1 flex-col gap-3 p-5">
      <div class="flex items-start justify-between gap-3">
        <h3 class="font-display text-[1.15rem] leading-tight font-bold">{{ project.name }}</h3>
        <StatusBadge :status="project.status" />
      </div>

      <p v-if="project.shortDescription" class="text-sm text-muted-foreground">
        {{ project.shortDescription }}
      </p>

      <div v-if="shownTags.length" class="flex flex-wrap gap-1.5">
        <span v-for="skill in shownTags" :key="skill.key" class="chip">{{ skill.name }}</span>
        <span v-if="overflow" class="chip">+{{ overflow }}</span>
      </div>

      <div class="mt-auto flex items-center gap-1 pt-1 text-sm font-medium text-primary">
        View project
        <Icon
          name="lucide:arrow-up-right"
          size="16"
          class="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </div>
    </div>
  </NuxtLink>
</template>
