<script setup lang="ts">
  import type { Project } from '~/utils/types/projects.types';

  const props = defineProps<{ status?: Project['status'] }>();

  const map = {
    play: { label: 'Shipped', cls: 'chip--play' },
    pause: { label: 'Paused', cls: 'chip--pause' },
    stop: { label: 'Archived', cls: 'chip--stop' }
  } as const;

  const meta = computed(() => map[props.status ?? 'stop']);
</script>

<template>
  <span class="chip" :class="meta.cls">
    <span class="chip__dot" aria-hidden="true" />
    {{ meta.label }}
  </span>
</template>
