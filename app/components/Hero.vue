<script setup lang="ts">
  interface Props {
    title: string;
    lead?: string;
    eyebrow?: string;
    image?: string;
    imageAlt?: string;
  }

  defineProps<Props>();
</script>

<template>
  <section class="py-10 sm:py-16">
    <div class="flex flex-col gap-6 sm:gap-8" :class="image && 'sm:flex-row sm:items-start'">
      <NuxtImg
        v-if="image"
        :src="image"
        :alt="imageAlt ?? ''"
        width="512"
        height="640"
        format="webp"
        sizes="160px sm:208px"
        class="aspect-[4/5] w-44 shrink-0 self-center rounded-xl border object-cover object-[50%_35%] sm:w-52 sm:self-start"
      />
      <div class="flex flex-col gap-5">
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
      </div>
    </div>
  </section>
</template>
