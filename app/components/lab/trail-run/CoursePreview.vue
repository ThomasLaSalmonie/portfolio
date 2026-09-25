<script setup lang="ts">
  import type { Course } from '~/utils/trail-run/engine';
  import { createRunner } from '~/utils/trail-run/engine';
  import { render, WIDTH, HEIGHT } from '~/utils/trail-run/render';
  const props = defineProps<{ course: Course; label: string }>();
  const canvas = ref<HTMLCanvasElement>();
  function draw() {
    const ctx = canvas.value?.getContext('2d');
    if (ctx) render(ctx, props.course, createRunner(props.course), true);
  }
  onMounted(draw);
  watch(() => props.course, draw);
</script>
<template>
  <canvas
    ref="canvas"
    :width="WIDTH"
    :height="HEIGHT"
    role="img"
    :aria-label="label"
    class="block aspect-video w-full"
    style="image-rendering: pixelated"
  />
</template>
