<script setup lang="ts">
  import { getSkillGroups } from '~/utils/portfolio';

  useSeoMeta({
    title: 'Skills',
    description: 'Languages, frameworks and platforms I work with, grouped by area and proficiency.'
  });

  const groups = getSkillGroups();

  const legend = [
    { cls: 'chip--solid', label: 'Core', note: 'reach for daily; can lead work in it' },
    { cls: 'chip--soft', label: 'Working', note: 'productive; used on real projects' },
    { cls: '', label: 'Familiar', note: 'have shipped with it; not day-to-day' }
  ];
</script>

<template>
  <div class="flex flex-col gap-10">
    <SectionHeading eyebrow="Skills" title="What I work with" as="h1">
      Grouped by area and tagged by how close it is to my day-to-day.
    </SectionHeading>

    <dl class="flex flex-wrap gap-x-6 gap-y-2">
      <div v-for="item in legend" :key="item.label" class="flex items-center gap-2">
        <dt class="chip" :class="item.cls">{{ item.label }}</dt>
        <dd class="text-xs text-muted-foreground">{{ item.note }}</dd>
      </div>
    </dl>

    <section v-for="group in groups" :key="group.category" class="flex flex-col gap-3">
      <h2 class="font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {{ group.label }}
      </h2>
      <div class="flex flex-wrap gap-1.5">
        <SkillItem v-for="skill in group.skills" :key="skill.key" :skill="skill" />
      </div>
    </section>
  </div>
</template>
