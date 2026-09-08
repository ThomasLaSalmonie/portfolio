<script setup lang="ts">
  import type { Skill } from '~/utils/types/skills.types';

  const props = defineProps<{ skill: Skill }>();

  const variant = computed(() => {
    if (props.skill.level === 'core') return 'chip--solid';
    if (props.skill.level === 'working') return 'chip--soft';
    return '';
  });
</script>

<template>
  <span class="chip" :class="variant">{{ skill.name }}</span>
</template>
