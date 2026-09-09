<script setup lang="ts">
  import { getSkillGroups } from '~/utils/portfolio';

  const { t } = useI18n();

  useSeoMeta({
    title: () => t('skillsPage.seoTitle'),
    description: () => t('skillsPage.seoDescription')
  });

  const groups = getSkillGroups();

  const legend = computed(() => [
    { cls: 'chip--solid', label: t('skills.levels.core'), note: t('skills.levels.coreNote') },
    { cls: 'chip--soft', label: t('skills.levels.working'), note: t('skills.levels.workingNote') },
    { cls: '', label: t('skills.levels.familiar'), note: t('skills.levels.familiarNote') }
  ]);
</script>

<template>
  <div class="flex flex-col gap-10">
    <SectionHeading :eyebrow="t('skillsPage.eyebrow')" :title="t('skillsPage.title')" as="h1">
      {{ t('skillsPage.intro') }}
    </SectionHeading>

    <dl class="flex flex-wrap gap-x-6 gap-y-2">
      <div v-for="item in legend" :key="item.label" class="flex items-center gap-2">
        <dt class="chip" :class="item.cls">{{ item.label }}</dt>
        <dd class="text-xs text-muted-foreground">{{ item.note }}</dd>
      </div>
    </dl>

    <section v-for="group in groups" :key="group.category" class="flex flex-col gap-3">
      <h2 class="font-mono text-sm font-medium tracking-wide text-muted-foreground uppercase">
        {{ t(`skills.categories.${group.category}`) }}
      </h2>
      <div class="flex flex-wrap gap-1.5">
        <SkillItem v-for="skill in group.skills" :key="skill.key" :skill="skill" />
      </div>
    </section>
  </div>
</template>
