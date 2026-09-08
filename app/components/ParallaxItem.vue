<script setup lang="ts">
  export type ParallaxItemProps = {
    title: string;
    img?: string;
    description?: string;
  };

  defineProps<ParallaxItemProps>();
</script>

<template>
  <v-parallax class="hero-parallax" :src="img ? img : null">
    <h1 class="text-black" style="font-size: 4rem">{{ title }}</h1>
    <h2 v-if="description" class="text-black">{{ description }}</h2>
  </v-parallax>
</template>

<style scoped>
  .hero-parallax {
    height: 70vh;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: white;
  }
</style>
