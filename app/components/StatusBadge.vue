<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';

  const props = defineProps<{ status?: Project['status'] }>();

  const { t } = useI18n();

  const cls = { play: 'chip--play', pause: 'chip--pause', stop: 'chip--stop' } as const;

  const status = computed(() => props.status ?? 'stop');
</script>

<template>
  <span class="chip" :class="cls[status]">
    <span class="chip__dot" aria-hidden="true" />
    {{ t(`status.${status}`) }}
  </span>
</template>
