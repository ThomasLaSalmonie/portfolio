<script setup lang="ts">
  import TrailGame from '~/components/lab/trail-run/TrailGame.vue';
  const { t } = useI18n();
  const localePath = useLocalePath();
  useSeoMeta({ title: () => t('trail.title'), description: () => t('trail.description') });
</script>

<template>
  <div class="mx-auto flex max-w-5xl flex-col gap-8">
    <NuxtLink :to="localePath('/lab')" class="link-accent w-fit text-sm"
      >← {{ t('lab.title') }}</NuxtLink
    >
    <SectionHeading :eyebrow="t('trail.eyebrow')" :title="t('trail.title')" as="h1">
      {{ t('trail.description') }}
    </SectionHeading>
    <TrailGame />
  </div>
</template>
