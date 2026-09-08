<script setup lang="ts">
  import { getProjects, resolveSkills } from '~/utils/portfolio';

  const projects = getProjects();

  // Unique tech across every project, in first-seen order.
  const allTech = computed(() => {
    const seen = new Map<string, string>();
    for (const project of projects) {
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
    if (!active.value.length) return projects;
    return projects.filter((project) => {
      const keys = new Set(project.technologiesUsed ?? []);
      return active.value.some((k) => keys.has(k));
    });
  });
</script>

<template>
  <div class="flex flex-col gap-8">
    <Html lang="en">
      <Head>
        <Title>Work — Thomas La Salmonie</Title>
        <Meta name="description" content="Projects and platforms I have built as a web engineer." />
      </Head>
    </Html>

    <SectionHeading eyebrow="Work" title="Projects" as="h1">
      Things I have designed, built or led — client platforms and internal tools.
    </SectionHeading>

    <div class="flex flex-wrap items-center gap-1.5">
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
        clear
      </button>
    </div>

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <ProjectCard v-for="project in filtered" :key="project.slug" :project="project" />
    </div>

    <p v-if="!filtered.length" class="text-sm text-muted-foreground">
      No projects match that filter.
    </p>
  </div>
</template>
