<script setup lang="ts">
  interface Props {
    eyebrow: string;
    title: string;
    as?: string;
  }

  withDefaults(defineProps<Props>(), { as: 'h2' });
</script>

<template>
  <div class="flex flex-col gap-3">
    <div class="flex items-center gap-3">
      <span class="h-px w-6 bg-border" aria-hidden="true" />
      <span class="eyebrow">{{ eyebrow }}</span>
    </div>
    <component :is="as" class="text-2xl sm:text-[1.75rem]">{{ title }}</component>
    <p v-if="$slots.default" class="prose-measure text-muted-foreground">
      <slot />
    </p>
  </div>
</template>
