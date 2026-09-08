<script setup lang="ts">
  interface Props {
    title: string;
    lead?: string;
    eyebrow?: string;
  }

  defineProps<Props>();
</script>

<template>
  <section class="flex flex-col gap-5 py-10 sm:py-16">
    <span v-if="eyebrow" class="chip chip--soft w-fit">{{ eyebrow }}</span>
    <h1
      class="max-w-[18ch] text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-black tracking-tight"
    >
      {{ title }}
    </h1>
    <p v-if="lead" class="prose-measure text-lg text-muted-foreground">{{ lead }}</p>
    <div v-if="$slots.actions" class="mt-2 flex flex-wrap gap-3">
      <slot name="actions" />
    </div>
  </section>
</template>
