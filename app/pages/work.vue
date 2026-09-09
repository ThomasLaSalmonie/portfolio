<script setup lang="ts">
  import { getProjects, resolveSkills } from '~/utils/portfolio';

  const { t } = useI18n();
  const lang = useLang();

  useSeoMeta({
    title: () => t('work.seoTitle'),
    description: () => t('work.seoDescription')
  });

  const projects = computed(() => getProjects(lang.value));

  // Unique tech across every project, in first-seen order.
  const allTech = computed(() => {
    const seen = new Map<string, string>();
    for (const project of projects.value) {
      for (const skill of resolveSkills(project.technologiesUsed)) {
        if (!seen.has(skill.key)) seen.set(skill.key, skill.name);
      }
    }
    return [...seen].map(([key, name]) => ({ key, name }));
  });

  const active = ref<string[]>([]);

  function toggle(key: string) {
    active.value = active.value.includes(key)
      ? active.value.filter((k) => k !== key)
      : [...active.value, key];
  }

  const filtered = computed(() => {
    if (!active.value.length) return projects.value;
    return projects.value.filter((project) => {
      const keys = new Set(project.technologiesUsed ?? []);
      return active.value.some((k) => keys.has(k));
    });
  });
</script>

<template>
  <div class="flex flex-col gap-8">
    <SectionHeading :eyebrow="t('work.eyebrow')" :title="t('work.title')" as="h1">
      {{ t('work.intro') }}
    </SectionHeading>

    <div
      class="flex flex-wrap items-center gap-1.5"
      role="group"
      :aria-label="t('work.filterLabel')"
    >
      <button
        v-for="tech in allTech"
        :key="tech.key"
        type="button"
        class="chip transition-colors"
        :class="active.includes(tech.key) ? 'chip--solid' : 'hover:border-primary/40'"
        :aria-pressed="active.includes(tech.key)"
        @click="toggle(tech.key)"
      >
        {{ tech.name }}
      </button>
      <button
        v-if="active.length"
        type="button"
        class="ml-1 font-mono text-xs text-muted-foreground underline underline-offset-4"
        @click="active = []"
      >
        {{ t('work.clear') }}
      </button>
    </div>

    <ul class="grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <li v-for="project in filtered" :key="project.slug">
        <ProjectCard :project="project" />
      </li>
    </ul>

    <p v-if="!filtered.length" role="status" class="text-sm text-muted-foreground">
      {{ t('work.empty') }}
    </p>
  </div>
</template>
